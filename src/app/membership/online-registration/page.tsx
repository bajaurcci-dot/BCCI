'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/footer';
import OnlineRegistrationSection from '@/components/online-registration-section';
import SupportServicesSection from '@/components/support-services-section';
import FAQSection, { FAQItem } from '@/components/faq-section';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

const faqs: FAQItem[] = [
    {
        question: "What documents are required for new registration?",
        answer: "You strictly need a valid CNIC, NTN certificate, bank maintenance certificate, and a tenancy agreement or proof of business premises."
    },
    {
        question: "How much is the registration fee?",
        answer: "The registration fee varies based on the class of membership (Associate or Corporate). Specific fee details can be found on the main Membership page."
    },
    {
        question: "How long does the approval process take?",
        answer: "Once all documents are submitted, the approval process typically takes 3-5 working days."
    },
    {
        question: "Can I edit my application after submission?",
        answer: "No, once submitted, the application cannot be edited. Please contact support if you made a critical error."
    }
];

export default function OnlineRegistrationPage() {
    return (
        <div className="relative w-full min-h-screen bg-gray-50">
            <div className="relative z-10 flex flex-col min-h-screen">
                <TopNavBar />
                <main className="flex-grow">
                    <OnlineRegistrationSection />
                    <SupportServicesSection />
                    <FAQSection items={faqs} />
                </main>
                <Footer />
            </div>
        </div>
    );
}
