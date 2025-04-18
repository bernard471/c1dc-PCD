'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import TopBar from '../../components/topbar';
import Sidebar from '../../components/sidebar';
import DashboardHome from '@/components/dashboardhome';
import MobileDeviceSecurity from '@/components/sections/mobiledevicesecurity';
import { WiFiSecurity } from '@/components/sections/wifisecurity';
import HomeNetworkSecurity from '@/components/sections/homesecurity';
import CommunicationSecurity from '@/components/sections/communicationsecurity';
import SocialMediaSecurity from '@/components/sections/socialmediasecurity';
import EmailSecurity from '@/components/sections/emailsecurity';
import IdentityProtection from '@/components/sections/identityprotection';
import RecommendedSolutions from '@/components/sections/recommendedsolutions';
import ImplementationStrategy from '@/components/sections/implementationstrategy';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  
  // Determine if we're on a blog page
  const isBlogPage = pathname === '/blogs' || pathname.startsWith('/blogs/');
  
  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrMobile(window.innerWidth < 1024);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setIsSidebarOpen(true);
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    // If we're on a blog page, navigate away from blogs to the dashboard area
    if (isBlogPage) {
      router.push('/dashboard');
    }
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'mobile-security':
        return <MobileDeviceSecurity />;
      case 'wifi-security':
        return <WiFiSecurity />;
      case 'network-security':
        return <HomeNetworkSecurity />;
      case 'communication-security':
        return <CommunicationSecurity />;
      case 'social-media-security':
        return <SocialMediaSecurity />;
      case 'email-security':
        return <EmailSecurity />;
      case 'identity-protection':
        return <IdentityProtection />;
      case 'recommended-solutions':
        return <RecommendedSolutions />;
      case 'implementation-strategy':
        return <ImplementationStrategy />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        toggleSidebar={toggleSidebar} 
        toggleMobileMenu={toggleMobileMenu}
        isSidebarOpen={isSidebarOpen}
        setActiveSection={handleSectionChange}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen || isMobileMenuOpen} 
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
          isTabletOrMobile={isTabletOrMobile}
          toggleSidebar={toggleSidebar}
        />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          {/* If we're on a blog page, render the blog content, otherwise render the section content */}
          {isBlogPage ? (
            children
          ) : (
            <div className="p-6 bg-white rounded-lg shadow-md mt-4">
              {renderContent()}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
