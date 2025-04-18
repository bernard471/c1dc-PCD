import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../dbConfig/mongodb';
import Comment from '@/models/Comment';
import { getServerSession } from 'next-auth/next';

// GET comments for a specific post
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    await connectDB();
    
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST a new comment
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    const { postId, content } = await request.json();
    
    if (!postId || !content) {
      return NextResponse.json({ error: 'Post ID and content are required' }, { status: 400 });
    }
    
    await connectDB();
    
    const newComment = new Comment({
      postId,
      author: session.user.name || 'Anonymous',
      authorEmail: session.user.email,
      authorImage: session.user.image,
      content,
      createdAt: new Date(),
      likes: 0
    });
    
    await newComment.save();
    
    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
