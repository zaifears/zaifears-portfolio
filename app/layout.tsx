import './global.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
// The ThemeProvider import has been removed

export const metadata: Metadata = {
  title: {
    default: 'Shahoriar Hossain',
    template: '%s | Shahoriar Hossain',
  },
  description: "Shahoriar Hossain's personal portfolio and life log.",
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: 'pT4MHjovbY0MXYCrgAPN3LQHyTuLLq_iTtmWyx3GSgc',
  },
}

const cx = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        GeistSans.variable,
        GeistMono.variable
      )}
      // suppressHydrationWarning is no longer needed
    >
      <head>
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
      </head>
      {/* The body classes remain, as they are used by Tailwind's media strategy */}
      <body className="antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
          {/* The ThemeProvider wrapper has been removed */}
          <div className="flex min-h-screen">
            <Navbar />
            <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
          </div>
      </body>
    </html>
  )
}