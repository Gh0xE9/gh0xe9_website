// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical URL for sitemap, RSS, and Open Graph.
// Change this if the portal is served from another host (for example a Gitea Pages address).
export default defineConfig({
  site: 'https://team.iloli.moe',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
