import React from 'react';
import posts from '../posts.json';
import PostList from '../../components/postList';
import Head from 'next/head';

const Index = (): React.ReactElement => (
  <>
    <Head>
      <title>All posts | Dmatrix&apos;s thoughts</title>
      <meta name="description" content="Personal blog for my thoughts" />
    </Head>
    <PostList posts={posts} />
  </>
);

export default Index;
