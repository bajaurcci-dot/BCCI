'use client';

import dynamic from 'next/dynamic';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-background">
      <div className="absolute inset-0 bg-grid-pattern"></div>
      <div className="relative z-10 p-4">
        <TopNavBar />
      </div>
    </div>
  );
}
