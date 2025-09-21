'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from './ui/badge';
import { Check } from 'lucide-react';

const AboutSection = () => {
  const founderImage = PlaceHolderImages.find((img) => img.id === 'about-us-image');

  const visionPoints = [
    'Lead economic growth',
    'Build a thriving business',
    'Promote inclusive development',
  ];

  const missionPoints = [
    'Support local entrepreneurs',
    'Drive business development',
    'Enhance economic prosperity',
  ];

  return (
    <section className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <div className="relative flex justify-center items-center">
             {founderImage && (
                <div className="relative w-[350px] h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={founderImage.imageUrl}
                    alt={founderImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={founderImage.imageHint}
                  />
                </div>
              )}
          </div>

          <div className="flex flex-col">
            <Badge
              variant="outline"
              className="py-1 px-4 self-start border-primary/50 text-primary font-semibold"
            >
              About Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-headline mt-4 mb-6">
              The Story Of <span className="text-primary">BCCI</span> Journey
            </h2>
            <p className="text-muted-foreground text-lg mb-12">
              Starting as a small initiative, the Bajaur Chamber has grown into a crucial business
              resource, driving economic progress and supporting local entrepreneurs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:border-primary/50 hover:shadow-lg transition-all">
                <h3 className="font-bold text-xl mb-4 text-foreground font-headline">Vision</h3>
                <ul className="space-y-3">
                  {visionPoints.map((point) => (
                    <li key={point} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-sm mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:border-primary/50 hover:shadow-lg transition-all">
                <h3 className="font-bold text-xl mb-4 text-foreground font-headline">Mission</h3>
                <ul className="space-y-3">
                  {missionPoints.map((point) => (
                    <li key={point} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-sm mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
