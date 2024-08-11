import '@/app/ui/global.css';
import { JetBrains_Mono } from 'next/font/google';
import { Metadata } from 'next';

import PageTransition from './ui/home/PageTransition';
import Footer from './ui/home/Footer';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jetbrainsMono',
});

export const metadata: Metadata = {
  title: {
    template: '%s | IEEE CEK DASHBOARD',
    default: 'IEEE CEK Dashboard',
  },
  description: 'The official IEEE CEK students branch website.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} small-scr antialiased`}>
        <PageTransition>{children}</PageTransition>

        <Footer />
      </body>
    </html>
  );
}
