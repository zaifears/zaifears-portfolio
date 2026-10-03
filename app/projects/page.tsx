import { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';

const baseUrl = 'https://shahoriar.bd';

export const metadata: Metadata = {
  title: 'Software Projects & Developer Tools',
  description:
    'A catalog of independent software products, statutory compliance engines, and desktop utilities spanning Tapo-Viewer, Bangladesh Youth Tax Calculator, LocReminder, and financial simulators.',
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
  openGraph: {
    title: 'Software Projects & Developer Tools',
    description:
      'A catalog of independent software products, statutory compliance engines, and desktop utilities spanning Tapo-Viewer, Bangladesh Youth Tax Calculator, LocReminder, and financial simulators.',
    url: `${baseUrl}/projects`,
    siteName: 'Software Projects & Tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Projects & Developer Tools',
    description:
      'A catalog of independent software products, statutory compliance engines, and desktop utilities spanning Tapo-Viewer, Bangladesh Youth Tax Calculator, LocReminder, and financial simulators.',
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
              { '@type': 'ListItem', position: 2, name: 'Projects', item: `${baseUrl}/projects` },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Software Projects, Tools & Utilities',
            description:
              'A directory of independent open-source software applications, statutory compliance engines, and desktop utilities.',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@type': 'SoftwareApplication',
                  name: 'Bangladesh Youth Tax Calculator',
                  url: `${baseUrl}/projects/youth-tax-calculator`,
                  applicationCategory: 'FinanceApplication',
                  operatingSystem: 'Cross-platform (Python 3 / AI Agent Skill)',
                  description:
                    'AI Agent Skill and statutory calculation engine for students and interns filing on etaxnbr.gov.bd under Income Tax Act 2023 with zero-difference balance sheet reconciliation.',
                },
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@type': 'SoftwareApplication',
                  name: 'Tapo-Viewer',
                  url: `${baseUrl}/projects/tapo-viewer`,
                  applicationCategory: 'MultimediaApplication',
                  operatingSystem: 'Windows 10, Windows 11',
                  description:
                    'Windows desktop application for streaming live TP-Link Tapo camera feeds in 1080p and downloading MicroSD recordings without cloud subscriptions.',
                },
              },
              {
                '@type': 'ListItem',
                position: 3,
                item: {
                  '@type': 'SoftwareApplication',
                  name: 'LocReminder',
                  url: `${baseUrl}/projects/locreminder`,
                  applicationCategory: 'TravelApplication',
                  operatingSystem: 'Android 6.0+',
                  description:
                    'Location-based GPS alarm app for Android that wakes commuters and travellers when arriving at their destination with zero data tracking.',
                },
              },
            ],
          }),
        }}
      />

      {/* Animated gradient background */}
      <div className="fixed inset-0 md:left-64 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob will-change-transform" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 will-change-transform" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <ProjectsContent />
      </div>
    </div>
  );
}
