import Link from 'next/link';
import { contentfulClient } from '@/lib/contentfulClient';
import SkillsTabs from './SkillsTabs';

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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* --- EDITED: Reduced top section size --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Skills & Certifications</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my core competencies, technical abilities, and professional qualifications.
          </p>
        </div>
        
        <SkillsTabs certificates={certificates} />

        {/* --- Restyled Call to Action --- */}
        <div className="text-center mt-20">
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Have a Project in Mind?</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Let's connect and discuss how my skills can help bring your ideas to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-blue-600/25"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

