'use client';

import { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import ExecomContainer from './ExecomContainer';
import { MemberCardSkeleton } from '@/app/ui/skeletons';

export default function Execom({
  members,
  year,
  years,
}: {
  members: any;
  year: string;
  years: string[];
}) {
  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <MemberCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        {/* pass years along here */}
        <ExecomContainer members={members} year={year} years={years} />
      </Suspense>
    </AnimatePresence>
  );
}
