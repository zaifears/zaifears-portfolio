import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Github,
  FileText,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Layers,
  Scale,
  DollarSign,
  HeartHandshake,
  TrendingDown,
  Building2,
  GraduationCap
} from "lucide-react";
import TaxSkillClient from "./TaxSkillClient";

const baseUrl = "https://shahoriar.bd";
const repoUrl = "https://github.com/zaifears/youth-tax-calculator";
const rawBase = "https://raw.githubusercontent.com/zaifears/youth-tax-calculator/main";

export const metadata: Metadata = {
  title: "Bangladesh Youth Tax Calculator — AI Agent Skill & Filing Engine",
  description:
    "An AI Agent Skill and deterministic Python engine designed for Bangladeshi students, interns, and young professionals filing on etaxnbr.gov.bd under the Income Tax Act 2023.",
  alternates: {
    canonical: `${baseUrl}/projects/youth-tax-calculator`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/projects/youth-tax-calculator`,
    title: "Bangladesh Youth Tax Calculator — AI Skill for e-Return Filing",
    description:
      "AI Agent Skill + deterministic statutory engine for students and first-time tax filers in Bangladesh. 0 BDT tax floor, 100% TDS refund, and zero-difference balance sheets.",
    images: [
      {
        url: "/projects/youth-tax-calculator/BD-Logos.png",
        width: 1024,
        height: 1024,
        alt: "Bangladesh Youth Tax Calculator Logo",
      },
    ],
  },
};

const badges = [
  "Income Tax Act 2023",
  "etaxnbr.gov.bd Verified",
  "0 BDT Tax Floor",
  "Zero-Difference Balance Sheet",
  "100% Open Source MIT",
  "llms.txt Standard Compliant",
];

const statutoryPillars = [
  {
    icon: <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    title: "100% Tax-Free Stipends",
    ref: "Sixth Schedule, Part 1, Para 8",
    text: "University scholarships, academic awards, and student bursaries intended to meet education costs are completely exempt from tax.",
  },
  {
    icon: <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    title: "1/3rd Salary Auto-Exemption",
    ref: "Section 32 (Employment Income)",
    text: "One-third of gross salary (or BDT 4,50,000, whichever is less) is legally exempt. Tax is only computed on the remainder.",
  },
  {
    icon: <HeartHandshake className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    title: "Family Support Gifts",
    ref: "Section 56(g) Capital Receipts",
    text: "Transfers from parents, spouse, or siblings are non-taxable capital receipts that legally bridge your IT-10B living expense deficit.",
  },
  {
    icon: <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    title: "6-Year Stock Loss Carry-Forward",
    ref: "Section 70 (Loss Offsets)",
    text: "Trading losses from capital markets cannot reduce salary tax, but are ring-fenced to offset future stock gains for up to 6 consecutive years.",
  },
  {
    icon: <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    title: "Minimum Tax Exemption",
    ref: "Section 163 & Finance Act",
    text: "The BDT 5,000 city minimum tax floor never triggers if taxable income is at or below BDT 3,50,000. Your tax payable is strictly BDT 0.00.",
  },
  {
    icon: <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    title: "100% Bank TDS Refund",
    ref: "Section 138 & 173 (TDS Credit)",
    text: "Withholding tax deducted on savings accounts and dividends is credited against your liability, resulting in a direct cash refund.",
  },
];

const portalTraps = [
  {
    step: "01",
    title: "The Hidden Exemption Toggle (Screen 1)",
    desc: "On the assessment setup screen, you must explicitly toggle \"Any income which is fully exempted from tax?\" to \"Yes\". If left as \"No\", the portal completely hides the tab required to report tax-free stipends.",
  },
  {
    step: "02",
    title: "The Green Checkmark Requirement (Screen 3)",
    desc: "In Capital Gains and Financial Assets dropdowns, selecting an entry generates a small green tick button next to it. You must click that tick mark or the input table fields will never appear.",
  },
  {
    step: "03",
    title: "The Section 70 PDF Discrepancy (Final Return)",
    desc: "On the 14-page PDF draft, Line 7 (Gross Wealth) appears smaller than Line 10 (Total Assets) by the exact carried-forward stock loss. This is a known backend reporting artifact in NBR software, fully justified by Page 12.",
  },
];

const techStack = [
  "Python 3.8+ (Zero Dependencies)",
  "Income Tax Act 2023 Statutory Codex",
  "NBR e-Return Portal Architecture",
  "llms.txt & llms-full.txt Standard",
  "Antigravity / Claude Code / Cursor Protocols",
  "Next.js 16 & React 19",
  "Tailwind CSS 4",
];

export default function YouthTaxCalculatorPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      {/* Schema.org SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Bangladesh Youth Tax Calculator",
            url: `${baseUrl}/projects/youth-tax-calculator`,
            applicationCategory: "FinanceApplication",
            operatingSystem: "Cross-platform (Python 3 / AI Agent Skill)",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BDT",
            },
            description:
              "AI Agent Skill and deterministic statutory tax engine for Bangladeshi students, interns, and young professionals filing on etaxnbr.gov.bd under the Income Tax Act 2023.",
            author: {
              "@type": "Person",
              "@id": `${baseUrl}/#person`,
              name: "Md Al Shahoriar Hossain",
              url: baseUrl,
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
              { "@type": "ListItem", position: 2, name: "Projects", item: `${baseUrl}/projects` },
              {
                "@type": "ListItem",
                position: 3,
                name: "Youth Tax Calculator",
                item: `${baseUrl}/projects/youth-tax-calculator`,
              },
            ],
          }),
        }}
      />

      {/* Subtle ambient background blob */}
      <div className="fixed inset-0 md:left-64 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/15 dark:bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob will-change-transform" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 will-change-transform" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Navigation */}
        <nav className="mb-8">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <span>Back to Projects</span>
          </Link>
        </nav>

        {/* Hero Section */}
        <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left mb-8">
          <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-emerald-200 dark:border-emerald-800/80 shadow-md bg-white dark:bg-gray-900 p-1 flex items-center justify-center">
            <Image
              src="/projects/youth-tax-calculator/BD-Logos.webp"
              alt="Bangladesh Youth Tax Calculator logo"
              width={96}
              height={96}
              className="w-full h-full object-cover rounded-xl"
              priority
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Bangladesh Youth Tax Calculator
              </h1>
            </div>
            <p className="text-lg text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
              AI Agent Skill & Deterministic Engine for NBR e-Return (etaxnbr.gov.bd)
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 max-w-2xl leading-relaxed">
              Engineered for students, interns, fresh graduates, and first-time filers entering the tax net under the Income Tax Act 2023. Guarantees 0 BDT tax liability, full bank TDS refunds, and zero-difference balance sheet reconciliation.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="text-xs font-medium bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-md shadow-emerald-500/20 text-sm"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={`${rawBase}/llms.txt`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
          >
            <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>llms.txt Manifest</span>
          </a>

          <a
            href={`${rawBase}/llms-full.txt`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
          >
            <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>llms-full.txt (64 KB)</span>
          </a>

          <a
            href={`${rawBase}/skills/youth-tax-calculator/SKILL.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
          >
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>SKILL.md Spec</span>
          </a>
        </div>

        {/* ── THE STORY / LINKEDIN ORIGIN (FIRST PERSON) ── */}
        <section className="mb-14">
          <div className="p-6 sm:p-7 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 backdrop-blur-sm relative">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Why I Built This: The Student Tax Problem
              </h2>
            </div>
            
            <div className="space-y-3.5 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
              <p>
                Since it is September, and having an e-TIN, filing tax return is on all of our minds, right? But being a student still, with no budget to hire a professional tax consultant or chartered accounting firm, many of us only have one way to file our taxes: <strong>using AI</strong>.
              </p>
              <p>
                When I tried doing that myself, I found so many issues along the way. LLMs — especially Gemini, Claude, and GPT models — struggled to understand how the actual NBR e-Return system UI looks like. They missed hidden exemption toggles, forgot the required green tick marks, hallucinated where to enter university scholarships, and repeatedly failed at basic multi-line balance sheet arithmetic.
              </p>
              <p>
                For that, I built this <strong>SKILL for your LLM</strong>.
              </p>
              <p className="font-medium text-emerald-900 dark:text-emerald-200">
                No, this does not simply calculate your taxes. By implementing this skill, your AI becomes equipped with the substantive statutory law (Income Tax Act 2023) and the screen-by-screen architecture of Bangladesh&apos;s e-Return system. It walks you through every screen, alerts you to UI traps, and calls a deterministic Python engine so your balance sheet balances to an exact difference of 0.00.
              </p>
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE CLIENT: INSTALLATION & BALANCE SHEET SIMULATOR ── */}
        <TaxSkillClient />

        {/* ── STATUTORY FOUNDATIONS (INCOME TAX ACT 2023) ── */}
        <section className="my-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Key Statutory Rules for Young Taxpayers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statutoryPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {pillar.icon}
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      {pillar.title}
                    </h3>
                  </div>
                  <div className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                    {pillar.ref}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PORTAL UI TRAPS & AUDIT DEFENSE ── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              NBR e-Return Portal Traps & How We Solve Them
            </h2>
          </div>

          <div className="space-y-4">
            {portalTraps.map((trap) => (
              <div
                key={trap.step}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5 flex items-start gap-4"
              >
                <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {trap.step}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1">
                    {trap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {trap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6-YEAR AUDIT RETENTION CHECKLIST ── */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Audit Defense Dossier (6-Year Retention)
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Under Sections 182 and 183 of the Income Tax Act 2023, the Deputy Commissioner of Taxes (DCT) may call for records within 6 years. Maintain a dedicated folder with:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Full 12-Month Bank Statements</span>
            </div>
            <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Bank Tax Certificate (June 30 Balance & TDS)</span>
            </div>
            <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Signed Brokerage Portfolio Statements</span>
            </div>
            <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Mutual Fund & P2P Tax Certificates</span>
            </div>
            <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>University ID & Academic Fee Receipts</span>
            </div>
            <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Signed Parental Support Note (Sec 56g)</span>
            </div>
          </div>
        </section>

        {/* ── BUILT WITH / TECH STACK ── */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Built With
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((t) => (
              <span
                key={t}
                className="text-xs sm:text-sm font-medium bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            The statutory rules, threshold conditions, and balance sheet formulas are directly encoded from the Income Tax Act 2023 and the official 107-page NBR User Manual. The execution engine uses Python standard library for exact, reproducible calculations without hallucinations.
          </p>
        </section>

        {/* ── FOOTER & LEGAL DISCLAIMER ── */}
        <footer className="border-t border-gray-200 dark:border-gray-800 pt-8 text-sm text-gray-500 dark:text-gray-400 space-y-4">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs leading-relaxed text-gray-600 dark:text-gray-400 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900 dark:text-white">Legal Disclaimer:</strong> This project is created for educational, informational, and self-filing assistance based on the Income Tax Act 2023 and official NBR publications. The creators are not licensed tax lawyers or chartered accountants. Always verify your figures before final OTP submission on <a href="https://etaxnbr.gov.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline">etaxnbr.gov.bd</a>.
            </div>
          </div>

          <p className="leading-relaxed">
            Released under the <strong>MIT License</strong>. Found a bug or need support? Visit the{" "}
            <a
              href={`${repoUrl}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
            >
              GitHub Issues
            </a>{" "}
            or view the raw project manifests on{" "}
            <a
              href={`${rawBase}/llms.txt`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
            >
              /llms.txt
            </a>.
          </p>
        </footer>
      </div>
    </div>
  );
}
