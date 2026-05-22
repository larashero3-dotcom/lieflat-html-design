#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { pathToFileURL } from "node:url";

function arg(name, fallback = undefined) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return process.argv[index + 1];
}

const html = arg("html");
const url = arg("url");
const outDir = resolve(process.cwd(), arg("out-dir", "xhs-carousel"));
const prefix = arg("prefix", "xhs-card");
const selector = arg("selector", ".card, .scene");
const scrollsArg = arg("scrolls");
const overlap = Number(arg("overlap", "220"));
const extraBottom = Number(arg("extra-bottom", "0"));
const scale = Number(arg("scale", "2"));
const chrome = arg("chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");
const moduleName = arg("playwright", process.env.PLAYWRIGHT_MODULE || "playwright");

if ((!html && !url) || !Number.isFinite(scale) || scale < 1) {
  console.error("Usage: node scripts/capture-xhs-carousel.mjs --html <file.html> --out-dir <folder> [--prefix name] [--scrolls 0,760,1156] [--overlap 220]");
  console.error("       node scripts/capture-xhs-carousel.mjs --url <local-url> --out-dir <folder>");
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = await import(moduleName));
} catch (error) {
  console.error(`Unable to import Playwright from "${moduleName}".`);
  console.error("Install Playwright or pass --playwright /absolute/path/to/playwright/index.mjs.");
  console.error(error.message);
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

const target = url || pathToFileURL(resolve(process.cwd(), html)).href;
const browser = await chromium.launch({ headless: true, executablePath: chrome });
const page = await browser.newPage({
  viewport: { width: 900, height: 1100 },
  deviceScaleFactor: scale,
});

await page.goto(target, { waitUntil: "load" });
await page.evaluate(() => document.fonts?.ready);
await page.waitForTimeout(500);

if (Number.isFinite(extraBottom) && extraBottom > 0) {
  await page.evaluate(({ sel, extraBottom }) => {
    const article = document.querySelector(sel)?.querySelector(".article");
    if (!article) return;
    const current = Number.parseFloat(getComputedStyle(article).paddingBottom) || 0;
    article.style.paddingBottom = `${current + extraBottom}px`;
  }, { sel: selector, extraBottom });
}

const metrics = await page.evaluate((sel) => {
  const card = document.querySelector(sel);
  const article = card?.querySelector(".article");
  const rect = card?.getBoundingClientRect();
  if (!card || !article || !rect) return null;
  return {
    cssWidth: Math.round(rect.width),
    cssHeight: Math.round(rect.height),
    clientHeight: article.clientHeight,
    scrollHeight: article.scrollHeight,
    maxScrollTop: Math.max(0, article.scrollHeight - article.clientHeight),
  };
}, selector);

if (!metrics) {
  await browser.close();
  throw new Error(`No ${selector} element with .article found`);
}

let scrolls = [];
if (scrollsArg) {
  scrolls = scrollsArg.split(",").map((value) => Number(value.trim())).filter(Number.isFinite);
} else {
  const step = Math.max(1, metrics.clientHeight - overlap);
  for (let y = 0; y < metrics.maxScrollTop; y += step) scrolls.push(Math.round(y));
  if (!scrolls.includes(metrics.maxScrollTop)) scrolls.push(metrics.maxScrollTop);
}
scrolls = [...new Set(scrolls.map((value) => Math.max(0, Math.min(metrics.maxScrollTop, Math.round(value)))))];

const outputs = [];
for (let index = 0; index < scrolls.length; index++) {
  const scrollTop = scrolls[index];
  await page.evaluate(({ sel, scrollTop }) => {
    document.querySelector(sel).querySelector(".article").scrollTop = scrollTop;
  }, { sel: selector, scrollTop });
  await page.waitForTimeout(120);
  const file = resolve(outDir, `${prefix}-${String(index + 1).padStart(2, "0")}.png`);
  await page.locator(selector).first().screenshot({ path: file });
  outputs.push({ file, scrollTop, pixels: { width: metrics.cssWidth * scale, height: metrics.cssHeight * scale } });
}

await writeFile(resolve(outDir, `${prefix}-manifest.json`), JSON.stringify({
  source: html || url,
  selector,
  scale,
  extraBottom,
  metrics,
  outputs,
}, null, 2));

console.log(JSON.stringify({ outDir, count: outputs.length, outputs }, null, 2));
await browser.close();
