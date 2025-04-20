'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'HOME', href: '/' },
  { name: 'EVENTS', href: '/events' },
  { name: 'EXECOM', href: '/execom/2024' },
  { name: 'ABOUT', href: '/about' },
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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ backdropFilter: 'blur(0px)', backgroundColor: 'rgba(4, 13, 33, 0)' }}
      animate={{ 
        backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
        backgroundColor: isScrolled ? 'rgba(4, 13, 33, 0.85)' : 'rgba(4, 13, 33, 0)',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent'
      }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-3 relative z-10">
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-accent/30 to-blue-500/30 rounded-full blur-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="relative bg-gradient-to-tr from-[#001F4D] to-[#0B3062] p-2 rounded-full border border-white/10">
                <Image 
                  src="/ieee-logo-light.png" 
                  alt="IEEE" 
                  width={32}
                  height={32}
                  className="object-contain transition-transform group-hover:scale-110 duration-300" 
                  priority 
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center">
                <h1 className="text-xl font-bold tracking-tight text-white">IEEE</h1>
                <motion.span 
                  className="h-4 w-1 bg-accent ml-1.5"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <p className="text-xs text-white/70 font-medium tracking-wide -mt-1">CE KGR</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <motion.li key={item.name} whileHover={{ y: -1 }} className="relative">
                    <Link 
                      href={item.href}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative flex items-center ${
                        isActive 
                          ? 'text-white' 
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <motion.span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-blue-400 to-accent rounded-full"
                          layoutId="navbar-indicator"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
              
              {/* Join Button with minimal and professional style */}
              <motion.div 
                className="ml-6"
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="/join"
                  className="group relative inline-flex items-center gap-1.5 py-2 px-5 bg-transparent border border-accent/60 hover:border-accent text-sm font-medium text-white rounded-md transition-all"
                >
                  <span className="relative z-10">JOIN IEEE</span>
                  <ExternalLink className="w-3.5 h-3.5 text-accent/80 group-hover:text-accent transition-colors" />
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
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-[72px] z-40 flex flex-col md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 72px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background with gradient and blur */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-[#040D21]/98 to-[#071631]/98 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
              <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-blue-700/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-40 right-10 h-20 w-20 rounded-full bg-accent/20 blur-xl" />
            </div>
            
            <nav className="relative z-10 flex-1 px-6 py-10 flex flex-col">
              <ul className="space-y-3">
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
                      <Link 
                        href={item.href}
                        className={`flex items-center justify-between p-4 rounded-xl text-lg font-medium transition-all ${
                          isActive 
                            ? 'bg-gradient-to-r from-accent/20 to-blue-600/10 text-white border-l-4 border-accent' 
                            : 'text-white/70 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                        }`}
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
              
              <motion.div 
                className="mt-auto pt-10" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-gradient-to-br from-[#001F4D]/40 to-[#0B3062]/40 rounded-2xl p-0.5 backdrop-blur-md overflow-hidden">
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-white/0 p-6">
                    <div className="absolute -top-24 -right-24 w-40 h-40 bg-accent/20 rounded-full blur-2xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl" />
                    
                    <div className="relative">
                      <h3 className="text-white text-lg font-bold mb-2">Join the IEEE community</h3>
                      <p className="text-white/70 text-sm mb-4">Connect with professionals and advance your career</p>
                      
                      <Link 
                        href="/join"
                        className="inline-flex items-center justify-center w-full bg-accent hover:bg-accent/90 text-primary font-medium py-3 px-6 rounded-lg gap-2 transition-all"
                      >
                        <span>Become a Member</span>
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center mt-8 mb-4"
                >
                  <Image 
                    src="/ieee-logo-light.png" 
                    alt="IEEE Logo" 
                    width={100}
                    height={30}
                    className="opacity-60"
                  />
                </motion.div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
