'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoaderTransition() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2400);
  }, []);

  // Grid animation elements
  const gridItems = Array.from({ length: 36 }, (_, i) => i);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
          }}
        >
          {/* Background with animated gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#040D21] to-[#0A1A3A]"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Animated grid backdrop - for tech aesthetic */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="grid h-full w-full grid-cols-6 grid-rows-6 gap-0.5">
              {gridItems.map((item) => (
                <motion.div
                  key={item}
                  className="rounded-sm bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{
                    duration: 0.8,
                    delay: item * 0.01,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo container with ring effect */}
            <div className="relative">
              {/* Outer animated ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-accent/40"
                initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />

              {/* Animated pulse ring */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-accent/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Logo with enhanced animation */}
              <motion.div
                className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/5 bg-gradient-to-tr from-[#051326] to-[#0C2341] p-6 shadow-lg"
                initial={{ y: 20, opacity: 0, rotateY: -20 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  rotateY: 0,
                }}
                transition={{
                  type: 'spring',
                  damping: 20,
                  stiffness: 100,
                  delay: 0.2,
                }}
              >
                <motion.div
                  className="relative h-full w-full"
                  animate={{
                    scale: [0.9, 1.02, 0.9],
                    rotateZ: [0, 2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Image
                    src="/ieee-logo-trans.png"
                    alt="IEEE Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Loading bar with sequential style */}
            <div className="relative mt-10">
              <motion.div
                className="relative h-1 w-60 overflow-hidden rounded-full bg-white/10"
                initial={{ opacity: 0, width: '40%' }}
                animate={{ opacity: 1, width: '60%' }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent via-blue-400 to-accent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute left-0 top-0 h-full w-full rounded-full bg-accent/40"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </motion.div>
            </div>

            {/* Organization name reveal */}
            <div className="mt-8 overflow-hidden">
              <motion.p
                className="text-lg font-bold tracking-wider text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
              >
                IEEE <span className="text-accent">SB CE KGR</span>
              </motion.p>
            </div>

            {/* Tagline with character animation */}
            <div className="mt-3 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {/* Revealing the tagline character by character */}
                <div className="flex justify-center">
                  {'Advancing Technology for Humanity'
                    .split('')
                    .map((char, index) => (
                      <motion.span
                        key={index}
                        className={`text-sm ${char === ' ' ? 'mr-1' : ''} ${char === 'T' || char === 'H' ? 'text-accent/90' : 'text-white/70'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 1.4 + index * 0.03,
                          ease: 'easeOut',
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
