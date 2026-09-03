import './global.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import LayoutWrapper from './LayoutWrapper';
import { ClarityInitializer } from './components/ClarityInitializer';

const baseUrl = 'https://shahoriar.bd';
const authorName = 'Md Al Shahoriar Hossain';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: 'Md Al Shahoriar Hossain | Portfolio & Projects',
    template: '%s | Md Al Shahoriar Hossain',
  },

  description:
    'Professional portfolio of Md Al Shahoriar Hossain, a Finance and Banking graduate from BUP, software developer, and founder of StockSimulatorBD. Currently an Audit Associate at EY Bangladesh (Islam Hoque Hanif & Co.).',

  keywords: [
    'Md Al Shahoriar Hossain',
    'Shahoriar Hossain',
    'zaifears',
    'Shahoriar BUP',
    'Finance Professional',
    'Finance and Banking',
    'Web Developer',
    'Next.js Developer',
    'EY Bangladesh',
    'Islam Hoque Hanif & Co.',
    'Audit Associate',
    'bKash',
    'bNext Intern',
    'StockSimulatorBD',
    'DSE paper trading simulator',
    'Bangladesh',
    'IFA Consultancy',
  ],

  authors: [
    {
      name: authorName,
      url: baseUrl,
    },
  ],

  creator: authorName,

  publisher: authorName,

  category: 'Portfolio',

  other: {
    citation_author: authorName,
    'DC.creator': authorName,
    'DC.title': 'Md Al Shahoriar Hossain | Portfolio & Projects',
    'DC.language': 'en',
  },

  openGraph: {
    title: 'Md Al Shahoriar Hossain | Portfolio',
    description:
      'Professional portfolio showcasing finance, technology, software development, projects, and professional insights.',
    url: baseUrl,
    siteName: authorName,
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Md Al Shahoriar Hossain — Finance Professional and Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Md Al Shahoriar Hossain | Portfolio',
    description:
      'Finance, technology, web development, and professional insights from Md Al Shahoriar Hossain.',
    images: ['/opengraph-image.png'],
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

  icons: {
    icon: '/favicon.ico',
    apple: [
      '/apple-touch-icon-iphone-60x60.png',
      '/apple-touch-icon-ipad-76x76.png',
      '/apple-touch-icon-iphone-retina-120x120.png',
      '/apple-touch-icon-ipad-retina-152x152.png',
    ],
  },

  manifest: '/manifest.webmanifest',

  verification: {
    google: 'pT4MHjovbY0MXYCrgAPN3LQHyTuLLq_iTtmWyx3GSgc',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${baseUrl}/#person`,
  name: authorName,
  alternateName: ['Shahoriar Hossain', 'zaifears'],
  url: `${baseUrl}/`,
  image: `${baseUrl}/images/shahoriar-author.jpg`,
  jobTitle: 'Audit Associate and Web Developer',
  description:
    'Md Al Shahoriar Hossain is an Audit Associate at EY Bangladesh (Islam Hoque Hanif & Co.), Chartered Accountancy candidate, and self-taught web developer based in Dhaka, Bangladesh.',
  email: 'alshahoriar.hossain@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Islam Hoque Hanif & Co.',
    alternateName: 'EY Bangladesh',
    url: 'https://www.ey.com/en_bd',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Bangladesh University of Professionals',
  },
  knowsAbout: [
    'Finance and Banking',
    'Financial Analysis',
    'Financial Modeling',
    'AML/CFT Compliance',
    'KYC Quality Assurance',
    'Web Development',
    'TypeScript',
    'Next.js',
    'React',
    'Contentful',
    'Power BI',
    'Microsoft Excel',
  ],
  sameAs: [
    'https://github.com/zaifears',
    'https://www.linkedin.com/in/shahoriarhossain/',
    'https://facebook.com/alshahoriar.hossain',
    'https://www.youtube.com/@takatunes',
  ],
  subjectOf: [
  {
    '@type': 'WebPage',
    name: 'AI-Readable Professional Profile',
    url: `${baseUrl}/ai`,
  },
  {
    '@type': 'WebPage',
    name: 'Resume',
    url: `${baseUrl}/resume.md`,
  },
  {
    '@type': 'Article',
    url: 'https://bup.edu.bd/news/details/944',
  },
  {
    '@type': 'Article',
    url: 'https://bup.edu.bd/news/details/936',
  },
  {
    '@type': 'Article',
    url: 'https://businessinspection.com.bd/finact-brac-university-hosts-excelerate-2025-excel-competition/',
  },
],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  name: authorName,
  url: baseUrl,
  description:
    'Professional portfolio, projects, writing, and technical experiments by Md Al Shahoriar Hossain.',
  inLanguage: 'en',
  publisher: {
    '@id': `${baseUrl}/#person`,
  },
};

const cx = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cx(GeistSans.variable, GeistMono.variable)}
    >
      <head>
        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Shahoriar Hossain"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(
              /</g,
              '\\u003c'
            ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(
              /</g,
              '\\u003c'
            ),
          }}
        />

        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(() => {});
              });
            }
          `}
        </Script>
      </head>

      <body className="bg-white text-black antialiased transition-colors duration-300 dark:bg-black dark:text-white">
        <ClarityInitializer />

        <LayoutWrapper>{children}</LayoutWrapper>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}