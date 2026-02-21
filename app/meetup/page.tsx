'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// ─── Floating particle component ────────────────────────────────────────────
function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? '#d4af37' : '#ffffff',
            animation: `float ${6 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Copy helper ────────────────────────────────────────────────────────────
function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
}

// ─── Section wrapper ────────────────────────────────────────────────────────
function Section({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Countdown Timer component ─────────────────────────────────────────────
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const endTime = new Date('2026-02-24T23:59:59').getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="flex gap-3 sm:gap-4 justify-center mb-8 flex-wrap items-baseline">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Mins' },
        { value: timeLeft.seconds, label: 'Secs' },
      ].map(({ value, label }, idx) => (
        <div key={label} className="flex items-baseline gap-2">
          <div className="text-3xl sm:text-4xl font-bold shimmer-text font-mono">
            {String(value).padStart(2, '0')}
          </div>
          <span className="text-xs sm:text-sm text-white/50 uppercase tracking-widest">{label}</span>
          {idx < 3 && <span className="text-2xl sm:text-3xl text-white/30 mx-1">:</span>}
        </div>
      ))}
    </div>
  );
}

// ─── Main page ──────────────────────────────────────────────────────────────
export default function MeetupPage() {
  const { copied: copiedNumber, copy: copyNumber } = useCopy();
  const { copied: copiedAccount, copy: copyAccount } = useCopy();
  const [showBank, setShowBank] = useState(false);
  const [showBkash, setShowBkash] = useState(false);

  return (
    <>
      {/* Global keyframe styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes crescentGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.8)); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #d4af37, #f5e6a3, #d4af37, #b8860b, #d4af37);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .glass {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-stronger {
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
      `}</style>

      <div className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden relative">
        <Particles />

        {/* Gradient orbs background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-100 h-100 rounded-full bg-emerald-900/20 blur-[80px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-87.5 h-87.5 rounded-full bg-amber-900/15 blur-[80px]" />
        </div>

        {/* ──── HERO ──── */}
        <section className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-4 text-center">
          {/* Crescent + Star */}
          <div className="mb-6" style={{ animation: 'crescentGlow 3s ease-in-out infinite' }}>
            <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto">
              <path
                d="M60 10 A40 40 0 1 0 60 90 A30 30 0 1 1 60 10Z"
                fill="#d4af37"
              />
              <polygon points="82,22 84,28 90,28 85,32 87,38 82,34 77,38 79,32 74,28 80,28" fill="#d4af37" />
            </svg>
          </div>

          {/* Logo */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-2xl scale-150" />
            <Image
              src="/meetup/ndc.png"
              alt="NDC Logo"
              width={120}
              height={120}
              className="relative rounded-full border-2 border-amber-500/30 shadow-2xl shadow-amber-500/20"
              priority
            />
          </div>

          <p className="text-emerald-400 font-medium tracking-[0.3em] uppercase text-xs mb-3">
            NDC 2021A Presents
          </p>

          <h1 className="text-5xl sm:text-7xl font-bold mb-4 shimmer-text leading-tight">
            Iftar Meetup<br />2026
          </h1>

          <CountdownTimer />

          <p className="text-lg sm:text-xl text-white/60 max-w-md mb-8 leading-relaxed">
            Happy Ramadan to everyone! Like every year,<br className="hidden sm:block" />
            we're getting together. Join us!
          </p>

          {/* Date badge */}
          <div className="glass rounded-full px-6 py-3 flex items-center gap-3 mb-10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/90 font-medium tracking-wide text-sm sm:text-base">
              Wednesday, 25th February 2026
            </span>
          </div>


        </section>

        {/* ──── EVENT DETAILS ──── */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-10 sm:py-14">
          <Section>
            <h2 className="text-center text-sm tracking-[0.3em] uppercase text-amber-400/80 mb-12">
              Event Details
            </h2>
          </Section>

          <div className="grid sm:grid-cols-3 gap-5">
            <Section delay={100}>
              <a
                href="https://maps.app.goo.gl/c5K9zsguENAvJkBR8"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-6 hover:border-emerald-500/20 transition-colors group block h-full"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-lg group-hover:bg-emerald-500/20 transition-colors">
                    📍
                  </div>
                  <h3 className="text-white/40 text-xs uppercase tracking-widest">Location</h3>
                </div>
                <p className="text-xl font-semibold text-white/90">Dhaka University</p>
                <p className="text-white/50 text-sm mt-1">TSC Swimming Pool</p>
                <p className="text-emerald-400/60 text-xs mt-3 flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Open in Google Maps
                </p>
              </a>
            </Section>

            <Section delay={200}>
              <div className="glass rounded-2xl p-6 hover:border-amber-500/20 transition-colors group h-full">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-lg group-hover:bg-amber-500/20 transition-colors">
                    🗓️
                  </div>
                  <h3 className="text-white/40 text-xs uppercase tracking-widest">Date & Time</h3>
                </div>
                <p className="text-xl font-semibold text-white/90">25th Feb, 2026</p>
                <p className="text-white/50 text-sm mt-1">Wednesday — Iftar Time</p>
              </div>
            </Section>

            <Section delay={300}>
              <div className="glass rounded-2xl p-6 hover:border-teal-500/20 transition-colors group h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 text-lg group-hover:bg-teal-500/20 transition-colors">
                      💰
                    </div>
                    <h3 className="text-white/40 text-xs uppercase tracking-widest">Hadia (Contribution)</h3>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold shimmer-text">200</span>
                    <span className="text-white/50 text-lg">BDT only</span>
                  </div>
                </div>
                <p className="text-white/30 text-xs mt-4">Per person — scroll down for payment options</p>
              </div>
            </Section>
          </div>
        </section>

        {/* ──── FOOD MENU ──── */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-10 sm:py-14">
          <Section>
            <h2 className="text-center text-sm tracking-[0.3em] uppercase text-amber-400/80 mb-12">
              On The Menu
            </h2>
          </Section>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '🍗', name: 'Morog Polao', desc: 'Aromatic rice with chicken' },
              { icon: '💧', name: 'Water 500ml', desc: 'Stay hydrated' },
              { icon: '🌴', name: 'Khejur', desc: 'Sweet dates' },
              { icon: '🥙', name: 'Kabab / Roll', desc: 'Grilled perfection' },
            ].map((item, i) => (
              <Section key={item.name} delay={i * 100}>
                <div className="glass rounded-2xl p-5 text-center hover:scale-[1.03] transition-transform cursor-default group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="font-semibold text-white/90 text-sm">{item.name}</h3>
                  <p className="text-white/40 text-xs mt-1">{item.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </section>

        {/* ──── PAYMENT ──── */}
        <section className="relative z-10 max-w-5xl mx-auto px-4 py-10 sm:py-14">
          <Section>
            <h2 className="text-center text-sm tracking-[0.3em] uppercase text-amber-400/80 mb-4">
              Payment
            </h2>
            <p className="text-center text-white/40 text-sm mb-12 max-w-md mx-auto">
              Choose your preferred payment method below. Tap a card to see details.
            </p>
          </Section>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* bKash Card */}
            <Section delay={100}>
              <div
                onClick={() => setShowBkash(!showBkash)}
                className="glass rounded-2xl p-5 sm:p-6 cursor-pointer hover:bg-white/6 hover:border-pink-500/40 transition-all group scale-100 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                      <span className="text-pink-400 font-bold text-sm">b</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white/90">bKash</h3>
                      <p className="text-white/40 text-[10px] sm:text-xs">Send Money</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <svg
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-pink-400/70 group-hover:text-pink-400 transition-all ${showBkash ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                    {!showBkash && <span className="text-[10px] text-pink-400/50 font-medium">Tap</span>}
                  </div>
                </div>

                {showBkash && (
                  <div className="space-y-4 animate-[fadeIn_0.3s_ease]" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-white rounded-xl p-3 flex justify-center">
                      <Image
                        src="/meetup/bkash.jpg"
                        alt="bKash QR Code"
                        width={220}
                        height={220}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="glass-stronger rounded-xl p-4 space-y-2">
                      <p className="text-white/60 text-xs leading-relaxed">
                        Send <span className="text-white font-medium">200 + Cashout charge</span> to this number using <span className="text-pink-400 font-medium">Send Money</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="text-lg font-mono text-white/90 tracking-wider">01865333143</code>
                        <button
                          onClick={() => copyNumber('01865333143')}
                          className="ml-auto px-3 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 text-xs font-medium transition-colors flex items-center gap-1.5"
                        >
                          {copiedNumber ? (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Section>

            {/* Bank Transfer Card */}
            <Section delay={200}>
              <div
                onClick={() => setShowBank(!showBank)}
                className="glass rounded-2xl p-5 sm:p-6 cursor-pointer hover:bg-white/6 hover:border-blue-500/40 transition-all group scale-100 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                      <span className="text-blue-400 font-bold text-sm">🏦</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white/90">Bank Transfer</h3>
                      <p className="text-white/40 text-[10px] sm:text-xs">BRAC Bank PLC</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <svg
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-400/70 group-hover:text-blue-400 transition-all ${showBank ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                    {!showBank && <span className="text-[10px] text-blue-400/50 font-medium">Tap</span>}
                  </div>
                </div>

                {showBank && (
                  <div className="space-y-3 animate-[fadeIn_0.3s_ease]" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-white/5 rounded-xl overflow-hidden">
                      <Image
                        src="/meetup/bank.png"
                        alt="Bank Transfer"
                        width={400}
                        height={100}
                        className="w-full h-auto opacity-80"
                      />
                    </div>
                    <div className="glass-stronger rounded-xl p-4 space-y-3">
                      {[
                        { label: 'Account Number', value: '1057503750001' },
                        { label: 'Account Name', value: 'MD AL SHAHORIAR HOSSAIN' },
                        { label: 'Bank Name', value: 'BRAC Bank PLC' },
                        { label: 'Branch', value: 'NANDIPARA SUB BRANCH' },
                        { label: 'Routing Number', value: '060262875' },
                        { label: 'SWIFT Code', value: 'BRAKBDDH' },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between items-start gap-4">
                          <span className="text-white/40 text-xs shrink-0">{row.label}</span>
                          <span className="text-white/90 text-xs font-mono text-right">{row.value}</span>
                        </div>
                      ))}
                      <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/15">
                        <p className="text-amber-400/90 text-[11px] leading-relaxed flex items-start gap-1.5">
                          <span className="shrink-0 mt-px">⚡</span>
                          <span>Use <strong>NPSB</strong> option when using the fund transfer method in Bank</span>
                        </p>
                      </div>
                      <button
                        onClick={() => copyAccount('1057503750001')}
                        className="w-full mt-2 px-3 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                      >
                        {copiedAccount ? (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Account Number Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy Account Number
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Section>
          </div>
        </section>

        {/* ──── RSVP — GOOGLE FORM EMBED ──── */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 pt-10 sm:pt-14 pb-8">
          <Section>
            <h2 className="text-center text-sm tracking-[0.3em] uppercase text-amber-400/80 mb-4">
              RSVP
            </h2>
            <p className="text-center text-white/40 text-sm mb-8 max-w-md mx-auto">
              Confirm your attendance by filling out the form below.
            </p>
          </Section>

          <Section delay={100}>
            <div className="glass rounded-2xl overflow-hidden">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdfagRh7llOem9_resdYTKdUHXc5AjPnrIi9WwUqYTgpoCsDg/viewform?embedded=true"
                width="100%"
                height="900"
                className="w-full border-0 bg-white rounded-xl"
                title="RSVP Form"
                loading="lazy"
                style={{ minHeight: '700px' }}
                allow="autoplay"
              >
                Loading…
              </iframe>
            </div>
          </Section>
        </section>

        {/* ──── FAQ ──── */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-10 sm:py-14">
          <Section>
            <h2 className="text-center text-sm tracking-[0.3em] uppercase text-amber-400/80 mb-12">
              Frequently Asked Questions
            </h2>
          </Section>

          <div className="space-y-4">
            {[
              {
                question: 'Why the program is at DU?',
                answer: 'Because we were able to arrange this space at such a short time',
              },
              {
                question: 'Why the program is not at NDC campus?',
                answer: 'Have to take permission from Father, long process, didn\'t had the time',
              },
              {
                question: 'Why at 25th February?',
                answer: 'Because people leave Dhaka at the end of Ramadan usually and its harder for us to meet at a common time',
              },
            ].map((faq, idx) => (
              <Section key={idx} delay={100 + idx * 100}>
                <div className="glass rounded-2xl p-6 hover:border-amber-500/20 transition-colors group">
                  <h3 className="text-lg font-semibold text-white/90 mb-3 flex items-start gap-3">
                    <span className="text-amber-400 text-xl shrink-0 mt-0.5">Q{idx + 1}</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-white/60 leading-relaxed ml-8 text-sm">
                    {faq.answer}
                  </p>
                </div>
              </Section>
            ))}
          </div>
        </section>

        {/* ──── FOOTER ──── */}
        <footer className="relative z-10 text-center py-12 px-4">
          <div className="w-12 h-px bg-linear-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-6" />
          <p className="text-white/20 text-xs tracking-widest uppercase">
            NDC 2021A — Batch of Brothers
          </p>
          <p className="text-white/10 text-[10px] mt-2">
            Ramadan Mubarak 1447 AH
          </p>
        </footer>
      </div>
    </>
  );
}
