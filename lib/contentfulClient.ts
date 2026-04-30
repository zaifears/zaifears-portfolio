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

const RETRYABLE_ERROR_CODES = new Set(['ETIMEDOUT', 'ECONNRESET', 'ENOTFOUND', 'EAI_AGAIN']);

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const isRetryableError = (error: unknown) => {
  const err = error as { status?: number; statusCode?: number; code?: string; response?: { status?: number } };
  const status = err?.status ?? err?.statusCode ?? err?.response?.status;

  if (typeof status === 'number' && status < 500) {
    return false;
  }

  if (err?.code && RETRYABLE_ERROR_CODES.has(err.code)) {
    return true;
  }

  return typeof status !== 'number' || status >= 500;
};

const withRetry = async <T,>(operation: () => Promise<T>, retries = 2, baseDelayMs = 500) => {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!isRetryableError(error) || attempt === retries) {
        throw error;
      }

      const delay = baseDelayMs * Math.pow(2, attempt);
      await sleep(delay);
    }
  }

  throw lastError;
};

// Helper function to fetch with cache control and retry
export const getContentfulEntries = async (query: any, bypassCache = false) => {
  const finalQuery = bypassCache
    ? {
        ...query,
        // Add a timestamp to bypass cache
        'sys.updatedAt[gte]': new Date(0).toISOString(),
        _cacheBuster: Date.now(),
      }
    : query;

  return withRetry(() => contentfulClient.getEntries(finalQuery));
};