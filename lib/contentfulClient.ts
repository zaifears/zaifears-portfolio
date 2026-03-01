import { createClient } from 'contentful';

// Suppress the DEP0169 deprecation warning from url.parse() in Contentful SDK
const originalEmit = process.emit;
// @ts-ignore
process.emit = function(name, ...args) {
  if (
    name === 'warning' &&
    args[0] &&
    typeof args[0] === 'object' &&
    args[0].code === 'DEP0169'
  ) {
    return false;
  }
  return originalEmit.apply(process, [name, ...args] as Parameters<typeof process.emit>);
};

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