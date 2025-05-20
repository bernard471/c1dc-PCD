import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/mongodb';
import Subscriber from '@/models/subscriberModel';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get token from URL
    const token = request.nextUrl.searchParams.get('token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/unsubscribe-error', request.url));
    }
    
    // Find subscriber with this token
    const subscriber = await Subscriber.findOne({ unsubscribeToken: token });
    
    if (!subscriber) {
      return NextResponse.redirect(new URL('/unsubscribe-error', request.url));
    }
    
    // Update subscriber to inactive
    subscriber.isActive = false;
    await subscriber.save();
    
    // Redirect to unsubscribe confirmation page
    return NextResponse.redirect(new URL('/unsubscribe-success', request.url));
  } catch (error) {
    console.error('Error processing unsubscribe request:', error);
    return NextResponse.redirect(new URL('/unsubscribe-error', request.url));
  }
}