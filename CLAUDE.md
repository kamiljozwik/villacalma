# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev       # start dev server at localhost:4321
pnpm build     # production build to ./dist/
pnpm preview   # preview the build locally
```

No test suite or linter is configured.

## Stack

- **Astro 6** — static site generator; pages in `src/pages/`, layout in `src/layouts/Layout.astro`
- **Tailwind CSS v4** — configured via `@tailwindcss/vite` plugin; theme tokens defined inline in `src/styles/global.css` using `@theme inline`
- **React 19** — used only for interactive island components (Nav, GalleryGrid); mounted with `client:load`
- **GSAP + ScrollTrigger** — all scroll animations wired in `src/scripts/animations.ts`, initialised from Layout via `DOMContentLoaded`
- **Fonts** — Poppins (`--font-display`) and DM Sans (`--font-body`), self-hosted at build time via Astro Font API; referenced in CSS as `var(--font-poppins)` / `var(--font-dm-sans)`

## Architecture

### Component split: Astro vs React

Most components are `.astro` files (no JS bundle cost). React is reserved for components that need client-side state:
- `Nav.tsx` — scroll-aware transparent hero mode + mobile drawer
- `GalleryGrid.tsx` — filter tabs + lightbox with keyboard/touch navigation

### Design tokens (global.css)

All brand colors, radius, and spacing are declared in `@theme inline` — use these Tailwind tokens directly in markup:
- Colors: `primary`, `secondary`, `surface`, `on-surface`, `on-surface-var`, `outline`, `outline-var`, etc.
- Typography classes: `.text-display-lg`, `.text-headline-lg`, `.text-headline-md`, `.text-label-lg`, `.text-label-sm`
- Font families: `font-display` (Poppins), `font-body` (DM Sans)

### Animation system (animations.ts)

GSAP initial states are set via JS (`gsap.set`), not CSS, to avoid flash of invisible content. Trigger animations with data attributes:
- `data-animate` — single element fade-up on scroll
- `data-animate-group` + `data-animate-card` on children — staggered card reveal
- `data-word` — hero headline word stagger (runs on load, not scroll)
- `data-hero-sub` — hero subheadline/CTA fade after words
- `data-hero-image` — parallax scroll effect

Reduced-motion is handled by an early return in `initAnimations()` — no CSS fallback needed.

### Pages

Each page at `src/pages/*.astro` composes Layout + Nav + Footer + page-specific sections. Nav requires `currentPath` prop for active-link highlighting; home page uses `transparentHero={true}` to start the nav transparent over the hero image.

### SEO / structured data

Layout accepts `jsonLd` (pre-serialised JSON string) rendered as `<script type="application/ld+json">`. Each page constructs its own schema.org object. Canonical URL is derived automatically from `Astro.site` + `Astro.url.pathname`.

### Deployment

Deployed as a static site to GitHub Pages. `public/CNAME` contains `villacalma.pt`. Build output goes to `dist/`.
