"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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

// Define the type for the props this component receives
interface SkillsTabsProps {
  certificates: Certificate[];
}

// Skill item component
const SkillItem = ({ icon, name }: { icon: string; name: string }) => (
    <div className="flex flex-col items-center text-center">
        <div className="relative w-20 h-20 mb-2">
            <Image src={`/${icon}`} alt={`${name} icon`} width={80} height={80} className="object-contain" />
        </div>
        <p className="font-semibold text-neutral-700 dark:text-neutral-300">{name}</p>
    </div>
);

// Tech skill item component
const TechSkillItem = ({ title, logos, names }: { title: string; logos: { src: string, alt: string, href: string }[]; names: string }) => (
    <div className="flex flex-col items-center text-center p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg h-full">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="flex justify-center items-center gap-4 mb-2 flex-grow">
            {logos.map(logo => (
                <a key={logo.src} href={logo.href} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-75">
                    <div className="relative h-12 w-12">
                        <Image src={`/${logo.src}`} alt={logo.alt} fill style={{ objectFit: 'contain' }} />
                    </div>
                </a>
            ))}
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 mt-auto">{names}</p>
    </div>
);

// Reusable Tab Buttons Component
const TabButtons = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => (
  <div className="flex justify-center mb-12 bg-neutral-900 rounded-full p-1 max-w-max mx-auto">
    <button 
      onClick={() => setActiveTab('skills')} 
      className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeTab === 'skills' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
    >
      Skills
    </button>
    <button 
      onClick={() => setActiveTab('certificates')} 
      className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeTab === 'certificates' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
    >
      Certificates
    </button>
  </div>
);


export default function SkillsTabs({ certificates }: SkillsTabsProps) {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <>
      {/* --- TOP TAB BUTTONS --- */}
      <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* --- CONTENT AREA --- */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'skills' && (
            <>
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-center mb-8">Core Competencies</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 max-w-4xl mx-auto">
                        <SkillItem icon="problem.png" name="Problem-Solving" />
                        <SkillItem icon="entrepreneurial.png" name="Entrepreneurial Mindset" />
                        <SkillItem icon="analysis.png" name="Analysis & Research" />
                        <SkillItem icon="financial.png" name="Financial & Economic Analysis" />
                        <SkillItem icon="leadership.png" name="Leadership & Collaboration" />
                        <SkillItem icon="presentation.png" name="Presentation & Communication" />
                    </div>
                </div>
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-center mb-8">Technical Skills</h2>
                    
                    {/* --- NEW AI SECTION --- */}
                    <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto mb-8">
                        <TechSkillItem
                            title="Proficient Use of AI"
                            logos={[
                                {src: 'chatgpt.png', alt: 'ChatGPT Logo', href: 'https://openai.com/chatgpt'},
                                {src: 'claude.png', alt: 'Claude AI Logo', href: 'https://www.claude.ai/'},
                                {src: 'gemini.png', alt: 'Google Gemini Logo', href: 'https://gemini.google.com/'},
                                {src: 'grok.png', alt: 'Grok AI Logo', href: 'https://grok.x.ai/'},
                            ]}
                            names="I leverage various AI tools to accelerate my development workflow, from code generation to research and analysis."
                        />
                    </div>

                    {/* --- EXISTING TECHNICAL SKILLS --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <TechSkillItem
                            title="Design"
                            logos={[{src: 'canva.png', alt: 'Canva', href: 'https://www.canva.com'}, {src: 'figma.png', alt: 'Figma', href: 'https://www.figma.com'}]}
                            names="Canva, Figma"
                        />
                        <TechSkillItem
                            title="Office & Productivity"
                            logos={[{src: 'office.png', alt: 'Microsoft Office', href: 'https://www.office.com'}, {src: 'google.png', alt: 'Google Workspace', href: 'https://workspace.google.com'}]}
                            names="Microsoft Office Suite, Google Workplace"
                        />
                        <TechSkillItem
                            title="Web Development"
                            logos={[{src: 'wordpress.png', alt: 'Wordpress', href: 'https://wordpress.org'}, {src: 'nextjs.png', alt: 'Next.js', href: 'https://nextjs.org'}]}
                            names="Wordpress, Next.js"
                        />
                        <TechSkillItem
                            title="Data Analysis"
                            logos={[{src: 'stata.png', alt: 'Stata', href: 'https://en.wikipedia.org/wiki/Stata'}, {src: 'spss.png', alt: 'SPSS', href: 'https://en.wikipedia.org/wiki/SPSS'}]}
                            names="Stata, SPSS"
                        />
                        <div className="md:col-span-2">
                            <TechSkillItem
                                title="Data Visualization"
                                logos={[{src: 'powerbi.png', alt: 'Power BI', href: 'https://www.microsoft.com/en-us/power-platform/products/power-bi'}]}
                                names="Power BI"
                            />
                        </div>
                        <div className="md:col-span-2">
                             <TechSkillItem
                                title="IT Support"
                                logos={[{src: 'computer.png', alt: 'Computer Hardware', href: '#'}]}
                                names="Proficient in building computers from scratch and disassembling hardware components. Skilled at diagnosing and resolving both hardware and software issues, providing comprehensive IT support from physical assembly to troubleshooting"
                            />
                        </div>
                    </div>
                </div>
            </>
        )}

        {activeTab === 'certificates' && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Certifications</h2>
            <div className="space-y-8">
              {certificates.map((cert: Certificate, index: number) => (
                <div key={index} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 flex flex-col sm:flex-row items-start gap-6">
                  {cert.fields.certificateImage && (
                    <div className="flex-shrink-0 w-full sm:w-24">
                      <Image
                        src={`https:${cert.fields.certificateImage.fields.file.url}`}
                        alt={cert.fields.certificateImage.fields.title}
                        width={96}
                        height={96}
                        className="rounded-md object-contain mx-auto"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="font-bold text-xl">{cert.fields.title}</h3>
                    <p className="text-neutral-400">{cert.fields.issuingBody}</p>
                    {cert.fields.description && (
                      <div className="prose prose-sm prose-invert text-neutral-300 mt-2">
                        {documentToReactComponents(cert.fields.description)}
                      </div>
                    )}
                    {cert.fields.credentialUrl && (
                      <a href={cert.fields.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm mt-3 inline-block">
                        View Credential &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- BOTTOM TAB BUTTONS --- */}
      <div className="mt-16">
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}