'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface TypewriterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  cursorColor?: string;
  highlightColor?: string;
  showCursor?: boolean;
}

const TypewriterReveal: React.FC<TypewriterRevealProps> = ({
  text,
  className = "",
  delay = 0,
  cursorColor = "#00AEEF",
  highlightColor = "#00AEEF",
  showCursor = true,
}) => {
  const characters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: delay 
      }
    }
  };
  
  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  return (
    <div className="relative">
      <motion.span
        className={`inline-block ${className}`}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block relative overflow-visible"
          >
            {char === " " ? "\u00A0" : char}
            <motion.span
              className="absolute -z-10 bottom-0 left-0 right-0 h-[5%]"
              style={{ backgroundColor: highlightColor }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: delay + 0.05 * index + 0.2,
                duration: 0.3,
                ease: "easeOut",
              }}
            />
          </motion.span>
        ))}
      </motion.span>
      
      {showCursor && (
        <motion.span
          className="inline-block w-[3px] h-[1em] ml-1 align-middle"
          style={{ backgroundColor: cursorColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0, 1, 0, 1, 0, 1] }}
          transition={{
            delay: delay + characters.length * 0.05 + 0.5,
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      )}
    </div>
  );
};

export default TypewriterReveal;