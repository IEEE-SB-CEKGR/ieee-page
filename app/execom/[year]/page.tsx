// app/execom/[year]/page.tsx
import { notFound } from 'next/navigation';
import { filterMembersOnYear } from '@/app/lib/actions';
import { sql } from '@vercel/postgres';
import Execom from '@/app/ui/home/Execom/index';

async function loadYears() {
  const result = await sql<{ year: number }>`
    SELECT DISTINCT year
    FROM members
    ORDER BY year
  `;
  // convert to string[], or keep as number[] if you prefer
  return result.rows.map((r) => r.year.toString());
}

export default async function Page({ params }: { params: { year: string } }) {
  const year = params.year;

  // fetch both in parallel
  const [members, years] = await Promise.all([
    filterMembersOnYear(year),
    loadYears(),
  ]);

  if (!members) {
    notFound();
  }

  return (
    <main className="…">
      {/* pass the full list of years plus the current one */}
      <Execom members={members} year={year} years={years} />
    </main>
  );
}
