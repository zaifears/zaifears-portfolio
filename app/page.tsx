"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function Page() {
  return (
    <>
      {/* ✅ UPDATED: This style block creates the new "circling" outline effect */}
      <style jsx global>{`
        @keyframes spin-gradient {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .outline-container::before {
          content: '';
          position: absolute;
          inset: -3px; /* Controls the thickness of the outline */
          background: conic-gradient(from 180deg at 50% 50%, #3b82f6, #000, #000, #3b82f6);
          clip-path: url(#blob-shape);
          animation: spin-gradient 4s linear infinite;
          z-index: -1; /* Places the rotating gradient behind the image */
        }
      `}</style>

      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
          <svg width="0" height="0">
            <defs>
              <clipPath id="blob-shape" clipPathUnits="objectBoundingBox">
                <path d="M0.764,0.887 C0.711,0.992,0.57,1,0.5,1 C0.43,1,0.289,0.992,0.236,0.887 C0.158,0.729,0.01,0.627,0.001,0.5 C0.01,0.373,0.158,0.271,0.236,0.113 C0.289,0.008,0.43,0,0.5,0 C0.57,0,0.711,0.008,0.764,0.113 C0.842,0.271,0.99,0.373,0.999,0.5 C0.99,0.627,0.842,0.729,0.764,0.887" />
              </clipPath>
            </defs>
          </svg>
          
          {/* This container holds both the outline and the image */}
          <div className="outline-container relative w-full h-full">
            {/* The image itself, which does not animate */}
            <div
              className="absolute inset-0"
              style={{ clipPath: 'url(#blob-shape)' }}
            >
              <Image
                src="/my-profile.jpg"
                alt="MD AL SHAHORIAR HOSSAIN"
                width={320}
                height={320}
                className="w-full h-full object-cover"
                style={{ clipPath: 'url(#blob-shape)' }}
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-4">
            MD AL SHAHORIAR HOSSAIN
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            Hello everyone! This is Shahoriar Hossain, aka Zaifears Republic. Thank you for showing interest in my life. This website is basically a portfolio and life log. Enjoy!
          </p>
          <div className="border-t border-gray-700 pt-6">
             <h2 className="text-xl font-semibold mb-2 text-blue-400">About me:</h2>
             <p className="text-gray-400">
                Born in Mymensingh, 23rd of June. Tech enthusiast with a passion for stock market analysis and active investment. Occasionally writes about economy and finance-related issues. Recognized for trustworthiness and enthusiasm in expanding knowledge and learning new things. Feel free to reach out!
             </p>
          </div>
        </div>

        {/* ✅ REMOVED: The social media icons section has been deleted. */}
        
      </div>
    </>
  );
}
