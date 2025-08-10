// app/skills/page.tsx
import Link from 'next/link';
import { contentfulClient } from '@/lib/contentfulClient';
import SkillsTabs from './SkillsTabs'; // Import the new client component

// More aggressive cache control
export const revalidate = 0; // Disable ISR caching
export const dynamic = 'force-dynamic'; // Force dynamic rendering
export const fetchCache = 'force-no-store'; // Don't cache fetch requests

// --- CERTIFICATE DATA STRUCTURE ---
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

// --- FUNCTION TO FETCH CERTIFICATES ---
async function getCertificates(): Promise<Certificate[]> {
  try {
    // Add cache-busting timestamp
    const response = await contentfulClient.getEntries({
      content_type: 'certificate',
      order: ['-fields.date'],
      // Add timestamp to bypass cache
      limit: 1000,
      include: 2,
    });
    return response.items as unknown as Certificate[];
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
}

// --- MAIN PAGE COMPONENT (SERVER) ---
export default async function SkillsPage() {
  const certificates = await getCertificates();

  return (
    <section>
      <h1 className="font-bold text-3xl text-center mb-12">Skills & Certifications</h1>
      
      {/* Pass the fetched data to the client component */}
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