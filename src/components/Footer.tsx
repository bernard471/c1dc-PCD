'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Footer navigation links
  const footerNavigation = {
    solutions: [
      { name: 'Personal Security', href: '#' },
      { name: 'Business Security', href: '#' },
      { name: 'Enterprise Solutions', href: '#' },
      { name: 'Security Assessments', href: '#' },
    ],
    support: [
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#contact' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Data Processing', href: '#' },
    ],
  };
  
  // Social media links
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'facebook.svg' },
    { name: 'Twitter', href: '#', icon: 'twitter.svg' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin.svg' },
    { name: 'Instagram', href: '#', icon: 'instagram.svg' },
  ];

  return (
    <footer className="bg-gray-300 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company info and newsletter */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-blue-500 mr-2" />
              <span className="text-xl text-blue-500 font-bold">PCD System</span>
            </div>
            
            <p className="text-gray-900 mb-6 max-w-md">
              Protecting your digital life with cutting-edge cybersecurity solutions. 
              Stay ahead of threats and secure your online presence.
            </p>
            
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
              Subscribe to our newsletter
            </h3>
            
            <div className="flex max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-md px-4 py-2 text-sm font-medium transition-colors duration-300 flex items-center">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Footer navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Solutions
            </h3>
            <ul className="space-y-2">
              {footerNavigation.solutions.map((item) => (
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
        </div>
        
        {/* Contact information */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12 mb-6 md:mb-0">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-900 mr-2" />
              <span className="text-gray-900 text-sm">+233 20 123 4567</span>
            </div>
            
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-900 mr-2" />
              <span className="text-gray-900 text-sm">support@cybersecure.com</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-900 mr-2" />
              <span className="text-gray-900 text-sm">Accra, Ghana</span>
            </div>
          </div>
          
          {/* Social links */}
          <div className="flex space-x-4">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <span className="sr-only">{item.name}</span>
                <div className="h-6 w-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  {/* Placeholder for social icons */}
                  <div className="h-3 w-3 bg-gray-400 rounded-sm"></div>
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
            © {currentYear} CyberSecure. All rights reserved.
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
