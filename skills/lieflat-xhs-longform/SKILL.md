---
name: lieflat-xhs-longform
description: Create Xiaohongshu/小红书 longform vertical article cards from the Lieflat style pack. Use for readable 3:5 long images, article-to-card conversion, product reviews, AI notes, brand essays, and collectible Chinese social reading cards. Contains 11 longform style families.
---

# Lieflat XHS Longform

## What This Skill Does

Create one vertical Xiaohongshu longform article card. The output is a readable `3:5` image, not a slide deck and not a cover.

Before choosing a style, read:

1. `assets/catalog.json`
2. `references/style-understanding.md`

Use `assets/templates/<template-id>/zh.html` as a starter. Copy it into the user's workspace before editing.

## Core Rules

- Output should read as a continuous article card: title, short subtitle if needed, section heading, body, and compact footer.
- Do not make it look like a PPT slide or a cover card.
- Default to Chinese visible copy unless the user explicitly requests another language.
- Do not mechanically preserve decorative blocks from the demo. Keep only the structures that help the article read better.
- Preserve the chosen style's palette, type rhythm, ornaments, and atmosphere.
- Do not invent claims, numbers, product facts, or quotes.

## Canvas And Export

- CSS canvas: `600px × 1000px`, `3:5`.
- Default export: `1200px × 2000px` PNG with `deviceScaleFactor: 2`.
- Body text baseline: around `22-24px`, line-height around `1.7-1.85`.
- Section headings: around `26-30px`.
- Inner padding: around `50px`, adjusted to the chosen style.

After creating the HTML, run:

```bash
node scripts/capture-xhs-card.mjs --html <path-to-html> --out <path-to-card.png>
```

For a multi-image carousel:

```bash
node scripts/capture-xhs-carousel.mjs --html <path-to-html> --out-dir <folder>
```

## Workflow

1. Read `assets/catalog.json` and `references/style-understanding.md`.
2. Select one longform style.
3. Copy the chosen starter into the project.
4. Rewrite the source into a compact article structure.
5. Replace title, subtitle, sections, body, labels, metadata, and footer.
6. Remove unneeded badges, charts, or ornamental panels if they interrupt reading.
7. Run PNG export and visually inspect the output.

## Useful Scripts

```bash
node scripts/list-templates.mjs
node scripts/create-design.mjs --template xhs-sunrise --lang zh --out output/xhs-demo.html
node scripts/capture-xhs-card.mjs --html output/xhs-demo.html --out output/xhs-demo-card.png
node scripts/capture-xhs-carousel.mjs --html output/xhs-demo.html --out-dir output/xhs-carousel
```

