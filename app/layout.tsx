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
import Footer from './components/footer'
import { baseUrl } from './sitemap'

// ✅ THIS IS THE SECTION TO EDIT
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Shahoriar Hossain', // The default title for your site
    template: '%s | Shahoriar Hossain', // Used for other pages like blog posts
  },
  description: "Shahoriar Hossain's personal portfolio and life log.",
  // ✅ ADDED: This section tells the browser what icon to use for the tab.
  // You must add a file named 'favicon.ico' to your 'public' folder for this to work.
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Shahoriar Hossain',
    description: "Shahoriar Hossain's personal portfolio and life log.",
    url: baseUrl,
    siteName: 'Shahoriar Hossain',
    locale: 'en_US',
    type: 'website',
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
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
