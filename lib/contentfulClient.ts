import { createClient } from 'contentful';

// Make sure to set these environment variables in your .env.local file
// and also in your Vercel project settings.
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error('Contentful space ID and access token must be defined');
}

export const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
});
