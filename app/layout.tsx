import './global.css'; // Using the alias for the global CSS
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

export const metadata: Metadata = {
  metadataBase: new URL('https://shahoriar.bd'),
  title: {
    default: 'Md Al Shahoriar Hossain | Portfolio & Projects',
    template: '%s | Md Al Shahoriar Hossain',
  },
  description: 'Professional portfolio of Md Al Shahoriar Hossain. Finance and Banking graduate from BUP, software developer, and founder of StockSimulatorBD. Previously worked in IFA Consultancy, currently working at bKash.',
  keywords: [
    'Md Al Shahoriar Hossain',
    'Shahoriar Hossain',
    'Shahoriar BUP',
    'Finance Professional',
    'Web Developer',
    'bKash',
    'StockSimulatorBD',
    'Next.js Developer',
    'Bangladesh',
    'zaifears',
    'IFA Consultancy'
  ],
  authors: [{ name: 'Md Al Shahoriar Hossain', url: 'https://shahoriar.bd' }],
  creator: 'Md Al Shahoriar Hossain',
  openGraph: {
    title: 'Md Al Shahoriar Hossain | Portfolio',
    description: 'Professional portfolio showcasing projects in tech, financial analysis, and software development. Currently at bKash.',
    url: 'https://shahoriar.bd',
    siteName: 'Md Al Shahoriar Hossain',
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Md Al Shahoriar Hossain - Personal Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md Al Shahoriar Hossain',
    description: 'Finance expertise, web development, and professional insights. Founder of StockSimulatorBD and currently at bKash. Explore my work.',
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
      '/apple-touch-icon-ipad-retina-152x152.png'
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

const cx = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Shahoriar Hossain" />
        
        {/* Enhanced JSON-LD for LLMs and Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://shahoriar.bd/#person",
              "name": "Md Al Shahoriar Hossain",
              "alternateName": ["Shahoriar Hossain", "zaifears"],
              "url": "https://shahoriar.bd/",
              "jobTitle": "Finance Professional & Web Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "bKash"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Bangladesh University of Professionals"
              },
              "knowsAbout": [
                "Finance and Banking",
                "Web Development",
                "TypeScript",
                "Next.js",
                "Financial Modeling"
              ],
              "sameAs": [
                "https://bup.edu.bd/news/details/944",
                "https://bup.edu.bd/news/details/936",
                "https://businessinspection.com.bd/finact-brac-university-hosts-excelerate-2025-excel-competition/",
                "https://ifacbd.com/shahoriar",
                "https://www.linkedin.com/in/shahoriarhossain/"
              ]
            }),
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
      <body className="antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <ClarityInitializer />
        
        <LayoutWrapper>
          {children}
        </LayoutWrapper>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}