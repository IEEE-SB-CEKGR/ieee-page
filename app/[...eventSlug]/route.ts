import { NextRequest, NextResponse } from 'next/server';
import { getActiveWebsiteBySlug } from '@/app/lib/get-website';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Excluded top-level routes
const EXCLUDED_SLUGS = new Set([
  'about',
  'events',
  'execom',
  'achievements',
  'api',
  '_next',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
]);

async function proxyRequest(
  request: NextRequest,
  params: { eventSlug: string[] }
) {
  const segments = params.eventSlug || [];
  if (segments.length === 0) {
    return new NextResponse('Page Not Found', { status: 404 });
  }

  const slug = segments[0];
  if (EXCLUDED_SLUGS.has(slug.toLowerCase())) {
    return new NextResponse('Page Not Found', { status: 404 });
  }

  const website = await getActiveWebsiteBySlug(slug);
  if (!website || !website.destination_url) {
    return new NextResponse('Page Not Found', { status: 404 });
  }

  let baseDestination = website.destination_url.trim();
  if (
    !baseDestination.startsWith('http://') &&
    !baseDestination.startsWith('https://')
  ) {
    baseDestination = `https://${baseDestination}`;
  }
  baseDestination = baseDestination.replace(/\/+$/, '');

  const subPath = segments.slice(1).join('/');
  const search = request.nextUrl.search || '';
  const targetUrl = subPath
    ? `${baseDestination}/${subPath}${search}`
    : `${baseDestination}${search}`;

  try {
    // Forward headers
    const forwardHeaders = new Headers();
    request.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (
        lower !== 'host' &&
        lower !== 'connection' &&
        lower !== 'content-length' &&
        lower !== 'accept-encoding'
      ) {
        forwardHeaders.set(key, value);
      }
    });

    const isGetOrHead =
      request.method === 'GET' || request.method === 'HEAD';
    const body = isGetOrHead ? undefined : await request.arrayBuffer();

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: forwardHeaders,
      body,
      redirect: 'follow',
      cache: 'no-store',
    });

    const contentType = response.headers.get('content-type') || '';

    // If it is an HTML response, inject <base> and link navigation interceptor
    if (contentType.includes('text/html')) {
      let html = await response.text();

      const destUrlObj = new URL(baseDestination);
      const destinationOrigin = destUrlObj.origin;
      const destinationBasePath =
        destUrlObj.pathname === '/' ? '' : destUrlObj.pathname;

      const baseTag = `<base href="${baseDestination}/">`;

      const interceptScript = `
        <script>
          (function() {
            var currentSlug = ${JSON.stringify(slug)};
            var destOrigin = ${JSON.stringify(destinationOrigin)};
            var destBasePath = ${JSON.stringify(destinationBasePath)};

            // Intercept link clicks to preserve the /<slug>/ route prefix
            document.addEventListener('click', function(e) {
              var target = e.target.closest('a');
              if (!target || !target.href) return;

              try {
                var linkUrl = new URL(target.href, window.location.origin);
                if (linkUrl.origin === window.location.origin || linkUrl.origin === destOrigin) {
                  var p = linkUrl.pathname;
                  if (destBasePath && p.startsWith(destBasePath)) {
                    p = p.substring(destBasePath.length);
                  }
                  if (!p.startsWith('/' + currentSlug)) {
                    p = '/' + currentSlug + (p.startsWith('/') ? p : '/' + p);
                    target.href = window.location.origin + p + linkUrl.search + linkUrl.hash;
                  }
                }
              } catch(err) {}
            }, true);

            // Intercept history.pushState & replaceState for SPAs
            var origPushState = history.pushState;
            var origReplaceState = history.replaceState;

            history.pushState = function(state, unused, url) {
              if (url) {
                try {
                  var u = new URL(url, window.location.origin);
                  var p = u.pathname;
                  if (!p.startsWith('/' + currentSlug)) {
                    p = '/' + currentSlug + (p.startsWith('/') ? p : '/' + p);
                    url = p + u.search + u.hash;
                  }
                } catch(e) {}
              }
              return origPushState.apply(this, [state, unused, url]);
            };

            history.replaceState = function(state, unused, url) {
              if (url) {
                try {
                  var u = new URL(url, window.location.origin);
                  var p = u.pathname;
                  if (!p.startsWith('/' + currentSlug)) {
                    p = '/' + currentSlug + (p.startsWith('/') ? p : '/' + p);
                    url = p + u.search + u.hash;
                  }
                } catch(e) {}
              }
              return origReplaceState.apply(this, [state, unused, url]);
            };
          })();
        </script>
      `;

      if (html.includes('<head>')) {
        html = html.replace('<head>', `<head>${baseTag}${interceptScript}`);
      } else if (html.includes('<head ')) {
        html = html.replace(/<head[^>]*>/i, `$&${baseTag}${interceptScript}`);
      } else if (html.includes('<html>')) {
        html = html.replace(
          '<html>',
          `<html><head>${baseTag}${interceptScript}</head>`
        );
      } else {
        html = `${baseTag}${interceptScript}${html}`;
      }

      return new NextResponse(html, {
        status: response.status,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
        },
      });
    }

    // For non-HTML (API responses, images, assets, json), stream as-is
    const responseBuffer = await response.arrayBuffer();
    const returnHeaders = new Headers();
    response.headers.forEach((val, key) => {
      const lower = key.toLowerCase();
      if (
        lower !== 'content-encoding' &&
        lower !== 'transfer-encoding' &&
        lower !== 'content-length'
      ) {
        returnHeaders.set(key, val);
      }
    });

    return new NextResponse(responseBuffer, {
      status: response.status,
      headers: returnHeaders,
    });
  } catch (err: any) {
    console.error('Proxy error:', err);
    return new NextResponse(
      `Failed to load event website: ${err?.message || 'Unknown error'}`,
      { status: 502 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { eventSlug: string[] } }
) {
  return proxyRequest(request, params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { eventSlug: string[] } }
) {
  return proxyRequest(request, params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { eventSlug: string[] } }
) {
  return proxyRequest(request, params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { eventSlug: string[] } }
) {
  return proxyRequest(request, params);
}
