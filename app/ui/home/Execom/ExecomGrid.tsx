// app/ui/home/Execom/ExecomGrid.tsx
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

// NEW WAY: A robust keyword-based weighting system 
// Lower number = Higher priority (appears first)
const getRolePriority = (role: string): number => {
  if (!role) return 999;
  
  const r = role.toLowerCase().trim();

  // 1. Counselors & Advisors (Always Top)
  if (r.includes('counselor') || r.includes('counsellor')) return 10;
  if (r.includes('advisor')) return 20;

  // 2. Core Chairs
  if (r === 'sb chairperson' || r === 'chairperson' || r === 'chair') return 30;
  if (r.includes('chairperson') && !r.includes('vice') && !r.includes('joint')) return 35;
  if (r.includes('chair') && !r.includes('vice') && !r.includes('joint')) return 38;

  // 3. Vice Chairs
  if (r === 'sb vice chairperson' || r === 'vice chairperson' || r === 'vice chair') return 40;
  if (r.includes('vice') && (r.includes('chairperson') || r.includes('chair'))) return 45;

  // 4. Secretaries
  if (r === 'sb secretary' || r === 'secretary') return 50;
  if (r.includes('secretary') && !r.includes('joint') && !r.includes('assistant')) return 55;

  // 5. Joint Secretaries / Assistant
  if (r === 'sb joint secretary' || r === 'joint secretary') return 60;
  if (r.includes('joint') && r.includes('secretary')) return 65;

  // 6. Treasurers
  if (r === 'sb treasurer' || r === 'treasurer') return 70;
  if (r.includes('treasurer')) return 75;

  // 7. Specific Functional Roles
  if (r === 'mdc' || r.includes('membership development')) return 80;
  if (r.includes('technical coordinator') || r.includes('tech coord')) return 90;
  if (r.includes('link rep') || r.includes('link representative')) return 100;
  if (r.includes('web master') || r.includes('webmaster')) return 110;
  if (r === 'ecc' || r.includes('electronic communications')) return 120;
  if (r.includes('operations manager') || r.includes('operations')) return 130;
  if (r.includes('women in computing') || r === 'wic') return 140;
  if (r.includes('tech lead') || r.includes('technical lead')) return 150;

  // 8. Catch-all for other leads
  if (r.includes('lead') || r.includes('head') || r.includes('coordinator')) return 200;

  // 999. Unrecognized roles drop to the bottom of their respective group
  return 999;
};

export default function ExecomGrid({
  members,
  isLoading,
}: {
  members: any[];
  isLoading: boolean;
}) {
  // Group members by society, and sort them using the robust weighting function
  const groupedAndSortedMembers = useMemo(() => {
    
    // Sort the members safely without filtering anyone out
    const sortedMembers = [...members].sort((a, b) => {
      const aPriority = getRolePriority(a.role);
      const bPriority = getRolePriority(b.role);
      return aPriority - bPriority;
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