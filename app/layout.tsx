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
        'text-black bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased text-white flex">
        <Navbar />
        {/* This adds padding-bottom (pb-20) for mobile to avoid overlap with the nav bar */}
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
