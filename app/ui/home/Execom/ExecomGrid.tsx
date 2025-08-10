'use client';

import { Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import MemberCard from '../MemberCard/index';
import { MemberCardSkeleton } from '@/app/ui/skeletons';
import { StaggerContainer } from '@/app/ui/animations/StaggerContainer';

const societyHeadings = {
  bearer: 'Main Committee',
  cs: 'Computer Society',
  ias: 'IAS',
  ras: 'RAS',
  wie: 'WIE',
  other: 'Members', // A fallback for any other society value
};

// Mapping function to handle different database values
const mapSocietyToKey = (society: string): keyof typeof societyHeadings => {
  if (!society) return 'other';

  const normalizedSociety = society.toLowerCase().trim();

  // Map various possible database values to our keys
  const mappings: Record<string, keyof typeof societyHeadings> = {
    bearer: 'bearer',
    'main committee': 'bearer',
    main: 'bearer',
    cs: 'cs',
    'computer society': 'cs',
    computer: 'cs',
    ias: 'ias',
    ras: 'ras',
    wie: 'wie',
    'women in engineering': 'wie',
  };

  return mappings[normalizedSociety] || 'other';
};

const displayOrder: (keyof typeof societyHeadings)[] = [
  'bearer',
  'cs',
  'ias',
  'ras',
  'wie',
  'other',
];

export default function ExecomGrid({
  members,
  isLoading,
}: {
  members: any[];
  isLoading: boolean;
}) {
  // Custom order for positions
  const positionOrder = [
    'SB Chairperson',
    'SB Vice Chairperson',
    'SB Secretary',
    'SB Joint Secretary',
    'SB Treasurer',
    'MDC',
    'Technical Coordinator',
    'Link Rep',
    'Web Master',
    'ECC',
    'Operations Manager',
    'IAS Chairperson',
    'IAS Vice Chairperson',
    'IAS Secretary',
    'CS Chairperson',
    'CS Vice Chairperson',
    'CS Secretary',
    'CS Women in Computing',
    'WIE Chairperson',
    'WIE Vice Chairperson',
    'WIE Secretary',
    'RAS Chairperson',
    'RAS Vice Chairperson',
    'RAS Secretary',
  ];

  // Filter and sort members to match the exact priority list (case-insensitive)
  const sortedPriorityMembers = useMemo(() => {
    return positionOrder
      .map((position) =>
        members.find(
          (m) =>
            typeof m.position === 'string' &&
            m.position.trim().toLowerCase() === position.toLowerCase(),
        ),
      )
      .filter(Boolean);
  }, [members]);

  // Helper function to render a grid of members
  const renderMemberGrid = (memberList: any[]) => (
    <StaggerContainer
      className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3"
      delayChildren={0.2}
      staggerChildren={0.15}
    >
      {memberList.map((member, index) => (
        <motion.div
          key={member.id || index}
          className="flex w-full justify-center"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 100, damping: 12 },
            },
          }}
        >
          <Suspense fallback={<MemberCardSkeleton />}>
            <MemberCard member={member} />
          </Suspense>
        </motion.div>
      ))}
    </StaggerContainer>
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      {isLoading ? (
        <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: positionOrder.length }).map((_, i) => (
            <MemberCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <section>
          <h2 className="mb-8 text-center text-3xl font-bold">
            Execom Members
          </h2>
          {renderMemberGrid(sortedPriorityMembers)}
        </section>
      )}
    </div>
  );
}
