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
  other: 'Members',
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
    'BRANCH COUNSELOR',
    'SB CHAIRPERSON',
    'SB VICE CHAIRPERSON',
    'SB SECRETARY',
    'SB JOINT SECRETARY',
    'SB TREASURER',
    'MDC',
    'TECHNICAL COORDINATOR',
    'LINK REP',
    'WEB MASTER',
    'ECC',
    'OPERATIONS MANAGER',
    'CS CHAPTER ADVISOR',
    'IAS CHAPTER ADVISOR',
    'RAS CHAPTER ADVISOR',
    'WIE CHAPTER ADVISOR',
    'CHAIRPERSON',
    'VICE CHAIRPERSON',
    'SECRETARY',
    'WOMEN IN COMPUTING',
  ];

  // Group members by society, but sort by positionOrder
  const groupedAndSortedMembers = useMemo(() => {
    // Filter members whose role matches positionOrder (case-insensitive, trimmed)
    const filteredMembers = members.filter((m) => {
      const role = (m.role || '').toString().toLowerCase().trim();
      return positionOrder.some((pos) => pos.toLowerCase().trim() === role);
    });

    // Sort strictly by positionOrder
    const sortedMembers = [...filteredMembers].sort((a, b) => {
      const aRole = (a.role || '').toString().toLowerCase().trim();
      const bRole = (b.role || '').toString().toLowerCase().trim();
      const aIdx = positionOrder.findIndex(
        (pos) => pos.toLowerCase().trim() === aRole,
      );
      const bIdx = positionOrder.findIndex(
        (pos) => pos.toLowerCase().trim() === bRole,
      );
      return aIdx - bIdx;
    });

    // Initialize an object to hold the groups
    const initialGroups: Record<string, any[]> = {
      bearer: [],
      cs: [],
      ias: [],
      ras: [],
      wie: [],
      other: [],
    };

    // Distribute sorted members into the appropriate groups
    return sortedMembers.reduce((acc, member) => {
      const society = member.society;
      const mappedSociety = mapSocietyToKey(society);
      acc[mappedSociety].push(member);
      return acc;
    }, initialGroups);
  }, [members]);

  // Helper function to render a grid of members for a society
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
          {Array.from({ length: 9 }).map((_, i) => (
            <MemberCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-16">
          {displayOrder.map((societyKey) => {
            const memberList = groupedAndSortedMembers[societyKey];
            if (memberList && memberList.length > 0) {
              return (
                <section key={societyKey}>
                  <h2 className="mb-8 text-center text-3xl font-bold">
                    {societyHeadings[societyKey]}
                  </h2>
                  {renderMemberGrid(memberList)}
                </section>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
