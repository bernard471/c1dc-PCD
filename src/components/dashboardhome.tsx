// components/DashboardHome.js
'use client';

import { useState, useEffect } from 'react';
import {
  Smartphone,
  Wifi,
  Home,
  MessageCircle,
  Users,
  Mail,
  UserCheck,
  Package,
  ShieldCheck} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { BubbleLoader } from '@/components/ui/loaders';
import RecentSecurityEvents from '@/components/dashboard/RecentSecurityEvents';
import RecommendedActions from '@/components/dashboard/RecommendedActions';

// Define types for security data
interface SecurityDomain {
  id: string;
  name: string;
  score: number;
  status: 'good' | 'warning' | 'danger';
}

interface SecurityStats {
  overallScore: number;
  securityDomains: SecurityDomain[];
  // No need for pendingActions anymore as it's handled in the RecommendedActions component
}

export default function DashboardHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<SecurityStats>({
    overallScore: 0,
    securityDomains: []
  });
  
  const { data: session } = useSession();
  
  // Fetch security scores from API
  useEffect(() => {
    const fetchSecurityScores = async () => {
      if (!session?.user) {
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch('/api/security-score');
        if (response.ok) {
          const data = await response.json();
          setStats(prevStats => ({
            ...prevStats,
            overallScore: data.overallScore,
            securityDomains: data.securityDomains
          }));
        } else {
          console.error('Failed to fetch security scores');
        }
      } catch (error) {
        console.error('Error fetching security scores:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSecurityScores();
  }, [session]);
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'danger': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  if (isLoading) {
    return <BubbleLoader message="Loading security data..." size="medium" />;
  }
  
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Your Personal Cyber Defense System</h1>
        <p className="mt-2 text-gray-600">Your comprehensive dashboard for monitoring and improving your digital security posture.</p>
      </div>
      
      {/* Overall security score */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Overall Security Score</h2>
          <span className={`text-2xl font-bold ${getScoreColor(stats.overallScore)}`}>{stats.overallScore}%</span>
        </div>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              stats.overallScore >= 80 ? 'bg-green-500' : 
              stats.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${stats.overallScore}%` }}
          ></div>
        </div>
        
        {/* Domain-specific scores */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.securityDomains.map((domain) => (
            <div key={domain.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {domain.id === 'mobile' && <Smartphone className="w-5 h-5 text-gray-500 mr-2" />}
                  {domain.id === 'wifi' && <Wifi className="w-5 h-5 text-gray-500 mr-2" />}
                  {domain.id === 'network' && <Home className="w-5 h-5 text-gray-500 mr-2" />}
                  {domain.id === 'communication' && <MessageCircle className="w-5 h-5 text-gray-500 mr-2" />}
                  {domain.id === 'social' && <Users className="w-5 h-5 text-gray-500 mr-2" />}
                  {domain.id === 'email' && <Mail className="w-5 h-5 text-gray-500 mr-2" />}
                  {domain.id === 'identity' && <UserCheck className="w-5 h-5 text-gray-500 mr-2" />}
                  {domain.id === 'recommended' && <Package className="w-5 h-5 text-gray-500 mr-2" />}
                  {domain.id === 'implementation' && <ShieldCheck className="w-5 h-5 text-gray-500 mr-2" />}
                  <span className="text-sm font-medium">{domain.name}</span>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm font-semibold ${getScoreColor(domain.score)}`}>{domain.score}%</span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusColor(domain.status)}`}>
                    {domain.status === 'good' ? 'Good' : domain.status === 'warning' ? 'Needs Work' : 'At Risk'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Security insights row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent threats - using the self-contained component */}
        <RecentSecurityEvents />
        
        {/* Recommended actions - using the new self-contained component */}
        <RecommendedActions />
      </div>
      
      {/* Domain security quick access */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Security Domains</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Smartphone className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Mobile Security</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Wifi className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Wi-Fi Security</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Home className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Network & IoT</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <MessageCircle className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Communication</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Social Media</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Mail className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Email Security</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <UserCheck className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Identity Protection</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Package className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Recommended Tools</span>
          </button>
        </div>
      </div>
    </div>
  );
}
