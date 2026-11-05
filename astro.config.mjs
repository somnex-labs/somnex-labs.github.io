import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://somnex-labs.github.io',
  // Emit about_us.html, blog.html, ... so every existing URL keeps working.
  build: { format: 'file' },
  trailingSlash: 'never',
  redirects: { '/openings': '/join-the-team' },
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
