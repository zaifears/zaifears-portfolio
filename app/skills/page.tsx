// app/skills/page.tsx
import Link from 'next/link';
import { contentfulClient } from '@/lib/contentfulClient';
import SkillsTabs from './SkillsTabs'; // Assumes SkillsTabs.tsx is in the same folder

export const revalidate = 60;

// Certificate data structure
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

// Function to fetch certificates
async function getCertificates(): Promise<Certificate[]> {
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

// Main page component (Server)
export default async function SkillsPage() {
  const certificates = await getCertificates();

  return (
    <section>
      <h1 className="font-bold text-3xl text-center mb-12">Skills & Certifications</h1>
      
      <SkillsTabs certificates={certificates} />

      {/* Contact Me Button */}
      <div className="text-center mt-16">
        <Link
          href="/contact"
          className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-full text-lg
                     transition-all duration-300 hover:bg-blue-700 hover:scale-105 shadow-lg"
        >
          Contact Me
        </Link>
      </div>

      {/* Icon Attribution */}
      <div className="text-center mt-12">
        <p className="text-xs text-neutral-400 dark:text-neutral-600">
          Icons and logos sourced from <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">Flaticon</a>.
        </p>
      </div>
    </section>
  );
}