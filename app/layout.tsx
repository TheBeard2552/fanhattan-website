import type { Metadata } from 'next';
import { Lilita_One, Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/shared/components/Nav';
import Footer from '@/shared/components/Footer';

const lilitaOne = Lilita_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bagged Up - A Collectible Universe',
  description: 'Compete. Unlock. Collect. Repeat. Welcome to Fanhattan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lilitaOne.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Nav />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
