// components/TopBar.js
'use client';

import { useState, useEffect } from 'react';
import { 
  Menu, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  Shield,
  LogOut
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './search/SearchBar';

interface TopBarProps {
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  isSidebarOpen: boolean;
  setActiveSection: (section: string) => void;
}

export default function TopBar({ toggleSidebar, toggleMobileMenu, isSidebarOpen, setActiveSection }: TopBarProps) {
  const { data: session, status } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  
  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrMobile(window.innerWidth < 1024);
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close the user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container') && isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (!session?.user?.name) return 'U';
    
    const nameParts = session.user.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
            {/* Sidebar toggle button - visible on all screen sizes now */}
            <button
              onClick={toggleSidebar}
              className=" lg:hidden md:inline-flex hidden items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="sr-only">Toggle sidebar</span>
              {isSidebarOpen ? 
                <ChevronLeft className="block h-6 w-6" aria-hidden="true" /> : 
                <ChevronRight className="block h-6 w-6" aria-hidden="true" />
              }
            </button>
            
            {/* Title - always visible when sidebar is closed or on tablet/mobile */}
            {(!isSidebarOpen || isTabletOrMobile) && (
              <div className="ml-2 flex items-center">
                <Shield className="h-6 w-6 text-blue-600" />
                <h1 className="ml-2 text-s font-semibold text-gray-900">PCD System</h1>
              </div>
            )}
          </div>
          
          {/* Center section - Search bar */}
          <div className="hidden md:block">
            <SearchBar setActiveSection={setActiveSection} />
          </div>
          
          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Security status indicator */}
            <div className="hidden md:flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              <Shield className="h-4 w-4 mr-1" />
              <span>Protected</span>
            </div>
            
            {/* Notification bell */}
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>
            
            
            {/* User profile */}
            <div className="ml-3 relative user-menu-container">
              <div>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Open user menu</span>
                  {status === 'loading' ? (
                    <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                  ) : session?.user?.image ? (
                    <Image
                      className="h-8 w-8 rounded-full object-cover"
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                      {getUserInitials()}
                    </div>
                  )}
                  
                  {/* Show user name on larger screens */}
                  <span className="hidden lg:flex ml-2 text-sm font-medium text-gray-700">
                    {session?.user?.name || 'User'}
                  </span>
                  <ChevronRight className={`ml-1 h-4 w-4 text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-90' : ''}`} />
                </button>
              </div>
              
              {/* User dropdown menu */}
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{session?.user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
                  </div>
                  
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  
                  <Link 
                    href="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}