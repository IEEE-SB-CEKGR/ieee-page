import Form from '@/app/ui/members/edit-form';
import Breadcrumbs from '@/app/ui/members/breadcrumbs';
import { fetchMemberById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [member] = await Promise.all([fetchMemberById(id)]);

  if (!member) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Events', href: '/dashboard/members' },
          {
            label: 'Edit Event',
            href: `/dashboard/members/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form member={member} />
    </main>
  );
}
