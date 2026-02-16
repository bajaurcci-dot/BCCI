import type { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'Bajaur Chamber of Commerce & Industry (BCCI) | Empowering Business',
  description: 'Official portal of Bajaur Chamber of Commerce & Industry. Driving economic growth, supporting local entrepreneurs, and facilitating trade in Bajaur District.',
  alternates: {
    canonical: 'https://www.bajaurchamber.org.pk/',
  },
};

export default function Home() {
  return <HomeClient />;
}
