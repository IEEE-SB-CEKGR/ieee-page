'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function YearSelector({
  currentYear,
  years,
}: {
  currentYear: string;
  years: string[];
}) {
  const router = useRouter();
  const [windowStart, setWindowStart] = useState(0);
  const windowSize = 5;

  // Calculate the current year's position in the full years array
  const currentYearIndex = years.indexOf(currentYear);

  // Adjust window start to ensure current year is visible with consistent sliding behavior
  useEffect(() => {
    if (currentYearIndex !== -1) {
      let newWindowStart = windowStart;

      // If current year is before the current window, shift window left
      if (currentYearIndex < windowStart) {
        newWindowStart = currentYearIndex;
      }
      // If current year is after the current window, shift window right
      else if (currentYearIndex >= windowStart + windowSize) {
        newWindowStart = Math.max(0, currentYearIndex - windowSize + 1);
      }

      // Ensure we don't go beyond the array bounds
      newWindowStart = Math.max(
        0,
        Math.min(newWindowStart, years.length - windowSize),
      );

      if (newWindowStart !== windowStart) {
        setWindowStart(newWindowStart);
      }
    }
  }, [currentYear, currentYearIndex, windowStart, years.length]);

  // Get the visible years for current window
  const visibleYears = years.slice(windowStart, windowStart + windowSize);

  // Check if we can navigate to previous/next year
  const canNavigateLeft = currentYearIndex > 0;
  const canNavigateRight = currentYearIndex < years.length - 1;

  const handleYearChange = (year: string) => {
    router.push(`/execom/${year}`);
  };

  const handleNavigateLeft = () => {
    if (canNavigateLeft) {
      const prevYear = years[currentYearIndex - 1];
      handleYearChange(prevYear);
    }
  };

  const handleNavigateRight = () => {
    if (canNavigateRight) {
      const nextYear = years[currentYearIndex + 1];
      handleYearChange(nextYear);
    }
  };

  return (
    <motion.div
      className="mx-auto mb-12 flex max-w-sm items-center justify-center space-x-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 shadow-lg backdrop-blur-sm sm:space-x-2"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.button
        onClick={handleNavigateLeft}
        className={`flex-shrink-0 rounded-full p-1.5 ${
          canNavigateLeft
            ? 'text-blue-500 hover:bg-blue-500/10 hover:text-blue-400'
            : 'cursor-not-allowed text-gray-500 opacity-30'
        }`}
        disabled={!canNavigateLeft}
        whileHover={canNavigateLeft ? { scale: 1.1 } : {}}
        whileTap={canNavigateLeft ? { scale: 0.95 } : {}}
      >
        <HiChevronLeft size={18} />
      </motion.button>

      <div className="flex flex-1 justify-center overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {visibleYears.map((year, index) => (
            <motion.button
              key={year}
              onClick={() => handleYearChange(year)}
              className="relative mx-0.5 flex-shrink-0 rounded-full px-2.5 py-1.5 text-xs font-medium sm:text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: year === currentYear ? 1 : 0.6 }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: year === currentYear ? 1 : 0.6,
                x: 0,
              }}
              exit={{ opacity: 0, x: -20 }}
            >
              {year === currentYear && (
                <motion.div
                  layoutId="activeYearPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  year === currentYear
                    ? 'font-bold text-white'
                    : 'text-gray-300'
                }`}
              >
                {year}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <motion.button
        onClick={handleNavigateRight}
        className={`flex-shrink-0 rounded-full p-1.5 ${
          canNavigateRight
            ? 'text-blue-500 hover:bg-blue-500/10 hover:text-blue-400'
            : 'cursor-not-allowed text-gray-500 opacity-30'
        }`}
        disabled={!canNavigateRight}
        whileHover={canNavigateRight ? { scale: 1.1 } : {}}
        whileTap={canNavigateRight ? { scale: 0.95 } : {}}
      >
        <HiChevronRight size={18} />
      </motion.button>
    </motion.div>
  );
}
