// app/execom/page.tsx
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

export default async function ExecomIndexPage() {
  try {
    // Fetch the most recent year from the members table
    const result = await sql<{ year: number }>`
      SELECT DISTINCT year
      FROM members
      WHERE (status = 'approved' OR status IS NULL OR status = '')
        AND (status != 'rejected' AND status != 'pending')
      ORDER BY year DESC
      LIMIT 1
    `;

    if (result.rows.length > 0) {
      const latestYear = result.rows[0].year.toString();
      redirect(`/execom/${latestYear}`);
    } else {
      // Fallback if no members exist in the DB yet
      redirect(`/execom/${new Date().getFullYear()}`);
    }
  } catch (error) {
    console.error('Error fetching latest year:', error);
    redirect(`/execom/${new Date().getFullYear()}`);
  }
}