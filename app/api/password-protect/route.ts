import { NextResponse } from 'next/server';

const PASSWORD_COOKIE_NAME = 'live-text-auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    // Check if password matches environment variable
    if (password === process.env.LIVE_TEXT_PASSWORD) {
      // Create response with success
      const response = NextResponse.json({ success: true });
      
      // Set cookie on the response
      response.cookies.set(PASSWORD_COOKIE_NAME, 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only secure in production
        sameSite: 'lax', // Changed from 'none' to 'lax' for better compatibility
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Password protect error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}