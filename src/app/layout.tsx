import { AuthProvider } from '@/providers/AuthProvider';
import TanstackProvider from '@/providers/TanstackProvider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mi Chanchito',
  description: 'La mejor manera de ahorrar tu dinero.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          <AuthProvider>{children}</AuthProvider>
        </TanstackProvider>

        <Toaster />
      </body>
    </html>
  );
}
