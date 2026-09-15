'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const screenshots = [
  { id: '0', title: 'Search & Pin Destination', alt: 'LocReminder destination search and map pin interface' },
  { id: '1', title: 'Wake Radius & Sound', alt: 'LocReminder wake radius slider and alarm sound configuration' },
  { id: '2', title: 'Active Alarms', alt: 'LocReminder active alarms and destination management list' },
  { id: '3', title: 'Reliability Test', alt: 'LocReminder alarm reliability testing screen' },
  { id: '4', title: 'Lock Screen Alarm', alt: 'LocReminder full screen alarm alert over locked screen' },
  { id: '5', title: 'Offline Map & Settings', alt: 'LocReminder offline map caching and dark theme settings' },
];

export default function ScreenshotsGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / 220);
      setActiveIndex(Math.min(screenshots.length - 1, Math.max(0, index)));
    }
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const target = scrollRef.current.children[index] as HTMLElement;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveIndex(index);
    }
  };

  return (
    <div className="w-full">
      {/* ── Desktop Grid: all 6 images visible on larger displays ── */}
      <div className="hidden lg:grid lg:grid-cols-6 gap-3.5">
        {screenshots.map((s) => (
          <div key={s.id} className="flex flex-col gap-2">
            <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:border-blue-500/40">
              <Image
                src={`/projects/locreminder/screenshots/${s.id}.jpg`}
                alt={s.alt}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <p className="text-[11px] text-center font-medium text-gray-600 dark:text-gray-400 truncate px-1">
              {s.title}
            </p>
          </div>
        ))}
      </div>

      {/* ── Mobile & Tablet: Slide type scroll-snap carousel ── */}
      <div className="lg:hidden relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-4 -mx-4 sm:mx-0 sm:px-0 no-scrollbar"
        >
          {screenshots.map((s, idx) => (
            <div
              key={s.id}
              className="snap-center shrink-0 w-[200px] sm:w-[220px] flex flex-col gap-2"
            >
              <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 shadow-md">
                <Image
                  src={`/projects/locreminder/screenshots/${s.id}.jpg`}
                  alt={s.alt}
                  fill
                  className="object-cover"
                  sizes="220px"
                  priority={idx < 2}
                />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold text-gray-900 dark:text-white block truncate">
                  {s.title}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  {idx + 1} of {screenshots.length}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls & dots for smaller screens */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-1.5 items-center">
            {screenshots.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`Go to screenshot ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? 'w-6 bg-blue-600 dark:bg-blue-400'
                    : 'w-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous screenshot"
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo(Math.min(screenshots.length - 1, activeIndex + 1))}
              disabled={activeIndex === screenshots.length - 1}
              aria-label="Next screenshot"
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
