'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000, className = "" }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  
  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;
      
      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        const currentCount = Math.floor(percentage * end);
        
        setCount(currentCount);
        
        if (percentage < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };
      
      animationFrame = requestAnimationFrame(updateCount);
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [isInView, end, duration]);
  
  return <span ref={nodeRef} className={className}>{count}</span>;
};

export default CountUp;