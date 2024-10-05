'use client';

import Header from '@/app/ui/home/Header';
import UpcomingEvents from '@/app//ui/home/UpcomingEvents';
import Footer from '../ui/home/Footer';

export default function Page() {
  return (
    <section className="h-full w-full  sm:w-screen">
      <div className="mx-auto h-screen">
        <UpcomingEvents />
      </div>
    </section>
  );
}
