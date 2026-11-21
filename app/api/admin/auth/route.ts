import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_TTL_SECONDS,
  createAdminSessionToken,
  isAdminPasswordConfigured,
  isAdminRequestAuthenticated,
  verifyAdminPassword,
} from '@/lib/adminAuth';
import { isKvConfigured, kvCommand, kvPipeline } from '@/lib/kv';
import { getTransientClientIp, hashRateLimitKey } from '@/lib/analytics/helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_WINDOW_SEC = 15 * 60; // 15 minutes

export async function GET(req: NextRequest) {
  return NextResponse.json({
    configured: isAdminPasswordConfigured(),
    authenticated: isAdminRequestAuthenticated(req),
  });
}

export async function POST(req: NextRequest) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'ADMIN_PASSWORD is not configured on the server.' },
      { status: 503 }
    );
  }

  let password = '';
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  const ip = getTransientClientIp(req.headers);
  const rlKey = `pa:rl:admin_login:${hashRateLimitKey('admin_login', ip)}`;

  if (isKvConfigured()) {
    const attempts = Number((await kvCommand<number | string>(['GET', rlKey])) || 0);
    if (attempts >= MAX_LOGIN_ATTEMPTS) {
      return NextResponse.json(
        { ok: false, error: 'Too many failed attempts. Please wait 15 minutes and try again.' },
        { status: 429 }
      );
    }
  }

  if (!verifyAdminPassword(password)) {
    if (isKvConfigured()) {
      await kvPipeline([
        ['INCR', rlKey],
        ['EXPIRE', rlKey, LOCKOUT_WINDOW_SEC, 'NX'],
      ]);
    }
    return NextResponse.json({ ok: false, error: 'Incorrect password.' }, { status: 401 });
  }

  // Successful login — clear failed attempts counter
  if (isKvConfigured()) {
    await kvCommand(['DEL', rlKey]).catch(() => {});
  }

  const token = createAdminSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return res;
}
