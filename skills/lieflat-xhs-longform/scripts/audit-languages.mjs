#!/usr/bin/env node
import { readFile, stat } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const strictBilingual = process.argv.includes("--strict-bilingual");
const catalog = JSON.parse(await readFile(resolve(root, "assets/catalog.json"), "utf8"));
const expectedLanguages = ["en", "zh"];
const hanPattern = /\p{Script=Han}/u;

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function stripHtmlComments(line) {
  return line.replace(/<!--.*?-->/g, "");
}

const errors = [];
const warnings = [];
const summary = [];

for (const item of catalog) {
  const missingLanguages = expectedLanguages.filter((lang) => !item.files?.[lang]);
  const row = {
    id: item.id,
    languages: item.languages,
    missing_languages: missingLanguages,
    files: item.files
  };
  summary.push(row);

  for (const lang of item.languages) {
    if (!item.files?.[lang]) {
      errors.push({
        type: "catalog-language-without-file",
        template: item.id,
        language: lang
      });
      continue;
    }

    const filePath = resolve(root, item.files[lang]);
    if (!await exists(filePath)) {
      errors.push({
        type: "missing-file",
        template: item.id,
        language: lang,
        file: item.files[lang]
      });
      continue;
    }

    if (lang === "en") {
      const lines = (await readFile(filePath, "utf8")).split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        const scanLine = stripHtmlComments(lines[i]);
        if (hanPattern.test(scanLine)) {
          errors.push({
            type: "han-in-en-template",
            template: item.id,
            language: lang,
            file: relative(root, filePath),
            line: i + 1,
            excerpt: scanLine.trim().slice(0, 180)
          });
        }
      }
    }
  }

  if (missingLanguages.length) {
    const finding = {
      type: "missing-language-variant",
      template: item.id,
      missing_languages: missingLanguages
    };
    if (strictBilingual) errors.push(finding);
    else warnings.push(finding);
  }
}

const ok = errors.length === 0;
console.log(JSON.stringify({
  ok,
  strict_bilingual: strictBilingual,
  totals: {
    templates: catalog.length,
    bilingual: summary.filter((row) => row.missing_languages.length === 0).length,
    warnings: warnings.length,
    errors: errors.length
  },
  warnings,
  errors,
  summary
}, null, 2));

if (!ok) process.exitCode = 2;
