import { getContentfulEntries } from '@/lib/contentfulClient';

export const baseUrl = 'https://shahoriar.bd';

interface LifeEvent {
  fields: {
    slug: string;
  };
  sys: {
    updatedAt: string;
  };
}

export default async function sitemap() {
  const excludedRoutes = new Set(['/zakat-calculation', '/zakat-report']);
  
  const priorityMap: Record<string, number> = {
    '': 1,
    '/ai': 1,
    '/life': 1,
    '/skills': 0.8,
    '/education': 0.7,
    '/projects': 0.7,
    '/projects/locreminder': 0.6,
    '/techtips': 0.6,
    '/contact': 0.5,
    '/design-portfolio': 0.4,
  };

  const routes = ['','/ai', '/education', '/skills', '/projects', '/projects/locreminder', '/techtips', '/contact', '/life', '/design-portfolio']
    .filter((route) => !excludedRoutes.has(route))
    .map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
      priority: priorityMap[route] ?? 0.5,
    }));

  try {
    const response = await getContentfulEntries({
      content_type: 'zaifearsBlogPost',
    });
    
    const lifePosts = response.items as unknown as LifeEvent[];

    const lifeRoutes = lifePosts.map((post) => ({
      url: `${baseUrl}/life/${post.fields.slug}`,
      lastModified: new Date(post.sys.updatedAt).toISOString().split('T')[0],
      priority: 0.6, 
    }));
    
    return [...routes, ...lifeRoutes];

  } catch (error) {
    console.error("Error fetching sitemap data from Contentful:", error);
    return routes;
  }
}