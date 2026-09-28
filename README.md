# Imran Safdar — Portfolio

Portfolio V3 foundation built with Next.js (App Router), Tailwind CSS, and TypeScript.

The current branch intentionally contains only the global visual system and a
minimal foundation canvas. Homepage sections will be built in a later phase.

## Design system

- Brand tokens: `src/styles/tokens.css`
- Reusable layout, type, surface, button, signature, and grid utilities:
  `src/styles/utilities.css`
- Global reset, accessibility defaults, and grain: `src/styles/global.css`

Cabinet Grotesk and Satoshi are represented as font roles with system
fallbacks. Add properly licensed font files before the homepage typography is
finalized. The signature role is intentionally unassigned until the custom
handwritten SVG is available.

## Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
