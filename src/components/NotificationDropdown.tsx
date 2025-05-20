'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';
import Link from 'next/link';
import { format } from 'date-fns';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="sr-only">View notifications</span>
        <Bell className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        
        {/* Notification badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-red-500 text-xs text-white font-bold flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
            {unreadCount > 9 ? <span className="text-[10px] sm:text-xs">9+</span> : <span className="text-[10px] sm:text-xs">{unreadCount}</span>}
          </span>
        )}
      </button>
      
      {/* Dropdown panel - Centered on mobile, right-aligned on larger screens */}
      {isOpen && (
        <div className="fixed sm:absolute left-1/2 sm:left-auto right-auto sm:right-0 transform -translate-x-1/2 sm:translate-x-0 top-16 sm:top-auto sm:mt-2 w-[calc(100vw-24px)] sm:w-auto sm:max-w-sm md:w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              )}
            </div>
            
            <div className="max-h-[50vh] sm:max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Link 
                    key={notification.id}
                    href={notification.link || '#'}
                    onClick={() => markAsRead(notification.id)}
                    className={`block px-4 py-3 hover:bg-gray-50 transition ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex justify-between flex-wrap gap-1">
                      <p className="text-sm font-medium text-gray-900 mr-2">{notification.title}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">{format(notification.date, 'MMM d, h:mm a')}</p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                    {!notification.read && (
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full ml-1"></span>
                    )}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-500">
                  <p className="text-sm">No new notifications</p>
                </div>
              )}
            </div>
            
            {notifications.length > 0 && (
              <div className="px-4 py-2 border-t border-gray-100">
                <Link 
                  href="/blogs"
                  className="block text-center text-xs text-blue-600 hover:text-blue-800"
                >
                  View all blog posts
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
