import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();
    
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    } else {
      // Revalidate all main pages
      revalidatePath('/skills');
      revalidatePath('/life');
      revalidatePath('/');
      
      return NextResponse.json({ revalidated: true, paths: ['/skills', '/life', '/'] });
    }
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}