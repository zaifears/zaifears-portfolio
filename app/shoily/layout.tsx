import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A Special Surprise',
  description: 'A private birthday surprise.',
  openGraph: {
    title: 'A Special Surprise',
    description: 'A private birthday surprise.',
    images: [
      {
        url: '/shoily/hbd_shoily.png',
        alt: 'Happy Birthday Shoily',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Special Surprise',
    description: 'A private birthday surprise.',
    images: ['/shoily/hbd_shoily.png'],
  },
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

export default function ShoilyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
