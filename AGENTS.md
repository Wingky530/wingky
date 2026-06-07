# Agent Guidance for Wingky Repository

This document provides essential context for working in the `wingky` repository.

## Project Overview
-   **Type:** Personal portfolio and landing page.
-   **Key Technologies:** Astro 6, Tailwind CSS v4, Anime.js v4, opentype.js, React 19, PNPM.

## Development Commands
-   **Start Dev Server:** `pnpm dev`
-   **Build Project:** `pnpm build`
-   **Preview Build:** `pnpm preview`
-   **Astro CLI:** `pnpm astro`

## Stack Detail
-   **CSS Framework:** Tailwind CSS v4 (utility classes, no `@apply` or config file needed)
-   **CSS Variables (defined in `global.css`):**
    - `--color-background`, `--color-primary`, `--color-muted`
    - `--color-accent`, `--color-accent-muted`, `--color-border`
    - Theme switching uses `data-theme` attribute on `<html>` + `localStorage('wingky-theme')`.
    - Light mode variables defined under `[data-theme="light"]` selector.
-   **React Integration:** `@astrojs/react` version **must** match Astro's major (Astro 6 → `@astrojs/react` ^5.x). Mismatch causes silent hydration failure — component renders HTML but `useState`/`useEffect` never run. ViewPortProject.tsx is the only React island.

## Design System References
-   **PRODUCT.md** — Project strategy: register (brand/portfolio), audience, brand personality, anti-references, accessibility targets.
-   **DESIGN.md** — Visual design spec: color palette, typography, component roles, layout principles. Auto-generated from code via `/impeccable document`.
-   **Impeccable Skill** — Available at `.opencode/skills/impeccable/`. Provides commands: `audit`, `polish`, `craft`, `shape`, `colorize`, `animate`, `layout`, etc. Run `node .opencode/skills/impeccable/scripts/context.mjs` for project state.

## Component Architecture

### Theme System
-   **ThemeToggle.astro** — Black hole icon toggle at bottom-center. Orchestrates:
    - Outward (dark→light): overlay clip-path circle expands from button, theme swaps at ~600ms behind overlay.
    - Inward (light→dark): overlay appears full instantly, theme swaps behind it, overlay shrinks to reveal.
    - Dispatches `theme-ripple` custom event to GridRipple.
    - Dispatches `themechange` event for Canvas and AnimatedTitle color sync.
-   **GridRipple.astro** — Separate layer (z:45) for per-cell flash animation. Listens to `theme-ripple` event. Direction-aware: outward ripple for dark→light, inward ripple for light→dark. Flash opacity set to 0.8.
-   **GridBackground.astro** — Full-screen grid lines layer. Currently soft-disabled (commented out in `src/pages/index.astro`). Supports slide-in entrance animation (random direction) via `grid-intro-anim` custom event if re-enabled.

### Other Components
-   **AnimatedTitle.astro** — SVG title with stroke-draw intro animation using opentype.js. Controls visibility of nav, desc, and theme toggle via timeline. Contains internal `grid-svg` for decorative lines that fades out after animation completes.
-   **Canvas.astro** — Floating particle system. Listens to `themechange` to update particle color.
-   **ViewPortProject.tsx** — React island component (client:load). Project showcase with tabbed SVG illustrations, animated via CSS keyframes. Uses Anime.js for content fade on tab switch.

## Specific Toolchain Quirks & Conventions
-   **Astro Client-side Scripts:** Native `<script>` tags in `.astro` files with `import` statements already get Vite processing — **no `client:load` needed**. The `client:load` directive is only for framework components (React, Vue, etc.). Direct `import` in `<script define:vars={{...}}>` will fail as those are treated as inline scripts without Vite processing.
-   **Font Handling (`opentype.js`):** The `opentype.js` library used in `src/components/AnimatedTitle.astro` **only supports TTF/OTF fonts**, not WOFF2. Ensure a `.ttf` version is provided. Font file expected at `public/fonts/wingky.ttf`.
-   **Animations (`animejs` v4):**
    - **Import rules:**
      - `import { createTimeline } from 'animejs/timeline'`
      - `import { stagger } from 'animejs/utils'`
      - `import { animate } from 'animejs'`
    - **Banned syntax (v3 — will break):**
      - Do NOT use `anime()`, `anime.timeline()`, or `anime.stagger()`.
    - **Correct usage:**
      - `const tl = createTimeline({...}); tl.add(el, {...}, offset)`
      - `delay: stagger(40)` instead of `anime.stagger(40)`
-   **Scoped CSS in Astro:** Elements created at runtime via JS don't get Astro's scope hash. Use `#id > :global(div)` for JS-created children, and `:global([data-theme="dark"] .class)` for theme-dependent styles on SVG elements inside components.

## Git Conventions
- **Commit messages** must follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:` for new features
  - `fix:` for bug fixes
  - `refactor:` for code restructure without feature/bug change
  - `chore:` for build/config/tooling
  - `style:` for formatting/styling only
  - `docs:` for documentation
  - `perf:` for performance improvements
  - Use optional scope in parentheses, e.g. `fix(animate): ...`
  - Keep message concise, present tense, lowercase after type

## Code Documentation
- Every component must have a documentation comment block at the top (in English) describing its purpose and listing all functions/blocks with brief descriptions.
- This ensures developers can find functionality quickly without reading the entire file.

## AI Preferences
- Use thinking more efficiently.
- Do not put long code inside thinking to avoid wasting tokens.
- Do not get stuck in thinking loops (e.g., thinking about the same topic more than 3 times).
- For small iterative tweaks (visual offsets, colors, spacing), apply changes directly without build/push unless asked. Only build/push when the user requests it or the change is functionally significant.

## Developer Environment
- **Device:** Android phone (no desktop/laptop access)
- **Terminal:** Termux
- **Limitations:** Cannot access browser console logs or other desktop-specific debugging tools. Rely solely on terminal output and direct file modifications.
