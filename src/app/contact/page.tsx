import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Us | Bajaur Chamber of Commerce & Industry',
  description: 'Get in touch with the Bajaur Chamber of Commerce & Industry (BCCI). We are here to help you with business registration, membership inquiries, and trade support.',
  alternates: {
    canonical: 'https://www.bajaurchamber.org.pk/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
