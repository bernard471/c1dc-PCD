import { NextResponse } from 'next/server';
import { fetchBlogPosts } from '../../../lib/contentful';

export async function GET() {
  try {
    const posts = await fetchBlogPosts();
    // Return only the 3 most recent posts
    return NextResponse.json(posts.slice(0, 3));
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent posts' },
      { status: 500 }
    );
  }
}
