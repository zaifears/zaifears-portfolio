"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faCopy, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState, useEffect } from 'react';
import { FaPython } from 'react-icons/fa';

// --- LIVE TIME COMPONENT ---
function LiveTime() {
  const [time, setTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTwoDigits = (num: number) => num.toString().padStart(2, '0');
  
  let hours = time.getHours();
  const minutes = formatTwoDigits(time.getMinutes());
  const seconds = formatTwoDigits(time.getSeconds());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const finalHours = formatTwoDigits(hours);

  if (!isClient) {
    return (
        <div className="text-center font-mono text-gray-400 dark:text-gray-600 animate-pulse">
          <div className="flex items-end justify-center">
            <span className="text-2xl sm:text-3xl font-semibold tracking-tight">--:--</span>
            <div className="flex flex-col items-start ml-2 text-xs leading-none">
              <span>--</span>
              <span>--</span>
            </div>
          </div>
          <p className="text-xs mt-1">GMT+6</p>
        </div>
    );
  }

  return (
    <div className="text-center font-mono text-gray-400 dark:text-gray-600">
      <div className="flex items-end justify-center">
        <span className="text-2xl sm:text-3xl font-semibold tracking-tight">{finalHours}:{minutes}</span>
        <div className="flex flex-col items-start ml-2 text-xs leading-none">
          <span>{seconds}</span>
          <span>{ampm}</span>
        </div>
      </div>
      <p className="text-xs mt-1">GMT+6</p>
    </div>
  );
}

// --- NEW WEATHER COMPONENT ---
function Weather() {
  const [weather, setWeather] = useState<{ temperature: number; weathercode: number } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    async function fetchWeather() {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=23.777176&longitude=90.399452&current_weather=true');
        const data = await response.json();
        setWeather(data.current_weather);
      } catch (error) {
        console.error("Failed to fetch weather", error);
        setWeather(null);
      }
    }
    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return '☀️';
    if (code >= 1 && code <= 3) return '☁️';
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 82) return '🌧️';
    if (code >= 85 && code <= 86) return '❄️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '...';
  };

  if (!isClient || !weather) {
    return (
      <div className="text-center font-mono text-gray-400 dark:text-gray-600 text-sm animate-pulse">
        <span>--°C</span>
        <span className="ml-2">...</span>
        <p className="text-xs">Dhaka, Bangladesh</p>
      </div>
    );
  }

  return (
    <div className="text-center font-mono text-gray-400 dark:text-gray-600 text-sm">
      <span>{weather.temperature.toFixed(0)}°C</span>
      <span className="ml-2">{getWeatherIcon(weather.weathercode)}</span>
      <p className="text-xs">Dhaka, Bangladesh</p>
    </div>
  );
}

export default function Page() {
  const blobPath = useMemo(() =>
    "M0.764,0.887 C0.711,0.992,0.57,1,0.5,1 C0.43,1,0.289,0.992,0.236,0.887 C0.158,0.729,0.01,0.627,0.001,0.5 C0.01,0.373,0.158,0.271,0.236,0.113 C0.289,0.008,0.43,0,0.5,0 C0.57,0,0.711,0.008,0.764,0.113 C0.842,0.271,0.99,0.373,0.999,0.5 C0.99,0.627,0.842,0.729,0.764,0.887"
  , []);

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
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
        @keyframes scroll-words-step {
          0%, 14% { transform: translateY(0); }
          16%, 30% { transform: translateY(-14.28%); }
          32%, 46% { transform: translateY(-28.57%); }
          48%, 62% { transform: translateY(-42.85%); }
          64%, 78% { transform: translateY(-57.14%); }
          80%, 94% { transform: translateY(-71.42%); }
          96%, 100% { transform: translateY(-85.71%); }
        }
        .animate-scroll-words-step {
          animation: scroll-words-step 12s ease-in-out infinite;
        }
        .scrolling-text-mask {
          -webkit-mask-image: linear-gradient(to bottom, transparent 10%, black 20%, black 80%, transparent 90%);
          mask-image: linear-gradient(to bottom, transparent 10%, black 20%, black 80%, transparent 90%);
        }
      `}</style>
      
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <div className="text-center mb-12 sm:mb-16">
            
            <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-items-center mb-6 sm:mb-8">
              <div className="w-full h-full flex flex-col items-center justify-center md:items-start order-2 md:order-1 mt-4 md:mt-0 min-h-[60px] gap-2">
                <LiveTime />
                <Weather />
              </div>

              <div className="relative w-32 h-32 sm:w-48 sm:h-48 mx-auto order-1 md:order-2">
                <svg width="0" height="0" aria-hidden="true">
                  <defs>
                    <clipPath id="blob-shape" clipPathUnits="objectBoundingBox">
                      <path d={blobPath} />
                    </clipPath>
                  </defs>
                </svg>
                <div className="outline-container relative w-full h-full">
                  <div className="absolute inset-0" style={{ clipPath: 'url(#blob-shape)' }}>
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

              <div className="hidden md:block w-full order-3"></div>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold font-mono tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              MD AL SHAHORIAR HOSSAIN
            </h1>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-lg sm:text-2xl md:text-4xl font-semibold mb-6 sm:mb-8">
                <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap">I do</span>
                <div className="relative h-12 sm:h-16 md:h-20 w-full sm:w-80 md:w-96 overflow-hidden scrolling-text-mask">
                    <div className="animate-scroll-words-step">
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 px-2">Financial Analysis</div>
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 px-2">Web Development</div>
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 px-2">Graphic Design</div>
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 px-2">Data Visualization</div>
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 px-2">Investment Strategy</div>
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 px-2">Problem Solving</div>
                        <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center sm:justify-start text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 px-2">Financial Analysis</div>
                    </div>
                </div>
            </div>
          </div>

          <div className="mb-12 sm:mb-16">
            <div className="bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-8 max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-blue-600 dark:text-blue-400">About Me</h2>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                I am a Finance major with a strong focus in financial analysis, Islamic finance, and data-driven decision-making. I have excelled in national business case and idea competitions, showcasing analytical and problem-solving skills under pressure. My goal is to apply my technical and analytical abilities to solve real-world financial challenges and contribute to growth in finance and technology-driven fields.
              </p>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/50">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMapPin} className="text-blue-500 dark:text-blue-400 text-sm" />
                    <span className="font-semibold text-xs sm:text-sm">New Professional Email:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="mailto:contact@shahoriar.me" className="text-xs sm:text-sm font-mono underline hover:text-blue-600 dark:hover:text-white transition-colors">
                      contact@shahoriar.me
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1 px-2 rounded-md transition-all duration-200 flex items-center gap-1 disabled:bg-green-600 disabled:cursor-default"
                      disabled={copied}
                    >
                      <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Get Started</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              <Link href="/techtips" className="group relative block h-32 sm:h-40 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/20" aria-label="Visit Tech Tips section">
                <Image src="/techtips.png" alt="Tech Tips" fill className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
              </Link>
              <Link href="/design-portfolio" className="group relative block h-32 sm:h-40 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/20" aria-label="Visit Design Portfolio">
                <Image src="/designbox.png" alt="Design Portfolio" fill className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
              </Link>
              <Link href="/live-text" className="group relative block h-32 sm:h-40 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-600/20 sm:col-span-2 md:col-span-1" aria-label="Access Live Text feature">
                <Image src="/livetexttelegram.png" alt="Live Text from Telegram" fill className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <div className="max-w-xl mx-auto">
                <Link href="/ide" className="group inline-block w-full">
                <button
                    type="button"
                    className="flex items-center justify-center w-full px-6 py-2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 text-white rounded-xl font-semibold text-base shadow-lg gap-3 transition duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none active:scale-100 active:shadow group-hover:shadow-blue-500/30"
                    style={{ minHeight: "44px" }}
                >
                    <FaPython className="text-xl" />
                    <span className="tracking-wide">Code in Python</span>
                </button>
                </Link>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-gray-100 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Coded in Visual Studio Code by yours truly. Built with Next.js and Tailwind CSS, deployed with Vercel.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                💡 Tip: Change your browser or OS appearance to switch between light and dark themes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

