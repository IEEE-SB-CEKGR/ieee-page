'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Social from './Social';

export default function Footer() {
  const footerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#040D21] pb-8 pt-16">
      {/* Background gradients */}
      <div className="absolute -left-40 top-0 -z-10 h-96 w-96 rounded-full bg-accent/5 blur-[150px]" />
      <div className="absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-blue-700/5 blur-[150px]" />

      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"
          variants={footerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Logo and Info */}
          <motion.div variants={item}>
            <div className="relative mb-6 h-12 w-40">
              <Image
                src="/ieee-logo-light.png"
                alt="IEEE Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="mb-6 text-white/70">
              Empowering engineering students through technical innovation,
              professional development, and community service.
            </p>
            <Social
              containerStyles="flex gap-4"
              iconsStyles="w-10 h-10 border border-white/10 rounded-full flex justify-center items-center text-white/70 hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300"
            />
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item}>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'Events', 'Team', 'Gallery', 'About', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                      className="text-white/60 transition-colors duration-300 hover:text-accent"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={item}>
            <h3 className="mb-6 text-lg font-semibold text-white">
              IEEE Resources
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'IEEE Global', url: 'https://www.ieee.org/' },
                { name: 'IEEE Kerala Section', url: 'https://ieeekerala.org/' },
                { name: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/' },
                { name: 'IEEE Spectrum', url: 'https://spectrum.ieee.org/' },
                {
                  name: 'Student Benefits',
                  url: 'https://www.ieee.org/membership/benefits/',
                },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 transition-colors duration-300 hover:text-accent"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={item}>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Contact Us
            </h3>
            <address className="not-italic">
              <p className="mb-3 text-white/60">
                College of Engineering Kidangoor
                <br />
                Kidangoor South P.O
                <br />
                Kottayam - 686583
              </p>
              <p className="mb-3 text-white/60">
                <a
                  href="mailto:sb.cek@ieee.org"
                  className="transition-colors duration-300 hover:text-accent"
                >
                  sb.cek@ieee.org
                </a>
              </p>
              <p className="text-white/60">
                <a
                  href="tel:+9149912345678"
                  className="transition-colors duration-300 hover:text-accent"
                >
                  +91 499 1234 5678
                </a>
              </p>
            </address>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50"
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p>
            © {new Date().getFullYear()} IEEE Student Branch CE KGR. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
