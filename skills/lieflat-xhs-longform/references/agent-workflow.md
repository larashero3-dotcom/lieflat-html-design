# Agent Workflow

This skill is designed for agent-native Xiaohongshu longform card production. Templates can be used inside workspaces where agents can edit HTML, reason over reading hierarchy, and export PNG cards.

## Recommended Workflow

1. Read `assets/catalog.json` and `references/style-understanding.md`.
2. Select a longform style based on topic, reading density, and tone.
3. Copy the template to the workspace and rename it for the project.
4. Rewrite the content into title, subtitle, sections, body, and footer.
5. Replace all sample content and add `<meta name="generator" content="Lieflat XHS Longform">`.
6. Export a `1200×2000` PNG and visually inspect readability.

## Deck Metadata

Add non-invasive metadata to generated decks:

```html
<meta name="generator" content="Lieflat XHS Longform">
<meta name="template-origin" content="Lieflat XHS Longform template">
```

Visible credits are optional and should be omitted from client-facing decks unless the user wants them.
