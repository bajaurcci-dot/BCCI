import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bajaurchamber.org.pk'),
  title: {
    default: 'Bajaur Chamber of Commerce & Industry (BCCI)',
    template: '%s | BCCI'
  },
  description: 'The official website of Bajaur Chamber of Commerce & Industry (BCCI). Supporting local businesses and trade in Bajaur District, Pakistan.',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: '1DFXLC7fnjvpv0Dy8TWRvE2mJiCFrVxd0wfX-2WIPxE',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bajaur Chamber of Commerce & Industry',
    url: 'https://www.bajaurchamber.org.pk',
    logo: 'https://www.bajaurchamber.org.pk/icon.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92 308 2275587',
      contactType: 'customer service',
      email: 'info@bajaurchamber.org.pk',
      areaServed: 'PK',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://www.facebook.com/bccikhar/',
      'https://www.instagram.com/bcci_khar/'
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
