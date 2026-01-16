'use client';

import React from 'react';
import { Translation } from '../utils/types';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  recommended?: boolean;
  iconColor?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  href,
  recommended = false,
  iconColor = 'text-[#00B8D4]',
}) => {
  return (
    <div
      id={href}
      className={`relative overflow-hidden rounded-2xl p-8 md:p-10 w-full md:w-80 transition-all duration-300 hover:-translate-y-2 ${
        recommended
          ? 'bg-white border-2 border-[#00B8D4] shadow-[0_0_20px_rgba(0,184,212,0.2)]'
          : 'bg-white border border-gray-200 hover:border-[#00B8D4] hover:shadow-[0_0_20px_rgba(0,184,212,0.1)]'
      }`}
    >
      {recommended && (
        <div className="absolute top-4 right-4 bg-[#00B8D4] text-white text-xs font-bold px-3 py-1 rounded">
          RECOMMENDED
        </div>
      )}

      <div className={`text-4xl mb-6 ${iconColor}`}>{icon}</div>

      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{title}</h3>

      <p className="text-gray-600 text-sm md:text-base mb-8 min-h-24 leading-relaxed">
        {description}
      </p>

      <a
        href={href}
        className={`inline-block px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
          recommended
            ? 'bg-[#00B8D4] text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,184,212,0.3)]'
            : 'bg-transparent border border-gray-400 text-gray-600 hover:border-[#00B8D4] hover:text-[#00B8D4]'
        }`}
      >
        {buttonText}
      </a>
    </div>
  );
};

interface ServicesProps {
  translations: Translation;
}

export const ServicesSection: React.FC<ServicesProps> = ({ translations }) => {
  return (
    <section id="services" className="py-20 md:py-28 px-4 md:px-[5%] bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-5xl font-bold mb-16 text-gray-800">
          <span className="border-b-4 border-[#00B8D4] pb-2">{translations.servTitle}</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          <ServiceCard
            icon="f"
            title={translations.s1Title}
            description={translations.s1Desc}
            buttonText={translations.s1Btn}
            href="#service-fb"
            iconColor="text-[#1877F2]"
          />

          <ServiceCard
            icon="🐛"
            title={translations.s2Title}
            description={translations.s2Desc}
            buttonText={translations.s2Btn}
            href="#service-web"
            iconColor="text-[#00B8D4]"
          />

          <ServiceCard
            icon="🚀"
            title={translations.s3Title}
            description={translations.s3Desc}
            buttonText={translations.s3Btn}
            href="#service-maint"
            recommended={true}
            iconColor="text-[#00B8D4]"
          />
        </div>
      </div>
    </section>
  );
};
