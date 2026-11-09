import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Competitions',
  description: 'Case solutions, financial models, and strategic decks from national business competitions.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function BizCompLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
