import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Esports Hub',
  description: 'Follow teams, tournaments and live results.',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const isLoggedIn = Boolean((await cookies()).get('token')?.value);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar isLoggedIn={isLoggedIn} />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
