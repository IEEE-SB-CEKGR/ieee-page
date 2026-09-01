import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip internal Next.js routes, static files, and explicit top-level routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
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
        const targetUrl = subPath
          ? `${cleanDestination}/${subPath}${search}`
          : `${cleanDestination}${search}`;

        const rewriteUrl = new URL(targetUrl);

        // Perform transparent 1st-party reverse proxy
        return NextResponse.rewrite(rewriteUrl, {
          request: {
            headers: request.headers,
          },
        });
      }
    }
  } catch (error) {
    console.error('Middleware: Error querying websites API:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|opengraph-image).*)',
  ],
};
