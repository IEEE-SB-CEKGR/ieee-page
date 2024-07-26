'use client';

import React from 'react';

const MemberCardSkeleton: React.FC = () => {
  return (
    <div className="bg-dark mem-border-color animate-pulse w-full max-w-sm transform rounded-lg border motion-safe:hover:scale-105">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <div className="mb-3 h-40 w-40 rounded-full bg-gray-300"></div>
        <div className="mb-1 h-6 w-24 bg-gray-300"></div>
        <div className="h-4 w-16 bg-gray-300"></div>
      </div>
    </div>
  );
};

export default MemberCardSkeleton;
