import React from 'react';
import posts from '../posts.json';
import Link from 'next/link';

const Index = () => {
  return (
    <div>
      {posts.map((x: any) => (
        <div key={x.link}>
          <h3>
            <Link href={`/blog/${x.link}`} passHref>
              <a>{x.title}</a>
            </Link>
          </h3>
          <small>
            {new Date(x.publishDate).toLocaleDateString()} | {x.timeToRead}
          </small>
          <p>{x.description}</p>
          <div>
            {x.tags.map((tag: any) => (
              <span key={tag}>#{tag}&nbsp;</span>
            ))}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Index;
