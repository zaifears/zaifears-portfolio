"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import PortfolioContent from '../design-portfolio/PortfolioContent';

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

const workplaceEntries = [
  {
    company: 'EY Bangladesh',
    role: 'Audit Associate | Islam Hoque Hanif & Co. (EY Member Firm in Bangladesh)',
    range: 'September 2026 - Present',
    link: 'mailto:shahoriar.hossain@bd.ey.com',
    linkLabel: 'shahoriar.hossain@bd.ey.com',
    logo: {
      src: 'https://i.ibb.co.com/xtF7LGKn/EY-logo.png',
      alt: 'EY logo',
      logoLink: 'https://www.ey.com/en_bd',
      width: 120,
      height: 60,
      containerClass: 'w-[120px] h-[60px]',
    },
    summary:
      'Supporting statutory audit and assurance engagements as an Audit Associate at Islam Hoque Hanif & Co., the EY member firm in Bangladesh.',
  },
  {
    company: 'bKash',
    role: 'bnext Intern | AML & CFT Department, External and Corporate Affairs',
    range: 'May 2026 - August 2026',
    link: 'mailto:shahoriar.int.ecad@bKash.com',
    linkLabel: 'shahoriar.int.ecad@bKash.com',
    logo: {
      src: '/skills/bkash.png',
      alt: 'bKash logo',
      logoLink: 'https://www.bkash.com',
      width: 120,
      height: 60,
      containerClass: 'w-[120px] h-[60px]',
    },
    summary:
      'Monitored financial transactions to mitigate risks and ensure strict AML/CFT compliance while supporting regulatory reporting and data analysis utilizing Excel and Python. Streamlined corporate affairs workflows, utilizing advanced data tools to enhance departmental risk management efficiency and reporting accuracy.',
  },
  {
    company: 'IFA Consultancy',
    role: 'Intern - Business Development',
    range: 'December 01, 2025 - May 2026',
    link: 'mailto:shahoriar@ifacbd.com',
    linkLabel: 'shahoriar@ifacbd.com',
    logo: {
      src: '/skills/ifac-logo-job.png',
      alt: 'IFA Consultancy logo',
      logoLink: 'https://ifacbd.com',
      width: 80,
      height: 80,
      containerClass: 'w-[80px] h-[80px]',
    },
    summary:
      'Collaborate with cross-functional teams on high-ROI advisory and corporate compliance projects for enterprise and banking clients. Assist the commercialization of 25+ professional programs, leveraging AI-driven tools to solve operational bottlenecks and drive business development outcomes.',
  },
];

const VALID_TABS = ['workplace', 'skills', 'certificates', 'designPortfolio'] as const;
type Tab = (typeof VALID_TABS)[number];

const SkillItem = ({ icon, name }: { icon: string; name: string }) => (
  <div className="group bg-gray-50 dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 text-center hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800/50 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-gray-200 dark:group-hover:bg-gray-700/50 transition-colors duration-300">
      <div className="relative w-10 h-10">
        <Image
          src={`/${icon}`}
          alt={`${name} icon`}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </div>
    <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
      {name}
    </h3>
  </div>
);

const TechSkillItem = ({
  title,
  logos,
  names,
}: {
  title: string;
  logos: { src: string; alt: string; href: string }[];
  names: string;
}) => (
  <div className="group bg-gray-50 dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 text-center h-full flex flex-col hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
      {title}
    </h3>
    <div className="flex justify-center items-center gap-4 my-auto grow">
      {logos.map((logo) => (
        <a
          key={logo.src}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={logo.alt}
          title={logo.alt}
          className="transition-opacity hover:opacity-75"
        >
          <div className="relative h-12 w-20 min-w-18">
            <Image src={`/${logo.src}`} alt={logo.alt} fill className="object-contain" />
          </div>
        </a>
      ))}
    </div>
    <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">{names}</p>
  </div>
);

const TabButtons = ({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) => {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'workplace', label: 'Workplace' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certifications' },
    { id: 'designPortfolio', label: 'Design Portfolio' },
  ];

  return (
    <div
      role="tablist"
      aria-label="Skills sections"
      // Grid on mobile so both columns line up evenly; flex-wrap once there's room for all tabs in a row
      className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center mb-12 bg-gray-100 dark:bg-gray-900/50 dark:backdrop-blur-sm rounded-2xl p-2 gap-2 sm:gap-4 sm:max-w-fit mx-auto border border-gray-200 dark:border-gray-800"
    >
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          role="tab"
          aria-selected={activeTab === id ? 'true' : 'false'}
          aria-controls={`tabpanel-${id}`}
          onClick={() => onTabChange(id)}
          className={`whitespace-nowrap text-center px-4 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
            activeTab === id
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
              : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800/50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default function SkillsTabs({ certificates }: SkillsTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('workplace');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Tab;
      if (VALID_TABS.includes(hash)) {
        setActiveTab(hash);
      } else if (!window.location.hash) {
        setActiveTab('workplace');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    window.history.pushState(null, '', `#${tab}`);
    window.dispatchEvent(new Event('hashchange'));
  };

  return (
    <>
      <TabButtons activeTab={activeTab} onTabChange={handleTabChange} />

      <div>
        {/* Workplace */}
        <div
          id="tabpanel-workplace"
          role="tabpanel"
          aria-label="Workplace"
          className={`max-w-5xl mx-auto ${activeTab === 'workplace' ? 'block' : 'hidden'}`}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-3">Workplace Timeline</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Roles and organizations I am currently working with and have worked with.
            </p>
          </div>
          <div className="border-l border-gray-200 dark:border-gray-800 pl-6 space-y-8">
            {workplaceEntries.map((entry) => (
              <div key={entry.company} className="relative">
                <div className="-left-2.25 absolute top-2 h-3 w-3 rounded-full bg-blue-600" />
                <div className="bg-gray-50 dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {entry.company}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">{entry.role}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {entry.range}
                      </span>
                      {entry.logo && (
                        <a
                          href={entry.logo.logoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${entry.company} website`}
                          title={entry.company}
                          className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white p-3 transition-transform duration-300 hover:scale-[1.03] flex items-center justify-center shrink-0 ${entry.logo.containerClass}`}
                        >
                          <Image
                            src={entry.logo.src}
                            alt={entry.logo.alt}
                            width={entry.logo.width}
                            height={entry.logo.height}
                            className="h-full w-full rounded-xl object-contain"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                  {entry.summary && (
                    <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                      {entry.summary}
                    </p>
                  )}
                  <a
                    href={entry.link}
                    target={entry.link.startsWith('mailto:') ? undefined : '_blank'}
                    rel={
                      entry.link.startsWith('mailto:') ? undefined : 'me noopener noreferrer'
                    }
                    aria-label={`${entry.company} — ${entry.linkLabel}`}
                    title={entry.linkLabel}
                    className="inline-flex flex-wrap items-center gap-2 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors duration-300 mt-4 text-sm"
                  >
                    <span>{entry.linkLabel}</span>
                    {!entry.link.startsWith('mailto:') && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new URL(entry.link).hostname.replace('www.', '')}
                      </span>
                    )}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div
          id="tabpanel-skills"
          role="tabpanel"
          aria-label="Skills"
          className={activeTab === 'skills' ? 'block' : 'hidden'}
        >
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <TechSkillItem
                title="AI Workflow Automation"
                logos={[
                  { src: 'skills/chatgpt.png', alt: 'ChatGPT', href: 'https://openai.com/chatgpt' },
                  { src: 'skills/claude.png', alt: 'Claude AI', href: 'https://www.claude.ai/' },
                  { src: 'skills/gemini.png', alt: 'Google Gemini', href: 'https://gemini.google.com/' },
                ]}
                names="Using AI to streamline development, research, documentation, and productivity workflows."
              />
              <TechSkillItem
                title="Data Visualization & Business Intelligence"
                logos={[
                  {
                    src: 'skills/powerbi.png',
                    alt: 'Power BI',
                    href: 'https://www.microsoft.com/en-us/power-platform/products/power-bi',
                  },
                ]}
                names="Power BI dashboards, KPIs, and actionable business insights"
              />
              <TechSkillItem
                title="Financial Modeling"
                logos={[
                  { src: 'skills/financial_modeling.png', alt: 'Financial Modeling', href: '#' },
                ]}
                names="Valuation models, forecasting, budgeting, NPV, DCF, sensitivity analysis, and scenario analysis."
              />
              <TechSkillItem
                title="Office & Productivity"
                logos={[
                  { src: 'skills/office.png', alt: 'Microsoft Office', href: 'https://www.office.com' },
                  { src: 'skills/google.png', alt: 'Google Workspace', href: 'https://workspace.google.com' },
                ]}
                names="Microsoft Office Suite, Google Workspace"
              />
              <TechSkillItem
                title="Data Analysis"
                logos={[
                  { src: 'skills/stata.png', alt: 'Stata', href: 'https://en.wikipedia.org/wiki/Stata' },
                  { src: 'skills/spss.png', alt: 'SPSS', href: 'https://en.wikipedia.org/wiki/SPSS' },
                ]}
                names="Stata, SPSS"
              />
              <TechSkillItem
                title="IT Support"
                logos={[{ src: 'skills/computer.png', alt: 'Computer Hardware', href: '#' }]}
                names="Proficient in building computers from scratch and disassembling hardware components. Skilled at diagnosing and resolving both hardware and software issues."
              />
              <TechSkillItem
                title="Web Development"
                logos={[
                  { src: 'skills/wordpress.png', alt: 'WordPress', href: 'https://wordpress.org' },
                  { src: 'skills/nextjs.png', alt: 'Next.js', href: 'https://nextjs.org' },
                ]}
                names="WordPress, Next.js"
              />
              <TechSkillItem
                title="Design"
                logos={[
                  { src: 'skills/canva.png', alt: 'Canva', href: 'https://www.canva.com' },
                  { src: 'skills/figma.png', alt: 'Figma', href: 'https://www.figma.com' },
                ]}
                names="Canva, Figma"
              />
            </div>
          </div>
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Core Competencies</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillItem icon="skills/problem.png" name="Problem-Solving" />
              <SkillItem icon="skills/entrepreneurial.png" name="Entrepreneurial Mindset" />
              <SkillItem icon="skills/analysis.png" name="Analysis & Research" />
              <SkillItem icon="skills/financial.png" name="Financial & Economic Analysis" />
              <SkillItem icon="skills/leadership.png" name="Leadership & Collaboration" />
              <SkillItem icon="skills/presentation.png" name="Presentation & Communication" />
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div
          id="tabpanel-certificates"
          role="tabpanel"
          aria-label="Certifications"
          className={`space-y-6 max-w-6xl mx-auto ${activeTab === 'certificates' ? 'block' : 'hidden'}`}
        >
          {certificates.map((cert: Certificate, index: number) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
            >
              {cert.fields.certificateImage && (
                <div className="shrink-0 w-full sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-xl p-2 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700/50 transition-colors duration-300">
                  <Image
                    src={`https:${cert.fields.certificateImage.fields.file.url}`}
                    alt={cert.fields.certificateImage.fields.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              )}
              <div className="grow">
                <h3 className="font-bold text-xl mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {cert.fields.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{cert.fields.issuingBody}</p>
                {cert.fields.description && (
                  <div className="prose prose-sm prose-invert text-gray-700 dark:text-gray-300 mt-2">
                    {documentToReactComponents(cert.fields.description)}
                  </div>
                )}
                {cert.fields.credentialUrl && (
                  <a
                    href={cert.fields.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View credential for ${cert.fields.title}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors duration-300 mt-4 text-sm"
                  >
                    Verify credential
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Design Portfolio */}
        <div
          id="tabpanel-designPortfolio"
          role="tabpanel"
          aria-label="Design Portfolio"
          className={activeTab === 'designPortfolio' ? 'block' : 'hidden'}
        >
          <PortfolioContent />
        </div>
      </div>
    </>
  );
}