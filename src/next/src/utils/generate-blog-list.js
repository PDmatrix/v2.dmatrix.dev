/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const g = require('glob');

const glob = promisify(g);

function requireMDXSync(mdxSrc) {
  const match = /export\s+const\s+meta\s+=\s+({.+?});?/gs.exec(mdxSrc);
  return eval(`(() => (${match[1]}))()`);
}

function requireMDXFileSync(path) {
  const mdxSrc = fs.readFileSync(__dirname + '/' + path, { encoding: 'utf-8' });
  return requireMDXSync(mdxSrc);
}

function readPostMetadata(filePath) {
  const meta = requireMDXFileSync(filePath);

  return meta;

  return {
    filePath,
    urlPath: filePath
      .replace(/\\/, '/')
      .replace(/^pages/, '')
      .replace(/\.mdx?$/, ''),
    title: meta.title || path.basename(filePath),
    publishDate: new Date(meta.publishDate),
  };
}

(async function() {
  const postPaths = await glob('../pages/blog/**/*.mdx', { cwd: __dirname });
  const now = new Date();

  const posts = postPaths
    .map(readPostMetadata)
    .filter(post => new Date(post.publishDate) <= now)
    .sort((a, b) => b.publishDate - a.publishDate);

  const postsJSON = JSON.stringify(posts, null, 2);
  console.log(postsJSON);
  const exportPath = __dirname + '/../pages/posts.json';

  fs.writeFileSync(exportPath, postsJSON);

  console.info(`Saved ${posts.length} posts in ${exportPath}`);
})();
