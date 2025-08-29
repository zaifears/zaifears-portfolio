"use client";

import { useState } from 'react';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import PortfolioContent from '../design-portfolio/PortfolioContent'; // Import the shared component

// Define the structure for a single Certificate
interface Certificate {
  fields: {
    title: string;
    issuingBody: string;
    date: string;
    description?: any;
    credentialUrl?: string;
    certificateImage?: {
      fields: {
        file: { url: string };
        title: string;
      };
    };
  };
}

interface SkillsTabsProps {
  certificates: Certificate[];
}

const SkillItem = ({ icon, name }: { icon: string; name: string }) => (
  <div className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 text-center hover:bg-gray-800/50 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl">
    <div className="w-16 h-16 bg-gray-800/50 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-gray-700/50 transition-colors duration-300">
      <div className="relative w-10 h-10">
        <Image src={`/${icon}`} alt={`${name} icon`} fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
      </div>
    </div>
    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{name}</h3>
  </div>
);

const TechSkillItem = ({ title, logos, names }: { title: string; logos: { src: string, alt: string, href: string }[]; names: string }) => (
  <div className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 text-center h-full flex flex-col hover:bg-gray-800/50 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl">
    <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
    <div className="flex justify-center items-center gap-4 my-auto flex-grow">
      {logos.map(logo => (
        <a key={logo.src} href={logo.href} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-75">
          <div className="relative h-12 w-12">
            <Image src={`/${logo.src}`} alt={logo.alt} fill style={{ objectFit: 'contain' }} />
          </div>
        </a>
      ))}
    </div>
    <p className="text-gray-400 text-sm mt-4">{names}</p>
  </div>
);

const TabButtons = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => (
  <div className="flex flex-wrap justify-center mb-12 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-2 max-w-fit mx-auto border border-gray-800">
    <button
      onClick={() => setActiveTab('skills')}
      className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${activeTab === 'skills' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
    >
      Skills
    </button>
    <button
      onClick={() => setActiveTab('certificates')}
      className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${activeTab === 'certificates' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
    >
      Certifications
    </button>
    <button
      onClick={() => setActiveTab('designPortfolio')}
      className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${activeTab === 'designPortfolio' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
    >
      Design Portfolio
    </button>
  </div>
);

export default function SkillsTabs({ certificates }: SkillsTabsProps) {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <>
      <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === 'skills' && (
          <>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Core Competencies</h2>
              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkillItem icon="problem.png" name="Problem-Solving" />
                <SkillItem icon="entrepreneurial.png" name="Entrepreneurial Mindset" />
                <SkillItem icon="analysis.png" name="Analysis & Research" />
                <SkillItem icon="financial.png" name="Financial & Economic Analysis" />
                <SkillItem icon="leadership.png" name="Leadership & Collaboration" />
                <SkillItem icon="presentation.png" name="Presentation & Communication" />
              </div>
            </div>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Technical Skills</h2>
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <TechSkillItem
                    title="Proficient Use of AI"
                    logos={[
                      { src: 'chatgpt.png', alt: 'ChatGPT Logo', href: 'https://openai.com/chatgpt' },
                      { src: 'claude.png', alt: 'Claude AI Logo', href: 'https://www.claude.ai/' },
                      { src: 'gemini.png', alt: 'Google Gemini Logo', href: 'https://gemini.google.com/' },
                      { src: 'grok.png', alt: 'Grok AI Logo', href: 'https://grok.x.ai/' },
                    ]}
                    names="I leverage various AI tools to accelerate my development workflow, from code generation to research and analysis."
                  />
                </div>
                <TechSkillItem title="Design" logos={[{ src: 'canva.png', alt: 'Canva', href: 'https://www.canva.com' }, { src: 'figma.png', alt: 'Figma', href: 'https://www.figma.com' }]} names="Canva, Figma" />
                <TechSkillItem title="Office & Productivity" logos={[{ src: 'office.png', alt: 'Microsoft Office', href: 'https://www.office.com' }, { src: 'google.png', alt: 'Google Workspace', href: 'https://workspace.google.com' }]} names="Microsoft Office Suite, Google Workplace" />
                <TechSkillItem title="Web Development" logos={[{ src: 'wordpress.png', alt: 'Wordpress', href: 'https://wordpress.org' }, { src: 'nextjs.png', alt: 'Next.js', href: 'https://nextjs.org' }]} names="Wordpress, Next.js" />
                <TechSkillItem title="Data Analysis" logos={[{ src: 'stata.png', alt: 'Stata', href: 'https://en.wikipedia.org/wiki/Stata' }, { src: 'spss.png', alt: 'SPSS', href: 'https://en.wikipedia.org/wiki/SPSS' }]} names="Stata, SPSS" />
                <TechSkillItem title="Data Visualization" logos={[{ src: 'powerbi.png', alt: 'Power BI', href: 'https://www.microsoft.com/en-us/power-platform/products/power-bi' }]} names="Power BI" />
                <TechSkillItem title="IT Support" logos={[{ src: 'computer.png', alt: 'Computer Hardware', href: '#' }]} names="Proficient in building computers from scratch and disassembling hardware components. Skilled at diagnosing and resolving both hardware and software issues." />
              </div>
            </div>
          </>
        )}
        {activeTab === 'certificates' && (
          <div className="space-y-6 max-w-6xl mx-auto">
            {certificates.map((cert: Certificate, index: number) => (
              <div key={index} className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-6 hover:bg-gray-800/50 hover:border-blue-500/30 transition-all duration-300">
                {cert.fields.certificateImage && (
                  <div className="flex-shrink-0 w-full sm:w-24 sm:h-24 bg-gray-800 rounded-xl p-2 flex items-center justify-center group-hover:bg-gray-700/50 transition-colors duration-300">
                    <Image
                      src={`https:${cert.fields.certificateImage.fields.file.url}`}
                      alt={cert.fields.certificateImage.fields.title}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="font-bold text-xl mb-1 group-hover:text-blue-400 transition-colors duration-300">{cert.fields.title}</h3>
                  <p className="text-gray-400">{cert.fields.issuingBody}</p>
                  {cert.fields.description && (
                    <div className="prose prose-sm prose-invert text-gray-300 mt-2">
                      {documentToReactComponents(cert.fields.description)}
                    </div>
                  )}
                  {cert.fields.credentialUrl && (
                    <a href={cert.fields.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 mt-4 text-sm">
                      View Credential
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'designPortfolio' && (
          // This now renders the shared component
          <PortfolioContent />
        )}
      </div>
    </>
  );
}

