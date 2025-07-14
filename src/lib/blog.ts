import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const blogDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image?: string;
  contentHtml?: string; // Make this optional
}

export function getSortedBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,  // Changed from 'id' to 'slug'
      ...(matterResult.data as Omit<BlogPost, 'slug' | 'contentHtml'>),
    };
  });

  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getBlogCategories(): string[] {
  const posts = getSortedBlogPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getSortedBlogPosts();
  return posts.filter(post => post.category === category);
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as Omit<BlogPost, 'slug' | 'contentHtml'>),
    // Ensure image path is properly returned
    image: matterResult.data.image || undefined,
  };
}
