'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/footer';
import ContactSection from '@/components/contact-section';
import FaqSection from '@/components/faq-section';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

export default function ContactPage() {
  return (
    <div className="relative w-full min-h-screen bg-background">
      <div className="absolute inset-0 bg-grid-pattern"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopNavBar />
        <main className="flex-grow">
          <ContactSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
