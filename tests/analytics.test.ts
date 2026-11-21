import test from 'node:test';
import assert from 'node:assert/strict';
import { getDhakaDateKey, getDhakaHour, getLastNDhakaDateKeys } from '../lib/analytics/dhakaTime';
import {
  buildUtmKey,
  categorizeTrafficSource,
  categorizeReferrer,
  detectBrowserFromUA,
  detectDeviceFromUA,
  detectOsFromUA,
  extractGeoFromHeaders,
  getCountryName,
  hashVisitorFingerprint,
  inferAdPlatformFromClickId,
  isBotUserAgent,
  isIgnoredPath,
  normalizeAnalyticsPath,
  sanitizeUtmValue,
} from '../lib/analytics/helpers';
import {
  createAdminSessionToken,
  verifyAdminPassword,
  verifyAdminSessionToken,
} from '../lib/adminAuth';

test('dhakaTime produces UTC+6 date keys and hours', () => {
  // 2026-05-10T20:30:00Z is 2026-05-11 02:30 in Asia/Dhaka (+06:00)
  const instant = new Date('2026-05-10T20:30:00.000Z');
  assert.equal(getDhakaDateKey(0, instant), '2026-05-11');
  assert.equal(getDhakaDateKey(1, instant), '2026-05-10');
  assert.equal(getDhakaHour(instant), 2);
  assert.deepEqual(getLastNDhakaDateKeys(3, instant), ['2026-05-09', '2026-05-10', '2026-05-11']);
});

test('hashVisitorFingerprint is deterministic within month, rotates across months, and never contains raw IP', () => {
  const ip = '103.120.45.67';
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0';
  const h1 = hashVisitorFingerprint(ip, ua, '2026-11');
  const h2 = hashVisitorFingerprint(ip, ua, '2026-11');
  const h3 = hashVisitorFingerprint(ip, ua, '2026-12');

  assert.equal(h1, h2);
  assert.notEqual(h1, h3);
  assert.equal(h1.includes(ip), false);
  assert.equal(h1.length, 24);
});

test('extractGeoFromHeaders handles Bangladesh aliases, global countries, and missing headers', () => {
  const bdHeaders = new Headers({
    'x-vercel-ip-country': 'BD',
    'x-vercel-ip-city': 'Chittagong',
  });
  assert.deepEqual(extractGeoFromHeaders(bdHeaders), {
    countryCode: 'BD',
    cityLabel: 'Chattogram, BD',
  });

  const ukHeaders = new Headers({
    'x-vercel-ip-country': 'GB',
    'x-vercel-ip-city': 'London',
  });
  assert.deepEqual(extractGeoFromHeaders(ukHeaders), {
    countryCode: 'GB',
    cityLabel: 'London, GB',
  });
  assert.equal(getCountryName('GB'), 'United Kingdom');

  assert.deepEqual(extractGeoFromHeaders(new Headers()), {
    countryCode: 'UNKNOWN',
    cityLabel: 'Unknown',
  });
});

test('categorizeReferrer buckets direct, internal, Google, AI search, social, and other', () => {
  assert.deepEqual(categorizeReferrer(null, 'shahoriar.bd'), { bucket: 'direct', domain: null });
  assert.deepEqual(categorizeReferrer('https://shahoriar.bd/skills', 'shahoriar.bd'), {
    bucket: 'internal',
    domain: null,
  });
  assert.deepEqual(categorizeReferrer('https://www.google.com/search?q=shahoriar', 'shahoriar.bd'), {
    bucket: 'search_google',
    domain: 'google.com',
  });
  assert.deepEqual(categorizeReferrer('https://chatgpt.com/', 'shahoriar.bd'), {
    bucket: 'search_other',
    domain: 'chatgpt.com',
  });
  assert.deepEqual(categorizeReferrer('https://www.linkedin.com/in/shahoriarhossain', 'shahoriar.bd'), {
    bucket: 'social',
    domain: 'linkedin.com',
  });
  assert.deepEqual(categorizeReferrer('https://github.com/zaifears', 'shahoriar.bd'), {
    bucket: 'other',
    domain: 'github.com',
  });
});

test('path normalization, ignored paths, bot detection, device/browser/OS, and UTM keys', () => {
  assert.equal(normalizeAnalyticsPath('/life/my-post/?utm_source=fb#top'), '/life/my-post');
  assert.equal(normalizeAnalyticsPath('/'), '/');
  assert.equal(isIgnoredPath('/admin'), true);
  assert.equal(isIgnoredPath('/admin/settings'), true);
  assert.equal(isIgnoredPath('/skills'), false);

  assert.equal(isBotUserAgent('Googlebot/2.1 (+http://www.google.com/bot.html)'), true);
  assert.equal(
    isBotUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1'),
    false
  );

  const iosUa = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1';
  assert.equal(detectDeviceFromUA(iosUa), 'mobile');
  assert.equal(detectBrowserFromUA(iosUa), 'Safari');
  assert.equal(detectOsFromUA(iosUa), 'iOS');

  assert.equal(
    buildUtmKey(sanitizeUtmValue('Facebook'), sanitizeUtmValue('CPC'), sanitizeUtmValue('Q4-Launch')),
    'facebook | cpc | q4-launch'
  );
  assert.equal(
    buildUtmKey(
      sanitizeUtmValue('Facebook'),
      sanitizeUtmValue('CPC'),
      sanitizeUtmValue('Q4-Launch'),
      sanitizeUtmValue('Video-A')
    ),
    'facebook | cpc | q4-launch | video-a'
  );
  assert.equal(buildUtmKey(null, null, null), null);
});

test('inferAdPlatformFromClickId and categorizeTrafficSource recover stripped mobile referrers', () => {
  assert.deepEqual(inferAdPlatformFromClickId('fbclid'), {
    bucket: 'social',
    domain: 'facebook.com',
    source: 'facebook',
    medium: 'paid_social',
  });
  assert.deepEqual(inferAdPlatformFromClickId('gclid'), {
    bucket: 'search_google',
    domain: 'google.com',
    source: 'google',
    medium: 'cpc',
  });
  assert.equal(inferAdPlatformFromClickId(null), null);

  // Mobile in-app browser strips document.referrer, but utm_source=instagram is present
  assert.deepEqual(
    categorizeTrafficSource({
      referrer: null,
      ownHostname: 'shahoriar.bd',
      utmSource: 'instagram',
      clickIdType: null,
    }),
    { bucket: 'social', domain: 'instagram', isPaidOrTagged: true }
  );

  // Ad click with fbclid and no referrer or UTMs
  assert.deepEqual(
    categorizeTrafficSource({
      referrer: null,
      ownHostname: 'shahoriar.bd',
      utmSource: null,
      clickIdType: 'fbclid',
    }),
    { bucket: 'social', domain: 'facebook.com', isPaidOrTagged: true }
  );

  // Genuine direct visit
  assert.deepEqual(
    categorizeTrafficSource({
      referrer: null,
      ownHostname: 'shahoriar.bd',
      utmSource: null,
      clickIdType: null,
    }),
    { bucket: 'direct', domain: null, isPaidOrTagged: false }
  );
});

test('adminAuth verifies password in constant time and validates signed expiring tokens', () => {
  const prev = process.env.ADMIN_PASSWORD;
  process.env.ADMIN_PASSWORD = 'super-secret-test-password';
  try {
    assert.equal(verifyAdminPassword('super-secret-test-password'), true);
    assert.equal(verifyAdminPassword('wrong-password'), false);

    const now = 1_700_000_000_000;
    const token = createAdminSessionToken(now);
    assert.equal(verifyAdminSessionToken(token, now + 60_000), true);
    // Expired 8 days later
    assert.equal(verifyAdminSessionToken(token, now + 8 * 86400_000), false);
    // Tampered token
    assert.equal(verifyAdminSessionToken(`${token}x`, now + 60_000), false);
  } finally {
    if (prev === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = prev;
  }
});
