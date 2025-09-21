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
    question: 'What is the Bajaur Chamber of Commerce & Industry?',
    answer:
      'BCCI is a registered chamber that promotes trade, supports local businesses, and drives economic growth in Bajaur District.',
  },
  {
    question: 'Where is the BCCI office located?',
    answer:
      'The chamber offices are located in Khar, District Bajaur, and at Chamber House, Aiwan-e-Tijarat Road, Karachi, Pakistan.',
  },
  {
    question: 'How can I contact BCCI for details?',
    answer:
      'You can reach BCCI via phone, email, or website. Phone: +92 308 2275587, Email: contact@bajaurcci.com.pk.',
  },
  {
    question: 'How can I become a member of BCCI?',
    answer:
      'Membership is available by applying online with your full name, NTN, and membership type, or by contacting directly.',
  },
  {
    question: 'What types of memberships does BCCI offer?',
    answer:
      'BCCI offers two membership types: Corporate Class for large companies and Associate Class for smaller businesses.',
  },
  {
    question: 'How can I verify my membership with BCCI?',
    answer:
      'Enter your full name, NTN, and membership type in the verification portal or contact the chamber for assistance.',
  },
  {
    question: 'What are the membership charges at BCCI?',
    answer:
      'Corporate membership costs Rs. 8,000/-, Associate Rs. 6,000/-, while renewal fees range between Rs. 3,000/- and Rs. 12,000/-.',
  },
  {
    question: 'Does BCCI provide visa facilitation services?',
    answer:
      'Yes, BCCI supports visa applications by issuing recommendation and invitation letters for members and their employees.',
  },
];

const faqsRight = [
  {
    question: 'What are the charges for visa recommendation letters?',
    answer:
      'Visa letters for Asian countries cost Rs. 8,000/- while for Western countries, including USA, UK, and Europe, the fee is Rs. 10,000/-.',
  },
  {
    question: 'Does BCCI issue invitation letters for foreign visitors?',
    answer: 'Yes, invitation letters for Asian countries cost Rs. 8,000/- while invitation letters for Western countries cost Rs. 8,000/-.',
  },
  {
    question: 'Does BCCI provide attestation services for documents?',
    answer:
      'Yes, BCCI certifies and authenticates business-related documents to ensure their official acceptance and legal recognition.',
  },
  {
    question: 'What are the charges for document attestation services?',
    answer:
      'Certificate of Origin costs Rs. 250/-, Commercial Documents Rs. 400/-, Extra Pages Rs. 50/-, Duplicate Certificates Rs. 3,000/-.',
  },
  {
    question: 'Does BCCI publish annual reports every year?',
    answer:
      'Yes, the chamber publishes annual reports covering activities, financial performance, and contributions to economic development.',
  },
  {
    question: 'Where can I download official documents of BCCI?',
    answer: 'Official documents such as Election Schedules, DGTO Rules, and MOA/AOA can be downloaded from the chamber website.',
  },
  {
    question: 'How can I get more support or information from BCCI?',
    answer: 'Members can get assistance anytime via phone, email, WhatsApp, or by visiting the official chamber website for details.',
  },
  {
    question: 'Does BCCI provide WhatsApp support for members?',
    answer: 'Yes, BCCI offers WhatsApp chat support, allowing members to get updates, quick responses, and customer assistance anytime.',
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
