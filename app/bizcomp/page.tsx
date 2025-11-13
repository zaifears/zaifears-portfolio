"use client";

import Link from 'next/link';

export default function BizCompPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 mb-4">
            Business Competitions
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Strategic solutions & market analysis
          </p>
        </div>

        {/* Accfinity Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Accfinity
            </h2>
            <p className="text-gray-600">
              Financial planning & portfolio optimization
            </p>
          </div>

          {/* Round Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Round 2 */}
            <Link 
              href="/bizcomp/accfinity/r2"
              className="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="text-5xl mb-3">🎯</div>
                <h3 className="text-2xl font-bold mb-2">Round 2</h3>
                <p className="text-blue-100 text-sm text-center">
                  Portfolio Dashboard
                </p>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </Link>

            {/* Round 3 */}
            <Link 
              href="/bizcomp/accfinity/r3"
              className="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="text-5xl mb-3">🚀</div>
                <h3 className="text-2xl font-bold mb-2">Round 3</h3>
                <p className="text-purple-100 text-sm text-center">
                  Advanced Analysis
                </p>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Click on a round to view the detailed analysis
          </p>
        </div>
      </div>
    </div>
  );
}
