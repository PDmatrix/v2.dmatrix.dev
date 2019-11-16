import React from 'react';
import { useRouter } from 'next/router';

import posts from '../../posts.json';
import PostList from '../../../components/postList';

const Post = (): React.ReactElement => {
  const router = useRouter();
  const { tag } = router.query;

  const postsWithTag = posts.filter(x => x.tags.includes(tag as string));

  return <PostList posts={postsWithTag} />;
};

export default Post;
