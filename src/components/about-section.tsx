'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { CheckCircle, Zap, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';
import { BorderBeam } from './ui/border-beam';

const AboutSection = () => {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us-image');

  const features = [
    {
      icon: Zap,
      title: 'Advocacy',
      description: 'Championing business-friendly policies to foster a thriving economic environment.',
    },
    {
      icon: ShieldCheck,
      title: 'Member Support',
      description: 'Providing essential resources and support to empower our members.',
    },
    {
      icon: BarChart3,
      title: 'Economic Growth',
      description: 'Driving initiatives that contribute to a vibrant and dynamic local economy.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
               {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={600}
                  height={450}
                  className="w-full object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
              <BorderBeam colorFrom="#33d65b" colorTo="#1a9c3b" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-primary font-bold tracking-wider uppercase font-headline">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-bold font-headline mt-2 mb-6">
              Your Partner in Business and Economic Growth
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              The Bajaur Chamber of Commerce & Industry (BCCI) is a premier business organization dedicated to promoting economic growth and prosperity in the Bajaur District. Established to serve the local business community, BCCI provides a platform for advocacy, networking, and development.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 flex-grow">
              {features.map((feature) => (
                <div key={feature.title} className="bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:border-primary/50 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
               <div className="bg-primary/10 p-6 rounded-xl border border-primary/20 flex flex-col justify-center items-center text-center sm:col-span-2">
                  <h3 className="font-bold text-xl mb-2 text-primary">Join Our Mission</h3>
                  <p className="text-primary/80 text-sm mb-4">Become a member and help us shape the future of business in Bajaur.</p>
                  <Button size="sm" variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
