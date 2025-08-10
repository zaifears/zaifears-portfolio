// app/skills/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { contentfulClient } from '@/lib/contentfulClient';

// --- UPDATED CERTIFICATE DATA STRUCTURE ---
interface Certificate {
  fields: {
    title: string;
    issuingBody: string;
    date: string;
    description?: string; // Added the optional description field
    credentialUrl?: string;
    certificateImage?: {
      fields: {
        file: { url: string };
        title: string;
      };
    };
  };
}

// --- FUNCTION TO FETCH CERTIFICATES ---
async function getCertificates() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'certificate',
      order: ['-fields.date'],
    });
    return response.items as unknown as Certificate[];
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
}


// --- EXISTING SKILL COMPONENTS (NO CHANGES) ---
const SkillItem = ({ icon, name }: { icon: string; name: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="relative w-20 h-20 mb-2">
      <Image
        src={`/${icon}`}
        alt={`${name} icon`}
        width={80}
        height={80}
        className="object-contain"
      />
    </div>
    <p className="font-semibold text-neutral-700 dark:text-neutral-300">{name}</p>
  </div>
);

const TechSkillItem = ({ title, logos, names }: { title: string; logos: { src: string, alt: string, href: string }[]; names: string }) => (
    <div className="flex flex-col items-center text-center p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg h-full">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="flex justify-center items-center gap-4 mb-2 flex-grow">
            {logos.map(logo => (
                <a
                    key={logo.src}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-75"
                >
                    <div className="relative h-12 w-12">
                         <Image src={`/${logo.src}`} alt={logo.alt} fill objectFit="contain" />
                    </div>
                </a>
            ))}
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 mt-auto">{names}</p>
    </div>
);


// --- MAIN PAGE COMPONENT ---
export default async function SkillsPage() {
  const certificates = await getCertificates();

  return (
    <section>
      <h1 className="font-bold text-3xl text-center mb-12">Skills</h1>

      {/* --- Core Competencies Section (Existing) --- */}
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

      {/* --- Technical Skills Section (Existing) --- */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <TechSkillItem
                title="Design"
                logos={[
                    {src: 'canva.png', alt: 'Canva', href: 'https://www.canva.com'},
                    {src: 'figma.png', alt: 'Figma', href: 'https://www.figma.com'}
                ]}
                names="Canva, Figma"
            />
            <TechSkillItem
                title="Office & Productivity"
                logos={[
                    {src: 'office.png', alt: 'Microsoft Office', href: 'https://www.office.com'},
                    {src: 'google.png', alt: 'Google Workspace', href: 'https://workspace.google.com'}
                ]}
                names="Microsoft Office Suite, Google Workplace"
            />
            <TechSkillItem
                title="Web Development"
                logos={[
                    {src: 'wordpress.png', alt: 'Wordpress', href: 'https://wordpress.org'},
                    {src: 'nextjs.png', alt: 'Next.js', href: 'https://nextjs.org'}
                ]}
                names="Wordpress, Next.js"
            />
            <TechSkillItem
                title="Data Analysis"
                logos={[
                    {src: 'stata.png', alt: 'Stata', href: 'https://en.wikipedia.org/wiki/Stata'},
                    {src: 'spss.png', alt: 'SPSS', href: 'https://en.wikipedia.org/wiki/SPSS'}
                ]}
                names="Stata, SPSS"
            />
            <div className="md:col-span-2">
                <TechSkillItem
                    title="Data Visualization"
                    logos={[
                        {src: 'powerbi.png', alt: 'Power BI', href: 'https://www.microsoft.com/en-us/power-platform/products/power-bi'}
                    ]}
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

      {/* --- UPDATED CERTIFICATIONS SECTION --- */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Certifications</h2>
        <div className="space-y-8 max-w-4xl mx-auto">
          {certificates.map((cert, index) => (
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
                {/* --- Display the new description field --- */}
                {cert.fields.description && (
                  <p className="text-neutral-300 mt-2 text-sm">{cert.fields.description}</p>
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

      {/* --- Contact Me Button (Existing) --- */}
      <div className="text-center mt-16">
        <Link
          href="/contact"
          className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-full text-lg
                     transition-all duration-300 hover:bg-blue-700 hover:scale-105 shadow-lg"
        >
          Contact Me
        </Link>
      </div>

      {/* --- Icon Attribution (Existing) --- */}
      <div className="text-center mt-12">
        <p className="text-xs text-neutral-400 dark:text-neutral-600">
          Icons and logos sourced from <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">Flaticon</a>.
        </p>
      </div>
    </section>
  );
}