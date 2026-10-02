import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'IFA Consultancy',
  },
  description: 'Internal tool for Zakat Calculation',
  openGraph: {
    title: 'IFA Consultancy',
    description: 'Internal tool for Zakat Calculation',
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
    title: 'IFA Consultancy',
    description: 'Internal tool for Zakat Calculation',
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

export default function ZakatCalculationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Zakat Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    description: 'Internal tool for Zakat calculation and reporting.',
    url: 'https://shahoriar.bd/zakat-calculation',
    creator: {
      '@type': 'Organization',
      name: 'IFA Consultancy',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='min-h-screen bg-[#F8FAF9] dark:bg-[#0B0F0D] text-zinc-900 dark:text-zinc-100 transition-colors selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-200'>{children}</div>
    </>
  );
}
