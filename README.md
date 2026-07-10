# arjun-gangwar.github.io

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

## Editing the landing page

The landing page is `src/pages/index.astro`. The bio is plain HTML inside the
`<BaseLayout>` block — edit the two `<p>` paragraphs directly (links, bold,
etc. all work as normal HTML). The page pulls in three other pieces:

- **Headshot**: currently the placeholder `public/photo.svg`. Drop your real
  photo at `public/photo.jpg` and change the `<img src="/photo.svg">` to
  `/photo.jpg` in `index.astro`. It renders at 150×150, so a square crop
  (~300×300px or larger) looks best.
- **Social links**: edit the `SOCIALS` object in `src/consts.ts` (email,
  Scholar, GitHub, LinkedIn, X). Remove a line there to drop it from the
  page; the display list itself is `src/components/SocialLinks.astro`.
- **Name / one-line description** (used in the browser tab, meta tags, RSS,
  and OG cards): `SITE_TITLE` and `SITE_DESCRIPTION` in `src/consts.ts`.

## Editing the updates section

News items live in `src/data/updates.ts` — an array rendered newest-first
exactly in the order listed, so add new entries **at the top**:

```ts
export const UPDATES: Update[] = [
  {
    date: '2026-07-10',                     // ISO date; shown as "Jul 2026"
    html: 'Our paper on X was accepted at <a href="https://interspeech2026.org">Interspeech 2026</a>!',
  },
  // ...older entries
];
```

The `html` field is injected as-is, so inline tags like `<a>`, `<em>`,
`<strong>` work. There's no limit, but the landing page shows all of them —
prune old ones occasionally. Layout/styling is in
`src/components/Updates.astro`.

## Other content locations

- Nav bar links: `src/components/Header.astro`
- Footer: `src/components/Footer.astro`
- Colors / fonts / dark-mode palette: CSS variables at the top of
  `src/styles/global.css`
- Publications: `src/data/publications.ts` (see below)

After editing, check locally with `npm run dev`, then commit and push —
GitHub Actions rebuilds and deploys automatically.

## One-time external setup

1. **GitHub Pages**: create public repo `arjun-gangwar/arjun-gangwar.github.io`,
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
