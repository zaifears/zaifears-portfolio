import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/zakat-calculation', '/zakat-report'],
      },
    ],
    sitemap: 'https://shahoriar.bd/sitemap.xml',
    host: 'https://shahoriar.bd',
  }
}