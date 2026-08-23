'use client';

import { useEffect } from 'react';

export default function IDE() {
  useEffect(() => {
    // Add JDoodle script dynamically (required for embed to work!)
    const script = document.createElement('script');
    script.src = "https://www.jdoodle.com/assets/jdoodle-pym.min.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur-xl">
        <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
          Python IDE
        </h1>
        <h2 className="text-lg mb-4 font-semibold text-blue-600 dark:text-blue-400">
          Write, run, and test your Python code online
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
          Use this page to code directly in Python using your browser. You can try new ideas, check examples, and share your creations — no downloads or setup required.
        </p>

        {/* --- JDoodle embed on white editor surface --- */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white p-2 shadow-inner overflow-hidden">
          <div
            data-pym-src="https://www.jdoodle.com/embed/v1/93570073fa9e1d74"
            style={{ minHeight: "500px" }}
          ></div>
        </div>

        <div className="text-sm mt-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 p-4 text-gray-800 dark:text-gray-200">
          <strong className="font-semibold text-gray-900 dark:text-white">How it works:</strong>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
            <li>Type Python code in the editor above.</li>
            <li>Click <b>Execute</b> to run and see your result instantly.</li>
            <li>Try examples or experiment as much as you like!</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
