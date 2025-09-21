'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const membershipServices = [
  {
    id: 1,
    name: 'New Membership Corporate Class (Normal Fee)',
    description: 'With standard processing charges',
    price: 'Rs.8,000/-',
  },
  {
    id: 2,
    name: 'New Membership Associate Class (Normal Fee)',
    description: 'Regular registration charges',
    price: 'Rs.6,000/-',
  },
  {
    id: 3,
    name: 'Associate Class (Urgent Processing)',
    description: 'Fast-track registration fee',
    price: 'Rs.10,000/-',
  },
  {
    id: 4,
    name: 'Corporate Class (Urgent Processing)',
    description: 'Priority registration charges',
    price: 'Rs.12,000/-',
  },
  {
    id: 5,
    name: 'Corporate Renewal (Before 31st March)',
    description: 'Early renewal discount',
    price: 'Rs.5,000/-',
  },
  {
    id: 6,
    name: 'Associate Renewal (Before 31st March)',
    description: 'Timely renewal benefit',
    price: 'Rs.3,000/-',
  },
  {
    id: 7,
    name: 'Corporate Renewal (After 31st March)',
    description: 'Late renewal penalty charges',
    price: 'Rs.12,000/-',
  },
  {
    id: 8,
    name: 'Associate Renewal (After 31st March)',
    description: 'Delayed renewal charges',
    price: 'Rs.7,000/-',
  },
  {
    id: 9,
    name: 'Attestation Certificate of Origin',
    description: 'Set of six pages',
    price: 'Rs.250/-',
  },
  {
    id: 10,
    name: 'Extra Pages Charges',
    description: 'Additional page fee',
    price: 'Rs.50/-',
  },
  {
    id: 11,
    name: 'Commercial Documents',
    description: 'Set of four pages',
    price: 'Rs.400/-',
  },
];

const supportServices = [
  {
    id: 12,
    name: 'Extra Pages Charges',
    description: 'Additional document pages',
    price: 'Rs.50/-',
  },
  {
    id: 13,
    name: 'Asian Countries Visa Letter (Owners)',
    description: 'Proprietor/Partner/Director',
    price: 'Rs.8,000/-',
  },
  {
    id: 14,
    name: 'Asian Countries Visa Letter (Employees)',
    description: 'For member firm staff',
    price: 'Rs.8,000/-',
  },
  {
    id: 15,
    name: 'Western Countries Visa Letter (Owners)',
    description: 'Europe/USA/UK/Canada/Australia/Africa',
    price: 'Rs.10,000/-',
  },
  {
    id: 16,
    name: 'Western Countries Visa Letter (Employees)',
    description: 'For member firm staff',
    price: 'Rs.10,000/-',
  },
  {
    id: 17,
    name: 'Asian Countries Invitation Letter',
    description: 'For foreign visitors',
    price: 'Rs.8,000/-',
  },
  {
    id: 18,
    name: 'Western Countries Invitation Letter',
    description: 'Europe/USA/Canada/UK/Australia/Africa',
    price: 'Rs.8,000/-',
  },
  {
    id: 19,
    name: 'Extra Membership Card',
    description: 'For partner/director',
    price: 'Rs.1,500/-',
  },
  {
    id: 20,
    name: 'Classified Trade Directory',
    description: 'Membership directory access',
    price: 'Rs.3,500/-',
  },
  {
    id: 21,
    name: 'Duplicate Certificate Charges',
    description: 'Replacement certificate fee',
    price: 'Rs.3,000/-',
  },
  {
    id: 22,
    name: 'Application Form Charges',
    description: 'New membership form fee',
    price: 'Rs.1,000/-',
  },
];

const FeeList = ({ data }: { data: typeof membershipServices | typeof supportServices }) => (
  <ul className="divide-y divide-border/50">
    {data.map((item) => (
      <li
        key={item.id}
        className="flex justify-between items-start gap-4 py-3 px-1 hover:bg-muted/50 rounded-lg transition-colors"
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="text-primary font-bold w-6 text-center text-sm pt-0.5">{item.id}</div>
          <div className="flex flex-col items-start">
            <p className="font-semibold text-foreground text-sm leading-snug">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        </div>
        <div className="text-right font-semibold text-primary whitespace-nowrap text-sm pl-2 pr-2 pt-0.5">{item.price}</div>
      </li>
    ))}
  </ul>
);

export default function MembershipFeesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <Badge
            variant="outline"
            className="py-1 px-4 self-center border-primary/50 text-primary font-semibold mb-4"
          >
            Fee Structure
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-headline mt-4 mb-6">
            BCCI Membership Fee & Service Charges
          </h2>
          <p className="max-w-3xl mx-auto text-base text-muted-foreground">
            Find a comprehensive list of all our membership and support service charges below.
          </p>
        </div>
        <div className="bg-card p-4 sm:p-6 rounded-2xl border border-border/50 shadow-lg animate-fade-in">
          <Tabs defaultValue="membership" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="membership">Membership Services</TabsTrigger>
              <TabsTrigger value="support">Support Services</TabsTrigger>
            </TabsList>
            <TabsContent value="membership" className="mt-6">
              <FeeList data={membershipServices} />
            </TabsContent>
            <TabsContent value="support" className="mt-6">
              <FeeList data={supportServices} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
