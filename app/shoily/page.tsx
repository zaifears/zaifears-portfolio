// app/shoily/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Confetti from 'react-confetti';

export default function SecretBirthdayPage() {
  const [isClient, setIsClient] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // This ensures the confetti and audio only run on the client-side
    setIsClient(true);
    // Start the fade-in animation after a short delay
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isClient && (
        <>
          <Confetti
            recycle={false}
            numberOfPieces={400}
            tweenDuration={10000}
          />
          <audio src="/happy-birthday.mp3" autoPlay />
        </>
      )}
      <div 
        className={`min-h-screen flex flex-col items-center justify-center text-center p-4 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-pink-500 mb-4">
          Happy Birthday, Shoily!
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          This is just a small secret page to show you how much you mean to me.
        </p>

        {/* --- Image Gallery Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl">
          {/* Add your images here. Place them in the /public folder */}
          <div className="relative h-60 w-full rounded-lg overflow-hidden shadow-lg">
            <Image src="/path-to-your/image1.jpg" alt="A lovely memory" layout="fill" objectFit="cover" />
          </div>
          <div className="relative h-60 w-full rounded-lg overflow-hidden shadow-lg">
            <Image src="/path-to-your/image2.jpg" alt="Another great moment" layout="fill" objectFit="cover" />
          </div>
          <div className="relative h-60 w-full rounded-lg overflow-hidden shadow-lg">
            <Image src="/path-to-your/image3.jpg" alt="Our favorite picture" layout="fill" objectFit="cover" />
          </div>
        </div>
        
        {/* --- A Heartfelt Letter --- */}
        <div className="max-w-2xl bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-3 text-pink-500">A Note For You</h2>
          <p className="text-left text-gray-800 dark:text-gray-200">
            {/* Write your personal message here */}
            My dearest Shoily, every day with you is a gift. You bring so much joy and light into my life...
          </p>
        </div>
      </div>
    </>
  );
}