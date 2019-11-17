import React from 'react';
import { useRouter } from 'next/router';

import posts from '../../posts.json';
import PostList from '../../../components/postList';
import Head from 'next/head';

const Post = (): React.ReactElement => {
  const router = useRouter();
  const { tag } = router.query;

  const postsWithTag = posts.filter(x => x.tags.includes(tag as string));

  return (
    <>
      <Head>
        <title>Tag: {tag} | Dmatrix&apos;s thoughts</title>
        <meta name="keywords" content={tag as string} />
        <meta name="description" content={`Posts with a ${tag} tag`} />
      </Head>
      <PostList posts={postsWithTag} />
    </>
  );
};

export default Post;
