/* eslint-disable @typescript-eslint/no-var-requires */

const withPlugins = require('next-compose-plugins');
const emoji = require('remark-emoji');
const behead = require('remark-behead');
const html = require('remark-html');
const slug = require('remark-slug');
const headings = require('remark-autolink-headings');
const capitalize = require('remark-capitalize');
const optimizedImages = require('next-optimized-images');
const withCSS = require('@zeit/next-css');
const path = require('path');

const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      html,
      emoji,
      capitalize,
      slug,
      headings,
      [behead, { depth: 1 }],
    ],
  },
});

const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config, options) => {
    config.resolve.modules.push(path.resolve('./'));

    return config;
  },
};

module.exports = withPlugins(
  [
    [
      withMDX,
      {
        pageExtensions: ['tsx', 'mdx'],
      },
    ],
    [optimizedImages],
    [withCSS],
  ],
  nextConfig,
);
