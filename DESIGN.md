---
version: "1.0"
name: Wingky
description: "A vibe coder who actually gives a damn."
colors:
  arc-blue: "#03a9f4"
  arc-blue-deep: "#0369a1"
  charcoal: "#252422"
  parchment: "#ebebdf"
  workshop-muted: "#7a7974"
  workshop-border: "#3a3835"
  workshop-muted-light: "#8a8880"
  workshop-border-light: "#d4d2c8"
typography:
  display:
    fontFamily: "Wingky, sans-serif"
    fontSize: "clamp(4rem, 10vw, 6rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.05em"
  body:
    fontFamily: "Wingky, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.625"
  label:
    fontFamily: "Wingky, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.22em"
    textTransform: "uppercase"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "40px"
components:
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.workshop-muted}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
    border: "1px solid {colors.workshop-border}"
  button-cta:
    backgroundColor: "{colors.arc-blue}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  pill-tab-active:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.full}"
    padding: "6px 16px"
    height: "32px"
  pill-tab-inactive:
    backgroundColor: transparent
    textColor: "{colors.workshop-muted}"
    rounded: "{rounded.full}"
    padding: "6px 16px"
    height: "32px"
  theme-toggle:
    backgroundColor: transparent
    rounded: "{rounded.full}"
    padding: "10px"
    size: "44px"
  nav-bar:
    backgroundColor: "{colors.charcoal}"
    height: "64px"
    padding: "0 16px"
---

# Design System: Wingky

## 1. Overview

**Creative North Star: "The Dark Workshop"**

A workshop at night — tools laid out with precision, every surface intentional, the work lit by a single blue glow. Wingky's portfolio is the maker's bench itself: dark, tactile, and built by hand. Nothing on the page arrived by accident; every animation reveals structure, every pixel earns its place.

This system explicitly rejects templated landing page patterns and AI-slop reflexes. No gradient text, no glassmorphism, no generic card grids, no numbered section markers, no tiny uppercase tracked eyebrows above every section, no hero-metric templates, no side-stripe borders. The portfolio demonstrates the craft it advertises.

Dark by default. Light is the alternate — both are equally considered, contrast-verified, and intentional. The blue accent (Arc Blue) is used sparingly as a signal, never as decoration.

**Key Characteristics:**

- Dark, warm, precise — charcoal surfaces with warm off-white text
- Flat by design — depth through z-index layering and contrast, not shadows
- Tactile, minimal components — rounded edges, clear hit states, no excess
- Motion with purpose — stroke-draw reveals, theme transitions, particle drift
- Anti-slop — every pattern must pass "would an AI have done this?"

## 2. Colors

Two complete themes: dark (default) and light. Arc Blue is the sole accent across both, its role unchanged between themes.

### Primary (Arc Blue)

- **Arc Blue** (`#03a9f4`): The single accent color. Used for the title dot, as a CTA button background, for active pill tabs, and as selection highlight. Never exceeds ~10% of any given screen.
- **Arc Blue Deep** (`#0369a1` / `#0284c7`): Hover state for CTA buttons. Dark mode uses `#0369a1`, light mode uses `#0284c7`.

### Neutral

- **Charcoal** (`#252422`): The dark surface — background in dark mode, text in light mode. A warm, near-black neutral.
- **Parchment** (`#ebebdf`): The warm off-white surface — background in light mode, text in dark mode. True to its tone without falling into cream/sand AI-default territory.
- **Workshop Muted** (`#7a7974` dark / `#8a8880` light): Body text, secondary labels, placeholder content. Warm mid-gray, tinted toward Charcoal's hue.
- **Workshop Border** (`#3a3835` dark / `#d4d2c8` light): Dividers, card borders, input strokes. Subtle definition between surfaces.

### Named Rules

**The One Voice Rule.** Arc Blue is the only accent. It has one job — signal what matters. Using it decoratively (gradient text, side-stripe borders) dilutes that signal and is forbidden.

**The Workshop Surface Rule.** Surfaces at rest are flat. No box-shadows, no gradients, no glass backdrops. Depth is conveyed through z-index layering, border subtraction, and contrast — the physical logic of stacked paper on a bench.

## 3. Typography

**Display Font:** Wingky (custom TTF/WOFF2, with sans-serif fallback)
**Body Font:** Wingky (same custom font)

**Character:** Single-family system. The custom Wingky typeface carries both display and body roles, relying on weight contrast (900 vs 400) rather than a second typeface. This keeps the palette tight — the font itself is the brand mark.

### Hierarchy

- **Display** (900, `clamp(4rem, 10vw, 6rem)`, lh 1, ls 0.05em): The title on the landing page. Used only for "wingky." Appears as SVG paths animated via opentype.js.
- **Headline** (700, `2.5rem` / `3rem` md, lh `1.1`): Page-level headings (Contact, project titles).
- **Title** (400, `1.25rem`, lh `1.3`): Section-level headings.
- **Body** (400, `1rem`, lh `1.625`): Descriptive text, project descriptions. Max line length 65ch.
- **Label** (500, `0.75rem`, ls `0.22em`, uppercase): Eyebrow labels, UI badges, "OPEN SOURCE PROJECT" kicker. Used sparingly — never as a per-section scaffold.

### Named Rules

**The One Family Rule.** One typeface, three weights. No second font introduced for contrast. The Wingky font is the brand; every departure dilutes it.

## 4. Elevation

Flat by design. This system uses no box-shadows, no drop-shadows, no blur backdrops.

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow, no border | Default surface state — all components at rest |
| Border-defined | 1px `{colors.workshop-border}` | Card outlines, input strokes, dividers |
| Z-layered | Z-index separation | Grid (0) → overlay (5) → menu (40) → ripple (45) → toggle (50) |
| Motion-depth | Clip-path reveal | Theme toggle overlay — physical sense of surface revealed/consumed |

Depth is conveyed through:

- **Z-index layering**: The z-index scale is semantic — grid (0) → overlay (5) → recipe overlay (15) → menu (40) → ripple (45) → toggle (50). No arbitrary values.
- **Border subtraction**: The grid background uses thin borders at 35% opacity. Lighter content sits above darker backgrounds.
- **Contrast**: The theme toggle's reveal overlay transitions between Charcoal and Parchment, using the full contrast range rather than shadow gradients to communicate depth.
- **Motion**: The radial clip-path expand/shrink during theme toggle creates a physical sense of a surface being revealed or consumed.

### Named Rules

**The Flat-By-Default Rule.** Every surface starts flat. If depth is needed, reach for z-index and contrast, not shadows. Shadows are prohibited.

## 5. Components

### Theme Toggle (Signature Component)

Fixed at bottom-center of the viewport. A black hole SVG icon with layered accretion disk, outer ring, and event horizon. The disk pulses subtly (stroke-width oscillation on a 2.5s loop).

- **Shape:** Circular (9999px radius), transparent background, 10px padding.
- **States:** Scale up on hover (`scale(1.15)`). Icon shrinks to 0 then back to 1 on click.
- **Reveal mechanics:** On dark→light, overlay clip-path expands from the button center; theme swaps behind it at 600ms. On light→dark, overlay appears full instantly, theme swaps behind it, overlay shrinks to reveal.
- **Transition:** 2000ms cubic-bezier(0.42, 0, 0.58, 1) for expand; 1600ms for shrink.
- **Reduced motion:** Falls back to instant toggle with no overlay.

### Navigation

Hamburger icon (two horizontal bars — 24px and 20px wide) in the top-right. Opens a full-screen overlay.

- **Overlay:** Dark background (Charcoal at 95% opacity), centered vertical stack of links.
- **Typography:** 1.875rem uppercase, `tracking-widest`, Workshop Muted at rest → Parchment on hover.
- **Transition:** Opacity 300ms. Bars animate to a 45° X on open (first bar rotates +45°, second -45°).
- **Z-index:** Toggle at 50, overlay at 40.

### Buttons

- **Shape:** Gently curved corners (8px radius).
- **Outline (GitHub):** Transparent bg, Workshop Border stroke, Workshop Muted text. Hover: Charcoal text, border fades to 20% opacity. Padding: 8px 16px.
- **CTA (Try ViewPort):** Arc Blue bg, Charcoal text, semibold. Hover: Arc Blue Deep. Padding: 8px 16px.

### Pill Tabs

Project feature selector in ViewPortProject. Horizontal scrollable row of rounded pills.

- **Shape:** Full-radius pills (9999px), 6px padding vertical, 16px horizontal.
- **Active:** Parchment bg, Charcoal text.
- **Inactive:** Transparent bg, Workshop Muted text. Hover: Parchment text.
- **Typography:** 0.75rem, medium weight.
- **Scroll:** Hidden scrollbar.

### Grid Background

Fixed full-viewport grid layer at z-index 0. Invisible cells defined by right and bottom borders.

- **Lines:** `color-mix(in srgb, var(--color-border) 35%, transparent)`, 1px.
- **Cell size:** 36px (desktop), 24px (mobile).
- **Behavior:** Rebuilds on resize (debounced 150ms). Covered by theme reveal overlay during transitions.

### Particle Canvas

Fixed full-viewport canvas at z-index -1. 50 particles drift at sub-pixel velocity, bouncing off viewport edges.

- **Particle:** 1–3px radius, opacity 0.2–0.7, color tied to `--color-primary` (responds to theme change).
- **Behavior:** Drift only — no interaction, no trails, no connections.

### Animated SVG Title

The "wingky." wordmark built from opentype.js path extraction. Always links to `/`.

- **States:** On first load (or reload): grid lines stroke-draw, then each glyph stroke-draws, fills, contracts into final skewed position. On subsequent navigations (session flag): fast-forward to final state.
- **Grid lines:** Horizontal guides at glyph bounding box edges + vertical lines per glyph boundary. Ticks at cross points. Fade in with stagger, then fade out after contraction.
- **Final state:** All glyphs except the dot are skewed -12deg on the Y axis. The dot shifts -60px left, filled with Arc Blue, stroked with background color to create a cutout effect.
- **View transition:** Named `wingky-title` for seamless cross-page animation. On the landing page (`index.astro`), the large SVG wordmark is centered. On the projects page (`projects.astro`), the same named element appears at small scale in the top-left nav (`Nav.astro` → `AnimatedTitle isHomePage={false}`). The browser animates the position and size change between these two states, creating a continuous feel: the landing page logo "travels" to the nav bar when navigating to `/projects`. No JS animation — purely CSS view transitions.

## 6. Do's and Don'ts

### Do:

- **Do** use Arc Blue sparingly — on exactly one element per viewport (the title dot, the active pill tab, a single CTA).
- **Do** prefer flat surfaces with border definition over shadows and gradients.
- **Do** keep the typeface to Wingky alone. No second font family.
- **Do** use uppercase labels only for short UI copy (≤4 words) — "PROJECTS", "CONTACT", "OPEN SOURCE PROJECT".
- **Do** use `text-wrap: balance` on headings, `text-wrap: pretty` on body prose.
- **Do** animate with purpose — stroke-draw reveals, theme transitions, staggered entrances. Motion should reveal structure, not decorate.
- **Do** respect reduced motion: instant toggle, no overlay animations, no particle system delay.

### Don't:

- **Don't** use gradient text (`background-clip: text` + gradient) — emphatic text uses weight and size only.
- **Don't** use glassmorphism (blur backdrops as decoration) — it has no purpose here.
- **Don't** use numbered section markers (01 / 02 / 03) as default scaffolding — numbers only when the sequence carries real order information.
- **Don't** put a tiny uppercase tracked eyebrow above every section — one deliberate kicker is voice; an eyebrow on every section is AI grammar.
- **Don't** use side-stripe borders (border-left/right > 1px as accent) — use full borders, background tints, or nothing.
- **Don't** use hero-metric templates (big number + small label + stats row).
- **Don't** use identical card grids with icon + heading + text repeated endlessly.
- **Don't** use all-caps body copy — reserve uppercase for short labels only.
- **Don't** use card grids or nested cards when a simpler layout would work.
- **Don't** set box-shadows on anything — this system is flat by design.

## 7. Responsive Behavior

### Breakpoints

Tailwind CSS v4 defaults — mobile-first (`min-width`):

| Token | Width   | Usage                                    |
|-------|---------|------------------------------------------|
| (base)| 0–767px | Single column, tighter spacing, 24px grid cells |
| `md`  | 768px+  | Two-column layouts, expanded padding, 36px grid cells |

No `sm`, `lg`, or `xl` breakpoints are used. The system is intentionally two-tier: mobile and desktop.

### Collapsing Strategy

- **Landing page:** Centered full-viewport at all sizes. Font clamps via `clamp(4rem, 10vw, 6rem)`.
- **About page:** Single column on mobile; `grid-cols-2` on `md` for skills. Prose capped at `680px` / `65ch`.
- **Projects page:** Stacked on mobile; `md:flex-row` on desktop with `md:sticky` left column.
- **Nav:** `px-4` → `md:px-8`. Menu panel max-width `400px`.

### Touch Targets

- All interactive elements ≥ 44×44px tap area.
- Theme toggle: `p-2.5` (40px) + icon = ≥44px total.
- Menu toggle: `p-3` (48px).
- Menu links: `px-4 py-3` for comfortable vertical spacing.

### Viewport Locking

Landing page uses `overflow-hidden` on `<html>`. Sub-pages restore scroll via `scrollable` prop. `min-h-dvh` instead of `100vh` for mobile browser correctness.

## 8. Layout Principles

### Whitespace Philosophy

Generous vertical rhythm between sections (`mb-32 md:mb-40`), tight density within components. Space breathes at section boundaries, not inside them.

### Max-Width & Containment

| Context | Constraint | Gutters |
|---------|-----------|---------|
| Projects container | `max-w-6xl` (1152px) | `px-4 md:px-8` |
| About prose | `max-w-[680px]` | — |
| Body paragraphs | `max-w-[65ch]` | — |
| Landing page | No max-width | `px-4` safety |
| Description | `max-w-lg` (512px) | — |

### Grid System

No CSS grid framework. Built from:
- **Flexbox** for single-axis (nav, landing center, button rows).
- **CSS Grid** for two-dimensional (about: `grid-cols-1 md:grid-cols-2`, experience: `grid-cols-[160px_1fr]`).

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `xs`  | 8px   | Icon-to-text, pill padding |
| `sm`  | 12px  | Inner card padding |
| `md`  | 16px  | Standard padding, inter-element |
| `lg`  | 24px  | Section inner spacing |
| `xl`  | 32px  | Major section gaps |
| `xxl` | 40px  | Page-level vertical rhythm |

Beyond scale: `mb-32` (128px) and `mb-40` (160px) for dramatic breathing room.

## 9. Agent Prompt Guide

### Quick Reference

```
Background (dark):  #252422    Background (light): #ebebdf
Text (dark):        #ebebdf    Text (light):       #252422
Muted (dark):       #918f89    Muted (light):      #5c5b56
Accent:             #03a9f4    Accent hover:       #0369a1
Border (dark):      #918f89    Border (light):     #d4d2c8
Font:               Wingky (custom), sans-serif fallback
Corners:            8px (buttons/cards), 9999px (pills)
Shadows:            NONE — flat only
```

### Ready-to-Use Prompts

**New page:**
> "Create a new page using Layout.astro. Dark background, Wingky font only. No shadows, no gradients. Use Arc Blue (#03a9f4) for at most one accent element. Spacing follows the xl/xxl scale between sections."

**New component:**
> "Build a component matching the Dark Workshop aesthetic: flat surfaces, Workshop Border (#3a3835) for definition, Workshop Muted (#918f89) for secondary text. Rounded corners at 8px. No box-shadows. Hover states use color shifts, not elevation."

**Content section:**
> "Add a content section with max-width 680px, body text at 1rem/1.625 line-height in Workshop Muted, heading at font-weight 700. Use mb-32 md:mb-40 between sections. No eyebrow labels unless purposeful."

### Anti-Pattern Detector

When generating UI for this project, reject output containing:
- `box-shadow` or `drop-shadow`
- `backdrop-blur` (except menu overlay)
- `background: linear-gradient` for decoration
- `background-clip: text` with gradients
- More than one accent color per viewport
- A second font family
- Numbered section markers (01, 02, 03)
- Card grids with identical repeated structures

## 10. Shapes

### Border Radius Philosophy

The system uses a binary radius decision: **functional curves** (8px) or **full circles** (9999px). Nothing in between carries meaning.

| Token | Value | Use |
|-------|-------|-----|
| `sm` | 4px | Subtle rounding on small elements (rare) |
| `md` | 8px | Default for all rectangular interactive surfaces — buttons, cards, inputs |
| `lg` | 12px | Menu panel, modal containers |
| `xl` | 16px | Large card containers (menu panel) |
| `full` | 9999px | Pill tabs, theme toggle, circular elements |

### Principle

Rounded at 8px means "interactive surface." Full-round means "selector or toggle." Sharp corners (0px) are not used — the system carries warmth through its curves, contrasting with the flat-depth philosophy. The curves say "handmade tool"; BMW's sharp rectangles say "machined part." Both are intentional — ours reflects a workshop, not a factory.

## 11. Iteration Guide

When building or modifying UI for this project:

1. **Read DESIGN.md first.** Reference component YAML keys (`{component.button-cta}`, `{component.pill-tab-active}`) rather than re-inventing tokens.
2. **One accent per viewport.** Before adding Arc Blue to any element, check if it's already present on screen. If yes, use Workshop Muted or Parchment instead.
3. **Default to flat.** New surfaces start with no shadow, no gradient. Use `{colors.workshop-border}` for definition if needed.
4. **Match the weight pair.** Display/heading: weight 700–900. Body: weight 400. Label: weight 500. Never use 600 or blur the contrast.
5. **Check both themes.** Every change must look intentional in both dark and light. Use CSS variables, never raw hex.
6. **Animate with structure.** New animations should reveal content (fade-up, stroke-draw, stagger) — not loop decoratively.
7. **Respect reduced motion.** Wrap all animations in `prefers-reduced-motion: no-preference` checks.
8. **Keep the font singular.** No `font-mono`, no second typeface. Wingky handles everything.
9. **Spacing jumps, not increments.** Use the defined scale tokens. Between sections use `mb-32` or `mb-40` — never arbitrary pixel values.
10. **Test at two breakpoints only.** Mobile (375px) and desktop (1280px). If it works at both, it works everywhere.

## 12. Known Gaps

The following aspects are not fully documented and may require inspection of source code:

- **Animation timings:** Exact easing curves and durations for AnimatedTitle stroke-draw, grid-intro, and theme overlay are in the component source, not abstracted into tokens.
- **Particle system parameters:** Particle count (50), velocity range, and bounce behavior are hard-coded in Canvas.astro — not configurable via design tokens.
- **View transitions:** Cross-page title morphing behavior depends on Astro's view transition API — timing and interpolation are browser-controlled.
- **Mobile menu random directions:** The slide-in direction is randomized per open — not predictable or tokenized.
- **Font metrics:** Exact glyph spacing, kerning, and opentype.js extraction parameters are build-time computed — visual output may shift if the TTF file changes.
- **Grid cell size:** 36px desktop / 24px mobile is hard-coded in GridRipple and GridBackground — not derived from the spacing scale.
- **Light mode accent variation:** Light mode uses `#01517a` for accent (darker than dark mode's `#03a9f4`) — this divergence is intentional for contrast but not fully explained in the color system.
