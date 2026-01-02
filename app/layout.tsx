import './global.css'; // Using the alias for the global CSS
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
    default: 'Shahoriar Hossain',
    template: '%s | Shahoriar Hossain',
  },
  description: "Shahoriar Hossain's personal portfolio and life log.",
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

