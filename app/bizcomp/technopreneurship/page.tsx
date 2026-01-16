'use client';

import React, { useState } from 'react';
import { Language, Translation } from './utils/types';
import { translations } from './utils/translations';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AcademySection } from './components/AcademySection';
import { Footer } from './components/Footer';

export default function CyLinkPage() {
  const [language, setLanguage] = useState<Language>('bn');

  const currentTranslations: Translation = translations[language];

  const handleLanguageToggle = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen overflow-x-hidden font-sans">
      <Navigation
        language={language}
        translations={currentTranslations}
        onLanguageToggle={handleLanguageToggle}
      />

      <HeroSection translations={currentTranslations} />

      <ServicesSection translations={currentTranslations} />

      <AcademySection translations={currentTranslations} />

      <Footer translations={currentTranslations} />
    </div>
  );
}
