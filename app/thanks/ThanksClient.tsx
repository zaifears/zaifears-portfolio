'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Building2,
  Check,
  Copy,
  CreditCard,
  Database,
  Download,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Maximize2,
  QrCode,
  Send,
  Server,
  Shield,
  Smartphone,
  X,
} from 'lucide-react';
import './thanks.css';

const SUPPORTKORI_URL = 'https://www.supportkori.com/zaifears';

export type Region = 'bangladesh' | 'international';
export type BdMethodTab = 'banglaqr' | 'bkash' | 'mfs' | 'bank';
export type IntlMethodTab = 'remit' | 'xoom' | 'bank';

export const PAYMENT_DETAILS = {
  banglaqr: {
    imagePath: '/thanks/banglaqr.png',
    appsBannerPath: '/thanks/banglaqr-app.png',
  },
  bkashPayment: {
    number: '01581401895',
    imagePath: '/thanks/bkash-payment.png',
  },
  bkashSendMoney: {
    number: '01865333143',
  },
  otherMfs: {
    number: '01865333143',
    channels: ['Cellfin', 'Nagad', 'Upay', 'Rocket'],
  },
  bank: {
    title: 'MD AL SHAHORIAR HOSSAIN',
    bankName: 'Eastern Bank PLC',
    accountNumber: '8208250002314',
    branch: 'Gulshan Branch, Dhaka',
    routingNumber: '095261562',
    swiftCode: 'EBLDBDDHXXX',
    note: 'NPSB is recommended for instant confirmation. BEFTN transfers can take up to 1 working day.',
  },
};

const EXPENSES = [
  {
    icon: Server,
    title: 'Cloud & server hosting',
    desc: 'Keeping compute instances, APIs, and background services running around the clock.',
  },
  {
    icon: Database,
    title: 'Databases & storage',
    desc: 'Storing and processing real-time financial and simulation data reliably.',
  },
  {
    icon: Globe,
    title: 'Domains & DNS',
    desc: 'Annual renewals for custom domains (.bd, .tech), SSL certificates, and DNS.',
  },
  {
    icon: Shield,
    title: 'Free & ad-free forever',
    desc: 'Keeping every tool open to everyone without paywalls, trackers, or sponsored clutter.',
  },
];

interface ZoomModalState {
  src: string;
  title: string;
  variant: 'qr' | 'banner';
  caption: string;
  downloadName?: string;
}

export default function ThanksClient() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [region, setRegion] = useState<Region>('bangladesh');
  const [bdTab, setBdTab] = useState<BdMethodTab>('banglaqr');
  const [intlTab, setIntlTab] = useState<IntlMethodTab>('remit');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeZoomModal, setActiveZoomModal] = useState<ZoomModalState | null>(null);

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

  const copyAllBank = () => {
    const b = PAYMENT_DETAILS.bank;
    const text = `Eastern Bank PLC Details:\nAccount Name: ${b.title}\nAccount Number: ${b.accountNumber}\nBank Name: ${b.bankName}\nBranch: ${b.branch}\nRouting Number: ${b.routingNumber}\nSWIFT Code: ${b.swiftCode}`;
    handleCopy(text, 'all_bank');
  };

  return (
    <div className="thanks-page">
      <main className="thanks-container py-3 sm:py-4 space-y-4 sm:space-y-5">
        {/* ================================================================= */}
        {/* 1. YELLOW CAPSULE: FACE + THANK YOU + SUPPORTKORI × BUYMEACOFFEE  */}
        {/* ================================================================= */}
        <section aria-labelledby="thanks-heading" className="thanks-trust-banner">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] overflow-hidden relative shrink-0 border-2 border-[var(--tk-ink)] bg-[var(--tk-surface)]">
                <Image
                  src="/images/shahoriar-author.jpg"
                  alt="Md Al Shahoriar Hossain"
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-1 min-w-0">
                <h1 id="thanks-heading" className="thanks-display">
                  Thank you for supporting my free tools.
                </h1>
                <p className="text-sm sm:text-base text-[var(--tk-ink-2)]">
                  Free apps with no ads or paywalls. Support directly below.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:items-start lg:items-end gap-2 shrink-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--tk-surface)] border border-[var(--tk-yellow-border)]">
                  <Image
                    src="/thanks/supportkori-logo.png"
                    alt="SupportKori"
                    width={126}
                    height={36}
                    priority
                    className="h-5 w-auto object-contain"
                  />
                </span>
                <span className="text-sm font-bold text-[var(--tk-ink)]" aria-hidden="true">
                  ×
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--tk-surface)] border border-[var(--tk-yellow-border)]">
                  <Image
                    src="/thanks/buymeacoffee-logo.svg"
                    alt="Buy Me a Coffee"
                    width={18}
                    height={18}
                    priority
                    className="h-4 w-4 object-contain"
                  />
                  <span className="text-xs sm:text-sm font-bold text-[var(--tk-ink)]">
                    Buy Me a Coffee
                  </span>
                </span>
              </div>

              <p className="text-sm sm:text-base font-bold text-[var(--tk-ink)] lg:text-right">
                supportkori.com is like buymeacoffee.com but for Bangladesh!
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. LIVE SUPPORTKORI EMBED (IMMEDIATELY AFTER YELLOW CAPSULE)      */}
        {/* ================================================================= */}
        <section aria-label="SupportKori live support page">
          <div className="thanks-embed-shell">
            <div className="thanks-embed-bar">
              <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                <Image
                  src="/thanks/supportkori-logo.png"
                  alt="SupportKori"
                  width={98}
                  height={28}
                  className="h-5 w-auto object-contain shrink-0"
                />
                <span className="text-sm text-[var(--tk-muted)]" aria-hidden="true">
                  /
                </span>
                <a
                  href={SUPPORTKORI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="thanks-mono text-sm font-semibold text-[var(--tk-ink)] hover:underline truncate"
                >
                  supportkori.com/zaifears
                </a>
              </div>

              <a
                href={SUPPORTKORI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[var(--tk-ink)] inline-flex items-center gap-1.5 hover:underline"
              >
                <span>Open in new tab</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="relative w-full bg-[var(--tk-surface)]">
              {!iframeLoaded && (
                <div
                  role="status"
                  className="px-6 py-10 text-center text-sm font-medium text-[var(--tk-muted)] border-b border-[var(--tk-rule)]"
                >
                  Loading SupportKori checkout page (supportkori.com/zaifears)...
                </div>
              )}
              <iframe
                src={SUPPORTKORI_URL}
                title="Shahoriar Hossain on SupportKori"
                className="thanks-embed-iframe"
                loading="eager"
                allow="payment; clipboard-write"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>

            <div className="thanks-embed-footer">
              <span>
                If your bank or bKash payment screen asks for a full browser window, open SupportKori directly.
              </span>
              <a
                href={SUPPORTKORI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="thanks-btn-yellow"
              >
                <span>Continue on SupportKori</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* REDESIGNED DIRECT PAYMENT METHODS (BELOW SUPPORTKORI)             */}
        {/* ================================================================= */}
        <section id="direct-methods" aria-labelledby="direct-methods-heading" className="space-y-6 pt-8 sm:pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 id="direct-methods-heading" className="thanks-section-title">
                Prefer direct transfer without a platform?
              </h2>
              <p className="text-base text-[var(--tk-ink-2)] max-w-[62ch]">
                You can also send directly via BanglaQR, bKash, Nagad, Eastern Bank PLC, Wise, Remitly, or PayPal Xoom.
              </p>
            </div>

            {/* Region Switcher */}
            <div role="tablist" aria-label="Payment region" className="thanks-tabs self-start">
              <button
                type="button"
                role="tab"
                aria-selected={region === 'bangladesh'}
                onClick={() => setRegion('bangladesh')}
                className="thanks-tab"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Bangladesh</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={region === 'international'}
                onClick={() => setRegion('international')}
                className="thanks-tab"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>International</span>
              </button>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* BANGLADESH DIRECT METHODS                                       */}
          {/* --------------------------------------------------------------- */}
          {region === 'bangladesh' && (
            <div className="space-y-5">
              <div role="tablist" aria-label="Bangladesh payment method" className="thanks-tabs">
                <button
                  type="button"
                  role="tab"
                  aria-selected={bdTab === 'banglaqr'}
                  onClick={() => setBdTab('banglaqr')}
                  className="thanks-tab"
                >
                  <QrCode className="w-4 h-4" aria-hidden="true" />
                  <span>BanglaQR</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={bdTab === 'bkash'}
                  onClick={() => setBdTab('bkash')}
                  className="thanks-tab"
                >
                  <CreditCard className="w-4 h-4" aria-hidden="true" />
                  <span>bKash</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={bdTab === 'mfs'}
                  onClick={() => setBdTab('mfs')}
                  className="thanks-tab"
                >
                  <Smartphone className="w-4 h-4" aria-hidden="true" />
                  <span>Cellfin, Nagad, Upay &amp; Rocket</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={bdTab === 'bank'}
                  onClick={() => setBdTab('bank')}
                  className="thanks-tab"
                >
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                  <span>Eastern Bank PLC</span>
                </button>
              </div>

              {/* BD TAB 1: BanglaQR */}
              {bdTab === 'banglaqr' && (
                <div className="thanks-panel">
                  <div className="thanks-qr-grid">
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveZoomModal({
                            src: PAYMENT_DETAILS.banglaqr.imagePath,
                            title: 'BanglaQR: Scan to Support',
                            variant: 'qr',
                            caption: 'Scan with any Bangladeshi bank or MFS app (20+ apps supported).',
                            downloadName: 'Shahoriar_BanglaQR.png',
                          })
                        }
                        className="block w-full rounded-[22px] overflow-hidden border-2 border-[var(--tk-banglaqr)] bg-[var(--tk-surface)] p-2 cursor-pointer"
                        aria-label="Enlarge BanglaQR code"
                      >
                        <Image
                          src={PAYMENT_DETAILS.banglaqr.imagePath}
                          alt="BanglaQR Code for Md Al Shahoriar Hossain"
                          width={800}
                          height={1060}
                          className="w-full h-auto rounded-[16px] object-contain"
                        />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveZoomModal({
                              src: PAYMENT_DETAILS.banglaqr.imagePath,
                              title: 'BanglaQR: Scan to Support',
                              variant: 'qr',
                              caption: 'Scan with any Bangladeshi bank or MFS app (20+ apps supported).',
                              downloadName: 'Shahoriar_BanglaQR.png',
                            })
                          }
                          className="thanks-copy-btn flex-1"
                        >
                          <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Enlarge QR</span>
                        </button>
                        <a
                          href={PAYMENT_DETAILS.banglaqr.imagePath}
                          download="Shahoriar_BanglaQR.png"
                          className="thanks-copy-btn flex-1"
                        >
                          <Download className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>

                    <div className="space-y-5 min-w-0">
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-bold text-[var(--tk-ink)]">
                          BanglaQR (works with 20+ bank &amp; MFS apps)
                        </h3>
                        <p className="text-sm sm:text-base text-[var(--tk-ink-2)] max-w-[62ch]">
                          Scan using bKash, Nagad, Cellfin, Citytouch, Astha, SC Mobile, Upay, or any BanglaQR-enabled app and enter any amount you wish.
                        </p>
                      </div>

                      <ol className="space-y-2 text-sm text-[var(--tk-ink-2)] list-decimal pl-5">
                        <li>Open any Bangladeshi bank or MFS app with QR scanning.</li>
                        <li>Scan the BanglaQR code beside this guide.</li>
                        <li>Enter any voluntary amount and confirm with your PIN.</li>
                        <li>No form submission needed. Feel free to email hello@shahoriar.bd so I can thank you.</li>
                      </ol>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveZoomModal({
                            src: PAYMENT_DETAILS.banglaqr.appsBannerPath,
                            title: 'Supported Banking & MFS Apps for BanglaQR',
                            variant: 'banner',
                            caption: 'All of these 20+ bank and MFS apps support BanglaQR scanning.',
                          })
                        }
                        className="block w-full rounded-[20px] overflow-hidden border border-[var(--tk-rule)] bg-[var(--tk-banner-red)] cursor-pointer text-left"
                        aria-label="Enlarge supported BanglaQR apps banner"
                      >
                        <Image
                          src={PAYMENT_DETAILS.banglaqr.appsBannerPath}
                          alt="Supported Banking and MFS Apps for BanglaQR"
                          width={1000}
                          height={420}
                          className="w-full h-auto object-contain"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* BD TAB 2: bKash (Merchant Make Payment + Personal Send Money) */}
              {bdTab === 'bkash' && (
                <div className="thanks-panel space-y-8">
                  <div className="thanks-qr-grid">
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveZoomModal({
                            src: PAYMENT_DETAILS.bkashPayment.imagePath,
                            title: 'bKash Make Payment (Merchant QR)',
                            variant: 'qr',
                            caption: 'Scan from the bKash app using Make Payment.',
                            downloadName: 'Shahoriar_bKash_Payment.png',
                          })
                        }
                        className="block w-full rounded-[22px] overflow-hidden border-2 border-[var(--tk-bkash)] bg-[var(--tk-surface)] p-2 cursor-pointer"
                        aria-label="Enlarge bKash Merchant QR code"
                      >
                        <Image
                          src={PAYMENT_DETAILS.bkashPayment.imagePath}
                          alt="bKash Merchant Payment QR Code"
                          width={800}
                          height={1060}
                          className="w-full h-auto rounded-[16px] object-contain"
                        />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveZoomModal({
                              src: PAYMENT_DETAILS.bkashPayment.imagePath,
                              title: 'bKash Make Payment (Merchant QR)',
                              variant: 'qr',
                              caption: 'Scan from the bKash app using Make Payment.',
                              downloadName: 'Shahoriar_bKash_Payment.png',
                            })
                          }
                          className="thanks-copy-btn flex-1"
                        >
                          <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Enlarge QR</span>
                        </button>
                        <a
                          href={PAYMENT_DETAILS.bkashPayment.imagePath}
                          download="Shahoriar_bKash_Payment.png"
                          className="thanks-copy-btn flex-1"
                        >
                          <Download className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>

                    <div className="space-y-5 min-w-0">
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-bold text-[var(--tk-ink)]">
                          bKash Make Payment or Send Money
                        </h3>
                        <p className="text-sm sm:text-base text-[var(--tk-ink-2)] max-w-[62ch]">
                          Choose Merchant Make Payment (with QR) or Personal Send Money below.
                        </p>
                      </div>

                      <div className="thanks-credentials-grid">
                        <div className="thanks-well flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <span className="block text-xs text-[var(--tk-muted)]">
                              Merchant (Make Payment)
                            </span>
                            <span className="thanks-mono block text-lg font-bold text-[var(--tk-ink)] select-all">
                              {PAYMENT_DETAILS.bkashPayment.number}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(PAYMENT_DETAILS.bkashPayment.number, 'bkash_merchant')}
                            data-copied={copiedKey === 'bkash_merchant'}
                            className="thanks-copy-btn shrink-0"
                          >
                            {copiedKey === 'bkash_merchant' ? (
                              <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            )}
                            <span>{copiedKey === 'bkash_merchant' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        <div className="thanks-well flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <span className="block text-xs text-[var(--tk-muted)]">
                              Personal (Send Money)
                            </span>
                            <span className="thanks-mono block text-lg font-bold text-[var(--tk-ink)] select-all">
                              {PAYMENT_DETAILS.bkashSendMoney.number}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(PAYMENT_DETAILS.bkashSendMoney.number, 'bkash_personal')}
                            data-copied={copiedKey === 'bkash_personal'}
                            className="thanks-copy-btn shrink-0"
                          >
                            {copiedKey === 'bkash_personal' ? (
                              <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            )}
                            <span>{copiedKey === 'bkash_personal' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-[var(--tk-muted)]">
                        Open the bKash app or dial <code className="thanks-mono font-semibold text-[var(--tk-ink)]">*247#</code>, choose Make Payment for {PAYMENT_DETAILS.bkashPayment.number} or Send Money for {PAYMENT_DETAILS.bkashSendMoney.number}, and confirm with your PIN.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* BD TAB 3: Other MFS */}
              {bdTab === 'mfs' && (
                <div className="thanks-panel space-y-5">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-[var(--tk-ink)]">
                      Cellfin, Nagad, Upay &amp; Rocket (Send Money)
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--tk-ink-2)] max-w-[62ch]">
                      Send Money or Fund Transfer to the personal number below. If using Rocket, append <span className="thanks-mono font-bold">0</span> at the end if prompted.
                    </p>
                  </div>

                  <div className="thanks-well flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="block text-xs text-[var(--tk-muted)]">
                        Cellfin, Nagad, Upay &amp; Rocket number
                      </span>
                      <span className="thanks-mono block text-2xl font-bold text-[var(--tk-ink)] tracking-wide select-all mt-0.5">
                        {PAYMENT_DETAILS.otherMfs.number}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(PAYMENT_DETAILS.otherMfs.number, 'other_mfs')}
                      data-copied={copiedKey === 'other_mfs'}
                      className="thanks-btn-yellow"
                    >
                      {copiedKey === 'other_mfs' ? (
                        <Check className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Copy className="w-4 h-4" aria-hidden="true" />
                      )}
                      <span>{copiedKey === 'other_mfs' ? 'Number copied' : 'Copy number'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* BD TAB 4: Eastern Bank PLC */}
              {bdTab === 'bank' && (
                <div className="thanks-panel space-y-5">
                  <BankDetailsSection
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                    onCopyAll={copyAllBank}
                  />
                </div>
              )}
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* INTERNATIONAL DIRECT METHODS                                    */}
          {/* --------------------------------------------------------------- */}
          {region === 'international' && (
            <div className="space-y-5">
              <div role="tablist" aria-label="International payment method" className="thanks-tabs">
                <button
                  type="button"
                  role="tab"
                  aria-selected={intlTab === 'remit'}
                  onClick={() => setIntlTab('remit')}
                  className="thanks-tab"
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span>Wise, Remitly &amp; TapTap</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={intlTab === 'xoom'}
                  onClick={() => setIntlTab('xoom')}
                  className="thanks-tab"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>PayPal via Xoom</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={intlTab === 'bank'}
                  onClick={() => setIntlTab('bank')}
                  className="thanks-tab"
                >
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                  <span>SWIFT Bank Wire</span>
                </button>
              </div>

              {intlTab === 'remit' && (
                <div className="thanks-panel space-y-6">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-[var(--tk-ink)]">
                      Wise, Remitly, or TapTap Send to Bangladesh
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--tk-ink-2)] max-w-[64ch]">
                      Send from a US, UK, EU, Canadian, Australian, or Middle Eastern card or bank directly to my bKash wallet or Eastern Bank PLC account.
                    </p>
                  </div>

                  <div className="thanks-credentials-grid">
                    <div className="thanks-well flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="block text-xs text-[var(--tk-muted)]">
                          Recipient bKash wallet
                        </span>
                        <span className="thanks-mono block text-lg font-bold text-[var(--tk-ink)] select-all">
                          {PAYMENT_DETAILS.bkashSendMoney.number}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(PAYMENT_DETAILS.bkashSendMoney.number, 'intl_bkash')}
                        data-copied={copiedKey === 'intl_bkash'}
                        className="thanks-copy-btn shrink-0"
                      >
                        {copiedKey === 'intl_bkash' ? (
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                        <span>{copiedKey === 'intl_bkash' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="thanks-well flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="block text-xs text-[var(--tk-muted)]">
                          Recipient legal name
                        </span>
                        <span className="block text-sm sm:text-base font-bold text-[var(--tk-ink)] truncate select-all">
                          {PAYMENT_DETAILS.bank.title}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(PAYMENT_DETAILS.bank.title, 'intl_name')}
                        data-copied={copiedKey === 'intl_name'}
                        className="thanks-copy-btn shrink-0"
                      >
                        {copiedKey === 'intl_name' ? (
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                        <span>{copiedKey === 'intl_name' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href="https://wise.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="thanks-btn-quiet"
                    >
                      <span>Wise.com</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                    <a
                      href="https://www.remitly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="thanks-btn-quiet"
                    >
                      <span>Remitly.com</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                    <a
                      href="https://www.taptapsend.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="thanks-btn-quiet"
                    >
                      <span>TapTapSend.com</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>

                  <div className="pt-4 border-t border-[var(--tk-rule)]">
                    <BankDetailsSection
                      copiedKey={copiedKey}
                      onCopy={handleCopy}
                      onCopyAll={copyAllBank}
                      compactHeading="Bank deposit details (if bKash is unavailable in your app)"
                    />
                  </div>
                </div>
              )}

              {intlTab === 'xoom' && (
                <div className="thanks-panel space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-bold text-[var(--tk-ink)]">
                        PayPal via Xoom Bangladesh
                      </h3>
                      <p className="text-sm sm:text-base text-[var(--tk-ink-2)] max-w-[60ch]">
                        Log in with your PayPal account on Xoom and choose bKash wallet ({PAYMENT_DETAILS.bkashSendMoney.number}) or Eastern Bank PLC deposit.
                      </p>
                    </div>
                    <a
                      href="https://www.xoom.com/bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="thanks-btn-yellow shrink-0"
                    >
                      <span>Open Xoom</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>

                  <BankDetailsSection
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                    onCopyAll={copyAllBank}
                  />
                </div>
              )}

              {intlTab === 'bank' && (
                <div className="thanks-panel space-y-5">
                  <p className="text-sm sm:text-base text-[var(--tk-ink-2)] max-w-[64ch]">
                    For international bank wires (including Revolut, Wise, HSBC, Chase, Barclays, or N26), wire in USD, EUR, or GBP using the SWIFT credentials below. Eastern Bank PLC converts incoming wires to BDT automatically.
                  </p>
                  <BankDetailsSection
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                    onCopyAll={copyAllBank}
                  />
                </div>
              )}
            </div>
          )}
        </section>

        {/* ================================================================= */}
        {/* WHERE YOUR SUPPORT GOES                                           */}
        {/* ================================================================= */}
        <section aria-labelledby="expenses-heading" className="space-y-5 pt-4 border-t border-[var(--tk-rule)]">
          <div className="space-y-1.5">
            <h2 id="expenses-heading" className="thanks-section-title">
              Where your support goes
            </h2>
            <p className="text-base text-[var(--tk-ink-2)] max-w-[62ch]">
              Every voluntary contribution goes directly toward recurring infrastructure costs for my free projects.
            </p>
          </div>

          <div className="thanks-expenses-grid">
            {EXPENSES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="thanks-well flex items-start gap-3.5">
                  <Icon className="w-5 h-5 text-[var(--tk-ink)] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-base font-bold text-[var(--tk-ink)]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--tk-ink-2)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* FOOTER: PERSONAL THANK-YOU EMAIL                                  */}
        {/* ================================================================= */}
        <footer className="pt-6 pb-8 border-t border-[var(--tk-rule)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-base font-bold text-[var(--tk-ink)]">
              Sent support or want to say hi?
            </p>
            <p className="text-sm text-[var(--tk-muted)]">
              Drop me a quick email so I can personally thank you.
            </p>
          </div>

          <a
            href="mailto:hello@shahoriar.bd?subject=Support%20Confirmation%20-%20Shahoriar"
            className="thanks-btn-quiet"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>hello@shahoriar.bd</span>
          </a>
        </footer>
      </main>

      {/* =================================================================== */}
      {/* ACCESSIBLE QR / BANNER LIGHTBOX MODAL                               */}
      {/* =================================================================== */}
      {activeZoomModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="zoom-modal-title"
          className="thanks-modal-backdrop"
          onClick={() => setActiveZoomModal(null)}
        >
          <div
            className={`thanks-modal-dialog ${
              activeZoomModal.variant === 'banner' ? 'max-w-2xl' : 'max-w-sm'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 id="zoom-modal-title" className="text-base font-bold text-[var(--tk-ink)]">
                {activeZoomModal.title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveZoomModal(null)}
                aria-label="Close preview"
                className="thanks-copy-btn"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="rounded-[20px] overflow-hidden border border-[var(--tk-rule)] bg-[var(--tk-surface)]">
              <Image
                src={activeZoomModal.src}
                alt={activeZoomModal.title}
                width={activeZoomModal.variant === 'banner' ? 1000 : 800}
                height={activeZoomModal.variant === 'banner' ? 420 : 1060}
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
              <p className="text-xs sm:text-sm text-[var(--tk-muted)]">
                {activeZoomModal.caption}
              </p>
              {activeZoomModal.downloadName && (
                <a
                  href={activeZoomModal.src}
                  download={activeZoomModal.downloadName}
                  className="thanks-copy-btn"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
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

interface BankDetailsSectionProps {
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
  onCopyAll: () => void;
  compactHeading?: string;
}

function BankDetailsSection({
  copiedKey,
  onCopy,
  onCopyAll,
  compactHeading,
}: BankDetailsSectionProps) {
  const b = PAYMENT_DETAILS.bank;

  const rows = [
    { label: 'Account name', value: b.title, key: 'bank_title', mono: false },
    { label: 'Account number', value: b.accountNumber, key: 'bank_acc', mono: true },
    { label: 'Bank name', value: b.bankName, key: 'bank_name', mono: false },
    { label: 'Branch', value: b.branch, key: 'bank_branch', mono: false },
    { label: 'Routing number', value: b.routingNumber, key: 'bank_routing', mono: true },
    { label: 'SWIFT code', value: b.swiftCode, key: 'bank_swift', mono: true },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--tk-ink)]">
          {compactHeading || `${b.bankName} (NPSB / BEFTN / SWIFT)`}
        </h3>
        <button
          type="button"
          onClick={onCopyAll}
          data-copied={copiedKey === 'all_bank'}
          className="thanks-copy-btn"
        >
          {copiedKey === 'all_bank' ? (
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          <span>{copiedKey === 'all_bank' ? 'All copied' : 'Copy all details'}</span>
        </button>
      </div>

      <div className="thanks-credentials-grid">
        {rows.map((row) => (
          <div key={row.key} className="thanks-well flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="block text-xs text-[var(--tk-muted)]">
                {row.label}
              </span>
              <span
                className={`block text-sm sm:text-base font-bold text-[var(--tk-ink)] break-words select-all mt-0.5 ${
                  row.mono ? 'thanks-mono' : ''
                }`}
              >
                {row.value}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onCopy(row.value, row.key)}
              data-copied={copiedKey === row.key}
              className="thanks-copy-btn shrink-0"
              aria-label={`Copy ${row.label}`}
            >
              {copiedKey === row.key ? (
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>{copiedKey === row.key ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        ))}
      </div>

      <p className="text-sm text-[var(--tk-muted)]">
        {b.note}
      </p>
    </div>
  );
}
