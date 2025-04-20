'use client';

import { motion } from 'framer-motion';
import { IoCalendarOutline } from 'react-icons/io5';

export default function ExecomHeader({ year }: { year: string }) {
  return (
    <div className="py-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
            Executive Committee
          </span>
        </h1>
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
        className="mt-6 mx-auto h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
      />
    </div>
  );
}