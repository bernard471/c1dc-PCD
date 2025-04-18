import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/dbConfig/mongodb';
import SecurityScore from '@/models/SecurityScore';
import UserMobileSecurityProgress from '@/models/MobileSecurity';
import UserCommunicationSecurityProgress from '@/models/CommunicationSecurity';
import UserEmailSecurityProgress from '@/models/EmailSecurity';
import UserSocialMediaSecurityProgress from '@/models/SocialMediaSecurity';
import UserIdentitySecurityProgress from '@/models/IdentityProtection';
import UserWiFiSecurityProgress from '@/models/WifiSecurity';
import UserSecurityCompletion from '@/models/UserSecurityCompletion';


// Import other security progress models as needed

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    await connectDB();
    const userId = session.user.id;
    
    // Fetch existing security score or create default
    let securityScore = await SecurityScore.findOne({ userId });
    
    // If no score exists yet, create a default one
    if (!securityScore) {
      securityScore = {
        userId,
        overallScore: 0,
        securityDomains: [
          { id: 'mobile', name: 'Mobile Security', score: 0, status: 'danger' },
          { id: 'wifi', name: 'Wi-Fi Security', score: 0, status: 'danger' },
          { id: 'network', name: 'Network & IoT', score: 0, status: 'danger' },
          { id: 'communication', name: 'Communication', score: 0, status: 'danger' },
          { id: 'social', name: 'Social Media', score: 0, status: 'danger' },
          { id: 'email', name: 'Email Security', score: 0, status: 'danger' },
          { id: 'identity', name: 'Identity Protection', score: 0, status: 'danger' }
        ],
        lastUpdated: new Date()
      };
    }
    
    // Calculate mobile security score
    const mobileSecurityData = await UserMobileSecurityProgress.findOne({ userId });
    if (mobileSecurityData) {
      const androidCategories = mobileSecurityData.completedCategories?.android || [];
      const iosCategories = mobileSecurityData.completedCategories?.ios || [];
      
      // Calculate mobile score based on completed categories
      // This is a simplified calculation - you might want to weight categories differently
      const totalMobileCategories = 10; // Adjust based on your actual total categories
      const completedMobileCategories = androidCategories.length + iosCategories.length;
      const mobileScore = Math.round((completedMobileCategories / totalMobileCategories) * 100);
      
      // Update mobile security domain
      const mobileDomainIndex = securityScore.securityDomains.findIndex((domain: { id: string; }) => domain.id === 'mobile');
      if (mobileDomainIndex !== -1) {
        securityScore.securityDomains[mobileDomainIndex].score = mobileScore;
        securityScore.securityDomains[mobileDomainIndex].status = 
          mobileScore >= 80 ? 'good' : 
          mobileScore >= 60 ? 'warning' : 'danger';
      }
    }
    
    // Calculate communication security score
    const communicationSecurityData = await UserCommunicationSecurityProgress.findOne({ userId });
    if (communicationSecurityData) {
      const completedCommCategories = communicationSecurityData.completedCategories || [];
      
      // Calculate communication score
      const totalCommCategories = 5; // Adjust based on your actual total categories
      const commScore = Math.round((completedCommCategories.length / totalCommCategories) * 100);
      
      // Update communication security domain
      const commDomainIndex = securityScore.securityDomains.findIndex((domain: { id: string; }) => domain.id === 'communication');
      if (commDomainIndex !== -1) {
        securityScore.securityDomains[commDomainIndex].score = commScore;
        securityScore.securityDomains[commDomainIndex].status = 
          commScore >= 80 ? 'good' : 
          commScore >= 60 ? 'warning' : 'danger';
      }
    }

    // Calculate email security score
    const emailSecurityData = await UserEmailSecurityProgress.findOne({ userId });
    if (emailSecurityData) {
      const completedEmailCategories = emailSecurityData.completedCategories || [];
      
      // Calculate email score
      const totalEmailCategories = 5; // Adjust based on your actual total categories
      const emailScore = Math.round((completedEmailCategories.length / totalEmailCategories) * 100);
      
      // Update email security domain
      const emailDomainIndex = securityScore.securityDomains.findIndex((domain: { id: string; }) => domain.id === 'email');
      if (emailDomainIndex !== -1) {
        securityScore.securityDomains[emailDomainIndex].score = emailScore;
        securityScore.securityDomains[emailDomainIndex].status = 
          emailScore >= 80 ? 'good' : 
          emailScore >= 60 ? 'warning' : 'danger';
      }
    }

    // Calculate social media security score
    const socialMediaSecurityData = await UserSocialMediaSecurityProgress.findOne({ userId });
    if (socialMediaSecurityData) {
      const completedSocialMediaCategories = socialMediaSecurityData.completedCategories || [];
      
      // Calculate social media score
      const totalSocialMediaCategories = 5; // Adjust based on your actual total categories
      const socialMediaScore = Math.round((completedSocialMediaCategories.length / totalSocialMediaCategories) * 100);
      
      // Update social media security domain
      const socialMediaDomainIndex = securityScore.securityDomains.findIndex((domain: { id: string; }) => domain.id === 'social');
      if (socialMediaDomainIndex !== -1) {
        securityScore.securityDomains[socialMediaDomainIndex].score = socialMediaScore;
        securityScore.securityDomains[socialMediaDomainIndex].status = 
          socialMediaScore >= 80 ? 'good' : 
          socialMediaScore >= 60 ? 'warning' : 'danger';
      }
    }


    // Calculate identity protection score
    const identitySecurityData = await UserIdentitySecurityProgress.findOne({ userId });
    if (identitySecurityData) {
      const completedIdentityCategories = identitySecurityData.completedCategories || [];
      
      // Calculate identity protection score
      const totalIdentityCategories = 5; // Adjust based on your actual total categories
      const identityScore = Math.round((completedIdentityCategories.length / totalIdentityCategories) * 100);
      
      // Update identity protection domain
      const identityDomainIndex = securityScore.securityDomains.findIndex((domain: { id: string; }) => domain.id === 'identity');
      if (identityDomainIndex !== -1) {
        securityScore.securityDomains[identityDomainIndex].score = identityScore;
        securityScore.securityDomains[identityDomainIndex].status = 
          identityScore >= 80 ? 'good' : 
          identityScore >= 60 ? 'warning' : 'danger';
      }
    }

    // Calculate Wi-Fi security score
    const wifiSecurityData = await UserWiFiSecurityProgress.findOne({ userId });
    if (wifiSecurityData) {
      const completedWiFiCategories = wifiSecurityData.completedCategories || [];
      
      // Calculate Wi-Fi score
      const totalWiFiCategories = 5; // Adjust based on your actual total categories
      const wifiScore = Math.round((completedWiFiCategories.length / totalWiFiCategories) * 100);
      
      // Update Wi-Fi security domain
      const wifiDomainIndex = securityScore.securityDomains.findIndex((domain: { id: string; }) => domain.id === 'wifi');
      if (wifiDomainIndex !== -1) {
        securityScore.securityDomains[wifiDomainIndex].score = wifiScore;
        securityScore.securityDomains[wifiDomainIndex].status = 
          wifiScore >= 80 ? 'good' : 
          wifiScore >= 60 ? 'warning' : 'danger';
      }
    }

    // Calculate network security score (if applicable)
    const networkSecurityData = await UserSecurityCompletion.findOne({ userId });
    if (networkSecurityData) {
      const completedNetworkCategories = networkSecurityData.completedCategories || [];
    
      const totalNetworkCategories = 5; // Adjust based on your actual total categories  
      const networkScore = Math.round((completedNetworkCategories.length / totalNetworkCategories) * 100);
    
      const networkDomainIndex = securityScore.securityDomains.findIndex((domain: { id: string; }) => domain.id === 'network');
      if (networkDomainIndex !== -1) {
        securityScore.securityDomains[networkDomainIndex].score = networkScore;
        securityScore.securityDomains[networkDomainIndex].status =
          networkScore >= 80 ? 'good' : 
          networkScore >= 60 ? 'warning' : 'danger';
      }
    }


    // Add similar calculations for other security domains
    // ...
    
    // Calculate overall score (average of all domain scores)
    const totalScore = securityScore.securityDomains.reduce((sum: number, domain: { score: number; }) => sum + domain.score, 0);    securityScore.overallScore = Math.round(totalScore / securityScore.securityDomains.length);
    
    // Update the lastUpdated timestamp
    securityScore.lastUpdated = new Date();
    
    // Save the updated security score
    await SecurityScore.findOneAndUpdate(
      { userId },
      securityScore,
      { new: true, upsert: true }
    );
    
    return NextResponse.json(securityScore);
  } catch (error) {
    console.error('Error fetching security scores:', error);
    return NextResponse.json({ error: 'Failed to fetch security scores' }, { status: 500 });
  }
}
