'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { BorderBeam } from '@/components/ui/border-beam';

const services = [
  {
    id: 'bento-item-1',
    title: 'Visa Recommendation Letters',
    description:
      'Our chamber of commerce issues visa recommendation letters to support and streamline visa applications for business and travel purposes.',
    imageId: 'new-icon-1',
  },
  {
    id: 'bento-item-2',
    title: 'Visa Facilitation',
    description:
      'Our chamber of commerce offers visa facilitation services, assisting with the application process and providing necessary documentation to streamline visa approvals for business and travel purposes.',
    imageId: 'new-icon-2',
  },
  {
    id: 'bento-item-3',
    title: 'Annual Reports',
    description:
      'Our chamber of commerce provides annual reports detailing our yearly activities and financial performance, highlighting our contributions to local economic development.',
    imageId: 'new-icon-3',
  },
  {
    id: 'bento-item-4',
    title: 'Attestation Documents',
    description:
      'Our chamber of commerce provides attestation services to certify and authenticate business documents, ensuring their validity for official and legal purposes.',
    imageId: 'new-icon-4',
  },
];

const ServicesListSection = () => {
  return (
    <section className="py-0 md:py-0 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const serviceImage = PlaceHolderImages.find((img) => img.id === service.imageId);
            return (
              <div
                key={service.id}
                className="relative bg-card rounded-2xl shadow-lg overflow-hidden p-8 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 animate-slide-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <BorderBeam colorFrom="#33d65b" colorTo="#1a9c3b" />
                <div className="flex flex-col h-full">
                  {serviceImage && (
                    <div className="mb-6">
                      <Image
                        src={serviceImage.imageUrl}
                        alt={serviceImage.description}
                        width={48}
                        height={48}
                        className="saturate-0"
                        data-ai-hint={serviceImage.imageHint}
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold font-headline mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-base flex-grow">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesListSection;
