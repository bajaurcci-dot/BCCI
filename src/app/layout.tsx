import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';

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
    logo: 'https://www.bajaurchamber.org.pk/icon.jpeg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92 308 2275587',
      contactType: 'customer service',
      email: 'contact@bajaurcci.com.pk',
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
        </Providers>
      </body>
    </html>
  );
}
