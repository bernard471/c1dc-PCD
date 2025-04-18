import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../dbConfig/mongodb';
import Comment from '@/models/Comment';
import { getServerSession } from 'next-auth/next';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    const { commentId, content } = await request.json();
    
    if (!commentId || !content) {
      return NextResponse.json({ error: 'Comment ID and content are required' }, { status: 400 });
    }
    
    await connectDB();
    
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    
    const reply = {
      author: session.user.name || 'Anonymous',
      authorEmail: session.user.email,
      authorImage: session.user.image,
      content,
      createdAt: new Date(),
      likes: 0
    };
    
    comment.replies.push(reply);
    await comment.save();
    
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error('Error adding reply:', error);
    return NextResponse.json({ error: 'Failed to add reply' }, { status: 500 });
  }
}
