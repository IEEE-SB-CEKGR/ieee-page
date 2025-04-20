'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoaderTransition() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-b from-[#040D21] to-[#0A1A3A]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-32 h-32"
          >
            <Image
              src="/ieee-logo.png"
              alt="IEEE Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          
          <motion.div 
            className="mt-8 relative h-1 bg-white/20 rounded-full w-48 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="absolute top-0 left-0 h-full bg-accent rounded-full" 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
          
          <motion.p
            className="mt-6 text-white/70 font-medium tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Advancing Technology for Humanity
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
