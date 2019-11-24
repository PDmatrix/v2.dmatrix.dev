/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readingTime = require('reading-time');

const g = require('glob');

const glob = promisify(g);

const basePath = path.join(__dirname, '../');

function requireMDXSync(mdxSrc) {
  const match = /export\s+const\s+meta\s+=\s+({.+?});?/gs.exec(mdxSrc);

  return eval(`(${match[1]})`);
}

function requireMDXFileSync(path) {
  const mdxSrc = fs.readFileSync(basePath + path, { encoding: 'utf-8' });

  const meta = requireMDXSync(mdxSrc);
  const stats = readingTime(
    mdxSrc.replace(/export\s+const\s+meta\s+=\s+{.+?};?/s, ''),
  );

  meta.timeToRead = `${Math.ceil(stats.minutes)} min to read`;

  const newMeta = `export const meta = ${JSON.stringify(
    meta,
    null,
    2,
  )};`.replace(/"([^(")]+)":/g, '$1:');

  const newSrc = mdxSrc.replace(
    /export\s+const\s+meta\s+=\s+({.+?});?/s,
    newMeta,
  );

  fs.writeFileSync(basePath + path, newSrc, { encoding: 'utf-8' });

  return meta;
}

function readPostMetadata(filePath) {
  const postMeta = requireMDXFileSync(filePath);

  const match = /pages\/(.*?)\/index\.mdx/.exec(filePath);
  postMeta.link = match[1];

  return {
    ...postMeta,
    publishDate: new Date(postMeta.publishDate),
  };
}

(async function() {
  const postPaths = await glob('src/pages/**/*.mdx', { cwd: basePath });
  const now = new Date();

  const posts = postPaths
    .map(readPostMetadata)
    .filter(post => post.publishDate <= now)
    .sort((a, b) => b.publishDate - a.publishDate);

  const postsJSON = JSON.stringify(posts, null, 2);

  const exportPath = `${basePath}src/pages/posts.json`;

  fs.writeFileSync(exportPath, postsJSON);

  console.info(`Saved ${posts.length} posts in ${exportPath}`);
})();
