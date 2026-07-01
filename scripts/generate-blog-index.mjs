import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const postsDir = path.join(rootDir, 'blog updates');
const outputFile = path.join(postsDir, 'posts.js');

function extractMeta(content, name) {
  const regex = new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function buildPosts() {
  const files = fs.readdirSync(postsDir)
    .filter((file) => file.endsWith('.html') && file !== 'posts.js')
    .sort((a, b) => b.localeCompare(a));

  const posts = files.map((file) => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    const title = extractMeta(content, 'blog-title') || content.match(/<title>(.*?)<\/title>/i)?.[1]?.trim() || file.replace(/\.html$/i, '');
    const date = extractMeta(content, 'blog-date') || '1970-01-01';
    const tags = (extractMeta(content, 'blog-tags') || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    const excerpt = extractMeta(content, 'blog-excerpt') || '';

    return {
      title,
      date,
      tags,
      excerpt,
      link: `blog updates/${file}`
    };
  });

  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const output = `window.BLOG_POSTS = ${JSON.stringify(sortedPosts, null, 2)};\n`;
  fs.writeFileSync(outputFile, output, 'utf8');
  console.log(`Generated ${sortedPosts.length} blog post entries at ${path.relative(rootDir, outputFile)}`);
}

function watchForChanges() {
  console.log(`Watching ${path.relative(rootDir, postsDir)} for new blog pages...`);
  fs.watch(postsDir, { persistent: true }, (eventType, filename) => {
    if (!filename || filename === 'posts.js') return;
    if (filename.endsWith('.html')) {
      console.log(`Detected change: ${filename}`);
      buildPosts();
    }
  });
}

buildPosts();

if (process.argv.includes('--watch')) {
  watchForChanges();
}
