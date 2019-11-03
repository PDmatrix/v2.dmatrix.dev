import React from 'react';
import posts from '../posts.json';

const Index = () => {
  return (
    <div>
      {posts.map((x: any, idx: any) => (
        <>
          <h3>{x.title}</h3>
          <small>
            {new Date(x.publishDate).toLocaleString()} | {x.timeToRead}
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
