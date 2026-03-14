export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  tools: string[];
  status: string;
  cover_image?: string;
}

export interface Post extends PostMeta {
  content: string;
}

function parseFrontmatter(raw: string): { meta: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const meta: Record<string, unknown> = {};

  for (const line of frontmatter.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    // Parse arrays like [a, b, c]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim());
    }

    meta[key] = value;
  }

  return { meta, content };
}

const modules = import.meta.glob('/src/content/posts/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const [path, raw] of Object.entries(modules)) {
    const slug = path.split('/').pop()!.replace('.md', '');
    const { meta, content } = parseFrontmatter(raw as string);

    posts.push({
      slug,
      title: (meta.title as string) || slug,
      date: (meta.date as string) || '',
      excerpt: (meta.excerpt as string) || '',
      tags: (meta.tags as string[]) || [],
      tools: (meta.tools as string[]) || [],
      status: (meta.status as string) || 'Draft',
      cover_image: (meta.cover_image as string) || undefined,
      content,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(p => p.slug === slug);
}

export function getReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
