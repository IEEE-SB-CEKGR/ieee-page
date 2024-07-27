'use client';

import Image from 'next/image';
import { Member } from '@/app/lib/definitions';

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <div className=" bg-dark  mem-border-color w-full max-w-sm rounded-lg border transition  duration-300 ease-in-out motion-safe:hover:scale-105">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <Image
          className="mb-3 h-40 w-40 rounded-full shadow-lg"
          src={member.image_url}
          alt="Bonnie image"
          width={96}
          height={96}
        />
        <h5 className="mb-1 text-xl font-medium text-white">{member.name}</h5>
        <span className="text-sm text-gray-400 dark:text-gray-400">
          {member.role}
        </span>
      </div>
    </div>
  );
};

export default MemberCard;
