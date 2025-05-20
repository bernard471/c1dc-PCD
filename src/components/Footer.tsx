'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import logoImage from '../../public/Logoimage.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setSubscriptionStatus('error');
      setErrorMessage('Please enter a valid email address');
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
      return;
    }
    
    setIsSubmitting(true);
    setSubscriptionStatus('idle');
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      // Success
      setSubscriptionStatus('success');
      setEmail('');
      
      // Reset status after 5 seconds
      setTimeout(() => setSubscriptionStatus('idle'), 5000);
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscriptionStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe');
      
      // Reset error after 3 seconds
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Footer navigation links
  const footerNavigation = {
    support: [
      { name: 'FAQs', href: '#faq' },
      { name: 'Contact Us', href: '#contact' },
    ],
    company: [
      { name: 'Personal Security', href: '#features' },
      { name: 'About Us', href: '#about' },
      { name: 'Pricing', href: '#pricing' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/legal?tab=privacy-policy' },
      { name: 'Terms of Service', href: '/legal?tab=terms-of-service' },
      { name: 'Cookie Policy', href: '/legal?tab=cookie-policy' },
    ],
  };
  
  // Social media links
  const socialLinks = [
    { name: 'Facebook', href: 'https://web.facebook.com/cyber1defense', icon: 'facebook.svg' },
    { name: 'Twitter', href: 'https://x.com/Cyber1Defense', icon: 'twitter.svg' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin.svg' },
    { name: 'Instagram', href: 'https://www.instagram.com/cyber1defense/', icon: 'instagram.svg' },
  ];

  return (
    <footer className="bg-gray-300 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company info and newsletter */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Image 
                src={logoImage} 
                alt="PCD System Logo" 
                height={32} 
                width={32} 
                className="mr-2" 
              />
              <span className="text-xl text-blue-500 font-bold">PCD System</span>
            </div>
            
            <p className="text-gray-900 mb-6 max-w-md">
              Protecting your digital life with cutting-edge cybersecurity solutions. 
              Stay ahead of threats and secure your online presence.
            </p>

            <p className="text-gray-900 mb-3 max-w-md">
              Created By <a href="https://cyber1defense.com" className="text-blue-500 font-bold hover:text-blue-700 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">Cyber<span className='text-orange-500'>1</span>defense</a>
            </p>

            
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
              Subscribe to our newsletter
            </h3>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-md">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                />
                <button 
                  type="submit"
                  className={`bg-blue-600 hover:bg-blue-700 text-white rounded-r-md px-4 py-2 text-sm font-medium transition-colors duration-300 flex items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing
                    </span>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              
              {/* Subscription status messages */}
              {subscriptionStatus === 'success' && (
                <div className="mt-2 flex items-center text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Thank you for subscribing!</span>
                </div>
              )}
              
              {subscriptionStatus === 'error' && (
                <div className="mt-2 flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </div>
          
          {/* Footer navigation */}
          <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mt-6 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-900 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-900 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>            
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-900 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Contact information */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12 mb-6 md:mb-0">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-blue-900 mr-2" />
              <span className="hover:text-blue-900 text-blue-500 text-sm">+233 55 237 3603</span>
            </div>
            
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-900 mr-2" />
              <span className="hover:text-blue-900 text-blue-500 text-sm">info@cyber1defense.com </span>
            </div>
            
            <div className="flex items-center ">
              <MapPin className="h-5 w-5 text-blue-900  mr-2" />
              <span className="hover:text-blue-900 text-blue-500 text-sm">Accra, Ghana</span>
            </div>
          </div>
          
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="hover:text-blue-900 text-blue-500 transition-colors duration-300"
                  aria-label={item.name}
                >
                  <span className="sr-only">{item.name}</span>
                  <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    {item.name === 'Facebook' && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    )}
                    {item.name === 'Twitter' && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    )}
                    {item.name === 'LinkedIn' && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    )}
                    {item.name === 'Instagram' && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    )}
                  </div>
                </a>
              ))}
            </div>

        </div>
      </div>
      
      {/* Copyright bar */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} C1DC PCD. All rights reserved.
          </p>
          
          <div className="mt-2 sm:mt-0 flex items-center">
            <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-400 text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
