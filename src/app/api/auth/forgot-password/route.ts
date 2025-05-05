import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/dbConfig/mongodb';
import User from '@/models/userModel';
import { sendMail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await connectDB();
    
    // Find the user in the database
    const user = await User.findOne({ email });
    
    // Don't reveal if user exists or not for security reasons
    if (!user) {
      return NextResponse.json(
        { message: 'If your email is registered, you will receive a password reset link' },
        { status: 200 }
      );
    }
    
    // Check if it's a Google account
    if (user.isGoogleAccount) {
      return NextResponse.json(
        { message: 'Password reset is not available for Google accounts. Please use Google Sign-In.' },
        { status: 400 }
      );
    }
    
    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Set token expiry (1 hour from now)
    const resetTokenExpiry = Date.now() + 3600000;
    
    // Save the token to the user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();
    
    // Create reset URL
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}`;
    
    // Send email
    await sendMail({
      to: email,
      subject: 'Password Reset - PCD System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #3b82f6;">PCD System</h1>
          </div>
          <div style="margin-bottom: 30px;">
            <h2 style="color: #374151;">Password Reset Request</h2>
            <p style="color: #4b5563; line-height: 1.5;">
              You requested a password reset for your PCD System account. Click the button below to reset your password. This link will expire in 1 hour.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
            </div>
            <p style="color: #4b5563; line-height: 1.5;">
              If you didn't request this password reset, you can safely ignore this email.
            </p>
            <p style="color: #4b5563; line-height: 1.5;">
              If the button above doesn't work, copy and paste this URL into your browser:
            </p>
            <p style="background-color: #f3f4f6; padding: 10px; border-radius: 5px; word-break: break-all;">
              ${resetUrl}
            </p>
          </div>
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; color: #6b7280; font-size: 14px;">
            <p>PCD System - Secure your data</p>
          </div>
        </div>
      `,
    });
    
    return NextResponse.json(
      { message: 'If your email is registered, you will receive a password reset link' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in forgot password:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}