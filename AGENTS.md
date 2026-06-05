# Agent Guidance for Wingky Repository

This document provides essential context for working in the `wingky` repository.

## Project Overview
-   **Type:** Personal portfolio and landing page.
-   **Key Technologies:** Astro, React, Tailwind CSS, Anime.js, opentype.js, PNPM.

## Development Commands
-   **Start Dev Server:** `pnpm dev`
-   **Build Project:** `pnpm build`
-   **Preview Build:** `pnpm preview`
-   **Astro CLI:** `pnpm astro`

## Specific Toolchain Quirks & Conventions
-   **Astro Client-side Scripts:** Client-side JavaScript that uses `import` statements (e.g., for libraries like `animejs`) must be declared with `client:load` on the `<script>` tag in Astro components. Direct `import` in `<script define:vars={{...}}>` will fail as these are treated as inline scripts without Vite processing.
-   **Font Handling (`opentype.js`):** The `opentype.js` library used in `src/pages/index.astro` for font manipulation **only supports TTF/OTF fonts**, not WOFF2. If fonts are updated, ensure a `.ttf` version is provided or converted if `.woff2` is the source. The font file is expected at `public/fonts/wingky.ttf`.
-   **Animations (`animejs`):** Import specific functions such as `createTimeline` from `animejs/timeline` and `stagger` from `animejs/utils`. Do not use `anime.timeline` or `anime.stagger` as they no longer exist in the current version.

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

## AI Preferences
- Use thinking more efficiently.
- Do not put long code inside thinking to avoid wasting tokens.
- Do not get stuck in thinking loops (e.g., thinking about the same topic more than 3 times).