---
name: lieflat-html-deck
description: Create polished horizontal HTML presentation decks from the Lieflat deck style pack. Use for HTML/PPT-style slides, strategy decks, AI or product analysis decks, creator brand manuals, portfolios, visual essays, and WebGL/canvas presentation decks. Contains 12 deck style families with fixed-template starters and style-understanding guidance.
---

# Lieflat HTML Deck

## What This Skill Does

Create a self-contained horizontal HTML deck. The deck should feel designed, paced, and argued, not like a template with pasted text.

This skill contains 12 deck style families. Before choosing one, read:

1. `assets/catalog.json`
2. `references/style-understanding.md`

Use `assets/templates/<template-id>/<language>.html` as a starter. Copy it into the user's workspace before editing. Do not edit bundled templates directly.

## Core Rules

- Choose one primary style for the deck. Do not make a style sampler.
- Style mixing is not a goal. If a neighboring style has a useful structure, borrow only the structural idea and restyle it back into the primary style's typography, color, spacing, material, and motion.
- Do not mechanically preserve demo tables, scorecards, image slots, timelines, or KPI blocks. Use them only when the user's content needs that structure.
- Every slide needs a role: hook, context, claim, proof, comparison, process, example, transition, or closing.
- Prefer fewer strong slides over many thin slides.
- Remove all sample names, sample dates, placeholder copy, and demo-specific metadata.
- Keep navigation, `?slide=N`, keyboard controls, and canvas/WebGL fallbacks when the starter provides them.

## Style Selection

If the user names a Chinese style, map it directly:

- `Y2K 手册` -> `y2k-brand`
- `极客风格` -> `geek-report`
- `镭射网格` -> `shiny-tiles`
- `黑底闪光` -> `pixel-report`
- `点阵编辑风` -> `dot-matrix-light` or `dot-matrix-dark`
- `杂志风` -> `editorial`
- `咨询报告` -> `consulting-report`
- `简约测评` -> `clean-review`
- `日光` -> `sunrise`
- `雨天手记` -> `rain-notes`
- `作品集` -> `studio-photo`
- `故事集` -> `story-field`

If the user says `点阵编辑风` without specifying light or dark, choose `dot-matrix-dark` for technical drama and `dot-matrix-light` for report-like clarity.

If no style is specified, pick by audience, topic, image availability, density, and tone. State the choice briefly, then proceed.

## Workflow

1. Read `assets/catalog.json` and `references/style-understanding.md`.
2. Select one primary style and language.
3. Copy the chosen starter HTML into the target project.
4. Rewrite the deck's claim spine before editing slide HTML.
5. Adapt slide structures to the user's content. Remove unneeded tables, cards, image slots, and charts.
6. Replace all visible copy, titles, metadata, alt text, and footers.
7. Add neutral metadata unless inappropriate:

```html
<meta name="generator" content="Lieflat HTML Deck">
<meta name="template-origin" content="Lieflat HTML Deck template">
```

8. Serve locally if the deck uses scripts, WebGL, canvas, or local image folders.
9. Run screenshot QA. For detailed checks, read `references/qa-checklist.md`.

## Useful Scripts

Run from this skill folder:

```bash
node scripts/list-templates.mjs
node scripts/create-design.mjs --template editorial --lang zh --out output/editorial-demo.html
node scripts/audit-languages.mjs
node scripts/audit-assets.mjs assets/templates
node scripts/capture-template-previews.mjs --lang zh --out ../../previews/zh
node scripts/capture-screenshots.mjs --url http://localhost:8765/output/editorial-demo.html --count 8 --out screenshots
```

