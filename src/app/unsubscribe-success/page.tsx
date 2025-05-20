import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function UnsubscribeSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Successfully Unsubscribed</h1>
        <p className="text-gray-600 mb-6">
          You have been successfully unsubscribed from our newsletter. You will no longer receive emails from us.
        </p>
        <p className="text-gray-600 mb-6">
          If you unsubscribed by mistake, you can always subscribe again from our website.
        </p>
        <Link 
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}