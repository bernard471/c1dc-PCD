import { NextResponse } from 'next/server';
import connectDB from '@/dbConfig/mongodb';
import User from '@/models/userModel';

// Replace with your actual Paystack secret key
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
    }

    // Verify transaction with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json({ 
        success: false, 
        error: data.message || 'Payment verification failed' 
      }, { status: 400 });
    }

    // Check if the payment was successful
    if (data.data.status !== 'success') {
      return NextResponse.json({ 
        success: false, 
        error: 'Payment was not successful' 
      }, { status: 400 });
    }

    // Get user ID from metadata
    const userId = data.data.metadata?.user_id;
    const email = data.data.customer.email;

    // Connect to database
    await connectDB();

    // Find user by ID or email
    let user;
    if (userId) {
      user = await User.findById(userId);
    }
    
    // If user not found by ID, try to find by email
    if (!user && email) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found' 
      }, { status: 404 });
    }

    // Calculate subscription expiry date (1 year from now)
    const subscriptionExpiry = new Date();
    subscriptionExpiry.setFullYear(subscriptionExpiry.getFullYear() + 1);

    // Update user subscription status
    user.subscriptionStatus = 'active';
    user.hasCompletedPayment = true;
    user.subscriptionExpiry = subscriptionExpiry;
    await user.save();

    return NextResponse.json({
      success: true,
      email: data.data.customer.email,
      amount: data.data.amount / 100, // Convert from pesewas to cedis
      reference: data.data.reference,
      transaction_date: data.data.paid_at,
      subscription_expiry: subscriptionExpiry,
      redirect_url: '/dashboard'
    });
  } catch (error) {
    console.error('Payment verification API error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
