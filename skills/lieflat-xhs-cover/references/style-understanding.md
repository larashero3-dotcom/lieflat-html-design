# Lieflat XHS Cover Style Understanding

Cover cards are for the first glance. They should make a clear promise, not present the whole article.

## Cover Structure

- Large Chinese title, usually 1-3 lines.
- Optional short subtitle, verdict, or series label.
- One visual anchor: grid, badge, rule, object, glow, or editorial mark.
- Small metadata or footer.
- No continuous body paragraphs.
- No dense charts unless the chart is the hook.

## Template Isolation

- Each cover style is a complete design system, not a skin. When creating a different style, begin from that style's own starter file and rebuild the content inside it.
- Do not paste layout blocks from one template into another, such as Clean Review metric cards inside Editorial, Pixel HUD panels inside Sunrise, or Rain Notes paper ornaments inside Dot Matrix.
- Do not reuse a previously edited cover as the base for another style. This often leaves old class names, spacing assumptions, decorative layers, and responsive rules that make the new style look broken.
- Borrow only the content idea: title, subtitle, tags, or proof points. Re-express the structure using the target template's native modules, typography, spacing, borders, materials, and visual rhythm.
- Before export, scan the HTML/CSS for leftover source-template class names or motifs. If they remain, restart from the target starter rather than patching around them.

## Editorial Cover Guardrails

- For `xhs-cover-editorial`, black reverse-title blocks must not touch the glyphs. Give the black block enough horizontal and vertical padding, and add clear separation from the line above.
- If only the final title line is reversed, treat it as a separate line or inline-block with its own `line-height`, padding, and `margin-top`; do not let it inherit a tight title line-height that makes the black area visually eat into white characters.
- Keep at least a small cream gutter around the reverse block. If the block touches the previous line, either lower the block, reduce title size slightly, or split the title into fewer, more breathable lines.

## Pixel Report Cover Guardrails

- For `xhs-cover-pixel-report`, HUD grid lines, scan lines, dividers, and frame rules are decorative background elements. They must never pass over readable title, body, panel, metric, or footer text.
- Keep strong vertical or horizontal divider lines inside metadata bands, borders, or empty background zones. If a line crosses content, shorten it, move it behind a low-contrast background area, or remove it.
- At thumbnail size, decorative grid lines should read as texture, not as accidental strokes, cursor artifacts, or broken glyphs.

## Style Families

| 中文名 | Template ID | Use When | Cover Rhythm |
|---|---|---|---|
| 简约测评 | `xhs-cover-clean-review` | Product verdicts, rankings, comparison posts | Clear title, rating/evaluation feel, restrained accent |
| 杂志风 | `xhs-cover-editorial` | Thought pieces, essays, creator columns | Editorial title hierarchy, refined whitespace |
| 点阵编辑风 | `xhs-cover-dot-matrix` | AI systems, technical observations, model commentary | Dot field, signal labels, technical title card |
| 咨询报告 | `xhs-cover-consulting-report` | Business analysis, strategy topics, industry insights | Report-like title, sober structure, high trust |
| 雨天手记 | `xhs-cover-rain-notes` | Quiet notes, reflective reviews, calm product thoughts | Soft atmosphere, gentle title rhythm |
| 黑底闪光 | `xhs-cover-pixel-report` | AI/model hot takes, technical hooks, metric-led posts | Dark grid, neon/pixel accents, sharp title contrast |
| 日光 | `xhs-cover-sunrise` | Premium brand reflections, lifestyle or philosophy hooks | Warm whitespace, elegant serif title, golden restraint |
| 极客风格 | `xhs-cover-geek-report` | Developer-facing topics, tool notes, AI build logs | Terminal-paper energy, compact technical labels |
| 终端风 | `xhs-cover-terminal` | Command-line, automation, hacker-ish topics | Monospace title, terminal framing, direct hook |
| 故事集 | `xhs-cover-story-field` | Field reports, project stories, place/person narratives | Cinematic crop, archive mood, story promise |
| 镭射网格 | `xhs-cover-shiny-tiles` | Polished tech/design-system posts | Silver glass, dark grid, premium technical shine |

## Thumbnail Check

Before delivery, zoom out or screenshot at small size. The title should still be readable, and the visual anchor should not compete with the words.
