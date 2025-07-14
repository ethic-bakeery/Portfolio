import Link from 'next/link';
import { getSortedBlogPosts, getBlogCategories } from '@/lib/blog';

export default function BlogPage() {
  const posts = getSortedBlogPosts();
  const categories = getBlogCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Link
              key={category}
              href={`/blog/category/${encodeURIComponent(category)}`}
              className="px-4 py-2 bg-green-200 text-green-800 rounded-lg hover:bg-green-300 dark:bg-green-700 dark:text-green-100 dark:hover:bg-green-600"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-8">
        {posts.map(post => (
          <article key={post.slug} className="border-b pb-6">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-600">{post.title}</h2>
            </Link>
            <p className="text-gray-600 mb-2">{new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} • {post.category}</p>
            <p className="text-gray-700 mb-4">{post.description}</p>
            {post.image && (
              <img
                src={`/blog-images/${post.image}`}
                alt={post.title}
                className="w-full max-w-md h-auto rounded-lg mb-4"
              />
            )}
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
