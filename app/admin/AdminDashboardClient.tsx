'use client';

import { useCallback, useEffect, useMemo, useState, type FormEvent, type MouseEvent, type ReactNode, type TouchEvent } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowLeft,
  Check,
  Clock,
  Compass,
  Copy,
  Download,
  Eye,
  FileText,
  Globe,
  Link2,
  Lock,
  LogOut,
  MapPin,
  Monitor,
  Radio,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Tag,
  TrendingUp,
  Users,
} from 'lucide-react';
import type {
  DailyTrendPoint,
  HourlyActivityPoint,
  PortfolioAnalyticsData,
  RankedItem,
} from '@/app/api/admin/analytics/route';

// ── Formatting helpers ──────────────────────────────────────────────────

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return n.toLocaleString();
}

function formatDuration(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return '0s';
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
  if (m > 0) return `${m}m ${String(s).padStart(2, '0')}s`;
  return `${s}s`;
}

function formatDateShort(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  if (!y || !m || !d) return dateKey;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function formatHour12(hour: number): string {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h} ${suffix}`;
}

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function buildMarkdownReport(data: PortfolioAnalyticsData): string {
  const lines = [
    `# Portfolio Analytics Report (shahoriar.bd)`,
    `Generated: ${data.generatedAt} | Timezone: ${data.timezone}`,
    '',
    '## Overview',
    `- Active right now: ${data.activeRightNow}`,
    `- Today: ${data.visitors.today.unique} unique visitors / ${data.visitors.today.sessions} sessions / ${data.visitors.today.pageviews} pageviews`,
    `- Last 7 Days: ${data.visitors.last7Days.unique} unique / ${data.visitors.last7Days.sessions} sessions / ${data.visitors.last7Days.pageviews} pageviews`,
    `- Last 30 Days: ${data.visitors.last30Days.unique} unique / ${data.visitors.last30Days.sessions} sessions / ${data.visitors.last30Days.pageviews} pageviews`,
    `- Avg Session Duration (7d): ${formatDuration(data.avgSessionSeconds.last7Days)} | Bounce Rate (7d): ${data.bounceRate7d}%`,
    `- Peak Hour (BST): ${data.peakHour ? `${formatHour12(data.peakHour.hour)} (${data.peakHour.sessions30d} sessions)` : 'N/A'}`,
    `- Peak Day: ${data.peakDay ? `${data.peakDay.day} (${data.peakDay.sessions} sessions)` : 'N/A'}`,
    '',
    '## Top Pages (7d)',
    ...data.topPages7d.slice(0, 10).map((p, i) => `${i + 1}. \`${p.label}\` — ${p.count} views (${p.percentage}%)`),
    '',
    '## Top Pages (30d)',
    ...data.topPages30d.slice(0, 10).map((p, i) => `${i + 1}. \`${p.label}\` — ${p.count} views (${p.percentage}%)`),
    '',
    '## Top Countries (30d)',
    ...data.countries.slice(0, 10).map((c, i) => `${i + 1}. ${c.label} (${c.key}) — ${c.count} (${c.percentage}%)`),
    '',
    '## Top Cities (30d)',
    ...data.cities.slice(0, 10).map((c, i) => `${i + 1}. ${c.label} — ${c.count} (${c.percentage}%)`),
    '',
    '## Top Referrers (30d)',
    ...(data.topReferrers.length
      ? data.topReferrers.slice(0, 10).map((r, i) => `${i + 1}. ${r.label} — ${r.count} (${r.percentage}%)`)
      : ['- No external referrers recorded yet']),
    '',
    '## UTM Ad Campaigns (30d)',
    ...(data.utmCampaigns.length
      ? data.utmCampaigns.map(
          (u) =>
            `- ${u.source} / ${u.medium} / ${u.campaign}${u.content ? ` (${u.content})` : ''}: ${u.sessions} sessions (${u.percentage}%)`
        )
      : ['- No UTM campaigns recorded yet']),
  ];
  return lines.join('\n');
}

// ── Reusable UI primitives ──────────────────────────────────────────────

function Card({
  title,
  subtitle,
  icon,
  right,
  children,
  className = '',
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {icon && <span className="text-blue-600 dark:text-blue-400 shrink-0">{icon}</span>}
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
      {children}
    </section>
  );
}

function StatTile({
  label,
  value,
  sublabel,
  icon,
  pulse = false,
}: {
  label: string;
  value: string;
  sublabel?: string;
  icon: ReactNode;
  pulse?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            {pulse && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            )}
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 truncate">
              {label}
            </p>
          </div>
          <p className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1 font-mono">
            {value}
          </p>
          {sublabel && (
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 truncate">
              {sublabel}
            </p>
          )}
        </div>
        <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
}

interface Segment {
  key: string;
  label: string;
  value: number;
  className: string;
}

function SegmentBar({ segments, emptyText }: { segments: Segment[]; emptyText: string }) {
  const visible = segments.filter((s) => s.value > 0);
  const total = visible.reduce((sum, s) => sum + s.value, 0);
  if (total === 0) {
    return <p className="text-xs text-neutral-400 dark:text-neutral-500">{emptyText}</p>;
  }

  return (
    <div>
      <div className="flex w-full h-3 rounded-full overflow-hidden gap-0.5 bg-neutral-100 dark:bg-neutral-900">
        {visible.map((s) => (
          <div
            key={s.key}
            className={s.className}
            style={{ width: `${(s.value / total) * 100}%` }}
            title={`${s.label}: ${s.value.toLocaleString()}`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
        {visible.map((s) => (
          <div
            key={s.key}
            className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-300"
          >
            <span className={`w-2 h-2 rounded-full ${s.className}`} />
            <span>{s.label}</span>
            <span className="font-mono text-neutral-500 dark:text-neutral-400">
              {Math.round((s.value / total) * 100)}% ({formatCompact(s.value)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RankedBarList({
  items,
  emptyText,
  linkPaths = false,
  badgeKey = false,
}: {
  items: RankedItem[];
  emptyText: string;
  linkPaths?: boolean;
  badgeKey?: boolean;
}) {
  if (!items || items.length === 0) {
    return <p className="text-xs text-neutral-400 dark:text-neutral-500">{emptyText}</p>;
  }

  const maxCount = Math.max(...items.map((i) => i.count), 1);

  return (
    <ul className="space-y-2.5">
      {items.map((item) => {
        const barWidth = Math.max(4, Math.round((item.count / maxCount) * 100));
        return (
          <li key={item.key} className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="min-w-0 flex items-center gap-1.5">
                {badgeKey && item.key !== 'UNKNOWN' && (
                  <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-[10px] font-mono text-neutral-600 dark:text-neutral-400 shrink-0">
                    {item.key}
                  </span>
                )}
                {linkPaths ? (
                  <a
                    href={item.label}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 truncate"
                    title={item.label}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className="text-neutral-800 dark:text-neutral-200 truncate font-medium"
                    title={item.label}
                  >
                    {item.label}
                  </span>
                )}
              </div>
              <span className="font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                {formatCompact(item.count)} · {item.percentage}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// ── 30-day trend SVG chart ──────────────────────────────────────────────

type TrendMetric = 'uniqueVisitors' | 'sessions' | 'pageviews';

function TrendChart({
  data,
  metric,
}: {
  data: DailyTrendPoint[];
  metric: TrendMetric;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { points, maxY, gridValues, width, height, padding } = useMemo(() => {
    const width = 760;
    const height = 210;
    const padding = { top: 18, right: 14, bottom: 26, left: 36 };
    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    const rawMax = Math.max(...data.map((d) => d[metric]), 1);
    const magnitude = Math.pow(10, Math.max(0, Math.floor(Math.log10(rawMax))));
    const niceMax = Math.ceil(rawMax / (magnitude / 2 || 1)) * (magnitude / 2 || 1) || rawMax;
    const maxY = Math.max(niceMax, 4);

    const n = Math.max(data.length - 1, 1);
    const points = data.map((d, i) => ({
      ...d,
      val: d[metric],
      x: padding.left + (i / n) * plotW,
      y: padding.top + plotH - (d[metric] / maxY) * plotH,
    }));

    return { points, maxY, gridValues: [0, Math.round(maxY / 2), maxY], width, height, padding };
  }, [data, metric]);

  if (data.length === 0 || points.every((p) => p.val === 0)) {
    return (
      <div className="flex items-center justify-center h-[210px] text-xs text-neutral-400 dark:text-neutral-500">
        No visits recorded yet — visit any page on your portfolio to see live data populate here.
      </div>
    );
  }

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');
  const bottomY = height - padding.bottom;
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)},${bottomY} L ${points[0].x.toFixed(1)},${bottomY} Z`;
  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  const updateIndex = (clientX: number, rect: DOMRect) => {
    const relX = ((clientX - rect.left) / rect.width) * width;
    const plotW = width - padding.left - padding.right;
    const idx = Math.round(((relX - padding.left) / plotW) * (points.length - 1));
    setHoverIndex(Math.max(0, Math.min(points.length - 1, idx)));
  };

  const handleMove = (e: MouseEvent<SVGRectElement>) =>
    updateIndex(e.clientX, e.currentTarget.getBoundingClientRect());
  const handleTouch = (e: TouchEvent<SVGRectElement>) => {
    const t = e.touches[0];
    if (t) updateIndex(t.clientX, e.currentTarget.getBoundingClientRect());
  };

  const tooltipW = 148;
  const tooltipX = hovered
    ? hovered.x + 12 + tooltipW > width
      ? hovered.x - 12 - tooltipW
      : hovered.x + 12
    : 0;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[210px]" role="img" aria-label="30-day traffic trend">
      {gridValues.map((v, i) => {
        const y = padding.top + (height - padding.top - padding.bottom) * (1 - v / maxY);
        return (
          <g key={i}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={y}
              y2={y}
              stroke="currentColor"
              className="text-neutral-200 dark:text-neutral-800"
              strokeWidth={1}
            />
            <text
              x={padding.left - 6}
              y={y + 3}
              textAnchor="end"
              className="fill-neutral-400 dark:fill-neutral-500"
              fontSize="9"
            >
              {formatCompact(v)}
            </text>
          </g>
        );
      })}

      <path d={areaPath} className="fill-blue-500/10" />
      <path
        d={linePath}
        fill="none"
        className="stroke-blue-600 dark:stroke-blue-400"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r={4}
        className="fill-blue-600 dark:fill-blue-400 stroke-white dark:stroke-neutral-950"
        strokeWidth={2}
      />

      {points
        .filter((_, i) => i % Math.ceil(points.length / 6) === 0 || i === points.length - 1)
        .map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - 8}
            textAnchor="middle"
            className="fill-neutral-400 dark:fill-neutral-500"
            fontSize="9"
          >
            {formatDateShort(p.dateKey)}
          </text>
        ))}

      {hovered && (
        <g>
          <line
            x1={hovered.x}
            x2={hovered.x}
            y1={padding.top}
            y2={bottomY}
            stroke="currentColor"
            className="text-neutral-300 dark:text-neutral-700"
            strokeWidth={1}
          />
          <circle
            cx={hovered.x}
            cy={hovered.y}
            r={5}
            className="fill-blue-600 dark:fill-blue-400 stroke-white dark:stroke-neutral-950"
            strokeWidth={2}
          />
          <g transform={`translate(${tooltipX}, ${Math.max(hovered.y - 46, padding.top)})`}>
            <rect width={tooltipW} height={46} rx={8} className="fill-neutral-900 dark:fill-black" opacity={0.95} />
            <text x={10} y={16} className="fill-white" fontSize="10" fontWeight={600}>
              {formatDateShort(hovered.dateKey)}
            </text>
            <text x={10} y={30} className="fill-neutral-300" fontSize="9">
              {hovered.uniqueVisitors} unique · {hovered.sessions} sess
            </text>
            <text x={10} y={41} className="fill-neutral-400" fontSize="8.5">
              {hovered.pageviews} views · {formatDuration(hovered.avgSeconds)} avg
            </text>
          </g>
        </g>
      )}

      <rect
        x={padding.left}
        y={padding.top}
        width={width - padding.left - padding.right}
        height={height - padding.top - padding.bottom}
        fill="transparent"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
        onTouchMove={handleTouch}
        onTouchEnd={() => setHoverIndex(null)}
      />
    </svg>
  );
}

// ── 24-Hour Peak Activity Bar Chart ─────────────────────────────────────

function HourlyBarChart({
  hours,
  windowMode,
}: {
  hours: HourlyActivityPoint[];
  windowMode: '30d' | '7d';
}) {
  const values = hours.map((h) => (windowMode === '30d' ? h.sessions30d : h.sessions7d));
  const maxVal = Math.max(...values, 1);
  const total = values.reduce((a, b) => a + b, 0);

  if (total === 0) {
    return <p className="text-xs text-neutral-400 dark:text-neutral-500">No hourly data yet</p>;
  }

  return (
    <div>
      <div className="flex items-end gap-1 h-32 pt-2">
        {hours.map((h) => {
          const val = windowMode === '30d' ? h.sessions30d : h.sessions7d;
          const pct = Math.round((val / maxVal) * 100);
          const isPeak = val === maxVal && val > 0;
          return (
            <div
              key={h.hour}
              className="flex-1 flex flex-col items-center justify-end h-full group relative"
              title={`${formatHour12(h.hour)} BST (${h.hourLabel}): ${val.toLocaleString()} sessions`}
            >
              <div
                className={`w-full rounded-t transition-all ${
                  isPeak
                    ? 'bg-emerald-500 dark:bg-emerald-400'
                    : val > 0
                      ? 'bg-blue-600/80 dark:bg-blue-500/80 group-hover:bg-blue-500'
                      : 'bg-neutral-100 dark:bg-neutral-900'
                }`}
                style={{ height: `${Math.max(pct, val > 0 ? 6 : 3)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mt-1.5">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>11 PM</span>
      </div>
    </div>
  );
}

// ── Built-in UTM Ad Link Builder ────────────────────────────────────────

function UtmLinkBuilder() {
  const [path, setPath] = useState('/');
  const [source, setSource] = useState('facebook');
  const [medium, setMedium] = useState('paid_social');
  const [campaign, setCampaign] = useState('');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  const builtUrl = useMemo(() => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = new URL(`https://shahoriar.bd${cleanPath}`);
    if (source.trim()) url.searchParams.set('utm_source', source.trim().toLowerCase());
    if (medium.trim()) url.searchParams.set('utm_medium', medium.trim().toLowerCase());
    if (campaign.trim()) url.searchParams.set('utm_campaign', campaign.trim().toLowerCase().replace(/\s+/g, '-'));
    if (content.trim()) url.searchParams.set('utm_content', content.trim().toLowerCase().replace(/\s+/g, '-'));
    return url.toString();
  }, [path, source, medium, campaign, content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(builtUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked in non-HTTPS context
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-900 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          <Link2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          Campaign UTM Link Builder
        </div>
        <span className="text-[11px] text-neutral-400">Auto-tracked on shahoriar.bd</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="/projects"
          aria-label="Target path"
          className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="utm_source (facebook)"
          aria-label="UTM Source"
          className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={medium}
          onChange={(e) => setMedium(e.target.value)}
          placeholder="utm_medium (cpc)"
          aria-label="UTM Medium"
          className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
          placeholder="utm_campaign (q4-launch)"
          aria-label="UTM Campaign"
          className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="utm_content (ad-a)"
          aria-label="UTM Content"
          className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
        <span className="text-neutral-400 mr-1">Quick source:</span>
        {['facebook', 'instagram', 'linkedin', 'google', 'youtube', 'whatsapp'].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setSource(preset)}
            className={`px-2 py-0.5 rounded-lg border transition-colors ${
              source === preset
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/70 px-3 py-2">
        <code className="flex-1 text-[11px] font-mono text-neutral-700 dark:text-neutral-300 truncate">
          {builtUrl}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium shrink-0 transition-colors"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy URL'}
        </button>
      </div>
    </div>
  );
}

// ── Main Dashboard Client ───────────────────────────────────────────────

export default function AdminDashboardClient() {
  const [authState, setAuthState] = useState<'loading' | 'unconfigured' | 'locked' | 'authenticated'>('loading');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [data, setData] = useState<PortfolioAnalyticsData | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  const [trendMetric, setTrendMetric] = useState<TrendMetric>('uniqueVisitors');
  const [hourWindow, setHourWindow] = useState<'30d' | '7d'>('30d');
  const [pagesWindow, setPagesWindow] = useState<'7d' | '30d' | 'all'>('7d');
  const [pageFilter, setPageFilter] = useState('');
  const [acquisitionWindow, setAcquisitionWindow] = useState<'7d' | '30d'>('30d');

  const fetchAnalytics = useCallback(async () => {
    setLoadingData(true);
    setDataError(null);
    try {
      const res = await fetch('/api/admin/analytics', { cache: 'no-store' });
      if (res.status === 401) {
        setAuthState('locked');
        return;
      }
      const json = (await res.json()) as { ok?: boolean; data?: PortfolioAnalyticsData; error?: string };
      if (!res.ok || !json.ok || !json.data) {
        throw new Error(json.error || 'Failed to load analytics');
      }
      setData(json.data);
    } catch (err) {
      setDataError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/admin/auth', { cache: 'no-store' })
      .then((r) => r.json())
      .then((json: { configured?: boolean; authenticated?: boolean }) => {
        if (!active) return;
        if (!json.configured) {
          setAuthState('unconfigured');
        } else if (json.authenticated) {
          setAuthState('authenticated');
          fetchAnalytics();
        } else {
          setAuthState('locked');
        }
      })
      .catch(() => {
        if (active) setAuthState('locked');
      });
    return () => {
      active = false;
    };
  }, [fetchAnalytics]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setSubmitting(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setLoginError(json.error || 'Invalid password');
        return;
      }
      setPassword('');
      setAuthState('authenticated');
      fetchAnalytics();
    } catch {
      setLoginError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' }).catch(() => {});
    setData(null);
    setAuthState('locked');
  };

  // ── Loading / Unconfigured / Login States ─────────────────────────────

  if (authState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-black text-neutral-500 text-sm">
        Checking admin session…
      </div>
    );
  }

  if (authState === 'unconfigured') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-black p-6">
        <div className="max-w-md w-full rounded-2xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-neutral-950 p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
            <Lock className="w-4 h-4" />
            Admin Password Not Configured
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Add <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 font-mono">ADMIN_PASSWORD</code> to your{' '}
            <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 font-mono">.env.local</code> (and Vercel Environment Variables), then restart/redeploy to unlock this dashboard.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline pt-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (authState === 'locked') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-black p-6">
        <form
          onSubmit={handleLogin}
          className="max-w-sm w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 space-y-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-bold text-neutral-900 dark:text-white">
                Portfolio Analytics
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                shahoriar.bd · Private Admin
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="admin-pw" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Admin Password
            </label>
            <input
              id="admin-pw"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter ADMIN_PASSWORD"
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          {loginError && (
            <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg px-3 py-2">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !password.trim()}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium py-2.5 transition-colors"
          >
            {submitting ? 'Verifying…' : 'Unlock Dashboard'}
          </button>

          <div className="pt-1 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              <ArrowLeft className="w-3 h-3" /> Back to shahoriar.bd
            </Link>
          </div>
        </form>
      </div>
    );
  }

  // ── Authenticated Dashboard ───────────────────────────────────────────

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100">
      <header className="sticky top-0 z-20 border-b border-neutral-200 dark:border-neutral-800 bg-white/85 dark:bg-neutral-950/85 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              title="Back to Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight">
                shahoriar.bd · Traffic & Ad Analytics
              </h1>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Dhaka Time (BST, UTC+6) · Privacy-First (Zero Raw IPs Stored)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {data && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    downloadFile(
                      buildMarkdownReport(data),
                      `portfolio-analytics-${new Date().toISOString().slice(0, 10)}.md`,
                      'text/markdown'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" /> MD
                </button>
                <button
                  type="button"
                  onClick={() =>
                    downloadFile(
                      JSON.stringify(data, null, 2),
                      `portfolio-analytics-${new Date().toISOString().slice(0, 10)}.json`,
                      'application/json'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> JSON
                </button>
              </>
            )}
            <button
              type="button"
              onClick={fetchAnalytics}
              disabled={loadingData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-medium transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {dataError && (
          <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-4 text-xs text-red-700 dark:text-red-300">
            {dataError}
          </div>
        )}

        {!data && loadingData && (
          <div className="py-20 text-center text-sm text-neutral-500">Loading analytics from Redis…</div>
        )}

        {data && (
          <>
            {/* Privacy & Legality Notice */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/20 px-4 py-2.5 text-xs text-emerald-800 dark:text-emerald-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Option A Privacy-First Mode:</strong> Unique visitors are counted via monthly-salted SHA-256 HMAC hashes (auto-expiring in 45 days). Raw IP addresses are never stored.
                </span>
              </div>
              <span className="font-mono text-[11px] opacity-80">
                Updated {new Date(data.generatedAt).toLocaleTimeString()}
              </span>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              <StatTile
                label="Active Right Now"
                value={formatCompact(data.activeRightNow)}
                sublabel="Live sessions (15m)"
                icon={<Radio className="w-4 h-4" />}
                pulse={data.activeRightNow > 0}
              />
              <StatTile
                label="Today (Unique)"
                value={formatCompact(data.visitors.today.unique)}
                sublabel={`${formatCompact(data.visitors.today.sessions)} sess · ${formatCompact(data.visitors.today.pageviews)} views`}
                icon={<Users className="w-4 h-4" />}
              />
              <StatTile
                label="Last 7 Days"
                value={formatCompact(data.visitors.last7Days.unique)}
                sublabel={`${formatCompact(data.visitors.last7Days.sessions)} sess · ${formatCompact(data.visitors.last7Days.pageviews)} views`}
                icon={<TrendingUp className="w-4 h-4" />}
              />
              <StatTile
                label="Last 30 Days"
                value={formatCompact(data.visitors.last30Days.unique)}
                sublabel={`${formatCompact(data.visitors.last30Days.sessions)} sess · ${formatCompact(data.visitors.last30Days.pageviews)} views`}
                icon={<Eye className="w-4 h-4" />}
              />
              <StatTile
                label="Avg Time & Bounce"
                value={formatDuration(data.avgSessionSeconds.last7Days)}
                sublabel={`7d bounce rate: ${data.bounceRate7d}%`}
                icon={<Clock className="w-4 h-4" />}
              />
            </div>

            {/* 30-Day Trend */}
            <Card
              title="30-Day Traffic Trend"
              subtitle="Daily visitors, sessions, and pageviews in Dhaka local time"
              icon={<Activity className="w-4 h-4" />}
              right={
                <div className="inline-flex rounded-xl border border-neutral-200 dark:border-neutral-800 p-0.5 text-[11px]">
                  {(
                    [
                      ['uniqueVisitors', 'Unique'],
                      ['sessions', 'Sessions'],
                      ['pageviews', 'Pageviews'],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTrendMetric(key)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                        trendMetric === key
                          ? 'bg-blue-600 text-white'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              }
            >
              <TrendChart data={data.dailyTrend} metric={trendMetric} />
            </Card>

            {/* When Views Peak: 24h + Day of Week */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card
                className="lg:col-span-2"
                title="Peak Viewing Hours (BST / Dhaka Time)"
                subtitle={
                  data.peakHour
                    ? `Highest traffic at ${formatHour12(data.peakHour.hour)} BST (${data.peakHour.sessions30d.toLocaleString()} sessions in 30d)`
                    : 'Hourly distribution of visits across 24 hours'
                }
                icon={<Clock className="w-4 h-4" />}
                right={
                  <div className="inline-flex rounded-xl border border-neutral-200 dark:border-neutral-800 p-0.5 text-[11px]">
                    {(['30d', '7d'] as const).map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setHourWindow(w)}
                        className={`px-2.5 py-1 rounded-lg font-medium ${
                          hourWindow === w
                            ? 'bg-blue-600 text-white'
                            : 'text-neutral-600 dark:text-neutral-400'
                        }`}
                      >
                        {w.toUpperCase()}
                      </button>
                    ))}
                  </div>
                }
              >
                <HourlyBarChart hours={data.hourlyActivity} windowMode={hourWindow} />
              </Card>

              <Card
                title="Busiest Days of the Week"
                subtitle={
                  data.peakDay
                    ? `Peak day: ${data.peakDay.day} (${data.peakDay.percentage}% of traffic)`
                    : 'Last 30 days'
                }
                icon={<TrendingUp className="w-4 h-4" />}
              >
                <ul className="space-y-2">
                  {data.dayOfWeekActivity.map((d) => {
                    const isPeak = data.peakDay?.dayIndex === d.dayIndex;
                    return (
                      <li key={d.dayIndex} className="flex items-center gap-2.5 text-xs">
                        <span
                          className={`w-9 shrink-0 font-mono ${
                            isPeak ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-neutral-500'
                          }`}
                        >
                          {d.shortDay}
                        </span>
                        <div className="flex-1 h-2 rounded-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isPeak ? 'bg-emerald-500' : 'bg-blue-600 dark:bg-blue-500'
                            }`}
                            style={{ width: `${Math.max(d.percentage, d.sessions > 0 ? 4 : 0)}%` }}
                          />
                        </div>
                        <span className="w-16 text-right font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                          {formatCompact(d.sessions)} · {d.percentage}%
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </div>

            {/* Most Visited Pages (7D / 30D / All Time) + Traffic Sources & Referrers */}
            {(() => {
              const rawPages =
                pagesWindow === '7d'
                  ? data.topPages7d
                  : pagesWindow === '30d'
                    ? data.topPages30d
                    : data.topPagesAllTime;
              const filteredPages = pageFilter.trim()
                ? rawPages.filter((p) => p.label.toLowerCase().includes(pageFilter.trim().toLowerCase()))
                : rawPages;
              const activeSources =
                acquisitionWindow === '7d' ? data.trafficSources7d : data.trafficSources;
              const activeReferrers =
                acquisitionWindow === '7d' ? data.topReferrers7d : data.topReferrers;
              const activeUtms =
                acquisitionWindow === '7d' ? data.utmCampaigns7d : data.utmCampaigns;
              const activeTotalSessions =
                acquisitionWindow === '7d'
                  ? data.visitors.last7Days.sessions
                  : data.visitors.last30Days.sessions;
              const activeAdSessions =
                acquisitionWindow === '7d'
                  ? data.adTaggedSessions.last7Days
                  : data.adTaggedSessions.last30Days;
              const adSharePct =
                activeTotalSessions > 0 ? Math.round((activeAdSessions / activeTotalSessions) * 100) : 0;

              return (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card
                      title="Most Visited Pages"
                      subtitle={
                        pagesWindow === '7d'
                          ? 'Top pages in the last 7 days'
                          : pagesWindow === '30d'
                            ? 'Top pages in the last 30 days'
                            : 'All-time most visited pages'
                      }
                      icon={<Eye className="w-4 h-4" />}
                      right={
                        <div className="inline-flex rounded-xl border border-neutral-200 dark:border-neutral-800 p-0.5 text-[11px]">
                          {(
                            [
                              ['7d', '7D'],
                              ['30d', '30D'],
                              ['all', 'All Time'],
                            ] as const
                          ).map(([key, label]) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setPagesWindow(key)}
                              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                                pagesWindow === key
                                  ? 'bg-blue-600 text-white'
                                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      }
                    >
                      {rawPages.length > 6 && (
                        <div className="relative mb-3">
                          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={pageFilter}
                            onChange={(e) => setPageFilter(e.target.value)}
                            placeholder="Filter routes (e.g. /life, /projects)…"
                            className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 pl-8 pr-3 py-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}
                      <RankedBarList
                        items={filteredPages}
                        emptyText={
                          pageFilter.trim()
                            ? `No pages matching "${pageFilter.trim()}"`
                            : 'No pageviews recorded yet'
                        }
                        linkPaths
                      />
                    </Card>

                    <div className="space-y-4">
                      <Card
                        title="Traffic Sources & Ad Targeting"
                        subtitle={`Source split (${acquisitionWindow === '7d' ? 'last 7 days' : 'last 30 days'}) · recovers stripped mobile referrers via UTM & ad click IDs`}
                        icon={<Compass className="w-4 h-4" />}
                        right={
                          <div className="inline-flex rounded-xl border border-neutral-200 dark:border-neutral-800 p-0.5 text-[11px]">
                            {(['7d', '30d'] as const).map((w) => (
                              <button
                                key={w}
                                type="button"
                                onClick={() => setAcquisitionWindow(w)}
                                className={`px-2.5 py-1 rounded-lg font-medium ${
                                  acquisitionWindow === w
                                    ? 'bg-blue-600 text-white'
                                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                                }`}
                              >
                                {w.toUpperCase()}
                              </button>
                            ))}
                          </div>
                        }
                      >
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-100 dark:border-neutral-800 px-3 py-2 text-xs">
                          <span className="text-neutral-600 dark:text-neutral-300">
                            Ad / UTM-tagged sessions ({acquisitionWindow.toUpperCase()})
                          </span>
                          <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                            {formatCompact(activeAdSessions)} ({adSharePct}% of traffic)
                          </span>
                        </div>
                        <SegmentBar
                          emptyText="No traffic source data yet"
                          segments={[
                            { key: 'direct', label: 'Direct', value: activeSources.direct, className: 'bg-blue-600' },
                            { key: 'search_google', label: 'Google', value: activeSources.search_google, className: 'bg-emerald-500' },
                            { key: 'social', label: 'Social', value: activeSources.social, className: 'bg-violet-500' },
                            { key: 'search_other', label: 'Other Search / AI', value: activeSources.search_other, className: 'bg-amber-500' },
                            { key: 'other', label: 'Referral', value: activeSources.other, className: 'bg-rose-500' },
                            { key: 'internal', label: 'Internal', value: activeSources.internal, className: 'bg-neutral-400' },
                          ]}
                        />
                      </Card>

                      <Card
                        title="Top Referrer Domains"
                        subtitle={`Exact external domains & ad platforms sending traffic (${acquisitionWindow.toUpperCase()})`}
                        icon={<Globe className="w-4 h-4" />}
                      >
                        <RankedBarList items={activeReferrers} emptyText="No external referrers yet" />
                      </Card>
                    </div>
                  </div>

                  {/* UTM Ad Campaigns + Built-in UTM Link Builder */}
                  <Card
                    title="UTM Ad Campaigns & Click-ID Attribution"
                    subtitle={`Tracks utm_source, utm_medium, utm_campaign, utm_content + auto-detects fbclid, gclid, ttclid, li_fat_id, msclkid (${acquisitionWindow.toUpperCase()})`}
                    icon={<Tag className="w-4 h-4" />}
                  >
                    {activeUtms.length === 0 ? (
                      <p className="text-xs text-neutral-400 dark:text-neutral-500">
                        No UTM or ad-click sessions recorded in the last {acquisitionWindow === '7d' ? '7' : '30'} days. Use the link builder below to tag your ads or social posts.
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500">
                              <th className="py-2 pr-4 font-medium">Source</th>
                              <th className="py-2 pr-4 font-medium">Medium</th>
                              <th className="py-2 pr-4 font-medium">Campaign</th>
                              <th className="py-2 pr-4 font-medium">Creative / Content</th>
                              <th className="py-2 pr-4 text-right font-medium">Sessions</th>
                              <th className="py-2 text-right font-medium">Share</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
                            {activeUtms.map((row, idx) => (
                              <tr key={idx}>
                                <td className="py-2 pr-4 font-mono font-medium">{row.source}</td>
                                <td className="py-2 pr-4 font-mono text-neutral-500">{row.medium}</td>
                                <td className="py-2 pr-4 font-mono">{row.campaign}</td>
                                <td className="py-2 pr-4 font-mono text-neutral-500">{row.content || '—'}</td>
                                <td className="py-2 pr-4 text-right font-mono font-semibold">
                                  {row.sessions.toLocaleString()}
                                </td>
                                <td className="py-2 text-right font-mono text-neutral-500">{row.percentage}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    <UtmLinkBuilder />
                  </Card>
                </>
              );
            })()}

            {/* Global Geography: Countries & Cities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card
                title="Visitors by Country (Global)"
                subtitle="Derived from Vercel edge geolocation headers (30d)"
                icon={<Globe className="w-4 h-4" />}
              >
                <RankedBarList items={data.countries} emptyText="No country data yet (available on Vercel deployments)" badgeKey />
              </Card>

              <Card
                title="Top Cities Worldwide"
                subtitle="City-level audience breakdown for ad geo-targeting (30d)"
                icon={<MapPin className="w-4 h-4" />}
              >
                <RankedBarList items={data.cities} emptyText="No city data yet (available on Vercel deployments)" />
              </Card>
            </div>

            {/* Devices, New vs Returning, Browsers & OS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card
                title="Devices & Audience"
                subtitle="Device type and new vs returning visitors (30d)"
                icon={<Smartphone className="w-4 h-4" />}
              >
                <div className="space-y-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      Device Split
                    </p>
                    <SegmentBar
                      emptyText="No device data yet"
                      segments={[
                        { key: 'mobile', label: 'Mobile', value: data.deviceBreakdown.mobile, className: 'bg-blue-600' },
                        { key: 'desktop', label: 'Desktop', value: data.deviceBreakdown.desktop, className: 'bg-indigo-500' },
                        { key: 'tablet', label: 'Tablet', value: data.deviceBreakdown.tablet, className: 'bg-emerald-500' },
                      ]}
                    />
                  </div>
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      New vs Returning
                    </p>
                    <SegmentBar
                      emptyText="No audience split yet"
                      segments={[
                        { key: 'new', label: 'New', value: data.newVsReturning30d.new, className: 'bg-emerald-500' },
                        { key: 'returning', label: 'Returning', value: data.newVsReturning30d.returning, className: 'bg-blue-500' },
                      ]}
                    />
                  </div>
                </div>
              </Card>

              <Card title="Browsers" subtitle="Last 30 days" icon={<Monitor className="w-4 h-4" />}>
                <RankedBarList items={data.browsers} emptyText="No browser data yet" />
              </Card>

              <Card title="Operating Systems" subtitle="Last 30 days" icon={<Monitor className="w-4 h-4" />}>
                <RankedBarList items={data.operatingSystems} emptyText="No OS data yet" />
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
