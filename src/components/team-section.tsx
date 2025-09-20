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
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            Executive Office Bearers
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            The Bajaur Chamber of Commerce & Industry’s office bearers include the president, vice
            president, general secretary, and treasurer, who manage the chamber’s key operations
            and strategy.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => {
            const memberImage = PlaceHolderImages.find((img) => img.id === member.id);
            return (
              <div
                key={member.id}
                className="group relative overflow-hidden rounded-xl bg-card shadow-lg text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  {memberImage && (
                    <Image
                      src={memberImage.imageUrl}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover aspect-square"
                      data-ai-hint={memberImage.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <h3 className="text-2xl font-bold font-headline">{member.name}</h3>
                  <p className="text-sm uppercase tracking-widest text-primary-foreground/80 mb-4">
                    {member.role}
                  </p>
                  <div className="flex justify-center space-x-4 text-primary-foreground/70">
                    <a
                      href="#"
                      className="hover:text-primary-foreground transition-colors transform hover:scale-125"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href="#"
                      className="hover:text-primary-foreground transition-colors transform hover:scale-125"
                    >
                      <Twitter size={20} />
                    </a>
                    <a
                      href="#"
                      className="hover:text-primary-foreground transition-colors transform hover:scale-125"
                    >
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
