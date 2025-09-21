'use client';

import dynamic from 'next/dynamic';
import AboutSection from '@/components/about-section';
import Footer from '@/components/footer';
import BentoSection from '@/components/bento-section';
import IntroSection from '@/components/intro-section';
import StorySection from '@/components/story-section';
import GallerySection from '@/components/gallery-section';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-background">
      <div className="absolute inset-0 bg-grid-pattern"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopNavBar />
        <main className="flex-grow">
          <IntroSection />
          <AboutSection />
          <StorySection />
          <GallerySection />
          <BentoSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
