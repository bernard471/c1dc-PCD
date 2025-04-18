'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

// Define types for search results and props
export interface SearchResult {
  id: string;
  title: string;
  parentId?: string;
  parentTitle?: string;
  isSubItem: boolean;
}

interface SearchBarProps {
  setActiveSection: (section: string) => void;
}

export default function SearchBar({ setActiveSection }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Get all navigation items from sidebar
  const getNavigationItems = () => {
    const navItems = [
      { 
        id: 'dashboard', 
        title: 'Dashboard',
        hasSubmenu: false 
      },
      { 
        id: 'mobile-security', 
        title: 'Mobile Device Security',
        hasSubmenu: true,
        subItems: [
          { id: 'android-security', title: 'Android Security' },
          { id: 'ios-security', title: 'iOS Security' }
        ]
      },
      { 
        id: 'wifi-security', 
        title: 'Wi-Fi Security',
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
        hasSubmenu: true,
        subItems: [
          { id: 'setup-assessment', title: 'Initial Setup and Assessment' },
          { id: 'maintenance', title: 'Maintenance Improvement' },
          { id: 'special-considerations', title: 'Special Considerations' }
        ] 
      },
    ];
    
    return navItems;
  };

  // Search function
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const navItems = getNavigationItems();
    const results: SearchResult[] = [];
    
    // Search in main items
    navItems.forEach(item => {
      if (item.title.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          id: item.id,
          title: item.title,
          isSubItem: false
        });
      }
      
      // Search in subitems
      if (item.hasSubmenu && item.subItems) {
        item.subItems.forEach(subItem => {
          if (subItem.title.toLowerCase().includes(query.toLowerCase())) {
            results.push({
              id: subItem.id,
              title: subItem.title,
              parentId: item.id,
              parentTitle: item.title,
              isSubItem: true
            });
          }
        });
      }
    });
    
    setSearchResults(results);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    performSearch(value);
    setShowResults(value.trim() !== '');
  };

  // Handle clicking on a search result
  const handleResultClick = (result: SearchResult) => {
    setSearchValue('');
    setShowResults(false);
    
    // Navigate to the section
    if (result.isSubItem && result.parentId) {
      setActiveSection(result.parentId);
      
      // Dispatch the appropriate event based on the parent section
      setTimeout(() => {
        handleSubItemNavigation(result.parentId as string, result.id);
      }, 100);
    } else {
      setActiveSection(result.id);
    }
  };

  // Handle navigation to specific sub-items
  const handleSubItemNavigation = (parentId: string, subItemId: string) => {
    // Mobile Security
    if (parentId === 'mobile-security') {
      const platform = subItemId.split('-')[0]; // Will give 'android' or 'ios'
      const event = new CustomEvent('switchMobileSecurityTab', {
        detail: { tab: platform }
      });
      window.dispatchEvent(event);
    }
    
    // WiFi Security
    else if (parentId === 'wifi-security') {
      const sectionMap: Record<string, string> = {
        'router-config': 'router-config',
        'access-control': 'access-control',
        'network-monitoring': 'network-monitoring',
        'physical-security': 'physical-security',
        'wifi-best-practices': 'best-practices'
      };
      
      const event = new CustomEvent('expandWiFiSecuritySection', {
        detail: { section: sectionMap[subItemId] }
      });
      window.dispatchEvent(event);
    }
    
    // Home Network & IoT
    else if (parentId === 'network-security') {
      const categoryMap: Record<string, number> = {
        'network-assessment': 0,
        'iot-security': 1,
        'home-defense': 2,
        'physical-integration': 3,
        'platform-security': 4
      };
      
      const event = new CustomEvent('expandHomeNetworkCategory', {
        detail: { categoryIndex: categoryMap[subItemId] }
      });
      window.dispatchEvent(event);
    }
    
    // Communication Security
    else if (parentId === 'communication-security') {
      const sectionMap: Record<string, number> = {
        'meeting-security': 0,
        'mobile-comm': 1,
        'vehicle-comm': 2,
        'video-conf': 3,
        'email-security': 4
      };
      
      const event = new CustomEvent('expandCommunicationSecurityCategory', {
        detail: { categoryIndex: sectionMap[subItemId] }
      });
      window.dispatchEvent(event);
    }
    
    // Social Media Security
    else if (parentId === 'social-media-security') {
      const sectionMap: Record<string, number> = {
        'account-protection': 0,
        'privacy-settings': 1,
        'content-security': 2,
        'compromise-detection': 3
      };
      
      const event = new CustomEvent('expandSocialMediaSecurityCategory', {
        detail: { categoryIndex: sectionMap[subItemId] }
      });
      window.dispatchEvent(event);
    }
    
    // Email Security
    else if (parentId === 'email-security') {
      const sectionMap: Record<string, number> = {
        'account-protection-email': 0,
        'content-security-email': 1,
        'structural-email-security': 2,
        'multi-account': 3,
        'compromise-recovery': 4
      };
      
      const event = new CustomEvent('expandEmailSecurityCategory', {
        detail: { categoryIndex: sectionMap[subItemId] }
      });
      window.dispatchEvent(event);
    }
    
    // Identity Protection
    else if (parentId === 'identity-protection') {
      const sectionMap: Record<string, number> = {
        'personal-info': 0,
        'financial-identity': 1,
        'digital-identity': 2,
        'identity-theft-prevention': 3,
        'identity-theft-response': 4
      };
      
      const event = new CustomEvent('expandIdentityProtectionCategory', {
        detail: { categoryIndex: sectionMap[subItemId] }
      });
      window.dispatchEvent(event);
    }
    
    // Recommended Solutions
    else if (parentId === 'recommended-solutions') {
      const sectionMap: Record<string, number> = {
        'antivirus': 0,
        'vpn': 1,
        'password-managers': 2,
        'communication-tools': 3,
        'network-tools': 4,
        'privacy-enhancement-tools': 5,
        'data-protection-tools': 6
      };
      
      const event = new CustomEvent('expandRecommendedSolutionsCategory', {
        detail: { categoryIndex: sectionMap[subItemId] }
      });
      window.dispatchEvent(event);
    }
    
    // Implementation Strategy
    else if (parentId === 'implementation-strategy') {
      const sectionMap: Record<string, number> = {
        'setup-assessment': 0,
        'maintenance': 1,
        'special-considerations': 2
      };
      
      const event = new CustomEvent('expandImplementationStrategyCategory', {
        detail: { categoryIndex: sectionMap[subItemId] }
      });
      window.dispatchEvent(event);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-lg w-[400px]  md:w-[200px] lg:w-[400px] lg:max-w-xs relative" ref={searchRef}>
      <label htmlFor="search" className="sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search for security guides..."
          type="search"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md z-50 max-h-96 overflow-y-auto">
          <ul className="py-1">
            {searchResults.map((result, index) => (
              <li 
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <div className="text-sm font-medium text-gray-900">{result.title}</div>
                {result.isSubItem && result.parentTitle && (
                  <div className="text-xs text-gray-500">
                    in {result.parentTitle}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* No Results Message */}
      {showResults && searchValue.trim() !== '' && searchResults.length === 0 && (
        <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md z-50">
          <div className="px-4 py-3 text-sm text-gray-700">
            No results found for &quot;{searchValue}&quot;
          </div>
        </div>
      )}
    </div>
  );
}

