import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Blog posts: every `.md` file in `src/content/blog/` becomes a post.
 * The file name (without `.md`) is the URL: `my-post.md` → `/blog/my-post/`.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        description: z.string().min(1),
        /** Publication date, e.g. 2026-11-15 */
        pubDate: z.coerce.date(),
        /** Optional “last updated” date. */
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        /** Drafts show in `npm run dev` but are left out of the built site and the RSS feed. */
        draft: z.boolean().default(false),
        /** Optional cover image, a path relative to the Markdown file, e.g. ./images/cover.jpg */
        cover: image().optional(),
        /** Describes the cover for screen readers. Required when `cover` is set. */
        coverAlt: z.string().optional(),
      })
      .refine((post) => !post.cover || (post.coverAlt && post.coverAlt.trim().length > 0), {
        message: 'Add `coverAlt` (a short description of the image) when a post has a `cover`.',
        path: ['coverAlt'],
      }),
});

export const collections = { blog };
