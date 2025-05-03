import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/dbConfig/mongodb';
import User from '@/models/userModel';

export async function POST(request: NextRequest) {
  try {
    // Get the current session to verify the user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'You must be logged in to change your password' },
        { status: 401 }
      );
    }
    
    // Get request body
    const { email, currentPassword, newPassword } = await request.json();
    
    // Verify the email matches the session user
    if (email !== session.user.email) {
      return NextResponse.json(
        { message: 'Unauthorized access' },
        { status: 403 }
      );
    }
    
    // Connect to the database
    await connectDB();
    
    // Find the user in the database with password field included
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if it's a Google account
    if (user.isGoogleAccount) {
      return NextResponse.json(
        { message: 'Password change is not available for Google accounts' },
        { status: 400 }
      );
    }
    
    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Current password is incorrect' },
        { status: 400 }
      );
    }
    
    // Update the password
    user.password = newPassword;
    // Add the password updated timestamp
    user.passwordUpdatedAt = new Date();
    await user.save(); // The pre-save hook in your model will hash the password
    
    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { message: 'An error occurred while changing the password' },
      { status: 500 }
    );
  }
}
