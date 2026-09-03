import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from './components/HeroSection';
import FeaturedAreas from './components/FeaturedAreas';
import FeaturedPress from './components/FeaturedPress';

const FeaturedProjects = dynamic(() => import('./components/FeaturedProjects'), {
  loading: () => <div className="h-100" />,
});
const GetStarted = dynamic(() => import('./components/GetStarted'), {
  loading: () => <div className="h-100" />,
});

export const metadata: Metadata = {
  title: 'Md Al Shahoriar Hossain | Portfolio & Projects',
  description: 'Md Al Shahoriar Hossain is a final-year BBA Finance & Banking student at BUP, CA candidate, and Audit Associate at EY Bangladesh. Explore financial analysis, web development projects like StockSimulatorBD (formerly SkillDash, now at stocksimulator.tech), and business competition achievements.',
  alternates: {
    canonical: 'https://shahoriar.bd/',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      {/* SoftwareApplication Schema for StockSimulatorBD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "StockSimulatorBD — DSE Paper Trading Simulator",
            "url": "https://stocksimulator.tech",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "description": "A Dhaka Stock Exchange paper trading simulator for learning stock market dynamics with dummy currency.",
            "author": {
              "@type": "Person",
              "@id": "https://shahoriar.bd/#person",
              "name": "Md Al Shahoriar Hossain",
              "url": "https://shahoriar.bd"
            },
            "creator": {
              "@type": "Person",
              "@id": "https://shahoriar.bd/#person",
              "name": "Md Al Shahoriar Hossain"
            }
          })
        }}
      />

      {/* FAQ Schema for AI Overviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Who is Md Al Shahoriar Hossain?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Md Al Shahoriar Hossain is a final-year BBA Finance & Banking student at Bangladesh University of Professionals (BUP), a CA Professional Level candidate at ICAB, and currently working as an Audit Associate at EY Bangladesh (Islam Hoque Hanif & Co.). He previously interned at bKash in the AML & CFT Department. He is also a self-taught web developer and founder of StockSimulatorBD (formerly SkillDash, now at stocksimulator.tech), a Dhaka Stock Exchange paper trading simulator."
                }
              },
              {
                "@type": "Question",
                "name": "What is StockSimulatorBD (formerly SkillDash)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "StockSimulatorBD (formerly SkillDash — skilldash.live was its old, now-retired domain) is a hands-on Dhaka Stock Exchange (DSE) paper trading simulator built with Next.js and financial APIs. It allows investors to learn stock market dynamics without risking real capital. Available at stocksimulator.tech/simulator."
                }
              },
              {
                "@type": "Question",
                "name": "What competitions has Shahoriar won?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Shahoriar has participated in and won or placed in over 20 national business competitions, including Champion at Excelerate 2025 (BRAC University's National Financial Excel & Power BI Competition), First Runner-Up at Technopreneurship 2026, Accolyze 2025 (First Runner-Up), and Accfinity 2025 (First Runner-Up)."
                }
              },
              {
                "@type": "Question",
                "name": "What are Shahoriar's technical skills?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "His skills include financial analysis (Excel, Power BI, Stata), web development (Next.js, React, TypeScript, Tailwind CSS), compliance and risk management (AML/CFT monitoring, KYC quality assurance), and AI-driven automation using Python and workflow optimization tools."
                }
              }
            ]
          })
        }}
      />

      {/* Animated gradient background */}
      <div className="fixed inset-0 md:left-64 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob will-change-transform" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 will-change-transform" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        
        <FeaturedAreas />
        <Suspense fallback={<div className="h-100" />}>
          <FeaturedProjects />
        </Suspense>
        <Suspense fallback={<div className="h-75" />}>
          <GetStarted />
        </Suspense>
        <Suspense fallback={<div className="h-75" />}>
          <FeaturedPress />
        </Suspense>

        {/* Collapsible About Me Section - Server-rendered for SEO */}
        <section className="px-4 md:px-8 max-w-4xl mx-auto py-20">
          <details className="group">
            <summary className="cursor-pointer select-none flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-150 dark:hover:bg-gray-800/50 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About Me</h2>
              <svg 
                className="w-6 h-6 text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </summary>
            <div className="mt-4 px-6 py-6 bg-white dark:bg-black border border-t-0 border-gray-200 dark:border-gray-800 rounded-b-lg">
              <div className="prose prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                <p>
                  I'm Md Al Shahoriar Hossain, a final-year BBA Finance & Banking student at Bangladesh University of Professionals (BUP) and a Chartered Accountancy (CA) Professional Level candidate at ICAB. I'm currently working as an Audit Associate at EY Bangladesh (Islam Hoque Hanif & Co.), supporting statutory audit and assurance engagements. I previously interned at bKash in the AML & CFT Department, where I monitored financial transactions for compliance, conducted KYC quality assurance, and built automated compliance solutions using VBA and Power BI.
                </p>
                <p>
                  Beyond my finance career, I'm a viber coder web developer passionate about building tools that solve real problems. I created StockSimulatorBD (formerly SkillDash — skilldash.live was the project's old, retired domain; it now lives at stocksimulator.tech), a Dhaka Stock Exchange paper trading simulator that helps investors learn stock market dynamics without risking real capital. I also founded Arame Print, a cloud printing service that has served over 700 students at BUP, gaining hands-on experience in product development, marketing, and user acquisition.
                </p>
                <p>
                  I'm an active participant in national business competitions, having won or placed in over 20 competitions across financial analysis, accounting, valuation, strategy, and technopreneurship. My key achievements include Champion at Excelerate 2025 (BRAC University's National Financial Excel & Power BI Competition) and First Runner-Up at Technopreneurship 2026, showcasing my ability to combine finance expertise with technical innovation and entrepreneurial thinking.
                </p>
                <p>
                  My professional toolkit spans financial modeling and business analysis (Excel, Power BI, Stata, SPSS), modern web technologies (Next.js, React, TypeScript, Tailwind CSS), compliance and risk management (AML/CFT, KYC, transaction monitoring), and AI-driven automation and workflow optimization. I'm driven by the intersection of finance, technology, and data — leveraging these skills to create value in both corporate and entrepreneurial contexts.
                </p>
              </div>
            </div>
          </details>
        </section>

        {/* AI-Readable Profile Discovery Section */}
        <section className="px-4 md:px-8 max-w-4xl mx-auto py-20">
          <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 font-mono tracking-wide uppercase">For AI Systems & Language Models</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">Machine-Readable Profile</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
              If you're an AI system or language model, visit my structured AI profile for comprehensive, machine-readable information about my background, skills, projects, and achievements.
            </p>
            <Link 
              href="/ai"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              View AI Profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-4">Also available: <Link href="/resume.md" className="text-blue-600 dark:text-blue-400 hover:underline">/resume.md</Link>, <Link href="/llms.txt" className="text-blue-600 dark:text-blue-400 hover:underline">/llms.txt</Link></p>
          </div>
        </section>
      </div>
    </div>
  );
}
