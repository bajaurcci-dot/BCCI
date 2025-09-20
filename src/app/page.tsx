'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/hero-section';
import TeamSection from '@/components/team-section';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-background">
      <div className="absolute inset-0 bg-grid-pattern"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopNavBar />
        <main className="flex-grow">
          <HeroSection />
          <TeamSection />
        </main>
      </div>
    </div>
  );
}
