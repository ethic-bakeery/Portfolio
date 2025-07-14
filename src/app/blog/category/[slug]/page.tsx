import { getPostsByCategory } from '@/lib/blog';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const posts = getPostsByCategory(decodeURIComponent(params.slug));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Posts in category: {decodeURIComponent(params.slug)}
      </h1>

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
            })}</p>
            <p className="text-gray-700 mb-4">{post.description}</p>
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
