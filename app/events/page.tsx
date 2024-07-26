'use client';

import Header from '@/app/ui/home/Header';
import UpcomingEvents from '@/app//ui/home/UpcomingEvents';
import Footer from '../ui/home/Footer';

export default function Page() {
  return (
    <section className="h-full w-full bg-[#1c1c22] sm:w-screen">
      <Header />
      <div className="mx-auto h-screen p-10">
        <UpcomingEvents />
      </div>
      <Footer />
    </section>
  );
}
