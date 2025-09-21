'use client';

import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-card max-w-4xl mx-auto rounded-2xl p-8 md:p-12 shadow-lg border border-border/50 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join the Bajaur Chamber of Commerce & Industry today to unlock exclusive benefits, access our full range of services, and become part of a thriving business community.
          </p>
          <Button size="lg" className="group">
            Become a Member
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
