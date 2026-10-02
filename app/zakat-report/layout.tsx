import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Zakat Report Generator - IFA Consultancy',
  },
  description: 'Internal tool for Zakat Report Generation',
  openGraph: {
    title: 'Zakat Report Generator - IFA Consultancy',
    description: 'Internal tool for Zakat Report Generation',
    type: 'website',
    images: [
      {
        url: '/IFA%20Logo%20Alone.png',
        alt: 'IFA Consultancy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zakat Report Generator - IFA Consultancy',
    description: 'Internal tool for Zakat Report Generation',
    images: ['/IFA%20Logo%20Alone.png'],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': 0,
      'max-image-preview': 'none',
      'max-snippet': 0,
    },
  },
};

export default function ZakatReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-[#F8FAF9] dark:bg-[#0B0F0D] text-zinc-900 dark:text-zinc-100 transition-colors selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-200'>
      {children}
    </div>
  );
}
