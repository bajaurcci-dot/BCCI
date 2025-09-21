'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/footer';
import ServicesIntroSection from '@/components/services-intro-section';
import ServicesListSection from '@/components/services-list-section';
import AdditionalServicesSection from '@/components/additional-services-section';
import CtaSection from '@/components/cta-section';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

export default function ServicesPage() {
  return (
    <div className="relative w-full min-h-screen bg-background">
      <div className="absolute inset-0 bg-grid-pattern"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopNavBar />
        <main className="flex-grow">
          <ServicesIntroSection />
          <ServicesListSection />
          <AdditionalServicesSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
