"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Check, Copy } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const features: { icon: string; text: string }[] = [
  { icon: "🔐", text: "Role-based login, 9 teams, 9 passwords, each team sees only their own data" },
  { icon: "⚡", text: "Auto-fill, select a name, ID and designation populate instantly" },
  { icon: "📅", text: "Custom calendar date picker, built from scratch in VBA, no third-party tools" },
  { icon: "📊", text: "Individual report generator, one click pulls any employee's full absence history" },
  { icon: "🔄", text: "Live leave totals, automatically aggregated across all 9 teams" },
  { icon: "💾", text: "Auto-save, data saves silently every time a user leaves their sheet" },
  { icon: "🖥️", text: "Looks and feels like a standalone app, no Excel ribbon, no sheet tabs, no formula bar" },
];

const tools: string[] = [
  "Excel VBA",
  "UserForms",
  "Class Modules",
  "XLOOKUP",
  "SUMIFS",
  "INDIRECT",
];

const amlFeatures: { icon: string; text: string }[] = [
  { icon: "🕵️‍♂️", text: "Stealth Navigation, bypasses basic anti-bot protections to handle complex SPAs and accordions" },
  { icon: "📸", text: "Forensic Logging, automatically captures and names screenshots at crucial transaction steps" },
  { icon: "⚡", text: "Batch Processing, scans multiple flagged URLs simultaneously using multi-threading" },
  { icon: "📊", text: "Auto-Reporting, compiles findings directly into a clean, auto-generated Excel database" },
  { icon: "📦", text: "Standalone Executable, compiled to a zero-dependency .exe to run on restricted corporate laptops" },
  { icon: "🛑", text: "Manual Bridge, allows pausing the script to manually bypass CAPTCHAs before resuming" },
];

const amlTools: string[] = [
  "Python 3",
  "Playwright",
  "Tkinter",
  "concurrent.futures",
  "OpenPyXL",
  "PyInstaller",
];

export default function ProjectsContent() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-6 sm:space-y-8"
    >
      {/* Section header */}
      <motion.div variants={itemVariants} className="mb-8 sm:mb-10 px-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 sm:mb-3">Projects</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          A selection of technical and business projects - shipped tools, automation scripts, and competition work.
        </p>
      </motion.div>

      {/* ── Bangladesh Youth Tax Calculator card ── */}
      <motion.div
        variants={itemVariants}
        className="group bg-gray-50 dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left col — title + story */}
          <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-4 md:border-r border-gray-200 dark:border-gray-800/50">
            <div className="flex items-center gap-3">
              <Link
                href="/projects/youth-tax-calculator"
                className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-0.5 shadow-sm hover:scale-105 transition-transform">
                  <Image
                    src="/projects/youth-tax-calculator/BD-Logos.webp"
                    alt="Bangladesh Youth Tax Calculator logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </Link>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/40 px-2.5 sm:px-3 py-1 rounded-full mb-1">
                  AI Skill · Tax Tech
                </span>
                <Link
                  href="/projects/youth-tax-calculator"
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded block"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    Bangladesh Youth Tax Calculator
                  </h3>
                </Link>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
              <p className="font-medium text-gray-800 dark:text-gray-200">
                An AI Agent Skill and deterministic statutory engine made for students, interns, and young professionals filing on etaxnbr.gov.bd.
              </p>
              <p>
                Having an e-TIN, filing tax returns is something we all face. But being a student with no budget to hire a CA firm, many turn to AI. Generic models struggle with the NBR portal UI and hallucinate balance sheet math.
              </p>
              <p>
                This skill equips your LLM with the Income Tax Act 2023, guides you through every screen, and uses a deterministic Python engine to ensure your balance sheet difference is exactly 0.00 while keeping tax expense at minimum.
              </p>
            </div>
            <Link
              href="/projects/youth-tax-calculator"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-white/60 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors w-fit mt-auto"
            >
              View Project
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
            </Link>
          </div>

          {/* Right col — tool tags + feature list + python snippet */}
          <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-between gap-5">
            {/* Tools */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 sm:mb-3">
                Tools & Standards
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  "AI Agent Skill",
                  "Python 3 Engine",
                  "Income Tax Act 2023",
                  "etaxnbr.gov.bd",
                  "Form IT-10B",
                  "MIT License",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 sm:mb-3">
                Core Outcomes
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: "⚖️", text: "Keeps tax expense at minimum (0 BDT floor under 3,50,000 BDT)" },
                  { icon: "💵", text: "100% bank TDS refund with direct claiming guidance" },
                  { icon: "📑", text: "Zero-difference balance sheet math via Section 56(g)" },
                  { icon: "🛡️", text: "Prevents NBR e-Return portal errors & audit flags" },
                ].map((f) => (
                  <div
                    key={f.text}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span className="mt-0.5 shrink-0">{f.icon}</span>
                    <span className="leading-snug">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Run / Python Engine snippet (Yellow highlighted position) */}
            <div className="mt-auto pt-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                Standalone Engine
              </p>
              <div className="flex items-center justify-between gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-gray-900 dark:bg-black border border-gray-800 font-mono text-xs shadow-inner">
                <div className="flex items-center gap-2 text-emerald-400 min-w-0 overflow-x-auto no-scrollbar">
                  <span className="text-gray-500 select-none">$</span>
                  <span className="text-gray-100 font-semibold truncate">python calculator.py</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCode("python calculator.py", "tax-cli")}
                  aria-label="Copy python command"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors shrink-0 text-[11px] font-sans font-medium"
                >
                  {copiedId === "tax-cli" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === "tax-cli" ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: footer note */}
        <div className="px-5 sm:px-6 md:px-8 py-3.5 sm:py-4 border-t border-gray-200 dark:border-gray-800/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Open source on GitHub with 1-click installation for Windows and macOS.
          </p>
          <a
            href="https://github.com/zaifears/youth-tax-calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
          >
            <span>github.com/zaifears/youth-tax-calculator</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-2.5 h-2.5" />
          </a>
        </div>
      </motion.div>

      {/* ── LocReminder card ── */}
      <motion.div
        variants={itemVariants}
        className="group bg-gray-50 dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg"
      >
        {/* ── TOP: screenshot strip ── */}
        <Link href="/projects/locreminder" className="block">
          <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-4 w-full bg-gray-100 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800/50 py-5 sm:py-6 px-4 overflow-x-auto no-scrollbar">
            {["0", "1", "2", "4"].map((n) => (
              <div
                key={n}
                className="relative w-20 sm:w-28 md:w-32 aspect-[9/19.5] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm shrink-0"
              >
                <Image
                  src={`/projects/locreminder/screenshots/${n}.jpg`}
                  alt={`LocReminder screenshot ${n}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80px, 128px"
                />
              </div>
            ))}
          </div>
        </Link>

        {/* ── MIDDLE: title + story + tools in a two-col layout on desktop ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-gray-200 dark:border-gray-800/50">
          {/* Left col — title + story */}
          <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-4 md:border-r border-gray-200 dark:border-gray-800/50">
            <div className="flex items-center gap-3">
              <Link
                href="/projects/locreminder"
                className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:scale-105 transition-transform">
                  <Image
                    src="/projects/locreminder/icon.png"
                    alt="LocReminder app icon"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/40 px-2.5 sm:px-3 py-1 rounded-full mb-1">
                  Flutter · Android
                </span>
                <Link
                  href="/projects/locreminder"
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded block"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    LocReminder
                  </h3>
                </Link>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
              <p className="font-medium text-gray-800 dark:text-gray-200">
                A location-based alarm for Android, which helps you wake up at the right place.
              </p>
              <p>
                I kept missing my stop on long bus rides in Dhaka, and a normal alarm cannot help
                with that since you never know exactly when you will arrive.
              </p>
              <p>
                LocReminder rings a real alarm when you reach a place you pinned, not at a set
                time. Sound, vibration and a full screen alert, even on silent and a locked
                screen.
              </p>
              <p>
                No accounts, no analytics, no server. Every release is signed and scanned by
                VirusTotal before it ships.
              </p>
            </div>
            <Link
              href="/projects/locreminder"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-white/60 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors w-fit mt-auto"
            >
              View Project
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
            </Link>
          </div>

          {/* Right col — tool tags + feature list */}
          <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-5">
            {/* Tools */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 sm:mb-3">
                Tools used
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {["Flutter", "Dart", "Kotlin", "OpenStreetMap", "GitHub Actions"].map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 sm:mb-3">
                What it does
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: "🔔", text: "Wakes you with a real alarm, not a quiet notification" },
                  { icon: "🗺️", text: "Runs on OpenStreetMap, no API key or Google account" },
                  { icon: "🔋", text: "Battery-aware polling so a long trip won't drain your phone" },
                  { icon: "🔒", text: "Your location never leaves your device" },
                ].map((f) => (
                  <div
                    key={f.text}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span className="mt-0.5 shrink-0">{f.icon}</span>
                    <span className="leading-snug">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: footer note ── */}
        <div className="px-5 sm:px-6 md:px-8 py-3.5 sm:py-4 border-t border-gray-200 dark:border-gray-800/50">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Published on GitHub Releases, with an F-Droid submission in progress.
          </p>
        </div>
      </motion.div>

      {/* ── Leave Tracker Pro card ── */}
      <motion.div
        variants={itemVariants}
        className="group bg-gray-50 dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg"
      >
        {/* ── TOP: 16:9 video full width ── */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/cPi_UGe0LQE"
            title="I Built a Full Leave Tracker System in Excel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* ── MIDDLE: title + story + tools in a two-col layout on desktop ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-gray-200 dark:border-gray-800/50">
          {/* Left col — title + story */}
          <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-4 md:border-r border-gray-200 dark:border-gray-800/50">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/40 px-2.5 sm:px-3 py-1 rounded-full mb-2 sm:mb-3">
                Excel VBA · HR Automation
              </span>
              <a
                href="https://www.youtube.com/watch?v=cPi_UGe0LQE"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded block"
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  I Built a Full Leave Tracker System in Excel
                </h3>
              </a>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
              <p>
                Our department was tracking absences for 9 teams in a single
                shared spreadsheet, no access control, no validation, pure chaos.
              </p>
              <p>
                My first idea was to fix it entirely with Excel formulas.
                That lasted about 10 minutes.
              </p>
              <p>
                So I learned VBA from scratch and built a proper role-based HR
                absence management system, in a single day.
              </p>
            </div>
            <a
              href="https://www.youtube.com/watch?v=cPi_UGe0LQE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-white/60 group-hover:text-gray-900 dark:group-hover:text-white transition-colors w-fit mt-auto"
            >
              Watch on YouTube
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
            </a>
          </div>

          {/* Right col — tool tags + feature list */}
          <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-5">
            {/* Tools */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 sm:mb-3">
                Tools used
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 sm:mb-3">
                What it does
              </p>
              <div className="flex flex-col gap-2.5">
                {features.map((f) => (
                  <div
                    key={f.text}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span className="mt-0.5 shrink-0">{f.icon}</span>
                    <span className="leading-snug">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: footer note ── */}
        <div className="px-5 sm:px-6 md:px-8 py-3.5 sm:py-4 border-t border-gray-200 dark:border-gray-800/50">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Built entirely in Microsoft Excel VBA - no database, no server, no paid tools.
          </p>
        </div>
      </motion.div>

      {/* ── AML/CFT Scraper Utility card ── */}
      <motion.div
        variants={itemVariants}
        className="group bg-gray-50 dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg"
      >
        {/* ── TOP: LinkedIn Post Embedded Preview ── */}
        <div className="relative w-full bg-[#f3f2ef] dark:bg-[#1d2226] border-b border-gray-200 dark:border-gray-800/50" style={{ minHeight: "500px" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:7489378616720670721"
            title="AML/CFT Scraper Utility LinkedIn Post"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        {/* ── MIDDLE: title + story + tools in a two-col layout on desktop ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left col — title + story */}
          <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-4 md:border-r border-gray-200 dark:border-gray-800/50">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/40 px-2.5 sm:px-3 py-1 rounded-full mb-2 sm:mb-3">
                Python · Automation
              </span>
              <a
                href="https://github.com/zaifears/aml-cft-scraper"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded block"
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  AML/CFT Scraper Utility
                </h3>
              </a>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
              <p>
                Investigating unauthorized &quot;Diamond Top-up&quot; platforms was a highly repetitive task. I had to click through dozens of sketchy e-commerce sites manually just to find which personal bKash accounts were being illicitly used as payment gateways.
              </p>
              <p>
                To speed up my own investigation workflow, I built a stealth-enabled automation script that navigates these dynamic sites, extracts the hidden numbers, and logs the necessary visual evidence.
              </p>
              <p>
                It turned a tedious multi-minute process per site into a 10-second automated batch sweep. I packaged it into a standalone executable so it runs perfectly on my locked-down office laptop without needing admin rights.
              </p>
            </div>
            <a
              href="https://github.com/zaifears/aml-cft-scraper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-white/60 group-hover:text-gray-900 dark:group-hover:text-white transition-colors w-fit mt-auto pt-4"
            >
              View Source Code
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
            </a>
          </div>

          {/* Right col — tool tags + feature list */}
          <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-5">
            {/* Tools */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 sm:mb-3">
                Tools used
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {amlTools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 sm:mb-3">
                What it does
              </p>
              <div className="flex flex-col gap-2.5">
                {amlFeatures.map((f) => (
                  <div
                    key={f.text}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span className="mt-0.5 shrink-0">{f.icon}</span>
                    <span className="leading-snug">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: footer note ── */}
        <div className="px-5 sm:px-6 md:px-8 py-3.5 sm:py-4 border-t border-gray-200 dark:border-gray-800/50">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Built strictly to optimize personal investigation workflows - standalone Python utility.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
