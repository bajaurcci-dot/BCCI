'use client';

import dynamic from 'next/dynamic';
import AboutSection from '@/components/about-section';
import Footer from '@/components/footer';
import BentoSection from '@/components/bento-section';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-background">
      <div className="absolute inset-0 bg-grid-pattern"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopNavBar />
        <main className="flex-grow">
          <AboutSection />
          <BentoSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
