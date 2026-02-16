'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/footer';
import ContactSection from '@/components/contact-section';
import FaqSection from '@/components/faq-section';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

const contactFaqs = [
    {
        question: "How can I contact BCCI?",
        answer: "You can reach us via phone, email, or by visiting our office during working hours. Our contact information is available in the footer and on this page."
    },
    {
        question: "What are the office hours?",
        answer: "Our office is open Monday to Friday, 9:00 AM to 5:00 PM. We are closed on weekends and public holidays."
    },
    {
        question: "Do you offer customer support?",
        answer: "Yes, our support team is available during office hours to assist with any queries regarding membership, services, or general inquiries."
    },
    {
        question: "Can I schedule an appointment?",
        answer: "Yes, while walk-ins are welcome, we recommend calling ahead to schedule an appointment for specialized services or consultations."
    },
    {
        question: "How long does it take to get a response?",
        answer: "We typically respond to emails and messages within 1-2 business days. For urgent matters, please call our office directly."
    }
];

export default function ContactClient() {
    return (
        <div className="relative w-full min-h-screen bg-gray-50">
            <div className="relative z-10 flex flex-col min-h-screen">
                <TopNavBar />
                <main className="flex-grow">
                    <ContactSection />
                    <FaqSection items={contactFaqs} />
                </main>
                <Footer />
            </div>
        </div>
    );
}
