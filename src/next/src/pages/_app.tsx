import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MDXProvider, Components } from '@mdx-js/react';
import Layout from '../components/layout';
import '../static/normalize.css';

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
  wrapper: props => (
    <Layout>
      <div {...props} />
    </Layout>
  ),
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    );
  }
}
