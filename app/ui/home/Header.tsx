'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'HOME', href: '/' },
  { name: 'EVENTS', href: '/events' },
  { name: 'EXECOM', href: '/execom/2024' },
  { name: 'ABOUT', href: '/about' },
  { name: 'ACHIEVEMENTS', href: '/achievements' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Advanced scroll effects
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.85, 1]);
  const headerHeight = useTransform(scrollY, [0, 100], ['76px', '68px']);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: headerHeight }}
    >
      {/* Updated backdrop with modern glassmorphism */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(8px)',
          opacity: headerOpacity,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#040D21]/95 to-[#071631]/95"
          animate={{
            boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
          }}
        />

        {/* Refined border treatment */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          animate={{
            background: isScrolled
              ? 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)'
              : 'none',
          }}
        />
      </motion.div>

      <div className="container mx-auto h-full px-4 lg:px-8">
        <div className="flex h-full items-center justify-between">
          {/* Logo Section - simplified and refined */}
          <Link
            href="/"
            className="group relative z-10 flex items-center gap-2.5"
          >
            <motion.div className="relative" whileHover={{ scale: 1.02 }}>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/30 to-blue-500/30 blur-md"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.6, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
              <motion.div
                className="relative rounded-full border border-white/10 bg-gradient-to-tr from-[#001F4D] to-[#0B3062] p-2"
                whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <Image
                  src="/ieee-logo-light.png"
                  alt="IEEE"
                  width={30}
                  height={30}
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>

            <div className="flex flex-col">
              <div className="flex items-center">
                <motion.h1 className="text-lg font-semibold tracking-tight text-white">
                  IEEE
                </motion.h1>
                <motion.span
                  className="ml-1.5 h-4 w-0.5 bg-accent"
                  animate={{
                    opacity: [1, 0.4, 1],
                    height: [14, 16, 14],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
              <motion.p className="-mt-0.5 text-xs font-medium text-white/70">
                CE KGR
              </motion.p>
            </div>
          </Link>

          {/* Desktop Navigation - cleaner styling */}
          <nav className="hidden items-center gap-8 md:flex">
            <motion.ul
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;

                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link href={item.href} className="group relative">
                      <motion.div
                        className={`px-3 py-2 text-sm font-medium transition-all ${
                          isActive
                            ? 'text-white'
                            : 'text-white/60 hover:text-white'
                        }`}
                        whileHover={{ y: -1 }}
                      >
                        {item.name}
                      </motion.div>

                      {/* Clean active indicator */}
                      {isActive ? (
                        <motion.span
                          className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-accent"
                          layoutId="navbar-indicator"
                          transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      ) : (
                        <motion.span
                          className="absolute -bottom-0.5 left-1/2 right-1/2 h-0.5 rounded-full bg-white/20 opacity-0 group-hover:left-0 group-hover:right-0 group-hover:opacity-100"
                          transition={{ type: 'tween', duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Join button with cleaner design */}
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="https://www.ieee.org/membership/join">
                <motion.button
                  className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-black transition-all hover:bg-accent/90"
                  whileHover={{ scale: 1.02, gap: '8px' }}
                  whileTap={{ scale: 0.98 }}
                >
                  JOIN IEEE
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.button>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button - improved visibility */}
          <motion.button
            className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <X size={24} className="text-accent" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} className="text-cyan" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - with additional close option */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col md:hidden"
            initial={{
              opacity: 0,
              clipPath: 'circle(0% at calc(100% - 40px) 40px)',
            }}
            animate={{
              opacity: 1,
              clipPath: 'circle(150% at calc(100% - 40px) 40px)',
            }}
            exit={{
              opacity: 0,
              clipPath: 'circle(0% at calc(100% - 40px) 40px)',
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Updated background treatment */}
            <div className="from-[#040D21]/98 to-[#071631]/98 absolute inset-0 bg-gradient-to-b backdrop-blur-xl" />

            {/* Decorative elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-accent/5 blur-[100px]"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-20 -left-32 h-80 w-80 rounded-full bg-blue-700/5 blur-[100px]"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </div>

            <nav className="relative z-10 flex flex-1 flex-col px-6 pb-8 pt-28">
              <ul className="space-y-2">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;

                  return (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.07, duration: 0.3 }}
                      className="w-full"
                    >
                      <Link href={item.href}>
                        <motion.div
                          className={`flex items-center justify-between rounded-lg p-4 text-base font-medium transition-all ${
                            isActive
                              ? 'border-l-2 border-accent bg-accent/10 text-white'
                              : 'border-l-2 border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                          whileHover={{ x: isActive ? 0 : 3 }}
                        >
                          <span>{item.name}</span>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring' }}
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                            </motion.div>
                          )}
                        </motion.div>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto">
                <div className="pb-4 pt-8">
                  <Link href="https://www.ieee.org/membership/join">
                    <motion.button
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-base font-medium text-white transition-all hover:bg-accent/90"
                      whileHover={{ gap: '10px' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Join IEEE
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </Link>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 flex justify-center"
                >
                  <Image
                    src="/ieee-logo-light.png"
                    alt="IEEE Logo"
                    width={90}
                    height={25}
                    className="opacity-50"
                  />
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
