import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/mongodb";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { name, email, password } = await request.json();
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }
    
    // Create new user with subscription fields
    const newUser = await User.create({
      name,
      email,
      password,
      isGoogleAccount: false,
      subscriptionStatus: 'none',
      hasCompletedPayment: false,
    });
    
    // Remove password from response
    const user = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      isGoogleAccount: newUser.isGoogleAccount,
      subscriptionStatus: newUser.subscriptionStatus,
      hasCompletedPayment: newUser.hasCompletedPayment,
      createdAt: newUser.createdAt,
    };
    
    return NextResponse.json(
      { 
        message: "User created successfully", 
        user,
        requiresPayment: true 
      },
      { status: 201 }
    );
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
