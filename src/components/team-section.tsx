import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const teamMembers = [
  {
    id: 'team-member-1',
    name: 'Melissa Tatcher',
    role: 'PRESIDENT',
  },
  {
    id: 'team-member-2',
    name: 'Stuard Ferrel',
    role: 'VICE PRESIDENT',
  },
  {
    id: 'team-member-3',
    name: 'Eva Hudson',
    role: 'GENERAL SECRETARY',
  },
  {
    id: 'team-member-4',
    name: 'Martin Ethariam',
    role: 'TREASURER',
  },
];

const TeamSection = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-primary font-bold mb-2">Our Team</p>
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            Executive Office Bearers
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground">
            The Bajaur Chamber of Commerce & Industry’s office bearers include the president, vice
            president, general secretary, and treasurer, who manage the chamber’s key operations
            and strategy.
          </p>
        </div>
        <div className="relative">
          <div
            className="hidden sm:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: -1 }}
          >
            <div className="w-40 h-40">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 80C0 35.8172 35.8172 0 80 0V160C35.8172 160 0 124.183 0 80Z"
                  fill="url(#pattern0)"
                  fillOpacity="0.1"
                />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_1_1"
                      transform="scale(0.005 0.0025)"
                    />
                  </pattern>
                  <image
                    id="image0_1_1"
                    width="200"
                    height="400"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAGQAQMAAACXOCwCAAAABlBMVEX///9TU1O2/XDjAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAW0lEQVRoge3OMQEAAADCCpW/jRrhB42gAU0DmjZo2qBpA5o2aNqgaQOaNmjagKYNmjZo2qBpA5o2aNqgaQOaNmjagKYNmjZo2qBpA5o2aNqgaQOaNmjagKYNmjZo2qBpA5p1A49UAQ/dwnBAAAAAAElFTkSuQmCC"
                  />
                </defs>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => {
              const memberImage = PlaceHolderImages.find((img) => img.id === member.id);
              return (
                <div
                  key={member.id}
                  className="bg-card p-6 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  {memberImage && (
                    <div className="w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={memberImage.imageUrl}
                        alt={member.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                        data-ai-hint={memberImage.imageHint}
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-4 text-muted-foreground">
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      <Twitter size={20} />
                    </a>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="hidden sm:block absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4"
            style={{ zIndex: -1 }}
          >
            <div className="w-24 h-24">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="28" cy="4" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="52" cy="4" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="76" cy="4" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="4" cy="28" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="28" cy="28" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="52" cy="28" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="76" cy="28" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="4" cy="52" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="28" cy="52" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="52" cy="52" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="76" cy="52" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="4" cy="76" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="28" cy="76" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="52" cy="76" r="4" fill="#00A300" fillOpacity="0.1" />
                <circle cx="76" cy="76" r="4" fill="#00A300" fillOpacity="0.1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
