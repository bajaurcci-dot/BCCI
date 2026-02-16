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
    className: 'md:col-span-2',
  },
  {
    id: 'bento-item-2',
    title: 'Visa Facilitation',
    description:
      'Our chamber of commerce offers visa facilitation services, assisting with the application process and providing necessary documentation to streamline visa approvals for business and travel purposes.',
    imageId: 'new-icon-2',
    className: 'md:col-span-1',
  },
  {
    id: 'bento-item-3',
    title: 'Annual Reports',
    description:
      'Our chamber of commerce provides annual reports detailing our yearly activities and financial performance, highlighting our contributions to local economic development.',
    imageId: 'new-icon-3',
    className: 'md:col-span-1',
  },
  {
    id: 'bento-item-4',
    title: 'Attestation Documents',
    description:
      'Our chamber of commerce provides attestation services to certify and authenticate business documents, ensuring their validity for official and legal purposes.',
    imageId: 'new-icon-4',
    className: 'md:col-span-2',
  },
];

const BentoSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline mb-4">
            Our Professional Services
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-base sm:text-lg">
            The Bajaur Chamber of Commerce & Industry provides visa facilitation, annual reports,
            visa recommendation letters, and document attestation services to support local
            businesses and individuals.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => {
              const serviceImage = PlaceHolderImages.find((img) => img.id === service.imageId);
              return (
                <div
                  key={service.id}
                  className={`relative bg-card rounded-2xl shadow-md sm:shadow-lg overflow-hidden p-6 sm:p-8 transition-all duration-300 ease-in-out hover:shadow-xl sm:hover:-translate-y-2 ${service.className}`}
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
                    <h3 className="text-xl sm:text-2xl font-bold font-headline mb-3 text-foreground leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base flex-grow">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoSection;
