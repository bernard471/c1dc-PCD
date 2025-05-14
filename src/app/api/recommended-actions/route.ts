import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/dbConfig/mongodb';
import RecommendedAction from '@/models/RecommendedAction';
import { recommendedActionsData } from '@/data/recommendedActionsData';

// Get all recommended actions with completion status
export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    await connectDB();
    const userId = session.user.id;
    
    // Get all completed actions for this user
    const completedActions = await RecommendedAction.find({ userId });
    
    // Map completion status to the actions data
    const actionsWithStatus = recommendedActionsData.map(action => {
      const completionData = completedActions.find(item => item.actionId === action.id);
      return {
        ...action,
        isCompleted: completionData?.isCompleted || false,
        completedAt: completionData?.completedAt || null
      };
    });
    
    return NextResponse.json({ success: true, data: actionsWithStatus });
  } catch (error) {
    console.error('Error fetching recommended actions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recommended actions' },
      { status: 500 }
    );
  }
}

// Update completion status
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  

  try {
    await connectDB();
    
    const { actionId, isCompleted } = await req.json();
    const userId = session.user.id;
    
    // Find the action in the static data to get the title
    const actionData = recommendedActionsData.find(action => action.id === actionId);
    if (!actionData) {
      return NextResponse.json(
        { success: false, error: 'Action not found' },
        { status: 404 }
      );
    }
    
    // Find existing record or create new one
    const updatedAction = await RecommendedAction.findOneAndUpdate(
      { actionId, userId },
      { 
        actionId,
        title: actionData.title,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
        userId
      },
      { 
        new: true, // Return the updated document
        upsert: true // Create if it doesn't exist
      }
    );
    
    return NextResponse.json({ success: true, data: updatedAction });
  } catch (error) {
    console.error('Error updating recommended action:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to update recommended action', details: errorMessage },
      { status: 500 }
    );
  }
}
