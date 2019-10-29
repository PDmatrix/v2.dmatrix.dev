import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MDXProvider, Components } from '@mdx-js/react';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

const components: Components = {
  wrapper: (props: any) => (
    <div style={{ padding: '20px', backgroundColor: 'tomato' }}>
      <main {...props} />
    </div>
  ),
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <MDXProvider components={components}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </MDXProvider>
    );
  }
}
