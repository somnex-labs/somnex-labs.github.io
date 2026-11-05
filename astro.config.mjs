import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://somnex-labs.github.io',
  // Emit about_us.html, blog.html, ... so every existing URL keeps working.
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
