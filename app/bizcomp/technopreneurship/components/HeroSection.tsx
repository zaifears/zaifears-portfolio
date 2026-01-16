'use client';

import React from 'react';
import { Translation } from '../utils/types';

interface HeroSectionProps {
  translations: Translation;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ translations }) => {
  return (
    <header className="relative py-12 md:py-20 px-4 md:px-5 bg-linear-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00B8D4] rounded-full filter blur-[150px] opacity-10 z-0" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-800">
          {translations.heroTitle.split(' ').slice(0, 2).join(' ')}{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B8D4] via-[#0097A7] to-[#00B8D4]">
            {translations.heroTitle.split(' ').slice(2).join(' ')}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          {translations.heroSubtitle}
        </p>

        <a
          href="#services"
          className="inline-block px-8 md:px-10 py-3 md:py-4 bg-[#00B8D4] text-white font-bold text-lg rounded-full hover:-translate-y-1 transition-transform duration-300 shadow-[0_0_20px_rgba(0,184,212,0.3)] hover:shadow-[0_0_30px_rgba(0,184,212,0.5)]"
        >
          {translations.heroCta}
        </a>
      </div>
    </header>
  );
};
