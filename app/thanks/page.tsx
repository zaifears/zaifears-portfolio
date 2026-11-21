import { Metadata } from 'next';
import ThanksClient from './ThanksClient';

export const metadata: Metadata = {
  title: 'Thank You | Support Shahoriar on SupportKori',
  description:
    'Support Md Al Shahoriar Hossain and his free tools directly via SupportKori (supportkori.com/zaifears — like Buy Me a Coffee for Bangladesh) or via BanglaQR, bKash, Eastern Bank PLC, Wise, Remitly, and PayPal Xoom.',
  alternates: {
    canonical: 'https://shahoriar.bd/thanks',
  },
  openGraph: {
    title: 'Thank You | Support Shahoriar on SupportKori',
    description:
      'Support Md Al Shahoriar Hossain and his free projects directly through SupportKori (supportkori.com/zaifears), BanglaQR, bKash, Bank Transfer, or international remittance.',
    url: 'https://shahoriar.bd/thanks',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Thank You | Support Shahoriar on SupportKori',
    description:
      'Support my free tools via SupportKori (like Buy Me a Coffee for Bangladesh) or direct payment methods.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://shahoriar.bd/thanks#webpage',
      url: 'https://shahoriar.bd/thanks',
      name: 'Thank You | Support Shahoriar on SupportKori',
      description:
        'Support Md Al Shahoriar Hossain and his free tools directly via SupportKori (supportkori.com/zaifears) or via BanglaQR, bKash, Eastern Bank PLC, Wise, Remitly, and PayPal Xoom.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://shahoriar.bd/#website',
        name: 'Shahoriar Hossain',
        url: 'https://shahoriar.bd',
      },
      about: {
        '@type': 'Person',
        '@id': 'https://shahoriar.bd/#person',
        name: 'Md Al Shahoriar Hossain',
        url: 'https://shahoriar.bd',
      },
      sameAs: ['https://www.supportkori.com/zaifears'],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://shahoriar.bd/thanks#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://shahoriar.bd',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Support & Thanks',
          item: 'https://shahoriar.bd/thanks',
        },
      ],
    },
  ],
};

export default function ThanksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ThanksClient />
    </>
  );
}
