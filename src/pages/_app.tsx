import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MDXProvider, Components } from '@mdx-js/react';
import Layout from '../components/layout';
import '../static/global.css';
import Head from 'next/head';
//import { TypographyStyle, GoogleFont } from 'react-typography';
import { TypographyStyle, GoogleFont } from 'react-typography';
import typography from '../utils/typography';
import CodeBlocks from '../components/codeBlocks';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

const components: Components = {
  /*
    props: {children: [{}], meta: {}}
   */
  // eslint-disable-next-line react/display-name
  wrapper: (props: any) => <div {...props} />,
  code: CodeBlocks,
};

export default class MyApp extends App {
  render() {
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
              <Component {...pageProps} />
            </Layout>
          </MDXProvider>
        </ThemeProvider>
      </>
    );
  }
}
