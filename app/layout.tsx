import '@/app/ui/global.css';
import { JetBrains_Mono } from 'next/font/google';
import { Metadata } from 'next';

import PageTransition from './ui/home/PageTransition';
import Footer from './ui/home/Footer';
import LoaderTransition from './ui/home/Loader';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jetbrainsMono',
});

export const metadata: Metadata = {
  title: {
    template: '%s | IEEE CE KGR',
    default: 'IEEE CE KGR',
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
      <body className={`${jetbrainsMono.variable}  small-scr antialiased `}>
        {/* Global transitions on the body */}
        <LoaderTransition />
        <PageTransition>
          {/* Ensure transitions apply to child elements as well */}
          {children}

          <Footer key={'footer'} />
        </PageTransition>
      </body>
    </html>
  );
}
