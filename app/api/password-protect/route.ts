import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const PASSWORD_COOKIE_NAME = 'live-text-auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  if (password === process.env.LIVE_TEXT_PASSWORD) {
    const cookieStore = await cookies();
    
    cookieStore.set(PASSWORD_COOKIE_NAME, 'true', {
      httpOnly: true,
      // The 'secure' attribute is required when SameSite is 'none'
      secure: true, 
      // Set SameSite to 'none' to allow the cookie to be sent in all contexts
      sameSite: 'none', 
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}