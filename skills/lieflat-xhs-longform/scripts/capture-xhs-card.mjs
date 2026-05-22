#!/usr/bin/env node
import { access } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

function arg(name, fallback = undefined) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return process.argv[index + 1];
}

const html = arg("html");
const url = arg("url");
const out = arg("out");
const selector = arg("selector", ".card, .scene");
const scale = Number(arg("scale", "2"));
const chrome = arg("chrome");
const moduleName = arg("playwright", process.env.PLAYWRIGHT_MODULE || "playwright");

if ((!html && !url) || !Number.isFinite(scale) || scale < 1) {
  console.error("Usage: node scripts/capture-xhs-card.mjs --html <file.html> --out <card.png> [--scale 2] [--selector '.card, .scene'] [--playwright <module-or-file>]");
  console.error("       node scripts/capture-xhs-card.mjs --url <local-url> --out <card.png> [--scale 2]");
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

const target = url || pathToFileURL(resolve(process.cwd(), html)).href;
if (html) await access(resolve(process.cwd(), html));
const output = resolve(process.cwd(), out || `${resolve(process.cwd(), html).replace(/\.html?$/i, "")}-card.png`);

const launchOptions = { headless: true, args: ["--disable-gpu"] };
if (chrome) launchOptions.executablePath = chrome;
const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({
  viewport: { width: 900, height: 1100 },
  deviceScaleFactor: scale,
});

await page.goto(target, { waitUntil: "load" });
await page.evaluate(() => document.fonts?.ready);
await page.waitForTimeout(500);

const card = page.locator(selector).first();
await card.waitFor({ state: "visible", timeout: 5000 });
await card.screenshot({ path: output });

const metrics = await page.evaluate((sel) => {
  const cardEl = document.querySelector(sel);
  const article = cardEl?.querySelector(".article");
  const rect = cardEl?.getBoundingClientRect();
  const canvas = cardEl?.querySelector("canvas");
  let webgl = false;
  if (canvas) {
    webgl = Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  }
  return {
    cssWidth: Math.round(rect?.width || 0),
    cssHeight: Math.round(rect?.height || 0),
    scrollHeight: article?.scrollHeight || null,
    clientHeight: article?.clientHeight || null,
    webgl,
  };
}, selector);

console.log(JSON.stringify({
  output,
  pixels: {
    width: metrics.cssWidth * scale,
    height: metrics.cssHeight * scale,
  },
  scale,
  ...metrics,
}, null, 2));

await browser.close();
