<a name="readme-top"></a>
# *Wingky*.



![Wingky Logo](public/img/logo.png)



**Design, Align and refine.**

## About

Personal portfolio built with a focus on motion and detail, animated SVG title drawn stroke-by-stroke, a black hole theme toggle with radial reveal, per-cell grid ripple, and a canvas particle system that reacts to theme changes. Dark by default.

### Built With

* [![Astro][Astro.dev]][Astro-url]
* [![Tailwind CSS][TailwindCSS.com]][TailwindCSS-url]
* [![Anime.js][Animejs.com]][Animejs-url]
* [![PNPM][PNPM.io]][PNPM-url]

### Key Features

- **Animated SVG Title** — stroke-draw intro with construction grid lines, font path extraction via `opentype.js`
- **Black Hole Theme Toggle** — radial clip-path reveal (outward expand → inward shrink) with synchronized grid ripple flash
- **Canvas Particles** — floating particle layer that responds to theme changes in real time
- **Grid Background** — fixed viewport grid texture with per-cell ripple animation on theme switch

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [PNPM](https://pnpm.io/) (v8+)

### Installation

```bash
# Clone the repo
git clone https://github.com/Wingky530/wingky.git
cd wingky

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Forking This Portfolio

1. Fork the repository
2. Replace content in `src/pages/index.astro` with your own info
3. Replace font files in `public/fonts/` with your own (TTF required for animated title)
4. Update colors in `src/styles/global.css` under `@theme` and `[data-theme="light"]`
5. Replace `public/img/logo.png` with your own logo
6. Update links and text throughout `src/pages/`

> **Note:** The animated title uses `opentype.js` — only TTF/OTF fonts are supported, not WOFF2.

## Project Structure

```
src/
├── components/
│   ├── AnimatedTitle.astro   # SVG title with stroke-draw animation
│   ├── Canvas.astro          # Particle background
│   ├── GridBackground.astro  # Grid lines (background texture)
│   ├── GridRipple.astro      # Grid ripple flash layer
│   ├── Nav.astro             # Navigation bar
│   └── ThemeToggle.astro     # Black hole theme toggle + overlay
├── layouts/
│   └── Layout.astro          # Base HTML layout
├── pages/
│   ├── index.astro           # Landing page
│   ├── projects.astro        # Projects page
│   └── contact.astro         # Contact page
└── styles/
    └── global.css            # Theme variables, fonts, base styles
```

## Projects

### ViewPort

An open-source web toolkit — starting with a responsive preview tool for testing layouts across screen sizes.

[View on GitHub →](https://github.com/Wingky530/viewport)

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- MARKDOWN LINKS & IMAGES -->
[Astro.dev]: https://img.shields.io/badge/Astro-B35F97?style=for-the-badge&logo=astro&logoColor=white
[Astro-url]: https://astro.build/
[TailwindCSS.com]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[PNPM.io]: https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white
[PNPM-url]: https://pnpm.io/
[Animejs.com]: https://img.shields.io/badge/Anime.js-FC4F4E?style=for-the-badge&logoColor=white
[Animejs-url]: https://animejs.com/

<p align="right"><a href="#readme-top">back to top</a></p>
