import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/dbConfig/mongodb';
import UserMobileSecurityProgress from '@/models/MobileSecurity';

export async function GET() {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      await connectDB();
      
      const userId = session.user.id;
      
      const userSecurityData = await UserMobileSecurityProgress.findOne({ userId });
      
      // If no data exists, return default structure
      if (!userSecurityData) {
        return NextResponse.json({ 
          completedCategories: {}
        });
      }
      
      // Transform the data to a flat structure for the component
      const flatCompletedCategories: { [key: string]: boolean } = {};
      
      // Add Android categories
      if (userSecurityData.completedCategories && userSecurityData.completedCategories.android) {
        userSecurityData.completedCategories.android.forEach((category: string) => {
          flatCompletedCategories[category] = true;
        });
      }
      
      // Add iOS categories
      if (userSecurityData.completedCategories && userSecurityData.completedCategories.ios) {
        userSecurityData.completedCategories.ios.forEach((category: string) => {
          flatCompletedCategories[category] = true;
        });
      }
      
      const responseData = {
        completedCategories: flatCompletedCategories,
        deviceType: userSecurityData.deviceType,
        lastUpdated: userSecurityData.lastUpdated
      };
      
      return NextResponse.json(responseData);
    } catch (error) {
      console.error('Error fetching mobile security data:', error);
      return NextResponse.json({ error: 'Failed to fetch mobile security data' }, { status: 500 });
    }
  }
  

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      await connectDB();
      
      const requestBody = await req.json();
      
      const { completedCategories } = requestBody;
      
      const userId = session.user.id;
      
      // Handle the case where completedCategories might be a nested object or a flat object
      let androidCategories = [];
      let iosCategories = [];
      
      // Check if completedCategories has nested arrays already
      if (completedCategories.android && Array.isArray(completedCategories.android)) {
        androidCategories = completedCategories.android;
      }
      
      if (completedCategories.ios && Array.isArray(completedCategories.ios)) {
        iosCategories = completedCategories.ios;
      }
      
      // Process flat boolean values
      Object.keys(completedCategories).forEach(key => {
        // Skip the container keys
        if (key === 'android' || key === 'ios') return;
        
        // Only process boolean true values
        if (typeof completedCategories[key] === 'boolean' && completedCategories[key]) {
          if (key.endsWith('-ios')) {
            iosCategories.push(key);
          } else {
            androidCategories.push(key);
          }
        }
      });
      

      
      // Format the data according to your schema
      const formattedData = {
        completedCategories: {
          android: androidCategories,
          ios: iosCategories
        },
        deviceType: 'both',
        lastUpdated: new Date()
      };
      
      
      // Check if the user already has a document
      
      // Update or create user mobile security completion data
      const updatedData = await UserMobileSecurityProgress.findOneAndUpdate(
        { userId },
        formattedData,
        { 
          new: true, // Return the updated document
          upsert: true // Create if it doesn't exist
        }
      );
      
      
      if (!updatedData) {
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
      }
      
      return NextResponse.json(updatedData);
    } catch (error) {
      console.error('POST: Error updating mobile security data:', error);
      // More detailed error information
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      return NextResponse.json({ 
        error: 'Failed to update mobile security data',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
  }
  
