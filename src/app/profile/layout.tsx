'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import TopBar from '../../components/topbar';
import Sidebar from '../../components/sidebar';
import MobileMenu from '../../components/mobilemenu';
import DashboardHome from '../../components/dashboardhome';
import MobileDeviceSecurity from '../../components/sections/mobiledevicesecurity';
import { WiFiSecurity } from '../../components/sections/wifisecurity';
import HomeNetworkSecurity from '../../components/sections/homesecurity';
import CommunicationSecurity from '../../components/sections/communicationsecurity';
import SocialMediaSecurity from '../../components/sections/socialmediasecurity';
import EmailSecurity from '../../components/sections/emailsecurity';
import IdentityProtection from '../../components/sections/identityprotection';
import RecommendedSolutions from '../../components/sections/recommendedsolutions';
import ImplementationStrategy from '../../components/sections/implementationstrategy';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  
  // Determine if we're on a profile page
  const isProfilePage = pathname === '/profile' || pathname.startsWith('/profile/');
  
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
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    // If we're on a profile page, navigate away from profile to the dashboard area
    if (isProfilePage) {
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
      
      {/* Sidebar for larger screens */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        isTabletOrMobile={isTabletOrMobile}
        toggleSidebar={toggleSidebar}
      />
      
      {/* Overlay for tablet/mobile when sidebar is open */}
      {isTabletOrMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 opacity-60 z-20 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Mobile menu overlay */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={toggleMobileMenu}
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
      />
      
      <div className={`flex transition-all duration-300`}>
      <main className={`flex-1 transition-all duration-300 ${!isTabletOrMobile && isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        {/* Render the profile content or the section content based on the URL and activeSection */}
        {pathname === '/profile' ? (
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
