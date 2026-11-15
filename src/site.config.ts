/**
 * Site-wide text. Edit these to change the name, intro and links shown on
 * every page and in the RSS feed.
 */
export const SITE = {
  title: 'Diego Stewart',
  /** Used for the <meta name="description"> on the homepage and in RSS. */
  description: 'Personal blog of Diego Stewart: notes and longer posts, newest first, with an RSS feed.',
  /** Homepage intro under the heading. One or two sentences. */
  intro:
    'Notes and longer posts on what I am working on and what I learn along the way. Every post is a Markdown file in this site’s GitHub repository.',
  author: 'Diego Stewart',
  /** How many posts the homepage lists under “Recent posts”. */
  recentCount: 5,
  links: {
    github: 'https://github.com/diegostewart',
  },
  lang: 'en',
} as const;
