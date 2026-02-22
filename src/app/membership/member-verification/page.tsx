import type { Metadata } from 'next';
import MemberVerificationPageClient from './page-client';

export const metadata: Metadata = {
    title: 'Member Verification | Bajaur Chamber of Commerce & Industry',
    description: 'Verify the authenticity and active membership status of any BCCI-registered business instantly using our online member verification tool.',
    alternates: {
        canonical: 'https://www.bajaurchamber.org.pk/membership/member-verification',
    },
};

export default function MemberVerificationPage() {
    return <MemberVerificationPageClient />;
}
