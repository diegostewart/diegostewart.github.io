import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Prefix a site path with the configured base (needed for GitHub project sites). */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}

/** All published posts, newest first. Drafts are included only in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface TagInfo {
  name: string;
  slug: string;
  posts: Post[];
}

/** Every tag with its posts, most-used first, then A–Z. */
export function getTags(posts: Post[]): TagInfo[] {
  const map = new Map<string, TagInfo>();
  for (const post of posts) {
    for (const name of post.data.tags) {
      const slug = tagSlug(name);
      if (!slug) continue;
      const entry = map.get(slug) ?? { name, slug, posts: [] };
      entry.posts.push(post);
      map.set(slug, entry);
    }
  }
  return [...map.values()].sort(
    (a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name),
  );
}

export function postUrl(post: Post): string {
  return url(`blog/${post.id}/`);
}

export function tagUrl(tag: string): string {
  return url(`tags/${tagSlug(tag)}/`);
}

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

const shortWithYear = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
const shortNoYear = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', timeZone: 'UTC' });

/** "15 Nov 2026", or "15 Nov" without the year. */
export function formatShortDate(date: Date, withYear = true): string {
  return (withYear ? shortWithYear : shortNoYear).format(date);
}

/** Rough reading time at 220 words a minute, code blocks counted at half weight. */
export function readingMinutes(body = ''): number {
  const code = body.match(/```[\s\S]*?```/g)?.join(' ') ?? '';
  const prose = body.replace(/```[\s\S]*?```/g, ' ');
  const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round((words(prose) + words(code) / 2) / 220));
}
