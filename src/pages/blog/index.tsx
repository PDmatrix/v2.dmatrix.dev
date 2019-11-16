import React from 'react';
import posts from '../posts.json';
import PostList from '../../components/postList';

const Index = (): React.ReactElement => <PostList posts={posts} />;

export default Index;
