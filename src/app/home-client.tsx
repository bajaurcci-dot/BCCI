'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/hero-section';
import GrowthSection from '@/components/growth-section';
import TeamSection from '@/components/team-section';
import BentoSection from '@/components/bento-section';
import Footer from '@/components/footer';
import FaqSection from '@/components/faq-section';
import WhyChooseUs from '@/components/why-choose-us';
import VacancyBanner from '@/components/vacancy-banner';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

const homeFaqs = [
    {
        question: "What is Bajaur Chamber of Commerce and Industry (BCCI)?",
        answer: "BCCI is a professional organization representing the business community of Bajaur. We facilitate trade, provide business support services, and advocate for the interests of local businesses."
    },
    {
        question: "How do I become a member of BCCI?",
        answer: "You can register online via our 'Online Registration' portal or visit the chamber office with required documents including CNIC, business registration, and relevant tax documents."
    },
    {
        question: "What are the benefits of BCCI membership?",
        answer: "Members enjoy networking opportunities, business visa recommendation letters, certificate of origin services, dispute resolution support, participation in trade fairs, and voting rights in chamber elections."
    },
    {
        question: "What are the office hours?",
        answer: "We are open Monday to Friday, 9:00 AM to 5:00 PM. We remain closed on public holidays and Sundays."
    },
    {
        question: "Where is BCCI located?",
        answer: "Our main office is located in Khar, Bajaur Agency, Khyber Pakhtunkhwa. You can find the exact address and map in the footer section."
    },
    {
        question: "What services does BCCI provide?",
        answer: "We provide certificate of origin, visa recommendation letters, business registration support, trade dispute resolution, networking events, business consultancy, and advocacy services for the business community."
    },
    {
        question: "How can I verify my membership status?",
        answer: "You can verify your membership status through our online Member Verification portal by entering your CNIC or membership number."
    },
    {
        question: "Does BCCI offer legal support for business disputes?",
        answer: "Yes, we provide dispute resolution and arbitration services to help resolve commercial conflicts between businesses in an efficient and professional manner."
    },
    {
        question: "Can I get a certificate of origin from BCCI?",
        answer: "Yes, registered members can obtain certificates of origin for their products to facilitate international trade and exports."
    },
    {
        question: "How do I contact BCCI for support?",
        answer: "You can reach us via phone, email through our Contact page, or visit our office during working hours. Our support team is always ready to assist you."
    }
];

export default function HomeClient() {
    return (
        <div className="relative w-full min-h-screen bg-gray-50">
            <div className="relative z-10 flex flex-col min-h-screen">
                <VacancyBanner />
                <TopNavBar />
                <main className="flex-grow">
                    <HeroSection />
                    <TeamSection />
                    <GrowthSection />
                    <BentoSection />
                    <WhyChooseUs />
                    <FaqSection items={homeFaqs} />
                </main>
                <Footer />
            </div>
        </div>
    );
}
