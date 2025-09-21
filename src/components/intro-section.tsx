'use client';

import { Badge } from './ui/badge';
import { Building, Rocket } from 'lucide-react';

const IntroSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <Badge
            variant="outline"
            className="py-1 px-4 self-center border-primary/50 text-primary font-semibold mb-4"
          >
            Intro / Parichay
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mt-4 mb-6">
            Bajaur Chamber Of Commerce & Industry
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-sm hover:border-primary/50 hover:shadow-lg transition-all flex flex-col animate-slide-in-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-headline">What We Do</h3>
            </div>
            <p className="text-muted-foreground text-lg flex-grow">
              The Bajaur Chamber of Commerce & Industry (BCCI) is dedicated to fostering economic
              growth and prosperity within the Bajaur District. We support local businesses by
              providing essential services such as visa facilitation, document attestation, and
              issuing recommendation letters. Our goal is to enhance trade opportunities and
              create a thriving business environment for our members and the community.
            </p>
          </div>
          <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-sm hover:border-primary/50 hover:shadow-lg transition-all flex flex-col animate-slide-in-up [animation-delay:200ms]">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-headline">Our Origins</h3>
            </div>
            <p className="text-muted-foreground text-lg flex-grow">
              The BCCI was established to address the need for a unified platform to represent the
              interests of the business community in Bajaur. What started as a small initiative
              has grown into a vital resource for local entrepreneurs, driving economic progress
              and advocating for business development throughout the region.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
