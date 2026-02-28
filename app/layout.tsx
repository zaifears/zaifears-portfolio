import './global.css'; // Using the alias for the global CSS

// we no longer globally override console – warnings are harmless and
// previous patch caused recursion with deprecation messages.

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import type { Metadata, Viewport } from 'next'; // Import Viewport type
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
// import { Navbar } from './components/nav'; // This is no longer needed here
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import LayoutWrapper from './LayoutWrapper'; // Import our new component using alias

export const metadata: Metadata = {
  title: {
    default: 'Md Al Shahoriar Hossain',
    template: '%s | Md Al Shahoriar Hossain',
  },
  keywords: [
    'Md Al Shahoriar Hossain',
    'Shahoriar Hossain',
    'Shahoriar BUP',
    'Shahoriar NDC',
    'Md Al Shahoriar Hossain BUP',
    'Md Al Shahoriar Hossain Finance',
    'Finance Professional',
    'Web Developer',
    'Bangladesh',
    'zaifears'
  ],
  description: "Shahoriar Hossain's personal portfolio and life log.",
  openGraph: {
    title: 'Shahoriar Hossain',
    description: 'Personal portfolio showcasing skills, projects, and life journey.',
    url: 'https://shahoriar.me',
    siteName: 'Shahoriar Hossain',
    images: [
      {
        url: 'https://shahoriar.me/shahoriar.jpg',
        width: 800,
        height: 800,
        alt: 'Portrait of Shahoriar Hossain',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md Al Shahoriar Hossain',
    description: 'Personal portfolio and life log by Md Al Shahoriar Hossain.',
    images: ['https://shahoriar.me/shahoriar.jpg'],
  },
  metadataBase: new URL('https://shahoriar.me'),
  other: {
    // structured data for search engines
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Md Al Shahoriar Hossain",
      "url": "https://shahoriar.me",
      "sameAs": [
        "https://www.linkedin.com/in/al-shahoriar/",
        "https://github.com/zaifears"
      ]
    })
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

// --- VIEWPORT MOVED HERE ---
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  maximumScale: 1,
  userScalable: false,
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
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-iphone-60x60.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-ipad-76x76.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-iphone-retina-120x120.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-ipad-retina-152x152.png" />
        <link rel="llm" href="/llm.txt" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F0NPB44JWC"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F0NPB44JWC');
          `}
        </Script>
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
      {/* RESTORED: dark:bg-black and dark:text-white classes */}
      <body className="antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        
        {/* The LayoutWrapper now handles showing/hiding the navbar */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>

        {/* These are now outside the main wrapper to apply to all pages */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

