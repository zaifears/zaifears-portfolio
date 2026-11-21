import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthenticated } from '@/lib/adminAuth';
import { isKvConfigured, kvPipeline, parseHashResult, type RedisCommand } from '@/lib/kv';
import { getDhakaDateKey, getLastNDhakaDateKeys } from '@/lib/analytics/dhakaTime';
import { getCountryName, SOURCE_BUCKETS, type TrafficSourceBucket } from '@/lib/analytics/helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TREND_DAYS = 30;
const ACTIVE_WINDOW_MS = 16 * 60 * 1000;

export interface DailyTrendPoint {
  dateKey: string;
  uniqueVisitors: number;
  sessions: number;
  pageviews: number;
  avgSeconds: number;
}

export interface HourlyActivityPoint {
  hour: number;
  hourLabel: string;
  sessions30d: number;
  sessions7d: number;
}

export interface DayOfWeekPoint {
  dayIndex: number;
  day: string;
  shortDay: string;
  sessions: number;
  percentage: number;
}

export interface RankedItem {
  key: string;
  label: string;
  count: number;
  percentage: number;
}

export interface UtmRow {
  source: string;
  medium: string;
  campaign: string;
  content: string | null;
  sessions: number;
  percentage: number;
}

export interface PortfolioAnalyticsData {
  generatedAt: string;
  timezone: string;
  activeRightNow: number;
  visitors: {
    today: { unique: number; sessions: number; pageviews: number };
    last7Days: { unique: number; sessions: number; pageviews: number };
    last30Days: { unique: number; sessions: number; pageviews: number };
  };
  adTaggedSessions: { today: number; last7Days: number; last30Days: number };
  avgSessionSeconds: { today: number; last7Days: number; last30Days: number };
  bounceRate7d: number;
  newVsReturning30d: { new: number; returning: number };
  dailyTrend: DailyTrendPoint[];
  hourlyActivity: HourlyActivityPoint[];
  peakHour: { hour: number; hourLabel: string; sessions30d: number; sessions7d: number } | null;
  dayOfWeekActivity: DayOfWeekPoint[];
  peakDay: DayOfWeekPoint | null;
  deviceBreakdown: { mobile: number; desktop: number; tablet: number; unknown: number };
  browsers: RankedItem[];
  operatingSystems: RankedItem[];
  trafficSources: Record<TrafficSourceBucket, number>;
  trafficSources7d: Record<TrafficSourceBucket, number>;
  topReferrers: RankedItem[];
  topReferrers7d: RankedItem[];
  utmCampaigns: UtmRow[];
  utmCampaigns7d: UtmRow[];
  countries: RankedItem[];
  cities: RankedItem[];
  topPages7d: RankedItem[];
  topPages30d: RankedItem[];
  topPagesAllTime: RankedItem[];
}

function num(map: Record<string, string>, field: string): number {
  return Number(map[field] || 0) || 0;
}

function mergeHashes(hashes: Record<string, string>[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const h of hashes) {
    for (const [k, v] of Object.entries(h)) {
      const n = Number(v) || 0;
      if (n > 0) totals.set(k, (totals.get(k) || 0) + n);
    }
  }
  return totals;
}

function toRankedList(
  totals: Map<string, number>,
  limit: number,
  labelFn?: (key: string) => string
): RankedItem[] {
  const grandTotal = Array.from(totals.values()).reduce((a, b) => a + b, 0);
  return Array.from(totals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, count]) => ({
      key,
      label: labelFn ? labelFn(key) : key,
      count,
      percentage: grandTotal > 0 ? Math.round((count / grandTotal) * 100) : 0,
    }));
}

export async function GET(req: NextRequest) {
  if (!isAdminRequestAuthenticated(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isKvConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Vercel KV / Redis environment variables are not configured.' },
      { status: 503 }
    );
  }

  try {
    const todayKey = getDhakaDateKey(0);
    const keys30 = getLastNDhakaDateKeys(TREND_DAYS); // oldest → newest
    const keys7 = keys30.slice(-7);
    const uvKeys30 = keys30.map((k) => `pa:uv:${k}`);
    const uvKeys7 = keys7.map((k) => `pa:uv:${k}`);
    const nowMs = Date.now();

    // Pipeline 1: daily hashes + per-day UV counts + 7d/30d merged UV counts + active-now + all-time pages
    const p1: RedisCommand[] = [
      ['ZCOUNT', 'pa:active', nowMs - ACTIVE_WINDOW_MS, '+inf'],
      ['PFCOUNT', `pa:uv:${todayKey}`],
      ['PFCOUNT', ...uvKeys7],
      ['PFCOUNT', ...uvKeys30],
      ['HGETALL', 'pa:pages:all'],
      ...keys30.map((k): RedisCommand => ['HGETALL', `pa:d:${k}`]),
      ...keys30.map((k): RedisCommand => ['PFCOUNT', `pa:uv:${k}`]),
    ];

    // Pipeline 2: geo (country + city), referrers, UTM, pages (30d), browser, OS
    const p2: RedisCommand[] = [
      ...keys30.map((k): RedisCommand => ['HGETALL', `pa:geo:country:${k}`]),
      ...keys30.map((k): RedisCommand => ['HGETALL', `pa:geo:city:${k}`]),
      ...keys30.map((k): RedisCommand => ['HGETALL', `pa:ref:${k}`]),
      ...keys30.map((k): RedisCommand => ['HGETALL', `pa:utm:${k}`]),
      ...keys30.map((k): RedisCommand => ['HGETALL', `pa:pages:${k}`]),
      ...keys30.map((k): RedisCommand => ['HGETALL', `pa:browser:${k}`]),
      ...keys30.map((k): RedisCommand => ['HGETALL', `pa:os:${k}`]),
    ];

    const [res1, res2] = await Promise.all([kvPipeline(p1), kvPipeline(p2)]);

    const activeRightNow = Number(res1[0] || 0);
    const uniqueToday = Number(res1[1] || 0);
    const unique7d = Number(res1[2] || 0);
    const unique30d = Number(res1[3] || 0);
    const allTimePagesHash = parseHashResult(res1[4]);

    const dailyHashes: Record<string, string>[] = [];
    const dailyUvCounts: number[] = [];
    for (let i = 0; i < TREND_DAYS; i++) {
      dailyHashes.push(parseHashResult(res1[5 + i]));
      dailyUvCounts.push(Number(res1[5 + TREND_DAYS + i] || 0));
    }

    const dailyByKey = new Map<string, Record<string, string>>();
    keys30.forEach((k, i) => dailyByKey.set(k, dailyHashes[i]));

    const sumField = (dateKeys: string[], field: string) =>
      dateKeys.reduce((acc, k) => acc + num(dailyByKey.get(k) || {}, field), 0);

    const avgSecondsFor = (dateKeys: string[]) => {
      const secs = sumField(dateKeys, 'totalActiveSeconds');
      const completed = sumField(dateKeys, 'completedSessions');
      return completed > 0 ? Math.round(secs / completed) : 0;
    };

    const todayHash = dailyByKey.get(todayKey) || {};
    const visitors = {
      today: {
        unique: uniqueToday,
        sessions: num(todayHash, 'sessions'),
        pageviews: num(todayHash, 'pageviews'),
      },
      last7Days: {
        unique: unique7d,
        sessions: sumField(keys7, 'sessions'),
        pageviews: sumField(keys7, 'pageviews'),
      },
      last30Days: {
        unique: unique30d,
        sessions: sumField(keys30, 'sessions'),
        pageviews: sumField(keys30, 'pageviews'),
      },
    };

    const avgSessionSeconds = {
      today: avgSecondsFor([todayKey]),
      last7Days: avgSecondsFor(keys7),
      last30Days: avgSecondsFor(keys30),
    };

    const bounces7d = sumField(keys7, 'bounces');
    const completed7d = sumField(keys7, 'completedSessions');
    const bounceRate7d = completed7d > 0 ? Math.round((bounces7d / completed7d) * 100) : 0;

    const newVsReturning30d = {
      new: sumField(keys30, 'newVisitors'),
      returning: sumField(keys30, 'returningVisitors'),
    };

    const dailyTrend: DailyTrendPoint[] = keys30.map((k, i) => {
      const h = dailyHashes[i];
      const completed = num(h, 'completedSessions');
      const totalSec = num(h, 'totalActiveSeconds');
      return {
        dateKey: k,
        uniqueVisitors: dailyUvCounts[i],
        sessions: num(h, 'sessions'),
        pageviews: num(h, 'pageviews'),
        avgSeconds: completed > 0 ? Math.round(totalSec / completed) : 0,
      };
    });

    const hourlyActivity: HourlyActivityPoint[] = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      hourLabel: `${String(hour).padStart(2, '0')}:00`,
      sessions30d: sumField(keys30, `hour_${hour}`),
      sessions7d: sumField(keys7, `hour_${hour}`),
    }));

    const peakHourCandidate = hourlyActivity.reduce<HourlyActivityPoint | null>(
      (best, cur) => (!best || cur.sessions30d > best.sessions30d ? cur : best),
      null
    );
    const peakHour = peakHourCandidate && peakHourCandidate.sessions30d > 0 ? peakHourCandidate : null;

    const DAYS = [
      { idx: 0, day: 'Sunday', shortDay: 'Sun' },
      { idx: 1, day: 'Monday', shortDay: 'Mon' },
      { idx: 2, day: 'Tuesday', shortDay: 'Tue' },
      { idx: 3, day: 'Wednesday', shortDay: 'Wed' },
      { idx: 4, day: 'Thursday', shortDay: 'Thu' },
      { idx: 5, day: 'Friday', shortDay: 'Fri' },
      { idx: 6, day: 'Saturday', shortDay: 'Sat' },
    ];
    const dowCounts = new Array<number>(7).fill(0);
    keys30.forEach((k, i) => {
      const [y, m, d] = k.split('-').map(Number);
      const dow = new Date(Date.UTC(y, m - 1, d, 12, 0, 0)).getUTCDay();
      dowCounts[dow] += num(dailyHashes[i], 'sessions');
    });
    const dowTotal = dowCounts.reduce((a, b) => a + b, 0);
    const dayOfWeekActivity: DayOfWeekPoint[] = DAYS.map((d) => ({
      dayIndex: d.idx,
      day: d.day,
      shortDay: d.shortDay,
      sessions: dowCounts[d.idx],
      percentage: dowTotal > 0 ? Math.round((dowCounts[d.idx] / dowTotal) * 100) : 0,
    }));
    const peakDayCandidate = dayOfWeekActivity.reduce<DayOfWeekPoint | null>(
      (best, cur) => (!best || cur.sessions > best.sessions ? cur : best),
      null
    );
    const peakDay = peakDayCandidate && peakDayCandidate.sessions > 0 ? peakDayCandidate : null;

    const deviceBreakdown = {
      mobile: sumField(keys30, 'device_mobile'),
      desktop: sumField(keys30, 'device_desktop'),
      tablet: sumField(keys30, 'device_tablet'),
      unknown: sumField(keys30, 'device_unknown'),
    };

    const trafficSources = Object.fromEntries(
      SOURCE_BUCKETS.map((b) => [b, sumField(keys30, `source_${b}`)])
    ) as Record<TrafficSourceBucket, number>;

    const trafficSources7d = Object.fromEntries(
      SOURCE_BUCKETS.map((b) => [b, sumField(keys7, `source_${b}`)])
    ) as Record<TrafficSourceBucket, number>;

    const adTaggedSessions = {
      today: num(todayHash, 'adTaggedSessions'),
      last7Days: sumField(keys7, 'adTaggedSessions'),
      last30Days: sumField(keys30, 'adTaggedSessions'),
    };

    // Slice Pipeline 2 into its 7 groups of 30 hashes
    const sliceHashes = (groupIndex: number) =>
      res2
        .slice(groupIndex * TREND_DAYS, (groupIndex + 1) * TREND_DAYS)
        .map((r) => parseHashResult(r));

    const countryHashes = sliceHashes(0);
    const cityHashes = sliceHashes(1);
    const refHashes = sliceHashes(2);
    const utmHashes = sliceHashes(3);
    const pagesHashes = sliceHashes(4);
    const browserHashes = sliceHashes(5);
    const osHashes = sliceHashes(6);

    const countryMap = mergeHashes(countryHashes);
    const cityMap = mergeHashes(cityHashes);
    const refMap30 = mergeHashes(refHashes);
    const refMap7 = mergeHashes(refHashes.slice(-7));
    const utmMap30 = mergeHashes(utmHashes);
    const utmMap7 = mergeHashes(utmHashes.slice(-7));
    const pagesMap30 = mergeHashes(pagesHashes);
    const pagesMap7 = mergeHashes(pagesHashes.slice(-7));
    const browserMap = mergeHashes(browserHashes);
    const osMap = mergeHashes(osHashes);
    const pagesAllMap = mergeHashes([allTimePagesHash]);

    const toUtmRows = (map: Map<string, number>): UtmRow[] => {
      const total = Array.from(map.values()).reduce((a, b) => a + b, 0);
      return Array.from(map.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 25)
        .map(([rawKey, sessions]) => {
          const [source = '(none)', medium = '(none)', campaign = '(none)', content = null] =
            rawKey.split(' | ');
          return {
            source,
            medium,
            campaign,
            content: content || null,
            sessions,
            percentage: total > 0 ? Math.round((sessions / total) * 100) : 0,
          };
        });
    };

    const utmCampaigns = toUtmRows(utmMap30);
    const utmCampaigns7d = toUtmRows(utmMap7);

    const data: PortfolioAnalyticsData = {
      generatedAt: new Date().toISOString(),
      timezone: 'Asia/Dhaka (BST, UTC+6)',
      activeRightNow,
      visitors,
      adTaggedSessions,
      avgSessionSeconds,
      bounceRate7d,
      newVsReturning30d,
      dailyTrend,
      hourlyActivity,
      peakHour,
      dayOfWeekActivity,
      peakDay,
      deviceBreakdown,
      browsers: toRankedList(browserMap, 8),
      operatingSystems: toRankedList(osMap, 8),
      trafficSources,
      trafficSources7d,
      topReferrers: toRankedList(refMap30, 15),
      topReferrers7d: toRankedList(refMap7, 15),
      utmCampaigns,
      utmCampaigns7d,
      countries: toRankedList(countryMap, 20, (code) => getCountryName(code)),
      cities: toRankedList(cityMap, 20),
      topPages7d: toRankedList(pagesMap7, 25),
      topPages30d: toRankedList(pagesMap30, 25),
      topPagesAllTime: toRankedList(pagesAllMap, 25),
    };

    return NextResponse.json(
      { ok: true, data },
      { headers: { 'Cache-Control': 'private, max-age=30' } }
    );
  } catch (error) {
    console.error('[admin/analytics] error:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to load analytics from Redis/KV.' },
      { status: 500 }
    );
  }
}
