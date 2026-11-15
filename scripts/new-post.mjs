#!/usr/bin/env node
// Create a new draft post: npm run new -- "My post title"
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new -- "My post title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const file = join('src', 'content', 'blog', `${slug}.md`);
if (existsSync(file)) {
  console.error(`${file} already exists.`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const safeTitle = title.replace(/"/g, '\\"');

writeFileSync(
  file,
  `---
title: "${safeTitle}"
description: "One or two sentences about this post."
pubDate: ${today}
tags: []
draft: true
---

Start writing here.
`,
);

console.log(`Created ${file} (draft: true). Set draft: false when it is ready to publish.`);
