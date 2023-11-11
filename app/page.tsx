import fs from 'fs';
import matter from 'gray-matter';

const getPostMetadata = (): any => {
  const folder = 'posts/';
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith('.mdx'));

  // Get gray-matter data from each file.
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`posts/${fileName}`, 'utf8');
    const matterResult = matter(fileContents);
    console.log(matterResult);
    return {
      title: matterResult.data.title,
      date: matterResult.data.publishDate,
      description: matterResult.data.description,
      slug: fileName.replace('.mdx', ''),
    };
  });

  return posts;
};

export default function Home() {
  const posts = getPostMetadata();
  console.log(posts);

  return posts.map((post: any) => (
    <div key={post.slug}>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </div>
  ));
}
