'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

// Define the type for blog posts
interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    title: string;
    slug: string;
    thumbnail?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

export const RecentSecurityEvents: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setIsLoading(true);
        // Fetch from an API route instead of directly using contentful client
        const response = await fetch('/api/recent-posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        setRecentPosts(posts);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching recent blog posts:', err);
        setError('Failed to load recent security events');
        setIsLoading(false);
      }
    };
    
    fetchRecentPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Security Events</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded bg-gray-200"></div>
                <div className="ml-3">
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Security Events</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Security Events</h2>
      <div className="space-y-4">
        {recentPosts.map((post) => (
          <Link 
            href={`/blogs/${post.fields.slug}`} 
            key={post.sys.id}
            className="items-center justify-between border-b pb-3 last:border-b-0 last:pb-0 hover:bg-gray-50 rounded-md p-2 transition-colors"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 relative rounded overflow-hidden">
                {post.fields.thumbnail?.fields?.file ? (
                  <Image 
                    src={`https:${post.fields.thumbnail.fields.file.url}`}
                    alt={post.fields.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PCD</span>
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{post.fields.title}</p>
              </div>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-2">
              <Calendar className="w-3 h-3 mr-1" /> 
              {format(new Date(post.sys.createdAt), 'MMM dd, yyyy')}
            </div>
          </Link>
        ))}
      </div>
      <Link 
        href="/blogs" 
        className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
      >
        View all security events <ArrowRight className="ml-1 h-3 w-3" />
      </Link>
    </div>
  );
};

export default RecentSecurityEvents;
