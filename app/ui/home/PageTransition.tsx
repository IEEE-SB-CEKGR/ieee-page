'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname} // Ensure animation is triggered on route change
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.4, ease: 'easeInOut' },
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }} // Enter transition
        className="relative"
      ></motion.div>

      {children}
      <motion.div
        key={`${pathname}-overlay`} // Ensure overlay has its own key
        className="pointer-events-none fixed left-0 top-0 z-50 h-screen w-screen bg-primary"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{
          opacity: 1,
          transition: { delay: 0.6, duration: 0.4, ease: 'easeInOut' },
        }} // Fade out the overlay during page exit
      ></motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
