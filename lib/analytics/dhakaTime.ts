/**
 * Dhaka (Asia/Dhaka, UTC+6, no DST) date-key and hour helpers.
 * Ensures "Today", 7d/30d windows, and Peak Hours always align with Bangladesh local time,
 * regardless of the Vercel serverless region's system timezone.
 */

export function getDhakaDateKey(daysAgo = 0, now: Date = new Date()): string {
  const bd = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
  bd.setDate(bd.getDate() - daysAgo);

  const y = bd.getFullYear();
  const m = String(bd.getMonth() + 1).padStart(2, '0');
  const d = String(bd.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Last `n` Dhaka date keys, oldest first, ending with today.
 */
export function getLastNDhakaDateKeys(n: number, now: Date = new Date()): string[] {
  return Array.from({ length: n }, (_, i) => getDhakaDateKey(n - 1 - i, now));
}

/**
 * Current hour-of-day (0–23) in Dhaka local time (BST, UTC+6).
 */
export function getDhakaHour(now: Date = new Date()): number {
  const bd = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
  return bd.getHours();
}

/**
 * "YYYY-MM" month key in Dhaka local time (used for monthly rotating privacy salt).
 */
export function getDhakaMonthKey(now: Date = new Date()): string {
  return getDhakaDateKey(0, now).slice(0, 7);
}
