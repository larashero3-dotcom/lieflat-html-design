---
name: lieflat-html-design
description: Route a user's request to the right Lieflat HTML Design skill. Use when the user asks for a polished HTML visual artifact but has not clearly chosen between a horizontal HTML deck, Xiaohongshu longform article card, or Xiaohongshu cover/first-image card.
---

# Lieflat HTML Design Router

This is the routing skill for the Lieflat HTML Design collection. It does not contain the production templates itself. Use it to identify the delivery surface, then load the appropriate sibling skill:

- `lieflat-html-deck` for horizontal HTML presentations / PPT-style decks.
- `lieflat-xhs-longform` for Xiaohongshu / 小红书 readable longform vertical cards.
- `lieflat-xhs-cover` for Xiaohongshu / 小红书 cover or first-image title cards.

## Route By User Intent

| User asks for | Use |
|---|---|
| PPT, slides, presentation, deck, 演示, 横向翻页, strategy deck, brand manual, portfolio deck | `lieflat-html-deck` |
| 小红书长文, 小红书图文长图, longform card, readable vertical article image, 竖图文章 | `lieflat-xhs-longform` |
| 小红书封面, 首图, title card, cover, 第一张图, thumbnail | `lieflat-xhs-cover` |

If the user asks for a complete Xiaohongshu post with both cover and body card, use `lieflat-xhs-cover` for the first image and `lieflat-xhs-longform` for the reading card. Keep their visual family aligned, but do not merge the two formats into one artifact.

If the request is ambiguous, ask at most one clarifying question. If the likely intent is clear from context, choose decisively and state the assumption.

## Style Names

Chinese style names are valid. Do not force users to know template IDs.

Examples:

```text
用日光风格做一份中文演示。
用点阵编辑风做一张小红书封面。
用咨询报告风格做一张小红书长文图。
```

After routing, follow the target skill's own `SKILL.md` and style-understanding reference.

