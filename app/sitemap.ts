// This file tells search engines what pages are on your site.

// ✅ UPDATED: Set the baseUrl to your actual website URL.
export const baseUrl = 'https://zaifears.vercel.app';

export default async function sitemap() {
  // ✅ REMOVED: The logic that tried to get blog posts has been deleted.

  // This creates a list of your current pages (Home and Education).
  const routes = ['', '/education'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return routes;
}
//kisu ekta change ansi