/* eslint-disable @typescript-eslint/no-var-requires */

import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MDXProvider, Components } from '@mdx-js/react';
import Layout from '../components/layout';
import Head from 'next/head';
import CodeBlocks from '../components/codeBlocks';
import InlineCode from '../components/inlineCode';
import theme from '../utils/theme';
import GlobalStyle from '../components/globalStyle';
import { useRouter } from 'next/router';

import Image from '../components/image';
import PostWrapper from '../components/postWrapper';

interface ImageProps {
  readonly src: string;
  readonly title: string;
  readonly alt: string;
}

const ImageComponent = ({
  src,
  alt,
  title,
}: ImageProps): React.ReactElement => {
  const router = useRouter();

  const originalImage = require(`.${router.pathname}/${src}`);
  const lqipImage = require(`.${router.pathname}/${src}?lqip`);

  return (
    <Image
      title={title}
      alt={alt}
      real={originalImage}
      placeholder={lqipImage}
    />
  );
};

const components: Components = {
  code: CodeBlocks,
  inlineCode: InlineCode,
  img: ImageComponent,
  wrapper: PostWrapper,
};

export default class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Dmatrix&apos;s thoughts</title>
        </Head>
        <ThemeProvider theme={theme}>
          <MDXProvider components={components}>
            <Layout>
              <GlobalStyle />
              <Component {...pageProps} />
            </Layout>
          </MDXProvider>
        </ThemeProvider>
      </>
    );
  }
}
