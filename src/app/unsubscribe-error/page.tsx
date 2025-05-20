import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function UnsubscribeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Unsubscribe Error</h1>
        <p className="text-gray-600 mb-6">
          We couldn&apos;t process your unsubscribe request. The link may be invalid or expired.
        </p>
        <p className="text-gray-600 mb-6">
          If you continue to receive emails from us, please contact our support team.
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