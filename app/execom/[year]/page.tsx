import { notFound, redirect } from 'next/navigation';
import { filterMembersOnYear } from '@/app/lib/actions';
import { sql } from '@vercel/postgres';
import Execom from '@/app/ui/home/Execom/index';

async function loadYears() {
  const result = await sql<{ year: number }>`
    SELECT DISTINCT year
    FROM members
    ORDER BY year
  `;
  return result.rows.map((r) => r.year.toString());
}

export default async function Page({ params }: { params: { year: string } }) {
  const year = params.year;

  // fetch both in parallel
  const [members, years] = await Promise.all([
    filterMembersOnYear(year),
    loadYears(),
  ]);

  // NEW: If the requested year has no members and valid years exist, redirect to the latest year.
  if ((!members || members.length === 0) && years.length > 0 && !years.includes(year)) {
    const latestYear = years[years.length - 1]; // Array is ordered ascending, so the last is the latest
    redirect(`/execom/${latestYear}`);
  }

  if (!members && years.length === 0) {
    notFound();
  }

  return (
    <main className="w-full">
      <Execom members={members} year={year} years={years} />
    </main>
  );
}