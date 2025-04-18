import Link from 'next/link';
import Image from 'next/image';
import { fetchBlogPosts } from '../../lib/contentful';
import { format } from 'date-fns';
import { Calendar, ArrowRight } from 'lucide-react';

// This makes the component a Server Component by default
export default async function BlogIndex() {
  // Fetch data directly in the component
  const posts = await fetchBlogPosts();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 px-8 py-16 md:py-24 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Security Insights Blog</h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8 text-blue-100">
            Stay informed about the latest security trends, threats, and best practices to keep your digital life protected.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
          <div className="h-full w-full bg-gradient-to-l from-blue-500/30 to-transparent"></div>
        </div>
      </div>
      
      {/* Blog Posts */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
        </div>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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
      {posts.length > 0 && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Article</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2 relative h-64 md:h-auto rounded-xl overflow-hidden">
                {posts[0]?.fields?.featuredImage?.fields?.file && (
                  <Image 
                    src={`https:${posts[0].fields.featuredImage.fields.file.url}`}
                    alt={posts[0].fields.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{posts[0]?.fields.title}</h3>
                <div className="flex items-center text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {format(new Date(posts[0]?.sys.createdAt), 'MMMM dd, yyyy')}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">5 min read</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Discover the latest insights on cybersecurity and learn how to protect your digital assets with our comprehensive guide.
                </p>
                <Link 
                  href={`/blogs/${posts[0]?.fields.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-md overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated</h2>
              <p className="text-purple-100 max-w-md">
                Subscribe to our newsletter to receive the latest security updates and tips directly to your inbox.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md sm:rounded-r-none mb-2 sm:mb-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="bg-indigo-800 text-white px-6 py-3 rounded-md sm:rounded-l-none font-medium hover:bg-indigo-900 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define the type for the post object
interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    title: string;
    thumbnail?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    slug: string;
  };
}

function BlogCard({ post }: { post: BlogPost }) {
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
