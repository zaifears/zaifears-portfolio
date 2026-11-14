'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CalendarPlus,
  Download,
  Clock,
  ArrowLeft,
  Construction,
  BellRing,
  Check,
} from 'lucide-react';
import {
  buildGoogleCalendarUrl,
  buildIcsReminder,
  getCountdownParts,
  getNextSunday10AmBst,
  type CountdownParts,
  type NextSundayBst,
} from '@/lib/calendarReminder';

export default function UnderConstructionClient() {
  const [schedule, setSchedule] = useState<NextSundayBst | null>(null);
  const [countdown, setCountdown] = useState<CountdownParts | null>(null);
  const [googleUrl, setGoogleUrl] = useState<string>(
    'https://calendar.google.com/calendar/render?action=TEMPLATE'
  );
  const [icsDownloaded, setIcsDownloaded] = useState(false);

  // Initialize dynamic Sunday 10:00 AM BST schedule & live countdown on client
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const next = getNextSunday10AmBst(now);
      setSchedule(next);
      setCountdown(getCountdownParts(next.startUtc, now));
      setGoogleUrl(buildGoogleCalendarUrl(now));
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load Tenor embed script on mount so client-side navigation renders the GIF reliably
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-tenor-embed="true"]'
    );
    if (existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.src = 'https://tenor.com/embed.js';
    script.async = true;
    script.dataset.tenorEmbed = 'true';
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const handleDownloadIcs = () => {
    const icsContent = buildIcsReminder(new Date());
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stocksimulatorbd-sunday-10am-bst.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setIcsDownloaded(true);
    setTimeout(() => setIcsDownloaded(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 md:py-14 space-y-6">
      {/* Back link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shahoriar.bd
        </Link>
      </div>

      {/* Main status card */}
      <section className="rounded-panel border border-rule bg-paper-2 p-6 md:p-10 space-y-6">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-rule bg-paper px-4 py-1.5 text-xs font-medium text-ink-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
          <Construction className="w-3.5 h-3.5 text-amber-500" />
          <span>Under Construction</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-ink">
            StockSimulatorBD is currently under construction
          </h1>
          <p className="text-base md:text-lg text-ink-2 leading-relaxed">
            Thank you for staying with us. We&apos;re actively upgrading the platform and will be
            back soon — set a Google Calendar reminder for{' '}
            <span className="font-semibold text-ink">Sunday at 10:00 AM BST</span> to get
            notified.
          </p>
        </div>

        {/* Tenor GIF Embed */}
        <div className="overflow-hidden rounded-card border border-rule bg-paper p-2">
          <div
            className="tenor-gif-embed"
            data-postid="7303242777894021063"
            data-share-method="host"
            data-aspect-ratio="1.76596"
            data-width="100%"
          >
            <a href="https://tenor.com/view/take-a-bow-the-office-michael-scott-gif-7303242777894021063">
              Take A Bow The Office GIF
            </a>{' '}
            from{' '}
            <a href="https://tenor.com/search/take+a+bow-gifs">Take A Bow GIFs</a>
          </div>
        </div>
      </section>

      {/* Google Calendar Notification Card */}
      <section className="rounded-panel border border-rule bg-paper-2 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-accent-text">
              <BellRing className="w-4 h-4" />
              <span>Sunday 10:00 AM BST Notification</span>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-ink">
              {schedule ? schedule.formattedBst : 'Sunday · 10:00 AM BST (UTC+6)'}
            </h2>
            <p className="text-sm text-muted">
              Bangladesh Standard Time (Asia/Dhaka, UTC+6) — automatically converts to your local
              timezone in Google Calendar.
            </p>
          </div>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
          {[
            { label: 'Days', value: countdown?.days },
            { label: 'Hours', value: countdown?.hours },
            { label: 'Minutes', value: countdown?.minutes },
            { label: 'Seconds', value: countdown?.seconds },
          ].map((unit) => (
            <div
              key={unit.label}
              className="rounded-card border border-rule bg-paper px-3 py-3 text-center"
            >
              <div className="text-2xl md:text-3xl font-semibold tabular-nums text-ink">
                {unit.value !== undefined ? String(unit.value).padStart(2, '0') : '--'}
              </div>
              <div className="text-xs text-muted mt-0.5">{unit.label}</div>
            </div>
          ))}
        </div>

        {/* Calendar Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm md:text-base font-medium text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
          >
            <CalendarPlus className="w-4 h-4" />
            Add to Google Calendar (Sunday 10 AM BST)
          </a>

          <button
            type="button"
            onClick={handleDownloadIcs}
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-rule bg-paper px-6 py-3.5 text-sm md:text-base font-medium text-ink transition-colors duration-200 hover:bg-paper-3 cursor-pointer"
          >
            {icsDownloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                Reminder Downloaded (.ics)
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download .ics Reminder
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>
            Adding the event sets a calendar notification on Sunday at 10:00 AM BST so you
            don&apos;t miss when StockSimulatorBD is back.
          </span>
        </div>
      </section>
    </div>
  );
}
