import type { Metadata } from 'next';
import MembershipClient from './membership-client';

export const metadata: Metadata = {
  title: 'Membership | Bajaur Chamber of Commerce & Industry',
  description: 'Join the Bajaur Chamber of Commerce & Industry. Explore membership classes, benefits, fees, and the annual renewal process for businesses in Bajaur.',
  alternates: {
    canonical: 'https://www.bajaurchamber.org.pk/membership',
  },
};

export default function MembershipPage() {
  return <MembershipClient />;
}
