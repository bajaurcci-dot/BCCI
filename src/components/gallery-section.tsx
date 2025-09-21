'use client';

import Image from 'next/image';
import { Badge } from './ui/badge';

const images = [
  'https://i.postimg.cc/RZG82PRr/1.jpg',
  'https://i.postimg.cc/NjQSJhR7/2.jpg',
  'https://i.postimg.cc/15GbrRV3/3.jpg',
  'https://i.postimg.cc/YqKJFL9P/4.jpg',
  'https://i.postimg.cc/k54ZCx12/5.jpg',
  'https://i.postimg.cc/xd4Z1cht/6.jpg',
  'https://i.postimg.cc/xCN4J9SY/7.jpg',
  'https://i.postimg.cc/kGrhWLnS/8.jpg',
  'https://i.postimg.cc/L4fWm4T3/10.jpg',
  'https://i.postimg.cc/k54ZCx12/5.jpg',
];

const GallerySection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="py-1 px-4 self-center border-primary/50 text-primary font-semibold mb-4"
          >
            Our Gallery
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mt-4 mb-6">
            Moments and Milestones
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            A glimpse into our journey, events, and the community we serve.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
