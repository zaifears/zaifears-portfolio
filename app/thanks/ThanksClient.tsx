'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Copy,
  Check,
  Building2,
  Smartphone,
  ExternalLink,
  Heart,
  Server,
  Globe,
  Database,
  Shield,
  Mail,
} from 'lucide-react';

export type Region = 'bangladesh' | 'international';
export type LocalMethod = 'bkash' | 'other_mfs' | 'bank';
export type IntlMethod = 'remit' | 'xoom' | 'bank';

const BANK_DETAILS = {
  bankName: 'Standard Chartered Bank',
  branchName: 'Motijheel Branch',
  accountTitle: 'MD AL SHAHORIAR HOSSAIN',
  accountNumber: '18246161201',
  routingNumber: '215274247',
  swiftCode: 'SCBLBDDX',
  branchCode: '00424',
  district: 'Dhaka',
  address: 'Alico Building, 18-20 Motijheel C/A, Dhaka 1000',
  callCentre: '+880 96 66777111',
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

export default function ThanksClient() {
  const [region, setRegion] = useState<Region>('bangladesh');
  const [localMethod, setLocalMethod] = useState<LocalMethod>('bkash');
  const [intlMethod, setIntlMethod] = useState<IntlMethod>('remit');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const copyAllBank = () => {
    const text = `Standard Chartered Bank Account Details:
Bank Name: ${BANK_DETAILS.bankName}
Branch Name: ${BANK_DETAILS.branchName}
Account Title: ${BANK_DETAILS.accountTitle}
Account Number: ${BANK_DETAILS.accountNumber}
Routing Number: ${BANK_DETAILS.routingNumber}
SWIFT Code: ${BANK_DETAILS.swiftCode}
Branch Code: ${BANK_DETAILS.branchCode}
District: ${BANK_DETAILS.district}
Address: ${BANK_DETAILS.address}
Call Centre: ${BANK_DETAILS.callCentre}`;
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
              Audit Associate & Software Developer
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
            Please contribute whatever feels right to you. Every single contribution makes a difference.
          </p>
        </div>

        {/* Region Toggle */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <button
            type="button"
            onClick={() => setRegion('bangladesh')}
            className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              region === 'bangladesh'
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            🇧🇩 From Bangladesh
          </button>
          <button
            type="button"
            onClick={() => setRegion('international')}
            className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              region === 'international'
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            🌍 From Outside Bangladesh
          </button>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* BANGLADESH PAYMENT OPTIONS */}
        {/* --------------------------------------------------------------------- */}
        {region === 'bangladesh' && (
          <div className="space-y-4">
            {/* Method Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 text-xs">
              <button
                type="button"
                onClick={() => setLocalMethod('bkash')}
                className={`py-2 px-2 rounded-lg font-semibold transition-all text-center ${
                  localMethod === 'bkash'
                    ? 'bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                bKash
              </button>
              <button
                type="button"
                onClick={() => setLocalMethod('other_mfs')}
                className={`py-2 px-2 rounded-lg font-semibold transition-all text-center ${
                  localMethod === 'other_mfs'
                    ? 'bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Nagad / Rocket / Cellfin
              </button>
              <button
                type="button"
                onClick={() => setLocalMethod('bank')}
                className={`py-2 px-2 rounded-lg font-semibold transition-all text-center ${
                  localMethod === 'bank'
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Bank Transfer
              </button>
            </div>

            {/* bKash Options */}
            {localMethod === 'bkash' && (
              <div className="p-5 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 space-y-4">
                <div className="space-y-3">
                  {/* Personal bKash */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
                        bKash Personal (Send Money)
                      </span>
                      <span className="text-lg sm:text-xl font-mono font-bold text-gray-900 dark:text-white mt-0.5 block">
                        01865333143
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('01865333143', 'bkash_p')}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold transition-all active:scale-95 shrink-0"
                    >
                      {copiedKey === 'bkash_p' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'bkash_p' ? 'Copied' : 'Copy Number'}</span>
                    </button>
                  </div>

                  {/* Merchant bKash */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
                        bKash Merchant (Make Payment)
                      </span>
                      <span className="text-lg sm:text-xl font-mono font-bold text-gray-900 dark:text-white mt-0.5 block">
                        01581401895
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('01581401895', 'bkash_m')}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-semibold transition-all active:scale-95 shrink-0"
                    >
                      {copiedKey === 'bkash_m' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'bkash_m' ? 'Copied' : 'Copy Number'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                  <span>Open your bKash app and send any amount you like.</span>
                  <a
                    href="https://www.bkash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 dark:text-pink-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>bKash.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Other MFS */}
            {localMethod === 'other_mfs' && (
              <div className="p-5 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 space-y-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
                      Cellfin / Nagad / Rocket (Send Money)
                    </span>
                    <span className="text-lg sm:text-xl font-mono font-bold text-gray-900 dark:text-white mt-0.5 block">
                      01865333143
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('01865333143', 'mfs_num')}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold transition-all active:scale-95 shrink-0"
                  >
                    {copiedKey === 'mfs_num' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'mfs_num' ? 'Copied' : 'Copy Number'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-1">
                  <span>Send via your preferred mobile banking app:</span>
                  <a
                    href="https://nagad.com.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Nagad.com.bd</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <a
                    href="https://cellfin.ibblbd.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Cellfin (IBBL)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Local Bank Transfer */}
            {localMethod === 'bank' && (
              <div className="space-y-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Transfer from any Bangladeshi bank app — choose either BEFTN or NPSB.
                </p>
                <BankDetailsBlock
                  copiedKey={copiedKey}
                  onCopy={handleCopy}
                  onCopyAll={copyAllBank}
                  mode="local"
                />
              </div>
            )}
          </div>
        )}

        {/* --------------------------------------------------------------------- */}
        {/* INTERNATIONAL PAYMENT OPTIONS */}
        {/* --------------------------------------------------------------------- */}
        {region === 'international' && (
          <div className="space-y-4">
            {/* Method Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 text-xs">
              <button
                type="button"
                onClick={() => setIntlMethod('remit')}
                className={`py-2 px-2 rounded-lg font-semibold transition-all text-center ${
                  intlMethod === 'remit'
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Wise / Remitly / TapTap
              </button>
              <button
                type="button"
                onClick={() => setIntlMethod('xoom')}
                className={`py-2 px-2 rounded-lg font-semibold transition-all text-center ${
                  intlMethod === 'xoom'
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                PayPal (via Xoom)
              </button>
              <button
                type="button"
                onClick={() => setIntlMethod('bank')}
                className={`py-2 px-2 rounded-lg font-semibold transition-all text-center ${
                  intlMethod === 'bank'
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Bank / Wire (SWIFT)
              </button>
            </div>

            {/* Wise / Remitly / TapTap Send */}
            {intlMethod === 'remit' && (
              <div className="p-5 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Send Directly to Mobile Wallet (bKash) or Bank
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Apps like Wise, Remitly, or TapTap Send allow you to send money from your US, EU, UK, Canadian, or Australian bank account / debit card directly to my bKash wallet or bank account in minutes.
                  </p>
                </div>

                {/* Copyable Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 block">
                        bKash Number
                      </span>
                      <span className="font-mono font-bold text-sm text-gray-900 dark:text-white mt-0.5 block">
                        01865333143
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('01865333143', 'intl_bkash')}
                      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      title="Copy Number"
                    >
                      {copiedKey === 'intl_bkash' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 block">
                        Recipient Legal Name
                      </span>
                      <span className="font-bold text-xs text-gray-900 dark:text-white mt-0.5 block">
                        MD AL SHAHORIAR HOSSAIN
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('MD AL SHAHORIAR HOSSAIN', 'intl_name')}
                      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      title="Copy Name"
                    >
                      {copiedKey === 'intl_name' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Direct App Links */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800/60">
                  <span className="text-[11px] font-medium text-gray-500 block mb-2">
                    Official Remittance Links:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="https://wise.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold hover:border-blue-500 transition-colors"
                    >
                      <span>Wise.com</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </a>
                    <a
                      href="https://www.remitly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold hover:border-blue-500 transition-colors"
                    >
                      <span>Remitly.com</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </a>
                    <a
                      href="https://www.taptapsend.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold hover:border-blue-500 transition-colors"
                    >
                      <span>TapTapSend.com</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* PayPal via Xoom */}
            {intlMethod === 'xoom' && (
              <div className="p-5 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Send Using Your PayPal Account (via Xoom)
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    PayPal does not support direct peer-to-peer transfers into Bangladesh, but PayPal operates <strong>Xoom.com</strong> specifically for sending to Bangladesh. You simply log in with your existing PayPal credentials and choose either direct Bank Deposit or bKash.
                  </p>
                </div>

                <a
                  href="https://www.xoom.com/bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all active:scale-95"
                >
                  <span>Go to Xoom Bangladesh</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Bank Details for Xoom */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-bold text-gray-900 dark:text-white block mb-2">
                    Standard Chartered Bank Details (for Bank Deposit on Xoom):
                  </span>
                  <BankDetailsBlock
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                    onCopyAll={copyAllBank}
                    mode="compact"
                  />
                </div>
              </div>
            )}

            {/* Direct SWIFT / Wire Transfer / Neobanks */}
            {intlMethod === 'bank' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 text-xs text-gray-500 leading-relaxed">
                  For wire transfers from traditional banks (Chase, BoA, Barclays, Deutsche Bank) or European digital banks (Revolut, N26, Monzo), use the SWIFT details below.
                </div>
                <BankDetailsBlock
                  copiedKey={copiedKey}
                  onCopy={handleCopy}
                  onCopyAll={copyAllBank}
                  mode="full"
                />
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
          href="mailto:alshahoriar.hossain@gmail.com?subject=Support%20Confirmation%20-%20Shahoriar"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-semibold transition-all active:scale-95 shrink-0"
        >
          <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>alshahoriar.hossain@gmail.com</span>
        </a>
      </div>
    </div>
  );
}

{/* ========================================================================= */}
{/* REUSABLE BANK DETAILS GRID (NO CARD-IN-CARD NESTING, CLEAN & READABLE) */}
{/* ========================================================================= */}
interface BankProps {
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
  onCopyAll: () => void;
  mode: 'local' | 'compact' | 'full';
}

function BankDetailsBlock({ copiedKey, onCopy, onCopyAll, mode }: BankProps) {
  const b = BANK_DETAILS;

  const rows = [
    { label: 'Bank Name', value: b.bankName, key: 'b_name' },
    { label: 'Branch Name', value: b.branchName, key: 'b_branch' },
    { label: 'Account Title', value: b.accountTitle, key: 'b_title' },
    { label: 'Account Number', value: b.accountNumber, key: 'b_acc', mono: true },
    { label: 'Routing Number', value: b.routingNumber, key: 'b_routing', mono: true },
    ...(mode !== 'compact'
      ? [
          { label: 'SWIFT / BIC Code', value: b.swiftCode, key: 'b_swift', mono: true },
          { label: 'Branch Code', value: b.branchCode, key: 'b_bcode', mono: true },
          { label: 'District', value: b.district, key: 'b_district' },
          { label: 'Address', value: b.address, key: 'b_addr' },
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
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
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
              <div className="min-w-0">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block">
                  {row.label}
                </span>
                <span
                  className={`block mt-0.5 text-xs sm:text-sm font-semibold truncate text-gray-900 dark:text-white ${
                    row.mono ? 'font-mono' : ''
                  }`}
                >
                  {row.value}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onCopy(row.value, row.key)}
                className="shrink-0 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                title={`Copy ${row.label}`}
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
