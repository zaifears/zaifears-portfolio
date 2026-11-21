import { NextRequest, NextResponse } from 'next/server';
import { isKvConfigured, kvCommand, kvPipeline, parseHashResult, type RedisCommand } from '@/lib/kv';
import { getDhakaDateKey, getDhakaHour, getDhakaMonthKey } from '@/lib/analytics/dhakaTime';
import {
  buildUtmKey,
  categorizeTrafficSource,
  clampNumber,
  detectBrowserFromUA,
  detectDeviceFromUA,
  detectOsFromUA,
  extractGeoFromHeaders,
  getTransientClientIp,
  hashRateLimitKey,
  hashVisitorFingerprint,
  inferAdPlatformFromClickId,
  isBotUserAgent,
  isIgnoredPath,
  isPlausibleSessionId,
  normalizeAnalyticsPath,
  sanitizeClickIdType,
  sanitizeUtmValue,
} from '@/lib/analytics/helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_ACTIONS = new Set(['start', 'pageview', 'heartbeat', 'end']);
const VALID_DEVICE_TYPES = new Set(['mobile', 'tablet', 'desktop', 'unknown']);

const DAILY_TTL_SECONDS = 95 * 24 * 60 * 60; // 95 days
const UV_TTL_SECONDS = 45 * 24 * 60 * 60; // 45 days
const SESSION_TTL_SECONDS = 2 * 60 * 60; // 2 hours
const ACTIVE_WINDOW_MS = 16 * 60 * 1000; // 16 min (heartbeat is every 5 min)

const MAX_DELTA_SECONDS = 900; // 15 min cap per beacon
const MAX_PAGE_COUNT = 500;
const BOUNCE_MAX_PAGE_COUNT = 1;
const BOUNCE_MAX_ACTIVE_SECONDS = 10;

// Generous per-IP-hash rate limit so carrier-NAT mobile users in BD never get dropped,
// while blocking single-source floods.
const TRACK_RATE_LIMIT_MAX = 240;
const TRACK_RATE_LIMIT_WINDOW_SEC = 60;

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `pa:rl:track:${hashRateLimitKey('track', ip)}`;
  const [count] = await kvPipeline<number>([
    ['INCR', key],
    ['EXPIRE', key, TRACK_RATE_LIMIT_WINDOW_SEC, 'NX'],
  ]);
  return typeof count === 'number' && count > TRACK_RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  try {
    if (!isKvConfigured()) {
      return NextResponse.json({ ok: true, skipped: 'kv_unconfigured' });
    }

    const ua = req.headers.get('user-agent') || '';
    if (isBotUserAgent(ua)) {
      return NextResponse.json({ ok: true, skipped: 'bot' });
    }

    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
    }

    const action = typeof body.action === 'string' ? body.action : '';
    if (!VALID_ACTIONS.has(action)) {
      return NextResponse.json({ ok: false, error: 'Invalid action' }, { status: 400 });
    }

    const sessionId = body.sessionId;
    if (!isPlausibleSessionId(sessionId)) {
      return NextResponse.json({ ok: false, error: 'Invalid sessionId' }, { status: 400 });
    }

    const rawPath =
      typeof body.path === 'string'
        ? body.path
        : typeof body.entryPath === 'string'
          ? body.entryPath
          : '/';
    const path = normalizeAnalyticsPath(rawPath);
    if (isIgnoredPath(path)) {
      return NextResponse.json({ ok: true, skipped: 'ignored_path' });
    }

    // Transient IP read — only used for rate-limiting and one-way HMAC hashing.
    const transientIp = getTransientClientIp(req.headers);

    if (action === 'start') {
      if (await isRateLimited(transientIp)) {
        return NextResponse.json({ ok: false, error: 'Rate limited' }, { status: 429 });
      }
    }

    const nowMs = Date.now();
    const dateKey = getDhakaDateKey(0);
    const monthKey = getDhakaMonthKey();
    const hour = getDhakaHour();
    const sessionKey = `pa:sess:${sessionId}`;

    // ─────────────────────────────────────────────
    // START — new browser session
    // ─────────────────────────────────────────────
    if (action === 'start') {
      // Idempotency guard: if this session already started, don't double-count.
      const existingRaw = await kvCommand(['HGETALL', sessionKey]);
      const existing = parseHashResult(existingRaw);
      if (existing.dateKey) {
        return NextResponse.json({ ok: true, alreadyStarted: true });
      }

      const deviceType =
        typeof body.deviceType === 'string' && VALID_DEVICE_TYPES.has(body.deviceType)
          ? body.deviceType
          : detectDeviceFromUA(ua);
      const browser = detectBrowserFromUA(ua);
      const os = detectOsFromUA(ua);

      let ownHostname = '';
      try {
        ownHostname = (req.nextUrl?.hostname || new URL(req.url).hostname).toLowerCase();
      } catch {
        ownHostname = '';
      }

      const referrer = typeof body.referrer === 'string' ? body.referrer.trim().slice(0, 300) : null;
      const clickIdType = sanitizeClickIdType(body.clickIdType);
      const inferredAd = inferAdPlatformFromClickId(clickIdType);

      const utmSource = sanitizeUtmValue(body.utmSource) || inferredAd?.source || null;
      const utmMedium = sanitizeUtmValue(body.utmMedium) || inferredAd?.medium || null;
      const utmCampaign = sanitizeUtmValue(body.utmCampaign);
      const utmContent = sanitizeUtmValue(body.utmContent);
      const utmKey = buildUtmKey(utmSource, utmMedium, utmCampaign, utmContent);

      const {
        bucket: sourceBucket,
        domain: refDomain,
        isPaidOrTagged,
      } = categorizeTrafficSource({
        referrer,
        ownHostname,
        utmSource,
        clickIdType,
      });

      const { countryCode, cityLabel } = extractGeoFromHeaders(req.headers);
      const visitorHash = hashVisitorFingerprint(transientIp, ua, monthKey);
      const isReturning = body.isReturning === true;

      const dailyKey = `pa:d:${dateKey}`;
      const uvKey = `pa:uv:${dateKey}`;
      const countryKey = `pa:geo:country:${dateKey}`;
      const cityKey = `pa:geo:city:${dateKey}`;
      const refKey = `pa:ref:${dateKey}`;
      const utmRedisKey = `pa:utm:${dateKey}`;
      const pagesDayKey = `pa:pages:${dateKey}`;
      const browserKey = `pa:browser:${dateKey}`;
      const osKey = `pa:os:${dateKey}`;

      const cmds: RedisCommand[] = [
        // Store lightweight session state for active time & bounce deduplication
        [
          'HSET',
          sessionKey,
          'dateKey',
          dateKey,
          'lastPath',
          path,
          'pageCount',
          1,
          'activeSeconds',
          0,
          'ended',
          0,
        ],
        ['EXPIRE', sessionKey, SESSION_TTL_SECONDS],

        // Active-right-now sorted set (prune stale entries opportunistically)
        ['ZADD', 'pa:active', nowMs, sessionId],
        ['ZREMRANGEBYSCORE', 'pa:active', '-inf', nowMs - ACTIVE_WINDOW_MS],

        // Daily aggregate counters
        ['HINCRBY', dailyKey, 'sessions', 1],
        ['HINCRBY', dailyKey, 'pageviews', 1],
        ['HINCRBY', dailyKey, isReturning ? 'returningVisitors' : 'newVisitors', 1],
        ['HINCRBY', dailyKey, `device_${deviceType}`, 1],
        ['HINCRBY', dailyKey, `source_${sourceBucket}`, 1],
        ['HINCRBY', dailyKey, `hour_${hour}`, 1],
        ['EXPIRE', dailyKey, DAILY_TTL_SECONDS, 'NX'],

        // Privacy-preserving unique visitor HyperLogLog (salted one-way hash, zero raw IP)
        ['PFADD', uvKey, visitorHash],
        ['EXPIRE', uvKey, UV_TTL_SECONDS, 'NX'],

        // Global Geo (Country + City)
        ['HINCRBY', countryKey, countryCode, 1],
        ['EXPIRE', countryKey, DAILY_TTL_SECONDS, 'NX'],
        ['HINCRBY', cityKey, cityLabel, 1],
        ['EXPIRE', cityKey, DAILY_TTL_SECONDS, 'NX'],

        // Browser & OS
        ['HINCRBY', browserKey, browser, 1],
        ['EXPIRE', browserKey, DAILY_TTL_SECONDS, 'NX'],
        ['HINCRBY', osKey, os, 1],
        ['EXPIRE', osKey, DAILY_TTL_SECONDS, 'NX'],

        // Pageviews (daily + all-time)
        ['HINCRBY', pagesDayKey, path, 1],
        ['EXPIRE', pagesDayKey, DAILY_TTL_SECONDS, 'NX'],
        ['HINCRBY', 'pa:pages:all', path, 1],
      ];

      if (isPaidOrTagged) {
        cmds.push(['HINCRBY', dailyKey, 'adTaggedSessions', 1]);
      }

      if (refDomain) {
        cmds.push(['HINCRBY', refKey, refDomain, 1]);
        cmds.push(['EXPIRE', refKey, DAILY_TTL_SECONDS, 'NX']);
      }

      if (utmKey) {
        cmds.push(['HINCRBY', utmRedisKey, utmKey, 1]);
        cmds.push(['EXPIRE', utmRedisKey, DAILY_TTL_SECONDS, 'NX']);
      }

      await kvPipeline(cmds);
      return NextResponse.json({ ok: true, alreadyStarted: false });
    }

    // ─────────────────────────────────────────────
    // PAGEVIEW / HEARTBEAT / END
    // ─────────────────────────────────────────────
    const sessRaw = await kvCommand(['HGETALL', sessionKey]);
    const sess = parseHashResult(sessRaw);
    if (!sess.dateKey) {
      return NextResponse.json({ ok: true, skipped: 'no_session' });
    }

    const sessDateKey = sess.dateKey;
    const dailyKey = `pa:d:${sessDateKey}`;
    const pagesDayKey = `pa:pages:${sessDateKey}`;

    if (action === 'pageview') {
      if (sess.lastPath === path) {
        return NextResponse.json({ ok: true, skipped: 'same_path' });
      }
      const nextPageCount = Math.min(MAX_PAGE_COUNT, (Number(sess.pageCount) || 1) + 1);
      await kvPipeline([
        ['HSET', sessionKey, 'lastPath', path, 'pageCount', nextPageCount],
        ['EXPIRE', sessionKey, SESSION_TTL_SECONDS],
        ['ZADD', 'pa:active', nowMs, sessionId],
        ['HINCRBY', dailyKey, 'pageviews', 1],
        ['HINCRBY', pagesDayKey, path, 1],
        ['EXPIRE', pagesDayKey, DAILY_TTL_SECONDS, 'NX'],
        ['HINCRBY', 'pa:pages:all', path, 1],
      ]);
      return NextResponse.json({ ok: true });
    }

    const delta = clampNumber(body.deltaActiveSeconds, 0, MAX_DELTA_SECONDS, 0);
    const prevActive = Number(sess.activeSeconds) || 0;
    const prevPageCount = Number(sess.pageCount) || 1;
    const incomingPageCount = clampNumber(body.pageCount, prevPageCount, MAX_PAGE_COUNT, prevPageCount);
    const totalActive = prevActive + delta;

    const cmds: RedisCommand[] = [
      ['HSET', sessionKey, 'activeSeconds', totalActive, 'pageCount', incomingPageCount, 'lastPath', path],
      ['EXPIRE', sessionKey, SESSION_TTL_SECONDS],
    ];

    if (delta > 0) {
      cmds.push(['HINCRBY', dailyKey, 'totalActiveSeconds', delta]);
    }

    if (action === 'heartbeat') {
      cmds.push(['ZADD', 'pa:active', nowMs, sessionId]);
      cmds.push(['ZREMRANGEBYSCORE', 'pa:active', '-inf', nowMs - ACTIVE_WINDOW_MS]);
    }

    if (action === 'end') {
      cmds.push(['ZREM', 'pa:active', sessionId]);
      // Only count completion & bounce once per session (guards against duplicate pagehide beacons)
      if (sess.ended !== '1') {
        cmds.push(['HSET', sessionKey, 'ended', 1]);
        cmds.push(['HINCRBY', dailyKey, 'completedSessions', 1]);
        if (incomingPageCount <= BOUNCE_MAX_PAGE_COUNT && totalActive <= BOUNCE_MAX_ACTIVE_SECONDS) {
          cmds.push(['HINCRBY', dailyKey, 'bounces', 1]);
        }
      }
    }

    await kvPipeline(cmds);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[analytics/track] error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
