import { fetchBlogPosts } from '../../lib/contentful';
import BlogList from '@/components/BlogList';
import NewsletterForm from '@/components/NewsletterForm';
import ChatButton from '../../components/ChatButton';

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
      
      {/* FILTER FOR BLOGS */}
      <BlogList initialPosts={posts} />
      
      {/* Newsletter Section - Now using the client component */}
      <NewsletterForm />

      {/* Chat Button */}
      <ChatButton />
    </div>
  );
}
