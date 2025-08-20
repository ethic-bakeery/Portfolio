import { getBlogPost } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default async function BlogPostPage({
  params
}: {
  params: { slug: string }
}) {
  let post;

  try {
    post = await getBlogPost(params.slug);
  } catch (error) {
    notFound();
  }

  // Type guard to ensure contentHtml is always a string
  const content = typeof post.contentHtml === 'string' ? post.contentHtml : '';

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-6">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} • {post.category}
          </p>

          {post.image && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={`/blog-images/${post.image}`}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <p className="text-xl text-gray-700 mb-8">{post.description}</p>
        </div>

        {/* Post Content with enhanced Markdown rendering */}
        <MarkdownRenderer content={content} />
      </article>
    </div>
  );
}