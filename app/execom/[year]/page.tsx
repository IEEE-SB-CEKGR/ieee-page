import { notFound } from 'next/navigation';
import { filterMembersOnYear } from '@/app/lib/actions';
import Execom from '@/app/ui/home/Execom/index';

export default async function Page({ params }: { params: { year: string } }) {
  const year = params.year;
  const [members] = await Promise.all([filterMembersOnYear(year)]);

  if (!members) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Execom members={members} year={year} />
    </main>
  );
}
