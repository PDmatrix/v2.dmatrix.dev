# dmatrix.dev

Dmitrii Sebakov's personal blog, built with [AstroPaper](https://github.com/satnaing/astro-paper),
Astro, Tailwind CSS, and Pagefind.

## Development

Use Node.js **22.23.2** (see `.node-version`). Yarn is included in the repository.

```sh
./yarn install --immutable
./yarn dev
```

Open <http://localhost:4321>.

| Command                   | Purpose                                                    |
| ------------------------- | ---------------------------------------------------------- |
| `./yarn build`            | Check types, build the site, and generate the search index |
| `./yarn preview`          | Preview the production build                               |
| `./yarn lint`             | Run ESLint                                                 |
| `./yarn format`           | Format source files                                        |
| `./yarn validate`         | Check formatting, lint, build, and test the output         |
| `./yarn test:e2e:install` | Install Chromium for browser tests                         |
| `./yarn test:e2e`         | Run browser tests against a production build               |

Run `./yarn build` before using search locally; rebuild after editing posts to
refresh the index. Browser tests also require a build.

## Content

- Site settings and social links: `astro-paper.config.ts`
- Posts: `src/content/blog/`
- About page: `src/content/pages/about.md`
- Post images: `src/assets/images/blog/`
- Styles: `src/styles/`

Keep `postSlug` unchanged for published posts. Posts with `draft: true` are
excluded from production output. Scheduled posts require a new build to publish.
Blog Markdown is excluded from bulk formatting.

## Deployment

Cloudflare Pages settings:

- Build command: `yarn build`
- Output directory: `dist`
- Root directory: leave empty
- Build image: v3
- Dependency installation: automatic

Set these environment variables for Preview and Production:

```text
NODE_VERSION=22.23.2
YARN_VERSION=4.18.1
HUSKY=0
```

Optional: set `PUBLIC_GOOGLE_SITE_VERIFICATION` to enable Google site verification.
