'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    
    setIsSubmitting(true);
    setStatus('idle');
    
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
      setStatus('success');
      setEmail('');
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe');
      
      // Reset error after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-md overflow-hidden">
      <div className="p-8 md:p-12">
        <div className="md:flex items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-purple-100 max-w-md">
              Subscribe to our newsletter to receive the latest security updates and tips directly to your inbox.
            </p>
          </div>
          <div className="flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-md sm:rounded-r-none mb-2 sm:mb-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <button 
                type="submit"
                className="bg-indigo-800 text-white px-6 py-3 rounded-md sm:rounded-l-none font-medium hover:bg-indigo-900 transition flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
            
            {/* Status messages */}
            {status === 'success' && (
              <div className="mt-2 flex items-center text-green-200 text-sm">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Thank you for subscribing!</span>
              </div>
            )}
            
            {status === 'error' && (
              <div className="mt-2 flex items-center text-red-200 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}