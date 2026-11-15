---
title: How this blog works
description: Every post is a Markdown file. Push it to main and GitHub Actions builds the site with Astro and publishes it to GitHub Pages.
pubDate: 2026-11-15
tags: [astro, meta, github-pages]
draft: false
---

This is the first post. It explains how the blog is put together, so
future posts only need words.

## One file per post

A post is a Markdown file in `src/content/blog/`. The file name becomes the
address, so `how-this-blog-works.md` is served at `/blog/how-this-blog-works/`.
The block at the top of the file, the frontmatter, holds the details:

```yaml
---
title: How this blog works
description: One or two sentences for the post list, link previews and RSS.
pubDate: 2026-11-15
tags: [astro, meta]
draft: false          # true keeps it off the live site
cover: ./images/cover.jpg   # optional, next to the .md file
coverAlt: What the cover shows
---
```

Astro checks every field when the site builds. A missing title or a date it
cannot read stops the build with a message naming the file, so a broken post
never reaches the live site.

## Code blocks

Fenced code gets syntax highlighting at build time, with one colour theme for
light mode and one for dark. No JavaScript runs in the browser for it.

```ts
// src/lib/posts.ts
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
```

Inline code such as `npm run dev` gets a quieter treatment.

## Publishing

1. Write the post and preview it with `npm run dev`.
2. Commit it and push to `main`, or merge a pull request into `main`.
3. The **Deploy to GitHub Pages** workflow builds the site and publishes it,
   usually in under two minutes.

> Drafts appear in `npm run dev` with a “Draft” badge but are left out of the
> built site and the RSS feed.

There is no database, server or CMS: the repository is the whole blog.
