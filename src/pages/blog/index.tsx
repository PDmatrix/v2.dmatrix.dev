import React from 'react';
import posts from '../posts.json';

const Index = () => {
  return (
    <div>
      {posts.map((x: any, idx: any) => (
        <p key={idx}>
          <pre>{JSON.stringify(x, null, 2)}</pre>
        </p>
      ))}
    </div>
  );
};

export default Index;
