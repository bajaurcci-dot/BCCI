import type { Metadata } from 'next';
import ServicesClient from './services-client';

export const metadata: Metadata = {
  title: 'Our Services | Bajaur Chamber of Commerce & Industry',
  description: 'Explore the wide range of services provided by BCCI, including visa recommendation letters, certificates of origin, business consultancy, and trade dispute resolution.',
  alternates: {
    canonical: 'https://www.bajaurchamber.org.pk/services',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
