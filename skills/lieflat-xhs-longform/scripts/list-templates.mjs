#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(await readFile(resolve(root, "assets/catalog.json"), "utf8"));

const rows = catalog.map((item) => ({
  id: item.id,
  format: item.format || "deck",
  languages: item.languages.join(","),
  density: item.density,
  motion: item.motion,
  images: item.image_intensity,
  best_for: item.best_for.slice(0, 3).join("; "),
  style: item.style_tags.slice(0, 5).join(", ")
}));

const cols = ["id", "format", "languages", "density", "motion", "images", "best_for", "style"];
const widths = Object.fromEntries(cols.map((col) => [
  col,
  Math.max(col.length, ...rows.map((row) => String(row[col]).length))
]));

function line(row) {
  return cols.map((col) => String(row[col]).padEnd(widths[col])).join("  ");
}

console.log(line(Object.fromEntries(cols.map((col) => [col, col]))));
console.log(cols.map((col) => "-".repeat(widths[col])).join("  "));
for (const row of rows) console.log(line(row));
