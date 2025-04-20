'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'HOME', href: '/' },
  { name: 'EVENTS', href: '/events' },
  { name: 'MEMBERS', href: '/members' },
  //{ name: 'Gallery', href: '/gallery' },
  { name: 'ABOUT', href: '/about' },
  //{ name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    initial: {
      backgroundColor: 'rgba(4, 13, 33, 0)',
      backdropFilter: 'blur(0px)',
    },
    scrolled: {
      backgroundColor: 'rgba(4, 13, 33, 0.7)',
      backdropFilter: 'blur(12px)',
    },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all"
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={headerVariants}
      transition={{ duration: 0.4 }}
      style={{
        borderColor: isScrolled ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
      }}
    >
      {/* Decorative accent line */}
      <motion.div 
        className="h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: isScrolled ? 1 : 0,
          opacity: isScrolled ? 1 : 0
        }}
        transition={{ duration: 0.6 }}
      />

      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center group">
          <div className="relative h-9 w-9 mr-3 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-accent/20 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <Image 
              src="/ieee-logo-light.png" 
              alt="IEEE" 
              width={36}
              height={36}
              className="object-contain relative z-10 transition-transform group-hover:scale-110 duration-300" 
              priority 
            />
          </div>
          <div>
            <motion.p 
              className="font-bold text-xl text-white leading-none tracking-tight"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              IEEE
            </motion.p>
            <motion.p 
              className="text-xs text-white/70"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              CE KGR
            </motion.p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <motion.li key={item.name} className="relative mx-1">
                  <Link 
                    href={item.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative flex items-center ${
                      isActive 
                        ? 'text-white bg-white/10' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                        layoutId="navbar-indicator"
                        transition={{ type: 'spring', duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
            
            {/* Join Button with enhanced style */}
            <motion.div 
              className="ml-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/join"
                className="relative inline-flex items-center gap-2 overflow-hidden py-2 px-5 bg-accent rounded-md font-medium text-sm group"
              >
                <span className="relative z-10 text-primary">JOIN IEEE</span>
                <motion.span
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <ChevronRight className="w-4 h-4 text-primary" />
                </motion.span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-accent to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-[73px] z-40 flex flex-col md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 73px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background with gradient and blur */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-[#040D21]/95 to-[#0A1A3A]/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 -left-20 w-72 h-72 bg-blue-700/10 rounded-full blur-[100px]" />
            </div>
            
            <nav className="relative z-10 flex-1 px-6 py-8 flex flex-col">
              <ul className="space-y-2">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  
                  return (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="w-full"
                    >
                      <Link 
                        href={item.href}
                        className={`flex items-center justify-between p-4 rounded-lg text-lg font-medium transition-all ${
                          isActive 
                            ? 'bg-accent/20 text-accent' 
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                        {isActive ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring' }}
                          >
                            <div className="h-2 w-2 rounded-full bg-accent" />
                          </motion.div>
                        ) : (
                          <ChevronRight className="w-4 h-4 opacity-50" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              
              <div className="mt-auto pt-8 border-t border-white/10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative overflow-hidden rounded-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-blue-500 opacity-40 blur-sm" />
                  <Link 
                    href="/join"
                    className="relative block py-4 px-4 bg-accent/20 backdrop-blur-sm rounded-lg text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <p className="text-sm text-white/70 mb-1">Not yet a member?</p>
                    <p className="text-accent text-lg font-bold">Join IEEE Today</p>
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center mt-8"
                >
                  <Image 
                    src="/ieee-logo-light.png" 
                    alt="IEEE Logo" 
                    width={120}
                    height={30}
                    className="opacity-60"
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
