import React from 'react';
import { Router } from 'next/router';

const Home = () => {
  return null;
};

Home.getInitialProps = ({ res }: { res: any }) => {
  if (res) {
    res.writeHead(302, {
      Location: '/blog',
    });
    res.end();
  } else {
    window.location.replace('/blog');
  }
  return {};
};

export default Home;
