import React from 'react';
import posts from "../posts.json";

const Index = () => {
  return (
    <div>
      {posts.map(x => <p>{x}</p>)}
    </div>
  );
};

export default Index;
