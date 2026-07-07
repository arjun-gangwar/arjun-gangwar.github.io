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
description: 'One-line summary (used in listings, RSS, search).'
date: 2026-07-07
tags: [speech, math]
draft: true   # remove to publish
---
```

Math: `$inline$` and `$$display$$` (rendered at build time with KaTeX).

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
