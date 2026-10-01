import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI & Executive Profile | Md Al Shahoriar Hossain',
  description:
    'Comprehensive machine-readable and executive profile of Md Al Shahoriar Hossain — Audit Associate at EY Bangladesh (Islam Hoque Hanif & Co.), Chartered Accountancy candidate at ICAB, and software engineer. Detailed business project outcomes, education, awards, and technical competencies.',
  alternates: {
    canonical: 'https://shahoriar.bd/ai',
  },
};

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  role: string;
  problem: string;
  solution: string;
  businessImpact: string[];
  technologies: string[];
  links: {
    showcase?: string;
    live?: string;
    github?: string;
    media?: string;
  };
}

const projects: ProjectItem[] = [
  {
    id: 'youth-tax-calculator',
    name: 'Bangladesh Youth Tax Calculator',
    category: 'Tax Tech · Statutory Compliance · AI Agent Skill',
    role: 'Creator & Statutory Engine Architect',
    problem:
      'Every year, thousands of university students, interns, and young graduates obtain an e-TIN in Bangladesh but lack the budget to hire CA firms or tax attorneys. When using generic LLMs, filers face hallucinated statutory rates, incorrect rebate ceilings, and unreconciled net-wealth differences on Form IT-10B, creating significant audit flags and tax penalty risks on the NBR portal (etaxnbr.gov.bd).',
    solution:
      'Architected a dual-layer statutory compliance system: an open AI Agent Skill specification (complying with the open llms.txt standard) paired with a deterministic statutory Python engine. Modeled Section 56(g) parental financial support to systematically reconcile Form IT-10B net wealth balance sheets with zero difference (0.00 BDT) while legally minimizing taxable income under the 4,00,000 BDT threshold and providing direct steps to claim 100% bank TDS refunds.',
    businessImpact: [
      'Guaranteed 0.00 BDT Form IT-10B balance sheet difference, preventing NBR portal audit flags and rejection.',
      'Eliminated costly CA advisory overhead for first-time taxpayers through an automated, deterministic rules engine.',
      'Comprehensive statutory support for student stipends, freelance remittances, multi-broker capital losses, and bank TDS.',
      '100% open-source with 1-click cross-platform setup (Windows and macOS) and full AI Agent Skill integration.',
    ],
    technologies: [
      'Python 3',
      'Income Tax Act 2023',
      'AI Agent Skill Specification',
      'Form IT-10B / IT-10BB Math',
      'llms.txt Standard',
      'MIT License',
    ],
    links: {
      showcase: '/projects/youth-tax-calculator',
      github: 'https://github.com/zaifears/youth-tax-calculator',
    },
  },
  {
    id: 'stocksimulatorbd',
    name: 'StockSimulatorBD (formerly SkillDash)',
    category: 'FinTech · Capital Markets Education',
    role: 'Founder & Full-Stack Architect',
    problem:
      'Retail equity participation in the Dhaka Stock Exchange (DSE) suffers from high churn and capital loss due to an absence of risk-free, realistic trading simulators calibrated to Bangladesh’s local market microstructure.',
    solution:
      'Engineered a real-time web-based DSE paper-trading platform allowing aspiring investors to execute simulated equity trades against realistic market data. Built interactive portfolio tracking, realized and unrealized P&L calculations, and market learning workflows with zero financial downside.',
    businessImpact: [
      'Democratized capital market education for retail investors and university students across Bangladesh.',
      'Facilitated practical portfolio management literacy without capital depletion risks.',
      'Scalable architecture providing low-latency market order execution and position monitoring.',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Financial Market APIs',
      'Tailwind CSS',
      'Vercel',
    ],
    links: {
      live: 'https://www.stocksimulator.tech/simulator/',
    },
  },
  {
    id: 'leave-tracker-pro',
    name: 'Enterprise Departmental Leave Tracker Pro',
    category: 'Enterprise HR Operations & Internal Workflow Automation',
    role: 'Lead Developer & Automation Specialist',
    problem:
      'A multi-team operational department managed employee attendance across 9 separate teams in a single unvalidated shared spreadsheet. The lack of role isolation caused constant formula tampering, unauthorized record overwrites, and hours lost manually compiling monthly departmental absence summaries.',
    solution:
      'Engineered a complete role-based HR absence management system in Excel using advanced VBA, Class Modules, and custom UserForms. Created 9 isolated team profiles with password verification, built an instant individual employee leave history generator, automated live leave aggregation across teams, and designed an application-like UI removing Excel ribbons and formula bars to eliminate operational error.',
    businessImpact: [
      'Cut monthly departmental leave compilation and reconciliation time by ~90%.',
      'Eliminated cross-team data overwrite errors and unauthorized record edits across all 9 operational teams.',
      'Zero ongoing licensing or infrastructure cost: delivered as a self-contained, enterprise-grade macro workbook.',
    ],
    technologies: [
      'Microsoft Excel VBA',
      'UserForms & Class Modules',
      'Role-Based Access Control',
      'Dynamic Array Formulas (XLOOKUP, SUMIFS)',
      'Enterprise Automation',
    ],
    links: {
      media: 'https://www.youtube.com/watch?v=cPi_UGe0LQE',
    },
  },
  {
    id: 'aml-cft-scraper',
    name: 'AML/CFT Scraper & Forensic Investigation Utility',
    category: 'RegTech · Financial Crime Compliance Automation',
    role: 'Compliance Developer (Built during bKash Internship)',
    problem:
      'Compliance investigators evaluating potential unauthorized digital product platforms (e.g., grey-market game top-up sites) spent significant manual effort navigating dynamic e-commerce checkout flows to uncover personal Mobile Financial Services (MFS) accounts illicitly operating as merchant gateways.',
    solution:
      'Developed a multi-threaded Python compliance utility using Playwright stealth automation. The tool autonomously traverses single-page applications (SPAs), bypasses basic anti-bot friction, extracts masked payment numbers, captures time-stamped visual audit evidence, and aggregates findings directly into an organized Excel case database. Packaged as a standalone executable runnable on restricted corporate laptops without admin privileges.',
    businessImpact: [
      'Reduced per-site fraud investigation cycle time from several minutes to under 10 seconds (~85%+ efficiency improvement).',
      'Provided forensically sound, time-stamped screenshot trails suitable for regulatory filings and law-enforcement escalations.',
      'Zero-dependency standalone binary (.exe) circumvented corporate IT software installation barriers.',
    ],
    technologies: [
      'Python 3',
      'Playwright (Stealth Browsing)',
      'Concurrent Futures (Multi-threading)',
      'OpenPyXL',
      'Tkinter GUI',
      'PyInstaller',
    ],
    links: {
      github: 'https://github.com/zaifears/aml-cft-scraper',
    },
  },
  {
    id: 'tapo-viewer',
    name: 'Tapo-Viewer',
    category: 'Systems & IoT Software · Windows Desktop App',
    role: 'Sole Architect & Desktop Developer',
    problem:
      'TP-Link Tapo smart home security cameras lack an official, responsive standalone Windows desktop application for viewing local RTSP feeds, searching MicroSD timeline history, and archiving video footage without mandatory, recurring cloud subscription fees (Tapo Care).',
    solution:
      'Created a standalone 64-bit Windows desktop application that connects directly to cameras via local Wi-Fi / LAN, guaranteeing 100% data privacy with zero third-party cloud routing. Features an interactive recording calendar and motion-event timeline to query and browse onboard MicroSD recordings directly, coupled with an asynchronous download manager and automated FFmpeg MP4 remuxing with AAC audio.',
    businessImpact: [
      '100% local on-premise privacy: credentials and video feeds never leave the user’s local network.',
      'Eliminated reliance on paid cloud subscriptions for retrieving and archiving continuous security recordings.',
      'Shipped as a standalone, portable Windows .exe requiring no Python runtime or developer tools.',
    ],
    technologies: [
      'Python 3.10+',
      'PyTapo Protocol Client',
      'FFmpeg Integration (MP4/AAC remuxing)',
      'Tkinter / Custom UI',
      'Windows 10/11 Architecture',
      'MIT License',
    ],
    links: {
      showcase: '/projects/tapo-viewer',
      github: 'https://github.com/zaifears/tapo-viewer',
      live: 'https://github.com/zaifears/tapo-viewer/releases/latest',
    },
  },
  {
    id: 'locreminder',
    name: 'LocReminder',
    category: 'Mobile Application & Commuter Utility',
    role: 'Sole Mobile Architect',
    problem:
      'Daily public transit commuters in dense metropolitan areas like Dhaka frequently miss their destinations when sleeping or distracted. Conventional time-based alarms are ineffective due to volatile traffic congestion and unpredictable transit schedules.',
    solution:
      'Engineered a native location-based mobile application that triggers persistent full-screen audio and haptic alarms upon entering a user-pinned geographic boundary. Implemented battery-aware distance-adaptive GPS polling to eliminate device drain on lengthy journeys and powered map rendering via OpenStreetMap to respect user privacy.',
    businessImpact: [
      'Zero battery-drain overhead through dynamic geographic polling intervals.',
      '100% privacy-respecting: no accounts, no cloud servers, no analytics trackers, and no third-party telemetry.',
      'Published on GitHub Releases with automated signed release workflows and an F-Droid submission pipeline.',
    ],
    technologies: [
      'Flutter',
      'Dart',
      'Kotlin (Android Native Foreground Service)',
      'OpenStreetMap (OSM)',
      'GitHub Actions CI/CD',
      'MIT License',
    ],
    links: {
      showcase: '/projects/locreminder',
      github: 'https://github.com/zaifears/locreminder',
    },
  },
  {
    id: 'arame-print',
    name: 'Arame Print',
    category: 'Micro-Venture & Campus Cloud Service',
    role: 'Founder & Commercial Operator',
    problem:
      'University students face severe productivity bottlenecks and long physical queues at brick-and-mortar print shops during peak semester deadlines and academic report submissions.',
    solution:
      'Founded and scaled a student-centric cloud printing platform at Bangladesh University of Professionals (BUP). Managed the end-to-end digital ordering pipeline, coordinated with commercial print vendors, managed customer communications, and maintained consistent quality assurance.',
    businessImpact: [
      'Successfully served and onboarded 700+ student stakeholders across university departments.',
      'Transformed a chaotic physical printing experience into a streamlined, digital delivery service.',
      'Demonstrated end-to-end venture validation from customer discovery to commercial execution.',
    ],
    technologies: [
      'Digital Ordering Workflows',
      'Vendor Logistics & Supply Chain',
      'Customer Relationship Management',
      'Campus Product Strategy',
    ],
    links: {},
  },
  {
    id: 'shahoriar-bd',
    name: 'shahoriar.bd — Personal Knowledge Hub',
    category: 'Web Architecture & Open Knowledge Platform',
    role: 'Creator & Web Architect',
    problem:
      'Traditional professional portfolios are static, slow, and opaque to modern AI search crawlers, offering poor transparency into an engineer-analyst’s interdisciplinary capabilities.',
    solution:
      'Engineered a high-performance personal web platform utilizing Next.js 16, Contentful headless CMS, and comprehensive multi-tier machine-readable endpoints (/ai, /resume.md, /llms.txt, /llms-full.txt, and complete Schema.org JSON-LD graphs).',
    businessImpact: [
      '100% accessible to AI agents, LLM search engines, and technical recruiters with sub-second page loads.',
      'Unified repository of audit reflections, technical documentation, financial modeling, and venture case studies.',
      'Built-in voluntary contribution and infrastructure transparency system (/thanks).',
    ],
    technologies: [
      'Next.js 16 (App Router)',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Contentful Headless CMS',
      'Vercel Global Edge Network',
    ],
    links: {
      showcase: '/',
      live: 'https://shahoriar.bd',
    },
  },
];

export default function AiPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://shahoriar.bd/ai#webpage',
    url: 'https://shahoriar.bd/ai',
    name: 'AI & Executive Profile | Md Al Shahoriar Hossain',
    dateModified: '2026-09-30',
    description:
      'Machine-readable and executive profile of Md Al Shahoriar Hossain — Audit Associate at EY Bangladesh (Islam Hoque Hanif & Co.), CA candidate, and software engineer.',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://shahoriar.bd/#person',
      name: 'Md Al Shahoriar Hossain',
      alternateName: ['Shahoriar Hossain', 'zaifears'],
      jobTitle: 'Audit Associate and Software Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Islam Hoque Hanif & Co.',
        alternateName: 'EY Bangladesh',
        url: 'https://www.ey.com/en_bd',
      },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Bangladesh University of Professionals (BUP)',
          sameAs: 'https://bup.edu.bd',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Institute of Chartered Accountants of Bangladesh (ICAB)',
          sameAs: 'https://www.icab.org.bd',
        },
      ],
      email: 'hello@shahoriar.bd',
      url: 'https://shahoriar.bd',
      knowsAbout: [
        'Statutory Audit and Assurance',
        'Financial Modeling and Valuation',
        'Income Tax Act 2023 Bangladesh',
        'Anti-Money Laundering (AML/CFT)',
        'KYC Quality Assurance',
        'Next.js and React',
        'TypeScript',
        'Python Automation',
        'VBA Enterprise Automation',
        'Power BI',
        'AI Agent Skills and llms.txt',
      ],
      sameAs: [
        'https://github.com/zaifears',
        'https://www.linkedin.com/in/shahoriarhossain/',
        'https://facebook.com/alshahoriar.hossain',
        'https://www.youtube.com/@takatunes',
      ],
    },
    hasPart: projects.map((p) => ({
      '@type': 'SoftwareApplication',
      name: p.name,
      applicationCategory: p.category,
      operatingSystem: 'Cross-platform',
      description: p.solution,
      author: { '@id': 'https://shahoriar.bd/#person' },
      url: p.links.showcase
        ? `https://shahoriar.bd${p.links.showcase}`
        : p.links.live || 'https://shahoriar.bd',
    })),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 md:left-64 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/15 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Machine-Readable & Executive Profile
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Md Al Shahoriar Hossain
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              Audit Associate at <strong>EY Bangladesh (Islam Hoque Hanif &amp; Co.)</strong>, Chartered Accountancy (CA)
              candidate at <strong>ICAB</strong>, and self-taught software engineer based in Dhaka, Bangladesh.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-2 font-mono">
              Synthesizing statutory accounting, regulatory compliance, and practical software engineering to automate high-impact business workflows.
            </p>

            {/* Quick action badges & anchor links */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
              <a
                href="#identity"
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                #Identity
              </a>
              <a
                href="#executive-summary"
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                #Executive-Summary
              </a>
              <a
                href="#projects"
                className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40 transition-colors"
              >
                #Projects-Business-Value
              </a>
              <a
                href="#experience"
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                #Experience
              </a>
              <a
                href="#education"
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                #Education
              </a>
              <a
                href="#awards"
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                #Awards
              </a>
              <a
                href="#skills"
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                #Skills
              </a>
              <a
                href="#links"
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                #Links
              </a>
            </div>

            {/* Quick machine export links */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-gray-500 dark:text-gray-400">
              <span>Direct Machine Formats:</span>
              <a href="/resume.md" className="text-blue-600 dark:text-blue-400 hover:underline">
                /resume.md (Markdown CV)
              </a>
              <span>·</span>
              <a href="/llms.txt" className="text-blue-600 dark:text-blue-400 hover:underline">
                /llms.txt (Site Manifest)
              </a>
              <span>·</span>
              <a href="/llms-full.txt" className="text-blue-600 dark:text-blue-400 hover:underline">
                /llms-full.txt (Full Context)
              </a>
            </div>
          </header>

          <article className="space-y-10 font-mono text-sm leading-relaxed">
            {/* Identity */}
            <section
              id="identity"
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <span>Identity &amp; Profile Metadata</span>
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 text-gray-700 dark:text-gray-300">
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-0.5">Full name</dt>
                  <dd className="font-semibold text-gray-900 dark:text-white">Md Al Shahoriar Hossain</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-0.5">Known as / Alias</dt>
                  <dd>Shahoriar Hossain, zaifears</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-0.5">Current Role</dt>
                  <dd>Audit Associate, EY Bangladesh (Islam Hoque Hanif &amp; Co.)</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-0.5">Qualifications</dt>
                  <dd>BBA in Finance &amp; Banking (BUP), CA Professional Candidate (ICAB)</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-0.5">Location</dt>
                  <dd>Khilgaon, Dhaka, Bangladesh</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-0.5">Email</dt>
                  <dd>
                    <a href="mailto:hello@shahoriar.bd" className="text-blue-600 dark:text-blue-400 hover:underline">
                      hello@shahoriar.bd
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-0.5">Canonical Domain</dt>
                  <dd>
                    <a href="https://shahoriar.bd" className="text-blue-600 dark:text-blue-400 hover:underline">
                      https://shahoriar.bd
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-0.5">Areas of Practice</dt>
                  <dd>Statutory Audit, Tax Law, AML/CFT Compliance, Software Engineering</dd>
                </div>
              </dl>
            </section>

            {/* Executive Summary */}
            <section
              id="executive-summary"
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-lg font-bold mb-4 text-blue-600 dark:text-blue-400">
                Executive Summary: Bridging Finance, Assurance &amp; Technical Execution
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-3.5 not-prose">
                <p>
                  Md Al Shahoriar Hossain is an interdisciplinary professional operating at the intersection of corporate finance, statutory assurance, and pragmatic software engineering. As an Audit Associate at <strong>EY Bangladesh (Islam Hoque Hanif &amp; Co.)</strong>, a Chartered Accountancy Professional Level candidate at <strong>ICAB</strong>, and a final-year BBA Finance &amp; Banking student at <strong>Bangladesh University of Professionals (CGPA 3.61)</strong>, he pairs deep institutional accounting rigor with modern technical execution.
                </p>
                <p>
                  His background includes financial crime compliance at <strong>bKash</strong> (AML &amp; CFT Department), where he conducted transactional monitoring, eKYC quality assurance, and built automated Excel/VBA reporting modules for Suspicious Transaction and Activity Reports (STR/SAR).
                </p>
                <p>
                  Rather than treating finance and software development as isolated domains, Shahoriar applies software architecture to resolve operational bottlenecks in accounting, tax compliance, and regulatory risk:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                  <li><strong>Deterministic Statutory Modeling:</strong> Built the Bangladesh Youth Tax Calculator, eliminating net-wealth balance sheet discrepancies on Form IT-10B under the Income Tax Act 2023.</li>
                  <li><strong>Forensic Regulatory Automation:</strong> Developed multi-threaded Playwright scrapers in Python to automate merchant gateway investigations on locked enterprise laptops.</li>
                  <li><strong>Enterprise Process Hardening:</strong> Engineered VBA-based internal HR systems with role-based access control across 9 operational teams with zero third-party software cost.</li>
                  <li><strong>Venture Validation:</strong> Founded Arame Print (700+ student users) and StockSimulatorBD, alongside winning or placing in 20+ national business competitions.</li>
                </ul>
              </div>
            </section>

            {/* Flagship Projects — Structured in a Business-Friendly Way */}
            <section
              id="projects"
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm space-y-8"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    Flagship Projects &amp; Business Value Engineering
                  </h2>
                  <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {projects.length} Shipped Initiatives
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Every technical project addresses a verified operational friction, regulatory challenge, or market asymmetry with measurable outcomes.
                </p>
              </div>

              <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-800">
                {projects.map((project, idx) => (
                  <div key={project.id} className={idx === 0 ? '' : 'pt-8'}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        {project.name}
                      </h3>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Role:</span> {project.role}
                    </p>

                    <div className="space-y-3 text-xs sm:text-sm">
                      {/* Problem Statement */}
                      <div className="bg-red-50/50 dark:bg-red-950/20 border-l-2 border-red-500/70 p-3 rounded-r-lg">
                        <span className="font-bold text-red-700 dark:text-red-400 uppercase text-[11px] block mb-1 tracking-wider">
                          The Business Problem / Friction
                        </span>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.problem}</p>
                      </div>

                      {/* Solution Statement */}
                      <div className="bg-blue-50/50 dark:bg-blue-950/20 border-l-2 border-blue-500/70 p-3 rounded-r-lg">
                        <span className="font-bold text-blue-700 dark:text-blue-400 uppercase text-[11px] block mb-1 tracking-wider">
                          Engineered Business Solution
                        </span>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.solution}</p>
                      </div>

                      {/* Key Business Outcomes & ROI */}
                      <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border-l-2 border-emerald-500/70 p-3 rounded-r-lg">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[11px] block mb-1 tracking-wider">
                          Key Business Impact &amp; ROI Metrics
                        </span>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                          {project.businessImpact.map((impact, i) => (
                            <li key={i} className="leading-relaxed">
                              {impact}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tools and Links */}
                    <div className="mt-4 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700/60 text-[11px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 shrink-0 font-medium">
                        {project.links.showcase && (
                          <Link
                            href={project.links.showcase}
                            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          >
                            <span>Case Showcase</span>
                            <span>→</span>
                          </Link>
                        )}
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <span>Live App</span>
                            <span>↗</span>
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline flex items-center gap-1"
                          >
                            <span>Source Code</span>
                            <span>↗</span>
                          </a>
                        )}
                        {project.links.media && (
                          <a
                            href={project.links.media}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                          >
                            <span>Video Walkthrough</span>
                            <span>↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Professional Experience */}
            <section
              id="experience"
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Professional Experience</h2>
              <ul className="space-y-7 text-gray-700 dark:text-gray-300">
                <li className="border-l-2 border-blue-500 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="font-bold text-gray-900 dark:text-white text-base">
                      Audit Associate — Islam Hoque Hanif &amp; Co. (EY Bangladesh)
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">September 2026 – Present</span>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Statutory Audit and Assurance Services</p>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <li>Executing statutory audit and financial assurance engagements as part of the EY global network firm in Bangladesh.</li>
                    <li>Conducting substantive testing, internal control evaluations, and balance sheet verification across diverse corporate sectors.</li>
                    <li>Ensuring compliance with International Financial Reporting Standards (IFRS) and International Standards on Auditing (ISA).</li>
                  </ul>
                </li>

                <li className="border-l-2 border-emerald-500 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="font-bold text-gray-900 dark:text-white text-base">
                      bnext Intern — bKash Limited
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">May 2026 – August 2026</span>
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-2">
                    AML &amp; CFT Department, External and Corporate Affairs
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <li>Monitored multi-million financial transactions for Anti-Money Laundering and Counter-Financing of Terrorism (AML/CFT) regulatory compliance.</li>
                    <li>Engineered an automated Suspicious Transaction Report (STR) and Suspicious Activity Report (SAR) generation module utilizing Excel VBA macros, drastically cutting reporting turnaround times.</li>
                    <li>Conducted comprehensive quality assurance reviews on eKYC and Manual KYC submissions for personal and enterprise merchant accounts.</li>
                    <li>Spearheaded digital forensic investigations of web domains flagged for unauthorized gambling and illicit payment processing.</li>
                    <li>Conducted multi-dimensional risk analyses and executive dashboard reporting utilizing Microsoft Excel and Power BI.</li>
                  </ul>
                </li>

                <li className="border-l-2 border-cyan-500 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="font-bold text-gray-900 dark:text-white text-base">
                      Business Development Intern — IFA Consultancy
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">December 2025 – May 2026</span>
                  </div>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 mb-2">Advisory &amp; Corporate Compliance</p>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <li>Supported cross-functional advisory and statutory corporate compliance engagements for enterprise banking clients.</li>
                    <li>Assisted commercialization and digital delivery of 25+ professional development and corporate training programs.</li>
                    <li>Implemented AI-driven workflow automations to resolve recurring operational bottlenecks.</li>
                  </ul>
                </li>

                <li className="border-l-2 border-purple-500 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="font-bold text-gray-900 dark:text-white text-base">
                      Founder &amp; Operator — Arame Print
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">March 2024 – Present</span>
                  </div>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mb-2">Campus Cloud Printing Micro-Venture</p>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <li>Built and managed the digital ordering lifecycle serving over 700 student stakeholders at BUP.</li>
                    <li>Negotiated high-volume commercial vendor pricing, handled customer communications, and directed marketing.</li>
                  </ul>
                </li>
              </ul>
            </section>

            {/* Education & Academic Rigor */}
            <section
              id="education"
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Academic Background</h2>
              <ul className="space-y-5 text-gray-700 dark:text-gray-300">
                <li>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="font-bold text-gray-900 dark:text-white text-base">
                      Bangladesh University of Professionals (BUP)
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">2022 – Present (8th Semester)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    Bachelor of Business Administration (BBA) in Finance &amp; Banking | Current CGPA: <strong>3.61</strong>
                  </p>
                </li>
                <li>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="font-bold text-gray-900 dark:text-white text-base">
                      Institute of Chartered Accountants of Bangladesh (ICAB)
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">January 2025 – Present</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    Chartered Accountancy (CA) — Professional Level Candidate
                  </p>
                </li>
                <li>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="font-bold text-gray-900 dark:text-white text-base">
                      Notre Dame College, Dhaka
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">2019 – 2021</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    Higher Secondary Certificate (HSC), Business Studies | GPA: <strong>5.00 / 5.00</strong>
                  </p>
                </li>
                <li>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="font-bold text-gray-900 dark:text-white text-base">
                      Ideal School &amp; College, Dhaka
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">2010 – 2019</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    Secondary School Certificate (SSC), Business Studies | GPA: <strong>4.50 / 5.00</strong>
                  </p>
                </li>
              </ul>
            </section>

            {/* Awards & Business Competitions */}
            <section
              id="awards"
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">Awards &amp; Competitive Track Record</h2>
                <span className="text-xs text-gray-400 dark:text-gray-500">20+ National Case Competitions</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-5">
                Demonstrated leadership and analytical rigor across nationwide financial modeling, valuation, accounting, and venture hackathons:
              </p>
              <ul className="space-y-3.5 text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">Champion</span>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">Excelerate 2025</span> — BRAC University
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      National Financial Excel &amp; Power BI Dashboard Making Competition | Team: The Godfathers
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold shrink-0">1st Runner-Up</span>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">Technopreneurship 2026</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      15-week venture creation competition; built CyLink (SME cybersecurity subscription model) | Team: CyLink
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold shrink-0">1st Runner-Up</span>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">Accolyze 2025</span> — North South University
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      National Financial Accounting, Valuation &amp; Strategic Advisory Competition | Team: The Godfathers
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold shrink-0">1st Runner-Up</span>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">Accfinity 2025</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      National Accounting &amp; Valuation Case Competition (Portfolio Optimization &amp; Quantitative Finance) | Team: Infinity
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold shrink-0">1st Runner-Up</span>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">Devthon 4.0</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Social Innovation &amp; Product Hackathon | Team: Pencil Musketeers
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">Finalist</span>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">National Case Finalist Roles</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Creaventure 3.0 (Idea Pitching), Optimity 2024 (Investment &amp; Asset Management), Three Zero Policy Hackathon.
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Core Competencies & Skills */}
            <section
              id="skills"
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Core Technical Competencies</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 dark:text-gray-300">
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">
                    Financial Analysis &amp; Modeling
                  </dt>
                  <dd>Power BI, Advanced Excel (DCF, LBO, Scenario Modeling, VBA Macros), Stata, SPSS</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">
                    Assurance, Tax &amp; RegTech
                  </dt>
                  <dd>Statutory Audit (ISA/IFRS), Income Tax Act 2023, AML/CFT Monitoring, KYC QA, STR/SAR Reporting</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">
                    Full-Stack Web Engineering
                  </dt>
                  <dd>Next.js 16, React 19, TypeScript, Tailwind CSS, Contentful CMS, REST APIs, Vercel Edge</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">
                    Systems, Mobile &amp; Automation
                  </dt>
                  <dd>Python (Playwright, PyTapo, Data Pipelines), Flutter &amp; Dart, Excel Class Modules, Bash/CLI</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">
                    AI Systems &amp; Standards
                  </dt>
                  <dd>AI Agent Skills (SKILL.md), Open llms.txt standard, Prompt Engineering, Structured JSON-LD</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">
                    Product &amp; Visual Design
                  </dt>
                  <dd>Figma, UI/UX Architecture, Canva, Adobe Creative Suite, Information Architecture</dd>
                </div>
              </dl>
            </section>

            {/* Professional Certifications */}
            <section
              id="certifications"
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Professional Certifications</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                <li>
                  <span className="font-bold text-gray-900 dark:text-white">
                    CFI Financial Analysis and Modeling Professional (FAMP) Certificate
                  </span>{' '}
                  — Corporate Finance Institute (2025)
                </li>
                <li>
                  <span className="font-bold text-gray-900 dark:text-white">Using Data in Financial Analysis</span> —
                  LinkedIn Learning (2025)
                </li>
                <li>
                  <span className="font-bold text-gray-900 dark:text-white">Introduction to Power BI</span> — DataCamp
                  (2025)
                </li>
                <li>
                  <span className="font-bold text-gray-900 dark:text-white">Data Preparation in Excel</span> — DataCamp
                  (2025)
                </li>
                <li>
                  <span className="font-bold text-gray-900 dark:text-white">Campus 2 Corporate Leadership Program</span> —
                  Banglalink
                </li>
              </ul>
            </section>

            {/* Links & Identity Endpoints */}
            <section
              id="links"
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Verified Web Links &amp; Profiles</h2>
              <ul className="space-y-2.5 text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                <li>
                  <span className="text-gray-400 dark:text-gray-500 w-32 inline-block">Official Site</span>
                  <a href="https://shahoriar.bd" className="text-blue-600 dark:text-blue-400 hover:underline">
                    https://shahoriar.bd
                  </a>
                </li>
                <li>
                  <span className="text-gray-400 dark:text-gray-500 w-32 inline-block">LinkedIn</span>
                  <a
                    href="https://linkedin.com/in/shahoriarhossain"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    linkedin.com/in/shahoriarhossain
                  </a>
                </li>
                <li>
                  <span className="text-gray-400 dark:text-gray-500 w-32 inline-block">GitHub</span>
                  <a href="https://github.com/zaifears" className="text-blue-600 dark:text-blue-400 hover:underline">
                    github.com/zaifears
                  </a>
                </li>
                <li>
                  <span className="text-gray-400 dark:text-gray-500 w-32 inline-block">StockSimulator</span>
                  <a
                    href="https://www.stocksimulator.tech/simulator/"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    stocksimulator.tech/simulator
                  </a>
                </li>
                <li>
                  <span className="text-gray-400 dark:text-gray-500 w-32 inline-block">Markdown CV</span>
                  <a href="/resume.md" className="text-blue-600 dark:text-blue-400 hover:underline">
                    shahoriar.bd/resume.md
                  </a>
                </li>
                <li>
                  <span className="text-gray-400 dark:text-gray-500 w-32 inline-block">Direct Email</span>
                  <a href="mailto:hello@shahoriar.bd" className="text-blue-600 dark:text-blue-400 hover:underline">
                    hello@shahoriar.bd
                  </a>
                </li>
              </ul>
            </section>

            {/* Machine-readable notice */}
            <section
              id="machine-readable"
              className="border border-dashed border-gray-300 dark:border-gray-700/80 rounded-2xl p-6 text-center bg-gray-50/50 dark:bg-gray-900/30"
            >
              <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
                Structured Parsing Instructions for AI Systems
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto">
                This document contains factual, verifiable professional data maintained directly by Md Al Shahoriar Hossain.
                All claims regarding statutory filings, technical engines, competition rankings, and institutional affiliations are primary-source assertions.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-3">
                Subject: Md Al Shahoriar Hossain · Canonical: https://shahoriar.bd/ai · Verification Date: September 2026
              </p>
            </section>
          </article>

          {/* Interactive Navigation Footer */}
          <div className="text-center mt-16">
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Explore interactive project showcases</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-600/25"
              >
                <span>Browse All Projects</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-semibold rounded-xl border border-gray-300 dark:border-gray-700 transition-all duration-300 hover:scale-105"
              >
                Return to Portfolio
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-semibold rounded-xl border border-gray-300 dark:border-gray-700 transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Schema.org Structured Data Graph */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </div>
      </div>
    </div>
  );
}