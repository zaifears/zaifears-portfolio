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

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-6 my-8">
          <a href="mailto:alshahoriar.hossain@gmail.com" className="text-gray-400 hover:text-blue-400 transition-transform duration-200 hover:-translate-y-1" title="Email">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>
          </a>
          <a href="https://facebook.com/alshahoriar.hossain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-transform duration-200 hover:-translate-y-1" title="Facebook">
            <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/shahoriarhossain/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-transform duration-200 hover:-translate-y-1" title="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
          </a>
          <a href="https://www.youtube.com/@takatunes" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-transform duration-200 hover:-translate-y-1" title="YouTube">
            <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
          </a>
        </div>
        
      </div>
    </>
  );
}
