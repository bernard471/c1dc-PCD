'use client';

import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { UserCheck, Shield, Lock, LogOut } from 'lucide-react';
import { BubbleLoader } from '@/components/ui/loaders';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Link from 'next/link';
import { RecentActivities } from '@/components/profile/RecentActivities';
import { PasswordChangeModal } from '@/components/profile/PasswordChangeModal';


export default function UserProfilePage() {
  const { data: session, status } = useSession();
  const [securityScores, setSecurityScores] = useState({
    mobile: 0,
    wifi: 0,
    network: 0,
    communication: 0,
    socialMedia: 0,
    email: 0,
    identity: 0,
    overall: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userProvider, setUserProvider] = useState<string | null>(null);
  const [lastPasswordChange] = useState<string>('30 days ago');

  // Fetch security scores
  useEffect(() => {
    const fetchData = async () => {
      if (status !== 'authenticated') {
        setIsLoading(false);
        return;
      }

            try {
        // Fetch user provider info
        const userResponse = await fetch('/api/user/provider');
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserProvider(userData.provider);
        }
      } catch (error) {
        console.error('Error fetching user provider info:', error);
        toast.error('Failed to load user provider info');
      }

      try {
        // Fetch security scores from various endpoints
        const [mobileResponse, wifiResponse, networkResponse, communicationResponse, 
               socialMediaResponse, emailResponse, identityResponse] = await Promise.all([
          fetch('/api/mobile-security'),
          fetch('/api/wifi-security'),
          fetch('/api/network-security'),
          fetch('/api/communication-security'),
          fetch('/api/social-media-security'),
          fetch('/api/email-security'),
          fetch('/api/identity-protection')
        ]);

        // Process responses
        const mobileData = mobileResponse.ok ? await mobileResponse.json() : { score: 0 };
        const wifiData = wifiResponse.ok ? await wifiResponse.json() : { score: 0 };
        const networkData = networkResponse.ok ? await networkResponse.json() : { score: 0 };
        const communicationData = communicationResponse.ok ? await communicationResponse.json() : { score: 0 };
        const socialMediaData = socialMediaResponse.ok ? await socialMediaResponse.json() : { score: 0 };
        const emailData = emailResponse.ok ? await emailResponse.json() : { score: 0 };
        const identityData = identityResponse.ok ? await identityResponse.json() : { score: 0 };

        // Calculate overall score
        const scores = {
          mobile: mobileData.score || 0,
          wifi: wifiData.score || 0,
          network: networkData.score || 0,
          communication: communicationData.score || 0,
          socialMedia: socialMediaData.score || 0,
          email: emailData.score || 0,
          identity: identityData.score || 0
        };
        
        const overallScore = Math.round(
          (scores.mobile + scores.wifi + scores.network + scores.communication + 
           scores.socialMedia + scores.email + scores.identity) / 7
        );

        setSecurityScores({
          ...scores,
          overall: overallScore
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [status]);

  if (status === 'loading' || isLoading) {
    return <BubbleLoader message="Loading profile data..." size="medium" />;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto p-6 text-center">
        <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
        <p className="text-gray-600 mb-6">Please sign in to access your user profile.</p>
        <Link 
          href="/api/auth/signin"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

    const handleSignOut = async () => {
      await signOut({ callbackUrl: '/auth/login' });
    };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <Toaster />

      {/* Password Change Modal */}
      {session?.user?.email && (
        <PasswordChangeModal 
          isOpen={isPasswordModalOpen} 
          onClose={() => setIsPasswordModalOpen(false)}
          email={session.user.email}
        />
      )}
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{session?.user?.name || 'User Profile'}</h1>
              <p className="text-gray-600">{session?.user?.email || 'No email available'}</p>
            </div>
          </div>
          
          <div className="hidden  md:flex flex-col items-center">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-1">Overall Security Score</div>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">{securityScores.overall}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'security'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Security Settings
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Security Overview</h2>
              
            
              {/* Recent Activity */}
              <RecentActivities />
            </div>
          )}
          
          {activeTab === 'security' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h2>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="md:flex items-center justify-between">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-800">Password</h3>
                        <p className="text-sm text-gray-500">Last changed {lastPasswordChange}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if (userProvider === 'google') {
                          toast.info(
                            "Password change unavailable", 
                            { description: "You signed in with Google. Password management is handled by Google." }
                          );
                        } else {
                          setIsPasswordModalOpen(true);
                        }
                      }}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="md:flex items-center justify-between">
                    <div className="flex items-center">
                      <LogOut className="h-5 w-5 text-red-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-800">Sign Out From This Device</h3>
                        <p className="text-sm text-gray-500">Log out from this session</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleSignOut}
                      className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}