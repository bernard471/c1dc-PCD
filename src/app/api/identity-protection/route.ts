import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/dbConfig/mongodb';
import UserIdentityProtectionProgress from '@/models/IdentityProtection';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    await connectDB();
    const userId = session.user.id;
    
    const userSecurityData = await UserIdentityProtectionProgress.findOne({ userId });
    
    return NextResponse.json(userSecurityData || { completedCategories: [] });
  } catch (error) {
    console.error('Error fetching identity protection data:', error);
    return NextResponse.json({ error: 'Failed to fetch identity protection data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    await connectDB();
    const { completedCategories } = await req.json();
    const userId = session.user.id;
    
    // Update or create user identity protection completion data
    const updatedData = await UserIdentityProtectionProgress.findOneAndUpdate(
      { userId },
      { 
        completedCategories,
        lastUpdated: new Date()
      },
      { 
        new: true, // Return the updated document
        upsert: true // Create if it doesn't exist
      }
    );
    
    return NextResponse.json(updatedData);
  } catch (error) {
    console.error('Error updating identity protection data:', error);
    return NextResponse.json({ error: 'Failed to update identity protection data' }, { status: 500 });
  }
}
