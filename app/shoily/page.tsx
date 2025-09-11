// app/shoily/page.tsx
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Confetti from 'react-confetti';

export default function SecretBirthdayPage() {
  const [isRevealed, setIsRevealed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleRevealClick = () => {
    setIsRevealed(true);
    // The user's click allows us to play the audio
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        // Log any errors, just in case
        console.error("Audio playback error:", error);
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-pink-50 dark:bg-gray-900">
      {/* The audio element is ready but not playing yet */}
      <audio ref={audioRef} src="/happy-birthday.mp3" loop />

      {!isRevealed ? (
        // --- The Initial Surprise Button ---
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">A Special Surprise for Shoily</h1>
          <button
            onClick={handleRevealClick}
            className="px-8 py-4 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transition-transform transform hover:scale-105 text-xl"
          >
            Click to Open Your Gift 💝
          </button>
        </div>
      ) : (
        // --- The Birthday Content (after clicking) ---
        <>
          <Confetti
            recycle={false}
            numberOfPieces={500}
            tweenDuration={15000}
            width={typeof window !== 'undefined' ? window.innerWidth : 0}
            height={typeof window !== 'undefined' ? window.innerHeight : 0}
          />
          <div className="animate-fade-in-down">
            <h1 className="text-4xl md:text-6xl font-bold text-pink-500 mb-4">
              Happy Birthday, Shoily!
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              This is just a small secret page to show you how much you mean to me.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl">
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
            
            <div className="max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-inner">
              <h2 className="text-2xl font-semibold mb-3 text-pink-500">A Note For You</h2>
              <p className="text-left text-gray-800 dark:text-gray-200">
                My dearest Shoily, every day with you is a gift. You bring so much joy and light into my life...
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}