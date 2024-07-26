'use client';

import Header from '@/app/ui/home/Header';
import AboutPage from '../ui/home/About';
import Footer from '../ui/home/Footer';
export default function Page() {
  return (
    <section className="h-screen w-full bg-[#1c1c22] sm:w-screen">
      <Header />
      <div className="h-full p-10">
        <AboutPage />
      </div>
      <Footer />
    </section>
  );
}
