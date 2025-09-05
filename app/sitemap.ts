import { contentfulClient } from '@/lib/contentfulClient';

// --- UPDATED: The correct URL for your live website ---
export const baseUrl = 'https://shahoriar.vercel.app';

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
  // 1. Start with your static pages
  const routes = ['', '/education', '/skills', '/techtips', '/contact', '/life', '/design-portfolio'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
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
    }));
    
    // 3. Combine the static and dynamic routes
    return [...routes, ...lifeRoutes];

  } catch (error) {
    console.error("Error fetching sitemap data from Contentful:", error);
    // If Contentful fails, return only the static routes
    return routes;
  }
}
