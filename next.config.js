/* eslint-disable @typescript-eslint/no-var-requires */

const withPlugins = require('next-compose-plugins');
const emoji = require('remark-emoji');
const optimizedImages = require('next-optimized-images');
const withCSS = require('@zeit/next-css');

const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [emoji],
  },
});

const nextConfig = {
  devIndicators: {
    autoPrerender: false,
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
