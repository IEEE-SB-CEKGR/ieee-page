import '@/app/ui/global.css';
import { Space_Grotesk, Outfit, Fira_Code } from 'next/font/google';
import { Metadata, Viewport } from 'next';
import { AnimatePresence } from 'framer-motion';

import SmoothScroll from './ui/home/SmoothScroll';
import Footer from './ui/home/Footer';
import LoaderTransition from './ui/home/Loader';
import Header from './ui/home/Header';
import BackToTop from './ui/home/BackToTop';
import CursorFollower from './ui/home/CursorFollower';
import ScrollProgress from './ui/home/ScrollProgress';

// Primary font - Outfit for clean, modern aesthetic
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// Secondary font for headings - Space Grotesk for technical, distinctive character
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Monospace font for code and technical content - Fira Code with programming ligatures
const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
      <body className={`${outfit.variable} ${spaceGrotesk.variable} ${firaCode.variable} antialiased bg-gradient-to-b from-[#040D21] to-[#0A1A3A] text-white font-outfit`}>
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
