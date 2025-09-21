'use client';

import { Badge } from './ui/badge';

const ServicesIntroSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <Badge
            variant="outline"
            className="py-1 px-4 self-center border-primary/50 text-primary font-semibold mb-4"
          >
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-headline mt-4 mb-6">
            Professional Services for Business Growth
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            The Bajaur Chamber of Commerce & Industry provides a comprehensive range of services designed to support local businesses, facilitate trade, and foster economic development in the region.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesIntroSection;
