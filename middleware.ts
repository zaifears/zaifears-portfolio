import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PASSWORD_COOKIE_NAME = 'live-text-auth';

export function middleware(request: NextRequest) {
  // Check if the request is for the live-text page
  if (request.nextUrl.pathname.startsWith('/live-text')) {
    // Skip protection for the password page itself
    if (request.nextUrl.pathname.startsWith('/live-text/password')) {
      return NextResponse.next();
    }
    
    const authCookie = request.cookies.get(PASSWORD_COOKIE_NAME);
    const isAuthenticated = authCookie && authCookie.value === 'true';

    // If not authenticated, redirect to the password page
    if (!isAuthenticated) {
      const redirectUrl = new URL('/live-text/password', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

// Define which paths the middleware should run on
export const config = {
  matcher: '/live-text/:path*',
};