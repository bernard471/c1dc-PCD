import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/mongodb";
import User from "@/models/userModel";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  try {
    // Get the current token
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });
    
    if (!token?.id) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    
    // Connect to database and get fresh user data
    await connectDB();
    const user = await User.findById(token.id);
    
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    
    // Return the fresh user data
    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        subscriptionStatus: user.subscriptionStatus,
        hasCompletedPayment: user.hasCompletedPayment,
      }
    });
  } catch (error) {
    console.error("Session refresh error:", error);
    return NextResponse.json({ success: false, error: "Failed to refresh session" }, { status: 500 });
  }
}
