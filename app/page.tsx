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
  title: {
    absolute: 'Md Al Shahoriar Hossain | Portfolio & Projects',
  },
  description:
    'Md Al Shahoriar Hossain is a final-year BBA Finance & Banking student at BUP, CA candidate, and Audit Associate at EY Bangladesh. Explore financial analysis, web development projects like StockSimulatorBD (formerly SkillDash, now at stocksimulator.tech), and business competition achievements.',
  alternates: {
    canonical: 'https://shahoriar.bd',
  },
  openGraph: {
    title: 'Md Al Shahoriar Hossain | Portfolio & Projects',
    description:
      'Audit Associate at EY Bangladesh, CA candidate, and developer. Explore financial models, compliance automation, and web development projects.',
    url: 'https://shahoriar.bd',
    siteName: 'Md Al Shahoriar Hossain',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Md Al Shahoriar Hossain — Audit Associate and Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md Al Shahoriar Hossain | Portfolio & Projects',
    description:
      'Audit Associate at EY Bangladesh, CA candidate, and developer. Explore financial analysis and software projects.',
    images: ['/opengraph-image.png'],
  },
};

export default function Page() {
  return (
    <div className="min-h-screen text-ink">
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

      {/* Content */}
      <div className="relative">
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
        <section className="max-w-6xl mx-auto py-10 md:py-14">
          <details className="group">
            <summary className="cursor-pointer select-none flex items-center justify-between rounded-card border border-rule bg-paper-2 px-6 py-5 transition-colors duration-200 hover:bg-paper-3 group-open:rounded-b-none">
              <h2 className="text-2xl md:text-3xl font-semibold text-ink">About Me</h2>
              <svg aria-hidden="true" 
                className="w-6 h-6 text-muted group-open:rotate-180 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </summary>
            <div className="rounded-b-card border border-t-0 border-rule bg-paper px-6 py-6 md:px-8">
              <div className="prose max-w-none space-y-4 text-ink-2 text-base leading-relaxed">
                <p>
                  I&apos;m Md Al Shahoriar Hossain, a final-year BBA Finance &amp; Banking student at Bangladesh University of Professionals (BUP) and a Chartered Accountancy (CA) Professional Level candidate at ICAB. I&apos;m currently working as an Audit Associate at EY Bangladesh (Islam Hoque Hanif &amp; Co.), supporting statutory audit and assurance engagements. I previously interned at bKash in the AML &amp; CFT Department, where I monitored financial transactions for compliance, conducted KYC quality assurance, and built automated compliance solutions using VBA and Power BI.
                </p>
                <p>
                  Beyond my finance career, I&apos;m a viber coder web developer passionate about building tools that solve real problems. I created StockSimulatorBD (formerly SkillDash — skilldash.live was the project&apos;s old, retired domain; it now lives at stocksimulator.tech), a Dhaka Stock Exchange paper trading simulator that helps investors learn stock market dynamics without risking real capital. I also founded Arame Print, a cloud printing service that has served over 700 students at BUP, gaining hands-on experience in product development, marketing, and user acquisition.
                </p>
                <p>
                  I&apos;m an active participant in national business competitions, having won or placed in over 20 competitions across financial analysis, accounting, valuation, strategy, and technopreneurship. My key achievements include Champion at Excelerate 2025 (BRAC University&apos;s National Financial Excel &amp; Power BI Competition) and First Runner-Up at Technopreneurship 2026, showcasing my ability to combine finance expertise with technical innovation and entrepreneurial thinking.
                </p>
                <p>
                  My professional toolkit spans financial modeling and business analysis (Excel, Power BI, Stata, SPSS), modern web technologies (Next.js, React, TypeScript, Tailwind CSS), compliance and risk management (AML/CFT, KYC, transaction monitoring), and AI-driven automation and workflow optimization. I&apos;m driven by the intersection of finance, technology, and data — leveraging these skills to create value in both corporate and entrepreneurial contexts.
                </p>
              </div>
            </div>
          </details>
        </section>

        {/* AI-Readable Profile Discovery: kept as plain links for crawlers and LLMs */}
        <section className="max-w-6xl mx-auto py-10 md:py-12">
          <div className="flex flex-col gap-4 rounded-card border border-rule bg-paper-2 p-5 md:flex-row md:items-center md:justify-between md:px-8">
            <p className="text-ink-2 max-w-xl text-sm md:text-base">
              For AI systems and language models: a structured, machine-readable profile of my background, skills, projects and achievements. Also at <Link href="/resume.md" className="text-accent-text underline underline-offset-4">/resume.md</Link> and <Link href="/llms.txt" className="text-accent-text underline underline-offset-4">/llms.txt</Link>.
            </p>
            <Link href="/ai" className="btn-primary shrink-0 self-start md:self-auto">
              View AI Profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
