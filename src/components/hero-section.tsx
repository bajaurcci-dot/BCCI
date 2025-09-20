'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const HeroSection = () => {
  const heroBg = PlaceHolderImages.find((img) => img.id === 'hero-bg');
  const heroLogo = PlaceHolderImages.find((img) => img.id === 'logo');

  return (
    <section className="relative overflow-hidden py-32">
      {heroBg && (
        <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
          <Image
            alt={heroBg.description}
            src={heroBg.imageUrl}
            fill
            className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90 object-cover"
            data-ai-hint={heroBg.imageHint}
          />
        </div>
      )}
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            {heroLogo && (
              <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
                <Image
                  src={heroLogo.imageUrl}
                  alt={heroLogo.description}
                  width={64}
                  height={64}
                  data-ai-hint={heroLogo.imageHint}
                />
              </div>
            )}
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Empowering Business in{' '}
                <span className="text-primary">Bajaur</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                The Bajaur Chamber of Commerce & Industry is dedicated to
                promoting economic growth and prosperity in the region.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button className="shadow-sm transition-shadow hover:shadow">
                Become a Member
              </Button>
              <Button variant="outline" className="group">
                Learn more{' '}
                <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
