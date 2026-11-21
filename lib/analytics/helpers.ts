import crypto from 'crypto';

export type TrafficSourceBucket =
  | 'direct'
  | 'internal'
  | 'search_google'
  | 'search_other'
  | 'social'
  | 'other';

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'unknown';

export const SOURCE_BUCKETS: readonly TrafficSourceBucket[] = [
  'direct',
  'internal',
  'search_google',
  'search_other',
  'social',
  'other',
] as const;

const SOCIAL_HOSTS = [
  'facebook.com',
  'fb.com',
  'l.facebook.com',
  'm.facebook.com',
  'instagram.com',
  'l.instagram.com',
  'twitter.com',
  'x.com',
  't.co',
  'linkedin.com',
  'lnkd.in',
  'tiktok.com',
  'reddit.com',
  'pinterest.com',
  'youtube.com',
  'youtu.be',
  'wa.me',
  'whatsapp.com',
  'telegram.org',
  't.me',
  'threads.net',
  'discord.com',
];

const SEARCH_HOSTS = [
  'bing.com',
  'yahoo.com',
  'duckduckgo.com',
  'baidu.com',
  'yandex.',
  'ecosia.org',
  'search.brave.com',
  'perplexity.ai',
  'chatgpt.com',
];

const BOT_UA_PATTERN =
  /bot|crawl|spider|slurp|mediapartners|headlesschrome|phantomjs|puppeteer|playwright|lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot|curl\/|wget\/|python-requests|go-http-client|axios\/|node-fetch|vercel-screenshot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|applebot|bytespider|claudebot|gptbot|oai-searchbot|perplexitybot/i;

export function isBotUserAgent(ua: string | null | undefined): boolean {
  if (!ua || ua.trim().length < 8) return true;
  return BOT_UA_PATTERN.test(ua);
}

/**
 * Extract client IP transiently from proxy headers.
 * NEVER persist the returned IP string — pass it straight into `hashVisitorFingerprint`
 * or `hashRateLimitKey` so raw IPs never touch storage or logs.
 */
export function getTransientClientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  const cfIp = headers.get('cf-connecting-ip')?.trim();
  if (cfIp) return cfIp;
  return '0.0.0.0';
}

function getHashSaltSecret(): string {
  return (
    process.env.ANALYTICS_HASH_SALT ||
    process.env.ADMIN_PASSWORD ||
    process.env.ANALYTICS_KV_REST_API_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    'portfolio-analytics-default-salt'
  );
}

/**
 * Privacy-first, non-reversible visitor fingerprint (Option A).
 * Rotates automatically every month (`YYYY-MM`) so unique visitors are deduplicated
 * across 7d/30d windows without ever storing raw IPs or enabling long-term tracking.
 */
export function hashVisitorFingerprint(ip: string, userAgent: string, monthKey: string): string {
  const secret = `${getHashSaltSecret()}:visitor:${monthKey}`;
  return crypto
    .createHmac('sha256', secret)
    .update(`${ip}|${userAgent.slice(0, 180)}`)
    .digest('hex')
    .slice(0, 24);
}

/**
 * Short-lived rate-limit key derived from IP (never stores raw IP in Redis keys).
 */
export function hashRateLimitKey(scope: string, ip: string): string {
  const secret = `${getHashSaltSecret()}:rl:${scope}`;
  return crypto.createHmac('sha256', secret).update(ip).digest('hex').slice(0, 16);
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export interface GeoInfo {
  countryCode: string; // ISO-2 uppercase (e.g. 'BD', 'US') or 'UNKNOWN'
  cityLabel: string;   // e.g. 'Dhaka, BD' or 'Unknown'
}

/**
 * Read Vercel's free edge IP-geolocation headers and normalize them globally.
 * No raw IP is stored; only coarse Country + City.
 */
export function extractGeoFromHeaders(headers: Headers): GeoInfo {
  const rawCountry = headers.get('x-vercel-ip-country') || headers.get('cf-ipcountry');
  const rawCity = headers.get('x-vercel-ip-city');

  const countryCode = rawCountry
    ? safeDecode(rawCountry).trim().toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2) || 'UNKNOWN'
    : 'UNKNOWN';

  if (countryCode === 'UNKNOWN' || countryCode === 'XX') {
    return { countryCode: 'UNKNOWN', cityLabel: 'Unknown' };
  }

  let city = rawCity ? safeDecode(rawCity).trim() : '';
  // Normalize common Bangladesh city spellings
  if (countryCode === 'BD' && city) {
    const lower = city.toLowerCase();
    if (lower === 'chittagong') city = 'Chattogram';
    else if (lower === 'barisal') city = 'Barishal';
    else if (lower === 'mymensing') city = 'Mymensingh';
  }

  // Keep city labels clean and bounded
  city = city.replace(/[^\p{L}\p{N}\s\-'.]/gu, '').trim().slice(0, 48);
  const cityLabel = city ? `${city}, ${countryCode}` : `Other (${countryCode})`;

  return { countryCode, cityLabel };
}

/**
 * Convert an ISO-2 country code (e.g. 'BD', 'US') to a readable English country name.
 */
export function getCountryName(code: string): string {
  if (!code || code === 'UNKNOWN') return 'Unknown';
  try {
    const dn = new Intl.DisplayNames(['en'], { type: 'region' });
    return dn.of(code) || code;
  } catch {
    return code;
  }
}

/**
 * Extract normalized hostname from a referrer URL, or null if direct/invalid.
 */
export function extractReferrerDomain(referrer: string | null | undefined): string | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.toLowerCase().replace(/^www\./, '');
    if (!host || host.length > 120) return null;
    return host;
  } catch {
    return null;
  }
}

/**
 * Bucket a referrer URL into a traffic-source category.
 */
export function categorizeReferrer(
  referrer: string | null | undefined,
  ownHostname: string
): { bucket: TrafficSourceBucket; domain: string | null } {
  const domain = extractReferrerDomain(referrer);
  if (!domain) return { bucket: 'direct', domain: null };

  const cleanOwn = ownHostname.toLowerCase().replace(/^www\./, '');
  if (cleanOwn && (domain === cleanOwn || domain.endsWith(`.${cleanOwn}`))) {
    return { bucket: 'internal', domain: null };
  }
  if (domain.includes('google.')) return { bucket: 'search_google', domain };
  if (SEARCH_HOSTS.some((h) => domain === h || domain.endsWith(`.${h}`) || domain.includes(h))) {
    return { bucket: 'search_other', domain };
  }
  if (SOCIAL_HOSTS.some((h) => domain === h || domain.endsWith(`.${h}`))) {
    return { bucket: 'social', domain };
  }
  return { bucket: 'other', domain };
}

/**
 * Normalize a URL path for "Most Visited Pages" aggregation.
 */
export function normalizeAnalyticsPath(rawPath: string | null | undefined): string {
  let cleaned = (rawPath || '/').split('?')[0].split('#')[0].trim();
  if (!cleaned.startsWith('/')) cleaned = `/${cleaned}`;
  if (cleaned.length > 1 && cleaned.endsWith('/')) {
    cleaned = cleaned.slice(0, -1);
  }
  // Collapse multiple slashes
  cleaned = cleaned.replace(/\/{2,}/g, '/');
  return cleaned.slice(0, 180) || '/';
}

export function isIgnoredPath(path: string): boolean {
  const norm = normalizeAnalyticsPath(path).toLowerCase();
  return norm === '/admin' || norm.startsWith('/admin/') || norm.startsWith('/api/');
}

export function detectDeviceFromUA(ua: string | null | undefined): DeviceType {
  if (!ua) return 'unknown';
  const lower = ua.toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))/i.test(lower)) return 'tablet';
  if (/mobile|iphone|ipod|android/i.test(lower)) return 'mobile';
  return 'desktop';
}

export function detectBrowserFromUA(ua: string | null | undefined): string {
  if (!ua) return 'Other';
  if (/edg\//i.test(ua)) return 'Edge';
  if (/opr\/|opera/i.test(ua)) return 'Opera';
  if (/samsungbrowser/i.test(ua)) return 'Samsung Internet';
  if (/firefox|fxios/i.test(ua)) return 'Firefox';
  if (/chrome|crios/i.test(ua) && !/edg\//i.test(ua)) return 'Chrome';
  if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) return 'Safari';
  return 'Other';
}

export function detectOsFromUA(ua: string | null | undefined): string {
  if (!ua) return 'Other';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  if (/android/i.test(ua)) return 'Android';
  if (/windows/i.test(ua)) return 'Windows';
  if (/mac os x|macintosh/i.test(ua)) return 'macOS';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Other';
}

export function sanitizeUtmValue(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const cleaned = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_\-. ]/g, '')
    .slice(0, 60);
  return cleaned || null;
}

export type AdClickIdType = 'fbclid' | 'gclid' | 'ttclid' | 'li_fat_id' | 'msclkid';

const AD_CLICK_ID_PLATFORMS: Record<
  AdClickIdType,
  { bucket: TrafficSourceBucket; domain: string; source: string; medium: string }
> = {
  fbclid: { bucket: 'social', domain: 'facebook.com', source: 'facebook', medium: 'paid_social' },
  gclid: { bucket: 'search_google', domain: 'google.com', source: 'google', medium: 'cpc' },
  ttclid: { bucket: 'social', domain: 'tiktok.com', source: 'tiktok', medium: 'paid_social' },
  li_fat_id: { bucket: 'social', domain: 'linkedin.com', source: 'linkedin', medium: 'paid_social' },
  msclkid: { bucket: 'search_other', domain: 'bing.com', source: 'bing', medium: 'cpc' },
};

const VALID_CLICK_ID_TYPES = new Set<string>(Object.keys(AD_CLICK_ID_PLATFORMS));

export function sanitizeClickIdType(value: unknown): AdClickIdType | null {
  if (typeof value !== 'string') return null;
  const clean = value.trim().toLowerCase();
  return VALID_CLICK_ID_TYPES.has(clean) ? (clean as AdClickIdType) : null;
}

export function inferAdPlatformFromClickId(clickIdType: AdClickIdType | null) {
  if (!clickIdType) return null;
  return AD_CLICK_ID_PLATFORMS[clickIdType] || null;
}

function classifyUtmSourceBucket(utmSource: string): TrafficSourceBucket {
  const s = utmSource.toLowerCase();
  if (s === 'google' || s.includes('google')) return 'search_google';
  if (
    /^(fb|facebook|ig|instagram|linkedin|li|twitter|x|tiktok|tt|youtube|yt|reddit|whatsapp|wa|telegram|tg|threads|pinterest|discord)/.test(
      s
    )
  ) {
    return 'social';
  }
  if (/^(bing|yahoo|duckduckgo|chatgpt|perplexity|claude|baidu|yandex|brave)/.test(s)) {
    return 'search_other';
  }
  return 'other';
}

/**
 * Combines document.referrer, UTM tags, and ad click IDs so mobile in-app
 * browsers (which often strip document.referrer) are never miscounted as Direct.
 */
export function categorizeTrafficSource(params: {
  referrer: string | null | undefined;
  ownHostname: string;
  utmSource: string | null;
  clickIdType: AdClickIdType | null;
}): { bucket: TrafficSourceBucket; domain: string | null; isPaidOrTagged: boolean } {
  const fromRef = categorizeReferrer(params.referrer, params.ownHostname);
  const fromClick = inferAdPlatformFromClickId(params.clickIdType);
  const isPaidOrTagged = Boolean(params.utmSource || fromClick);

  if (fromRef.bucket !== 'direct') {
    return {
      bucket: fromRef.bucket,
      domain: fromRef.domain,
      isPaidOrTagged,
    };
  }

  // Referrer was empty/stripped — recover attribution from utm_source or ad click ID
  if (params.utmSource) {
    return {
      bucket: classifyUtmSourceBucket(params.utmSource),
      domain: fromClick?.domain || params.utmSource,
      isPaidOrTagged: true,
    };
  }

  if (fromClick) {
    return {
      bucket: fromClick.bucket,
      domain: fromClick.domain,
      isPaidOrTagged: true,
    };
  }

  return { bucket: 'direct', domain: null, isPaidOrTagged: false };
}

export function buildUtmKey(
  source: string | null,
  medium: string | null,
  campaign: string | null,
  content: string | null = null
): string | null {
  if (!source && !medium && !campaign && !content) return null;
  const base = `${source || '(none)'} | ${medium || '(none)'} | ${campaign || '(none)'}`;
  return content ? `${base} | ${content}` : base;
}

export function clampNumber(value: unknown, min: number, max: number, fallback: number): number {
  const n = typeof value === 'number' && Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, n));
}

export function isPlausibleSessionId(value: unknown): value is string {
  return typeof value === 'string' && /^[a-zA-Z0-9_-]{8,80}$/.test(value);
}
