'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CircuitTextProps {
  text: string;
  className?: string;
  delay?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

const CircuitText: React.FC<CircuitTextProps> = ({
  text,
  className = "",
  delay = 0,
  primaryColor = "#00AEEF",
  secondaryColor = "#ffffff",
}) => {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      {/* Main Text */}
      <motion.h2 
        className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-accent"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ 
          delay: delay + 0.2, 
          duration: 1.2, 
          ease: [0.25, 1, 0.5, 1] 
        }}
      >
        {text}
      </motion.h2>
      
      {/* Circuit Lines Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Horizontal lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`h-line-${i}`}
            className="absolute h-[1px] bg-accent/40"
            style={{ 
              top: `${20 + i * 20}%`, 
              left: '0',
            }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ 
              delay: delay + 0.05 * i, 
              duration: 0.8, 
              ease: "easeOut" 
            }}
          />
        ))}
        
        {/* Vertical lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`v-line-${i}`}
            className="absolute w-[1px] bg-accent/40"
            style={{ 
              left: `${10 + i * 12}%`, 
              top: '0',
            }}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ 
              delay: delay + 0.05 * i + 0.4, 
              duration: 0.5, 
              ease: "easeOut" 
            }}
          />
        ))}
        
        {/* Circuit nodes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent"
            style={{ 
              top: `${30 + (i * 15) % 60}%`, 
              left: `${15 + (i * 19) % 80}%` 
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: delay + 0.8 + i * 0.1, 
              duration: 0.3,
              type: "spring"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CircuitText;