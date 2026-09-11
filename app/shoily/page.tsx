'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Confetti from 'react-confetti';

const slideshowImages = [
  '/shoily/we.jpg',
  '/shoily/we2.jpg',
  '/shoily/we3.jpg',
];

type Screen = 'question' | 'rejected' | 'revealed';

export default function SecretBirthdayPage() {
  const [screen, setScreen] = useState<Screen>('question');
  const [isClient, setIsClient] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsClient(true);

    if (screen !== 'revealed') return;

    const slideshowInterval = setInterval(() => {
      setCurrentImageIndex((previousIndex) =>
        (previousIndex + 1) % slideshowImages.length
      );
    }, 4000);

    return () => clearInterval(slideshowInterval);
  }, [screen]);

  const handleYes = () => {
    setScreen('revealed');
    audioRef.current?.play().catch((error) => {
      console.error('Audio playback error:', error);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-pink-50 dark:bg-gray-900">
      <audio ref={audioRef} src="/shoily/happy-birthday.mp3" loop />

      {screen === 'question' && (
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">
            Will you marry me?
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleYes}
              className="px-10 py-4 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transition-transform hover:scale-105 text-xl"
            >
              Yes 💖
            </button>
            <button
              onClick={() => setScreen('rejected')}
              className="px-10 py-4 bg-gray-700 text-white font-bold rounded-full shadow-lg hover:bg-gray-800 transition-transform hover:scale-105 text-xl"
            >
              No
            </button>
          </div>
        </div>
      )}

      {screen === 'rejected' && (
        <h1 className="text-5xl md:text-7xl font-bold text-pink-600">Fuck You</h1>
      )}

      {screen === 'revealed' && (
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
            <h1 className="text-4xl md:text-6xl font-bold text-pink-500 mb-8">
              Happy Birthday Shoily
            </h1>
            <div className="mb-8 flex justify-center">
              <div className="relative h-80 w-full max-w-md overflow-hidden rounded-lg shadow-2xl">
                {slideshowImages.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`Lovely memory ${index + 1} of us`}
                    fill
                    className={`object-cover transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-inner">
              <h2 className="text-2xl font-semibold mb-3 text-pink-500">A Special Note For You</h2>
              <p className="text-left text-gray-800 dark:text-gray-200">
                On this occassion I want to let you know that I truely love you and dearly want to make you mine as my precious wife,
              </p>
              <p className="text-left text-gray-800 dark:text-gray-200 mt-4">
                please accept my request on your precious day as your only guy
              </p>
              <p className="text-left text-gray-800 dark:text-gray-200 mt-4">Love you a lot &lt;3</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
