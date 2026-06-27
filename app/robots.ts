import { MetadataRoute } from 'next'

// robots.txt generation for SEO and LLM friendliness. We also provide
// /llms.txt, /llms-full.txt, /ai, and /resume.md for language models.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/ai', '/resume.md', '/llms.txt', '/llms-full.txt'],
        disallow: ['/zakat-calculation', '/zakat-report'],
      },
    ],
    sitemap: 'https://shahoriar.bd/sitemap.xml',
    host: 'shahoriar.bd',
  }
}