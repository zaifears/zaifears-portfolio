import { timingSafeEqual } from 'crypto';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

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
      return NextResponse.json({ revalidated: true, path });
    } else {
      // Revalidate all main pages
      revalidatePath('/skills');
      revalidatePath('/life');
      revalidatePath('/');

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