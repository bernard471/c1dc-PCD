import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/mongodb";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    
    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    
    // Check if it's a Google account
    if (user.isGoogleAccount) {
      return NextResponse.json(
        { message: "Please use Google sign-in for this account" },
        { status: 400 }
      );
    }
    
    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    
    // User authenticated successfully
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      subscriptionStatus: user.subscriptionStatus,
      hasCompletedPayment: user.hasCompletedPayment,
    };
    
    // Determine if user needs to be redirected to payment
    const requiresPayment = !user.hasCompletedPayment || user.subscriptionStatus !== 'active';
    
    return NextResponse.json(
      { 
        message: "Login successful",
        user: userData,
        requiresPayment
      },
      { status: 200 }
    );
  } 
  
  catch (error: unknown) {
    console.error("Login error:", error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : "An error occurred during login";
    
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
