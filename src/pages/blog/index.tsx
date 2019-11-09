import React from 'react';
import posts from '../posts.json';
import Link from 'next/link';

const Index = () => {
  return (
    <div>
      {posts.map((x: any, idx: any) => (
        <>
          <Link href={`/blog/${x.link}`}>
            <a>
              <h3>{x.title}</h3>
            </a>
          </Link>
          <small>
            {x.publishDate.toLocaleString()} | {x.timeToRead}
          </small>
          <p>{x.description}</p>
          <div>
            {x.tags.map((tag: any, idx: any) => (
              <span key={idx}>#{tag}</span>
            ))}
          </div>
          <hr />
        </>
      ))}
    </div>
  );
};

export default Index;
