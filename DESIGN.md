# DESIGN.md: shahoriar.bd

Visual system for the public portfolio pages. All values live in [app/tokens.css](app/tokens.css); global rules and shared surfaces live in [app/global.css](app/global.css).

## Direction

Blue and black, very modern, **no sharp corners**. Everything is a rounded rectangle or a pill. Surfaces are flat tonal steps (paper, paper-2, paper-3) with a hairline rule. No blurred blobs, no gradient text, no glass cards, no shadows under borders. Light and dark are equal: both follow `prefers-color-scheme`, and an explicit `.dark` class on `<html>` also works.

Signature: the portrait cutout set inside a large rounded electric-blue tile.

## Scope

The palette and radius scale apply inside the `.site` wrapper rendered by `LayoutWrapper.tsx`. Full-screen routes that bypass the shell (`/bizcomp`, `/meetup`, `/zakat-*`) keep their own look. `/thanks` is a card builder with its own per-theme brand colours and keeps them.

## Colour

Tokens are declared in `@theme static` (so they become utilities such as `bg-paper`, `text-ink`, `border-rule`, `bg-accent`) and re-declared for dark.

| Token | Light | Dark | Use |
|---|---|---|---|
| `paper` | oklch(98.4% .006 258) | oklch(12.5% .028 263) | page |
| `paper-2` | oklch(95.2% .012 258) | oklch(17% .034 263) | panels, sidebar |
| `paper-3` | oklch(91.5% .02 259) | oklch(22% .045 263) | hover, wells |
| `ink` / `ink-2` | 16% / 34% L | 96.5% / 82% L | text |
| `muted` | oklch(47% .035 261) | oklch(70% .035 260) | captions |
| `rule` | oklch(89% .02 259) | oklch(27% .045 263) | hairlines |
| `accent` | oklch(51% .235 262) | same | fills, primary buttons (white text, 4.5:1+) |
| `accent-text` | oklch(47% .23 262) | oklch(76% .15 258) | links, accent text |
| `accent-soft` | oklch(93% .045 260) | oklch(24% .09 263) | tinted chips |

Inside `.site`, Tailwind's `gray`, `zinc`, `neutral`, `slate`, `blue`, `white` and `black` are re-pointed to this blue-black family, so older pages that still use `bg-gray-100 dark:bg-gray-900` pick up the system without edits.

## Radius

`rounded-control` 16px (buttons, nav items, inputs) · `rounded-card` 28px (cards) · `rounded-panel` 36px (sidebar, hero tile, big panels) · `rounded-full` (pills, chips, dock). Inside `.site`, Tailwind's `rounded-sm` to `rounded-4xl` are also pushed up (12px to 44px).

## Type

Kept from the previous site: **Coolvetica** for `h1` only, **Space Grotesk** for everything else. Labels, tags and captions are sentence case in the body face, untracked (no uppercase, no `tracking-wide`, no mono labels). `font-mono` is for code and figures. Headings balance their lines (`text-wrap: balance`).

## Components

- **Sidebar (desktop):** floating rounded panel inset 16px from the edges, filled-accent pill for the active page.
- **Dock (mobile):** floating full-radius pill, filled-accent circle for the active page.
- **Panels:** `.panel` (paper-2, hairline, card radius) and `.panel-accent` (accent fill).
- **Buttons:** `.btn-primary` (accent pill) and `.btn-quiet` (paper-2 pill). Hover lifts 2px; no scale-up.
- **Icons:** one set, FontAwesome. No emoji as icons.

## Motion

Transform and opacity only, never `transition: all`. The hero skills ticker stops under `prefers-reduced-motion` and the CSS word-scroller pauses on hover and focus.
