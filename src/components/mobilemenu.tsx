// components/MobileMenu.js
'use client';

import { Shield, X } from 'lucide-react';
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
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '../../public/Logoimage.png'


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
    { id: 'executive-security', title: 'Executive Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'recommended-solutions', title: 'Recommended Solutions', icon: <Package className="w-5 h-5" /> },
    { id: 'implementation-strategy', title: 'Implementation Strategy', icon: <Package className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Menu panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-full bg-white shadow-xl transition transform flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 flex justify-between items-center px-4 h-16 border-b border-gray-200">
          <div className="flex items-center">
                <Link href="/" className="flex items-center">
              {/* Replace with your actual logo */}
              <Image 
                src={logoImage} 
                alt="PCD System Logo" 
                height={32} 
                width={32} 
                className="mr-2" 
              />
              <span className="text-xl font-bold text-gray-900">PCD System</span>
            </Link>
          </div>
          <button 
            onClick={onClose}
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        {/* Scrollable navigation items */}
        <div className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-1">
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
        </div>
        
        {/* User profile at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <Link href="/profile">
      <div className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <UserCheck className="w-4 h-4 text-gray-600" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">User Profile</p>
          <p className="text-xs font-medium text-gray-500">Security Settings</p>
        </div>
      </div>
        </Link>
        </div>
      </div>
    </div>
  );
}
