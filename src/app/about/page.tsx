import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
  title: 'About Us | Bajaur Chamber of Commerce & Industry',
  description: 'Learn about the history, vision, and mission of the Bajaur Chamber of Commerce & Industry. Discover our commitment to economic growth and business development in Bajaur.',
  alternates: {
    canonical: 'https://www.bajaurchamber.org.pk/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
