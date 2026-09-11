'use client';

import { type PointerEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Confetti from 'react-confetti';

const slideshowImages = [
  '/shoily/we.jpg',
  '/shoily/we2.jpg',
  '/shoily/we3.jpg',
];

const wheelPrizes = ['Unlimited hugs', 'Movie date', 'Breakfast together', 'One wish from me'];

type Screen = 'question' | 'rejected' | 'revealed';

export default function SecretBirthdayPage() {
  const [screen, setScreen] = useState<Screen>('question');
  const [isClient, setIsClient] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loveAmount, setLoveAmount] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchComplete, setScratchComplete] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelResult, setWheelResult] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null);
  const scratchCountRef = useRef(0);

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

  useEffect(() => {
    if (screen !== 'revealed' || !scratchCanvasRef.current) return;

    const canvas = scratchCanvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.globalCompositeOperation = 'source-over';
    context.fillStyle = '#ec4899';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#fce7f3';
    context.font = 'bold 22px sans-serif';
    context.textAlign = 'center';
    context.fillText('Scratch here ✨', canvas.width / 2, canvas.height / 2);
  }, [screen]);

  const handleYes = () => {
    setScreen('revealed');
    audioRef.current?.play().catch((error) => {
      console.error('Audio playback error:', error);
    });
  };

  const addLove = () => {
    setLoveAmount((amount) => amount + Math.floor(Math.random() * 9) + 7);
  };

  const scratch = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching || scratchComplete) return;

    const canvas = scratchCanvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const bounds = canvas.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * canvas.width;
    const y = ((event.clientY - bounds.top) / bounds.height) * canvas.height;
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, 24, 0, Math.PI * 2);
    context.fill();
    scratchCountRef.current += 1;
  };

  const finishScratch = () => {
    if (!isScratching) return;
    setIsScratching(false);
    if (scratchCountRef.current >= 14) setScratchComplete(true);
  };

  const spinWheel = () => {
    if (isSpinning) return;

    const prize = wheelPrizes[Math.floor(Math.random() * wheelPrizes.length)];
    setIsSpinning(true);
    setWheelResult('');
    setWheelRotation((rotation) => rotation + 1440 + Math.floor(Math.random() * 360));
    window.setTimeout(() => {
      setWheelResult(prize);
      setIsSpinning(false);
    }, 3000);
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

            <section className="max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-pink-500">How much I love you</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Tap the heart and find out.</p>
              <button
                onClick={addLove}
                className="mt-5 text-6xl transition-transform hover:scale-125 active:scale-90"
                aria-label="Add more love"
              >
                ❤️
              </button>
              <p className="mt-3 text-3xl font-bold text-pink-500">{loveAmount}%</p>
              <div className="mt-4 h-5 w-full overflow-hidden rounded-full bg-pink-100 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-600 transition-all duration-500"
                  style={{ width: `${Math.min(loveAmount, 100)}%` }}
                />
              </div>
              {loveAmount >= 100 && (
                <p className="mt-3 font-semibold text-pink-500">It keeps growing because there is no limit. 💞</p>
              )}
            </section>

            <section className="max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-pink-500">A surprise for you</h2>
              <p className="mt-2 mb-5 text-gray-700 dark:text-gray-300">Scratch the pink card with your finger.</p>
              <div className="relative mx-auto h-[220px] w-full max-w-sm overflow-hidden rounded-xl bg-gradient-to-br from-rose-500 to-pink-300 shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-xl font-bold text-white">
                  You have a date with me whenever you say the word. 🌹
                </div>
                {!scratchComplete && (
                  <canvas
                    ref={scratchCanvasRef}
                    width={320}
                    height={220}
                    onPointerDown={(event) => {
                      setIsScratching(true);
                      event.currentTarget.setPointerCapture(event.pointerId);
                    }}
                    onPointerMove={scratch}
                    onPointerUp={finishScratch}
                    onPointerCancel={finishScratch}
                    className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
                    aria-label="Scratch to reveal your surprise"
                  />
                )}
              </div>
              {scratchComplete && <p className="mt-4 font-semibold text-pink-500">Surprise unlocked! ✨</p>}
            </section>

            <section className="max-w-2xl mx-auto mt-8 mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-pink-500">Spin the romance wheel</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Your next little gift from me is one spin away.</p>
              <div className="relative mx-auto mt-6 w-64 max-w-full">
                <div className="absolute left-1/2 top-[-10px] z-10 -translate-x-1/2 text-3xl text-pink-600">▼</div>
                <div
                  className="aspect-square rounded-full border-8 border-pink-200 shadow-xl transition-transform duration-[3000ms] ease-out"
                  style={{
                    transform: `rotate(${wheelRotation}deg)`,
                    background: 'conic-gradient(#f43f5e 0deg 90deg, #f9a8d4 90deg 180deg, #ec4899 180deg 270deg, #fbcfe8 270deg 360deg)',
                  }}
                >
                  <div className="grid h-full w-full grid-cols-2 grid-rows-2 overflow-hidden rounded-full text-sm font-bold text-white">
                    {wheelPrizes.map((prize) => (
                      <div key={prize} className="flex items-center justify-center p-3 text-center">{prize}</div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className="mt-6 rounded-full bg-pink-500 px-8 py-3 font-bold text-white shadow-md transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSpinning ? 'Spinning...' : 'Spin the wheel 🎡'}
              </button>
              {wheelResult && <p className="mt-4 text-xl font-bold text-pink-500">You won: {wheelResult} 💝</p>}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
