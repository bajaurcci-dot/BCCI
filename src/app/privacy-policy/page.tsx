import type { Metadata } from 'next';
import PrivacyClient from './privacy-client';

export const metadata: Metadata = {
    title: 'Privacy Policy | Bajaur Chamber of Commerce & Industry',
    description: 'Our commitment to protecting your personal and business data. Read the BCCI privacy policy to understand how we collect and use your information.',
    alternates: {
        canonical: 'https://www.bajaurchamber.org.pk/privacy-policy',
    },
};

export default function PrivacyPolicyPage() {
    return <PrivacyClient />;
}
