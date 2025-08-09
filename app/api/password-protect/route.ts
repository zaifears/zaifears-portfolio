import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// The name of the cookie we'll use for authentication
const PASSWORD_COOKIE_NAME = 'live-text-auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  // Check if the password from the request matches the one in your environment variables
  if (password === process.env.LIVE_TEXT_PASSWORD) {
    // If correct, set a secure, HTTP-only cookie
    const cookieStore = await cookies(); // <--- FIX: Added 'await' here
    cookieStore.set(PASSWORD_COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // Cookie expires in 1 day
      path: '/',
    });
    return NextResponse.json({ success: true });
  } else {
    // If incorrect, return an unauthorized error
    return NextResponse.json({ success: false }, { status: 401 });
  }
}