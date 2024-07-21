import Link from 'next/link';
import { Button } from './ui/button';
import Nav from './Nav';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className="py-8 text-white dark:text-white xl:py-12">
      <div className="container mx-auto flex items-center justify-between">
        {/*logo*/}
        <Link href="">
          <h1 className="text-4xl font-semibold">
            IEEE CEK<span className="text-accent">.</span>
          </h1>
        </Link>
        {/*Desktop Nav*/}
        <div className="hidden items-center gap-8 xl:flex">
          <Nav />
          <Link href="/contact">
            <Button>Join</Button>
          </Link>
        </div>

        {/*Mobile Nav*/}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
