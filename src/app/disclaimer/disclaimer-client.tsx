'use client';

import PolicyLayout from '@/components/policy-layout';
import { Info, ExternalLink, ShieldAlert, Scale } from 'lucide-react';

export default function DisclaimerClient() {
    const sections = [
        {
            id: 'general',
            title: '1. General Information',
            icon: Info,
            content: (
                <p>
                    The information provided by the Bajaur Chamber of Commerce & Industry (BCCI) on
                    <span className="font-semibold px-1 text-emerald-600">bajaurchamber.org.pk</span> is for general
                    informational purposes only. All information on the Site is provided in good faith, however,
                    we make no representation or warranty of any kind, express or implied, regarding the accuracy,
                    adequacy, validity, reliability, availability, or completeness of any information on the Site.
                </p>
            )
        },
        {
            id: 'external',
            title: '2. External Links Disclaimer',
            icon: ExternalLink,
            content: (
                <p>
                    The Site may contain links to external websites that are not provided or maintained by or in any way
                    affiliated with BCCI. Please note that the BCCI does not guarantee the accuracy, relevance,
                    timeliness, or completeness of any information on these external websites.
                </p>
            )
        },
        {
            id: 'professional',
            title: '3. Professional Disclaimer',
            icon: ShieldAlert,
            content: (
                <p>
                    The Site cannot and does not contain professional legal, financial, or business advice.
                    Economic and trade information is provided for general informational and educational purposes
                    only and is not a substitute for professional advice. Accordingly, before taking any actions
                    based upon such information, we encourage you to consult with the appropriate professionals.
                </p>
            )
        },
        {
            id: 'liability',
            title: '4. Limitation of Liability',
            icon: Scale,
            content: (
                <p>
                    Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred
                    as a result of the use of the site or reliance on any information provided on the site. Your use
                    of the site and your reliance on any information on the site is solely at your own risk.
                </p>
            )
        }
    ];

    return (
        <PolicyLayout
            title="Disclaimer"
            description="Limitation of liability and website usage disclaimer."
            sections={sections}
            lastUpdated="February 16, 2026"
        />
    );
}
