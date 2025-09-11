// app/shoily/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Confetti from 'react-confetti';

const luckOptions = [
  "Love you more (⁠づ⁠｡⁠◕⁠‿⁠‿⁠◕⁠｡⁠)⁠づ",
  "Hug you (⁠つ⁠≧⁠▽⁠≦⁠)⁠つ",
  "Smooch you (⁠つ⁠✧⁠ω⁠✧⁠)⁠つ",
  "Eat you (⁠/⁠･⁠ω⁠･⁠(⁠-⁠ω⁠-⁠)",
];

const slideshowImages = [
  '/we.jpg',
  '/we2.jpg',
  '/we3.jpg',
];

export default function SecretBirthdayPage() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [luckyChoice, setLuckyChoice] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Combined useEffect for all client-side logic
  useEffect(() => {
    setIsClient(true);

    if (isRevealed) {
      const slideshowInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % slideshowImages.length
        );
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(slideshowInterval);
    }
  }, [isRevealed]);

  const handleRevealClick = () => {
    setIsRevealed(true);
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback error:", error);
      });
    }
  };

  const handleTryLuck = () => {
    const randomIndex = Math.floor(Math.random() * luckOptions.length);
    setLuckyChoice(luckOptions[randomIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-pink-50 dark:bg-gray-900">
      <audio ref={audioRef} src="/happy-birthday.mp3" loop />

      {!isRevealed ? (
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            A Special Surprise for Shoily
          </h1>
          <button
            onClick={handleRevealClick}
            className="px-8 py-4 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transition-transform transform hover:scale-105 text-xl"
          >
            Click to Open Your Gift 💝
          </button>
        </div>
      ) : (
        <>
          {isClient && (
            <Confetti
              recycle={false}
              numberOfPieces={500}
              tweenDuration={15000}
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )}
          <div className="animate-fade-in-down w-full max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-pink-500 mb-4">
              Happy Birthday, Shoily!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              This is just a small secret page to show you how much you mean to me.
            </p>
            <div className="mb-8 flex justify-center">
              <div className="relative h-80 w-full max-w-md rounded-lg overflow-hidden shadow-2xl transition-opacity duration-1000">
                <Image
                  key={slideshowImages[currentImageIndex]}
                  src={slideshowImages[currentImageIndex]}
                  alt={`Lovely memory ${currentImageIndex + 1} of us`}
                  fill
                  className="object-cover"
                  // The "priority" prop has been removed from here
                />
              </div>
            </div>
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-inner mb-12">
              <h2 className="text-2xl font-semibold mb-3 text-pink-500">A Note For You</h2>
              <p className="text-left text-gray-800 dark:text-gray-200">
                My dearest Shoily, every day with you is a gift. You bring so much joy and light into my life, like sunshine breaking through the clouds. You are my greatest adventure and my calmest harbor all at once. Thank you for being the wonderful, kind, and brilliant person you are. I hope your birthday is as beautiful as you. I love you more every single day.
              </p>
            </div>
            <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">I want to...</h3>
              <div className="text-3xl font-bold text-purple-500 mb-6 h-12 flex items-center justify-center">
                {luckyChoice}
              </div>
              <button
                onClick={handleTryLuck}
                className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-all transform hover:scale-105"
              >
                Try Your Luck! ✨
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}