// @ts-check
import { defineConfig } from 'astro/config';

/**
 * GitHub Pages URL and base path.
 *
 * - A user/organisation site (repo named `<owner>.github.io`) is served at the
 *   domain root, so `base` is `/`.
 * - A project site (any other repo name) is served at `/<repo>/`, so `base`
 *   must be `/<repo>`.
 *
 * In GitHub Actions, GITHUB_REPOSITORY ("owner/repo") tells us which case
 * applies, so the same config works if this code moves to another repo.
 * Locally it falls back to this repo's values. Set SITE_URL / BASE_PATH to
 * override either one (for example when you add a custom domain).
 */
const [owner = 'diegostewart', repo = 'diegostewart.github.io'] = (
  process.env.GITHUB_REPOSITORY ?? ''
).split('/').filter(Boolean);

const isUserSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;

const site = process.env.SITE_URL ?? `https://${owner.toLowerCase()}.github.io`;
const base = process.env.BASE_PATH ?? (isUserSite ? '/' : `/${repo}`);

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      // Two themes; CSS picks one from the active colour scheme.
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: false,
    },
  },
});
