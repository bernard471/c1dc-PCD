'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { BlogPostEntry } from '../lib/contentful';

interface BlogSearchProps {
  posts: BlogPostEntry[];
  onFilterChange: (filteredPosts: BlogPostEntry[]) => void;
}

export default function BlogSearch({ posts, onFilterChange }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (!term.trim()) {
      // If search is empty, return all posts
      onFilterChange(posts);
      return;
    }
    
    // Filter posts based on title
    const filtered = posts.filter(post => 
      post.fields.title.toLowerCase().includes(term.toLowerCase())
    );
    
    onFilterChange(filtered);
  };

  return (
    <div className="mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={handleSearch}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white 
                    placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 
                    focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </div>
  );
}