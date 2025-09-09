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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Python IDE
        </h1>
        <h2 className="text-xl mb-3 font-semibold text-blue-600">
          Write, run, and test your Python code online!
        </h2>
        <p className="mb-5 text-gray-700">
          Use this page to code directly in Python using your browser. You can try new ideas, check examples, and share your creations — no downloads or setup required.
        </p>

        {/* --- JDoodle embed ALWAYS on white --- */}
        <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-inner">
          <div
            data-pym-src="https://www.jdoodle.com/embed/v1/93570073fa9e1d74"
            style={{ minHeight: "500px" }}
          ></div>
        </div>

<div className="text-sm mt-8 rounded bg-blue-50 p-4 text-gray-800">
  <strong>How it works:</strong>
  <ul className="list-disc pl-5">
    <li>Type Python code in the editor above.</li>
    <li>Click <b>Execute</b> to run and see your result instantly.</li>
    <li>Try examples or experiment as much as you like!</li>
  </ul>
</div>

      </div>
    </div>
  );
}
