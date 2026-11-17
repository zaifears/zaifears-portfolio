import type { Metadata } from 'next';

const baseUrl = 'https://shahoriar.bd';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: 'Software Projects, Tools & Open Source Utilities',
    template: '%s',
  },

  description:
    'Independent software products, statutory compliance engines, and developer tools including TapFeed (formerly Tapo-Viewer), LocReminder, and Bangladesh Youth Tax Calculator.',

  category: 'SoftwareApplication',

  openGraph: {
    title: 'Software Projects & Developer Tools',
    description:
      'Independent software products, statutory compliance engines, and desktop utilities including TapFeed (formerly Tapo-Viewer), LocReminder, and Bangladesh Youth Tax Calculator.',
    url: `${baseUrl}/projects`,
    siteName: 'Software Projects & Tools',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Software Projects & Developer Tools',
    description:
      'Independent software products, statutory compliance engines, and desktop utilities including TapFeed (formerly Tapo-Viewer), LocReminder, and Bangladesh Youth Tax Calculator.',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
