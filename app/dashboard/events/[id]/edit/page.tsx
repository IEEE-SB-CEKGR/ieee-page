import Form from '@/app/ui/events/edit-form';
import Breadcrumbs from '@/app/ui/events/breadcrumbs';
import { fetchEventById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [event] = await Promise.all([fetchEventById(id)]);

  if (!event) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Events', href: '/dashboard/events' },
          {
            label: 'Edit Event',
            href: `/dashboard/events/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form event={event} />
    </main>
  );
}
