import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export interface WebsiteRecord {
  id?: string;
  name: string;
  slug: string;
  destination_url: string;
  is_active: boolean;
}

export async function getActiveWebsiteBySlug(
  slug: string
): Promise<WebsiteRecord | null> {
  noStore();
  if (!slug) return null;

  // 1. Try querying via @vercel/postgres
  try {
    const result = await sql<WebsiteRecord>`
      SELECT name, slug, destination_url, is_active FROM websites
      WHERE LOWER(slug) = LOWER(${slug}) AND is_active = true
      LIMIT 1
    `;

    if (result && result.rows && result.rows.length > 0) {
      return result.rows[0];
    }
  } catch (err) {
    // Continue to Supabase fallback if @vercel/postgres is unconfigured
  }

  // 2. Fallback to Supabase REST if configured
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const cleanUrl = supabaseUrl.replace(/\/+$/, '');
      const res = await fetch(
        `${cleanUrl}/rest/v1/websites?slug=ilike.${encodeURIComponent(
          slug
        )}&is_active=eq.true&select=name,slug,destination_url,is_active&limit=1`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          cache: 'no-store',
        }
      );

      if (res.ok) {
        const rows: WebsiteRecord[] = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          return rows[0];
        }
      }
    } catch (err) {
      // ignore error
    }
  }

  return null;
}
