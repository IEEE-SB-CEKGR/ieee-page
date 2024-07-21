import Form from '@/app/ui/events/create-form';
import Breadcrumbs from '@/app/ui/events/breadcrumbs';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Events', href: '/dashboard/events' },
          {
            label: 'Create Event',
            href: '/dashboard/events/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
