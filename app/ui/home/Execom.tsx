'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { MemberCardSkeleton } from '@/app/ui/skeletons'; // Ensure the path is correct
import MemberCard from './MemberCard'; // Ensure the path is correct

export default function Execom({
  members,
  year,
}: {
  members: any;
  year: string;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const handleYearChange = (year: string) => {
    if (year) {
      router.push(`/execom/${year}`);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Simulate a fetch call for members
    const fetchMembers = async () => {
      // Simulate a delay to fetch the members (you would replace this with your actual data fetching logic)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false); // Data has been fetched, set loading to false
    };

    fetchMembers(); // Fetch the members

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className="min-h-screen w-full">
      <div className="mx-auto h-full w-full p-4 sm:p-10">
        <div className="relative z-20">
          <form>
            <button
              id="dropdownDefaultButton"
              ref={buttonRef}
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown();
              }}
              className="ml-4 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:ml-11"
              type="button"
              name="year"
            >
              {year}
              <svg
                className="ms-3 h-2.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
          </form>
          <div
            ref={dropdownRef}
            id="dropdown"
            className={`${
              isDropdownOpen ? 'visible opacity-100' : 'invisible opacity-0'
            } absolute left-0 mt-2 w-44 divide-y divide-gray-100 rounded-lg bg-[#0EA5C8] text-white shadow transition-opacity duration-300 dark:bg-gray-700`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {['2023', '2022', '2021', '2020'].map((yearOption) => (
                <li key={yearOption}>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleYearChange(yearOption)}
                  >
                    {yearOption}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex w-full flex-wrap justify-center gap-4 p-4 sm:gap-10 sm:p-10">
          {isLoading
            ? // Show skeletons while loading
              Array.from({ length: 6 }).map((_, index) => (
                <MemberCardSkeleton key={index} />
              ))
            : members.map((member: any, index: any) => (
                <Suspense key={index} fallback={<MemberCardSkeleton />}>
                  <MemberCard key={index} member={member} />
                </Suspense>
              ))}
        </div>
      </div>
    </section>
  );
}
