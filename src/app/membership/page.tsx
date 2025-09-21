'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/footer';
import MembershipIntroSection from '@/components/membership-intro-section';
import MembershipVerificationSection from '@/components/membership-verification-section';
import MembershipFeesSection from '@/components/membership-fees-section';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

export default function MembershipPage() {
  return (
    <div className="relative w-full min-h-screen bg-background">
      <div className="absolute inset-0 bg-grid-pattern"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopNavBar />
        <main className="flex-grow">
          <MembershipIntroSection />
          <MembershipVerificationSection />
          <MembershipFeesSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
