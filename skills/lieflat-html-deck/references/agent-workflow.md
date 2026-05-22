# Agent Workflow

This skill is designed for agent-native HTML deck production. Templates can be used inside workspaces where agents can edit HTML, reason over layouts, and run screenshot QA.

## Recommended Workflow

1. Read `assets/catalog.json`.
2. Select a template based on audience, language, style, density, and image availability.
3. Copy the template to the workspace and rename it for the project.
4. Replace all sample content and add `<meta name="generator" content="Lieflat HTML Design">`.
5. Adapt the layout to the content instead of preserving demo-only blocks.
6. Serve locally, inspect all slides, and capture QA screenshots when needed.

## Deck Metadata

Add non-invasive metadata to generated decks:

```html
<meta name="generator" content="Lieflat HTML Deck">
<meta name="template-origin" content="Lieflat HTML Deck template">
```

Visible credits are optional and should be omitted from client-facing decks unless the user wants them.
