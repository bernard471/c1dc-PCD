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
    
    const { commentId } = await request.json();
    
    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }
    
    await connectDB();
    
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    
    // Increment likes
    comment.likes += 1;
    await comment.save();
    
    return NextResponse.json({ comment }, { status: 200 });
  } catch (error) {
    console.error('Error liking comment:', error);
    return NextResponse.json({ error: 'Failed to like comment' }, { status: 500 });
  }
}
