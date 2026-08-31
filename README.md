# WJY Lighting product catalogue

A responsive company and product-catalogue website built with Next.js.

## Node.js development and hosting

Node.js is the default runtime. These commands use Next.js directly and serve
all CSS, images and other files from deployment-safe web paths:

```bash
npm ci
npm run dev
npm run build
npm run start
```

The project requires Node.js 22.13 or newer.

## cPanel deployment

Upload the project source together with `package-lock.json`, but do not upload
`node_modules`, `.next`, `.vinext` or `dist` from a development computer. Those
directories contain generated or platform-specific files and must be recreated
on the Linux server.

For the first deployment, open the cPanel terminal, change to the exact
application directory, confirm it with `pwd`, and remove any partial install
left by an earlier failed attempt:

```bash
pwd
rm -rf ./node_modules ./.next
npm cache verify
npm install --omit=dev
npm run build
```

The production build intentionally uses Next.js's Webpack builder. Next.js 16
uses Turbopack by default, but Turbopack does not resolve dependencies through a
symlink that points outside its configured filesystem root. CloudLinux/cPanel
stores `node_modules` in its managed Node virtual environment and links it into
the application directory, so Webpack is the compatible production builder for
this hosting layout. Local development can continue to use the default
Turbopack-powered `npm run dev` command.

Use `npm install --omit=dev` for later cPanel deployments as well. The site uses
its own CSS rather than Tailwind, so the Tailwind/PostCSS native build chain is
not installed. TypeScript and its type declarations remain available as normal
dependencies because cPanel compiles the application in the same production
environment that serves it.

If cPanel has already installed the previous dependency set, update it and
rebuild with:

```bash
npm install --omit=dev
rm -rf .next
npm run build
```

Configure the cPanel application to run:

```bash
npm run start
```

In cPanel's **Setup Node.js App** screen, set **Application startup file** to:

```text
app.cjs
```

The startup file is CommonJS because CloudLinux's Passenger integration cannot
load an ECMAScript-module entry point. It starts the production Next.js request
handler and listens on the `PORT` supplied by cPanel. After changing the build
or startup file, use cPanel's **Restart** action. If the interface requires a
manual Passenger restart marker, run:

```bash
mkdir -p tmp
touch tmp/restart.txt
```

If cPanel asks for environment variables, set `NODE_ENV=production`. The
normal cPanel/Node.js deployment uses Next.js directly; the Vinext commands are
only for ChatGPT Sites.

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
