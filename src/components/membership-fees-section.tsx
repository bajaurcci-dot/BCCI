'use client';

import { Badge } from './ui/badge';

const membershipServices = [
    { id: 1, name: 'New Membership Corporate Class (Normal Fee)', description: 'With standard processing charges', price: 'Rs.8,000/-' },
    { id: 2, name: 'New Membership Associate Class (Normal Fee)', description: 'Regular registration charges', price: 'Rs.6,000/-' },
    { id: 3, name: 'Associate Class (Urgent Processing)', description: 'Fast-track registration fee', price: 'Rs.10,000/-' },
    { id: 4, name: 'Corporate Class (Urgent Processing)', description: 'Priority registration charges', price: 'Rs.12,000/-' },
    { id: 5, name: 'Corporate Renewal (Before 31st March)', description: 'Early renewal discount', price: 'Rs.5,000/-' },
    { id: 6, name: 'Associate Renewal (Before 31st March)', description: 'Timely renewal benefit', price: 'Rs.3,000/-' },
    { id: 7, name: 'Corporate Renewal (After 31st March)', description: 'Late renewal penalty charges', price: 'Rs.12,000/-' },
    { id: 8, name: 'Associate Renewal (After 31st March)', description: 'Delayed renewal charges', price: 'Rs.7,000/-' },
    { id: 9, name: 'Attestation Certificate of Origin', description: 'Set of six pages', price: 'Rs.250/-' },
    { id: 10, name: 'Extra Pages Charges', description: 'Additional page fee', price: 'Rs.50/-' },
    { id: 11, name: 'Commercial Documents', description: 'Set of four pages', price: 'Rs.400/-' },
];

const supportServices = [
    { id: 12, name: 'Extra Pages Charges', description: 'Additional document pages', price: 'Rs.50/-' },
    { id: 13, name: 'Asian Countries Visa Letter (Owners)', description: 'Proprietor/Partner/Director', price: 'Rs.8,000/-' },
    { id: 14, name: 'Asian Countries Visa Letter (Employees)', description: 'For member firm staff', price: 'Rs.8,000/-' },
    { id: 15, name: 'Western Countries Visa Letter (Owners)', description: 'Europe/USA/UK/Canada/Australia/Africa', price: 'Rs.10,000/-' },
    { id: 16, name: 'Western Countries Visa Letter (Employees)', description: 'For member firm staff', price: 'Rs.10,000/-' },
    { id: 17, name: 'Asian Countries Invitation Letter', description: 'For foreign visitors', price: 'Rs.8,000/-' },
    { id: 18, name: 'Western Countries Invitation Letter', description: 'Europe/USA/Canada/UK/Australia/Africa', price: 'Rs.8,000/-' },
    { id: 19, name: 'Extra Membership Card', description: 'For partner/director', price: 'Rs.1,500/-' },
    { id: 20, name: 'Classified Trade Directory', description: 'Membership directory access', price: 'Rs.3,500/-' },
    { id: 21, name: 'Duplicate Certificate Charges', description: 'Replacement certificate fee', price: 'Rs.3,000/-' },
    { id: 22, name: 'Application Form Charges', description: 'New membership form fee', price: 'Rs.1,000/-' },
];

const FeeTable = ({ title, data }: { title: string; data: typeof membershipServices }) => (
    <div className="bg-card p-6 md:p-8 rounded-2xl border border-border/50 shadow-lg animate-fade-in">
        <h3 className="text-2xl font-bold font-headline mb-6">{title}</h3>
        <div className="overflow-x-auto">
            <div className="min-w-full">
                <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 py-3 px-4 bg-muted/50 rounded-t-lg font-semibold text-muted-foreground">
                    <div className="text-left">#</div>
                    <div className="text-left">Service</div>
                    <div className="hidden md:block text-left">Description</div>
                    <div className="text-right">Charges</div>
                </div>
                <div className="divide-y divide-border/50">
                    {data.map((item) => (
                        <div key={item.id} className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 py-4 px-4 items-center transition-colors hover:bg-muted/50">
                            <div className="font-semibold text-primary">{item.id}</div>
                            <div>
                                <p className="font-semibold text-foreground">{item.name}</p>

                                <p className="md:hidden text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="hidden md:block text-muted-foreground">{item.description}</div>
                            <div className="text-right font-semibold text-foreground whitespace-nowrap">{item.price}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default function MembershipFeesSection() {
    return (
        <section className="py-20 md:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="text-center mb-16 animate-fade-in">
                    <Badge
                        variant="outline"
                        className="py-1 px-4 self-center border-primary/50 text-primary font-semibold mb-4"
                    >
                        Fee Structure
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold font-headline mt-4 mb-6">
                        BCCI Membership Fee & Service Charges
                    </h2>
                    <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
                        Find a comprehensive list of all our membership and support service charges below.
                    </p>
                </div>
                <div className="space-y-12">
                    <FeeTable title="Membership Services" data={membershipServices} />
                    <FeeTable title="Support Services" data={supportServices} />
                </div>
            </div>
        </section>
    );
}