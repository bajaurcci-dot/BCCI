'use client';

import { Badge } from './ui/badge';

const IntroSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center">
          <Badge
            variant="outline"
            className="py-1 px-4 self-center border-primary/50 text-primary font-semibold mb-4"
          >
            Intro / Parichay
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mt-4 mb-6">
            Bajaur Chamber Of Commerce & Industry
          </h2>
          <div className="space-y-8 text-lg text-muted-foreground">
            <div>
              <h3 className="font-bold text-xl mb-2 text-foreground font-headline">What We Do</h3>
              <p>
                The Bajaur Chamber of Commerce & Industry (BCCI) is dedicated to fostering economic
                growth and prosperity within the Bajaur District. We support local businesses by
                providing essential services such as visa facilitation, document attestation, and
                issuing recommendation letters. Our goal is to enhance trade opportunities and
                create a thriving business environment for our members and the community.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2 text-foreground font-headline">
                Our Origins
              </h3>
              <p>
                The BCCI was established to address the need for a unified platform to represent the
                interests of the business community in Bajaur. What started as a small initiative
                has grown into a vital resource for local entrepreneurs, driving economic progress
                and advocating for business development throughout the region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
