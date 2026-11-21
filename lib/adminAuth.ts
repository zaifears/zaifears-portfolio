import crypto from 'crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'pa_admin_session';
export const ADMIN_SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

function getAdminPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.trim().length > 0 ? pw.trim() : null;
}

export function isAdminPasswordConfigured(): boolean {
  return getAdminPassword() !== null;
}

function getSigningKey(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET?.trim();
  if (explicit) return explicit;
  const pw = getAdminPassword() || 'unconfigured';
  return crypto.createHash('sha256').update(`pa-session-key:${pw}`).digest('hex');
}

/**
 * Constant-time password check using SHA-256 digests so length differences
 * never leak via timing.
 */
export function verifyAdminPassword(candidate: string): boolean {
  const expected = getAdminPassword();
  if (!expected || !candidate) return false;
  const a = crypto.createHash('sha256').update(candidate).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

/**
 * Create a signed, expiring session token for the HttpOnly admin cookie.
 */
export function createAdminSessionToken(nowMs: number = Date.now()): string {
  const exp = Math.floor(nowMs / 1000) + ADMIN_SESSION_TTL_SECONDS;
  const nonce = crypto.randomBytes(12).toString('hex');
  const payload = Buffer.from(JSON.stringify({ exp, nonce, v: 1 })).toString('base64url');
  const sig = crypto
    .createHmac('sha256', getSigningKey())
    .update(payload)
    .digest('base64url');
  return `${payload}.${sig}`;
}

/**
 * Verify a signed admin session token (signature + expiry).
 */
export function verifyAdminSessionToken(token: string | undefined | null, nowMs: number = Date.now()): boolean {
  if (!token || !isAdminPasswordConfigured()) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  if (!payload || !sig) return false;

  const expectedSig = crypto
    .createHmac('sha256', getSigningKey())
    .update(payload)
    .digest('base64url');

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      exp?: number;
      v?: number;
    };
    if (parsed.v !== 1 || typeof parsed.exp !== 'number') return false;
    return parsed.exp > Math.floor(nowMs / 1000);
  } catch {
    return false;
  }
}

export function isAdminRequestAuthenticated(req: NextRequest): boolean {
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(cookie);
}
