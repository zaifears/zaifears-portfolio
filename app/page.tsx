"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faCopy, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState } from 'react';

export default function Page() {
  // Memoize the blob clip path to avoid recalculation
  const blobPath = useMemo(() =>
    "M0.764,0.887 C0.711,0.992,0.57,1,0.5,1 C0.43,1,0.289,0.992,0.236,0.887 C0.158,0.729,0.01,0.627,0.001,0.5 C0.01,0.373,0.158,0.271,0.236,0.113 C0.289,0.008,0.43,0,0.5,0 C0.57,0,0.711,0.008,0.764,0.113 C0.842,0.271,0.99,0.373,0.999,0.5 C0.99,0.627,0.842,0.729,0.764,0.887"
  , []);

  // --- Notification State ---
  const [showEmailNotification, setShowEmailNotification] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    // Uses document.execCommand for better iframe compatibility
    const textArea = document.createElement('textarea');
    textArea.value = 'contact@shahoriar.me';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };
  
  const handleDismissNotification = () => {
    setShowEmailNotification(false);
  };
  // ---------------------------

  return (
    <>
      <style jsx global>{`
        @keyframes spin-gradient {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .outline-container::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: conic-gradient(from 180deg at 50% 50%, #3b82f6, #000, #000, #3b82f6);
          clip-path: url(#blob-shape);
          animation: spin-gradient 6s linear infinite;
          z-index: -1;
          will-change: transform;
        }
        .outline-container {
          contain: layout style paint;
        }

        /* Step-by-step scrolling animation with pauses - Fixed alignment */
        @keyframes scroll-words-step {
          0% { transform: translateY(0); }
          14% { transform: translateY(0); }
          16% { transform: translateY(-14.28%); }
          30% { transform: translateY(-14.28%); }
          32% { transform: translateY(-28.57%); }
          46% { transform: translateY(-28.57%); }
          48% { transform: translateY(-42.85%); }
          62% { transform: translateY(-42.85%); }
          64% { transform: translateY(-57.14%); }
          78% { transform: translateY(-57.14%); }
          80% { transform: translateY(-71.42%); }
          94% { transform: translateY(-71.42%); }
          96% { transform: translateY(-85.71%); }
          100% { transform: translateY(-85.71%); }
        }
        
        .animate-scroll-words-step {
          animation: scroll-words-step 12s ease-in-out infinite;
        }

        /* Peeking effect - shows portions of adjacent items */
        .scrolling-text-mask {
          -webkit-mask-image: linear-gradient(to bottom, transparent 10%, black 20%, black 80%, transparent 90%);
          mask-image: linear-gradient(to bottom, transparent 10%, black 20%, black 80%, transparent 90%);
        }
      `}</style>

      <div className="min-h-screen bg-black text-white">
        
        {/* --- Mobile-Optimized Pinned Email Notification --- */}
        {showEmailNotification && (
          <div className="bg-blue-600/20 border-b border-blue-500 text-gray-200 py-2 px-3 sm:py-3 sm:px-4 sticky top-0 z-50 animate-fade-in-down">
            <div className="flex items-center justify-between gap-2 max-w-6xl mx-auto">
              {/* Main content - stacked on mobile, inline on larger screens */}
              <div className="flex-grow flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-4">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <FontAwesomeIcon icon={faMapPin} className="text-blue-400 text-sm" />
                  <span className="font-semibold text-xs sm:text-sm">New Professional Email:</span>
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <a href="mailto:contact@shahoriar.me" className="text-xs sm:text-sm font-mono underline hover:text-white transition-colors">
                    contact@shahoriar.me
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold py-1 px-2 rounded-md transition-all duration-200 flex items-center gap-1 disabled:bg-green-600 disabled:cursor-default"
                    disabled={copied}
                  >
                    <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              {/* Dismiss button */}
              <div className="flex-shrink-0">
                <button
                  onClick={handleDismissNotification}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                  aria-label="Dismiss notification"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-6 sm:mb-8">
              <svg width="0" height="0" aria-hidden="true">
                <defs>
                  <clipPath id="blob-shape" clipPathUnits="objectBoundingBox">
                    <path d={blobPath} />
                  </clipPath>
                </defs>
              </svg>
              <div className="outline-container relative w-full h-full">
                <div
                  className="absolute inset-0"
                  style={{ clipPath: 'url(#blob-shape)' }}
                >
                  <Image
                    src="/my-profile.jpg"
                    alt="MD AL SHAHORIAR HOSSAIN - Finance Professional"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    style={{ clipPath: 'url(#blob-shape)' }}
                    priority
                  />
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold font-mono tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              MD AL SHAHORIAR HOSSAIN
            </h1>
            
            {/* --- FIXED Dynamic Text Animation with Better Peeking --- */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-lg sm:text-2xl md:text-4xl font-semibold mb-6 sm:mb-8">
                <span className="text-gray-400 whitespace-nowrap">I do</span>
                <div className="relative h-12 sm:h-16 md:h-20 w-full sm:w-80 md:w-96 overflow-hidden scrolling-text-mask">
                    <div className="animate-scroll-words-step">
                        {/* Each item with increased height for better peeking */}
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 px-2">Financial Analysis</div>
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 px-2">Web Development</div>
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 px-2">Graphic Design</div>
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 px-2">Data Visualization</div>
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 px-2">Investment Strategy</div>
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 px-2">Problem Solving</div>
                        
                        {/* Duplicate first item for seamless loop */}
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 px-2">Financial Analysis</div>
                    </div>
                </div>
            </div>

          </div>

          {/* --- About Section --- */}
          <div className="mb-12 sm:mb-16">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-8 max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-blue-400">About Me</h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-center">
                I am a Finance major with a strong focus in financial analysis, Islamic finance, and data-driven decision-making. I have excelled in national business case and idea competitions, showcasing analytical and problem-solving skills under pressure. My goal is to apply my technical and analytical abilities to solve real-world financial challenges and contribute to growth in finance and technology-driven fields.
              </p>
            </div>
          </div>

          {/* Featured Actions Section */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Get Started</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              
              {/* Tech Tips Button */}
              <Link
                href="/techtips"
                className="group relative block h-32 sm:h-40 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/20 bg-white"
                aria-label="Visit Tech Tips section"
              >
                <Image
                  src="/techtips.png"
                  alt="Tech Tips"
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </Link>

              {/* Design Portfolio Button */}
              <Link
                href="/design-portfolio"
                className="group relative block h-32 sm:h-40 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/20"
                aria-label="Visit Design Portfolio"
              >
                <Image
                  src="/designbox.png"
                  alt="Design Portfolio"
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
              
              {/* Live Text Button */}
              <Link
                href="/live-text"
                className="group relative block h-32 sm:h-40 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-600/20 sm:col-span-2 md:col-span-1"
                aria-label="Access Live Text feature"
              >
                <Image
                  src="/livetexttelegram.png"
                  alt="Live Text from Telegram"
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </Link>

            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 sm:mt-16">
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Coded in Visual Studio Code by yours truly. Built with Next.js and Tailwind CSS, deployed with Vercel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}