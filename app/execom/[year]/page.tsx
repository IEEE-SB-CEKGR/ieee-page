import { notFound } from 'next/navigation';
import { filterMembersOnYear } from '@/app/lib/actions';
import Execom from '@/app/ui/home/Execom';

export default async function Page({ params }: { params: { year: string } }) {
  const year = params.year;
  const [members] = await Promise.all([filterMembersOnYear(year)]);

  if (!members) {
    notFound();
  }

  return (
    <main>
      <Execom members={members} year={year} />
    </main>
  );
}
