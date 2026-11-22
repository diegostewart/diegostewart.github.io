/**
 * Site-wide details. Edit these to change the name, role, intro and links
 * shown on every page and in the RSS feed.
 */
export const SITE = {
  title: 'Diego Stewart',
  author: 'Diego Stewart',
  role: 'Data Engineer',
  /** Used for <meta name="description"> on the homepage and in RSS. */
  description:
    'Diego Stewart, Data Engineer. Technical posts on data pipelines, data platforms and the engineering work around them.',
  /** Homepage intro under your name. One or two sentences. */
  intro:
    'I build data pipelines and the platforms they run on. This is where I write up what I learn on the job: designs, tools, mistakes and fixes.',
  /** How many posts the homepage lists. */
  recentCount: 6,
  /**
   * Profile links. Leave a value empty ('') to hide it.
   * linkedin: 'https://www.linkedin.com/in/your-handle'
   * email:    'you@example.com'
   */
  links: {
    github: 'https://github.com/diegostewart',
    linkedin: 'https://www.linkedin.com/in/diego-stewart/',
    email: 'diegostewartbalbas@gmail.com',
  },
  lang: 'en',
} as const;
