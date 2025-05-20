'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchBlogPosts } from '@/lib/contentful';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // Initialize with current date, we'll update it after mounting
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true);
    
    // Now that we're in the browser, we can safely access localStorage
    const saved = localStorage.getItem('lastBlogCheck');
    if (saved) {
      setLastChecked(new Date(saved));
    }
  }, []);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Check for new blog posts
  useEffect(() => {
    // Only run this effect on the client side and after lastChecked is properly initialized
    if (!isClient) return;
    
    const checkForNewPosts = async () => {
      try {
        const posts = await fetchBlogPosts();
        
        // Find posts that were created after the last check
        const newPosts = posts.filter(post => {
          const postDate = new Date(post.sys.createdAt);
          return postDate > lastChecked;
        });
        
        // Create notifications for new posts
        if (newPosts.length > 0) {
          const newNotifications = newPosts.map(post => ({
            id: post.sys.id,
            title: 'New Blog Post',
            message: post.fields.title,
            date: new Date(post.sys.createdAt),
            read: false,
            link: `/blogs/${post.fields.slug}`
          }));
          
          // Add new notifications to the state
          setNotifications(prev => [...newNotifications, ...prev]);
          
          // Update last checked time
          const now = new Date();
          setLastChecked(now);
          localStorage.setItem('lastBlogCheck', now.toISOString());
        }
      } catch (error) {
        console.error('Error checking for new blog posts:', error);
      }
    };
    
    // Check immediately on mount
    checkForNewPosts();
    
    // Set up interval to check periodically (every 5 minutes)
    const interval = setInterval(checkForNewPosts, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [lastChecked, isClient]);

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
