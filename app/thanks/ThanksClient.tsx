'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Copy,
  Check,
  Building2,
  Smartphone,
  ExternalLink,
  Server,
  Globe,
  Database,
  Shield,
  Mail,
  ChevronDown,
  QrCode,
  Maximize2,
  X,
  Send,
  CreditCard,
  AlertTriangle,
  Download,
} from 'lucide-react';

export type Region = 'bangladesh' | 'international';
export type BdMethodTab = 'banglaqr' | 'bkash' | 'other';
export type BkashSubTab = 'payment' | 'personal';
export type OtherSubTab = 'mfs' | 'bank';
export type IntlMethodTab = 'remit' | 'xoom' | 'bank';

export const PAYMENT_DETAILS = {
  banglaqr: {
    tabLabel: 'BanglaQR',
    badge: 'Primary / Recommended',
    imagePath: '/thanks/banglaqr.png',
  },
  bkashPayment: {
    number: '01581401895',
    type: 'Merchant / Make Payment',
    tabLabel: 'bKash Make Payment',
    badge: 'Merchant Counter',
    imagePath: '/thanks/bkash-payment.png',
  },
  bkashSendMoney: {
    number: '01865333143',
    type: 'Personal (Send Money)',
    tabLabel: 'bKash Send Money',
    badge: 'Personal Number',
  },
  otherMfs: {
    number: '01865333143',
    channels: ['Cellfin', 'Nagad', 'Rocket'],
    tabLabel: 'Other MFS',
  },
  bank: {
    title: 'MD AL SHAHORIAR HOSSAIN',
    bankName: 'Standard Chartered Bank PLC',
    accountNumber: '18246161201',
    branch: 'Motijheel Branch',
    branchCode: '00424',
    routingNumber: '215274247',
    swiftCode: 'SCBLBDDX',
    district: 'Dhaka',
    country: 'Bangladesh',
    address: 'Alico Building, 18-20 Motijheel C/A, Dhaka 1000',
    callCentre: '+880 96 66777111',
    mode: 'NPSB (Instant)',
    note: 'If you use BEFTN, transaction confirmation could take up to 1 working day. NPSB is recommended for instant confirmation.',
  },
};

const EXPENSES = [
  {
    icon: Server,
    title: 'Cloud & Server Hosting',
    desc: 'Keeping compute instances, APIs, and background services running 24/7 without downtime.',
  },
  {
    icon: Database,
    title: 'Databases & Storage',
    desc: 'High-availability databases that store and process real-time financial and user simulation data.',
  },
  {
    icon: Globe,
    title: 'Domain & DNS Renewals',
    desc: 'Annual renewals for custom domains (.tech, .bd), SSL certificates, and DNS infrastructure.',
  },
  {
    icon: Shield,
    title: 'Keeping Everything 100% Free',
    desc: 'Your support ensures no tool ever needs paywalls, sponsored clutter, or invasive ads.',
  },
];

interface ZoomModalState {
  src: string;
  title: string;
  variant: 'qr' | 'banner';
  brand?: 'banglaqr' | 'bkash';
  caption?: string;
  downloadName?: string;
}

// Fallback stylized QR Graphic when local PNG fails or is unavailable
function StylizedQrFallback({
  title,
  subText,
  brandColor = 'emerald',
}: {
  title: string;
  subText: string;
  brandColor?: 'emerald' | 'pink';
}) {
  const isPink = brandColor === 'pink';

  return (
    <div
      className={`w-52 sm:w-60 aspect-[800/1060] mx-auto rounded-2xl p-4 flex flex-col items-center justify-between border-2 border-dashed shadow-inner text-center select-none ${
        isPink
          ? 'bg-gradient-to-b from-pink-50 to-rose-100/60 dark:from-pink-950/40 dark:to-[#1a1016] border-pink-300 dark:border-pink-800'
          : 'bg-gradient-to-b from-emerald-50 to-teal-100/60 dark:from-emerald-950/40 dark:to-[#0c1815] border-emerald-300 dark:border-emerald-800'
      }`}
    >
      <div className="flex items-center justify-between w-full text-[10px] font-mono uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
        <span>Scan & Pay</span>
        <span
          className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
            isPink
              ? 'bg-pink-500/20 text-pink-700 dark:text-pink-300'
              : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
          }`}
        >
          {isPink ? 'bKash' : 'BanglaQR'}
        </span>
      </div>

      <div className="relative my-auto flex flex-col items-center justify-center">
        <div
          className={`w-28 h-28 rounded-2xl flex items-center justify-center border-2 shadow-sm ${
            isPink
              ? 'bg-white dark:bg-black/40 border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400'
              : 'bg-white dark:bg-black/40 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
          }`}
        >
          <QrCode className="w-16 h-16 animate-pulse" />
        </div>
        <div
          className={`mt-2 text-[10px] font-black uppercase tracking-wider ${
            isPink ? 'text-pink-700 dark:text-pink-300' : 'text-emerald-700 dark:text-emerald-300'
          }`}
        >
          {title}
        </div>
      </div>

      <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-tight">
        {subText}
      </div>
    </div>
  );
}

export default function ThanksClient() {
  const [region, setRegion] = useState<Region>('bangladesh');
  const [bdTab, setBdTab] = useState<BdMethodTab>('banglaqr');
  const [bkashSubTab, setBkashSubTab] = useState<BkashSubTab>('payment');
  const [otherSubTab, setOtherSubTab] = useState<OtherSubTab>('mfs');
  const [intlTab, setIntlTab] = useState<IntlMethodTab>('remit');
  const [showBankFallback, setShowBankFallback] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [imageErrorMap, setImageErrorMap] = useState<{ [src: string]: boolean }>({});
  const [activeZoomModal, setActiveZoomModal] = useState<ZoomModalState | null>(null);

  // Accessible Escape key & background scroll lock for modal
  useEffect(() => {
    if (!activeZoomModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveZoomModal(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeZoomModal]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const handleImageError = (src: string) => {
    setImageErrorMap((prev) => ({ ...prev, [src]: true }));
  };

  const copyAllBank = () => {
    const b = PAYMENT_DETAILS.bank;
    const text = `Standard Chartered Bank Details:
Bank Name: ${b.bankName}
Branch Name: ${b.branch}
Account Title: ${b.title}
Account Number: ${b.accountNumber}
Routing Number: ${b.routingNumber}
SWIFT Code: ${b.swiftCode}
Branch Code: ${b.branchCode}
District: ${b.district}
Country: ${b.country}
Address: ${b.address}
Call Centre: ${b.callCentre}`;
    handleCopy(text, 'all_bank');
  };

  return (
    <div className="max-w-2xl mx-auto py-2 sm:py-6 space-y-10 text-gray-900 dark:text-gray-100">
      {/* ========================================================================= */}
      {/* HUMBLE INTRO SECTION */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden relative shrink-0 border border-gray-200 dark:border-gray-800 shadow-sm">
            <Image
              src="/images/shahoriar-author.jpg"
              alt="Md Al Shahoriar Hossain"
              fill
              sizes="80px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
              Md Al Shahoriar Hossain
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Soon to be bald
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white leading-snug">
            Did you love using any of my apps? Thank you very much.
          </h1>

          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            I am not an agency or a company — <strong>I simply enjoy solving problems</strong> and building tools that make finance, technology, and learning a bit easier for everyone.
          </p>

          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            Every app and tool I build is completely free without ads or paywalls. But keeping them fast, reliable, and up to date takes continuous effort and recurring monthly costs. <strong>I would very much love if you could continue helping me</strong> keep these projects alive and free for everyone.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HOW YOUR SUPPORT HELPS (AWARENESS OF COSTS) */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
            How Your Support Helps
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            100% of any voluntary contributions go directly into covering real operational costs:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {EXPENSES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAYMENT METHODS SECTION */}
      {/* ========================================================================= */}
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            How You Can Support
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Contribute whatever feels right to you — no amount is too small. Every single contribution makes a difference.
          </p>
        </div>

        {/* Region Toggle */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 dark:bg-[#111620] rounded-xl border border-gray-200 dark:border-gray-800">
          <button
            type="button"
            onClick={() => setRegion('bangladesh')}
            className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
              region === 'bangladesh'
                ? 'bg-white dark:bg-[#1B2230] text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-900/60'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            🇧🇩 Bangladesh
          </button>
          <button
            type="button"
            onClick={() => setRegion('international')}
            className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
              region === 'international'
                ? 'bg-white dark:bg-[#1B2230] text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200 dark:border-blue-900/60'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            🌍 International
          </button>
        </div>

        {/* ===================================================================== */}
        {/* BANGLADESH PAYMENT OPTIONS                                            */}
        {/* ===================================================================== */}
        {region === 'bangladesh' && (
          <div className="space-y-4">
            {/* 3 Main Tabs Header */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-gray-100 dark:bg-[#111620] rounded-2xl border border-gray-200 dark:border-gray-800">
              {/* Tab 1: BanglaQR */}
              <button
                type="button"
                onClick={() => setBdTab('banglaqr')}
                className={`flex flex-col items-center justify-center text-center p-3 rounded-xl transition-all cursor-pointer ${
                  bdTab === 'banglaqr'
                    ? 'bg-white dark:bg-[#1B2230] text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-900/60 ring-2 ring-emerald-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span className="font-black text-xs sm:text-sm">BanglaQR</span>
                </div>
                <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black leading-none mt-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Primary Method
                </span>
              </button>

              {/* Tab 2: bKash */}
              <button
                type="button"
                onClick={() => setBdTab('bkash')}
                className={`flex flex-col items-center justify-center text-center p-3 rounded-xl transition-all cursor-pointer ${
                  bdTab === 'bkash'
                    ? 'bg-white dark:bg-[#1B2230] text-pink-600 dark:text-pink-400 shadow-sm border border-pink-200 dark:border-pink-900/60 ring-2 ring-pink-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Send className="w-4 h-4 shrink-0 text-pink-500" />
                  <span className="font-extrabold text-xs sm:text-sm">bKash</span>
                </div>
                <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-none mt-1 bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300">
                  Payment &amp; Personal
                </span>
              </button>

              {/* Tab 3: Other Payment */}
              <button
                type="button"
                onClick={() => setBdTab('other')}
                className={`flex flex-col items-center justify-center text-center p-3 rounded-xl transition-all cursor-pointer ${
                  bdTab === 'other'
                    ? 'bg-white dark:bg-[#1B2230] text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200 dark:border-blue-900/60 ring-2 ring-blue-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 shrink-0 text-blue-500" />
                  <span className="font-extrabold text-xs sm:text-sm">Other Payment</span>
                </div>
                <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold leading-none mt-1 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                  Bank &amp; Other MFS
                </span>
              </button>
            </div>

            {/* TAB 1: BanglaQR Content */}
            {bdTab === 'banglaqr' && (
              <div className="rounded-2xl overflow-hidden shadow-sm border border-emerald-500/30 bg-gradient-to-br from-[#0c4a34] via-[#064e3b] to-[#043d2e] text-white">
                <div className="px-4 sm:px-6 py-3.5 bg-black/20 flex items-center justify-between border-b border-white/10 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-black tracking-wider uppercase">
                      BanglaQR
                    </span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black leading-none bg-emerald-400 text-gray-950">
                    Primary • Scan With Any App
                  </span>
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#101915] text-gray-900 dark:text-gray-100 border border-emerald-300 dark:border-emerald-700/50 shadow-md flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 sm:gap-6">
                    {/* QR Image Container */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="relative p-2.5 bg-white rounded-2xl border-2 border-emerald-500 shadow-md">
                        {imageErrorMap['/thanks/banglaqr.png'] ? (
                          <StylizedQrFallback
                            title="BanglaQR Code"
                            subText="Scan with any MFS or Banking App"
                            brandColor="emerald"
                          />
                        ) : (
                          <div
                            onClick={() =>
                              setActiveZoomModal({
                                src: '/thanks/banglaqr.png',
                                title: 'BanglaQR - Scan to Support',
                                variant: 'qr',
                                brand: 'banglaqr',
                                caption: 'Point your phone camera or bank app QR scanner at this code.',
                                downloadName: 'Shahoriar_BanglaQR.png',
                              })
                            }
                            className="relative w-52 sm:w-60 aspect-[800/1060] overflow-hidden rounded-xl bg-white flex items-center justify-center cursor-pointer group"
                            title="Click to enlarge"
                          >
                            <Image
                              src="/thanks/banglaqr.png"
                              alt="BanglaQR Code - Md Al Shahoriar Hossain"
                              width={800}
                              height={1060}
                              priority
                              className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform"
                              onError={() => handleImageError('/thanks/banglaqr.png')}
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-2.5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveZoomModal({
                              src: '/thanks/banglaqr.png',
                              title: 'BanglaQR - Scan to Support',
                              variant: 'qr',
                              brand: 'banglaqr',
                              caption: 'Point your phone camera or bank app QR scanner at this code.',
                              downloadName: 'Shahoriar_BanglaQR.png',
                            })
                          }
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 cursor-pointer"
                        >
                          <Maximize2 className="w-3 h-3" />
                          <span>View / Enlarge QR</span>
                        </button>
                        <a
                          href="/thanks/banglaqr.png"
                          download="Shahoriar_BanglaQR.png"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:underline bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>

                    {/* Instructions beside QR */}
                    <div className="flex-1 space-y-3 text-xs w-full min-w-0">
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-950 dark:text-emerald-200 text-xs leading-relaxed flex items-start gap-2.5">
                        <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          Scan this BanglaQR with <strong>any Bank or MFS app</strong> (bKash, Nagad, Cellfin, Citytouch, Astha, SC Mobile, etc. — 20+ apps supported). You can contribute whatever amount feels right to you.
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1a2130] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                          How it works:
                        </span>
                        <ul className="space-y-1 text-[11px]">
                          <li>• Open any Bangladeshi mobile banking or bank app with QR scanning.</li>
                          <li>• Scan the BanglaQR code above.</li>
                          <li>• Enter any amount of your choice and authorize with your PIN.</li>
                          <li>• No form submission needed. If you wish, drop an email to say hi!</li>
                        </ul>
                      </div>

                      {/* Accepted Apps Banner Image */}
                      {!imageErrorMap['/thanks/banglaqr-app.png'] && (
                        <div
                          onClick={() =>
                            setActiveZoomModal({
                              src: '/thanks/banglaqr-app.png',
                              title: 'Supported Banking & MFS Apps for BanglaQR',
                              variant: 'banner',
                              caption: 'All of these 20+ Bank and MFS apps support BanglaQR scanning.',
                            })
                          }
                          className="relative w-full overflow-hidden rounded-xl border border-red-500/30 shadow-md group cursor-pointer hover:border-red-400 transition-all active:scale-[0.99] bg-[#be1e2d]"
                        >
                          <Image
                            src="/thanks/banglaqr-app.png"
                            alt="Supported Banking & MFS Apps for BanglaQR"
                            width={1000}
                            height={420}
                            priority
                            className="w-full h-auto object-contain rounded-xl"
                            onError={() => handleImageError('/thanks/banglaqr-app.png')}
                          />
                          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <Maximize2 className="w-2.5 h-2.5" />
                            <span>Tap to zoom</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: bKash Content */}
            {bdTab === 'bkash' && (
              <div className="space-y-3">
                {/* Sub-selector: Make Payment (Merchant) vs Send Money (Personal) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 bg-gray-100 dark:bg-[#161c28] rounded-xl border border-gray-200 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => setBkashSubTab('payment')}
                    className={`w-full flex items-center justify-between sm:justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                      bkashSubTab === 'payment'
                        ? 'bg-white dark:bg-[#1f2737] text-pink-600 dark:text-pink-400 shadow-sm border border-pink-200 dark:border-pink-900/60'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 shrink-0" />
                      <span>1. Make Payment (Merchant QR)</span>
                    </div>
                    <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/60 font-black">
                      Payment
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBkashSubTab('personal')}
                    className={`w-full flex items-center justify-between sm:justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                      bkashSubTab === 'personal'
                        ? 'bg-white dark:bg-[#1f2737] text-pink-600 dark:text-pink-400 shadow-sm border border-pink-200 dark:border-pink-900/60'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4 shrink-0" />
                      <span>2. Send Money (Personal)</span>
                    </div>
                    <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-800 font-black">
                      Personal
                    </span>
                  </button>
                </div>

                {/* Sub-View 1: bKash Make Payment (Merchant) */}
                {bkashSubTab === 'payment' && (
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-[#D12053]/30 bg-gradient-to-br from-[#C41A4E] to-[#990D37] text-white">
                    <div className="px-4 sm:px-6 py-3.5 bg-black/15 flex items-center justify-between border-b border-white/10 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-white" />
                        <span className="text-xs font-black tracking-wider uppercase">
                          bKash Make Payment (Merchant)
                        </span>
                      </div>
                      <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black leading-none bg-white/20 backdrop-blur-sm">
                        Merchant Counter
                      </span>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="p-4 rounded-2xl bg-white dark:bg-[#151c27] text-gray-900 dark:text-gray-100 border border-pink-300 dark:border-pink-900/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 mb-2">
                        {/* QR Image Box */}
                        <div className="flex flex-col items-center shrink-0">
                          <div className="relative group p-2.5 bg-white rounded-2xl border-2 border-[#D12053] shadow-md">
                            {imageErrorMap['/thanks/bkash-payment.png'] ? (
                              <StylizedQrFallback
                                title="bKash Merchant QR"
                                subText="Scan & Choose 'Make Payment'"
                                brandColor="pink"
                              />
                            ) : (
                              <div
                                onClick={() =>
                                  setActiveZoomModal({
                                    src: '/thanks/bkash-payment.png',
                                    title: 'bKash Merchant Payment QR',
                                    variant: 'qr',
                                    brand: 'bkash',
                                    caption: 'Scan with bKash app from "Make Payment" to support.',
                                    downloadName: 'Shahoriar_bKash_Payment.png',
                                  })
                                }
                                className="relative w-52 sm:w-60 aspect-[800/1060] overflow-hidden rounded-xl bg-white flex items-center justify-center cursor-pointer group"
                                title="Click to enlarge"
                              >
                                <Image
                                  src="/thanks/bkash-payment.png"
                                  alt="bKash Payment QR - Md Al Shahoriar Hossain"
                                  width={800}
                                  height={1060}
                                  priority
                                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform"
                                  onError={() => handleImageError('/thanks/bkash-payment.png')}
                                />
                              </div>
                            )}
                          </div>

                          <div className="mt-2.5 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveZoomModal({
                                  src: '/thanks/bkash-payment.png',
                                  title: 'bKash Merchant Payment QR',
                                  variant: 'qr',
                                  brand: 'bkash',
                                  caption: 'Scan with bKash app from "Make Payment" to support.',
                                  downloadName: 'Shahoriar_bKash_Payment.png',
                                })
                              }
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-700 dark:text-pink-400 hover:underline bg-pink-50 dark:bg-pink-950/40 px-2.5 py-1 rounded-lg border border-pink-200 dark:border-pink-800 cursor-pointer"
                            >
                              <Maximize2 className="w-3 h-3" />
                              <span>View / Enlarge QR</span>
                            </button>
                            <a
                              href="/thanks/bkash-payment.png"
                              download="Shahoriar_bKash_Payment.png"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:underline bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download</span>
                            </a>
                          </div>
                        </div>

                        {/* Details & Instructions */}
                        <div className="flex-1 space-y-3 w-full text-xs">
                          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#1a2130] border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">
                                bKash Merchant Number
                              </span>
                              <span className="font-mono text-base font-black text-gray-900 dark:text-white block mt-0.5 select-all">
                                {PAYMENT_DETAILS.bkashPayment.number}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(PAYMENT_DETAILS.bkashPayment.number, 'pay_num')}
                              className="px-3.5 py-2 rounded-lg bg-[#D12053] hover:bg-[#b01040] text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer min-h-[38px]"
                            >
                              {copiedKey === 'pay_num' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedKey === 'pay_num' ? 'Copied' : 'Copy Number'}</span>
                            </button>
                          </div>

                          <ol className="space-y-1.5 text-gray-600 dark:text-gray-300 text-[11px] pt-1">
                            <li>• Open bKash app or dial <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded font-mono font-bold">*247#</code></li>
                            <li>• Select <strong>&ldquo;Make Payment&rdquo;</strong> (or scan the Merchant QR above)</li>
                            <li>• Enter Merchant number <strong>{PAYMENT_DETAILS.bkashPayment.number}</strong> & whatever voluntary amount you like</li>
                            <li>• Confirm with your bKash PIN</li>
                            <li>• No submission needed — feel free to email <span className="font-mono font-semibold text-pink-600 dark:text-pink-400">hello@shahoriar.bd</span> so I can thank you!</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-View 2: bKash Send Money (Personal) */}
                {bkashSubTab === 'personal' && (
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-[#D12053]/30 bg-gradient-to-br from-[#D12053] to-[#B01040] text-white">
                    <div className="px-4 sm:px-6 py-3.5 bg-black/15 flex items-center justify-between border-b border-white/10 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4 text-white" />
                        <span className="text-xs font-black tracking-wider uppercase">
                          bKash Send Money (Personal)
                        </span>
                      </div>
                      <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black leading-none bg-white/20 backdrop-blur-sm">
                        Personal Number • Direct Send
                      </span>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#151c27] text-gray-900 dark:text-gray-100 border border-pink-300 dark:border-pink-900/40 shadow-sm space-y-4">
                        <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800/60 text-pink-900 dark:text-pink-200 text-xs flex items-start gap-2.5">
                          <Smartphone className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
                          <div className="leading-relaxed">
                            <strong className="font-bold">Personal Account Transfer:</strong> bKash personal accounts do not use merchant QR codes. Please use <strong>&ldquo;Send Money&rdquo;</strong> in your bKash app or dial <code className="bg-pink-100 dark:bg-pink-900/50 px-1 py-0.5 rounded font-mono font-bold">*247#</code> directly to our personal number below.
                          </div>
                        </div>

                        {/* Number Box */}
                        <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#1a2130] border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">
                              bKash Personal Number
                            </span>
                            <span className="font-mono text-base sm:text-lg font-black text-gray-900 dark:text-white block mt-0.5 select-all">
                              {PAYMENT_DETAILS.bkashSendMoney.number}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(PAYMENT_DETAILS.bkashSendMoney.number, 'send_num')}
                            className="px-3.5 py-2 rounded-lg bg-[#D12053] hover:bg-[#b01040] text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer min-h-[40px]"
                          >
                            {copiedKey === 'send_num' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                            <span>{copiedKey === 'send_num' ? 'Copied' : 'Copy Number'}</span>
                          </button>
                        </div>

                        {/* Step-by-Step Instructions */}
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-2">
                            Step-by-Step Instructions:
                          </span>
                          <ol className="space-y-1.5 text-gray-700 dark:text-gray-300 text-xs">
                            <li>• Open your bKash app or dial <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono font-bold">*247#</code></li>
                            <li>• Select <strong>&ldquo;Send Money&rdquo;</strong></li>
                            <li>• Enter Personal Number <strong>{PAYMENT_DETAILS.bkashSendMoney.number}</strong></li>
                            <li>• Enter whatever amount you wish and confirm with your bKash PIN</li>
                            <li>• No receipt submission required. Feel free to email me if you want to say hi!</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Other Payment (Bank, Other MFS) */}
            {bdTab === 'other' && (
              <div className="space-y-4">
                {/* Sub-selector: Other MFS vs Bank Account */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 bg-gray-100 dark:bg-[#161c28] rounded-xl border border-gray-200 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => setOtherSubTab('mfs')}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                      otherSubTab === 'mfs'
                        ? 'bg-white dark:bg-[#1f2737] text-orange-600 dark:text-orange-400 shadow-sm border border-orange-200 dark:border-orange-900/60'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 shrink-0" />
                    <span>Cellfin, Nagad &amp; Rocket</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOtherSubTab('bank')}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                      otherSubTab === 'bank'
                        ? 'bg-white dark:bg-[#1f2737] text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200 dark:border-blue-900/60'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span>Bank Transfer (NPSB)</span>
                  </button>
                </div>

                {/* Sub-View 1: Other MFS (Cellfin, Nagad, Rocket) */}
                {otherSubTab === 'mfs' && (
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-orange-200 dark:border-orange-900/40 bg-white dark:bg-[#161c28]">
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent dark:from-orange-950/30 dark:via-[#161c28] border-b border-orange-100 dark:border-orange-900/30">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1.5">
                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-[9px] text-white font-black flex items-center justify-center">C</span>
                            <span className="w-5 h-5 rounded-full bg-orange-500 text-[9px] text-white font-black flex items-center justify-center">N</span>
                            <span className="w-5 h-5 rounded-full bg-purple-600 text-[9px] text-white font-black flex items-center justify-center">R</span>
                          </div>
                          <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">
                            Cellfin, Nagad &amp; Rocket (Send Money)
                          </h3>
                        </div>
                        <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold leading-none bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300">
                          Send Money / Transfer
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-3.5 text-xs text-gray-700 dark:text-gray-300">
                      {/* Number Copy Box */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-[#111620] border border-gray-200 dark:border-gray-800 gap-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block">
                            Target Mobile Number (Nagad / Rocket / Cellfin)
                          </span>
                          <span className="font-mono text-xl font-black text-gray-900 dark:text-white tracking-widest mt-0.5 block select-all">
                            {PAYMENT_DETAILS.otherMfs.number}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(PAYMENT_DETAILS.otherMfs.number, 'mfs_num')}
                          className="inline-flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white active:scale-95 px-4 py-2.5 rounded-lg font-bold text-xs transition-all shadow-sm cursor-pointer min-h-[40px]"
                        >
                          {copiedKey === 'mfs_num' ? (
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

                      <ol className="space-y-2 pt-1 border-t border-gray-100 dark:border-gray-800/80">
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                          <span>Open your <strong>Cellfin</strong>, <strong>Nagad</strong>, or <strong>Rocket</strong> App.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                          <span>Select <strong>Send Money</strong> or <strong>Fund Transfer</strong> to <strong>{PAYMENT_DETAILS.otherMfs.number}</strong>.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                          <span>Enter any amount you wish to contribute and confirm with your PIN.</span>
                        </li>
                      </ol>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800/60">
                        <span>Direct portal links:</span>
                        <a
                          href="https://nagad.com.bd"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1 font-semibold"
                        >
                          <span>Nagad.com.bd</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <span>•</span>
                        <a
                          href="https://cellfin.ibblbd.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-semibold"
                        >
                          <span>Cellfin (IBBL)</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-View 2: Bank Transfer (Standard Chartered Bank PLC) */}
                {otherSubTab === 'bank' && (
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-blue-200 dark:border-blue-900/50 bg-white dark:bg-[#161c28]">
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent dark:from-blue-950/30 dark:via-[#161c28] border-b border-blue-100 dark:border-blue-900/30">
                      <div className="flex items-start sm:items-center justify-between flex-wrap gap-2.5">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                          <div>
                            <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">
                              Standard Chartered Bank PLC
                            </h3>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">Direct Bank Transfer (NPSB / BEFTN)</span>
                          </div>
                        </div>
                        <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold leading-none bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          Preferred Mode: NPSB (Instant)
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-3.5 text-xs">
                      {/* Bank Details Table Component */}
                      <BankDetailsBlock
                        copiedKey={copiedKey}
                        onCopy={handleCopy}
                        onCopyAll={copyAllBank}
                        mode="local"
                      />

                      {/* NPSB Note */}
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <strong className="font-extrabold">Notice:</strong> {PAYMENT_DETAILS.bank.note}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* INTERNATIONAL PAYMENT OPTIONS                                         */}
        {/* ===================================================================== */}
        {region === 'international' && (
          <div className="space-y-4">
            {/* 3 Main Tabs Header for International */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-gray-100 dark:bg-[#111620] rounded-2xl border border-gray-200 dark:border-gray-800">
              {/* Tab 1: Wise / Remitly / TapTap */}
              <button
                type="button"
                onClick={() => setIntlTab('remit')}
                className={`flex flex-col items-center justify-center text-center p-3 rounded-xl transition-all cursor-pointer ${
                  intlTab === 'remit'
                    ? 'bg-white dark:bg-[#1B2230] text-sky-600 dark:text-sky-400 shadow-sm border border-sky-200 dark:border-sky-900/60 ring-2 ring-sky-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 shrink-0 text-sky-500" />
                  <span className="font-black text-xs sm:text-sm">Remittance Apps</span>
                </div>
                <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black leading-none mt-1 bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                  Wise / Remitly / TapTap
                </span>
              </button>

              {/* Tab 2: PayPal via Xoom */}
              <button
                type="button"
                onClick={() => setIntlTab('xoom')}
                className={`flex flex-col items-center justify-center text-center p-3 rounded-xl transition-all cursor-pointer ${
                  intlTab === 'xoom'
                    ? 'bg-white dark:bg-[#1B2230] text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200 dark:border-blue-900/60 ring-2 ring-blue-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Send className="w-4 h-4 shrink-0 text-blue-500" />
                  <span className="font-extrabold text-xs sm:text-sm">PayPal (via Xoom)</span>
                </div>
                <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-none mt-1 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                  PayPal Balance &amp; Cards
                </span>
              </button>

              {/* Tab 3: SWIFT Wire */}
              <button
                type="button"
                onClick={() => setIntlTab('bank')}
                className={`flex flex-col items-center justify-center text-center p-3 rounded-xl transition-all cursor-pointer ${
                  intlTab === 'bank'
                    ? 'bg-white dark:bg-[#1B2230] text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-200 dark:border-indigo-900/60 ring-2 ring-indigo-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 shrink-0 text-indigo-500" />
                  <span className="font-extrabold text-xs sm:text-sm">Bank Wire (SWIFT)</span>
                </div>
                <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold leading-none mt-1 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                  Global Banks &amp; Neobanks
                </span>
              </button>
            </div>

            {/* INTL TAB 1: Wise / Remitly / TapTap */}
            {intlTab === 'remit' && (
              <div className="rounded-2xl overflow-hidden shadow-sm border border-sky-500/30 bg-gradient-to-br from-[#0b3353] via-[#07253d] to-[#041a2c] text-white">
                <div className="px-4 sm:px-6 py-3.5 bg-black/20 flex items-center justify-between border-b border-white/10 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                    <span className="text-xs font-black tracking-wider uppercase">
                      Direct Remittance to bKash or Bank
                    </span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black leading-none bg-sky-400 text-gray-950">
                    Fastest &amp; Lowest Fees
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111923] text-gray-900 dark:text-gray-100 border border-sky-300 dark:border-sky-800/50 shadow-md space-y-4">
                    <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-950 dark:text-sky-200 text-xs leading-relaxed flex items-start gap-2.5">
                      <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        Apps like <strong>Wise</strong>, <strong>Remitly</strong>, and <strong>TapTap Send</strong> allow you to send directly from your US, UK, EU, Canadian, Australian, or Middle Eastern bank account / debit card directly to my bKash wallet or bank account in minutes.
                      </div>
                    </div>

                    {/* Recipient Credentials Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Recipient bKash */}
                      <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#1a2130] border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">
                            Recipient bKash Wallet Number
                          </span>
                          <span className="font-mono text-base font-black text-gray-900 dark:text-white block mt-0.5 select-all">
                            01865333143
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy('01865333143', 'intl_bkash')}
                          className="px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer min-h-[38px]"
                        >
                          {copiedKey === 'intl_bkash' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'intl_bkash' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      {/* Recipient Legal Name */}
                      <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#1a2130] border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2">
                        <div className="min-w-0 pr-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">
                            Recipient Legal Name
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white block mt-0.5 truncate select-all">
                            MD AL SHAHORIAR HOSSAIN
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy('MD AL SHAHORIAR HOSSAIN', 'intl_name')}
                          className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0 min-h-[38px]"
                        >
                          {copiedKey === 'intl_name' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'intl_name' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Direct App Launchers */}
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-2">
                        Official Remittance Portals:
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href="https://wise.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold hover:border-sky-500 transition-colors"
                        >
                          <span>Wise.com</span>
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </a>
                        <a
                          href="https://www.remitly.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold hover:border-sky-500 transition-colors"
                        >
                          <span>Remitly.com</span>
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </a>
                        <a
                          href="https://www.taptapsend.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold hover:border-sky-500 transition-colors"
                        >
                          <span>TapTapSend.com</span>
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </a>
                      </div>
                    </div>

                    {/* Fallback Collapsible: Bank Deposit inside Remittance Apps */}
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 space-y-3">
                      <button
                        type="button"
                        onClick={() => setShowBankFallback((prev) => !prev)}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/60 flex items-center justify-between text-left transition-colors group cursor-pointer"
                        aria-expanded={showBankFallback}
                      >
                        <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          Not finding bKash on your app? Choose Bank Deposit instead
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                            showBankFallback ? 'rotate-180 text-sky-600 dark:text-sky-400' : ''
                          }`}
                        />
                      </button>

                      {showBankFallback && (
                        <div className="pt-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                            Choose <strong>Bank Transfer / Bank Deposit</strong> inside Wise, Remitly, or TapTap Send, and enter these account details:
                          </p>
                          <BankDetailsBlock
                            copiedKey={copiedKey}
                            onCopy={handleCopy}
                            onCopyAll={copyAllBank}
                            mode="full"
                          />
                        </div>
                      )}
                    </div>

                    {/* Step-by-Step Instructions */}
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-2">
                        Instructions:
                      </span>
                      <ol className="space-y-1 text-gray-600 dark:text-gray-300 text-xs">
                        <li>• Open Wise, Remitly, or TapTap Send.</li>
                        <li>• Choose <strong>Bangladesh</strong> as the destination country.</li>
                        <li>• Select delivery to <strong>bKash Mobile Wallet</strong> (enter <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono font-bold">01865333143</code>) or <strong>Bank Deposit</strong>.</li>
                        <li>• Pay with your local debit card or bank account.</li>
                        <li>• No receipt upload needed. Drop an email to <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">hello@shahoriar.bd</span> if you want to say hi!</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INTL TAB 2: PayPal via Xoom */}
            {intlTab === 'xoom' && (
              <div className="rounded-2xl overflow-hidden shadow-sm border border-blue-500/30 bg-gradient-to-br from-[#082d62] via-[#052047] to-[#031530] text-white">
                <div className="px-4 sm:px-6 py-3.5 bg-black/20 flex items-center justify-between border-b border-white/10 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-white" />
                    <span className="text-xs font-black tracking-wider uppercase">
                      PayPal via Xoom Bangladesh
                    </span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black leading-none bg-blue-400 text-gray-950">
                    Use Your PayPal Balance
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111923] text-gray-900 dark:text-gray-100 border border-blue-300 dark:border-blue-800/50 shadow-md space-y-4">
                    <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-950 dark:text-blue-200 text-xs leading-relaxed flex items-start gap-2.5">
                      <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        PayPal operates <strong>Xoom.com</strong> specifically for sending funds to Bangladesh. You simply log in with your existing PayPal credentials and choose either <strong>bKash Mobile Wallet</strong> or <strong>Direct Bank Deposit</strong>.
                      </div>
                    </div>

                    <a
                      href="https://www.xoom.com/bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm active:scale-95 cursor-pointer min-h-[44px]"
                    >
                      <span>Open Xoom Bangladesh</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Dual Delivery Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Option 1: bKash on Xoom */}
                      <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#1a2130] border border-gray-200 dark:border-gray-800 space-y-2">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide block">
                          Option 1: bKash Wallet Transfer (Instant)
                        </span>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 block">bKash Number</span>
                            <span className="font-mono font-bold text-sm text-gray-900 dark:text-white select-all">01865333143</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy('01865333143', 'xoom_bkash')}
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer"
                            title="Copy bKash Number"
                          >
                            {copiedKey === 'xoom_bkash' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Option 2: Bank Deposit on Xoom */}
                      <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#1a2130] border border-gray-200 dark:border-gray-800 space-y-2">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide block">
                          Option 2: Direct Bank Deposit
                        </span>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 block">Account Number</span>
                            <span className="font-mono font-bold text-sm text-gray-900 dark:text-white select-all">18246161201</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy('18246161201', 'xoom_acc')}
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer"
                            title="Copy Account Number"
                          >
                            {copiedKey === 'xoom_acc' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
                      <BankDetailsBlock
                        copiedKey={copiedKey}
                        onCopy={handleCopy}
                        onCopyAll={copyAllBank}
                        mode="compact"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INTL TAB 3: SWIFT Wire */}
            {intlTab === 'bank' && (
              <div className="rounded-2xl overflow-hidden shadow-sm border border-indigo-500/30 bg-gradient-to-br from-[#1a233a] via-[#141b2d] to-[#0f1422] text-white">
                <div className="px-4 sm:px-6 py-3.5 bg-black/20 flex items-center justify-between border-b border-white/10 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-white" />
                    <span className="text-xs font-black tracking-wider uppercase">
                      Standard Chartered Bank PLC (SWIFT Wire)
                    </span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black leading-none bg-indigo-400 text-gray-950">
                    SWIFT: SCBLBDDX
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111923] text-gray-900 dark:text-gray-100 border border-indigo-300 dark:border-indigo-800/50 shadow-md space-y-4">
                    <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-950 dark:text-indigo-200 text-xs leading-relaxed flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        For wire transfers from traditional global banks (Chase, Bank of America, Barclays, HSBC, Deutsche Bank) or European digital neobanks (Revolut, N26, Monzo), use the SWIFT credentials below.
                      </div>
                    </div>

                    <BankDetailsBlock
                      copiedKey={copiedKey}
                      onCopy={handleCopy}
                      onCopyAll={copyAllBank}
                      mode="full"
                    />

                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1a2130] border border-gray-200 dark:border-gray-800 text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      <strong>Multi-Currency Handling:</strong> You can wire funds in USD, EUR, GBP, or your local currency. Standard Chartered Bank PLC automatically converts incoming wires into BDT at the official central bank exchange rate.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SIMPLE CONTACT / NOTE FOOTER */}
      {/* ========================================================================= */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-0.5">
          <span className="text-sm font-bold text-gray-900 dark:text-white block">
            Made a contribution?
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Feel free to email me so I can personally thank you for your support.
          </p>
        </div>

        <a
          href="mailto:hello@shahoriar.bd?subject=Support%20Confirmation%20-%20Shahoriar"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-semibold transition-all active:scale-95 shrink-0 min-h-[44px]"
        >
          <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>hello@shahoriar.bd</span>
        </a>
      </div>

      {/* ========================================================================= */}
      {/* LIGHTBOX / ZOOM MODAL                                                     */}
      {/* ========================================================================= */}
      {activeZoomModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setActiveZoomModal(null)}
        >
          <div
            className={`bg-white dark:bg-[#111620] rounded-3xl p-4 sm:p-5 w-full border border-gray-200 dark:border-gray-800 shadow-2xl relative ${
              activeZoomModal.variant === 'banner' ? 'max-w-xl sm:max-w-2xl' : 'max-w-sm'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-black text-gray-900 dark:text-white">
                {activeZoomModal.title}
              </h4>
              <button
                type="button"
                onClick={() => setActiveZoomModal(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Banner vs QR */}
            {activeZoomModal.variant === 'banner' ? (
              <div className="relative w-full overflow-hidden rounded-2xl border border-red-500/40 shadow-inner bg-[#be1e2d] aspect-[1000/420]">
                {imageErrorMap[activeZoomModal.src] ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-white">
                    <span className="font-bold text-sm">Supported Apps for BanglaQR</span>
                    <span className="text-xs text-white/80 mt-1">bKash, Nagad, Cellfin, Citytouch, Astha, SC Mobile, Upay &amp; 20+ banks</span>
                  </div>
                ) : (
                  <Image
                    src={activeZoomModal.src}
                    alt={activeZoomModal.title}
                    width={1000}
                    height={420}
                    priority
                    className="w-full h-full object-contain rounded-2xl"
                    onError={() => handleImageError(activeZoomModal.src)}
                  />
                )}
              </div>
            ) : (
              <div
                className={`p-3 bg-white rounded-2xl border-2 shadow-inner flex items-center justify-center ${
                  activeZoomModal.brand === 'bkash'
                    ? 'border-[#D12053]/50'
                    : 'border-emerald-500/50'
                }`}
              >
                {imageErrorMap[activeZoomModal.src] ? (
                  <StylizedQrFallback
                    title={activeZoomModal.title}
                    subText="Scan from another screen or phone"
                    brandColor={activeZoomModal.brand === 'bkash' ? 'pink' : 'emerald'}
                  />
                ) : (
                  <div className="relative w-full aspect-[800/1060] overflow-hidden rounded-xl bg-white flex items-center justify-center">
                    <Image
                      src={activeZoomModal.src}
                      alt={activeZoomModal.title}
                      width={800}
                      height={1060}
                      priority
                      className="w-full h-full object-contain rounded-xl"
                      onError={() => handleImageError(activeZoomModal.src)}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 mt-3">
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">
                {activeZoomModal.caption || 'Scan with your banking or mobile wallet app.'}
              </p>
              {activeZoomModal.downloadName && (
                <a
                  href={activeZoomModal.src}
                  download={activeZoomModal.downloadName}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:underline bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 shrink-0"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

{/* ========================================================================= */}
{/* REUSABLE BANK DETAILS GRID                                                */}
{/* ========================================================================= */}
interface BankProps {
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
  onCopyAll: () => void;
  mode: 'local' | 'compact' | 'full';
}

function BankDetailsBlock({ copiedKey, onCopy, onCopyAll, mode }: BankProps) {
  const b = PAYMENT_DETAILS.bank;

  const rows = [
    { label: 'Bank Name', value: b.bankName, key: 'b_name' },
    { label: 'Branch Name', value: b.branch, key: 'b_branch' },
    { label: 'Account Title', value: b.title, key: 'b_title' },
    { label: 'Account Number', value: b.accountNumber, key: 'b_acc', mono: true },
    { label: 'Routing Number', value: b.routingNumber, key: 'b_routing', mono: true },
    ...(mode !== 'compact'
      ? [
          { label: 'SWIFT / BIC Code', value: b.swiftCode, key: 'b_swift', mono: true },
          { label: 'Branch Code', value: b.branchCode, key: 'b_bcode', mono: true },
          { label: 'District & Country', value: `${b.district}, ${b.country}`, key: 'b_district' },
          { label: 'Branch Address', value: b.address, key: 'b_addr' },
          { label: 'Call Centre', value: b.callCentre, key: 'b_call', mono: true },
        ]
      : []),
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
          Standard Chartered Bank Credentials:
        </span>
        <button
          type="button"
          onClick={onCopyAll}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          {copiedKey === 'all_bank' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>All Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy All Details</span>
            </>
          )}
        </button>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900/60 text-xs">
        {rows.map((row) => {
          const isCopied = copiedKey === row.key;
          return (
            <div
              key={row.key}
              className="p-3 flex items-center justify-between gap-3 hover:bg-gray-50/70 dark:hover:bg-gray-800/30 transition-colors"
            >
              <div className="min-w-0 pr-2">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block">
                  {row.label}
                </span>
                <span
                  className={`block mt-0.5 text-xs sm:text-sm font-semibold break-words select-all text-gray-900 dark:text-white ${
                    row.mono ? 'font-mono' : ''
                  }`}
                >
                  {row.value}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onCopy(row.value, row.key)}
                className="shrink-0 p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors touch-manipulation cursor-pointer"
                title={`Copy ${row.label}`}
                aria-label={`Copy ${row.label}`}
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
