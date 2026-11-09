import type { Metadata } from 'next';

const baseUrl = 'https://shahoriar.bd';

export const metadata: Metadata = {
  title: 'Online Python IDE & Code Runner',
  description:
    'Write, run, and test Python code online directly in your browser. Fast, interactive, and zero setup required.',
  alternates: {
    canonical: `${baseUrl}/ide`,
  },
  openGraph: {
    title: 'Online Python IDE & Code Runner | Md Al Shahoriar Hossain',
    description:
      'Write, run, and test Python code online directly in your browser. Fast, interactive, and zero setup required.',
    url: `${baseUrl}/ide`,
    siteName: 'Md Al Shahoriar Hossain',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Python IDE & Code Runner',
    description:
      'Write, run, and test Python code online directly in your browser.',
  },
};

const ideSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${baseUrl}/ide#webapp`,
      name: 'Online Python IDE & Code Runner',
      url: `${baseUrl}/ide`,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      description:
        'Interactive browser-based Python 3 IDE and code runner requiring zero local setup.',
      author: { '@id': `${baseUrl}/#person` },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${baseUrl}/ide#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Python IDE', item: `${baseUrl}/ide` },
      ],
    },
  ],
};

export default function IDELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ideSchema).replace(/</g, '\\u003c'),
        }}
      />
      {children}
    </>
  );
}
