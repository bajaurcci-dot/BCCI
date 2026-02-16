'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/footer';
import ServicesIntroSection from '@/components/services-intro-section';
import ServicesListSection from '@/components/services-list-section';
import ServiceRequestSection from '@/components/service-request-section';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

export default function ServicesClient() {
    return (
        <div className="relative w-full min-h-screen bg-gray-50">
            <div className="relative z-10 flex flex-col min-h-screen">
                <TopNavBar />
                <main className="flex-grow">
                    <ServicesIntroSection />
                    <ServicesListSection />
                    <ServiceRequestSection />
                </main>
                <Footer />
            </div>
        </div>
    );
}
