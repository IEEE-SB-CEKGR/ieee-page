'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/app/ui/home/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  {
    name: 'Home',
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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Background decoration variants
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.1,
      transition: {
        delay: 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex items-center justify-center" asChild>
        <motion.button
          className="bg-transparent border-none flex items-center justify-center p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <X size={28} className="text-accent" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={28} className="text-accent" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </SheetTrigger>
      
      <SheetContent className="bg-gradient-to-b from-[#040D21]/98 to-[#071631]/98 backdrop-blur-xl border-l border-white/10 p-0 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
            style={{ filter: 'blur(80px)' }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            style={{ filter: 'blur(80px)' }}
          />
        </div>
        
        {/*logo with animation*/}
        <motion.div 
          className="mt-20 mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              delay: 0.2,
              duration: 0.5
            }
          }}
        >
          <Link href="/" onClick={() => setIsOpen(false)}>
            <motion.h1 
              className="relative inline-block border-y-2 border-accent text-3xl font-semibold text-white py-2 px-4"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              IEEE SB CE KGR
              <motion.span
                className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent"
                animate={{ 
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0],
                  left: ["0%", "0%", "100%"]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
            </motion.h1>
          </Link>
        </motion.div>
        
        {/*nav with staggered animations*/}
        <motion.nav 
          className="flex flex-col items-center justify-center gap-7 px-6"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
        >
          {links.map((link, index) => {
            const isActive = link.path === pathname;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="relative block"
                >
                  <motion.div
                    className={`
                      relative px-6 py-2.5 text-xl capitalize transition-all
                      ${isActive 
                        ? 'text-accent font-medium' 
                        : 'text-white/80 hover:text-white'}
                    `}
                  >
                    {link.name}
                    
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 border-2 border-accent rounded-lg"
                        layoutId="activeNavMobile"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>
        
        {/* Footer with socials */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              delay: 0.6,
              duration: 0.5
            }
          }}
        >
          <div className="flex gap-4">
            {['twitter', 'instagram', 'linkedin', 'github'].map((social, index) => (
              <motion.a
                key={social}
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent/50 transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.7 + (index * 0.1) }
                }}
              >
                {social[0].toUpperCase()}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
