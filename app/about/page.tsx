'use client';

import Header from '@/app/ui/home/Header';
import AboutPage from '../ui/home/About';
import Footer from '../ui/home/Footer';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1c1c22]">
      <Header />
      <div className="flex-grow p-4 sm:p-10">
        <AboutPage />
      </div>
    </main>
  );
}
