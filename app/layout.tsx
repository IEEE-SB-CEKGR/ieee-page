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
  description:
    'The official IEEE Student Branch website for College of Engineering Kidangoor.',
  keywords: [
    'IEEE',
    'engineering',
    'student branch',
    'technology',
    'CEK',
    'College of Engineering Kidangoor',
  ],
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  openGraph: {
    title: 'IEEE CE KGR',
    description:
      'Empowering engineering students through technical innovation and professional development.',
    images: ['/og-image.jpg'],
  },
  icons: {
    // Use the existing logo in `public/` as the favicon. Replace with a dedicated favicon.ico or 32x32 PNG if you have one.
    // prefer the logo for favicon
    icon: '/ieee-logo.png',
    // prefer the PNG logo for shortcut as well (use leading slash)
    shortcut: '/ieee-logo.png',
    apple: '/ieee-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Fallback link tags for favicons - put the files in public/ with these names */}
        <link rel="icon" href="/favicon.ico" />
        {/* Preferred shortcut icon (some browsers prioritize this) */}
        <link rel="shortcut icon" href="/ieee-logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/ieee-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/ieee-logo.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0A1A3A" />
      </head>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${firaCode.variable} font-outfit bg-gradient-to-b from-[#040D21] to-[#0A1A3A] text-white antialiased`}
      >
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
