'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Copy,
  Check,
  Send,
  CreditCard,
  Building2,
  Smartphone,
  AlertTriangle,
  ArrowRight,
  Globe,
  ShieldCheck,
  ExternalLink,
  Heart,
  Phone,
  MapPin,
  Hash,
  HelpCircle,
  CheckCircle2,
  Server,
  Wrench,
  Database,
  Layers,
  MessageSquare,
} from 'lucide-react';

export type GeoRegion = 'international' | 'bangladesh';
export type LocalTabId = 'bkash_send' | 'bkash_pay' | 'other';
export type InternationalTabId = 'wise' | 'paypal' | 'neobank';

export const PAYMENT_CREDENTIALS = {
  bkashSendMoney: {
    number: '01865333143',
    type: 'Personal (Send Money)',
    tabLabel: 'bKash Send Money',
    badge: 'Primary Method',
  },
  bkashPayment: {
    number: '01581401895',
    type: 'Merchant / Make Payment',
    tabLabel: 'bKash Payment',
    badge: 'Secondary Method',
  },
  otherMfs: {
    number: '01865333143',
    channels: ['Cellfin', 'Nagad', 'Rocket'],
    tabLabel: 'Other MFS',
  },
  bank: {
    title: 'MD AL SHAHORIAR HOSSAIN',
    bankName: 'Standard Chartered Bank',
    accountNumber: '18246161201',
    branch: 'Motijheel Branch',
    routingNumber: '215274247',
    swiftCode: 'SCBLBDDX',
    branchCode: '00424',
    district: 'Dhaka',
    address: 'Alico Building, 18-20 Motijheel C/A, Dhaka 1000',
    callCentre: '16233, +880 96 66777111',
    mode: 'NPSB (Instant)',
    note: 'If you use BEFTN, transaction confirmation could take up to 1 working day. NPSB is recommended for instant confirmation.',
  },
};

const MY_APPS = [
  {
    name: 'StockSimulatorBD',
    description: 'Bangladesh’s free DSE paper trading simulator for students & new investors to learn trading without risking real money.',
    url: 'https://stocksimulator.tech/simulator',
    isExternal: true,
    tag: 'DSE Simulator',
  },
  {
    name: 'LocReminder',
    description: 'A 100% free, privacy-first location-based alarm app for Android that wakes you up when you reach your stop.',
    url: '/projects/locreminder',
    isExternal: false,
    tag: 'Android App',
  },
  {
    name: 'Zakat Calculator',
    description: 'An automated, easy-to-use Islamic wealth and Zakat calculation tool for Bangladesh.',
    url: '/zakat-calculation',
    isExternal: false,
    tag: 'Finance Tool',
  },
  {
    name: 'Financial & Automation Tools',
    description: 'Custom Python scripts, AML compliance scrapers, and Excel models built to automate complex workflows.',
    url: '/projects',
    isExternal: false,
    tag: 'Open Tools',
  },
];

const FUND_USAGE = [
  {
    icon: Server,
    title: 'Server & Cloud Hosting',
    description: 'Hosting cloud compute, databases, and background microservices that power StockSimulatorBD and APIs 24/7.',
  },
  {
    icon: Globe,
    title: 'Domain & Infrastructure Fees',
    description: 'Yearly renewals for web domains (.tech, .bd), DNS routing, and SSL certificates.',
  },
  {
    icon: Database,
    title: 'Market Data & Scraping',
    description: 'Maintaining reliable Dhaka Stock Exchange data scrapers, uptime checks, and data storage.',
  },
  {
    icon: Wrench,
    title: 'Ongoing Maintenance & Development',
    description: 'Fixing bugs, updating libraries, adding requested features, and keeping every tool 100% free and ad-free for everyone.',
  },
];

export default function ThanksClient() {
  const [geoRegion, setGeoRegion] = useState<GeoRegion>('international');
  const [supporterMessage, setSupporterMessage] = useState<string>('');
  const [supporterName, setSupporterName] = useState<string>('');

  // Tab navigation states
  const [localTab, setLocalTab] = useState<LocalTabId>('bkash_send');
  const [localMfsSubTab, setLocalMfsSubTab] = useState<'mfs' | 'bank'>('mfs');
  const [internationalTab, setInternationalTab] = useState<InternationalTabId>('wise');
  const [wiseSubTab, setWiseSubTab] = useState<'bkash' | 'bank'>('bkash');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const copyAllBankDetails = () => {
    const b = PAYMENT_CREDENTIALS.bank;
    const fullText = `Standard Chartered Bank Account Details:
Account Title: ${b.title}
Account Number: ${b.accountNumber}
Bank Name: ${b.bankName}
Branch Name: ${b.branch}
Routing Number: ${b.routingNumber}
SWIFT Code: ${b.swiftCode}
Branch Code: ${b.branchCode}
District: ${b.district}
Address: ${b.address}
Call Centre: ${b.callCentre}`;
    handleCopy(fullText, 'copy_all_bank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F17] text-gray-900 dark:text-gray-100 transition-colors">
      {/* Subtle ambient gradient */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-blue-500/10 via-amber-500/5 to-transparent blur-3xl dark:from-blue-600/10 dark:via-gray-800/10" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-24">
          {/* ========================================================================= */}
          {/* HUMBLE HERO SECTION */}
          {/* ========================================================================= */}
          <div className="bg-white dark:bg-[#131926] rounded-3xl border border-gray-200/90 dark:border-gray-800 shadow-sm p-6 sm:p-9 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
              {/* Profile Photo */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-3 ring-blue-500/20 dark:ring-blue-400/20 shadow-md relative bg-gray-100 dark:bg-gray-800">
                  <Image
                    src="/images/shahoriar-author.jpg"
                    alt="Md Al Shahoriar Hossain"
                    fill
                    sizes="96px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Bio & Humble Message */}
              <div className="space-y-2.5 flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Md Al Shahoriar Hossain</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">
                  Did you love using any of my apps? Thank you very much.
                </h1>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  I am a finance and banking graduate and software developer. I am not an agency or a company — <strong>I simply enjoy solving problems</strong> and building tools that make finance, technology, and learning a bit easier and more accessible for everyone.
                </p>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Every tool I build is offered freely without ads or paywalls. Keeping them fast, reliable, and up to date takes continuous effort and real infrastructure costs. <strong>I would very much love if you could continue helping me</strong> keep these projects alive and free for everyone.
                </p>
              </div>
            </div>

            {/* Quick reassurance badges */}
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800/80 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                2.5% Bangladesh Govt Remittance Incentive
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200/80 dark:border-pink-800/60">
                <Smartphone className="w-3.5 h-3.5" />
                Instant bKash Credit
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60">
                <Building2 className="w-3.5 h-3.5" />
                Standard Chartered Direct
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* APPS YOU MIGHT HAVE USED (INDIVIDUAL APP LINKS) */}
          {/* ========================================================================= */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <span>Apps & Tools You Might Have Used</span>
              </h2>
              <span className="text-[11px] text-gray-400 dark:text-gray-500">
                All 100% free & open
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MY_APPS.map((app) => (
                <div
                  key={app.name}
                  className="p-4 rounded-2xl bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-500 transition-colors group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {app.name}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {app.tag}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {app.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between">
                    {app.isExternal ? (
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Visit {app.name}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={app.url}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Open {app.name}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* WHAT THE FUNDS ARE USED FOR */}
          {/* ========================================================================= */}
          <div className="bg-gray-50/80 dark:bg-[#111622] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-7 mb-8 space-y-4">
            <div className="space-y-1">
              <h2 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>How Your Support Helps (Transparency)</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                100% of any voluntary contributions go directly into keeping these tools free, fast, and accessible for everyone:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {FUND_USAGE.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#161c28] border border-gray-200/80 dark:border-gray-800 flex items-start gap-3"
                  >
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PAYMENT METHODS HEADER & GEOGRAPHIC SWITCHER */}
          {/* ========================================================================= */}
          <div className="mb-6 space-y-3">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white">
                Select Your Payment or Remittance Method
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Please contribute whatever you feel is comfortable — every single bit helps and is deeply appreciated.
              </p>
            </div>

            <div className="p-1.5 bg-gray-100 dark:bg-[#141B28] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-inner grid grid-cols-2 gap-1.5">
              {/* International Tab */}
              <button
                type="button"
                onClick={() => setGeoRegion('international')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all relative ${
                  geoRegion === 'international'
                    ? 'bg-white dark:bg-[#1F293D] text-blue-600 dark:text-blue-400 shadow-md border border-blue-200 dark:border-blue-900/60 ring-2 ring-blue-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                }`}
              >
                <Globe className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
                <div className="flex flex-col items-start text-left sm:items-center sm:text-center">
                  <span>International Senders</span>
                  <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                    US, EU, UK, Canada & Global
                  </span>
                </div>
              </button>

              {/* Bangladesh Tab */}
              <button
                type="button"
                onClick={() => setGeoRegion('bangladesh')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all relative ${
                  geoRegion === 'bangladesh'
                    ? 'bg-white dark:bg-[#1F293D] text-pink-600 dark:text-pink-400 shadow-md border border-pink-200 dark:border-pink-900/60 ring-2 ring-pink-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                }`}
              >
                <span className="text-base leading-none">🇧🇩</span>
                <div className="flex flex-col items-start text-left sm:items-center sm:text-center">
                  <span>Bangladesh Senders</span>
                  <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                    Local bKash, MFS & Bank
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 1: INTERNATIONAL (US, EU, UK & GLOBAL) */}
          {/* ========================================================================= */}
          {geoRegion === 'international' && (
            <div className="space-y-6">
              {/* International 3 Method Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-1.5 bg-gray-100 dark:bg-[#111622] rounded-2xl border border-gray-200 dark:border-gray-800">
                {/* Method 1: Wise / Remitly / TapTap Send */}
                <button
                  type="button"
                  onClick={() => setInternationalTab('wise')}
                  className={`flex flex-col items-center justify-center text-center p-3.5 rounded-xl transition-all relative ${
                    internationalTab === 'wise'
                      ? 'bg-white dark:bg-[#1B2332] text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200 dark:border-blue-900/70 ring-2 ring-blue-500/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 shrink-0" />
                    <span className="font-extrabold text-xs sm:text-sm">Wise / Remitly / TapTap</span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold leading-none mt-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                    Recommended / Instant
                  </span>
                </button>

                {/* Method 2: PayPal (Xoom Method) */}
                <button
                  type="button"
                  onClick={() => setInternationalTab('paypal')}
                  className={`flex flex-col items-center justify-center text-center p-3.5 rounded-xl transition-all relative ${
                    internationalTab === 'paypal'
                      ? 'bg-white dark:bg-[#1B2332] text-sky-600 dark:text-sky-400 shadow-sm border border-sky-200 dark:border-sky-900/70 ring-2 ring-sky-500/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 shrink-0" />
                    <span className="font-extrabold text-xs sm:text-sm">PayPal (via Xoom)</span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold leading-none mt-1.5 bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
                    US & EU PayPal Users
                  </span>
                </button>

                {/* Method 3: Revolut / N26 / Monzo */}
                <button
                  type="button"
                  onClick={() => setInternationalTab('neobank')}
                  className={`flex flex-col items-center justify-center text-center p-3.5 rounded-xl transition-all relative ${
                    internationalTab === 'neobank'
                      ? 'bg-white dark:bg-[#1B2332] text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-200 dark:border-indigo-900/70 ring-2 ring-indigo-500/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span className="font-extrabold text-xs sm:text-sm">Revolut / N26 / Monzo</span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold leading-none mt-1.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                    EU & UK Digital Banks
                  </span>
                </button>
              </div>

              {/* TAB 1: WISE / REMITLY / TAPTAP SEND */}
              {internationalTab === 'wise' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-[#161c28] rounded-xl border border-gray-200 dark:border-gray-800">
                    <button
                      type="button"
                      onClick={() => setWiseSubTab('bkash')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                        wiseSubTab === 'bkash'
                          ? 'bg-white dark:bg-[#1f2737] text-pink-600 dark:text-pink-400 shadow-sm'
                          : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Direct to bKash (Instant / 1-5 mins)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWiseSubTab('bank')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                        wiseSubTab === 'bank'
                          ? 'bg-white dark:bg-[#1f2737] text-blue-600 dark:text-blue-400 shadow-sm'
                          : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Direct to Standard Chartered Bank</span>
                    </button>
                  </div>

                  {wiseSubTab === 'bkash' && (
                    <div className="rounded-2xl overflow-hidden shadow-sm border border-pink-200 dark:border-pink-900/50 bg-white dark:bg-[#161c28]">
                      <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-500/10 via-rose-500/5 to-transparent dark:from-pink-950/30 dark:via-[#161c28] border-b border-pink-100 dark:border-pink-900/30 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-pink-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                            ৳
                          </div>
                          <div>
                            <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                              Direct to bKash Mobile Wallet
                            </h3>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">
                              Send via Wise, Remitly, or TapTap Send from US, EU, UK, Canada, Australia
                            </p>
                          </div>
                        </div>
                        <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold leading-none bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          +2.5% Govt Incentive Included
                        </span>
                      </div>

                      {/* Directional Roadmap */}
                      <div className="mx-3.5 sm:mx-5 my-3.5 p-3 sm:p-3.5 rounded-xl bg-pink-50/50 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/30">
                        <div className="flex items-start sm:items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider text-pink-900 dark:text-pink-300 mb-2.5">
                          <span className="flex items-center gap-1.5 min-w-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                            <span className="truncate sm:whitespace-normal">Transfer Roadmap (Wise / Remitly / TapTap)</span>
                          </span>
                          <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-pink-100 dark:bg-pink-900/50 font-mono font-bold leading-none">
                            1-5 Mins Delivery
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-2">
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            <div className="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 font-bold text-xs flex items-center justify-center shrink-0 border border-pink-200 dark:border-pink-800">
                              1
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-gray-900 dark:text-white truncate">Open Remittance App</div>
                              <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">Wise / Remitly / TapTap</div>
                            </div>
                          </div>

                          <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-pink-400/60 shrink-0" />

                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            <div className="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 font-bold text-xs flex items-center justify-center shrink-0 border border-pink-200 dark:border-pink-800">
                              2
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-gray-900 dark:text-white truncate">Choose Mobile Wallet</div>
                              <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">Select &ldquo;bKash&rdquo;</div>
                            </div>
                          </div>

                          <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-pink-400/60 shrink-0" />

                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            <div className="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 font-bold text-xs flex items-center justify-center shrink-0 border border-pink-200 dark:border-pink-800">
                              3
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-gray-900 dark:text-white truncate">Enter Number & Pay</div>
                              <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate font-mono">01865333143</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recipient bKash Credentials Grid */}
                      <div className="p-4 sm:p-5 space-y-3.5 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* bKash Number */}
                          <div className="p-3.5 rounded-xl bg-pink-50/50 dark:bg-[#111620] border border-pink-200/80 dark:border-pink-900/50 flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold text-pink-700 dark:text-pink-400 uppercase tracking-wide block">
                                Recipient bKash Mobile Number
                              </span>
                              <span className="font-mono font-black text-base text-gray-900 dark:text-white tracking-wider block mt-0.5">
                                {PAYMENT_CREDENTIALS.bkashSendMoney.number}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(PAYMENT_CREDENTIALS.bkashSendMoney.number, 'intl_bkash_num')}
                              className="shrink-0 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                            >
                              {copiedKey === 'intl_bkash_num' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedKey === 'intl_bkash_num' ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>

                          {/* Recipient Name */}
                          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#111620] border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide block">
                                Recipient Full Legal Name
                              </span>
                              <span className="font-bold text-xs text-gray-900 dark:text-white truncate block mt-0.5">
                                {PAYMENT_CREDENTIALS.bank.title}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(PAYMENT_CREDENTIALS.bank.title, 'intl_bkash_name')}
                              className="shrink-0 px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xs transition-all active:scale-95 flex items-center gap-1.5"
                            >
                              {copiedKey === 'intl_bkash_name' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedKey === 'intl_bkash_name' ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Verified Remittance App Links */}
                        <div className="pt-2">
                          <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
                            Launch Official Remittance Portals:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <a
                              href="https://wise.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 bg-gray-50/50 dark:bg-[#111620] hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-all text-xs font-semibold"
                            >
                              <span className="flex items-center gap-1.5 font-bold">
                                <span className="text-emerald-500 font-black">W</span> Wise.com
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                            </a>
                            <a
                              href="https://www.remitly.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 bg-gray-50/50 dark:bg-[#111620] hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-all text-xs font-semibold"
                            >
                              <span className="flex items-center gap-1.5 font-bold">
                                <span className="text-blue-500 font-black">R</span> Remitly.com
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                            </a>
                            <a
                              href="https://www.taptapsend.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 bg-gray-50/50 dark:bg-[#111620] hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-all text-xs font-semibold"
                            >
                              <span className="flex items-center gap-1.5 font-bold">
                                <span className="text-orange-500 font-black">T</span> TapTap Send
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                            </a>
                          </div>
                        </div>

                        {/* Government Incentive Alert */}
                        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200 text-xs flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <div className="leading-relaxed">
                            <strong className="font-extrabold text-emerald-900 dark:text-emerald-100">
                              2.5% Bangladesh Government Cash Incentive:
                            </strong>{' '}
                            Inbound foreign remittances directly to bKash automatically receive an extra 2.5% cash bonus credited directly from Bangladesh Bank!
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {wiseSubTab === 'bank' && (
                    <BankCredentialsCard
                      copiedKey={copiedKey}
                      onCopy={handleCopy}
                      onCopyAll={copyAllBankDetails}
                      channelTitle="Direct Deposit via Wise / Remitly"
                      channelSubtitle="Send from your US/EU/UK bank via Wise to Standard Chartered Bank in BDT"
                    />
                  )}
                </div>
              )}

              {/* TAB 2: PAYPAL (THE XOOM METHOD) */}
              {internationalTab === 'paypal' && (
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-sky-200 dark:border-sky-900/50 bg-white dark:bg-[#161c28]">
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-sky-500/10 via-blue-500/5 to-transparent dark:from-sky-950/30 dark:via-[#161c28] border-b border-sky-100 dark:border-sky-900/30 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-sky-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                          PP
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                            PayPal International Remittance via Xoom.com
                          </h3>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            Log in with your existing PayPal account to send to a Bangladeshi Bank Account or bKash
                          </p>
                        </div>
                      </div>
                      <a
                        href="https://www.xoom.com/bangladesh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white transition-all shadow-sm"
                      >
                        <span>Open Xoom.com</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* How Xoom works roadmap */}
                    <div className="mx-3.5 sm:mx-5 my-3.5 p-3 sm:p-3.5 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30">
                      <div className="flex items-start sm:items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider text-sky-900 dark:text-sky-300 mb-2.5">
                        <span className="flex items-center gap-1.5 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                          <span className="truncate sm:whitespace-normal">How to send via PayPal (Xoom)</span>
                        </span>
                        <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-sky-100 dark:bg-sky-900/50 font-mono font-bold leading-none">
                          Step-by-step
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-2">
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-200 dark:border-sky-800">
                            1
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-gray-900 dark:text-white truncate">Go to Xoom.com</div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">Log in with your PayPal</div>
                          </div>
                        </div>

                        <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-sky-400/60 shrink-0" />

                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-200 dark:border-sky-800">
                            2
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-gray-900 dark:text-white truncate">Choose Receiving Method</div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">Bank Deposit or bKash</div>
                          </div>
                        </div>

                        <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-sky-400/60 shrink-0" />

                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-200 dark:border-sky-800">
                            3
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-gray-900 dark:text-white truncate">Pay with PayPal</div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">PayPal balance / bank</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 sm:px-5 pb-2">
                      <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#111620] border border-gray-200 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-2">
                        <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                          <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                          <span>Why use Xoom for PayPal?</span>
                        </div>
                        <p className="leading-relaxed text-[11px] sm:text-xs">
                          PayPal officially powers remittances to Bangladesh through <strong>Xoom (A PayPal Service)</strong>. You do not need to create a new profile — you simply log into Xoom using your existing PayPal account.
                        </p>
                      </div>
                    </div>
                  </div>

                  <BankCredentialsCard
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                    onCopyAll={copyAllBankDetails}
                    channelTitle="Standard Chartered Bank Deposit for Xoom"
                    channelSubtitle="Enter these details on Xoom.com when choosing 'Bank Deposit' to Bangladesh"
                  />
                </div>
              )}

              {/* TAB 3: REVOLUT / N26 / MONZO */}
              {internationalTab === 'neobank' && (
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-indigo-200 dark:border-indigo-900/50 bg-white dark:bg-[#161c28]">
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-950/30 dark:via-[#161c28] border-b border-indigo-100 dark:border-indigo-900/30 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                          R
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                            European & UK Neobanks (Revolut, N26, Monzo)
                          </h3>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            Transfer directly from your European digital banking app to Standard Chartered Bank or bKash
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold leading-none bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                        Direct In-App Transfer
                      </span>
                    </div>

                    <div className="p-4 sm:p-5 space-y-3.5 text-xs text-gray-700 dark:text-gray-300">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#111620] border border-gray-200 dark:border-gray-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                              1. Revolut App
                            </span>
                            <a
                              href="https://www.revolut.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-semibold text-gray-400 hover:text-indigo-500 flex items-center gap-1"
                            >
                              <span>Site</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                            Open Revolut ➔ Tap <strong>Transfers</strong> ➔ Tap <strong>Send Internationally</strong> ➔ Choose <strong>Bangladesh</strong>. You can select either <strong>Bank Account</strong> or <strong>Mobile Wallet (bKash)</strong>.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#111620] border border-gray-200 dark:border-gray-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                              2. Monzo App (UK)
                            </span>
                            <a
                              href="https://monzo.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-semibold text-gray-400 hover:text-indigo-500 flex items-center gap-1"
                            >
                              <span>Site</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                            Open Monzo ➔ Tap <strong>Pay</strong> ➔ <strong>International Transfer</strong> (powered by integrated Wise) ➔ Select <strong>Bangladesh</strong> and input bank details.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#111620] border border-gray-200 dark:border-gray-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                              3. N26 App (Eurozone)
                            </span>
                            <a
                              href="https://n26.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-semibold text-gray-400 hover:text-indigo-500 flex items-center gap-1"
                            >
                              <span>Site</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                            Open N26 ➔ Tap <strong>Transfer</strong> ➔ <strong>Foreign Currency Transfer</strong> ➔ Select Bangladesh Taka (BDT) and provide the Standard Chartered Bank account info.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <BankCredentialsCard
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                    onCopyAll={copyAllBankDetails}
                    channelTitle="Standard Chartered Bank Deposit for Neobanks"
                    channelSubtitle="Enter these details in your Revolut, N26, or Monzo app under recipient bank details"
                  />
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 2: BANGLADESH (LOCAL MFS & BANK) */}
          {/* ========================================================================= */}
          {geoRegion === 'bangladesh' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-gray-100 dark:bg-[#111620] rounded-2xl border border-gray-200 dark:border-gray-800">
                {/* Tab 1: bKash Send Money */}
                <button
                  type="button"
                  onClick={() => setLocalTab('bkash_send')}
                  className={`flex flex-col items-center justify-center text-center p-3 rounded-xl transition-all relative ${
                    localTab === 'bkash_send'
                      ? 'bg-white dark:bg-[#1B2230] text-pink-600 dark:text-pink-400 shadow-sm border border-pink-200 dark:border-pink-900/60 ring-2 ring-pink-500/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Send className="w-4 h-4 shrink-0" />
                    <span className="font-extrabold text-xs sm:text-sm">bKash Send Money</span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-none mt-1 bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300">
                    Personal
                  </span>
                </button>

                {/* Tab 2: bKash Payment */}
                <button
                  type="button"
                  onClick={() => setLocalTab('bkash_pay')}
                  className={`flex flex-col items-center justify-center text-center p-3 rounded-xl transition-all relative ${
                    localTab === 'bkash_pay'
                      ? 'bg-white dark:bg-[#1B2230] text-pink-600 dark:text-pink-400 shadow-sm border border-pink-200 dark:border-pink-900/60 ring-2 ring-pink-500/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 shrink-0" />
                    <span className="font-extrabold text-xs sm:text-sm">bKash Payment</span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-none mt-1 bg-gray-200/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    Merchant
                  </span>
                </button>

                {/* Tab 3: Other Payment */}
                <button
                  type="button"
                  onClick={() => setLocalTab('other')}
                  className={`flex flex-col items-center justify-center text-center p-3 rounded-xl transition-all relative ${
                    localTab === 'other'
                      ? 'bg-white dark:bg-[#1B2230] text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200 dark:border-blue-900/60 ring-2 ring-blue-500/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span className="font-extrabold text-xs sm:text-sm">Other Payment</span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-none mt-1 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                    Bank & Other MFS
                  </span>
                </button>
              </div>

              {/* LOCAL TAB 1: bKash Send Money */}
              {localTab === 'bkash_send' && (
                <div className="rounded-2xl overflow-hidden shadow-sm border border-[#D12053]/30 bg-gradient-to-br from-[#D12053] to-[#B01040] text-white">
                  <div className="px-5 py-3.5 bg-black/15 flex items-center justify-between border-b border-white/10 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-black tracking-wider uppercase">bKash Send Money (Personal)</span>
                    </div>
                    <a
                      href="https://www.bkash.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold leading-none bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                    >
                      <span>bKash.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="mx-3.5 sm:mx-5 my-3.5 p-3 sm:p-3.5 rounded-xl bg-black/25 border border-white/10">
                    <div className="flex items-start sm:items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider text-white/80 mb-2.5">
                      <span className="flex items-center gap-1.5 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                        <span className="truncate sm:whitespace-normal">Transfer Roadmap</span>
                      </span>
                      <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-white/15 font-mono font-bold leading-none">3 Steps</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-2">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-white/20 text-white font-black text-xs flex items-center justify-center shrink-0 border border-white/30">
                          1
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">Open bKash</div>
                          <div className="text-[10px] text-white/75 truncate font-mono">App or *247#</div>
                        </div>
                      </div>

                      <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-white/40 shrink-0" />

                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-white/20 text-white font-black text-xs flex items-center justify-center shrink-0 border border-white/30">
                          2
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">Send Money</div>
                          <div className="text-[10px] text-white/75 truncate font-mono">01865333143</div>
                        </div>
                      </div>

                      <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-white/40 shrink-0" />

                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-white/20 text-white font-black text-xs flex items-center justify-center shrink-0 border border-white/30">
                          3
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">Note TrxID</div>
                          <div className="text-[10px] text-white/75 truncate">Confirm with PIN</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-white/15 px-5 py-2">
                    <div className="py-3 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-white/80 shrink-0" />
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">
                        Go to your <strong>bKash Mobile App</strong> or Dial <code className="bg-black/25 px-1.5 py-0.5 rounded font-mono font-bold">*247#</code>
                      </span>
                    </div>

                    <div className="py-3 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-white/80 shrink-0" />
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">
                        Choose <strong>&ldquo;Send Money&rdquo;</strong>
                      </span>
                    </div>

                    <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-white/80 shrink-0" />
                        <span className="text-xs sm:text-sm font-medium">
                          Enter the Number: <strong className="font-mono text-base tracking-wider bg-black/20 px-2 py-0.5 rounded">{PAYMENT_CREDENTIALS.bkashSendMoney.number}</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(PAYMENT_CREDENTIALS.bkashSendMoney.number, 'local_send_num')}
                        className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white active:scale-95 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                      >
                        {copiedKey === 'local_send_num' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Number Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Number</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="py-3 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-white/80 shrink-0" />
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">
                        Enter any amount you wish and confirm with your <strong>bKash PIN</strong>.
                      </span>
                    </div>

                    <div className="py-3 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-white/80 shrink-0" />
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">
                        Keep the <strong>Transaction ID (TrxID)</strong> for your confirmation.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* LOCAL TAB 2: bKash Payment */}
              {localTab === 'bkash_pay' && (
                <div className="rounded-2xl overflow-hidden shadow-sm border border-[#D12053]/30 bg-gradient-to-br from-[#C41A4E] to-[#990D37] text-white">
                  <div className="px-5 py-3.5 bg-black/15 flex items-center justify-between border-b border-white/10 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-white" />
                      <span className="text-xs font-black tracking-wider uppercase">bKash Make Payment (Merchant)</span>
                    </div>
                    <a
                      href="https://www.bkash.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold leading-none bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                    >
                      <span>bKash.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="mx-3.5 sm:mx-5 my-3.5 p-3 sm:p-3.5 rounded-xl bg-black/25 border border-white/10">
                    <div className="flex items-start sm:items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider text-white/80 mb-2.5">
                      <span className="flex items-center gap-1.5 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                        <span className="truncate sm:whitespace-normal">Transfer Roadmap</span>
                      </span>
                      <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-white/15 font-mono font-bold leading-none">3 Steps</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-2">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-white/20 text-white font-black text-xs flex items-center justify-center shrink-0 border border-white/30">
                          1
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">Open bKash</div>
                          <div className="text-[10px] text-white/75 truncate font-mono">App or *247#</div>
                        </div>
                      </div>

                      <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-white/40 shrink-0" />

                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-white/20 text-white font-black text-xs flex items-center justify-center shrink-0 border border-white/30">
                          2
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">Make Payment</div>
                          <div className="text-[10px] text-white/75 truncate font-mono">01581401895</div>
                        </div>
                      </div>

                      <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-white/40 shrink-0" />

                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-white/20 text-white font-black text-xs flex items-center justify-center shrink-0 border border-white/30">
                          3
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">Note TrxID</div>
                          <div className="text-[10px] text-white/75 truncate">Instant Confirmation</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-white/15 px-5 py-2">
                    <div className="py-3 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-white/80 shrink-0" />
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">
                        Go to your <strong>bKash Mobile App</strong> or Dial <code className="bg-black/25 px-1.5 py-0.5 rounded font-mono font-bold">*247#</code>
                      </span>
                    </div>

                    <div className="py-3 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-white/80 shrink-0" />
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">
                        Choose <strong>&ldquo;Make Payment&rdquo;</strong>
                      </span>
                    </div>

                    <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-white/80 shrink-0" />
                        <span className="text-xs sm:text-sm font-medium">
                          Enter Merchant Number: <strong className="font-mono text-base tracking-wider bg-black/20 px-2 py-0.5 rounded">{PAYMENT_CREDENTIALS.bkashPayment.number}</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(PAYMENT_CREDENTIALS.bkashPayment.number, 'local_pay_num')}
                        className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white active:scale-95 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                      >
                        {copiedKey === 'local_pay_num' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Number Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Number</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="py-3 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-white/80 shrink-0" />
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">
                        Enter the amount and confirm with your <strong>bKash PIN</strong>.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* LOCAL TAB 3: Other Payment (MFS vs Bank) */}
              {localTab === 'other' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-[#161c28] rounded-xl border border-gray-200 dark:border-gray-800">
                    <button
                      type="button"
                      onClick={() => setLocalMfsSubTab('mfs')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                        localMfsSubTab === 'mfs'
                          ? 'bg-white dark:bg-[#1f2737] text-orange-600 dark:text-orange-400 shadow-sm'
                          : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Cellfin, Nagad & Rocket</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocalMfsSubTab('bank')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                        localMfsSubTab === 'bank'
                          ? 'bg-white dark:bg-[#1f2737] text-blue-600 dark:text-blue-400 shadow-sm'
                          : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Standard Chartered Bank Transfer</span>
                    </button>
                  </div>

                  {localMfsSubTab === 'mfs' && (
                    <div className="rounded-2xl overflow-hidden shadow-sm border border-orange-200 dark:border-orange-900/40 bg-white dark:bg-[#161c28]">
                      <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent dark:from-orange-950/30 dark:via-[#161c28] border-b border-orange-100 dark:border-orange-900/30 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1.5">
                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-[9px] text-white font-black flex items-center justify-center">C</span>
                            <span className="w-5 h-5 rounded-full bg-orange-500 text-[9px] text-white font-black flex items-center justify-center">N</span>
                            <span className="w-5 h-5 rounded-full bg-purple-600 text-[9px] text-white font-black flex items-center justify-center">R</span>
                          </div>
                          <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">
                            Cellfin, Nagad & Rocket (Personal Send Money)
                          </h3>
                        </div>
                        <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold leading-none bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300">
                          Send Money / Transfer
                        </span>
                      </div>

                      <div className="p-4 sm:p-5 space-y-3.5 text-xs text-gray-700 dark:text-gray-300">
                        {/* Number Copy Box */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-[#111620] border border-gray-200 dark:border-gray-800 gap-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block">
                              Target Mobile Number (Nagad / Rocket / Cellfin)
                            </span>
                            <span className="font-mono text-xl font-black text-gray-900 dark:text-white tracking-widest mt-0.5 block">
                              {PAYMENT_CREDENTIALS.otherMfs.number}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(PAYMENT_CREDENTIALS.otherMfs.number, 'local_mfs_num')}
                            className="inline-flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white active:scale-95 px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-sm"
                          >
                            {copiedKey === 'local_mfs_num' ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Number</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Local MFS App Links */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[11px] text-gray-400 font-bold block">Official Links:</span>
                          <a
                            href="https://nagad.com.bd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
                          >
                            <span>Nagad.com.bd</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <span className="text-gray-300 dark:text-gray-700">•</span>
                          <a
                            href="https://cellfin.ibblbd.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <span>Cellfin (IBBL)</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        <ol className="space-y-2 pt-1 border-t border-gray-100 dark:border-gray-800/80">
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                            <span>Open your <strong>Cellfin</strong>, <strong>Nagad</strong>, or <strong>Rocket</strong> App.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                            <span>Select <strong>Send Money</strong> or <strong>Fund Transfer</strong> to personal number <strong>{PAYMENT_CREDENTIALS.otherMfs.number}</strong>.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                            <span>Enter the amount and confirm with your PIN.</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {localMfsSubTab === 'bank' && (
                    <BankCredentialsCard
                      copiedKey={copiedKey}
                      onCopy={handleCopy}
                      onCopyAll={copyAllBankDetails}
                      channelTitle="Standard Chartered Bank PLC (Local Transfer)"
                      channelSubtitle="Transfer via NPSB (Instant) or BEFTN from any Bangladeshi Bank App"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUPPORTER NOTE / MESSAGE BOX */}
          {/* ========================================================================= */}
          <div className="mt-8 bg-white dark:bg-[#131926] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  Say Hello or Send Confirmation
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  If you’d like, let me know which app you used or share your transaction reference code so I can personally thank you.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name or Handle (optional)"
                value={supporterName}
                onChange={(e) => setSupporterName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#101520] border border-gray-200 dark:border-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:border-blue-400 focus:outline-hidden"
              />
              <textarea
                rows={3}
                placeholder="Share your thoughts, suggestions, or transaction reference code... (e.g. Loved StockSimulatorBD! TrxID: 9JK81LM)"
                value={supporterMessage}
                onChange={(e) => setSupporterMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#101520] border border-gray-200 dark:border-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:border-blue-400 focus:outline-hidden resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Your support directly sustains server costs, domain fees, and continuous development.
              </span>
              <a
                href={`mailto:alshahoriar.hossain@gmail.com?subject=${encodeURIComponent(
                  `Support & Note from ${supporterName || 'A Supporter'}`
                )}&body=${encodeURIComponent(
                  `Hi Shahoriar,\n\nI wanted to support your work!\n\nMessage / Ref:\n${
                    supporterMessage || 'Thank you for your apps and tools!'
                  }\n\nFrom,\n${supporterName || 'A Supporter'}`
                )}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm active:scale-95"
              >
                <Heart className="w-3.5 h-3.5 fill-white/20" />
                <span>Send Note via Email</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* ========================================================================= */}
{/* REUSABLE BANK CREDENTIALS COMPONENT (ALL 10 FIELDS 100% COPYABLE) */}
{/* ========================================================================= */}
interface BankCardProps {
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
  onCopyAll: () => void;
  channelTitle: string;
  channelSubtitle: string;
}

function BankCredentialsCard({
  copiedKey,
  onCopy,
  onCopyAll,
  channelTitle,
  channelSubtitle,
}: BankCardProps) {
  const b = PAYMENT_CREDENTIALS.bank;

  const fields = [
    { label: 'Bank Name', value: b.bankName, key: 'b_name', icon: Building2 },
    { label: 'Branch Name', value: b.branch, key: 'b_branch', icon: MapPin },
    { label: 'Account Title', value: b.title, key: 'b_title', icon: CheckCircle2, highlight: true },
    { label: 'Account Number', value: b.accountNumber, key: 'b_acc', icon: Hash, highlight: true, mono: true },
    { label: 'Routing Number', value: b.routingNumber, key: 'b_routing', icon: Hash, mono: true },
    { label: 'SWIFT / BIC Code', value: b.swiftCode, key: 'b_swift', icon: Globe, mono: true, highlight: true },
    { label: 'Branch Code', value: b.branchCode, key: 'b_bcode', icon: Hash, mono: true },
    { label: 'District', value: b.district, key: 'b_district', icon: MapPin },
    { label: 'Branch Address', value: b.address, key: 'b_addr', icon: MapPin, colSpan: true },
    { label: 'Call Centre / Helpline', value: b.callCentre, key: 'b_call', icon: Phone, colSpan: true },
  ];

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-blue-200 dark:border-blue-900/50 bg-white dark:bg-[#161c28]">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent dark:from-blue-950/30 dark:via-[#161c28] border-b border-blue-100 dark:border-blue-900/30 flex items-center justify-between flex-wrap gap-2.5">
        <div className="flex items-center gap-2.5">
          <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
              {channelTitle}
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              {channelSubtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCopyAll}
          className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
        >
          {copiedKey === 'copy_all_bank' ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>All Details Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy All Details</span>
            </>
          )}
        </button>
      </div>

      {/* Visual NPSB / SWIFT Flow */}
      <div className="mx-3.5 sm:mx-5 my-3.5 p-3 sm:p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/25 border border-blue-100 dark:border-blue-900/30">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-2.5">
          <span className="flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            <span className="truncate sm:whitespace-normal">Direct Transfer Route</span>
          </span>
          <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold leading-none bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800">
            NPSB / SWIFT Enabled
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-2">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
              1
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-gray-900 dark:text-white truncate">Open Banking / Wire Portal</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">Bank App / Wise / Revolut</div>
            </div>
          </div>

          <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-blue-400/60 shrink-0" />

          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
              2
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-gray-900 dark:text-white truncate">Choose Standard Chartered</div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold truncate font-mono">SWIFT: SCBLBDDX</div>
            </div>
          </div>

          <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-blue-400/60 shrink-0" />

          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
              3
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-gray-900 dark:text-white truncate">Deposit to Account</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate font-mono">A/C: 18246161201</div>
            </div>
          </div>
        </div>
      </div>

      {/* All 10 Copyable Credentials Grid */}
      <div className="p-4 sm:p-5 space-y-2.5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {fields.map((field) => {
            const isCopied = copiedKey === field.key;
            return (
              <div
                key={field.key}
                className={`p-3 rounded-xl border flex items-center justify-between gap-2.5 transition-colors ${
                  field.colSpan ? 'sm:col-span-2' : ''
                } ${
                  field.highlight
                    ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50'
                    : 'bg-gray-50 dark:bg-[#111620] border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide block ${
                      field.highlight
                        ? 'text-blue-700 dark:text-blue-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {field.label}
                  </span>
                  <span
                    className={`block mt-0.5 truncate text-xs sm:text-sm ${
                      field.mono ? 'font-mono font-black tracking-wider' : 'font-bold'
                    } text-gray-900 dark:text-white`}
                  >
                    {field.value}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onCopy(field.value, field.key)}
                  className={`shrink-0 px-2.5 py-1.5 rounded-lg font-bold text-xs transition-all active:scale-95 flex items-center gap-1 ${
                    field.highlight
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  title={`Copy ${field.label}`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* BEFTN / NPSB Warning Alert */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs flex items-start gap-2.5 mt-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-extrabold">Notice:</strong> {b.note}
          </div>
        </div>
      </div>
    </div>
  );
}
