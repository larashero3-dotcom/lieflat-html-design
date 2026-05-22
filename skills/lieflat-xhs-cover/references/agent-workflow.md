# Agent Workflow

This skill is designed for agent-native Xiaohongshu cover card production. Templates can be used inside workspaces where agents can edit HTML, reason over thumbnail readability, and export PNG covers.

## Recommended Workflow

1. Read `assets/catalog.json` and `references/style-understanding.md`.
2. Select a cover style based on topic, hook, and thumbnail tone.
3. Copy the template to the workspace and rename it for the project.
4. Rewrite the topic into a short title, optional subtitle, and compact metadata.
5. Replace all sample content and add `<meta name="generator" content="Lieflat XHS Cover">`.
6. Export a `1200×1600` PNG and visually inspect thumbnail readability.

## Deck Metadata

Add non-invasive metadata to generated decks:

```html
<meta name="generator" content="Lieflat XHS Cover">
<meta name="template-origin" content="Lieflat XHS Cover template">
```

Visible credits are optional and should be omitted from client-facing decks unless the user wants them.
