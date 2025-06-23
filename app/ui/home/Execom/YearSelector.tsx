'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { sql } from '@vercel/postgres';

const years_sql_query = await sql<{ year: number }>`
  SELECT DISTINCT year FROM members
  ORDER BY year
`;

const years = years_sql_query.rows.map(row => row.year);

export default function YearSelector({ currentYear }: { currentYear: string }) {
  const router = useRouter();
  const currentIndex = years.indexOf(currentYear);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < years.length - 1;

  const handleYearChange = (year: string) => {
    router.push(`/execom/${year}`);
  };

  return (
    <motion.div
      className="flex items-center justify-center space-x-1 sm:space-x-2 mx-auto mb-12 max-w-sm bg-white/5 backdrop-blur-sm rounded-full px-2 py-1.5 border border-white/10 shadow-lg"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.button
        onClick={() => hasPrevious && handleYearChange(years[currentIndex - 1])}
        className={`flex-shrink-0 rounded-full p-1.5 ${
          hasPrevious
            ? 'text-blue-500 hover:bg-blue-500/10 hover:text-blue-400'
            : 'text-gray-500 opacity-30 cursor-not-allowed'
        }`}
        disabled={!hasPrevious}
        whileHover={hasPrevious ? { scale: 1.1 } : {}}
        whileTap={hasPrevious ? { scale: 0.95 } : {}}
      >
        <HiChevronLeft size={18} />
      </motion.button>

      <div className="flex justify-center flex-1">
        {years.map((year) => (
          <motion.button
            key={year}
            onClick={() => handleYearChange(year)}
            className={`relative px-2.5 py-1.5 text-xs sm:text-sm font-medium rounded-full mx-0.5`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ opacity: year === currentYear ? 1 : 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {year === currentYear && (
              <motion.div
                layoutId="activeYearPill"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${year === currentYear ? 'text-white font-bold' : 'text-gray-300'}`}>
              {year}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={() => hasNext && handleYearChange(years[currentIndex + 1])}
        className={`flex-shrink-0 rounded-full p-1.5 ${
          hasNext
            ? 'text-blue-500 hover:bg-blue-500/10 hover:text-blue-400'
            : 'text-gray-500 opacity-30 cursor-not-allowed'
        }`}
        disabled={!hasNext}
        whileHover={hasNext ? { scale: 1.1 } : {}}
        whileTap={hasNext ? { scale: 0.95 } : {}}
      >
        <HiChevronRight size={18} />
      </motion.button>
    </motion.div>
  );
}
