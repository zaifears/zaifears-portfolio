"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faBatteryFull,
  faBell,
  faBolt,
  faBox,
  faCalendarDays,
  faCamera,
  faChartColumn,
  faCheck,
  faCopy,
  faDesktop,
  faDownload,
  faFileLines,
  faFloppyDisk,
  faHand,
  faKey,
  faLock,
  faMap,
  faMoneyBill,
  faRotate,
  faScaleBalanced,
  faShieldHalved,
  faTv,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";

const tapfeedFeatures: { icon: IconDefinition; text: string }[] = [
  {
    icon: faTv,
    text: "Built-in HD and SD live view with sound, full screen, screenshots, and motorized pan and tilt",
  },
  {
    icon: faCalendarDays,
    text: "SD card calendar marking days with recordings stored on the camera's microSD card",
  },
  {
    icon: faDownload,
    text: "Downloads clips as .ts video with queue progress, cancel controls, and plain-language diagnostics",
  },
  {
    icon: faLock,
    text: "100% local network camera traffic with optional Windows Credential Manager storage",
  },
];

const tapfeedTools: string[] = [
  "Rust",
  "Tauri 2",
  "libmpv",
  "PyTapo v3.4.31",
  "Windows 10 and 11",
  "MIT License",
];

const locreminderFeatures: { icon: IconDefinition; text: string }[] = [
  { icon: faBell, text: "Wakes you with a real alarm, not a quiet notification" },
  { icon: faMap, text: "Runs on OpenStreetMap, no API key or Google account" },
  { icon: faBatteryFull, text: "Battery-aware polling so a long trip will not drain your phone" },
  { icon: faLock, text: "Your location never leaves your device" },
];

const locreminderTools: string[] = [
  "Flutter",
  "Dart",
  "Kotlin",
  "OpenStreetMap",
  "GitHub Actions",
];

const taxFeatures: { icon: IconDefinition; text: string }[] = [
  { icon: faScaleBalanced, text: "Keeps tax expense at minimum (0 BDT floor under 4,00,000 BDT)" },
  { icon: faMoneyBill, text: "100% bank TDS refund with direct claiming guidance" },
  { icon: faFileLines, text: "Zero-difference balance sheet math via Section 56(g)" },
  { icon: faShieldHalved, text: "Prevents NBR e-Return portal errors and audit flags" },
];

const taxTools: string[] = [
  "AI Agent Skill",
  "Python 3 Engine",
  "Income Tax Act 2023",
  "etaxnbr.gov.bd",
  "Form IT-10B",
  "MIT License",
];

const leaveFeatures: { icon: IconDefinition; text: string }[] = [
  { icon: faKey, text: "Role-based login: 9 teams and 9 passwords, each team sees only their own data" },
  { icon: faBolt, text: "Auto-fill: select a name, ID and designation populate immediately" },
  { icon: faCalendarDays, text: "Custom calendar date picker built from scratch in VBA with no third-party add-ins" },
  { icon: faChartColumn, text: "Individual report generator: one click pulls any employee's full absence history" },
  { icon: faRotate, text: "Live leave totals automatically aggregated across all 9 teams" },
  { icon: faFloppyDisk, text: "Auto-save: data saves silently every time a user leaves their sheet" },
  { icon: faDesktop, text: "Application interface with no Excel ribbon, no sheet tabs, and no formula bar" },
];

const leaveTools: string[] = [
  "Excel VBA",
  "UserForms",
  "Class Modules",
  "XLOOKUP",
  "SUMIFS",
  "INDIRECT",
];

const amlFeatures: { icon: IconDefinition; text: string }[] = [
  { icon: faUserSecret, text: "Stealth navigation: handles dynamic SPAs and checkout accordions" },
  { icon: faCamera, text: "Forensic logging: automatically captures and names screenshots at key checkout steps" },
  { icon: faBolt, text: "Batch processing: scans multiple flagged URLs simultaneously using multi-threading" },
  { icon: faChartColumn, text: "Auto-reporting: compiles findings directly into a structured Excel case database" },
  { icon: faBox, text: "Standalone executable: compiled to a zero-dependency .exe for locked corporate laptops" },
  { icon: faHand, text: "Manual bridge: allows pausing the script to complete manual checks before resuming" },
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
    <div className="space-y-12 sm:space-y-16">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-none text-ink">
          Projects
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-ink-2">
          Desktop apps, Android utilities, statutory tax engines, and internal compliance automation.
        </p>
      </header>

      {/* 1. TapFeed */}
      <article className="panel overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          {/* Left column: identity + story + actions */}
          <div className="p-6 sm:p-8 flex flex-col gap-5 lg:border-r border-rule">
            <div className="flex items-center gap-3.5">
              <Link href="/projects/tapfeed" className="shrink-0 rounded-full">
                <Image
                  src="/projects/tapfeed/TapFeed.png"
                  alt="TapFeed logo"
                  width={52}
                  height={52}
                  className="h-13 w-13 rounded-full object-cover"
                />
              </Link>
              <div>
                <Link href="/projects/tapfeed" className="block rounded-control">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-ink hover:text-accent-text transition-colors">
                    TapFeed
                  </h2>
                </Link>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="inline-block rounded-full bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent-text">
                    Windows 10 and 11
                  </span>
                  <span className="text-xs text-muted">
                    Previously named Tapo-Viewer
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-ink-2">
              <p className="font-medium text-ink">
                Watch your TP-Link Tapo camera live in HD, control motorized pan and tilt, and save microSD card recordings on Windows.
              </p>
              <p>
                Rebuilt in v2.0 with Rust, Tauri 2, embedded libmpv, and PyTapo: a 62&nbsp;MB portable executable that opens in about 3 seconds (down from 264&nbsp;MB and 24 to 47 seconds in Tapo-Viewer 1.x) and automatically migrates your saved settings and passwords on first launch.
              </p>
            </div>

            <div className="mt-auto pt-2 flex flex-wrap items-center gap-3">
              <Link href="/projects/tapfeed" className="btn-primary whitespace-nowrap">
                <span>Explore TapFeed</span>
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <a
                href="https://github.com/zaifears/tapfeed/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet whitespace-nowrap"
              >
                <span>Download TapFeed.exe</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right column: stack + features */}
          <div className="p-6 sm:p-8 flex flex-col gap-6 border-t lg:border-t-0 border-rule">
            <div>
              <p className="text-sm font-semibold text-ink mb-3">
                Stack and architecture
              </p>
              <div className="flex flex-wrap gap-2">
                {tapfeedTools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-rule bg-paper px-3 py-1 text-xs font-medium text-ink-2"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">
                What it does
              </p>
              <ul className="space-y-3">
                {tapfeedFeatures.map((feature) => (
                  <li
                    key={feature.text}
                    className="flex items-start gap-3 text-sm sm:text-base text-ink-2"
                  >
                    <span className="mt-1 shrink-0">
                      <FontAwesomeIcon icon={feature.icon} className="h-4 w-4 text-accent-text" aria-hidden="true" />
                    </span>
                    <span className="leading-snug">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* 2. LocReminder */}
      <article className="panel overflow-hidden">
        <Link href="/projects/locreminder" className="block border-b border-rule bg-paper-3 py-6 px-4">
          <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-4 overflow-x-auto custom-scrollbar">
            {["0", "1", "2", "4"].map((n) => (
              <div
                key={n}
                className="relative w-24 sm:w-32 md:w-36 aspect-[9/19.5] rounded-control overflow-hidden border border-rule bg-paper shrink-0"
              >
                <Image
                  src={`/projects/locreminder/screenshots/${n}.jpg`}
                  alt={`LocReminder screenshot ${n}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 144px"
                />
              </div>
            ))}
          </div>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          {/* Left column: title + story */}
          <div className="p-6 sm:p-8 flex flex-col gap-5 lg:border-r border-rule">
            <div className="flex items-center gap-3.5">
              <Link href="/projects/locreminder" className="shrink-0 rounded-control">
                <Image
                  src="/projects/locreminder/icon.png"
                  alt="LocReminder app icon"
                  width={52}
                  height={52}
                  className="h-13 w-13 rounded-control border border-rule object-cover"
                />
              </Link>
              <div>
                <Link href="/projects/locreminder" className="block rounded-control">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-ink hover:text-accent-text transition-colors">
                    LocReminder
                  </h2>
                </Link>
                <span className="mt-1.5 inline-block rounded-full bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent-text">
                  Flutter, Android 6.0+
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-ink-2">
              <p className="font-medium text-ink">
                A location-based alarm for Android that wakes you up when you reach your stop.
              </p>
              <p>
                I kept missing my stop on long bus rides in Dhaka, and a time-based alarm cannot help when traffic makes arrival times unpredictable. LocReminder rings a persistent alarm with sound, vibration, and a full-screen lock-screen alert when you enter the radius you pinned.
              </p>
              <p>
                No accounts, no analytics, and no server. Every release is signed and scanned by VirusTotal before shipping.
              </p>
            </div>

            <div className="mt-auto pt-2">
              <Link href="/projects/locreminder" className="btn-primary whitespace-nowrap">
                <span>Explore LocReminder</span>
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right column: tools + features */}
          <div className="p-6 sm:p-8 flex flex-col gap-6 border-t lg:border-t-0 border-rule">
            <div>
              <p className="text-sm font-semibold text-ink mb-3">
                Tools used
              </p>
              <div className="flex flex-wrap gap-2">
                {locreminderTools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-rule bg-paper px-3 py-1 text-xs font-medium text-ink-2"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">
                What it does
              </p>
              <ul className="space-y-3">
                {locreminderFeatures.map((f) => (
                  <li
                    key={f.text}
                    className="flex items-start gap-3 text-sm sm:text-base text-ink-2"
                  >
                    <span className="mt-1 shrink-0">
                      <FontAwesomeIcon icon={f.icon} className="h-4 w-4 text-accent-text" aria-hidden="true" />
                    </span>
                    <span className="leading-snug">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* 3. Bangladesh Youth Tax Calculator Skill */}
      <article className="panel overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          {/* Left column: title + story + actions */}
          <div className="p-6 sm:p-8 flex flex-col gap-5 lg:border-r border-rule">
            <div className="flex items-center gap-3.5">
              <Link href="/projects/youth-tax-calculator" className="shrink-0 rounded-control">
                <Image
                  src="/projects/youth-tax-calculator/BD-Logos.webp"
                  alt="Bangladesh Youth Tax Calculator logo"
                  width={52}
                  height={52}
                  className="h-13 w-13 rounded-control border border-rule bg-paper p-1 object-cover"
                />
              </Link>
              <div>
                <Link href="/projects/youth-tax-calculator" className="block rounded-control">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-ink hover:text-accent-text transition-colors">
                    Bangladesh Youth Tax Calculator Skill
                  </h2>
                </Link>
                <span className="mt-1.5 inline-block rounded-full bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent-text">
                  AI Agent Skill, Tax Tech
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-ink-2">
              <p className="font-medium text-ink">
                An AI Agent Skill and deterministic statutory engine for students, interns, and young professionals filing on etaxnbr.gov.bd.
              </p>
              <p>
                Once you have an e-TIN, filing an annual tax return is mandatory, yet students rarely have the budget to hire a CA firm. Generic AI models struggle with the NBR portal UI and miscalculate Form IT-10B net-wealth reconciliation.
              </p>
              <p>
                This skill equips your coding assistant with the Income Tax Act 2023, walks through every portal screen, and runs a deterministic Python engine so your balance sheet difference is 0.00 while keeping tax liability at minimum.
              </p>
            </div>

            <div className="mt-auto pt-2 flex flex-wrap items-center gap-3">
              <Link href="/projects/youth-tax-calculator" className="btn-primary whitespace-nowrap">
                <span>Explore Tax Skill</span>
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <a
                href="https://github.com/zaifears/youth-tax-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet whitespace-nowrap"
              >
                <span>GitHub repository</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right column: tools + outcomes + CLI snippet */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 border-t lg:border-t-0 border-rule">
            <div>
              <p className="text-sm font-semibold text-ink mb-3">
                Tools and standards
              </p>
              <div className="flex flex-wrap gap-2">
                {taxTools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-rule bg-paper px-3 py-1 text-xs font-medium text-ink-2"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">
                Core outcomes
              </p>
              <ul className="space-y-3">
                {taxFeatures.map((f) => (
                  <li
                    key={f.text}
                    className="flex items-start gap-3 text-sm sm:text-base text-ink-2"
                  >
                    <span className="mt-1 shrink-0">
                      <FontAwesomeIcon icon={f.icon} className="h-4 w-4 text-accent-text" aria-hidden="true" />
                    </span>
                    <span className="leading-snug">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <p className="text-sm font-semibold text-ink mb-2">
                Standalone CLI engine
              </p>
              <div className="flex items-center justify-between gap-3 rounded-control border border-rule bg-paper-3 px-4 py-2.5 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2 min-w-0 overflow-x-auto">
                  <span className="text-muted select-none">$</span>
                  <span className="text-ink font-semibold truncate">python calculator.py</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCode("python calculator.py", "tax-cli")}
                  aria-label="Copy python command"
                  className="inline-flex items-center gap-1.5 rounded-control border border-rule bg-paper-2 px-3 py-1.5 text-xs font-sans font-semibold text-ink transition-colors hover:bg-paper active:scale-98 disabled:opacity-55 disabled:cursor-not-allowed shrink-0"
                >
                  <FontAwesomeIcon
                    icon={copiedId === "tax-cli" ? faCheck : faCopy}
                    className="h-3.5 w-3.5 text-accent-text"
                    aria-hidden="true"
                  />
                  <span>{copiedId === "tax-cli" ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Section Header: Internal Systems */}
      <div className="pt-4">
        <h2 className="text-3xl sm:text-4xl font-semibold text-ink">
          Internal systems and corporate automation
        </h2>
        <p className="mt-2 max-w-2xl text-base sm:text-lg text-ink-2">
          Production tools engineered to eliminate manual bottlenecks in HR absence tracking and financial crime compliance.
        </p>
      </div>

      {/* 4. Leave Tracker */}
      <article className="panel overflow-hidden">
        <div className="relative w-full border-b border-rule bg-paper-3" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/cPi_UGe0LQE"
            title="I Built a Full Leave Tracker System in Excel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          {/* Left column: title + story */}
          <div className="p-6 sm:p-8 flex flex-col gap-5 lg:border-r border-rule">
            <div>
              <span className="inline-block rounded-full bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent-text mb-3">
                Excel VBA, HR Automation
              </span>
              <a
                href="https://www.youtube.com/watch?v=cPi_UGe0LQE"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-control"
              >
                <h3 className="text-2xl sm:text-3xl font-semibold text-ink hover:text-accent-text transition-colors">
                  I Built a Full Leave Tracker System in Excel
                </h3>
              </a>
            </div>

            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-ink-2">
              <p>
                Our department tracked absences for 9 teams in a single shared spreadsheet with no access control and no input validation.
              </p>
              <p>
                My first attempt was to fix it purely with Excel formulas, which lasted about 10 minutes before breaking under concurrent edits.
              </p>
              <p>
                So I learned VBA from scratch and engineered a role-based HR absence management system in a single day, complete with isolated team logins and instant individual absence history reports.
              </p>
            </div>

            <div className="mt-auto pt-2">
              <a
                href="https://www.youtube.com/watch?v=cPi_UGe0LQE"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet whitespace-nowrap"
              >
                <span>Watch on YouTube</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right column: tools + features */}
          <div className="p-6 sm:p-8 flex flex-col gap-6 border-t lg:border-t-0 border-rule">
            <div>
              <p className="text-sm font-semibold text-ink mb-3">
                Tools used
              </p>
              <div className="flex flex-wrap gap-2">
                {leaveTools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-rule bg-paper px-3 py-1 text-xs font-medium text-ink-2"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">
                What it does
              </p>
              <ul className="space-y-3">
                {leaveFeatures.map((f) => (
                  <li
                    key={f.text}
                    className="flex items-start gap-3 text-sm sm:text-base text-ink-2"
                  >
                    <span className="mt-1 shrink-0">
                      <FontAwesomeIcon icon={f.icon} className="h-4 w-4 text-accent-text" aria-hidden="true" />
                    </span>
                    <span className="leading-snug">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* 5. AML/CFT Scraper Utility */}
      <article className="panel overflow-hidden">
        <div className="relative w-full border-b border-rule bg-paper-3" style={{ minHeight: "500px" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:7489378616720670721"
            title="AML/CFT Scraper Utility LinkedIn Post"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          {/* Left column: title + story */}
          <div className="p-6 sm:p-8 flex flex-col gap-5 lg:border-r border-rule">
            <div>
              <span className="inline-block rounded-full bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent-text mb-3">
                Python, Forensic Automation
              </span>
              <a
                href="https://github.com/zaifears/aml-cft-scraper"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-control"
              >
                <h3 className="text-2xl sm:text-3xl font-semibold text-ink hover:text-accent-text transition-colors">
                  AML/CFT Scraper Utility
                </h3>
              </a>
            </div>

            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-ink-2">
              <p>
                Investigating unauthorized digital top-up platforms required clicking through dozens of dynamic e-commerce sites manually to uncover personal bKash accounts illicitly operating as merchant gateways.
              </p>
              <p>
                To accelerate my investigation workflow, I built a stealth Playwright automation utility that navigates these checkout flows, extracts the hidden wallet numbers, and captures timestamped visual evidence.
              </p>
              <p>
                It reduced a multi-minute manual check per site into a 10-second batch sweep, compiled as a standalone executable that runs on locked-down corporate laptops without administrator privileges.
              </p>
            </div>

            <div className="mt-auto pt-2">
              <a
                href="https://github.com/zaifears/aml-cft-scraper"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet whitespace-nowrap"
              >
                <span>View source on GitHub</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right column: tools + features */}
          <div className="p-6 sm:p-8 flex flex-col gap-6 border-t lg:border-t-0 border-rule">
            <div>
              <p className="text-sm font-semibold text-ink mb-3">
                Tools used
              </p>
              <div className="flex flex-wrap gap-2">
                {amlTools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-rule bg-paper px-3 py-1 text-xs font-medium text-ink-2"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">
                What it does
              </p>
              <ul className="space-y-3">
                {amlFeatures.map((f) => (
                  <li
                    key={f.text}
                    className="flex items-start gap-3 text-sm sm:text-base text-ink-2"
                  >
                    <span className="mt-1 shrink-0">
                      <FontAwesomeIcon icon={f.icon} className="h-4 w-4 text-accent-text" aria-hidden="true" />
                    </span>
                    <span className="leading-snug">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
