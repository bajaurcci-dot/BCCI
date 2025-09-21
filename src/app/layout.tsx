'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { VacanciesProvider } from '@/hooks/use-vacancies';

// This metadata can't be set here in a client component.
// If you need metadata, you would move this to a server component parent.
// export const metadata: Metadata = {
//   title: 'CardNav Customizer',
//   description:
//     'Create and customize your own responsive card-based navigation component for Next.js.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <VacanciesProvider>
          {children}
          <Toaster />
        </VacanciesProvider>
      </body>
    </html>
  );
}
