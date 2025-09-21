'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from './ui/badge';

const faqsLeft = [
  {
    question: 'What is the Bajaur Chamber of Commerce & Industry (BCCI)?',
    answer:
      'BCCI is a registered chamber that supports economic growth, trade, and local businesses in Bajaur District.',
  },
  {
    question: 'Where is the BCCI office located?',
    answer:
      'The offices are in Khar, District Bajaur and Chamber House, Aiwan-e-Tijarat Road, Karachi, Pakistan.',
  },
  {
    question: 'How can I contact BCCI?',
    answer:
      'You can contact via Phone: +92 308 2275587 / +92 21 99218001-09, Email: contact@bajaurcci.com.pk / info@bcci.com.pk, Website: www.bajaurcci.com.pk.',
  },
  {
    question: 'How can I become a member of BCCI?',
    answer:
      'By applying online with Full Name, NTN, and Membership Type, or by contacting the chamber directly.',
  },
  {
    question: 'What types of memberships are available?',
    answer:
      'Two types: Corporate Class and Associate Class.',
  },
  {
    question: 'How can I verify my membership?',
    answer:
      'By entering your Full Name, NTN, and Membership Type on the verification portal or contacting BCCI.',
  },
  {
    question: 'What are the membership charges?',
    answer:
      'Corporate: Rs. 8,000/-, Associate: Rs. 6,000/-, Renewals vary from Rs. 3,000/- to Rs. 12,000/-.',
  },
  {
    question: 'Does BCCI provide visa facilitation services?',
    answer:
      'Yes, BCCI assists with visa applications through recommendation and invitation letters.',
  },
];

const faqsRight = [
  {
    question: 'What are the charges for visa recommendation letters?',
    answer:
      'Asian Countries: Rs. 8,000/- (Owners/Employees), Western Countries: Rs. 10,000/- (Owners/Employees).',
  },
  {
    question: 'Does BCCI issue invitation letters for foreign visitors?',
    answer: 'Yes. Asian Countries: Rs. 8,000/-, Western Countries: Rs. 8,000/-.',
  },
  {
    question: 'Does BCCI provide attestation services?',
    answer:
      'Yes, BCCI certifies and authenticates business documents for legal and official purposes.',
  },
  {
    question: 'What are the charges for document attestation and certification?',
    answer:
      'Certificate of Origin: Rs. 250/-, Commercial Documents: Rs. 400/-, Extra Pages: Rs. 50/-, Duplicate Certificate: Rs. 3,000/-.',
  },
  {
    question: 'Does BCCI publish annual reports?',
    answer:
      'Yes, annual reports highlight activities, financial performance, and economic contributions.',
  },
  {
    question: 'Where can I download official documents of BCCI?',
    answer: 'From the Downloads Section on the official website.',
  },
  {
    question: 'How can I get more support or information?',
    answer: 'By phone, email, WhatsApp, or the official website.',
  },
  {
    question: 'Does BCCI offer WhatsApp support?',
    answer: 'Yes, members can chat directly on WhatsApp for assistance and updates.',
  },
];

const FaqSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
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
        <div className="grid md:grid-cols-2 gap-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqsLeft.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-left-${index}`}
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
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqsRight.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-right-${index}`}
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
      </div>
    </section>
  );
};

export default FaqSection;
