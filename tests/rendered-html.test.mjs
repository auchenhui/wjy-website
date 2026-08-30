import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished company page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Light that belongs/);
  assert.match(html, /Changzhou Wanjiayao Lighting/);
  assert.match(html, /Explore 40 product families/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
  assert.doesNotMatch(html, /file:\/\/\/|[A-Za-z]:\/workspaces|\.vinext\/fonts/);
});

test("server-renders the complete catalogue", async () => {
  const response = await render("/catalogue");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Built for the public realm/);
  assert.match(html, /WJH-6001A/);
  assert.match(html, /WJH-6103/);
  assert.match(html, /40(?:<!-- -->)? product families/);
});

test("server-renders the contact page", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /contact@wjyco\.com/);
  assert.match(html, /WhatsApp/);
  assert.match(html, /wjyco/);
});

test("starter preview assets and metadata are removed", async () => {
  await assert.rejects(access(new URL("app/_sites-preview/SkeletonPreview.tsx", root)));
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
  ]);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("reveal effects observe content added by client-side navigation", async () => {
  const effects = await readFile(new URL("app/components/ClientEffects.tsx", root), "utf8");
  assert.match(effects, /MutationObserver/);
  assert.match(effects, /addedNodes/);
  assert.match(effects, /mutationObserver\.disconnect\(\)/);
});
