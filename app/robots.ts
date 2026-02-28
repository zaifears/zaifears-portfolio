import { MetadataRoute } from 'next'
 
// robots.txt generation for SEO and LLM friendliness. We also provide a
// companion `llm.txt` file in the public folder with instructions for
// language models and crawlers.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // crawlDelay: 1, // optional
    },
    sitemap: 'https://zaifears.vercel.app/sitemap.xml',
    host: 'shahoriar.me',
  }
}
