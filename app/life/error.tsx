'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function LifeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Life page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      <div className="text-6xl mb-4">😵</div>
      <h2 className="text-2xl font-bold mb-2 text-red-500">
        Something went wrong!
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
        We couldn't load the Life Journey content. This might be a temporary issue.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
