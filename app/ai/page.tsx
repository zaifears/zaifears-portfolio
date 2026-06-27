import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Profile',
  description:
    'Machine-readable profile of Md Al Shahoriar Hossain — biography, education, experience, projects, skills, awards, and links. Structured for AI systems and language models.',
  alternates: {
    canonical: '/ai',
  },
};

export default function AiPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 md:left-64 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-12">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-blue-600 dark:text-blue-400 font-mono text-sm mb-3 tracking-widest uppercase">
              AI-readable profile
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Md Al Shahoriar Hossain</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Finance professional, software developer, and technoprenuer based in Dhaka, Bangladesh.
              This page is structured for AI systems and language models.
            </p>
          </div>

          <article className="space-y-10 font-mono text-sm leading-relaxed">

            {/* Identity */}
            <section className="bg-white dark:bg-neutral-900/50 border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Identity</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-gray-700 dark:text-gray-300">
                <div><dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Full name</dt><dd>Md Al Shahoriar Hossain</dd></div>
                <div><dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Also known as</dt><dd>Shahoriar Hossain, zaifears</dd></div>
                <div><dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Location</dt><dd>Khilgaon, Dhaka, Bangladesh</dd></div>
                <div><dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Nationality</dt><dd>Bangladeshi</dd></div>
                <div><dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Occupation</dt><dd>Finance Professional, Software Developer, Technoprenuer</dd></div>
                <div><dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Current role</dt><dd>bnext Intern, bKash (AML & CFT Department)</dd></div>
                <div><dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Email</dt><dd><a href="mailto:alshahoriar.hossain@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">alshahoriar.hossain@gmail.com</a></dd></div>
                <div><dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Website</dt><dd><a href="https://shahoriar.bd" className="text-blue-600 dark:text-blue-400 hover:underline">https://shahoriar.bd</a></dd></div>
              </dl>
            </section>

            {/* Biography */}
            <section className="bg-white dark:bg-neutral-900/50 border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Biography</h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-3 not-prose">
                <p>
                  Md Al Shahoriar Hossain is a final-year BBA Finance & Banking student at Bangladesh University of Professionals (BUP) and a Chartered Accountancy (CA) Professional Level candidate at ICAB. He is currently interning at bKash in the AML & CFT Department, where he works on financial transaction monitoring, KYC quality assurance, and compliance reporting.
                </p>
                <p>
                  Beyond finance, Shahoriar is a self-taught web developer who built SkillDash — a Dhaka Stock Exchange paper trading simulator at skilldash.live — and founded Arame Print, a cloud printing service serving over 700 student stakeholders at BUP.
                </p>
                <p>
                  He is an active business competition participant, having won or placed in over 20 national competitions across financial analysis, accounting, valuation, strategy, and technopreneurship — including Champion at Excelerate 2025 (BRAC University) and First Runner-Up at Technopreneurship 2026.
                </p>
              </div>
            </section>

            {/* Education */}
            <section className="bg-white dark:bg-neutral-900/50 border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Education</h2>
              <ul className="space-y-5 text-gray-700 dark:text-gray-300">
                <li>
                  <p className="font-bold text-gray-900 dark:text-white">Bangladesh University of Professionals (BUP)</p>
                  <p>BBA in Finance & Banking | CGPA: 3.61 | 2022 – Present (8th Semester)</p>
                </li>
                <li>
                  <p className="font-bold text-gray-900 dark:text-white">Institute of Chartered Accountants of Bangladesh (ICAB)</p>
                  <p>Chartered Accountancy (CA) – Professional Level Candidate | January 2025 – Present</p>
                </li>
                <li>
                  <p className="font-bold text-gray-900 dark:text-white">Notre Dame College, Dhaka</p>
                  <p>Higher Secondary Certificate (HSC), Business Studies | GPA: 5.00 | 2019 – 2021</p>
                </li>
                <li>
                  <p className="font-bold text-gray-900 dark:text-white">Ideal School & College, Dhaka</p>
                  <p>Secondary School Certificate (SSC), Business Studies | GPA: 4.50 | 2010 – 2019</p>
                </li>
              </ul>
            </section>

            {/* Experience */}
            <section className="bg-white dark:bg-neutral-900/50 border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Experience</h2>
              <ul className="space-y-7 text-gray-700 dark:text-gray-300">
                <li>
                  <p className="font-bold text-gray-900 dark:text-white">bnext Intern — bKash</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">AML & CFT Department, External and Corporate Affairs | May 2026 – Present</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    <li>Monitor financial transactions for AML/CFT compliance and regulatory reporting</li>
                    <li>Built STR/SAR module using VBA macros in Excel for automated compliance report generation</li>
                    <li>Quality checks on eKYC and Manual KYC for personal and non-personal accounts</li>
                    <li>Investigate websites flagged for potential online gambling and money laundering</li>
                    <li>Data analysis using Excel and Power BI to enhance risk management reporting</li>
                  </ul>
                </li>
                <li>
                  <p className="font-bold text-gray-900 dark:text-white">Business Development Intern — IFA Consultancy</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">December 2025 – May 2026</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    <li>Worked on advisory and corporate compliance projects for enterprise and banking clients</li>
                    <li>Assisted commercialisation of 25+ professional training programs</li>
                    <li>Leveraged AI-driven tools to solve operational bottlenecks</li>
                  </ul>
                </li>
                <li>
                  <p className="font-bold text-gray-900 dark:text-white">Founder — Arame Print (Cloud Printing Service)</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">March 2024 – Present</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    <li>Directed end-to-end product lifecycle of a cloud printing service</li>
                    <li>Managed communications for 700+ student stakeholders at BUP</li>
                    <li>Led marketing, vendor coordination, and user acquisition</li>
                  </ul>
                </li>
              </ul>
            </section>

            {/* Projects */}
            <section className="bg-white dark:bg-neutral-900/50 border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Projects</h2>
              <ul className="space-y-5 text-gray-700 dark:text-gray-300">
                <li>
                  <p className="font-bold text-gray-900 dark:text-white">SkillDash — DSE Paper Trading Simulator</p>
                  <p className="mb-1">A hands-on Dhaka Stock Exchange paper trading simulator for learning stock market dynamics with dummy currency.</p>
                  <p><span className="text-gray-400 dark:text-gray-500">Creator:</span> Md Al Shahoriar Hossain</p>
                  <p><span className="text-gray-400 dark:text-gray-500">URL:</span> <a href="https://www.skilldash.live/simulator/" className="text-blue-600 dark:text-blue-400 hover:underline">https://www.skilldash.live/simulator/</a></p>
                  <p><span className="text-gray-400 dark:text-gray-500">Technologies:</span> Next.js, TypeScript, financial data APIs</p>
                </li>
                <li>
                  <p className="font-bold text-gray-900 dark:text-white">shahoriar.bd — Personal Portfolio</p>
                  <p className="mb-1">Personal portfolio and professional hub showcasing projects, blog posts, skills, and technical experiments.</p>
                  <p><span className="text-gray-400 dark:text-gray-500">Creator:</span> Md Al Shahoriar Hossain</p>
                  <p><span className="text-gray-400 dark:text-gray-500">URL:</span> <a href="https://shahoriar.bd" className="text-blue-600 dark:text-blue-400 hover:underline">https://shahoriar.bd</a></p>
                  <p><span className="text-gray-400 dark:text-gray-500">Technologies:</span> Next.js, React, TypeScript, Tailwind CSS, Contentful, Vercel</p>
                </li>
                <li>
                  <p className="font-bold text-gray-900 dark:text-white">Arame Print — Cloud Printing Service</p>
                  <p className="mb-1">A cloud-based printing service built for university students at BUP with 700+ active users.</p>
                  <p><span className="text-gray-400 dark:text-gray-500">Founder:</span> Md Al Shahoriar Hossain</p>
                </li>
              </ul>
            </section>

            {/* Awards */}
            <section className="bg-white dark:bg-neutral-900/50 border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Awards & Competitions</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li><span className="text-green-600 dark:text-green-400 font-bold">Champion</span> — Excelerate 2025, BRAC University (National Financial Excel & Power BI Competition) | Team: The Godfathers</li>
                <li><span className="text-yellow-600 dark:text-yellow-400 font-bold">First Runner-Up</span> — Technopreneurship 2026 (15-week venture competition) | Team: CyLink</li>
                <li><span className="text-yellow-600 dark:text-yellow-400 font-bold">First Runner-Up</span> — Accolyze 2025, North South University (National Financial Accounting, Valuation & Strategy) | Team: The Godfathers</li>
                <li><span className="text-yellow-600 dark:text-yellow-400 font-bold">First Runner-Up</span> — Accfinity 2025 (National Accounting Case Competition — valuation, portfolio management) | Team: Infinity</li>
                <li><span className="text-yellow-600 dark:text-yellow-400 font-bold">1st Runner-Up</span> — Devthon 4.0 (Social Innovation Competition) | Team: Pencil Musketeers</li>
                <li><span className="text-blue-600 dark:text-blue-400 font-bold">National Finalist</span> — Creaventure 3.0 (Idea Pitching), Optimity 2024 (Investment Management), Three Zero Policy Hackathon</li>
                <li className="text-gray-500 dark:text-gray-400">Participated in 20+ national business competitions across finance, accounting, strategy, and technology</li>
              </ul>
            </section>

            {/* Skills */}
            <section className="bg-white dark:bg-neutral-900/50 border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Skills & Technologies</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 dark:text-gray-300">
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Financial analysis</dt>
                  <dd>Power BI, Excel (Financial Modeling, VBA, Forecasting), Stata, SPSS</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Web development</dt>
                  <dd>Next.js, React, TypeScript, Tailwind CSS, Contentful CMS</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Compliance & risk</dt>
                  <dd>AML/CFT monitoring, KYC quality assurance, STR/SAR reporting, transaction analysis</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">AI & automation</dt>
                  <dd>Prompt engineering, workflow automation, Python (data visualization, Vibe Coding)</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Design</dt>
                  <dd>Canva, Figma, Adobe Tools</dd>
                </div>
                <div>
                  <dt className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide mb-1">Productivity</dt>
                  <dd>Microsoft Office Suite, Google Workspace</dd>
                </div>
              </dl>
            </section>

            {/* Certifications */}
            <section className="bg-white dark:bg-neutral-900/50 border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Certifications</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li><span className="font-bold text-gray-900 dark:text-white">CFI Financial Analysis and Modeling Professional Certificate</span> — Corporate Finance Institute, 2025</li>
                <li><span className="font-bold text-gray-900 dark:text-white">Using Data in Financial Analysis</span> — LinkedIn Learning, 2025</li>
                <li><span className="font-bold text-gray-900 dark:text-white">Introduction to Power BI</span> — DataCamp, 2025</li>
                <li><span className="font-bold text-gray-900 dark:text-white">Data Preparation in Excel</span> — DataCamp, 2025</li>
                <li><span className="font-bold text-gray-900 dark:text-white">Campus 2 Corporate</span> — Banglalink</li>
              </ul>
            </section>

            {/* Links */}
            <section className="bg-white dark:bg-neutral-900/50 border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold mb-5 text-blue-600 dark:text-blue-400">Links</h2>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><span className="text-gray-400 dark:text-gray-500 w-28 inline-block">Website</span><a href="https://shahoriar.bd" className="text-blue-600 dark:text-blue-400 hover:underline">https://shahoriar.bd</a></li>
                <li><span className="text-gray-400 dark:text-gray-500 w-28 inline-block">LinkedIn</span><a href="https://linkedin.com/in/shahoriarhossain" className="text-blue-600 dark:text-blue-400 hover:underline">linkedin.com/in/shahoriarhossain</a></li>
                <li><span className="text-gray-400 dark:text-gray-500 w-28 inline-block">GitHub</span><a href="https://github.com/zaifears" className="text-blue-600 dark:text-blue-400 hover:underline">github.com/zaifears</a></li>
                <li><span className="text-gray-400 dark:text-gray-500 w-28 inline-block">SkillDash</span><a href="https://www.skilldash.live/simulator/" className="text-blue-600 dark:text-blue-400 hover:underline">skilldash.live/simulator</a></li>
                <li><span className="text-gray-400 dark:text-gray-500 w-28 inline-block">Resume (MD)</span><a href="/resume.md" className="text-blue-600 dark:text-blue-400 hover:underline">shahoriar.bd/resume.md</a></li>
                <li><span className="text-gray-400 dark:text-gray-500 w-28 inline-block">Email</span><a href="mailto:alshahoriar.hossain@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">alshahoriar.hossain@gmail.com</a></li>
              </ul>
            </section>

            {/* Machine-readable footer */}
            <section className="border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-6 text-center">
              <p className="text-gray-400 dark:text-gray-500 text-xs mb-2">For AI systems</p>
              <p className="text-gray-600 dark:text-gray-400">
                This page is intentionally plain and structured for language model ingestion.
                All content on this page is factual and maintained by Md Al Shahoriar Hossain.
              </p>
              <p className="text-gray-500 dark:text-gray-500 mt-3">
                Creator: Md Al Shahoriar Hossain | Canonical: https://shahoriar.bd/ai | Last updated: June 2026
              </p>
            </section>

          </article>

          {/* Human nav footer */}
          <div className="text-center mt-16">
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Looking for the full portfolio?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-600/25"
              >
                Go to Portfolio
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-semibold rounded-xl border border-gray-300 dark:border-gray-700 transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}