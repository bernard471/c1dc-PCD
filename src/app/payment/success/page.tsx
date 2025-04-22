'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2, ShieldCheck, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PaymentDetails {
  success: boolean;
  reference: string;
  amount: number;
  subscription_expiry: string;
  // Add any other fields that might be in your payment details
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [refreshingSession, setRefreshingSession] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const reference = searchParams.get('reference');
        
        if (!reference) {
          setError('Payment reference not found');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/verify-payment?reference=${reference}`);
        const data = await response.json();

        if (!data.success) {
          setError(data.error || 'Payment verification failed');
          setLoading(false);
          return;
        }

        setPaymentDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error verifying payment:', error);
        setError('An error occurred while verifying your payment');
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  const handleGoToDashboard = async () => {
    try {
      setRefreshingSession(true);
      
      // The most reliable way to update the session is to sign out and sign back in
      // This will create a fresh token with the updated user data
      await signOut({ redirect: false });
      
      // Redirect to login with callback to dashboard
      router.push('/auth/login?callbackUrl=/dashboard');
    } catch (error) {
      console.error('Error refreshing session:', error);
      setError('Failed to refresh your session. Please try logging in again.');
      setRefreshingSession(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg text-center"
        >
          <div className="bg-blue-100 p-4 rounded-full inline-flex mx-auto mb-6">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Verifying your payment</h2>
          <p className="text-gray-600 mb-6">Please wait while we confirm your payment and activate your subscription...</p>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <p className="text-sm text-gray-500">This may take a few moments. Please don&apos;t close this page.</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg text-center"
        >
          <div className="bg-red-100 p-4 rounded-full inline-flex mx-auto mb-6">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Payment Verification Failed</h2>
          <p className="text-red-600 mb-6">{error}</p>
          
          <div className="bg-gray-50 p-5 rounded-xl mb-6">
            <p className="text-sm text-gray-700">
              We couldn&apos;t verify your payment. This could be due to:
            </p>
            <ul className="mt-3 space-y-1 text-left">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm text-gray-600">Payment was declined by your bank</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm text-gray-600">Network connectivity issues</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm text-gray-600">Technical error with the payment processor</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/payment')}
              className="flex-1 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/')}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      {/* Decorative elements */}
      <div className="absolute -z-10 top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute -z-10 bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg text-center relative overflow-hidden"
      >
        {/* Success confetti animation */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
        
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-75 blur-sm animate-pulse"></div>
            <div className="relative bg-green-100 p-4 rounded-full inline-flex mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-8">Your subscription has been activated successfully.</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl mb-8 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 p-2 rounded-full">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">Amount paid</p>
                <p className="font-semibold text-gray-900">₵{paymentDetails?.amount}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 p-2 rounded-full">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">Reference</p>
                <p className="font-semibold text-gray-900 text-sm truncate max-w-[110px]">{paymentDetails?.reference}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm md:col-span-2">
              <div className="bg-green-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">Subscription valid until</p>
                <p className="font-semibold text-gray-900">
                  {paymentDetails?.subscription_expiry 
                    ? new Date(paymentDetails.subscription_expiry).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  To access your dashboard with your updated subscription, you&apos;ll need to sign in again.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoToDashboard}
            disabled={refreshingSession}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-full py-4 px-6 border border-transparent rounded-xl shadow-md text-base font-bold text-white transition-all duration-300 ${
              isHovered 
                ? 'bg-gradient-to-r from-green-600 to-blue-600 shadow-lg' 
                : 'bg-gradient-to-r from-blue-600 to-green-600'
            } ${refreshingSession ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {refreshingSession ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Preparing Dashboard...
              </>
            ) : (
              'Continue to Dashboard'
            )}
          </motion.button>
          
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Home
            </Link>
            
            <span className="hidden sm:inline text-gray-300">|</span>
            
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Receipt
            </a>
          </div>
        </motion.div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">What&apos;s included in your subscription:</h4>
          <ul className="mt-3 space-y-1 text-left">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-600">Security Dashboard access</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-600">Mobile device protection</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-600">WiFi & network security</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-600">Identity protection</span>
            </li>
          </ul>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        <p>Need help? <a href="#" className="text-blue-600 hover:text-blue-500">Contact our support team</a></p>
      </motion.div>
    </div>
  );
}

