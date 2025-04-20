'use client';

import React, { ReactNode, forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  ({ children, className = "", delay = 0 }, ref) => {
    const sectionRef = React.useRef(null);
    const combinedRef = (node: HTMLElement) => {
      // @ts-ignore - forwardRef typing issue
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
      // @ts-ignore - forwardRef typing issue
      sectionRef.current = node;
    };

    const isInView = useInView(sectionRef, { 
      once: true, 
      amount: 0.2 
    });

    return (
      <motion.section
        ref={combinedRef}
        className={className}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1],
          delay 
        }}
      >
        {children}
      </motion.section>
    );
  }
);

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;