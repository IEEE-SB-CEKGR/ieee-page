import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params?.slug;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    // 1. Try querying via @vercel/postgres
    const result = await sql`
      SELECT destination_url, is_active FROM websites
      WHERE LOWER(slug) = LOWER(${slug}) AND is_active = true
      LIMIT 1
    `;

    if (result && result.rows && result.rows.length > 0) {
      return NextResponse.json(
        { destinationUrl: result.rows[0].destination_url },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          },
        }
      );
    }
  } catch (err) {
    console.error('Error querying websites via @vercel/postgres in API route:', err);
  }

  // 2. If Supabase environment variables are present, fallback to Supabase REST API
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const cleanUrl = supabaseUrl.replace(/\/+$/, '');
      const response = await fetch(
        `${cleanUrl}/rest/v1/websites?slug=ilike.${encodeURIComponent(
          slug
        )}&is_active=eq.true&select=destination_url&limit=1`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          cache: 'no-store',
        }
      );

      if (response.ok) {
        const rows = await response.json();
        if (Array.isArray(rows) && rows.length > 0 && rows[0].destination_url) {
          return NextResponse.json(
            { destinationUrl: rows[0].destination_url },
            {
              headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
              },
            }
          );
        }
      }
    } catch (err) {
      console.error('Error querying websites via Supabase REST:', err);
    }
  }

  return NextResponse.json({ error: 'Website not found' }, { status: 404 });
}
