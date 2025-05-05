import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/mongodb';
import User from '@/models/userModel';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    
    if (!token || !password) {
      return NextResponse.json(
        { message: 'Token and password are required' },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await connectDB();
    
    // Find the user with the reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Token must not be expired
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'Password reset token is invalid or has expired' },
        { status: 400 }
      );
    }
    
    // Update the user's password
    user.password = password;
    user.passwordUpdatedAt = new Date();
    
    // Clear the reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    // Save the user (password will be hashed by the pre-save hook)
    await user.save();
    
    return NextResponse.json(
      { message: 'Password has been reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in reset password:', error);
    return NextResponse.json(
      { message: 'An error occurred while resetting your password' },
      { status: 500 }
    );
  }
}