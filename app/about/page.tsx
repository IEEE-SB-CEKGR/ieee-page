'use client';

import Header from '@/app/ui/home/Header';
import AboutPage from '../ui/home/About';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <motion.div 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AboutPage />
      </motion.div>
    </main>
  );
}
