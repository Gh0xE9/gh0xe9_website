// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical URL for sitemap, RSS, and Open Graph.
export default defineConfig({
  site: 'https://gh0xe9.top',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'ko'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-Hans',
          en: 'en',
          ko: 'ko',
        },
      },
    }),
  ],
  build: {
    format: 'directory',
  },
});
