"use client";

import Link from 'next/link';
import { memo } from 'react';

const CompetitionCard = memo(({ href, title, subtitle, emoji, colors }: {
  href: string;
  title: string;
  subtitle: string;
  emoji: string;
  colors: string;
}) => {
  const isExternal = href.startsWith('http');
  const baseClasses = `group relative ${colors} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer min-h-48 flex items-center justify-center overflow-hidden border border-white/10`;

  const inner = (
    <>
      <div className="flex flex-col items-center justify-center h-full text-white text-center">
        <div className="text-4xl mb-3">{emoji}</div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-sm text-white/80">{subtitle}</p>
      </div>
      <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </>
  );

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={baseClasses}>
      {inner}
    </Link>
  );
});

CompetitionCard.displayName = 'CompetitionCard';

const SectionHeader = memo(({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{title}</h2>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{subtitle}</p>
  </div>
));

SectionHeader.displayName = 'SectionHeader';

export default function BizCompPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center p-4 sm:p-6 py-16">
      <div className="w-full max-w-3xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            Business Competitions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Case solutions, financial models, and strategic decks from 20+ national competitions.
          </p>
        </div>

        {/* Accfinity Section */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-8 backdrop-blur-xl">
          <SectionHeader 
            title="Accfinity"
            subtitle="Financial planning & portfolio optimization"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CompetitionCard
              href="/bizcomp/accfinity/r2"
              title="Round 2"
              subtitle="Portfolio Dashboard"
              emoji="🎯"
              colors="bg-linear-to-br from-blue-600 to-blue-700"
            />
            <CompetitionCard
              href="/bizcomp/accfinity/r3"
              title="Round 3"
              subtitle="Advanced Analysis"
              emoji="🚀"
              colors="bg-linear-to-br from-blue-700 to-indigo-800"
            />
          </div>
        </div>

        {/* Capitalizer Section */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-8 backdrop-blur-xl">
          <SectionHeader 
            title="Capitalizer"
            subtitle="Round 2 dashboard"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CompetitionCard
              href="/bizcomp/capitalizer/r2"
              title="Round 2"
              subtitle="Capitalizer Analysis"
              emoji="💼"
              colors="bg-linear-to-br from-blue-600 to-slate-800"
            />
            <CompetitionCard
              href="/bizcomp/capitalizer/finale"
              title="Grand Finale"
              subtitle="Investor Dashboard"
              emoji="🏁"
              colors="bg-linear-to-br from-slate-800 to-blue-900"
            />
          </div>
        </div>

        {/* Excelerate Section */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-8 backdrop-blur-xl">
          <SectionHeader 
            title="Excelerate"
            subtitle="Excel based competition by Finance and Accounting Club of Brac University-FINACT"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CompetitionCard
              href="/bizcomp/excelerate/r2"
              title="Round 2"
              subtitle="Project PayWave BD"
              emoji="📊"
              colors="bg-linear-to-br from-blue-600 to-teal-700"
            />
          </div>
        </div>

        {/* Beyond the Metrics Section */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-8 backdrop-blur-xl">
          <SectionHeader 
            title="Beyond the Metrics"
            subtitle="Final Round"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CompetitionCard
              href="/bizcomp/btm-iut"
              title="Final Round"
              subtitle="Beyond the Metrics Competition"
              emoji="📈"
              colors="bg-linear-to-br from-blue-500 to-blue-700"
            />
          </div>
        </div>

        {/* Technopreneurship Section (now links externally) */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-8 backdrop-blur-xl">
          <SectionHeader 
            title="Technopreneurship"
            subtitle="External resource: cylnk.com"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CompetitionCard
              href="https://cylnk.com"
              title="Technopreneurship"
              subtitle="Visit cylnk.com"
              emoji="💡"
              colors="bg-linear-to-br from-blue-700 to-slate-800"
            />
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click on a round to view the detailed analysis
          </p>
        </div>
      </div>
    </div>
  );
}
