'use client';

import PolicyLayout from '@/components/policy-layout';
import { Database, ShieldCheck, Lock, Share2, Cookie } from 'lucide-react';

export default function PrivacyClient() {
    const sections = [
        {
            id: 'collection',
            title: '1. Data Collection',
            icon: Database,
            content: (
                <div className="space-y-4">
                    <p>
                        At BCCI, we collect personal and business information when you register for membership,
                        subscribe to our newsletter, or fill out a form on our site. This may include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Full Name and Designation</li>
                        <li>CNIC and National Tax Number (NTN)</li>
                        <li>Business Name and Address</li>
                        <li>Contact Information (Email, Phone Number)</li>
                        <li>Photos for Membership Cards</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'usage',
            title: '2. Use of Information',
            icon: ShieldCheck,
            content: (
                <div className="space-y-4">
                    <p>
                        The information we collect from you may be used in the following ways:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To process membership applications and renewals.</li>
                        <li>To provide you with trade-related news, events, and updates.</li>
                        <li>To comply with government regulations and licensing requirements.</li>
                        <li>To improve our website based on the information and feedback we receive from you.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'security',
            title: '3. Data Security',
            icon: Lock,
            content: (
                <p>
                    We implement a variety of security measures to maintain the safety of your personal information.
                    Your data is stored on secure servers and access is limited to authorized personnel only.
                    We use SSL encryption to protect sensitive data transmitted online.
                </p>
            )
        },
        {
            id: 'disclosure',
            title: '4. Third-Party Disclosure',
            icon: Share2,
            content: (
                <p>
                    We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.
                    This does not include trusted third parties who assist us in operating our website or conducting
                    our business, so long as those parties agree to keep this information confidential.
                    We may also release your information when we believe release is appropriate to comply with the law.
                </p>
            )
        },
        {
            id: 'cookies',
            title: '5. Cookies',
            icon: Cookie,
            content: (
                <p>
                    Our website may use cookies to enhance the user experience. You can choose to set your web
                    browser to refuse cookies, or to alert you when cookies are being sent. If you do so,
                    note that some parts of the Site may not function properly.
                </p>
            )
        }
    ];

    return (
        <PolicyLayout
            title="Privacy Policy"
            description="How we collect, use, and protect your data."
            sections={sections}
            lastUpdated="February 16, 2026"
        />
    );
}
