"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSatelliteDish, faMapPin, faCopy, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState, useEffect } from 'react';

export default function Page() {
  // Memoize the blob clip path to avoid recalculation
  const blobPath = useMemo(() =>
    "M0.764,0.887 C0.711,0.992,0.57,1,0.5,1 C0.43,1,0.289,0.992,0.236,0.887 C0.158,0.729,0.01,0.627,0.001,0.5 C0.01,0.373,0.158,0.271,0.236,0.113 C0.289,0.008,0.43,0,0.5,0 C0.57,0,0.711,0.008,0.764,0.113 C0.842,0.271,0.99,0.373,0.999,0.5 C0.99,0.627,0.842,0.729,0.764,0.887"
  , []);

  // --- Notification State ---
  const [showEmailNotification, setShowEmailNotification] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if the user has dismissed the notification before
    const dismissed = localStorage.getItem('dismissedEmailNotification');
    if (dismissed) {
      setShowEmailNotification(false);
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@shahoriar.me');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset after 2 seconds
  };

  const handleDismissNotification = () => {
    setShowEmailNotification(false);
    localStorage.setItem('dismissedEmailNotification', 'true'); // Remember dismissal
  };
  // ---------------------------

  return (
    <>
      {/* Circling outline effect styles from the old version */}
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
      `}</style>

      <div className="min-h-screen bg-black text-white">
        
        {/* --- NEW: Pinned Email Notification --- */}
        {showEmailNotification && (
          <div className="bg-blue-600/20 border-b border-blue-500 text-gray-200 py-3 px-4 flex items-center justify-center gap-3 sticky top-0 z-50 animate-fade-in-down">
            <FontAwesomeIcon icon={faMapPin} className="text-blue-400 text-lg" />
            <span className="font-semibold text-sm sm:text-base">New Professional Email:</span>
            <a href="mailto:contact@shahoriar.me" className="text-sm sm:text-base font-mono underline hover:text-white transition-colors">
              contact@shahoriar.me
            </a>
            <button
              onClick={handleCopyEmail}
              className="ml-2 bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold py-1 px-3 rounded-md transition-all duration-200 flex items-center gap-1 disabled:bg-green-600 disabled:cursor-default"
              disabled={copied}
            >
              <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleDismissNotification}
              className="ml-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
            </button>
          </div>
        )}
        {/* --------------------------------------- */}


        <div className="max-w-6xl mx-auto px-4 py-12">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            
            {/* Profile Image with Circling Animation */}
            <div className="relative w-48 h-48 mx-auto mb-8">
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

            <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              MD AL SHAHORIAR HOSSAIN
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              Hello everyone! This is Shahoriar Hossain, aka Zaifears Republic. Thank you for showing interest in my life. This website is basically a portfolio and life log. Enjoy!
            </p>
          </div>

          {/* About Section */}
          <div className="mb-16">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">About Me</h2>
              <p className="text-gray-300 leading-relaxed text-center">
                I am a Finance major with a strong focus in financial analysis, Islamic finance, and data-driven decision-making. I have excelled in national business case and idea competitions, showcasing analytical and problem-solving skills under pressure. Proficient in Power BI, Excel, and statistical tools like Stata and SPSS, I specialize in financial modeling, data visualization, and forecasting. My goal is to apply my technical and analytical abilities to solve real-world financial challenges and contribute to growth in finance and technology-driven fields.
              </p>
            </div>
          </div>

          {/* Featured Actions */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-center mb-8">Get Started</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              
              {/* Tech Tips Button (Image Only) */}
              <Link 
                href="/techtips" 
                className="group w-full sm:w-1/2 bg-white rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/20"
                aria-label="Visit Tech Tips section"
              >
                <Image
                  src="/techtips.png"
                  alt="Tech Tips - Technology insights and tutorials"
                  width={400}
                  height={150}
                  className="object-cover w-full transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
              
              {/* Live Text Button */}
              <Link 
                href="/live-text" 
                className="group w-full sm:w-1/2 h-[150px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 hover:border-blue-400/50 hover:bg-gradient-to-br hover:from-blue-600/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center justify-center"
                aria-label="Access Live Text feature"
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors duration-300">
                  <FontAwesomeIcon icon={faSatelliteDish} className="w-8 h-8 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors duration-300">Live Text</h3>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16">
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-sm text-gray-400 leading-relaxed">
                Coded in Visual Studio Code by yours truly. Built with Next.js and Tailwind CSS, deployed with Vercel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}