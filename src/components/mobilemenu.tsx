// components/MobileMenu.js
'use client';

import { X } from 'lucide-react';
import { 
  ShieldCheck, 
  Smartphone, 
  Wifi, 
  Home, 
  MessageCircle, 
  Users, 
  Mail, 
  UserCheck, 
  Package
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function MobileMenu({ isOpen, onClose, activeSection, setActiveSection }: MobileMenuProps) {
  if (!isOpen) return null;
  
  const navItems = [
    { id: 'dashboard', title: 'Dashboard', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'mobile-security', title: 'Mobile Device Security', icon: <Smartphone className="w-5 h-5" /> },
    { id: 'wifi-security', title: 'Wi-Fi Security', icon: <Wifi className="w-5 h-5" /> },
    { id: 'network-security', title: 'Home Network & IoT', icon: <Home className="w-5 h-5" /> },
    { id: 'communication-security', title: 'Communication Security', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'social-media-security', title: 'Social Media Security', icon: <Users className="w-5 h-5" /> },
    { id: 'email-security', title: 'Email Security', icon: <Mail className="w-5 h-5" /> },
    { id: 'identity-protection', title: 'Identity Protection', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'recommended-solutions', title: 'Recommended Solutions', icon: <Package className="w-5 h-5" /> }
  ];

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Menu panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-full bg-white shadow-xl transition transform">
        <div className="flex justify-between items-center px-4 h-16 border-b border-gray-200">
          <div className="flex items-center">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">PCD System</span>
          </div>
          <button 
            onClick={onClose}
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="mt-4 px-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                onClose();
              }}
              className={`flex items-center w-full p-3 rounded-md transition-colors ${
                activeSection === item.id 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="text-base font-medium">{item.title}</span>
            </button>
          ))}
        </div>
        
        {/* User profile at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-base font-medium text-gray-700">User Profile</p>
              <p className="text-sm font-medium text-gray-500">Security Settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
