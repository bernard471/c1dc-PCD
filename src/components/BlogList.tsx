'use client';

import { useState } from 'react';
import { BlogPostEntry } from '@/lib/contentful';
import BlogSearch from './BlogSearch';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

interface BlogListProps {
  initialPosts: BlogPostEntry[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  return (
    <>
      <BlogSearch posts={initialPosts} onFilterChange={setFilteredPosts} />
      
      {/* Blog Posts */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
        </div>
        
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.sys.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No articles found.</p>
          </div>
        )}
      </div>
      
      {/* Featured Section */}
      {initialPosts.length > 0 && filteredPosts.length > 0 && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Article</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2 relative h-64 md:h-auto rounded-xl overflow-hidden">
                {initialPosts[0]?.fields?.featuredImage?.fields?.file && (
                  <Image 
                    src={`https:${initialPosts[0].fields.featuredImage.fields.file.url}`}
                    alt={initialPosts[0].fields.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{initialPosts[0]?.fields.title}</h3>
                <div className="flex items-center text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {format(new Date(initialPosts[0]?.sys.createdAt), 'MMMM dd, yyyy')}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">5 min read</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Discover the latest insights on cybersecurity and learn how to protect your digital assets with our comprehensive guide.
                </p>
                <Link 
                  href={`/blogs/${initialPosts[0]?.fields.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BlogCard({ post }: { post: BlogPostEntry }) {
  const { title, thumbnail, slug } = post.fields;
  const createdAt = new Date(post.sys.createdAt);
  
  return (
    <Link href={`/blogs/${slug}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        <div className="h-48 relative">
          {thumbnail?.fields?.file ? (
            <Image 
              src={`https:${thumbnail.fields.file.url}`}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-xl font-bold">PCD Blog</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">{title}</h2>
          <div className="flex items-center text-gray-500 mt-auto pt-4">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{format(createdAt, 'MMMM dd, yyyy')}</span>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <span className="text-blue-600 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
            Read article <ArrowRight className="ml-1 h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}