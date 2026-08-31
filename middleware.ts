import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
    pathname === '/achievements' ||
    pathname.startsWith('/about/') ||
    pathname.startsWith('/events/') ||
    pathname.startsWith('/execom/') ||
    pathname.startsWith('/achievements/')
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
    // Construct internal API lookup URL (runs in Node.js runtime)
    const apiUrl = new URL(
      `/api/websites/${encodeURIComponent(slug)}`,
      request.nextUrl.origin
    );

    const response = await fetch(apiUrl.toString(), {
      next: { revalidate: 60 },
    });

    if (response.ok) {
      const data = await response.json();

      if (data && data.destinationUrl) {
        let destinationUrl: string = data.destinationUrl.trim();

        // Ensure destination starts with protocol
        if (
          !destinationUrl.startsWith('http://') &&
          !destinationUrl.startsWith('https://')
        ) {
          destinationUrl = `https://${destinationUrl}`;
        }

        // Clean trailing slashes
        const cleanDestination = destinationUrl.replace(/\/+$/, '');
        const rewriteUrl = subPath
          ? `${cleanDestination}/${subPath}`
          : cleanDestination;

        return NextResponse.rewrite(new URL(rewriteUrl));
      }
    }
  } catch (error) {
    console.error('Middleware: Error querying websites API:', error);
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except internal Next.js paths and static files
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|opengraph-image).*)',
  ],
};
