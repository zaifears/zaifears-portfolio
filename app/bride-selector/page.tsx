'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Confetti from 'react-confetti';

type Step = 'q1' | 'q2' | 'accepted' | 'rejected';
type YesNo = 'yes' | 'no' | null;

function YesNoToggle({
  value,
  onChange,
}: {
  value: YesNo;
  onChange: (v: 'yes' | 'no') => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      <button
        type="button"
        onClick={() => onChange('yes')}
        className={`flex-1 min-w-[100px] sm:flex-none px-6 sm:px-8 py-3 rounded-xl font-bold text-lg border-2 transition-all transform hover:scale-105 ${
          value === 'yes'
            ? 'bg-green-500 border-green-500 text-white shadow-lg'
            : 'bg-transparent border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-400'
        }`}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onChange('no')}
        className={`flex-1 min-w-[100px] sm:flex-none px-6 sm:px-8 py-3 rounded-xl font-bold text-lg border-2 transition-all transform hover:scale-105 ${
          value === 'no'
            ? 'bg-red-500 border-red-500 text-white shadow-lg'
            : 'bg-transparent border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-400'
        }`}
      >
        No
      </button>
    </div>
  );
}

export default function BrideSelectorPage() {
  const [step, setStep] = useState<Step>('q1');
  const [isClient, setIsClient] = useState(false);

  const [q1Answer, setQ1Answer] = useState<YesNo>(null);
  const [q2CookAnswer, setQ2CookAnswer] = useState<YesNo>(null);
  const [q2SizeAnswer, setQ2SizeAnswer] = useState<YesNo>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQ1Submit = () => {
    if (!q1Answer) return;
    setStep(q1Answer === 'yes' ? 'accepted' : 'q2');
  };

  const handleQ2Submit = () => {
    if (!q2CookAnswer || !q2SizeAnswer) return;
    // No matter what's chosen here, the outcome is the same.
    setStep('rejected');
  };

  const handleRestart = () => {
    setStep('q1');
    setQ1Answer(null);
    setQ2CookAnswer(null);
    setQ2SizeAnswer(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-50 dark:bg-black">
      {step === 'accepted' && isClient && (
        <Confetti
          recycle={false}
          numberOfPieces={600}
          tweenDuration={15000}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      <div className="w-full max-w-lg">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-10">
          Welcome to the Bride Selector Program of Shahoriar
        </h1>

        {step === 'q1' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Question 1: Are you Shoily?
            </h2>
            <YesNoToggle value={q1Answer} onChange={setQ1Answer} />
            <button
              type="button"
              onClick={handleQ1Submit}
              disabled={!q1Answer}
              className="mt-8 w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all transform hover:enabled:scale-105"
            >
              Submit
            </button>
          </div>
        )}

        {step === 'q2' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                1. Can you cook?
              </h2>
              <YesNoToggle value={q2CookAnswer} onChange={setQ2CookAnswer} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                2. Are your tiddies more than 34C?
              </h2>
              <YesNoToggle value={q2SizeAnswer} onChange={setQ2SizeAnswer} />
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setStep('q1')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleQ2Submit}
                disabled={!q2CookAnswer || !q2SizeAnswer}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all transform hover:enabled:scale-105"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {step === 'accepted' && (
          <div className="animate-fade-in-down bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10">
            <div className="mx-auto mb-6 flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-green-600 shadow-xl">
              <svg
                className="h-12 w-12 sm:h-16 sm:w-16 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 mb-4">
              SELECTED
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              It's you. Obviously.
            </p>
            <Link
              href="/contact"
              className="block sm:inline-block w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition-all transform hover:scale-105 mb-4"
            >
              shahoriar.bd/contact
            </Link>
            <div>
              <button
                type="button"
                onClick={() => setStep('q1')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {step === 'rejected' && (
          <div className="animate-fade-in-down bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10">
            <div className="mx-auto mb-6 flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-red-600 shadow-xl">
              <svg
                className="h-12 w-12 sm:h-16 sm:w-16 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-red-600 mb-6">
              Sorry, you are not Shoily
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setStep('q2')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
