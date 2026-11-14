const BST_OFFSET_MS = 6 * 60 * 60 * 1000;
const EVENT_DURATION_MS = 30 * 60 * 1000;

export interface NextSundayBst {
  /** UTC Date representing the upcoming Sunday 10:00:00 BST (04:00:00 UTC). */
  startUtc: Date;
  /** UTC Date representing 30 minutes after startUtc. */
  endUtc: Date;
  /** Formatted local BST date/time string, e.g. "Sunday, Nov 15, 2026 · 10:00 AM BST". */
  formattedBst: string;
  /** YYYYMMDDTHHMMSS in Asia/Dhaka wall-clock time. */
  startBstStamp: string;
  /** YYYYMMDDTHHMMSS in Asia/Dhaka wall-clock time. */
  endBstStamp: string;
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function formatBstStamp(bstWallDate: Date): string {
  const y = bstWallDate.getUTCFullYear();
  const m = pad2(bstWallDate.getUTCMonth() + 1);
  const d = pad2(bstWallDate.getUTCDate());
  const hh = pad2(bstWallDate.getUTCHours());
  const mm = pad2(bstWallDate.getUTCMinutes());
  const ss = pad2(bstWallDate.getUTCSeconds());
  return `${y}${m}${d}T${hh}${mm}${ss}`;
}

function formatUtcStamp(utcDate: Date): string {
  return `${formatBstStamp(utcDate)}Z`;
}

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Computes the next upcoming Sunday at 10:00 AM BST (Asia/Dhaka, UTC+6).
 * If it is currently Sunday in BST before 10:00:00 AM, returns today at 10:00 AM BST.
 * Otherwise returns the following Sunday at 10:00 AM BST.
 */
export function getNextSunday10AmBst(now: Date = new Date()): NextSundayBst {
  const bstNow = new Date(now.getTime() + BST_OFFSET_MS);
  const dayOfWeek = bstNow.getUTCDay(); // 0 = Sunday
  const hour = bstNow.getUTCHours();

  let daysAhead = 7 - dayOfWeek;
  if (dayOfWeek === 0) {
    daysAhead = hour < 10 ? 0 : 7;
  }

  // Target 10:00:00 AM BST in UTC is 04:00:00 UTC on that calendar date.
  const startUtcMs = Date.UTC(
    bstNow.getUTCFullYear(),
    bstNow.getUTCMonth(),
    bstNow.getUTCDate() + daysAhead,
    10 - 6,
    0,
    0,
    0
  );
  const startUtc = new Date(startUtcMs);
  const endUtc = new Date(startUtcMs + EVENT_DURATION_MS);

  const startBstWall = new Date(startUtcMs + BST_OFFSET_MS);
  const endBstWall = new Date(endUtc.getTime() + BST_OFFSET_MS);

  const monthLabel = MONTH_NAMES[startBstWall.getUTCMonth()];
  const dayNum = startBstWall.getUTCDate();
  const yearNum = startBstWall.getUTCFullYear();

  return {
    startUtc,
    endUtc,
    formattedBst: `Sunday, ${monthLabel} ${dayNum}, ${yearNum} · 10:00 AM BST`,
    startBstStamp: formatBstStamp(startBstWall),
    endBstStamp: formatBstStamp(endBstWall),
  };
}

export function getCountdownParts(targetUtc: Date, now: Date = new Date()): CountdownParts {
  const totalMs = Math.max(0, targetUtc.getTime() - now.getTime());
  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalMs };
}

export const REMINDER_EVENT_TITLE = 'StockSimulatorBD — Sunday 10 AM BST Check-In';
export const REMINDER_EVENT_DETAILS =
  'StockSimulatorBD is currently under construction. Thank you for staying with us! Visit https://shahoriar.bd/under-construction or https://stocksimulator.tech for updates.';
export const REMINDER_EVENT_LOCATION = 'https://shahoriar.bd/under-construction';

/**
 * Builds a Google Calendar "Add Event" URL pre-filled for the next Sunday 10:00 AM BST.
 */
export function buildGoogleCalendarUrl(now: Date = new Date()): string {
  const next = getNextSunday10AmBst(now);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: REMINDER_EVENT_TITLE,
    dates: `${next.startBstStamp}/${next.endBstStamp}`,
    ctz: 'Asia/Dhaka',
    details: REMINDER_EVENT_DETAILS,
    location: REMINDER_EVENT_LOCATION,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Builds an RFC 5545 iCalendar (.ics) payload with a 10-minute prior alert and at-time alert.
 */
export function buildIcsReminder(now: Date = new Date()): string {
  const next = getNextSunday10AmBst(now);
  const dtStamp = formatUtcStamp(now);
  const dtStart = formatUtcStamp(next.startUtc);
  const dtEnd = formatUtcStamp(next.endUtc);
  const uid = `stocksimulatorbd-${next.startBstStamp}@shahoriar.bd`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//shahoriar.bd//StockSimulatorBD Under Construction//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${REMINDER_EVENT_TITLE}`,
    `DESCRIPTION:${REMINDER_EVENT_DETAILS}`,
    `LOCATION:${REMINDER_EVENT_LOCATION}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:StockSimulatorBD Sunday 10:00 AM BST Check-In',
    'TRIGGER:PT0M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}
