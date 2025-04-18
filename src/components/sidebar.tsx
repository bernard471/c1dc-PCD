// components/Sidebar.js
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShieldCheck, Smartphone, Wifi, Home, MessageCircle, Users, Mail, UserCheck, Package, ChevronRight, ChevronDown, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isTabletOrMobile?: boolean;
  toggleSidebar?: () => void;
}


export default function Sidebar({ isOpen, activeSection, setActiveSection, isTabletOrMobile = false, toggleSidebar }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState({
    'mobile-security': false,
    'wifi-security': false,
    'network-security': false,
    'communication-security': false,
    'social-media-security': false,
    'email-security': false,
    'identity-protection': false,
    'recommended-solutions': false
  });

  const toggleSubMenu = (section: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [section as keyof typeof expandedMenus]: !prev[section as keyof typeof expandedMenus]
    }));
  };

  const navItems = [
    { 
      id: 'dashboard', 
      title: 'Dashboard', 
      icon: <ShieldCheck className="w-5 h-5" />,
      hasSubmenu: false 
    },
    { 
      id: 'mobile-security', 
      title: 'Mobile Device Security', 
      icon: <Smartphone className="w-5 h-5" />,
      hasSubmenu: true,
      subItems: [
        { id: 'android-security', title: 'Android Security' },
        { id: 'ios-security', title: 'iOS Security' }
      ]
    },
    { 
      id: 'wifi-security', 
      title: 'Wi-Fi Security', 
      icon: <Wifi className="w-5 h-5" />,
      hasSubmenu: true,
      subItems: [
        { id: 'router-config', title: 'Router Configuration' },
        { id: 'access-control', title: 'Access Control' },
        { id: 'network-monitoring', title: 'Network Monitoring' },
        { id: 'physical-security', title: 'Physical Security' },
        { id: 'wifi-best-practices', title: 'Wifi Best Practices' }
      ]
    },
    { 
      id: 'network-security', 
      title: 'Home Network & IoT', 
      icon: <Home className="w-5 h-5" />,
      hasSubmenu: true,
      subItems: [
        { id: 'network-assessment', title: 'Network Assessment' },
        { id: 'iot-security', title: 'IoT Device Security' },
        { id: 'home-defense', title: 'Home Network Defense' },
        { id: 'physical-integration', title: 'Physical Security Integration' },
        { id: 'platform-security', title: 'Smart Home Platform Security' }
      ]
    },
    { 
      id: 'communication-security', 
      title: 'Communication Security', 
      icon: <MessageCircle className="w-5 h-5" />,
      hasSubmenu: true,
      subItems: [
        { id: 'meeting-security', title: 'Meeting Security' },
        { id: 'mobile-comm', title: 'Mobile Communication' },
        { id: 'vehicle-comm', title: 'Vehicle Communication' },
        { id: 'video-conf', title: 'Video Conference' },
        { id: 'email-security', title: 'Email Security' }
      ]
    },
    { 
      id: 'social-media-security', 
      title: 'Social Media Security', 
      icon: <Users className="w-5 h-5" />,
      hasSubmenu: true,
      subItems: [
        { id: 'account-protection', title: 'Account Protection' },
        { id: 'privacy-settings', title: 'Privacy Settings' },
        { id: 'content-security', title: 'Content Security' },
        { id: 'compromise-detection', title: 'Compromise Detection' }
      ]
    },
    { 
      id: 'email-security', 
      title: 'Email Security', 
      icon: <Mail className="w-5 h-5" />,
      hasSubmenu: true, 
      subItems: [
        { id: 'account-protection-email', title: 'Account Protection' },
        { id: 'content-security-email', title: 'Content Security' },
        { id: 'structural-email-security', title: 'Structural Email Security' },
        { id: 'multi-account', title: 'Multi-Account Security' },
        { id: 'compromise-recovery', title: 'Compromise Recovery'  }
      ]
    },
    { 
      id: 'identity-protection', 
      title: 'Identity Protection', 
      icon: <UserCheck className="w-5 h-5" />,
      hasSubmenu: true,
      subItems: [
        { id: 'personal-info', title: 'Personal Information' },
        { id: 'financial-identity', title: 'Financial Identity' },
        { id: 'digital-identity', title: 'Digital Identity' },
        { id: 'identity-theft-prevention', title: 'Identity Theft Prevention' },
        { id: 'identity-theft-response', title: 'Identity Theft Response' }
      ] 
    },
    { 
      id: 'recommended-solutions', 
      title: 'Recommended Solutions', 
      icon: <Package className="w-5 h-5" />,
      hasSubmenu: true,
      subItems: [
        { id: 'antivirus', title: 'Antivirus' },
        { id: 'vpn', title: 'VPN Services' },
        { id: 'password-managers', title: 'Password Managers' },
        { id: 'communication-tools', title: 'Communication Tools' },
        { id: 'network-tools', title: 'Network Tools' },
        { id: 'privacy-enhancement-tools', title: 'Privacy Enhacement Tools' },
        { id: 'data-protection-tools', title: 'Data Protection Tools' }
      ]
    },
    { 
      id: 'implementation-strategy', 
      title: 'Implementation Strategy', 
      icon: <ShieldCheck className="w-5 h-5" />,
      hasSubmenu: true,
      subItems: [
        { id: 'setup-assessment', title: 'Initial Setup and Assessment' },
        { id: 'maintenance', title: 'Maintenance Improvement' },
        { id: 'special-considerations', title: 'Special Considerations' }
      ] 
    },

  ];

 // Determine sidebar positioning and styling based on device type
 const sidebarClasses = isTabletOrMobile
 ? `fixed inset-y-0 left-0 bg-white shadow-lg z-30 transition-all duration-300 ease-in-out 
    ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'} overflow-hidden`
 : `fixed inset-y-0 left-0 bg-white shadow-lg z-30 transition-all duration-300 ease-in-out 
    ${isOpen ? 'w-64' : 'w-20'} transform translate-x-0 hidden md:block`;

return (
 <aside className={sidebarClasses}>
   <div className="flex flex-col h-full">
     {/* Logo and close button for tablet/mobile */}
     <div className="flex items-center justify-between h-16 px-4">
       <div className="flex items-center">
         <div className="flex-shrink-0">
           <ShieldCheck className="h-8 w-8 text-blue-600" />
         </div>
         {(isOpen || isTabletOrMobile) && (
           <div className="ml-2 text-xl font-bold text-gray-900">
            <Link href="/">
            PCD System
            </Link>
            </div>
         )}
       </div>
       
       {/* Close button for tablet/mobile */}
       {isTabletOrMobile && isOpen && toggleSidebar && (
         <button 
           onClick={toggleSidebar}
           className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
         >
           <X className="h-6 w-6" />
         </button>
       )}
     </div>


        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <div className="w-full">
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      if (item.hasSubmenu) {
                        toggleSubMenu(item.id as keyof typeof expandedMenus);
                      }
                      // Close sidebar on item click in tablet/mobile
                      if (isTabletOrMobile && toggleSidebar) {
                        toggleSidebar();
                      }
                    }}
                    className={`flex items-center w-full p-2 rounded-md group transition-colors
                      ${activeSection === item.id ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}
                      ${(isOpen || isTabletOrMobile) ? 'justify-between' : 'justify-center'}`}
                  >
                    <div className="flex items-center">
                      <span className={`${(isOpen || isTabletOrMobile) ? 'mr-3' : 'mr-0'}`}>
                        {item.icon}
                      </span>
                      {(isOpen || isTabletOrMobile) && <span className="text-sm font-medium">{item.title}</span>}
                    </div>
                    {(isOpen || isTabletOrMobile) && item.hasSubmenu && (
                      expandedMenus[item.id as keyof typeof expandedMenus] ? 
                        <ChevronDown className="w-4 h-4" /> : 
                        <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {/* Submenu */}
                  {(isOpen || isTabletOrMobile) && item.hasSubmenu && expandedMenus[item.id as keyof typeof expandedMenus] && item.subItems && (
                    <ul className="pl-10 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <a
                            href={`#${subItem.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveSection(item.id);
                              
                              // Handle specific tab switching based on submenu item
                              if (item.id === 'mobile-security') {
                                // Extract the platform from the subItem.id (android-security or ios-security)
                                const platform = subItem.id.split('-')[0]; // Will give 'android' or 'ios'
                                
                                // Use a custom event to communicate with the MobileDeviceSecurity component
                                const event = new CustomEvent('switchMobileSecurityTab', {
                                  detail: { tab: platform }
                                });
                                window.dispatchEvent(event);
                              }
                              
                              // Handle WiFi security section navigation
                              if (item.id === 'wifi-security') {
                                // Map the sidebar subItem.id to the corresponding section in WiFiSecurity component
                                const categoryMap: Record<string, number> = {
                                  'router-config': 0,
                                  'access-control': 1,
                                  'network-monitoring': 2,
                                  'physical-security': 3,
                                  'wifi-best-practices': 4
                                };
                                
                                // Dispatch a custom event to expand the corresponding section
                                const event = new CustomEvent('expandWiFiSecurityCategory', {
                                  detail: { categoryIndex: categoryMap[subItem.id] }
                                });
                                window.dispatchEvent(event);
                              }
                              
                              // Handle Home Network & IoT security section navigation
                              if (item.id === 'network-security') {
                                // Map the sidebar subItem.id to the corresponding category index in HomeNetworkSecurity component
                                const categoryMap: Record<string, number> = {
                                  'network-assessment': 0,
                                  'iot-security': 1,
                                  'home-defense': 2,
                                  'physical-integration': 3,
                                  'platform-security': 4
                                };
                                
                                // Dispatch a custom event to expand the corresponding category
                                const event = new CustomEvent('expandHomeNetworkCategory', {
                                  detail: { categoryIndex: categoryMap[subItem.id] }
                                });
                                window.dispatchEvent(event);
                              }

                              // Handle Communication Security section navigation
                              if (item.id === 'communication-security') {
                                // Map the sidebar subItem.id to the corresponding section in CommunicationSecurity component
                                const sectionMap: Record<string, number> = {
                                  'meeting-security': 0,
                                  'mobile-comm': 1,
                                  'vehicle-comm': 2,
                                  'video-conf': 3,
                                  'email-security': 4
                                };
                                
                                // Dispatch a custom event to expand the corresponding section
                                const event = new CustomEvent('expandCommunicationSecurityCategory', {
                                  detail: { categoryIndex: sectionMap[subItem.id] }  // Change 'section' to 'categoryIndex'
                                });
                                window.dispatchEvent(event);
                              }

                              // Handle Social Media Security section navigation
                              if (item.id === 'social-media-security') {
                                // Map the sidebar subItem.id to the corresponding section in SocialMediaSecurity component
                                const sectionMap: Record<string, number> = {
                                  'account-protection': 0,
                                  'privacy-settings': 1,
                                  'content-security': 2,
                                  'compromise-detection': 3
                                };
                                
                                // Dispatch a custom event to expand the corresponding section
                                const event = new CustomEvent('expandSocialMediaSecurityCategory', {
                                  detail: { categoryIndex: sectionMap[subItem.id] }  // Change 'section' to 'categoryIndex'
                                });
                                window.dispatchEvent(event);
                              }
                              

                              // Handle Email Security section navigation
                              if (item.id === 'email-security') {
                                // Map the sidebar subItem.id to the corresponding section in EmailSecurity component
                                const sectionMap: Record<string, number> = {
                                  'account-protection-email': 0,
                                  'content-security-email': 1,
                                  'structural-email-security': 2,
                                  'multi-account': 3,
                                  'compromise-recovery': 4
                                };
                                
                                // Dispatch a custom event to expand the corresponding section
                                const event = new CustomEvent('expandEmailSecurityCategory', {
                                  detail: { categoryIndex: sectionMap[subItem.id] }  // Change 'section' to 'categoryIndex'
                                });
                                window.dispatchEvent(event);
                              }

                              // Handle Identity Protection section navigation
                              if (item.id === 'identity-protection') {
                                // Map the sidebar subItem.id to the corresponding section in IdentityProtection component
                                const sectionMap: Record<string, number> = {
                                  'personal-info': 0,
                                  'financial-identity': 1,
                                  'digital-identity': 2,
                                  'identity-theft-prevention': 3,
                                  'identity-theft-response': 4
                                };
                                
                                // Dispatch a custom event to expand the corresponding section
                                const event = new CustomEvent('expandIdentityProtectionCategory', {
                                  detail: { categoryIndex: sectionMap[subItem.id] }  // Change 'section' to 'categoryIndex'
                                });
                                window.dispatchEvent(event);
                              }

                              // Handle Recommended Solutions section navigation
                              if (item.id === 'recommended-solutions') {
                                // Map the sidebar subItem.id to the corresponding section in RecommendedSolutions component
                                const sectionMap: Record<string, number> = {
                                  'antivirus': 0,
                                  'vpn': 1,
                                  'password-managers': 2,
                                  'communication-tools': 3,
                                  'network-tools': 4,
                                  'privacy-enhancement-tools': 5,
                                  'data-protection-tools': 6
                                };
                                
                                // Dispatch a custom event to expand the corresponding section
                                const event = new CustomEvent('expandRecommendedSolutionsCategory', {
                                  detail: { categoryIndex: sectionMap[subItem.id] }  // Change 'section' to 'categoryIndex'
                                });
                                window.dispatchEvent(event);
                              }

                              // Handle Implementation Strategy section navigation
                              if (item.id === 'implementation-strategy') {
                                // Map the sidebar subItem.id to the corresponding section in ImplementationStrategy component
                                const sectionMap: Record<string, number> = {
                                  'setup-assessment': 0,
                                  'maintenance': 1,
                                  'special-considerations': 2
                                };
                                
                                // Dispatch a custom event to expand the corresponding section
                                const event = new CustomEvent('expandImplementationStrategyCategory', {
                                  detail: { categoryIndex: sectionMap[subItem.id] }  // Change 'section' to 'categoryIndex'
                                });
                                window.dispatchEvent(event);
                              }

                              // Close sidebar on item click in tablet/mobile
                              if (isTabletOrMobile && toggleSidebar) {
                                toggleSidebar();
                              }
                            }}
                            className={`text-sm ${
                              activeSection === subItem.id 
                              ? 'text-blue-600 font-medium' 
                              : 'text-gray-600 hover:text-blue-600'
                            } block py-1`}
                          >
                            {subItem.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}          
          </ul>
        </nav>
        
        {/* User profile at bottom (optional) */}
        {(isOpen || isTabletOrMobile) && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">User Profile</p>
                <p className="text-xs font-medium text-gray-500">Security Settings</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}