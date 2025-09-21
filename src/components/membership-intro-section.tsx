'use client';

import { Badge } from './ui/badge';

const MembershipIntroSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <Badge
            variant="outline"
            className="py-1 px-4 self-center border-primary/50 text-primary font-semibold mb-4"
          >
            Membership
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-headline mt-4 mb-6">
            Members Verifications and Contact Us
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            BCCI provides a simple members verification process. For inquiries or assistance, feel free to contact us. We support local businesses and promote growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MembershipIntroSection;
