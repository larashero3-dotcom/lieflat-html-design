#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const target = resolve(process.cwd(), process.argv[2] || ".");
const exts = new Set([".html", ".htm", ".md", ".json", ".js", ".mjs", ".css"]);
const riskPatterns = [
  ["remote-image", "error", /<img[^>]+src=["']https?:\/\//ig],
  ["remote-css-url", "warning", /url\(["']?https?:\/\//ig],
  ["secret-ish", "error", /\b(api[_-]?key|secret|bearer|private[_-]?key)\b|password\s*[:=]/ig],
  ["email", "error", /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/ig],
  ["placeholder", "warning", /\b(TODO|PLACEHOLDER|LOREM|IPSUM)\b/ig],
  ["privacy-zh", "error", /(手机号|电话|微信|邮箱|内部|机密|保密|身份证|聊天记录|通讯录)/g]
];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(path));
    else if (entry.isFile() && exts.has(extname(entry.name).toLowerCase())) out.push(path);
  }
  return out;
}

const files = (await stat(target)).isDirectory() ? await walk(target) : [target];
const findings = [];
for (const file of files) {
  const text = await readFile(file, "utf8");
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    for (const [name, severity, pattern] of riskPatterns) {
      pattern.lastIndex = 0;
      if (pattern.test(lines[i])) {
        findings.push({
          type: name,
          severity,
          file,
          line: i + 1,
          excerpt: lines[i].trim().slice(0, 180)
        });
      }
    }
  }
}

const errors = findings.filter((finding) => finding.severity === "error");
if (errors.length) {
  console.log(JSON.stringify({ ok: false, errors, findings }, null, 2));
  process.exitCode = 2;
} else {
  console.log(JSON.stringify({ ok: true, warnings: findings }, null, 2));
}
