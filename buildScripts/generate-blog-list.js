/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const g = require('glob');

const glob = promisify(g);

const basePath = path.join(__dirname, '../');

function requireMDXSync(mdxSrc) {
  const match = /export\s+const\s+meta\s+=\s+({.+?});?/gs.exec(mdxSrc);

  return eval(`(${match[1]})`);
}

function requireMDXFileSync(path) {
  const mdxSrc = fs.readFileSync(basePath + path, { encoding: 'utf-8' });

  return requireMDXSync(mdxSrc);
}

function readPostMetadata(filePath) {
  const postMeta = requireMDXFileSync(filePath);

  const match = /blog\/(.*?)\/index\.mdx/.exec(filePath);
  postMeta.link = match[1];

  return postMeta;
}

(async function() {
  const postPaths = await glob('src/pages/blog/**/*.mdx', { cwd: basePath });
  const now = new Date();

  const posts = postPaths
    .map(readPostMetadata)
    .filter(post => new Date(post.publishDate) <= now)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  const postsJSON = JSON.stringify(posts, null, 2);

  const exportPath = `${basePath}src/pages/posts.json`;

  fs.writeFileSync(exportPath, postsJSON);

  console.info(`Saved ${posts.length} posts in ${exportPath}`);
})();
