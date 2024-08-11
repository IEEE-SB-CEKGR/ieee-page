'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/app/ui/home/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CiMenuFries } from 'react-icons/ci';

const links = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'Execom',
    path: '/execom/2023',
  },
  {
    name: 'Events',
    path: '/events',
  },
  {
    name: 'About Us',
    path: '/about',
  },
];

const MobileNav = () => {
  const pathnaname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/*logo*/}
        <div className="mb-20 mt-32 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold text-white">
              IEEE CEK<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        {/*nav*/}
        <nav className="flex flex-col items-center justify-center gap-8">
          {links.map((link: { name: string; path: string }, index: number) => (
            <Link
              href={link.path}
              key={index}
              className={`${link.path === pathnaname && 'border-b-2 border-accent'} text-xl capitalize text-white transition-all  hover:text-accent`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
