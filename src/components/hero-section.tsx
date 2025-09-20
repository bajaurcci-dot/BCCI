'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const heroBg = PlaceHolderImages.find((img) => img.id === 'hero-bg-alt');
  const heroLogo = PlaceHolderImages.find((img) => img.id === 'hero-block-logo');
  const shadcnLogo = PlaceHolderImages.find((img) => img.id === 'shadcn-logo');
  const tsLogo = PlaceHolderImages.find((img) => img.id === 'ts-logo');
  const reactLogo = PlaceHolderImages.find((img) => img.id === 'react-logo');
  const tailwindLogo = PlaceHolderImages.find((img) => img.id === 'tailwind-logo');


  return (
    <section className="relative overflow-hidden py-32">
      {heroBg &&
        <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
          <Image
            alt={heroBg.description}
            src={heroBg.imageUrl}
            fill
            className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90 object-cover"
            data-ai-hint={heroBg.imageHint}
          />
        </div>
      }
      <div className="relative z-10 container">
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
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Bajaur Chamber Of Commerce & Industry
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                The Bajaur Chamber of Commerce & Industry (BCCI) supports economic growth in
Bajaur District by advocating for local businesses, enhancing trade, and fostering a
thriving business environment.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button className="shadow-sm transition-shadow hover:shadow">
                Get Started
              </Button>
              <Button variant="outline" className="group">
                Learn more{" "}
                <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
            <div className="mt-20 flex flex-col items-center gap-5">
              <p className="font-medium text-muted-foreground lg:text-left">
                Built with open-source technologies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {shadcnLogo && <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Image
                    src={shadcnLogo.imageUrl}
                    alt={shadcnLogo.description}
                    width={24}
                    height={24}
                    className="h-6 w-auto saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>}
                {tsLogo && <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Image
                    src={tsLogo.imageUrl}
                    alt={tsLogo.description}
                    width={24}
                    height={24}
                    className="h-6 w-auto saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>}
                {reactLogo && <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Image
                    src={reactLogo.imageUrl}
                    alt={reactLogo.description}
                    width={24}
                    height={24}
                    className="h-6 w-auto saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>}
                {tailwindLogo && <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Image
                    src={tailwindLogo.imageUrl}
                    alt={tailwindLogo.description}
                    width={24}
                    height={24}
                    className="h-6 w-auto saturate-0 transition-all group-hover:saturate-100"
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
