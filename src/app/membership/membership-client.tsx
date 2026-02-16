'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/footer';
import MembershipFeesSection from '@/components/membership-fees-section';
import FAQSection, { FAQItem } from '@/components/faq-section';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

const faqs: FAQItem[] = [
    {
        question: "What are the benefits of BCCI membership?",
        answer: "Members gain access to business networking, visa recommendation letters, certificate of origin, dispute resolution services, participation in trade fairs, business consultancy, and voting rights in chamber elections."
    },
    {
        question: "What are the different membership classes?",
        answer: "BCCI offers multiple membership classes based on business size and turnover. Each class has different fee structures and benefits. Please refer to the Membership Fees section above for details."
    },
    {
        question: "When is the annual membership renewal due?",
        answer: "Membership must be renewed annually by March 31st to remain active and avoid penalties. Late renewals may incur additional charges."
    },
    {
        question: "Can I upgrade my membership class?",
        answer: "Yes, you can apply for a class upgrade upon fulfilling the criteria for the higher class (e.g., turnover, staff count, business expansion). Contact our office for upgrade procedures."
    },
    {
        question: "What documents are required for membership?",
        answer: "You need a valid CNIC, business registration documents, NTN (if applicable), proof of business address, and passport-size photographs. Additional documents may be required based on your business type."
    },
    {
        question: "How long does the membership approval process take?",
        answer: "Once you submit your application with complete documentation, the approval process typically takes 7-10 business days. You will be notified via email or phone."
    },
    {
        question: "Can I transfer my membership to someone else?",
        answer: "Membership is non-transferable. However, in case of business succession or change of ownership, you need to apply for a new membership under the new owner's name."
    }
];

export default function MembershipClient() {
    return (
        <div className="relative w-full min-h-screen bg-gray-50">
            <div className="relative z-10 flex flex-col min-h-screen">
                <TopNavBar />
                <main className="flex-grow">
                    <MembershipFeesSection />
                    <FAQSection items={faqs} />
                </main>
                <Footer />
            </div>
        </div>
    );
}
