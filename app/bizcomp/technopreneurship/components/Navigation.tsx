'use client';

import React from 'react';
import Image from 'next/image';
import { Language, Translation } from '../utils/types';

interface NavigationProps {
  language: Language;
  translations: Translation;
  onLanguageToggle: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  language,
  translations,
  onLanguageToggle,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-5 md:px-[5%] py-4 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      {/* Logo */}
      <a href="#" className="flex items-center gap-2" style={{direction: 'ltr'}}>
        <Image
          src="/bizcomp/CyLink Logo.png"
          alt="CyLink Logo"
          width={120}
          height={40}
          className="h-10 w-auto"
        />
      </a>

      {/* Nav Center - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-6" style={{direction: 'ltr'}}>
        <a href="#" className="text-gray-700 font-semibold text-lg hover:text-[#00B8D4] transition">
          {translations.navHome}
        </a>

        {/* Services Dropdown */}
        <div className="relative group">
          <button className="text-gray-700 font-semibold text-lg hover:text-[#00B8D4] transition flex items-center gap-1">
            {translations.navServices}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-60 bg-white rounded-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl">
            <a
              href="#service-fb"
              className="flex items-center gap-3 px-5 py-3 text-gray-600 hover:bg-[rgba(0,184,212,0.1)] hover:text-[#00B8D4] transition border-b border-gray-100"
            >
              <span className="text-[#1877F2]">f</span>
              {translations.dropFb}
            </a>
            <a
              href="#service-web"
              className="flex items-center gap-3 px-5 py-3 text-gray-600 hover:bg-[rgba(0,184,212,0.1)] hover:text-[#00B8D4] transition border-b border-gray-100"
            >
              <span className="text-[#00B8D4]">🌐</span>
              {translations.dropWeb}
            </a>
            <a
              href="#service-maint"
              className="flex items-center gap-3 px-5 py-3 text-gray-600 hover:bg-[rgba(0,184,212,0.1)] hover:text-[#00B8D4] transition"
            >
              <span className="text-[#00B8D4]">🚀</span>
              {translations.dropMaint}
            </a>
          </div>
        </div>

        <a href="#academy-section" className="text-gray-700 font-semibold text-lg hover:text-[#00B8D4] transition">
          {translations.navAcademy}
        </a>
      </div>

      {/* Language Toggle */}
      <button
        onClick={onLanguageToggle}
        className="flex items-center gap-2 px-4 py-2 border border-[#00B8D4] text-[#00B8D4] rounded-lg hover:bg-[#00B8D4] hover:text-white transition font-semibold text-sm md:text-base"
        style={{direction: 'ltr'}}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20H19a2 2 0 002-2V9a2 2 0 00-2-2h-5.949L9 3m6 17H9" />
        </svg>
        <span>{translations.langBtn}</span>
      </button>
    </nav>
  );
};
