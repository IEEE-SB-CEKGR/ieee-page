import { notFound } from 'next/navigation';
import { filterMembersOnYear } from '@/app/lib/actions';
import Execom from '@/app/ui/home/Execom';
import Footer from '@/app/ui/home/Footer';

export default async function Page({ params }: { params: { year: string } }) {
  const year = params.year;
  const [members] = await Promise.all([filterMembersOnYear(year)]);

  if (!members) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col ">
      <div className="flex-grow">
        <Execom members={members} year={year} />
      </div>
    </main>
  );
}
