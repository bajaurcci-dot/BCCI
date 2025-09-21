'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from './ui/badge';

const faqs = [
  {
    question: 'How do I become a member of the Bajaur Chamber of Commerce & Industry?',
    answer:
      'To become a member, you need to fill out the membership application form available on our website. The form requires details about your business, including registration documents and proof of address. Once submitted, our team will review your application, and upon approval, you will be notified of the membership fee and next steps.',
  },
  {
    question: 'What are the benefits of becoming a member?',
    answer:
      'As a member, you gain access to a wide range of benefits, including networking opportunities with other local businesses, invitations to exclusive events and seminars, and access to resources and support for business development. You will also have a voice in our advocacy efforts to promote a favorable business environment in the region.',
  },
  {
    question: 'How can the Chamber help me with visa applications?',
    answer:
      'The Bajaur Chamber of Commerce & Industry provides visa facilitation services, including issuing visa recommendation letters for our members. These letters can support your visa application for business travel by verifying your affiliation with a registered business in Bajaur. Please contact our office for more information on the required documents.',
  },
  {
    question: 'Where can I find the annual reports?',
    answer:
      'Our annual reports are available for download on our website in the "Download" section. These reports provide a comprehensive overview of our activities, financial performance, and contributions to the local economy throughout the year.',
  },
  {
    question: 'What kind of documents can be attested by the Chamber?',
    answer:
      'We offer attestation services for a variety of business documents, such as certificates of origin, commercial invoices, and other trade-related documents. This service helps authenticate your documents, ensuring they are accepted for official and legal purposes both locally and internationally.',
  },
];

const FaqSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <Badge
            variant="outline"
            className="py-1 px-4 self-center border-primary/50 text-primary font-semibold mb-4"
          >
            FAQs
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mt-4 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            Find answers to common questions about our services, membership, and how we can support your business.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border/50 rounded-2xl shadow-sm hover:border-primary/50 hover:shadow-lg transition-all px-6"
            >
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
