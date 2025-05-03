import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/dbConfig/mongodb';
import UserMobileSecurityProgress from '@/models/MobileSecurity';
import UserWifiSecurityProgress from '@/models/WifiSecurity';
import UserEmailSecurityProgress from '@/models/EmailSecurity';
import UserSocialMediaSecurityProgress from '@/models/SocialMediaSecurity';
import UserIdentityProtectionProgress from '@/models/IdentityProtection';
import UserCommunicationSecurityProgress from '@/models/CommunicationSecurity';
import UserRecommendedSecurityProgress from '@/models/RecommendedSecurity';
import UserImplementationStrategyProgress from '@/models/ImplementationStrategy';
import UserSecurityCompletion from '@/models/UserSecurityCompletion';

// Helper function to format date to relative time
function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  
  if (diffInSecs < 60) return 'just now';
  if (diffInMins < 60) return `${diffInMins} ${diffInMins === 1 ? 'minute' : 'minutes'} ago`;
  if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffInDays < 7) return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
}

// Map security module to icon and colors
const securityModuleMap: Record<string, { title: string, icon: string, iconColor: string, iconBgColor: string }> = {
  'mobile': { 
    title: 'Mobile Security', 
    icon: 'shield', 
    iconColor: 'text-blue-600', 
    iconBgColor: 'bg-blue-100' 
  },
  'wifi': { 
    title: 'Wi-Fi Security', 
    icon: 'lock', 
    iconColor: 'text-green-600', 
    iconBgColor: 'bg-green-100' 
  },
  'email': { 
    title: 'Email Security', 
    icon: 'mail', 
    iconColor: 'text-yellow-600', 
    iconBgColor: 'bg-yellow-100' 
  },
  'social-media': { 
    title: 'Social Media Security', 
    icon: 'users', 
    iconColor: 'text-purple-600', 
    iconBgColor: 'bg-purple-100' 
  },
  'identity': { 
    title: 'Identity Protection', 
    icon: 'user-check', 
    iconColor: 'text-teal-600', 
    iconBgColor: 'bg-teal-100' 
  },
  'communication': { 
    title: 'Communication Security', 
    icon: 'message-circle', 
    iconColor: 'text-indigo-600', 
    iconBgColor: 'bg-indigo-100' 
  },
  'recommended': { 
    title: 'Recommended Security', 
    icon: 'star', 
    iconColor: 'text-amber-600', 
    iconBgColor: 'bg-amber-100' 
  },
  'implementation': { 
    title: 'Implementation Strategy', 
    icon: 'clipboard-list', 
    iconColor: 'text-red-600', 
    iconBgColor: 'bg-red-100' 
  },
  'user': { 
    title: 'General Security', 
    icon: 'key', 
    iconColor: 'text-gray-600', 
    iconBgColor: 'bg-gray-100' 
  }
};

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    await connectDB();
    const userId = session.user.id;
    
    // Fetch all security progress data for the user
    const [
      mobileSecurityData,
      wifiSecurityData,
      emailSecurityData,
      socialMediaSecurityData,
      identityProtectionData,
      communicationSecurityData,
      recommendedSecurityData,
      implementationStrategyData,
      userSecurityData
    ] = await Promise.all([
      UserMobileSecurityProgress.findOne({ userId }).lean(),
      UserWifiSecurityProgress.findOne({ userId }).lean(),
      UserEmailSecurityProgress.findOne({ userId }).lean(),
      UserSocialMediaSecurityProgress.findOne({ userId }).lean(),
      UserIdentityProtectionProgress.findOne({ userId }).lean(),
      UserCommunicationSecurityProgress.findOne({ userId }).lean(),
      UserRecommendedSecurityProgress.findOne({ userId }).lean(),
      UserImplementationStrategyProgress.findOne({ userId }).lean(),
      UserSecurityCompletion.findOne({ userId }).lean()
    ]);
    
    // Combine all data with timestamps into activities
    const allActivities = [
      { module: 'mobile', data: mobileSecurityData },
      { module: 'wifi', data: wifiSecurityData },
      { module: 'email', data: emailSecurityData },
      { module: 'social-media', data: socialMediaSecurityData },
      { module: 'identity', data: identityProtectionData },
      { module: 'communication', data: communicationSecurityData },
      { module: 'recommended', data: recommendedSecurityData },
      { module: 'implementation', data: implementationStrategyData },
      { module: 'user', data: userSecurityData }
    ]
    .filter((item): item is { module: string, data: { lastUpdated: string, _id: string, __v: number } } => 
      item && item.data !== null && item.data !== undefined && 'lastUpdated' in item.data && '__v' in item.data
    )
    .map(item => {
      const moduleInfo = securityModuleMap[item.module];
      return {
        id: item.data._id.toString(),
        icon: moduleInfo.icon,
        iconColor: moduleInfo.iconColor,
        iconBgColor: moduleInfo.iconBgColor,
        title: `Updated ${moduleInfo.title} Settings`,
        timestamp: getRelativeTimeString(new Date(item.data.lastUpdated))
      };
    })
    .sort((a, b) => {
      // Sort by timestamp (most recent first)
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeB - timeA;
    })
    .slice(0, 5); // Limit to 5 most recent activities
    
    return NextResponse.json({ activities: allActivities });
  } catch (error) {    console.error('Error fetching user activities:', error);
    return NextResponse.json({ error: 'Failed to fetch user activities' }, { status: 500 });
  }
}
