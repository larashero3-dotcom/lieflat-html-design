#!/usr/bin/env node
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function arg(name, fallback = undefined) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return process.argv[index + 1];
}

const lang = arg("lang", "en");
const out = resolve(process.cwd(), arg("out", "previews"));
const chrome = arg("chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");
const templateFilter = arg("template", "");
const templateIds = new Set(templateFilter.split(",").map((id) => id.trim()).filter(Boolean));
const catalog = JSON.parse(await readFile(resolve(root, "assets/catalog.json"), "utf8"));

await mkdir(out, { recursive: true });

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

function launchChrome(url, profile) {
  return new Promise((resolveLaunch, reject) => {
    const child = spawn(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--remote-debugging-port=0",
      `--user-data-dir=${profile}`,
      "--window-size=1280,720",
      url
    ], { stdio: ["ignore", "ignore", "pipe"] });

    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      reject(new Error("Chrome remote debugging endpoint timed out"));
    }, 15000);

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk) => {
      const match = chunk.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) {
        clearTimeout(timer);
        resolveLaunch({ child, browserWs: match[1] });
      }
    });

    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });

    child.on("exit", (code) => {
      clearTimeout(timer);
      if (code !== null && code !== 0) reject(new Error(`Chrome exited ${code}`));
    });
  });
}

async function getPageWebSocket(browserWs, expectedUrl) {
  const browserUrl = new URL(browserWs);
  const base = `http://${browserUrl.host}`;
  for (let i = 0; i < 80; i++) {
    const targets = await fetch(`${base}/json/list`).then((res) => res.json()).catch(() => []);
    const page = targets.find((target) => (
      target.type === "page" &&
      target.webSocketDebuggerUrl &&
      (target.url === expectedUrl || target.url.startsWith(expectedUrl.split("?")[0]))
    ));
    if (page) return page.webSocketDebuggerUrl;
    await sleep(100);
  }
  throw new Error("Unable to find Chrome page target");
}

function connectCdp(wsUrl) {
  return new Promise((resolveConnect, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 0;
    const pending = new Map();

    const timer = setTimeout(() => {
      ws.close();
      reject(new Error("CDP WebSocket timed out"));
    }, 15000);

    ws.addEventListener("open", () => {
      clearTimeout(timer);
      resolveConnect({
        send(method, params = {}) {
          const callId = ++id;
          ws.send(JSON.stringify({ id: callId, method, params }));
          return new Promise((resolveSend, rejectSend) => {
            pending.set(callId, { resolve: resolveSend, reject: rejectSend });
          });
        },
        close() {
          ws.close();
        }
      });
    });

    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id || !pending.has(message.id)) return;
      const { resolve, reject: rejectPending } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) rejectPending(new Error(message.error.message));
      else resolve(message.result);
    });

    ws.addEventListener("error", reject);
  });
}

async function capture(url, screenshot, slideIndex = 0) {
  const profile = await mkdtemp(resolve(tmpdir(), "lieflat-html-design-preview-"));
  let child;
  let client;
  try {
    const launched = await launchChrome(url, profile);
    child = launched.child;
    const pageWs = await getPageWebSocket(launched.browserWs, url);
    client = await connectCdp(pageWs);
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sleep(2200);
    await client.send("Runtime.evaluate", {
      expression: `
        (() => {
          const idx = ${JSON.stringify(slideIndex)};
          const slides = Array.from(document.querySelectorAll('.slide'));
          if (slides.length) {
            if (idx > 0 && document.getElementById('deck')) {
              document.getElementById('deck').scrollTo({ left: idx * window.innerWidth, behavior: 'instant' });
            } else if (idx > 0 && typeof window.goTo === 'function') {
              window.goTo(idx);
            } else if (idx > 0) {
              slides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
            }
            slides[idx]?.classList.add('active', 'in-view');
            if (idx === 0) slides[0]?.classList.add('active', 'in-view');
          }
          document.querySelectorAll('.a, .anim, .anim-fade').forEach((el) => {
            el.classList.add('visible', 'in-view');
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.animationDelay = '0s';
            el.style.animationDuration = '0s';
          });
          document.documentElement.scrollTo?.(0, 0);
          window.scrollTo?.(0, 0);
        })();
      `
    });
    await sleep(500);
    const result = await client.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false
    });
    await writeFile(screenshot, Buffer.from(result.data, "base64"));
  } finally {
    client?.close();
    if (child && !child.killed) {
      child.kill("SIGTERM");
      await new Promise((resolveExit) => {
        child.once("exit", resolveExit);
        setTimeout(resolveExit, 1000);
      });
    }
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  }
}

for (const template of catalog) {
  if (templateIds.size && !templateIds.has(template.id)) continue;
  const file = template.files?.[lang] || template.files?.[template.languages[0]];
  if (!file) continue;

  const source = resolve(root, file);
  const url = new URL(pathToFileURL(source));
  const previewSlide = Number(template.preview_slide || 0);
  url.searchParams.set("slide", String(previewSlide));
  const screenshot = resolve(out, `${template.id}.png`);
  await capture(url.href, screenshot, previewSlide);
  console.log(screenshot);
}

process.exit(0);
