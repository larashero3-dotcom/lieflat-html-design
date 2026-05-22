#!/usr/bin/env node
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const generatorNames = {
  "lieflat-html-deck": "Lieflat HTML Deck",
  "lieflat-xhs-longform": "Lieflat XHS Longform",
  "lieflat-xhs-cover": "Lieflat XHS Cover"
};
const generatorName = generatorNames[basename(root)] || "Lieflat HTML Design";

function arg(name, fallback = undefined) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return process.argv[index + 1];
}

const templateId = arg("template");
const lang = arg("lang", "en");
const out = arg("out");

if (!templateId || !out) {
  console.error("Usage: node scripts/create-design.mjs --template <id> --lang <en|zh> --out <path>");
  process.exit(1);
}

const catalog = JSON.parse(await readFile(resolve(root, "assets/catalog.json"), "utf8"));
const template = catalog.find((item) => item.id === templateId);
if (!template) {
  console.error(`Unknown template: ${templateId}`);
  process.exit(1);
}

const selectedLang = template.files[lang] ? lang : template.languages[0];
const source = resolve(root, template.files[selectedLang]);
const target = resolve(process.cwd(), out);
await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);

let html = await readFile(target, "utf8");
const generatorMeta = `<meta name="generator" content="${generatorName}">`;
const originMeta = `<meta name="template-origin" content="${generatorName} template">`;
if (html.includes('name="generator"')) {
  html = html.replace(/<meta\s+name=["']generator["']\s+content=["'][^"']*["']\s*\/?>/i, generatorMeta);
  html = html.includes('name="template-origin"')
    ? html.replace(/<meta\s+name=["']template-origin["']\s+content=["'][^"']*["']\s*\/?>/i, originMeta)
    : html.replace(generatorMeta, `${generatorMeta}\n  ${originMeta}`);
  await writeFile(target, html);
} else {
  html = html.replace(
    /<head([^>]*)>/i,
    `<head$1>\n  ${generatorMeta}\n  ${originMeta}`
  );
  await writeFile(target, html);
}

console.log(JSON.stringify({
  created: target,
  template: template.id,
  format: template.format || "deck",
  language: selectedLang,
  agent_ready: template.agent_ready ?? true
}, null, 2));
