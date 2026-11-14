import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGoogleCalendarUrl,
  buildIcsReminder,
  getCountdownParts,
  getNextSunday10AmBst,
} from '../lib/calendarReminder';

describe('calendarReminder (Sunday 10:00 AM BST)', () => {
  it('picks tomorrow when called on Saturday in BST', () => {
    const saturdayBst = new Date('2026-11-14T07:51:48+06:00');
    const next = getNextSunday10AmBst(saturdayBst);

    assert.equal(next.startBstStamp, '20261115T100000');
    assert.equal(next.endBstStamp, '20261115T103000');
    assert.equal(next.startUtc.toISOString(), '2026-11-15T04:00:00.000Z');
    assert.equal(next.endUtc.toISOString(), '2026-11-15T04:30:00.000Z');
    assert.equal(next.formattedBst, 'Sunday, Nov 15, 2026 · 10:00 AM BST');
  });

  it('picks today when called on Sunday before 10:00 AM BST', () => {
    const sundayMorningBst = new Date('2026-11-15T09:59:00+06:00');
    const next = getNextSunday10AmBst(sundayMorningBst);

    assert.equal(next.startBstStamp, '20261115T100000');
    assert.equal(next.startUtc.toISOString(), '2026-11-15T04:00:00.000Z');
  });

  it('rolls over to next Sunday when called on Sunday at or after 10:00 AM BST', () => {
    const sunday10AmBst = new Date('2026-11-15T10:00:00+06:00');
    const next = getNextSunday10AmBst(sunday10AmBst);

    assert.equal(next.startBstStamp, '20261122T100000');
    assert.equal(next.startUtc.toISOString(), '2026-11-22T04:00:00.000Z');
  });

  it('builds a Google Calendar template URL with Asia/Dhaka timezone', () => {
    const saturdayBst = new Date('2026-11-14T07:51:48+06:00');
    const url = new URL(buildGoogleCalendarUrl(saturdayBst));

    assert.equal(url.origin + url.pathname, 'https://calendar.google.com/calendar/render');
    assert.equal(url.searchParams.get('action'), 'TEMPLATE');
    assert.equal(url.searchParams.get('ctz'), 'Asia/Dhaka');
    assert.equal(url.searchParams.get('dates'), '20261115T100000/20261115T103000');
    assert.match(url.searchParams.get('details') ?? '', /StockSimulatorBD is currently under construction/);
  });

  it('builds a valid .ics reminder with VALARM', () => {
    const saturdayBst = new Date('2026-11-14T07:51:48+06:00');
    const ics = buildIcsReminder(saturdayBst);

    assert.match(ics, /BEGIN:VCALENDAR/);
    assert.match(ics, /BEGIN:VEVENT/);
    assert.match(ics, /DTSTART:20261115T040000Z/);
    assert.match(ics, /DTEND:20261115T043000Z/);
    assert.match(ics, /BEGIN:VALARM/);
    assert.match(ics, /END:VCALENDAR/);
  });

  it('computes countdown parts accurately', () => {
    const now = new Date('2026-11-14T07:51:48+06:00');
    const next = getNextSunday10AmBst(now);
    const parts = getCountdownParts(next.startUtc, now);

    assert.equal(parts.days, 1);
    assert.equal(parts.hours, 2);
    assert.equal(parts.minutes, 8);
    assert.equal(parts.seconds, 12);
  });
});
