import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Skip internal explicit Next.js static and API paths
  if (pathname.startsWith('/api/websites')) {
    return NextResponse.next();
  }

  // 2. Skip explicit main site pages
  if (
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

  // 3. Handle asset requests (e.g. /_next/static/..., /assets/..., /fonts/..., /images/..., .css, .js, .png, etc.)
  // When an event site requests root-relative assets, proxy them to the active event target!
  const isAssetRequest =
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.');

  if (isAssetRequest) {
    // Check for proxy target from Cookie or Referer
    const proxyTargetCookie = request.cookies.get('__proxy_target')?.value;
    const referer = request.headers.get('referer');

    let targetOrigin = proxyTargetCookie;

    // If no cookie, extract active slug from Referer header
    if (!targetOrigin && referer) {
      try {
        const refUrl = new URL(referer);
        if (refUrl.origin === request.nextUrl.origin) {
          const refSlug = refUrl.pathname.split('/').filter(Boolean)[0];
          if (
            refSlug &&
            !['about', 'events', 'execom', 'achievements', 'api'].includes(
              refSlug
            )
          ) {
            const apiUrl = new URL(
              `/api/websites/${encodeURIComponent(refSlug)}`,
              request.nextUrl.origin
            );
            const res = await fetch(apiUrl.toString());
            if (res.ok) {
              const data = await res.json();
              if (data?.destinationUrl) {
                targetOrigin = data.destinationUrl;
              }
            }
          }
        }
      } catch (e) {}
    }

    if (targetOrigin) {
      let cleanOrigin = targetOrigin.trim();
      if (
        !cleanOrigin.startsWith('http://') &&
        !cleanOrigin.startsWith('https://')
      ) {
        cleanOrigin = `https://${cleanOrigin}`;
      }
      cleanOrigin = cleanOrigin.replace(/\/+$/, '');

      const assetUrl = new URL(`${cleanOrigin}${pathname}${search}`);
      const requestHeaders = new Headers(request.headers);
      const destUrl = new URL(cleanOrigin);
      requestHeaders.set('Origin', destUrl.origin);
      requestHeaders.set('Host', destUrl.host);
      requestHeaders.set('X-Forwarded-Host', request.nextUrl.host);

      return NextResponse.rewrite(assetUrl, {
        request: {
          headers: requestHeaders,
        },
      });
    }

    // Otherwise let Next.js handle main site static files
    return NextResponse.next();
  }

  // 4. Handle Page & Route requests for dynamic event websites: /<slug>/...
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return NextResponse.next();
  }

  const slug = segments[0];
  const subPath = segments.slice(1).join('/');

  try {
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

        if (
          !destinationUrl.startsWith('http://') &&
          !destinationUrl.startsWith('https://')
        ) {
          destinationUrl = `https://${destinationUrl}`;
        }

        const cleanDestination = destinationUrl.replace(/\/+$/, '');
        const targetUrl = subPath
          ? `${cleanDestination}/${subPath}${search}`
          : `${cleanDestination}${search}`;

        const rewriteUrl = new URL(targetUrl);
        const requestHeaders = new Headers(request.headers);
        const destUrl = new URL(cleanDestination);
        requestHeaders.set('Origin', destUrl.origin);
        requestHeaders.set('Host', destUrl.host);
        requestHeaders.set('X-Forwarded-Host', request.nextUrl.host);

        const res = NextResponse.rewrite(rewriteUrl, {
          request: {
            headers: requestHeaders,
          },
        });

        // Set the active proxy target cookie so all subsequent asset/chunk requests
        // (like /_next/static/css/... or /assets/...) are seamlessly routed to this event site
        res.cookies.set('__proxy_target', cleanDestination, {
          path: '/',
          sameSite: 'lax',
          httpOnly: false,
        });
        res.cookies.set('__proxy_slug', slug, {
          path: '/',
          sameSite: 'lax',
          httpOnly: false,
        });

        return res;
      }
    }

    // 5. FALLBACK ROUTING FOR APP SUBPAGES (e.g., /login, /dashboard)
    // If the path is not a registered slug, check if we have an active proxy session.
    // By redirecting back to the slug namespace (e.g., /c2cportal/login), we ensure the browser's address bar 
    // correctly reflects the event website, solving the issue where links take the user to the bare domain (ieee.ce-kgr.org/login).
    // The 307 Temporary Redirect status preserves POST requests and their bodies, ensuring login forms still work perfectly.
    const proxySlugCookie = request.cookies.get('__proxy_slug')?.value;
    if (proxySlugCookie && !pathname.startsWith(`/${proxySlugCookie}`)) {
      const redirectUrl = new URL(`/${proxySlugCookie}${pathname}${search}`, request.nextUrl.origin);
      return NextResponse.redirect(redirectUrl, 307);
    }

  } catch (error) {
    console.error('Middleware: Error querying websites API:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!favicon.ico|opengraph-image).*)',
  ],
};
