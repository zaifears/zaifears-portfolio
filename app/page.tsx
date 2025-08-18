"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';

export default function Page() {
  // Memoize the blob clip path to avoid recalculation
  const blobPath = useMemo(() => 
    "M0.764,0.887 C0.711,0.992,0.57,1,0.5,1 C0.43,1,0.289,0.992,0.236,0.887 C0.158,0.729,0.01,0.627,0.001,0.5 C0.01,0.373,0.158,0.271,0.236,0.113 C0.289,0.008,0.43,0,0.5,0 C0.57,0,0.711,0.008,0.764,0.113 C0.842,0.271,0.99,0.373,0.999,0.5 C0.99,0.627,0.842,0.729,0.764,0.887"
  , []);

  return (
    <>
      {/* Optimized CSS with reduced animation frequency */}
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

      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        
        {/* Profile Image Section */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
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
                width={320}
                height={320}
                className="w-full h-full object-cover"
                style={{ clipPath: 'url(#blob-shape)' }}
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-4">
            MD AL SHAHORIAR HOSSAIN
          </h1>
          
          <p className="text-lg text-gray-400 mb-6 leading-relaxed">
            Hello everyone! This is Shahoriar Hossain, aka Zaifears Republic. Thank you for showing interest in my life. This website is basically a portfolio and life log. Enjoy!
          </p>
          
          <div className="border-t border-gray-700 pt-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">About me</h2>
            <p className="text-gray-400 leading-relaxed text-left max-w-2xl mx-auto">
              I am a Finance major with strong focus in financial analysis, Islamic finance, and data-driven decision-making. I have excelled in national business case and idea competitions, showcasing analytical and problem-solving skills under pressure. Proficient in Power BI, Excel, and statistical tools like Stata and SPSS, I specialize in financial modeling, data visualization, and forecasting. My goal is to apply my technical and analytical abilities to solve real-world financial challenges and contribute to growth in finance and technology-driven fields.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/techtips" 
              className="block w-full max-w-xs bg-white rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Visit Tech Tips section"
            >
              <Image
                src="/techtips.png"
                alt="Tech Tips - Technology insights and tutorials"
                width={400}
                height={150}
                className="object-cover w-full"
                loading="lazy"
              />
            </Link>
            
            <Link 
              href="/live-text" 
              className="inline-flex items-center justify-center gap-3 w-full max-w-xs bg-neutral-800 text-white font-semibold py-3 px-6 rounded-lg border border-neutral-700 transition-all duration-300 transform hover:scale-105 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Access Live Text feature"
            >
              <FontAwesomeIcon icon={faSatelliteDish} className="w-5 h-5" aria-hidden="true" />
              <span>Live Text</span>
            </Link>
          </div>

          {/* Footer */}
          <footer className="text-sm text-neutral-500 mt-12 leading-relaxed">
            <p>Coded in Visual Studio Code by yours truly. Built with Next.js and Tailwind CSS, deployed with Vercel.</p>
          </footer>
        </div>
      </div>
    </>
  );
}