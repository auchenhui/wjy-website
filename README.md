# WJY Lighting product catalogue

A responsive company and product-catalogue website built with Next.js.

## Node.js development and hosting

Node.js is the default runtime. These commands use Next.js directly and serve
all CSS, images and other files from deployment-safe web paths:

```bash
npm install
npm run dev
npm run build
npm run start
```

The project requires Node.js 22.13 or newer.

## ChatGPT Sites deployment

ChatGPT Sites uses Vinext as its Next.js-to-Cloudflare adapter. It is isolated
to the Sites-specific commands and is not used by the normal Node.js workflow:

```bash
npm run dev:sites
npm run build:sites
```

Do not use `vinext start` as the Node.js production server. Static assets in a
Vinext production bundle are supplied by the Cloudflare `ASSETS` binding, which
is present on ChatGPT Sites but not in a plain Node.js process.

If ChatGPT Sites support is removed later, the Vinext/Vite/Cloudflare adapter
files and dependencies can be deleted without changing the application pages.

## Project structure

- `app/` contains the company, catalogue and product-detail pages.
- `public/` contains deployable product and social-preview imagery.
- `.openai/hosting.json` identifies the ChatGPT Sites project.
- `vite.config.ts`, `worker/` and `build/` support ChatGPT Sites only.
