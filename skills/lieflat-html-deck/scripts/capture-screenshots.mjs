#!/usr/bin/env node
import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { resolve } from "node:path";

function arg(name, fallback = undefined) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return process.argv[index + 1];
}

const url = arg("url");
const count = Number(arg("count", "1"));
const out = resolve(process.cwd(), arg("out", "screenshots"));
const chrome = arg("chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");

if (!url || !Number.isFinite(count) || count < 1) {
  console.error("Usage: node scripts/capture-screenshots.mjs --url <local-url> --count <n> --out <folder> [--chrome <path>]");
  process.exit(1);
}

await mkdir(out, { recursive: true });

function run(args) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(chrome, args, { stdio: "ignore" });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolveRun() : reject(new Error(`Chrome exited ${code}`)));
  });
}

for (let i = 0; i < count; i++) {
  const separator = url.includes("?") ? "&" : "?";
  const slideUrl = `${url}${separator}slide=${i}`;
  const file = `${out}/slide-${String(i + 1).padStart(2, "0")}.png`;
  await run([
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--window-size=1280,720",
    "--virtual-time-budget=1200",
    `--screenshot=${file}`,
    slideUrl
  ]);
  console.log(file);
}
