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
import { TypographyStyle, GoogleFont } from 'react-typography';
import typography from '../utils/typography';

const components: Components = {
  code: CodeBlocks,
  inlineCode: InlineCode,
};

export default class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
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
