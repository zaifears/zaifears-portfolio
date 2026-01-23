"use client";

import Link from 'next/link';
import { memo } from 'react';

const CompetitionCard = memo(({ href, title, subtitle, emoji, colors }: {
  href: string;
  title: string;
  subtitle: string;
  emoji: string;
  colors: string;
}) => (
  <Link 
    href={href}
    className={`group relative ${colors} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer min-h-50 flex items-center justify-center`}
  >
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
      <div className="text-5xl mb-3">{emoji}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{subtitle}</p>
    </div>
    <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
  </Link>
));

CompetitionCard.displayName = 'CompetitionCard';

const SectionHeader = memo(({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
    <p className="text-gray-600">{subtitle}</p>
  </div>
));

SectionHeader.displayName = 'SectionHeader';

export default function BizCompPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-cyan-500 mb-4">
            Business Competitions
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 font-medium">
            Strategic solutions & market analysis
          </p>
        </div>

        {/* Accfinity Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-gray-200 mb-8">
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
              colors="bg-linear-to-br from-blue-500 to-blue-600"
            />
            <CompetitionCard
              href="/bizcomp/accfinity/r3"
              title="Round 3"
              subtitle="Advanced Analysis"
              emoji="🚀"
              colors="bg-linear-to-br from-purple-500 to-purple-600"
            />
          </div>
        </div>

        {/* Excelerate Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-gray-200 mb-8">
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
              colors="bg-linear-to-br from-green-500 to-green-600"
            />
          </div>
        </div>


        {/* Beyond the Metrics Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-gray-200 mb-8">
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
              colors="bg-linear-to-br from-cyan-500 to-blue-500"
            />
          </div>
        </div>

        {/* Technopreneurship Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-gray-200 mb-8">
          <SectionHeader 
            title="Technopreneurship"
            subtitle="Innovation & entrepreneurial technology ventures"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CompetitionCard
              href="/bizcomp/technopreneurship"
              title="Technopreneurship"
              subtitle="Tech-driven business solutions"
              emoji="💡"
              colors="bg-linear-to-br from-orange-500 to-orange-600"
            />
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Click on a round to view the detailed analysis
          </p>
        </div>
      </div>
    </div>
  );
}
