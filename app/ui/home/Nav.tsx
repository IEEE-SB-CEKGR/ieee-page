'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8">
      {links.map((link: { name: string; path: string }, index: number) => (
        <Link
          href={link.path}
          key={index}
          className={`${pathname === link.path && 'border border-accent p-1 px-3 text-accent'} font-medium capitalize transition-all hover:text-accent`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
