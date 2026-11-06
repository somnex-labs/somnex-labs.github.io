# Somnex website

The Somnex Inc. site, built with [Astro](https://astro.build) and hosted on GitHub Pages.

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/pages/` | One file per page. `about_us.astro` → `/about_us`. |
| `src/layouts/Base.astro` | The shared page shell (head, nav, footer). Edit once, applies everywhere. |
| `src/components/` | Nav, footer, placeholder-page template. |
| `src/styles/global.css` | All styling and the brand palette (CSS variables at the top). |
| `src/content/blog/` | Blog posts, one Markdown file each. |
| `src/content/archive/` | Retired content kept out of the site. Move a file back to `src/content/blog/` to republish. |
| `src/content/team/` | Team members, one Markdown file each. |
| `src/content/legal/` | Privacy policy and terms of use. |
| `src/data/site.ts` | Nav links, footer columns, team group descriptions. |
| `public/` | Static files served as-is (logo, fonts, uploaded images). |

## Editing content

**In the browser (no code):** go to `/admin` on the live site. Posts and team changes are saved as commits (via pull requests) to this repo and the site rebuilds automatically.
GitHub login needs a one-time OAuth setup: create a GitHub OAuth App, deploy an OAuth proxy
(e.g. [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) on a free Cloudflare Worker), then set
`backend.base_url` in `public/admin/config.yml`.

**Locally:** run `npm run cms` in one terminal and `npm run dev` in another, then open `http://localhost:4321/admin/`. No login needed.

**By hand:** copy a file in `src/content/blog/`, edit the front matter and text, and commit. Set `draft: true` to hide a post.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
