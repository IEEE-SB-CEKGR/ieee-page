'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import Header from '@/app/ui/home/Header';
import MemberCard from '@/app/ui/home/MemberCard';
import { useRouter } from 'next/navigation';
import MemberCardSkeleton from './MemberCardSkeleton';

export default function Execom(data: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  console.log('execom page : ', data.members);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className="h-full w-full bg-[#1c1c22] sm:w-screen">
      <Header />
      <div className="mx-auto h-full w-full p-3">
        <div className="relative z-20">
          <form>
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="ml-11 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              name="year"
              defaultValue={data.year}
            >
              {data.year}
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
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleYearChange('2023')}
                >
                  2023
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleYearChange('2022')}
                >
                  2022
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleYearChange('2021')}
                >
                  2021
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleYearChange('2020')}
                >
                  2020
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-20 flex w-full flex-wrap justify-center gap-10">
          {data.members.map((member: any, index: any) => (
            <Suspense key={index} fallback={<MemberCardSkeleton />}>
              <MemberCard key={index} member={member} />
            </Suspense>
          ))}
        </div>
      </div>
    </section>
  );
}
