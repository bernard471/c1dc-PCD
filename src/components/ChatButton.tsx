'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, AlertTriangle, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCrimeReport, setShowCrimeReport] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [userName, setUserName] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  // Close the chat when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCrimeReport(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const generateDiscountCode = () => {
    if (!userName.trim()) {
      alert('Please enter your name first');
      return;
    }
    
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `${userName.toUpperCase().substring(0, 4)}-${randomString}`;
    setGeneratedCode(code);
  };

  const openWhatsApp = () => {
    // Replace with your company's WhatsApp number
    const phoneNumber = '+233552373603'; // Update with your actual number
    const message = encodeURIComponent('Hello, I would like to inquire about your cybersecurity services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div ref={chatRef} className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
              <h3 className="font-bold text-lg">How can we help you?</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-white hover:bg-white/20 p-1 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {showCrimeReport ? (
                <motion.div
                  key="crime-report"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4"
                >
                  <button 
                    onClick={() => setShowCrimeReport(false)}
                    className="mb-2 text-blue-600 flex items-center text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  
                  <h4 className="font-bold text-gray-800 mb-2">Report a Cyber Crime</h4>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 max-h-48 overflow-y-auto text-sm">
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Click <a href="https://cyber1guard.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">this link to cyber1guard.com</a></li>
                      <li>Create an account (Google recommended)</li>
                      <li>In your dashboard sidebar, search for the particular crime you want to report on and make a report</li>
                      <li>Add the generated code to the top of your description for discounted pricing</li>
                    </ol>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <button
                    onClick={generateDiscountCode}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mb-2"
                  >
                    Generate Discount Code
                  </button>
                  
                  {generatedCode && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-2 text-center">
                      <p className="text-sm text-gray-600 mb-1">Your discount code:</p>
                      <p className="font-mono font-bold text-blue-800 select-all">{generatedCode}</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="options"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 space-y-3"
                >
                  <button
                    onClick={() => setShowCrimeReport(true)}
                    className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">Report a Cyber Crime</p>
                      <p className="text-xs text-gray-500">Follow steps to report an incident</p>
                    </div>
                  </button>
                  
                  <Link href="/#contact" className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">Submit a Complaint</p>
                      <p className="text-xs text-gray-500">Contact our support team</p>
                    </div>
                  </Link>
                  
                  <button
                    onClick={openWhatsApp}
                    className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">WhatsApp Us</p>
                      <p className="text-xs text-gray-500">Get instant support via WhatsApp</p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center ${
          isOpen ? 'bg-red-500' : 'bg-gradient-to-r from-green-600 to-green-600'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </motion.button>
    </div>
  );
}