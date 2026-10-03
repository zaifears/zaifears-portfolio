import { NextRequest, NextResponse } from 'next/server';
import {
  getIndexNowHost,
  getIndexNowKey,
  getKeyLocation,
  submitToIndexNow,
} from '@/lib/indexnow';
import sitemap from '@/app/sitemap';

export async function GET() {
  const host = getIndexNowHost();
  const key = getIndexNowKey();
  const keyLocation = getKeyLocation(key, host);

  return NextResponse.json({
    protocol: 'IndexNow',
    host,
    keyLocation,
    status: 'configured',
    usage: {
      submitCustomUrls: 'POST /api/indexnow with JSON body { "urls": ["/projects/tapo-viewer"] }',
      submitAllUrls: 'POST /api/indexnow with JSON body { "all": true }',
      keyFile: `https://${host}/${key}.txt`,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const expectedSecret =
      process.env.INDEXNOW_SECRET || process.env.REVALIDATE_SECRET;

    if (expectedSecret) {
      const incomingToken =
        request.headers.get('x-indexnow-secret') ||
        request.headers.get('x-revalidation-token') ||
        request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

      if (!incomingToken || incomingToken !== expectedSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    let body: { urls?: string[]; path?: string; all?: boolean } = {};
    try {
      body = await request.json();
    } catch {
      // Empty body is allowed, defaults to submitting all sitemap routes
    }

    let targetUrls: string[] = [];

    if (Array.isArray(body.urls) && body.urls.length > 0) {
      targetUrls = body.urls;
    } else if (typeof body.path === 'string' && body.path.trim()) {
      targetUrls = [body.path];
    } else {
      // Fetch all routes from the sitemap generator
      try {
        const sitemapEntries = await sitemap();
        targetUrls = sitemapEntries.map((entry) => entry.url);
      } catch (err) {
        console.error('Failed to generate sitemap URLs for IndexNow:', err);
        targetUrls = [
          'https://shahoriar.bd/',
          'https://shahoriar.bd/ai',
          'https://shahoriar.bd/projects',
          'https://shahoriar.bd/projects/tapo-viewer',
          'https://shahoriar.bd/projects/youth-tax-calculator',
          'https://shahoriar.bd/projects/locreminder',
          'https://shahoriar.bd/skills',
          'https://shahoriar.bd/education',
          'https://shahoriar.bd/contact',
          'https://shahoriar.bd/life',
          'https://shahoriar.bd/techtips',
          'https://shahoriar.bd/thanks',
        ];
      }
    }

    const result = await submitToIndexNow(targetUrls);

    return NextResponse.json(result, {
      status: result.ok ? 200 : result.status >= 400 && result.status < 600 ? result.status : 500,
    });
  } catch (err) {
    console.error('IndexNow submission error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing IndexNow submission' },
      { status: 500 }
    );
  }
}
