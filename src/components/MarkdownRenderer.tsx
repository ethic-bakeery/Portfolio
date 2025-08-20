"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // Code blocks with syntax highlighting
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <div className="relative">
                                <div className="absolute right-2 top-2 text-xs text-gray-400 uppercase">
                                    {match[1]}
                                </div>
                                <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                </pre>
                            </div>
                        ) : (
                            <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
                                {children}
                            </code>
                        );
                    },

                    // Tables
                    table({ children }: any) {
                        return (
                            <div className="overflow-x-auto my-6">
                                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                                    {children}
                                </table>
                            </div>
                        );
                    },

                    th({ children }: any) {
                        return (
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold text-left">
                                {children}
                            </th>
                        );
                    },

                    td({ children }: any) {
                        return (
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                {children}
                            </td>
                        );
                    },

                    // Images with better spacing
                    img({ src, alt }: any) {
                        return (
                            <div className="my-6 flex justify-center">
                                <img
                                    src={src}
                                    alt={alt}
                                    className="max-w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                />
                            </div>
                        );
                    },

                    // Headings with anchors
                    h1({ children }: any) {
                        return <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>;
                    },

                    h2({ children }: any) {
                        return <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>;
                    },

                    h3({ children }: any) {
                        return <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>;
                    },

                    // Blockquotes
                    blockquote({ children }: any) {
                        return (
                            <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
                                {children}
                            </blockquote>
                        );
                    },

                    // Lists
                    ul({ children }: any) {
                        return <ul className="list-disc list-inside my-4 space-y-1">{children}</ul>;
                    },

                    ol({ children }: any) {
                        return <ol className="list-decimal list-inside my-4 space-y-1">{children}</ol>;
                    },

                    li({ children }: any) {
                        return <li className="ml-4">{children}</li>;
                    },

                    // Links
                    a({ href, children }: any) {
                        return (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                            >
                                {children}
                            </a>
                        );
                    },

                    // Paragraphs
                    p({ children }: any) {
                        return <p className="my-4 leading-relaxed">{children}</p>;
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}