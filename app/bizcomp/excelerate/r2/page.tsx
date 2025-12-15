"use client";

import React, { memo } from 'react';
import Link from 'next/link';

const SectionCard = memo(({ icon, title, children }: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-12">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
      <span className="text-green-600 mr-3">{icon}</span> {title}
    </h2>
    {children}
  </section>
));

SectionCard.displayName = 'SectionCard';

const AnalysisBox = memo(({ title, description }: { title: string; description: string }) => (
  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 text-sm sm:text-base">{description}</p>
  </div>
));

AnalysisBox.displayName = 'AnalysisBox';

export default function ExcelerateRound2() {
  const analysisAreas = [
    {
      title: "Market Analysis",
      description: "Deep dive into Bangladesh's digital payment market, competitive landscape, and growth opportunities."
    },
    {
      title: "Financial Modeling",
      description: "Advanced Excel models for revenue projections, cost analysis, and profitability scenarios."
    },
    {
      title: "Data Visualization",
      description: "Create compelling dashboards and visualizations to support findings and recommendations."
    },
    {
      title: "Strategic Planning",
      description: "Develop actionable strategies based on comprehensive data analysis and financial projections."
    }
  ];

  const deliverables = [
    "Comprehensive Excel workbook with multiple analysis sheets",
    "Market analysis and competitive benchmarking",
    "5-year financial projections and forecasts",
    "Interactive dashboards and visual summaries",
    "Strategic recommendations and implementation roadmap"
  ];

  const objectives = [
    "Analyze digital payment market trends and growth patterns",
    "Develop financial forecasts and projections",
    "Create advanced Excel models and dashboards",
    "Provide data-driven strategic recommendations"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-teal-50 p-4 sm:p-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8 sm:mb-12">
          <Link 
            href="/bizcomp"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <span className="mr-2">←</span> Back to Competitions
          </Link>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-600 to-cyan-500 mb-4">
            Project PayWave BD
          </h1>
          <p className="text-base sm:text-xl text-gray-600 font-medium">
            Excelerate Round 2 - Excel based competition by FINACT
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-gray-200">
          {/* Project Overview */}
          <SectionCard icon="📱" title="Project Overview">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Project PayWave BD is a comprehensive financial analysis and modeling exercise focusing on digital payment solutions in Bangladesh. This round challenges participants to analyze market trends, develop financial projections, and create strategic recommendations using advanced Excel techniques.
            </p>
          </SectionCard>

          {/* Objectives */}
          <SectionCard icon="🎯" title="Objectives">
            <ul className="space-y-2 sm:space-y-3">
              {objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-green-600 font-bold flex-shrink-0">•</span>
                  <span className="text-gray-700 text-sm sm:text-base">{obj}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Key Sections */}
          <SectionCard icon="📊" title="Key Analysis Areas">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {analysisAreas.map((area, idx) => (
                <AnalysisBox key={idx} title={area.title} description={area.description} />
              ))}
            </div>
          </SectionCard>

          {/* Deliverables */}
          <SectionCard icon="✅" title="Deliverables">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <ul className="space-y-2 sm:space-y-3 text-gray-700">
                {deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-center text-gray-600 font-medium text-sm sm:text-base">
              Excel expertise meets strategic business thinking
            </p>
            <p className="text-center text-xs sm:text-sm text-gray-500 mt-2">
              Powered by Finance and Accounting Club of Brac University - FINACT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
