import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/api/auth/login',
  '/api/auth/signup',
  '/payment',
  '/api/create-payment',
  '/api/verify-payment',
  '/payment/success',
  '/payment/cancel',
  '/legal',
];

// Function to check if the path is public
const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath => 
    path === publicPath || 
    path.startsWith('/api/auth/') || 
    path.startsWith('/_next/') ||
    path.startsWith('/favicon') ||
    path.startsWith('/api/payment/')
  );
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }
  
  // Get the session token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  // If there's no token and the path requires authentication, redirect to login
  if (!token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
// In the middleware function, update the dashboard check:
if (pathname.startsWith('/dashboard')) {
  // Get subscription status from token
  const hasCompletedPayment = token.hasCompletedPayment as boolean;
  const subscriptionStatus = token.subscriptionStatus as string;
  
  // Add debug logging
  console.log('Middleware - User subscription status:', {
    hasCompletedPayment,
    subscriptionStatus,
    userId: token.id
  });
  
  // If user hasn't completed payment or subscription is not active, redirect to payment page
  if (!hasCompletedPayment || subscriptionStatus !== 'active') {
    console.log('Middleware - Redirecting to payment page');
    return NextResponse.redirect(new URL('/payment', request.url));
  }
  
  console.log('Middleware - Allowing access to dashboard');
}
  
  // If there's a token and the user is trying to access auth pages, redirect to dashboard
  if (token && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/signup'))) {
    // Check if user has completed payment
    const hasCompletedPayment = token.hasCompletedPayment as boolean;
    const subscriptionStatus = token.subscriptionStatus as string;
    
    // If user has completed payment and has active subscription, redirect to dashboard
    if (hasCompletedPayment && subscriptionStatus === 'active') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      // Otherwise redirect to payment page
      return NextResponse.redirect(new URL('/payment', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|blogs).*)',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
