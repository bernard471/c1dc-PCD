import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/dbConfig/mongodb';
import User from '@/models/userModel';

// Helper function to format date to relative time
function getRelativeTimeString(date: Date | null | undefined): string {
  if (!date) return 'never';
  
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  
  if (diffInSecs < 60) return 'just now';
  if (diffInMins < 60) return `${diffInMins} ${diffInMins === 1 ? 'minute' : 'minutes'} ago`;
  if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffInDays < 7) return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  if (diffInWeeks < 4) return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  if (diffInMonths < 12) return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  return 'over a year ago';
}

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    await connectDB();
    const userId = session.user.id;
    
    // Find the user in the database
    const user = await User.findById(userId).select('passwordUpdatedAt isGoogleAccount createdAt');
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // If it's a Google account
    if (user.isGoogleAccount) {
      return NextResponse.json({ 
        lastPasswordChange: 'N/A',
        isGoogleAccount: true
      });
    }
    
    // If no password update date exists, use account creation date as fallback
    const dateToUse = user.passwordUpdatedAt || user.createdAt;
    
    // Format the date to a relative time string
    const lastPasswordChange = getRelativeTimeString(dateToUse);
    
    return NextResponse.json({ 
      lastPasswordChange,
      isGoogleAccount: false
    });
  } catch (error) {
    console.error('Error fetching password change data:', error);
    return NextResponse.json({ error: 'Failed to fetch password change data' }, { status: 500 });
  }
}
