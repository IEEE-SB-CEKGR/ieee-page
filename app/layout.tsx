import '@/app/ui/global.css';
import { JetBrains_Mono, Inter } from 'next/font/google';
import { Metadata, Viewport } from 'next';
import { AnimatePresence } from 'framer-motion';

import SmoothScroll from './ui/home/SmoothScroll';
import Footer from './ui/home/Footer';
import LoaderTransition from './ui/home/Loader';
import Header from './ui/home/Header';
import BackToTop from './ui/home/BackToTop';
import CursorFollower from './ui/home/CursorFollower';
import ScrollProgress from './ui/home/ScrollProgress';

// Primary font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Monospace font for code and technical content
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrainsMono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0A1A3A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    template: '%s | IEEE CE KGR',
    default: 'IEEE CE KGR',
  },
  description: 'The official IEEE Student Branch website for College of Engineering Kidangoor.',
  keywords: ['IEEE', 'engineering', 'student branch', 'technology', 'CEK', 'College of Engineering Kidangoor'],
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  openGraph: {
    title: 'IEEE CE KGR',
    description: 'Empowering engineering students through technical innovation and professional development.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-gradient-to-b from-[#040D21] to-[#0A1A3A] text-white`}>
        <ScrollProgress />
        <SmoothScroll>
          <Header />
          <LoaderTransition />
          <AnimatePresence mode="wait">
            <main className="relative">
              {children}
              <BackToTop />
            </main>
          </AnimatePresence>
          <Footer />
        </SmoothScroll>
        <CursorFollower />
      </body>
    </html>
  );
}
