export const DEFAULT_INDEXNOW_KEY = '05b1a843c7594001ad7c45cce6934b7d';
export const DEFAULT_INDEXNOW_HOST = 'shahoriar.bd';
export const INDEXNOW_API_ENDPOINT = 'https://api.indexnow.org/indexnow';
export const INDEXNOW_BING_ENDPOINT = 'https://www.bing.com/indexnow';

export const DISALLOWED_PREFIXES = [
  '/zakat-calculation',
  '/zakat-report',
  '/bride-selector',
  '/shoily',
  '/bizcomp',
  '/meetup',
];

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export interface IndexNowResult {
  ok: boolean;
  status: number;
  message: string;
  submittedUrls: string[];
  endpoint: string;
}

export function getIndexNowKey(): string {
  return process.env.INDEXNOW_KEY || DEFAULT_INDEXNOW_KEY;
}

export function getIndexNowHost(): string {
  return process.env.INDEXNOW_HOST || DEFAULT_INDEXNOW_HOST;
}

export function getKeyLocation(key?: string, host?: string): string {
  const activeKey = key || getIndexNowKey();
  const activeHost = host || getIndexNowHost();
  return `https://${activeHost}/${activeKey}.txt`;
}

export function isPathDisallowed(path: string): boolean {
  const cleanPath = path.toLowerCase().trim();
  return DISALLOWED_PREFIXES.some(
    (prefix) => cleanPath === prefix || cleanPath.startsWith(`${prefix}/`)
  );
}

export function normalizeUrl(urlOrPath: string, host?: string): string {
  const activeHost = host || getIndexNowHost();
  const trimmed = urlOrPath.trim();

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  const normalizedPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `https://${activeHost}${normalizedPath}`;
}

export function filterIndexableUrls(
  rawUrls: string[],
  host?: string
): string[] {
  const activeHost = host || getIndexNowHost();
  const uniqueUrls = new Set<string>();

  for (const item of rawUrls) {
    if (!item) continue;
    const fullUrl = normalizeUrl(item, activeHost);

    try {
      const parsed = new URL(fullUrl);
      if (parsed.hostname !== activeHost && !parsed.hostname.endsWith(`.${activeHost}`)) {
        continue;
      }

      if (isPathDisallowed(parsed.pathname)) {
        continue;
      }

      uniqueUrls.add(fullUrl);
    } catch {
      // Invalid URL format, skip
    }
  }

  return Array.from(uniqueUrls);
}

export function buildIndexNowPayload(
  urls: string[],
  key?: string,
  host?: string
): IndexNowPayload {
  const activeKey = key || getIndexNowKey();
  const activeHost = host || getIndexNowHost();
  const filtered = filterIndexableUrls(urls, activeHost);

  return {
    host: activeHost,
    key: activeKey,
    keyLocation: getKeyLocation(activeKey, activeHost),
    urlList: filtered,
  };
}

/**
 * Submits one or more URLs to the IndexNow protocol (distributes to Bing, Yandex, Seznam, Naver).
 */
export async function submitToIndexNow(
  urls: string[],
  options?: {
    key?: string;
    host?: string;
    endpoint?: string;
  }
): Promise<IndexNowResult> {
  const activeKey = options?.key || getIndexNowKey();
  const activeHost = options?.host || getIndexNowHost();
  const targetEndpoint = options?.endpoint || INDEXNOW_API_ENDPOINT;

  const payload = buildIndexNowPayload(urls, activeKey, activeHost);

  if (payload.urlList.length === 0) {
    return {
      ok: false,
      status: 400,
      message: 'No valid indexable URLs provided for submission.',
      submittedUrls: [],
      endpoint: targetEndpoint,
    };
  }

  try {
    const response = await fetch(targetEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // 200 (OK) or 202 (Accepted) signify success according to the IndexNow specification
    const isSuccess = response.status === 200 || response.status === 202;
    const message = isSuccess
      ? `Successfully submitted ${payload.urlList.length} URL(s) to IndexNow (${response.status} ${response.statusText || 'OK'}).`
      : `IndexNow returned status ${response.status}: ${response.statusText}`;

    return {
      ok: isSuccess,
      status: response.status,
      message,
      submittedUrls: payload.urlList,
      endpoint: targetEndpoint,
    };
  } catch (error) {
    // If the primary api.indexnow.org endpoint failed and was used, attempt fallback to Bing's endpoint
    if (targetEndpoint === INDEXNOW_API_ENDPOINT) {
      try {
        const fallbackResponse = await fetch(INDEXNOW_BING_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(payload),
        });

        const isSuccess =
          fallbackResponse.status === 200 || fallbackResponse.status === 202;
        return {
          ok: isSuccess,
          status: fallbackResponse.status,
          message: isSuccess
            ? `Successfully submitted ${payload.urlList.length} URL(s) via Bing fallback (${fallbackResponse.status}).`
            : `Bing fallback returned status ${fallbackResponse.status}`,
          submittedUrls: payload.urlList,
          endpoint: INDEXNOW_BING_ENDPOINT,
        };
      } catch (fallbackError) {
        return {
          ok: false,
          status: 500,
          message: `Network error submitting to IndexNow: ${
            error instanceof Error ? error.message : String(error)
          }`,
          submittedUrls: payload.urlList,
          endpoint: targetEndpoint,
        };
      }
    }

    return {
      ok: false,
      status: 500,
      message: `Network error submitting to IndexNow: ${
        error instanceof Error ? error.message : String(error)
      }`,
      submittedUrls: payload.urlList,
      endpoint: targetEndpoint,
    };
  }
}
