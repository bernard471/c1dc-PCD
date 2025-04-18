'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';


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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying your payment</h2>
          <p className="text-gray-600">Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
          <div className="bg-red-100 p-3 rounded-full inline-flex mx-auto mb-4">
            <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Verification Failed</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/payment')}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <div className="bg-green-100 p-3 rounded-full inline-flex mx-auto mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">Your subscription has been activated successfully.</p>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Amount paid:</span>
            <span className="font-medium">₵{paymentDetails?.amount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Reference:</span>
            <span className="font-medium">{paymentDetails?.reference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Subscription valid until:</span>
            <span className="font-medium">
            {paymentDetails?.subscription_expiry 
            ? new Date(paymentDetails.subscription_expiry).toLocaleDateString() 
            : 'N/A'}            
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  To access your dashboard, you&apos;ll need to sign in again with your updated subscription.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleGoToDashboard}
          disabled={refreshingSession}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${refreshingSession ? 'opacity-70 cursor-not-allowed' : ''}`}
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
        </button>
      </div>
    </div>
  );
}
