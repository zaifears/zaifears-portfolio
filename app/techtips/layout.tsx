import type { Metadata } from 'next';

const baseUrl = 'https://shahoriar.bd';

export const metadata: Metadata = {
  title: 'Tech Tips & Utilities',
  description:
    'Curated collection of favorite software, productivity utilities, browser extensions, and developer scripts by Md Al Shahoriar Hossain.',
  alternates: {
    canonical: `${baseUrl}/techtips`,
  },
  openGraph: {
    title: 'Tech Tips & Utilities | Md Al Shahoriar Hossain',
    description:
      'Curated collection of favorite software, productivity utilities, browser extensions, and developer scripts by Md Al Shahoriar Hossain.',
    url: `${baseUrl}/techtips`,
    siteName: 'Md Al Shahoriar Hossain',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Tips & Utilities | Md Al Shahoriar Hossain',
    description:
      'Curated collection of favorite software, productivity utilities, browser extensions, and developer scripts by Md Al Shahoriar Hossain.',
  },
};

const techTipsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${baseUrl}/techtips#webpage`,
      url: `${baseUrl}/techtips`,
      name: 'Tech Tips & Utilities | Md Al Shahoriar Hossain',
      description:
        'Curated collection of favorite software, productivity utilities, Android FOSS apps, browser extensions, and PowerShell scripts by Md Al Shahoriar Hossain.',
      isPartOf: { '@id': `${baseUrl}/#website` },
      author: { '@id': `${baseUrl}/#person` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${baseUrl}/techtips#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Tech Tips & Utilities', item: `${baseUrl}/techtips` },
      ],
    },
  ],
};

export default function TechTipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(techTipsSchema).replace(/</g, '\\u003c'),
        }}
      />
      {children}
    </>
  );
}
