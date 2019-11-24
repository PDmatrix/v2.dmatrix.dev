import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const TagsContainer = styled.div`
  margin-bottom: 1.4em;
`;

interface Post {
  readonly link: string;
  readonly title: string;
  readonly publishDate: string;
  readonly timeToRead: string;
  readonly description: string;
  readonly tags: string[];
}

const PostList = ({ posts }: { posts: Post[] }): React.ReactElement => (
  <div>
    {posts.map(x => (
      <div key={x.link}>
        <h2>
          <Link href={`/${x.link}`} passHref>
            <a>{x.title}</a>
          </Link>
        </h2>
        <small>
          {new Date(x.publishDate).toLocaleDateString()} | {x.timeToRead}
        </small>
        <p>{x.description}</p>
        <TagsContainer>
          {x.tags.map(tag => (
            <React.Fragment key={tag}>
              <Link href="/tags/[tag]" as={`/tags/${tag}`} passHref>
                <a>
                  <span key={tag}>#{tag}</span>
                </a>
              </Link>
              &nbsp;
            </React.Fragment>
          ))}
        </TagsContainer>
        <hr />
      </div>
    ))}
  </div>
);

export default PostList;
