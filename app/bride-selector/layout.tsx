import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bride Selector',
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

export default function BrideSelectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
