// This file tells search engines what pages are on your site.

export const baseUrl = 'https://zaifears.vercel.app';

export default async function sitemap() {
  // ✅ UPDATED: Added '/skills' and '/blog' to the list of routes.
  const routes = ['', '/education', '/skills', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  // In the future, we will also add logic here to fetch all your
  // individual blog posts from Contentful and add them to the sitemap.

  return routes;
}
