import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'CardNav Customizer',
  description:
    'Create and customize your own responsive card-based navigation component for Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
