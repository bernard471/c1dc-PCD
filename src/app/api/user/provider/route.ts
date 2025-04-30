import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/dbConfig/mongodb';
import User from '@/models/userModel';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Connect to the database
    await connectDB();
    
    // Find the user to check if they're using Google auth
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Determine the provider based on isGoogleAccount flag
    const provider = user.isGoogleAccount ? 'google' : 'credentials';
    
    return NextResponse.json({ provider });
  } catch (error) {
    console.error('Error fetching user provider:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching user data' },
      { status: 500 }
    );
  }
}
