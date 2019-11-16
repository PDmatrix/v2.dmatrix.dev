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

function stringify(obj_from_json){
  if(typeof obj_from_json !== "object" || Array.isArray(obj_from_json)){
    // not an object, stringify using native function
    return JSON.stringify(obj_from_json);
  }
  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  let props = Object
    .keys(obj_from_json)
    .map(key => `${key}:${stringify(obj_from_json[key])}`)
    .join(",");
  return `{${props}}`;
}

function requireMDXFileSync(path) {
  const mdxSrc = fs.readFileSync(basePath + path, { encoding: 'utf-8' });

  const meta = requireMDXSync(mdxSrc);
  const stats = readingTime(
    mdxSrc.replace(/export\s+const\s+meta\s+=\s+{.+?};?/s, ''),
  );

  meta.timeToRead = `${Math.ceil(stats.minutes)} min to read`;

  const a = `export const meta = ${JSON.stringify(meta, null, 2)};`;
  const b = a.replace(/"([^(")]+)":/g,"$1:");
  const t = mdxSrc.replace(/export\s+const\s+meta\s+=\s+({.+?});?/s, b);

  fs.writeFileSync(basePath + path, t, { encoding: 'utf-8'});

  return meta;
}

function readPostMetadata(filePath) {
  const postMeta = requireMDXFileSync(filePath);

  const match = /blog\/(.*?)\/index\.mdx/.exec(filePath);
  postMeta.link = match[1];

  return {
    ...postMeta,
    publishDate: new Date(postMeta.publishDate),
  };
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
