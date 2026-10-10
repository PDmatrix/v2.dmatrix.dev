import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";
import test from "node:test";

const origin = "https://dmatrix.dev";
const read = path => readFileSync(path, "utf8");
const sources = readdirSync("src/content/blog")
  .filter(file => file.endsWith(".md"))
  .map(file => read(join("src/content/blog", file)));
const isPublished = source => {
  const date = source.match(/^pubDatetime: (.+)$/m)?.[1];
  return (
    !/^draft: true$/m.test(source) &&
    Date.parse(date) - 15 * 60 * 1000 < Date.now()
  );
};
const publishedCount = sources.filter(isPublished).length;
const outputFile = pathname =>
  join(
    "dist",
    decodeURIComponent(pathname),
    extname(pathname) ? "" : "index.html"
  );
const htmlFiles = readdirSync("dist", { recursive: true })
  .filter(path => path.endsWith(".html"))
  .map(path => join("dist", path));

// Published URLs must remain accessible.
test("every previously published page still exists", () => {
  const sitemap = read("tests/fixtures/legacy-sitemap.xml");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)];
  assert.ok(urls.length > 40);
  for (const [, url] of urls) {
    assert.ok(existsSync(outputFile(new URL(url).pathname)), url);
  }
});

test("all published posts have content and social images; drafts stay private", () => {
  let published = 0;
  for (const source of sources) {
    const slug = source.match(/^postSlug: (.+)$/m)?.[1];
    assert.ok(slug, "Every post should declare a stable postSlug");
    const page = `dist/posts/${slug}/index.html`;
    const image = `dist/posts/${slug}/index.png`;
    if (!isPublished(source)) {
      assert.equal(existsSync(page), false, `Draft page: ${slug}`);
      assert.equal(existsSync(image), false, `Draft image: ${slug}`);
      assert.ok(!read("dist/rss.xml").includes(slug));
      assert.ok(!read("dist/sitemap-0.xml").includes(slug));
      continue;
    }
    published++;
    assert.ok(existsSync(page), page);
    const html = read(page);
    assert.match(html, /data-pagefind-body/);
    assert.match(html, /min read/);
    assert.match(html, /property="og:type" content="article"/);
    assert.equal((html.match(/property="og:type"/g) ?? []).length, 1);
    const png = readFileSync(image);
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  }
  assert.equal(published, publishedCount);
});

test("internal links and assets resolve in the static output", () => {
  for (const file of htmlFiles) {
    const html = read(file);
    const pageUrl = new URL(
      file.replace(/^dist/, "").replace(/index\.html$/, ""),
      origin
    );
    for (const [, value] of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
      if (/^(?:#|data:|mailto:|tel:|javascript:)/.test(value)) continue;
      const url = new URL(value.replaceAll("&amp;", "&"), pageUrl);
      if (url.origin !== origin) continue;
      assert.ok(existsSync(outputFile(url.pathname)), `${file}: ${value}`);
    }
  }
});

test("canonical and social metadata point to the production domain", () => {
  for (const file of htmlFiles) {
    const html = read(file);
    if (html.includes('http-equiv="refresh"')) continue;
    assert.match(html, /rel="canonical" href="https:\/\/dmatrix\.dev\//);
    assert.match(html, /property="og:image" content="https:\/\/dmatrix\.dev\//);
    assert.ok(!html.includes("fonts.googleapis.com"));
    assert.ok(!html.split("</head>")[0].includes("astro-paper.pages.dev"));
  }
  assert.match(read("dist/index.html"), /Dmitrii Sebakov/);
  assert.match(
    read("dist/robots.txt"),
    /https:\/\/dmatrix\.dev\/sitemap-index.xml/
  );
  assert.equal(
    (read("dist/rss.xml").match(/<item>/g) ?? []).length,
    publishedCount
  );
});

test("search artifacts are generated and available to development", () => {
  for (const root of ["dist", "public"]) {
    assert.ok(existsSync(`${root}/pagefind/pagefind.js`));
    const manifest = JSON.parse(read(`${root}/pagefind/pagefind-entry.json`));
    assert.equal(manifest.languages.en.page_count, publishedCount);
  }
});
