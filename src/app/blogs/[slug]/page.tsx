'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchBlogPosts, fetchBlogPostBySlug } from '../../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, User } from 'lucide-react';
import BackToTopButton from '../../../components/BackToTopButton';
import CommentSection from '../../../components/CommentSection';
import { Document, Block, Inline, Text, Mark } from '@contentful/rich-text-types';
import { Options } from '@contentful/rich-text-react-renderer';
import { BubbleLoader } from '@/components/ui/loaders';

// Define proper types for your blog data
interface BlogData {
  post: {
    sys: {
      id: string;
      createdAt: string;
    };
    fields: {
      title: string;
      content: Document;
      featuredImage?: {
        fields: {
          file: {
            url: string;
          }
        }
      };
      slug: string;
    };
  };
  filteredRelatedPosts: Array<{
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
          }
        }
      };
    };
  }>;
}

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const [data, setData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getBlogData(slug);
        setData(result);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [slug]);
  
  if (loading) {
    return <BubbleLoader message="Loading blog data..." size="medium" />;
  }

  if (!data) return notFound();
  
  const { post, filteredRelatedPosts } = data;
  
  if (!post) {
    notFound();
  }
  
  const { title, content, featuredImage } = post.fields;
  const createdAt = new Date(post.sys.createdAt);
  
  // Filter out the current post and get up to 3 related posts
  async function getBlogData(slug: string): Promise<BlogData | null> {
    const post = await fetchBlogPostBySlug(slug);
    const relatedPosts = await fetchBlogPosts();
    
    if (!post) {
      return null;
    }
    
    const filteredRelatedPosts = relatedPosts
      .filter(p => p.sys.id !== post.sys.id)
      .slice(0, 3);
      
    return { post, filteredRelatedPosts };
  }
  
  // Custom options for rich text rendering
  const richTextOptions: Options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold">{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => <u className="underline">{text}</u>,
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="bg-gray-100 text-gray-800 rounded px-1 py-0.5 font-mono text-sm">{text}</code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: React.ReactNode) => (
        <p className="mb-6 leading-relaxed text-gray-700">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (_node: Block | Inline, children: React.ReactNode) => (
        <h1 className="text-3xl font-bold mt-10 mb-6 text-gray-900">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_node: Block | Inline, children: React.ReactNode) => (
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_node: Block | Inline, children: React.ReactNode) => (
        <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (_node: Block | Inline, children: React.ReactNode) => (
        <h4 className="text-lg font-bold mt-6 mb-2 text-gray-900">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (_node: Block | Inline, children: React.ReactNode) => (
        <h5 className="text-base font-bold mt-4 mb-2 text-gray-900">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (_node: Block | Inline, children: React.ReactNode) => (
        <h6 className="text-sm font-bold mt-4 mb-2 text-gray-900">{children}</h6>
      ),
      [BLOCKS.UL_LIST]: (_node: Block | Inline, children: React.ReactNode) => (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node: Block | Inline, children: React.ReactNode) => (
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: React.ReactNode) => (
        <li className="pl-2">{children}</li>
      ),
      [BLOCKS.QUOTE]: (_node: Block | Inline, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-gray-700 bg-blue-50 rounded-r-md">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-t border-gray-200" />,
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        // Handle embedded images
        const { data } = node;
        if (data?.target?.fields && data.target.fields.file) {
          const { fields } = data.target;
          return (
            <div className="my-8">
              <Image
                src={`https:${fields.file.url}`}
                alt={fields.title || 'Blog image'}
                width={fields.file.details.image?.width || 800}
                height={fields.file.details.image?.height || 600}
                className="rounded-lg shadow-md mx-auto"
              />
              {fields.description && (
                <p className="text-center text-sm text-gray-500 mt-2">{fields.description}</p>
              )}
            </div>
          );
        }
        return null;
      },
      [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => {
        return (
          <a 
            href={node.data?.uri || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {children}
          </a>
        );
      },
      [BLOCKS.TABLE]: (_node: Block | Inline, children: React.ReactNode) => (
        <div className="overflow-x-auto my-8">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
            {children}
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (_node: Block | Inline, children: React.ReactNode) => (
        <tr className="bg-white even:bg-gray-50">{children}</tr>
      ),
      [BLOCKS.TABLE_CELL]: (node: Block | Inline, children: React.ReactNode) => {
        // Check if this is a header cell (first row)
        // We need to type check and cast appropriately
        const isHeader = 
          node.content && 
          node.content.length > 0 && 
          node.content[0].nodeType === 'paragraph' && 
          (node.content[0] as Block).content && 
          (node.content[0] as Block).content.length > 0 && 
          (node.content[0] as Block).content[0].nodeType === 'text' &&
          ((node.content[0] as Block).content[0] as Text).marks && 
          ((node.content[0] as Block).content[0] as Text).marks.some((mark: Mark) => mark.type === 'bold');
        
        if (isHeader) {
          return (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              {children}
            </th>
          );
        }
        
        return (
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {children}
          </td>
        );
      },
    },
  };
  
// For the calculateReadingTime function, replace any with proper type:
const calculateReadingTime = (content: Document): number => {
  // Extract all text from the rich text content
  const text = JSON.stringify(content);
  // Count words (rough estimate)
  const words = text.split(/\s+/).length;
  // Average reading speed: 200 words per minute
  const readingTime = Math.ceil(words / 200);
  return readingTime;
};
  
  const readingTime = calculateReadingTime(content);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/blogs" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 group">
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to all posts
      </Link>
      
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {featuredImage?.fields?.file && (
          <div className="relative h-64 md:h-96 w-full">
            <Image 
              src={`https:${featuredImage.fields.file.url}`}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{title}</h1>
              <div className="flex items-center text-white/90">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{format(createdAt, 'MMMM dd, yyyy')}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">{readingTime} min read</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-6 md:p-10">
          {!featuredImage?.fields?.file && (
            <>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              <div className="flex items-center text-gray-500 mb-8">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{format(createdAt, 'MMMM dd, yyyy')}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">{readingTime} min read</span>
              </div>
            </>
          )}
          
          {/* Author info - moved to top */}
          <div className="flex items-center mb-8 pb-8 border-b border-gray-100">
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              <User className="h-6 w-6" />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="font-bold text-gray-900">PCD Security Team</h3>
              <p className="text-gray-600 text-sm">
                Experts in personal cybersecurity and digital protection strategies.
              </p>
            </div>
            
            {/* Social sharing and bookmarking */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                <Bookmark className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Article content with enhanced styling */}
          <div className="prose prose-lg max-w-none">
            {documentToReactComponents(content, richTextOptions)}
          </div>
          
          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">Cybersecurity</span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">Privacy</span>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Digital Protection</span>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">Security Tips</span>
            </div>
          </div>
        </div>
      </article>
      
      {/* Related posts */}
      {filteredRelatedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredRelatedPosts.map((relatedPost: { 
              sys: { 
                id: string; 
                createdAt: string; 
              }; 
              fields: { 
                slug: string; 
                thumbnail?: { 
                  fields: { 
                    file: { 
                      url: string; 
                    }; 
                  }; 
                }; 
                title: string; 
              }; 
            }) => (
              <Link 
                key={relatedPost.sys.id} 
                href={`/blogs/${relatedPost.fields.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col">
                <div className="h-40 relative">
                    {relatedPost.fields.thumbnail?.fields?.file ? (
                      <Image 
                        src={`https:${relatedPost.fields.thumbnail.fields.file.url}`}
                        alt={typeof relatedPost.fields.title === 'string' ? relatedPost.fields.title : 'Related post'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 384px"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">PCD Blog</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                      {relatedPost.fields.title}
                    </h3>
                    <div className="flex items-center text-gray-500 text-xs mt-auto">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{format(new Date(relatedPost.sys.createdAt), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}          </div>
        </div>
      )}
      
      {/* Comments section - now a separate component */}
      <CommentSection postId={post.sys.id} />
      
      {/* Newsletter section */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-md overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Our Newsletter</h2>
              <p className="text-blue-100 max-w-md">
                Get the latest security tips and updates delivered directly to your inbox.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md sm:rounded-r-none mb-2 sm:mb-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="bg-indigo-900 text-white px-6 py-3 rounded-md sm:rounded-l-none font-medium hover:bg-indigo-800 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to top button - now a client component */}
      <BackToTopButton />
    </div>
  );
}

