# arjungangwar.github.io

Personal academic website — Astro static site with a blog (KaTeX math, tags,
Pagefind search, giscus comments) and GoatCounter analytics.

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Dev server at `localhost:4321` (drafts visible, no search) |
| `npm run build` | Build to `dist/` + build the Pagefind search index |
| `npm run preview` | Serve the built site (search works here) |

## Writing a post

Add a `.md` or `.mdx` file to `src/content/blog/`:

```yaml
---
title: 'Post title'
description: 'One-line summary (used in listings, RSS, search, OG cards).'
date: 2026-07-07
tags: [speech, math]
series: 'Flow matching for speech'  # optional; links parts together
draft: true   # remove to publish
---
```

Posts get automatically: reading time, table of contents (from `##`/`###`
headings), related posts (by shared tags), a series box (if `series` is set),
copy buttons on code blocks, a per-post Open Graph preview image
(`/og/<slug>.png`, generated at build time), a view counter (needs
"visitor counts" enabled in GoatCounter settings), and giscus comments.

- Math: `$inline$` and `$$display$$` (rendered at build time with KaTeX)
- Footnotes: `[^1]` markers with `[^1]: text` definitions, styled as citations
- Interactive figures (`.mdx` posts): import any `.astro` component, e.g.
  `src/components/figures/FlowTrajectories.astro`
- Dark-mode-aware images: `<ThemedImage light="..." dark="..." alt="..." />`

## Publications

Edit `src/data/publications.ts` — grouped by year on `/publications`, with
arXiv/PDF links and a copy-BibTeX button per entry.

## Site content

- Bio / landing page: `src/pages/index.astro`
- News items: `src/data/updates.ts`
- Social links, giscus and GoatCounter IDs: `src/consts.ts`
- Headshot: drop `public/photo.jpg` and update the `src` in `index.astro`

## One-time external setup

1. **GitHub Pages**: create public repo `arjungangwar/arjungangwar.github.io`,
   push `main`, then Settings → Pages → Source: **GitHub Actions**.
2. **giscus** (comments): on that repo enable Discussions, create a
   "Blog Comments" category (Announcements type), install
   [the giscus app](https://github.com/apps/giscus), then copy `repoId` /
   `categoryId` from [giscus.app](https://giscus.app) into `src/consts.ts`.
3. **GoatCounter** (analytics): sign up at
   [goatcounter.com](https://www.goatcounter.com), set your code in
   `src/consts.ts`. Dashboard shows views, countries, and time on page.

## Moving off GitHub Pages later

The site is pure static output. Change `site` in `astro.config.mjs`, replace
the deploy job with an `rsync dist/ server:/var/www/site`, and add
`error_page 404 /404.html;` to nginx. Nothing else assumes GitHub Pages.
