import { createClient } from 'contentful';

// Make sure to set these environment variables in your .env.local file
// and also in your Vercel project settings.
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  console.error('Contentful credentials missing. Check CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables.');
}

export const contentfulClient = createClient({
  space: spaceId || '',
  accessToken: accessToken || '',
});

// Helper function to fetch with cache control
export const getContentfulEntries = async (query: any, bypassCache = false) => {
  if (bypassCache) {
    // Add a timestamp to bypass cache
    const timestamp = Date.now();
    return contentfulClient.getEntries({
      ...query,
      'sys.updatedAt[gte]': new Date(0).toISOString(), // Force fresh fetch
      _cacheBuster: timestamp
    });
  }
  return contentfulClient.getEntries(query);
};