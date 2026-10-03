import { timingSafeEqual } from 'crypto';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { submitToIndexNow } from '@/lib/indexnow';

export async function POST(request: NextRequest) {
  try {
    const expectedSecret = process.env.REVALIDATE_SECRET;

    if (expectedSecret) {
      const incomingToken =
        request.headers.get('x-revalidation-token') ||
        request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

      if (!incomingToken || incomingToken.length !== expectedSecret.length) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const isValid = timingSafeEqual(
        Buffer.from(incomingToken),
        Buffer.from(expectedSecret)
      );

      if (!isValid) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    let path: unknown = undefined;
    try {
      const body = await request.json();
      path = body?.path;
    } catch {
      // Empty body or non-JSON payload is allowed for default batch revalidation
    }

    if (typeof path === 'string' && path.startsWith('/')) {
      revalidatePath(path);
      // Asynchronously notify search engines via IndexNow
      submitToIndexNow([path]).catch((e) =>
        console.error('IndexNow auto-submission failed for path:', path, e)
      );

      return NextResponse.json({ revalidated: true, path });
    } else {
      // Revalidate all main pages
      revalidatePath('/skills');
      revalidatePath('/life');
      revalidatePath('/');

      // Asynchronously notify search engines via IndexNow
      submitToIndexNow(['/skills', '/life', '/']).catch((e) =>
        console.error('IndexNow auto-submission failed for main paths:', e)
      );

      return NextResponse.json({
        revalidated: true,
        paths: ['/skills', '/life', '/'],
      });
    }
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}