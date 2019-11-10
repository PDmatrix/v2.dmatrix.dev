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

const components: Components = {
  code: CodeBlocks,
  inlineCode: InlineCode,
  // TODO: Implement wrapper with information about post
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // eslint-disable-next-line react/display-name
  wrapper: props => {
    console.log(props);
    // eslint-disable-next-line react/prop-types
    return <div>{props.children}</div>;
  },
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
