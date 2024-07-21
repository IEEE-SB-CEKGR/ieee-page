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
    name: 'services',
    path: '/services',
  },
  {
    name: 'resume',
    path: '/resume',
  },
  {
    name: 'work',
    path: '/work',
  },
  {
    name: 'contact',
    path: '/contact',
  },
];

const MobileNav = () => {
  const pathnaname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        <CiMenuFries className="text-accent text-[32px]" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/*logo*/}
        <div className="mb-40 mt-32 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Alwin<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        {/*nav*/}
        <nav className="flex flex-col items-center justify-center gap-8">
          {links.map((link: { name: string; path: string }, index: number) => (
            <Link
              href={link.path}
              key={index}
              className={`${link.path === pathnaname && 'text-accent border-accent border-b-2'} hover:text-accent text-xl capitalize  transition-all`}
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
