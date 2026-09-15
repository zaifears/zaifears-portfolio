import { Metadata } from 'next';
import ThanksClient from './ThanksClient';

export const metadata: Metadata = {
  title: 'Thank You | Support My Projects & Tools',
  description:
    'Did you love using any of my apps? Thank you very much. I enjoy solving problems and building free tools for people. Direct payment and remittance guide for bKash, Standard Chartered Bank, Wise, Remitly, PayPal (Xoom), and Revolut.',
  alternates: {
    canonical: 'https://shahoriar.bd/thanks',
  },
  openGraph: {
    title: 'Thank You | Support My Projects & Tools',
    description:
      'Did you love using any of my apps? Thank you very much. I enjoy solving problems and building free tools for people. Direct payment and remittance guide for bKash, Standard Chartered Bank, Wise, Remitly, PayPal (Xoom), and Revolut.',
    url: 'https://shahoriar.bd/thanks',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Thank You | Support My Projects & Tools',
    description:
      'Did you love using any of my apps? Thank you very much. I enjoy solving problems and building free tools for people.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://shahoriar.bd/thanks#webpage',
      url: 'https://shahoriar.bd/thanks',
      name: 'Thank You | Support My Projects & Tools',
      description:
        'Did you love using any of my apps? Thank you very much. I enjoy solving problems and building free tools for people. Direct payment and remittance guide for bKash, Standard Chartered Bank, Wise, Remitly, PayPal (Xoom), and Revolut.',
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
