'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export type FAQItem = {
  question: string;
  answer: string;
};

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

const FAQSection = ({ items, title = "Frequently Asked Questions" }: FAQSectionProps) => {
  // Split items into two columns
  const midPoint = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, midPoint);
  const rightItems = items.slice(midPoint);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-4 text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our processes and services.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {leftItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`left-item-${index}`}
                    className="border border-border rounded-lg bg-card px-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-lg font-medium hover:no-underline py-4 text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {rightItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`right-item-${index}`}
                    className="border border-border rounded-lg bg-card px-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-lg font-medium hover:no-underline py-4 text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
