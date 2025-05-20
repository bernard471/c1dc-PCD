'use client';

import { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LegalContent from '@/components/LegalContent';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import logoImage from '@/images/Logoimage.png'


export default function LegalDashboard() {
  const [activeTab, setActiveTab] = useState('privacy-policy');
  const searchParams = useSearchParams();
const router = useRouter();
const tabParam = searchParams.get('tab');

useEffect(() => {
  if (tabParam) {
    setActiveTab(tabParam);
  }
}, [tabParam]);


  
  const legalSections = [
    { id: 'privacy-policy', name: 'Privacy Policy' },
    { id: 'terms-of-service', name: 'Terms of Service' },
    { id: 'cookie-policy', name: 'Cookie Policy' },
    { id: 'data-processing', name: 'Data Processing' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center">
              <Image 
                src={logoImage} 
                alt="PCD System Logo" 
                height={32} 
                width={32} 
                className="mr-2" 
              />
            <span className="text-xl text-blue-500 font-bold">PCD System</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Legal Information</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 px-4 py-3">
                <h2 className="text-white font-medium">Legal Documents</h2>
              </div>
              <nav className="p-2">
                {legalSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                        setActiveTab(section.id);
                        router.push(`/legal?tab=${section.id}`, { scroll: false });
                      }}                    
                      className={`w-full text-left px-4 py-3 rounded-md flex items-center justify-between transition-colors ${
                      activeTab === section.id 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{section.name}</span>
                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      activeTab === section.id ? 'transform rotate-90 text-blue-500' : 'text-gray-400'
                    }`} />
                  </button>
                ))}
              </nav>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Last updated: June 15, 2023
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-white rounded-lg shadow-md p-4">
              <h3 className="font-medium text-gray-900 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you have any questions about our legal documents, please contact our support team.
              </p>
              <Link 
                href="/#contact" 
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Contact Support
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6 md:p-8">
            <LegalContent activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}