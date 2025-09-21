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
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative flex justify-center items-center">
            <div className="relative w-[350px] h-[450px] flex justify-center items-end">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform -rotate-6 transition-transform duration-300 hover:rotate-0"></div>
              <div className="absolute inset-4 border-2 border-primary rounded-2xl transform rotate-3 transition-transform duration-300 hover:rotate-0"></div>

              {founderImage && (
                <div className="relative z-10 w-[300px] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={founderImage.imageUrl}
                    alt={founderImage.description}
                    fill
                    className="w-full h-full object-cover"
                    data-ai-hint={founderImage.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute left-4 top-4">
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.73,19.35C15.7,20.32 17.18,21 18.5,21C18.84,21 19.18,20.97 19.5,20.91C17.9,22.28 15.8,23 13.5,23C8.26,23 4,18.74 4,13.5C4,8.26 8.26,4 13.5,4C15.8,4 17.9,4.72 19.5,6.09C19.18,6.03 18.84,6 18.5,6C17.18,6 15.7,6.68 14.73,7.65L17.5,10.5L14.73,13.35C15.7,14.32 17.18,15 18.5,15C18.84,15 19.18,15.03 19.5,15.09C17.9,16.28 15.8,17 13.5,17C12.55,17 11.64,16.84 10.8,16.5L14.73,19.35Z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -right-4 top-0 h-full flex items-center">
              <div
                className="flex items-center justify-center transform -rotate-90 "
                style={{ height: 'min-content' }}
              >
                <h3 className="whitespace-nowrap text-3xl font-bold tracking-widest text-foreground/80 font-headline">
                  HAJI LALI SHAH
                </h3>
                <p className="whitespace-nowrap text-sm ml-4 font-semibold text-muted-foreground">
                  FOUNDER &<br />
                  GROUP LEADER
                </p>
              </div>
            </div>
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
