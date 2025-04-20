'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ExecomHeader from './ExecomHeader';
import YearSelector from './YearSelector';
import ExecomGrid from './ExecomGrid';
import { FadeIn } from '@/app/ui/animations/FadeIn';

export default function ExecomContainer({
  members,
  year,
}: {
  members: any[];
  year: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [year]); // Reset loading state when year changes

  return (
    <section className="min-h-screen w-full py-12 bg-gradient-to-b to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <FadeIn delay={0.2}>
          <ExecomHeader year={year} />
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <YearSelector currentYear={year} />
        </FadeIn>

        <motion.div
          key={`members-${year}`} // Re-render when year changes
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <ExecomGrid members={members} isLoading={isLoading} />
        </motion.div>
      </motion.div>
    </section>
  );
}