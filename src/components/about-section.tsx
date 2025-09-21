'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us-image');

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-6">About Us</h2>
            <p className="text-muted-foreground text-lg mb-6">
              The Bajaur Chamber of Commerce & Industry (BCCI) is a premier business organization dedicated to promoting economic growth and prosperity in the Bajaur District. Established to serve the local business community, BCCI provides a platform for advocacy, networking, and development.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-6 w-6 text-primary mr-3" />
                <span className="text-lg">Advocating for business-friendly policies.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-6 w-6 text-primary mr-3" />
                <span className="text-lg">Providing resources and support to our members.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-6 w-6 text-primary mr-3" />
                <span className="text-lg">Fostering a vibrant and dynamic local economy.</span>
              </li>
            </ul>
            <Button size="lg">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
