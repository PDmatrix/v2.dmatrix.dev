import React from 'react';
import { Col } from 'react-styled-flexboxgrid';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <Col>
        <Link href="/blog" passHref>
          <a>
            <span>Blog</span>
          </a>
        </Link>
        &nbsp;
        <Link href="/projects" passHref>
          <a>
            <span>Projects</span>
          </a>
        </Link>
        &nbsp;
        <a
          href="https://github.com/PDmatrix"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span>Github</span>
        </a>
      </Col>
      <Col>
        <p>
          Hello! My name is Dmitry Sebakov and I sometimes write something in
          here
        </p>
      </Col>
    </>
  );
};

export default Home;
