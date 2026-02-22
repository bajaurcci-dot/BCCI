'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import MembershipVerificationSection from '@/components/membership-verification-section';
import FAQSection, { FAQItem } from '@/components/faq-section';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

const faqs: FAQItem[] = [
    {
        question: "How can I verify a member's status?",
        answer: "Enter the member's registration number or CNIC in the verification tool above to see their current status."
    },
    {
        question: "What if 'No Record Found' appears?",
        answer: "This could mean the membership is expired, the number was entered incorrectly, or the business is not registered with BCCI. Please contact us for manual verification."
    },
    {
        question: "Is this verification valid for legal purposes?",
        answer: "This online verification serves as a preliminary check. For official legal proceedings, a signed certificate from the BCCI office is recommended."
    }
];

export default function MemberVerificationPageClient() {
    return (
        <div className="relative w-full min-h-screen bg-gray-50">
            <div className="relative z-10 flex flex-col min-h-screen">
                <TopNavBar />
                <main className="flex-grow">
                    <PageHeader
                        title="Member Verification"
                        description="Verify the authenticity and active status of any BCCI member instantly."
                    />
                    <MembershipVerificationSection />
                    <FAQSection items={faqs} />
                </main>
                <Footer />
            </div>
        </div>
    );
}
