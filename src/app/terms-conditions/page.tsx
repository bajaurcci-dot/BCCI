import type { Metadata } from 'next';
import TermsClient from './terms-client';

export const metadata: Metadata = {
    title: 'Terms & Conditions | Bajaur Chamber of Commerce & Industry',
    description: 'Rules and regulations for using the official website of Bajaur Chamber of Commerce & Industry (BCCI). Please read our terms carefully before using our services.',
    alternates: {
        canonical: 'https://www.bajaurchamber.org.pk/terms-conditions',
    },
};

export default function TermsConditionsPage() {
    return <TermsClient />;
}
