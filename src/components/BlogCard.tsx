import Link from "next/link";
import { Post } from "@/types";

export default function BlogCard({ post }: { post: Post }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                        Read more →
                    </span>
                </div>
            </div>
        </Link>
    );
}