# Diego Stewart — personal blog

A static blog built with [Astro](https://astro.build) and TypeScript. Posts are Markdown files; GitHub Actions builds the site and publishes it to GitHub Pages. There is no database, server or CMS.

Live site: https://diegostewart.github.io

## What's inside

| Path | What it is |
| --- | --- |
| `src/content/blog/` | **Your posts.** One `.md` file per post. |
| `src/content.config.ts` | The frontmatter schema, checked on every build. |
| `src/site.config.ts` | Site name, homepage intro, links. |
| `src/pages/` | Homepage, `/blog`, post pages, `/tags`, `/tags/<tag>`, `/rss.xml`, 404. |
| `src/styles/global.css` | All styles: colour tokens, light and dark mode, code highlighting. |
| `astro.config.mjs` | Site URL, base path, syntax-highlighting themes. |
| `.github/workflows/deploy.yml` | Builds and deploys to GitHub Pages on every push to `main`. |

## Write a post

Create a file in `src/content/blog/`. The file name becomes the URL:
`my-first-trip.md` → `/blog/my-first-trip/`.

```markdown
---
title: My first trip
description: One or two sentences, shown in post lists, link previews and RSS.
pubDate: 2026-11-20
tags: [travel, notes]
draft: false
---

Your post, in Markdown.
```

Or let the helper create a draft for you:

```bash
npm run new -- "My first trip"
```

### Frontmatter fields

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Post title. |
| `description` | yes | Short summary. |
| `pubDate` | yes | `YYYY-MM-DD`. Posts are sorted newest first by this date. |
| `updatedDate` | no | Shown as “Updated …” on the post. |
| `tags` | no | A list, e.g. `[astro, notes]`. Each tag gets a page at `/tags/<tag>/`. |
| `draft` | no | `true` shows the post in `npm run dev` (with a Draft badge) but leaves it out of the built site and RSS. Defaults to `false`. |
| `cover` | no | Path to an image **relative to the Markdown file**, e.g. `./images/cover.jpg`. Astro resizes and optimises it. |
| `coverAlt` | with `cover` | A short description of the cover image for screen readers. |

If a field is missing or invalid, the build stops and names the file, so a broken post never goes live.

### Images and code

- Put images next to your posts (e.g. `src/content/blog/images/`) and reference them with relative paths: `![A street at night](./images/street.jpg)`.
- Fenced code blocks with a language (```` ```ts ````, ```` ```python ````, …) are highlighted at build time. The highlighting follows light and dark mode.

## Run it locally

You need **Node.js 22.23.4 or newer** (see `.nvmrc`).

```bash
npm install       # once
npm run dev       # http://localhost:4321, reloads as you edit
npm run build     # type-check and build into dist/
npm run preview   # serve the built dist/ folder
```

## Deploy

Deployment is automatic: every push to `main` (including a merged pull request) runs `.github/workflows/deploy.yml`, which builds the site and publishes it using GitHub's official Pages actions (`configure-pages`, `upload-pages-artifact`, `deploy-pages`). You can also run it by hand from the **Actions** tab.

One-time setup:

1. In the repository on GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Make sure the default branch is `main`. If your branch is called `master`, either rename it (`git branch -m master main`, then push and change the default branch on GitHub) or change `branches: [main]` in the workflow.
3. Push. The first deploy usually finishes in a couple of minutes.

### Base path

`astro.config.mjs` works out the URL from the repository name:

- A repo named `<user>.github.io` (this one) is served at the domain root, so `base` is `/`.
- Any other repo name, e.g. `blog`, is served at `https://<user>.github.io/blog/`, so `base` becomes `/blog`.

All internal links go through the `url()` helper in `src/lib/posts.ts`, so they work either way. For a custom domain, set `SITE_URL` (and `BASE_PATH=/`) in the workflow's build step and add a `public/CNAME` file containing the domain.

## Customise

- **Name, role, intro, profile links:** `src/site.config.ts`. Fill in `linkedin` and `email` there; empty values are hidden.
- **About page:** `src/pages/about.astro`. Add your experience, stack and the roles you're interested in.
- **Colours and fonts:** the tokens at the top of `src/styles/global.css` (light values on `:root`, dark values under the dark-mode blocks). Fonts are Geist and Geist Mono from Google Fonts.
- **Code themes:** `markdown.shikiConfig.themes` in `astro.config.mjs` (any [Shiki theme](https://shiki.style/themes)).
- **Favicon:** `public/favicon.svg`.
