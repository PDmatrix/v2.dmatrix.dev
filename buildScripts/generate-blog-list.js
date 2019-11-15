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

  return meta;
}

function readPostMetadata(filePath) {
  const postMeta = requireMDXFileSync(filePath);

  const match = /blog\/(.*?)\/index\.mdx/.exec(filePath);
  postMeta.link = match[1];

  const folderPath = (basePath + filePath).replace('index.mdx', '');

  return { ...postMeta, folderPath, publishDate: new Date(postMeta.publishDate) };
}

(async function() {
  const postPaths = await glob('src/pages/blog/**/*.mdx', { cwd: basePath });
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
