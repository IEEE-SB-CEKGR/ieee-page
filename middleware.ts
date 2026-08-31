import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sql } from '@vercel/postgres';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for internal Next.js routes, static files, API routes, and known app routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') || // Static files (images, fonts, etc.)
    pathname === '/' ||
    pathname === '/about' ||
    pathname === '/events' ||
    pathname === '/execom' ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/events') ||
    pathname.startsWith('/execom')
  ) {
    return NextResponse.next();
  }

  // Extract the first path segment as the potential slug
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return NextResponse.next();
  }

  const slug = segments[0];
  const subPath = segments.slice(1).join('/');

  try {
    // Query the database for an active website with this slug
    const result = await sql`
      SELECT destination_url FROM websites
      WHERE slug = ${slug} AND is_active = true
      LIMIT 1
    `;

    if (result.rows.length > 0) {
      const destinationUrl = result.rows[0].destination_url;

      // Build the rewrite URL
      // Remove trailing slash from destination URL for clean joining
      const cleanDestination = destinationUrl.replace(/\/+$/, '');
      const rewriteUrl = subPath
        ? `${cleanDestination}/${subPath}`
        : cleanDestination;

      return NextResponse.rewrite(new URL(rewriteUrl));
    }
  } catch (error) {
    console.error('Middleware: Error querying websites table:', error);
    // If database query fails, fall through to normal routing
    // The hardcoded rewrites in next.config.js will still work as fallback
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except internal Next.js paths and static files
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|opengraph-image).*)',
  ],
};
