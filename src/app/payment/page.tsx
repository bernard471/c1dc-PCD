'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, CreditCard, AlertCircle, ShieldCheck, Smartphone, Wifi, MessageSquareMore } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function PaymentPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Set email from session if available
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  // Redirect to dashboard if user already has an active subscription
  useEffect(() => {
    if (session?.user?.hasCompletedPayment && session?.user?.subscriptionStatus === 'active') {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }

    try {
      // Initialize Paystack transaction
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: 30000, // ₵300 in pesewas (Paystack uses the smallest currency unit)
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      // Redirect to Paystack checkout
      window.location.href = data.authorization_url;
    } catch (err) {
      console.error('Payment initialization failed:', err);
      setError('Failed to initialize payment. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative elements */}
      <div className="absolute -z-10 top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute -z-10 bottom-20 right-10 w-40 h-40 bg-indigo-200 rounded-full opacity-30 blur-xl"></div>
      
      <div className="max-w-4xl w-full mx-auto space-y-8">
        {/* Logo and header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center mb-2">
              <ShieldCheck className="h-10 w-10 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">PCD System</span>
            </div>
          </Link>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-center text-3xl font-extrabold text-gray-900"
          >
            Complete Your Purchase
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-center text-sm sm:text-base text-gray-600"
          >
            You&apos;re just one step away from securing your digital life
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left column - Order summary */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
              <div className="bg-blue-100 p-2 rounded-full">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-5 text-white mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Complete Protection</h3>
                <span className="text-2xl font-bold">₵300</span>
              </div>
              <p className="text-sm text-blue-100">Annual subscription</p>
            </div>
            
            {/* Subscription benefits */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Your subscription includes:</h4>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 text-sm">Security Dashboard</h5>
                    <p className="text-gray-600 text-xs">Complete overview of your security status</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Smartphone className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 text-sm">Mobile Device Security</h5>
                    <p className="text-gray-600 text-xs">Protection for Android and iOS devices</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Wifi className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 text-sm">Wi-Fi Security</h5>
                    <p className="text-gray-600 text-xs">Secure your wireless networks</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <MessageSquareMore className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 text-sm">And Many More</h5>
                    <p className="text-gray-600 text-xs">Secure your digital life</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₵300.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-900">₵0.00</span>
                </div>
                <div className="flex justify-between text-base font-bold mt-3 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>₵300.00</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-center text-gray-700 font-medium">
                <span className="text-blue-600">30-day money-back guarantee</span> — Try risk-free
              </p>
            </div>
          </motion.div>

          {/* Right column - Payment form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-3 bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Payment Details</h3>
              <div className="bg-blue-100 p-2 rounded-full">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start"
              >
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="you@example.com"
                    disabled={!!session?.user?.email} // Disable if email is from session
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  We&apos;ll send your receipt and access details to this email
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white transition-all duration-300 ${
                    isHovered 
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                  } ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Pay ₵300.00 Now
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <Lock className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-xs text-gray-500">Secured by Paystack</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center">
                <ShieldCheck className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-xs text-gray-500">Encrypted payment</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">We accept:</h4>
              <ul className="mt-3 space-y-1">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Visa</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">MasterCard</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">MTN</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Vodafone</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">AirtelTigo</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Footer information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-gray-500 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <p className="mb-3">By completing this purchase, you agree to our <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Privacy Policy</a>.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <Link href="/" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Return to Home
            </Link>
            <a href="#" className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
              Contact Support
            </a>
          </div>
          
          <div className="mt-6 flex items-center justify-center">
            <p className="text-xs text-gray-400">
              Having trouble? Email us at <a href="mailto:info@cyber1defense.com" className="text-blue-600 hover:text-blue-500">support@cyber1defense.com</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

