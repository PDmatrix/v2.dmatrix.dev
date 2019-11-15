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

const components: Components = {
  code: CodeBlocks,
  inlineCode: InlineCode,
  // @ts-ignore
  img: props => {
    const router = useRouter();
    const originalImage = require(`.${router.pathname}/${props.src}`);
    const lqipImage = require(`.${router.pathname}/${props.src}?lqip`);

    return (
      <Image alt={props.alt} real={originalImage} placeholder={lqipImage} />
    );
  },
  // TODO: Implement wrapper with information about post
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // eslint-disable-next-line react/display-name
  wrapper: PostWrapper,
};

const enrichChildrenWithMap = (children: any, meta: any) => {
  return recursiveMap(children, (child: any) => {
    return React.cloneElement(child, meta);
  });
};

const recursiveMap = (children: any, fn: any) => {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // @ts-ignore
    if (child.props.children) {
      child = React.cloneElement(child, {
        // @ts-ignore
        children: recursiveMap(child.props.children, fn),
      });
    }

    return fn(child);
  });
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
