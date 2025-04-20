'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import MemberCard from '../MemberCard/index';
import { MemberCardSkeleton } from '@/app/ui/skeletons';
import { StaggerContainer } from '@/app/ui/animations/StaggerContainer';

export default function ExecomGrid({ 
  members, 
  isLoading 
}: { 
  members: any[];
  isLoading: boolean;
}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <MemberCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <StaggerContainer 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          delayChildren={0.2}
          staggerChildren={0.15}
        >
          {members.map((member, index) => (
            <motion.div 
              key={index}
              className="w-full flex justify-center"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }
                }
              }}
            >
              <Suspense fallback={<MemberCardSkeleton />}>
                <MemberCard member={member} />
              </Suspense>
            </motion.div>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}