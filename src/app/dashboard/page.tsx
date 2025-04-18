// app/page.js
'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import TopBar from '@/components/topbar';
import MobileMenu from '@/components/mobilemenu';
import DashboardHome from '@/components/dashboardhome';
import MobileDeviceSecurity from '@/components/sections/mobiledevicesecurity';
import  { WiFiSecurity } from '@/components/sections/wifisecurity';
import HomeNetworkSecurity from '@/components/sections/homesecurity';
import CommunicationSecurity from '@/components/sections/communicationsecurity';
import SocialMediaSecurity from '@/components/sections/socialmediasecurity';
import EmailSecurity from '@/components/sections/emailsecurity';
import IdentityProtection from '@/components/sections/identityprotection';
import RecommendedSolutions from '@/components/sections/recommendedsolutions';
import ImplementationStrategy from '@/components/sections/implementationstrategy';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  
  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const isSmaller = window.innerWidth < 1024;
      setIsTabletOrMobile(isSmaller);
      
      // Set sidebar open by default on desktop (large screens)
      // Keep it closed by default on tablet and mobile
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isTabletOrMobile={isTabletOrMobile}
        toggleSidebar={toggleSidebar}
      />
      
      {/* Overlay for tablet/mobile when sidebar is open */}
      {isTabletOrMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 opacity-60  z-20 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Mobile menu overlay */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={toggleMobileMenu}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      {/* Main content area */}
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${!isTabletOrMobile && isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        <TopBar 
          toggleSidebar={toggleSidebar} 
          toggleMobileMenu={toggleMobileMenu}
          isSidebarOpen={isSidebarOpen}
          setActiveSection={setActiveSection}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
