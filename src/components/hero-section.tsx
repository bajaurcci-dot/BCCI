'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const heroBg = PlaceHolderImages.find((img) => img.id === 'hero-bg-alt');
  const heroLogo = PlaceHolderImages.find((img) => img.id === 'hero-block-logo');
  const newIcon1 = PlaceHolderImages.find((img) => img.id === 'new-icon-1');
  const newIcon2 = PlaceHolderImages.find((img) => img.id === 'new-icon-2');
  const newIcon3 = PlaceHolderImages.find((img) => img.id === 'new-icon-3');
  const newIcon4 = PlaceHolderImages.find((img) => img.id === 'new-icon-4');


  return (
    <section className="relative overflow-hidden flex-grow flex items-center justify-center py-12 sm:py-24 md:py-32">
      {heroBg &&
        <div className="absolute inset-0 flex h-full w-full items-center justify-center -z-10">
          <Image
            alt={heroBg.description}
            src={heroBg.imageUrl}
            fill
            className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90 object-cover"
            data-ai-hint={heroBg.imageHint}
          />
        </div>
      }
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            {heroLogo &&
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <Image
                src={heroLogo.imageUrl}
                alt={heroLogo.description}
                width={64}
                height={64}
                data-ai-hint={heroLogo.imageHint}
              />
            </div>
            }
            <div>
              <h1 className="mb-6 text-3xl font-bold tracking-tight text-pretty sm:text-4xl md:text-5xl lg:text-6xl font-headline">
                <span className="animate-color-change">Bajaur</span> Chamber Of Commerce & Industry
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground text-lg sm:text-xl md:text-2xl">
                The Bajaur Chamber of Commerce & Industry (BCCI) supports economic growth in
Bajaur District by advocating for local businesses, enhancing trade, and fostering a
thriving business environment.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button className="shadow-sm transition-shadow hover:shadow">
                Get Started
              </Button>
              <Button variant="outline" className="group">
                Learn more{" "}
                <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
            <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col items-center gap-5">
              <p className="font-medium text-muted-foreground lg:text-left">
                Built with open-source technologies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {newIcon1 && <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Image
                    src={newIcon1.imageUrl}
                    alt={newIcon1.description}
                    width={24}
                    height={24}
                    className="h-6 w-auto saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>}
                {newIcon2 && <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Image
                    src={newIcon2.imageUrl}
                    alt={newIcon2.description}
                    width={24}
                    height={24}
                    className="h-6 w-auto saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>}
                {newIcon3 && <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Image
                    src={newIcon3.imageUrl}
                    alt={newIcon3.description}
                    width={24}
                    height={24}
                    className="h-6 w-auto saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>}
                {newIcon4 && <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Image
                    src={newIcon4.imageUrl}
                    alt={newIcon4.description}
                    width={24}
                    height={24}
                    className="h-6 w-auto saturate-0 transition-all group-hover:sate-100"
                  />
                </a>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
