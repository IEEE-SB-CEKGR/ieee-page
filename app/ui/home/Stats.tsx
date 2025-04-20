'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { id: 1, value: '50+', label: 'Events Organized' },
  { id: 2, value: '500+', label: 'Student Members' },
  { id: 3, value: '25+', label: 'Awards Won' },
  { id: 4, value: '10+', label: 'Years of Excellence' },
];

export default function Stats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={containerRef}
      className="grid grid-cols-2 gap-8 md:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            delay: index * 0.1,
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <motion.div 
            className="text-4xl sm:text-5xl font-bold text-accent mb-2"
            initial={{ scale: 0.8 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ 
              delay: 0.3 + index * 0.1,
              duration: 0.4,
              type: "spring",
              stiffness: 200
            }}
          >
            {stat.value}
          </motion.div>
          <div className="text-white/70 text-center font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
