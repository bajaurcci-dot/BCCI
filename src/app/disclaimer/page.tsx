import type { Metadata } from 'next';
import DisclaimerClient from './disclaimer-client';

export const metadata: Metadata = {
    title: 'Disclaimer | Bajaur Chamber of Commerce & Industry',
    description: 'Limitation of liability and website usage disclaimer for the official portal of Bajaur Chamber of Commerce & Industry (BCCI).',
    alternates: {
        canonical: 'https://www.bajaurchamber.org.pk/disclaimer',
    },
};

export default function DisclaimerPage() {
    return <DisclaimerClient />;
}
