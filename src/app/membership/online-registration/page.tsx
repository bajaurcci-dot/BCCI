import type { Metadata } from 'next';
import OnlineRegistrationPageClient from './page-client';

export const metadata: Metadata = {
    title: 'Online Membership Registration | Bajaur Chamber of Commerce & Industry',
    description: 'Register your business with the Bajaur Chamber of Commerce & Industry online. Submit your application, upload required documents, and join our growing network of members.',
    alternates: {
        canonical: 'https://www.bajaurchamber.org.pk/membership/online-registration',
    },
};

export default function OnlineRegistrationPage() {
    return <OnlineRegistrationPageClient />;
}
