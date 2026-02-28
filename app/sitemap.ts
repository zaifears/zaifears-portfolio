import { contentfulClient } from '@/lib/contentfulClient';

// --- UPDATED: The correct URL for your live website (canonical domain for SEO) ---
export const baseUrl = 'https://shahoriar.me';

// Define the structure of a blog post for fetching
interface LifeEvent {
  fields: {
    slug: string;
  };
  sys: {
    updatedAt: string;
  };
}

export default async function sitemap() {
  // 1. Start with your static pages and assign SEO priorities
  // homepage and /life get highest weight; others are scaled based on content value
  const priorityMap: Record<string, number> = {
    '': 1,
    '/life': 1,
    '/skills': 0.7,
    '/education': 0.6,
    '/techtips': 0.5,
    '/contact': 0.4,
    '/design-portfolio': 0.5,
  };

  const routes = ['', '/education', '/skills', '/techtips', '/contact', '/life', '/design-portfolio'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    priority: priorityMap[route] ?? 0.5, // default to medium
  }));

  // 2. Fetch all your dynamic "Life Journey" posts from Contentful
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'zaifearsBlogPost',
    });
    const lifePosts = response.items as unknown as LifeEvent[];

    const lifeRoutes = lifePosts.map((post) => ({
      url: `${baseUrl}/life/${post.fields.slug}`,
      lastModified: new Date(post.sys.updatedAt).toISOString().split('T')[0],
      priority: 0.6, // individual posts still important but below the main /life listing
    }));
    
    // 3. Combine the static and dynamic routes
    return [...routes, ...lifeRoutes];

  } catch (error) {
    console.error("Error fetching sitemap data from Contentful:", error);
    // If Contentful fails, return only the static routes
    return routes;
  }
}
