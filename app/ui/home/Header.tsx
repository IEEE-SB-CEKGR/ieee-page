import Link from 'next/link';
import { Button } from './ui/button';
import Nav from './Nav';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className="py-4 text-white xl:py-12">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* logo */}
        <Link href="/">
          <h1 className="rounded-sm text-3xl  font-semibold animate-in">
            IEEE CE KGR
          </h1>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 xl:flex">
          <Nav />
          <Link
            href="https://www.ieee.org/membership/join/index.html?WT.mc_id=hc_join"
            target="_blank"
          >
            <Button className="font-bold">Join</Button>
          </Link>
        </div>
        {/* Mobile Nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
export default Header;
