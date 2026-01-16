'use client';

import React from 'react';
import { Translation } from '../utils/types';

interface AcademySectionProps {
  translations: Translation;
}

export const AcademySection: React.FC<AcademySectionProps> = ({ translations }) => {
  return (
    <section id="academy-section" className="py-20 md:py-28 px-4 md:px-[5%] bg-linear-to-b from-white via-gray-50 to-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
              {translations.acaTitle.split(' ')[0]}{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B8D4] to-[#0097A7]">
                {translations.acaTitle.split(' ').slice(1).join(' ')}
              </span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
              {translations.acaDesc}
            </p>

            <div className="flex gap-12 md:gap-16">
              <div>
                <h4 className="text-3xl md:text-4xl font-bold text-[#00B8D4] mb-2">100%</h4>
                <p className="text-gray-600">{translations.stat1}</p>
              </div>
              <div>
                <h4 className="text-3xl md:text-4xl font-bold text-[#00B8D4] mb-2">♾️</h4>
                <p className="text-gray-600">{translations.stat2}</p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-[rgba(0,184,212,0.05)] border border-[rgba(0,184,212,0.2)] rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              {translations.oppTitle}
            </h3>

            <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
              {translations.oppDesc}
            </p>

            <a
              href="#"
              className="inline-block w-full text-center px-8 py-3 md:py-4 bg-[#00B8D4] text-white font-bold rounded-full hover:-translate-y-1 transition-transform duration-300 shadow-[0_0_20px_rgba(0,184,212,0.3)]"
            >
              {translations.oppBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
