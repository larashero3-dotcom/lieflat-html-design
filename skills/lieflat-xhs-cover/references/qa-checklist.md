# Lieflat HTML Design QA Checklist

Run these checks before final delivery.

## Browser QA

- Serve locally when scripts, WebGL, canvas, or image folders are involved.
- Open each slide via query parameter if supported, e.g. `?slide=0`.
- Confirm navigation buttons, keyboard arrows, dots/progress, and page count work.
- Confirm WebGL/canvas visuals render or a graceful fallback appears.
- For HTML PPT/deck outputs, screenshots are QA artifacts only; do not deliver or keep a full screenshot export set unless the user asks for image export. 小红书 outputs are the exception and should be exported as PNGs according to SKILL.md.

## Visual QA

- No clipped titles, subtitles, body text, captions, or buttons.
- No floating decorative element covers readable copy.
- Long words and mixed Chinese/English text fit their containers.
- Image crops do not hide the subject.
- Footer/page markers stay consistent.
- Global theme stays consistent across all slides. If a deck uses a light or dark variant, there is no theme toggle, `?theme=` override, or keyboard shortcut that changes the final deck theme.
- First and last slides feel intentionally different from source references when adapting a user-provided reference.

## Template Hygiene

- Old sample names, model names, company names, and placeholder copy are removed.
- Metadata title matches the output.
- File names are clean and project-specific.
- No remote image URLs or missing local images remain unless intentionally documented.
