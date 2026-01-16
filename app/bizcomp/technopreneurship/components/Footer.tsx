'use client';

import React from 'react';
import { Translation } from '../utils/types';

interface FooterProps {
  translations: Translation;
}

export const Footer: React.FC<FooterProps> = ({ translations }) => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4 md:px-[5%]">
      <div className="max-w-6xl mx-auto text-center">
        {/* Footer Text */}
        <p className="text-gray-600 text-sm md:text-base">
          &copy; 2024 CyLink.{' '}
          <span className="text-[#00B8D4]">{translations.footer}</span>
        </p>
      </div>
    </footer>
  );
};
