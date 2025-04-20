'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedDescriptionProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedDescription: React.FC<AnimatedDescriptionProps> = ({
  text,
  className = "",
  delay = 0,
}) => {
  // Split paragraph into words
  const words = text.split(' ');
  
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * 0.03,
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
      
      {/* Animated gradient underline */}
      <motion.span
        className="block h-0.5 bg-gradient-to-r from-accent via-blue-400 to-accent/0 mt-2"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + words.length * 0.03 + 0.2, duration: 0.8 }}
      />
    </motion.p>
  );
};

export default AnimatedDescription;