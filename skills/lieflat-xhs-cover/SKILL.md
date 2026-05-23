---
name: lieflat-xhs-cover
description: Create Xiaohongshu/小红书 cover or first-image title cards from the Lieflat style pack. Use for 3:4 social covers, title-first cards, post openers, AI/product/brand topic covers, and Chinese social thumbnails. Contains 11 cover style families.
---

# Lieflat XHS Cover

## What This Skill Does

Create one Xiaohongshu cover / first image. The output is a title-first `3:4` image designed for quick recognition, not a longform article and not a slide deck.

Before choosing a style, read:

1. `assets/catalog.json`
2. `references/style-understanding.md`

Use `assets/templates/<template-id>/zh.html` as a starter. Copy it into the user's workspace before editing.

## Core Rules

- The title is the product. Make it legible at thumbnail size.
- Use a short subtitle, verdict, or hook only when it sharpens the title.
- One visual anchor is enough. Do not fill the cover with body paragraphs.
- Default to Chinese visible copy unless the user explicitly requests another language.
- Do not write `小红书封面` as visible copy unless the user explicitly asks for that label.
- Preserve the chosen style's atmosphere while keeping the cover simple.
- Do not mix template systems. If switching from one cover style to another, start again from the new style's starter HTML instead of carrying over the previous template's DOM, class names, layout modules, CSS variables, or decorative blocks.

## Canvas And Export

- CSS canvas: `600px × 800px`, `3:4`.
- Default export: `1200px × 1600px` PNG with `deviceScaleFactor: 2`.
- Title baseline: around `44-72px`, Chinese line-height around `1.05-1.2`.
- Subtitle baseline: around `19-24px`.
- Metadata baseline: around `10-16px`.

After creating the HTML, run:

```bash
node scripts/capture-xhs-card.mjs --html <path-to-html> --out <path-to-cover.png>
```

## Workflow

1. Read `assets/catalog.json` and `references/style-understanding.md`.
2. Select one cover style.
3. Copy the chosen starter into the project. For each alternate style or revision that changes style family, copy a fresh starter for that target style.
4. Rewrite the user's topic into a compact cover title and optional subtitle.
5. Replace title, metadata, footer, labels, and visual hook.
6. Remove article paragraphs or demo-only blocks.
7. Export PNG and inspect thumbnail readability.

## Useful Scripts

```bash
node scripts/list-templates.mjs
node scripts/create-design.mjs --template xhs-cover-dot-matrix --lang zh --out output/xhs-cover-demo.html
node scripts/capture-xhs-card.mjs --html output/xhs-cover-demo.html --out output/xhs-cover-demo.png
```
