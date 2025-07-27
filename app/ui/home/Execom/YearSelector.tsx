'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface YearSelectorProps {
  currentYear: number | string;
  years: (number | string)[];
}

const YearSelector = ({ currentYear, years }: YearSelectorProps) => {
  const router = useRouter();
  const [windowStart, setWindowStart] = useState(0);
  const windowSize = 5;

  const currentYearIndex = years.indexOf(currentYear);

  useEffect(() => {
    if (currentYearIndex === -1) return;

    let newWindowStart = windowStart;

    if (currentYearIndex < windowStart) {
      newWindowStart = currentYearIndex;
    } else if (currentYearIndex >= windowStart + windowSize) {
      newWindowStart = currentYearIndex - windowSize + 1;
      if (newWindowStart < 0) {
        newWindowStart = 0;
      }
    }

    const maxWindowStart = years.length - windowSize;
    if (maxWindowStart < 0) {
      newWindowStart = 0;
    } else if (newWindowStart > maxWindowStart) {
      newWindowStart = maxWindowStart;
    }

    if (newWindowStart !== windowStart) {
      setWindowStart(newWindowStart);
    }
  }, [currentYear, currentYearIndex, windowStart, years.length]);

  const visibleYears = years.slice(windowStart, windowStart + windowSize);
  const canNavigateLeft = currentYearIndex > 0;
  const canNavigateRight = currentYearIndex < years.length - 1;

  const handleYearChange = (year: string | number) => {
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
      className="mx-auto mb-12 flex items-center justify-center space-x-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 shadow-lg backdrop-blur-sm sm:space-x-2"
      style={{
        minWidth:
          years.length === 1
            ? '12rem'
            : years.length <= 3
              ? '15rem'
              : 'fit-content',
        maxWidth: '24rem',
      }}
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
        whileHover={canNavigateLeft ? { scale: 1.1 } : undefined}
        whileTap={canNavigateLeft ? { scale: 0.95 } : undefined}
      >
        <HiChevronLeft size={18} />
      </motion.button>

      <div className="flex flex-1 justify-center overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {visibleYears.map((year) => {
            const isCurrentYear = year === currentYear;

            return (
              <motion.button
                key={year}
                onClick={() => handleYearChange(year)}
                className="relative mx-0.5 flex-shrink-0 rounded-full px-2.5 py-1.5 text-xs font-medium sm:text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ opacity: isCurrentYear ? 1 : 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {isCurrentYear && (
                  <motion.div
                    layoutId="activeYearPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isCurrentYear ? 'font-bold text-white' : 'text-gray-300'
                  }`}
                >
                  {year}
                </span>
              </motion.button>
            );
          })}
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
        whileHover={canNavigateRight ? { scale: 1.1 } : undefined}
        whileTap={canNavigateRight ? { scale: 0.95 } : undefined}
      >
        <HiChevronRight size={18} />
      </motion.button>
    </motion.div>
  );
};

export default YearSelector;
