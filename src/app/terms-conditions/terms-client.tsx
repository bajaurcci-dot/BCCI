'use client';

import PolicyLayout from '@/components/policy-layout';
import { MousePointerClick, Copyright, Users, UserPlus, Ban, Gavel } from 'lucide-react';

export default function TermsClient() {
    const sections = [
        {
            id: 'acceptance',
            title: '1. Acceptance of Terms',
            icon: MousePointerClick,
            content: (
                <p>
                    By accessing and using <span className="font-semibold text-emerald-600">bajaurchamber.org.pk</span>,
                    you accept and agree to be bound by the terms and provision of this agreement.
                    In addition, when using this website's particular services, you shall be subject to any posted
                    guidelines or rules applicable to such services.
                </p>
            )
        },
        {
            id: 'intellectual',
            title: '2. Intellectual Property Rights',
            icon: Copyright,
            content: (
                <p>
                    The Site and its original content, features, and functionality are owned by the Bajaur Chamber
                    of Commerce & Industry and are protected by international copyright, trademark, patent,
                    trade secret, and other intellectual property or proprietary rights laws.
                </p>
            )
        },
        {
            id: 'responsibilities',
            title: '3. User Responsibilities',
            icon: Users,
            content: (
                <div className="space-y-4">
                    <p>
                        As a user of this website, you agree not to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Use the website for any unlawful purpose.</li>
                        <li>Attempt to gain unauthorized access to our systems or user accounts.</li>
                        <li>Upload or transmit any malicious code or viruses.</li>
                        <li>Distribute or publish any false or misleading information regarding BCCI.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'membership',
            title: '4. Membership & Registration',
            icon: UserPlus,
            content: (
                <p>
                    When you create an application for membership on our Site, you must provide us with
                    information that is accurate, complete, and current at all times. Failure to do so
                    constitutes a breach of the Terms, which may result in immediate termination of your
                    application or membership.
                </p>
            )
        },
        {
            id: 'termination',
            title: '5. Termination',
            icon: Ban,
            content: (
                <p>
                    We may terminate or suspend access to our Site immediately, without prior notice or liability,
                    for any reason whatsoever, including without limitation if you breach the Terms.
                    All provisions of the Terms which by their nature should survive termination shall
                    survive termination.
                </p>
            )
        },
        {
            id: 'law',
            title: '6. Governing Law',
            icon: Gavel,
            content: (
                <p>
                    These Terms shall be governed and construed in accordance with the laws of Pakistan,
                    without regard to its conflict of law provisions. Any legal action or proceeding related
                    to your access to, or use of, the Site shall be instituted in a court in District Bajaur or Peshawar.
                </p>
            )
        }
    ];

    return (
        <PolicyLayout
            title="Terms & Conditions"
            description="Rules and regulations for using this website."
            sections={sections}
            lastUpdated="February 16, 2026"
        />
    );
}
