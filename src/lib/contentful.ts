import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface BlogPost {
  title: string;
  content: Document; // Using the proper Contentful Document type
  thumbnail: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          }
        }
      }
    }
  };
  featuredImage: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          }
        }
      }
    }
  };
  slug: string;
}

export interface BlogPostEntry {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: BlogPost;
}

// Create Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENT_DELIVERY_API || '',
});

// Fetch all blog posts
export async function fetchBlogPosts(): Promise<BlogPostEntry[]> {
  try {
    const response = await client.getEntries({
      content_type: 'securityEventBlog', // Updated to your actual content type ID
      order: ['-sys.createdAt'],
    });
    
    return response.items.map((item) => ({
      sys: {
        id: item.sys.id,
        createdAt: item.sys.createdAt,
      },
      fields: {
        title: item.fields.title as string,
        content: item.fields.content,
        thumbnail: item.fields.thumbnail,
        featuredImage: item.fields.featuredImage,
        slug: item.fields.slug as string,
      } as BlogPost,
    })) as BlogPostEntry[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPostEntry | null> {
  try {
    const response = await client.getEntries({
      content_type: 'securityEventBlog', // Updated to your actual content type ID
      'fields.slug': slug,
      limit: 1,
    });
    
    if (response.items.length > 0) {
      const item = response.items[0];
      return {
        sys: {
          id: item.sys.id,
          createdAt: item.sys.createdAt,
        },
        fields: {
          title: item.fields.title as string,
          content: item.fields.content,
          thumbnail: item.fields.thumbnail,
          featuredImage: item.fields.featuredImage,
          slug: item.fields.slug as string,
        } as BlogPost,
      } as BlogPostEntry;
    }
    return null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}
