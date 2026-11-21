'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const TRACK_URL = '/api/analytics/track';
const SESSION_KEY = 'pa_sid_v1';
const SEEN_KEY = 'pa_seen_v1';
const HEARTBEAT_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '');
  }
  return `s${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

function getOrCreateSessionId(): { id: string; isNew: boolean } {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return { id: existing, isNew: false };
    const id = generateId();
    sessionStorage.setItem(SESSION_KEY, id);
    return { id, isNew: true };
  } catch {
    return { id: generateId(), isNew: true };
  }
}

function checkAndMarkReturning(): boolean {
  try {
    const seen = localStorage.getItem(SEEN_KEY);
    if (seen) return true;
    localStorage.setItem(SEEN_KEY, '1');
    return false;
  } catch {
    return false;
  }
}

function detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android/i.test(ua)) return 'mobile';
  return 'desktop';
}

function sendTrack(payload: Record<string, unknown>, useBeacon = false) {
  try {
    const json = JSON.stringify(payload);
    if (useBeacon && typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([json], { type: 'application/json' });
      navigator.sendBeacon(TRACK_URL, blob);
      return;
    }
    fetch(TRACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: json,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Non-fatal: analytics should never disrupt page UX
  }
}

function isIgnoredClientPath(path: string): boolean {
  return path === '/admin' || path.startsWith('/admin/');
}

/**
 * Privacy-first, first-party visit & engagement tracker.
 * Mounted once in app/layout.tsx; skips /admin routes automatically.
 */
export function VisitTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string | null>(null);
  const startedRef = useRef(false);
  const pageCountRef = useRef(1);
  const lastPathRef = useRef<string>('/');
  const activeAccumulatorRef = useRef(0);
  const visibleSinceRef = useRef<number | null>(null);

  // Track SPA route navigations
  useEffect(() => {
    if (!pathname) return;
    if (isIgnoredClientPath(pathname)) return;

    if (startedRef.current && lastPathRef.current !== pathname) {
      lastPathRef.current = pathname;
      pageCountRef.current += 1;
      if (sessionIdRef.current) {
        sendTrack({
          action: 'pageview',
          sessionId: sessionIdRef.current,
          path: pathname,
        });
      }
    } else if (!startedRef.current) {
      lastPathRef.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined' || startedRef.current) return;
    const initialPath = window.location.pathname || '/';
    if (isIgnoredClientPath(initialPath)) return;

    startedRef.current = true;
    lastPathRef.current = initialPath;

    const { id: sessionId, isNew } = getOrCreateSessionId();
    sessionIdRef.current = sessionId;
    visibleSinceRef.current = document.visibilityState === 'visible' ? Date.now() : null;

    if (isNew) {
      const params = new URLSearchParams(window.location.search);
      const isReturning = checkAndMarkReturning();
      const clickIdType = params.has('fbclid')
        ? 'fbclid'
        : params.has('gclid') || params.has('gbraid') || params.has('wbraid')
          ? 'gclid'
          : params.has('ttclid')
            ? 'ttclid'
            : params.has('li_fat_id')
              ? 'li_fat_id'
              : params.has('msclkid')
                ? 'msclkid'
                : null;
      sendTrack({
        action: 'start',
        sessionId,
        entryPath: initialPath,
        referrer: document.referrer || null,
        deviceType: detectDeviceType(),
        isReturning,
        utmSource: params.get('utm_source'),
        utmMedium: params.get('utm_medium'),
        utmCampaign: params.get('utm_campaign'),
        utmContent: params.get('utm_content'),
        clickIdType,
      });
    }

    const collectDelta = (): number => {
      let delta = activeAccumulatorRef.current;
      activeAccumulatorRef.current = 0;
      if (visibleSinceRef.current !== null) {
        const now = Date.now();
        delta += (now - visibleSinceRef.current) / 1000;
        visibleSinceRef.current = now;
      }
      return Math.round(delta);
    };

    const flush = (action: 'heartbeat' | 'end', useBeacon = false) => {
      if (!sessionIdRef.current) return;
      const delta = collectDelta();
      if (delta <= 0 && action === 'heartbeat') return;
      sendTrack(
        {
          action,
          sessionId: sessionIdRef.current,
          path: lastPathRef.current,
          pageCount: pageCountRef.current,
          deltaActiveSeconds: delta,
        },
        useBeacon
      );
    };

    const timer = window.setInterval(() => flush('heartbeat', false), HEARTBEAT_INTERVAL_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flush('heartbeat', true);
        visibleSinceRef.current = null;
      } else {
        visibleSinceRef.current = Date.now();
      }
    };

    const onPageHide = () => {
      flush('end', true);
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', onPageHide);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, []);

  return null;
}
