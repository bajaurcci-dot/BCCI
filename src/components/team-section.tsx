'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const teamMembers = [
  {
    id: 'team-member-1',
    name: 'Haji Lali Shah',
    title: 'Meet The Founder',
    role: 'Founder & Group Leader',
    bio: 'Founder and Group Leader of BCCI, drives economic growth and supports businesses in Bajaur District.',
  },
  {
    id: 'team-member-2',
    name: 'Khan Muhammad',
    title: 'Meet The President',
    role: 'President',
    bio: 'Leads the chamber with a focus on strategic partnerships and advocating for local business interests.',
  },
  {
    id: 'team-member-3',
    name: 'Fatima Ahmed',
    title: 'Meet The Vice President',
    role: 'Vice President',
    bio: 'Supports the president and manages internal operations to ensure the chamber runs efficiently.',
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => {
            const memberImage = PlaceHolderImages.find((img) => img.id === member.id);
            return (
              <div
                key={member.id}
                className="group relative bg-card rounded-xl shadow-lg overflow-hidden flex flex-col text-center transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:bg-primary"
              >
                <div className="p-8">
                  <div className="relative w-32 h-32 mx-auto">
                    {memberImage && (
                      <Image
                        src={memberImage.imageUrl}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-full border-4 border-primary transition-all duration-500 group-hover:border-white"
                        data-ai-hint={memberImage.imageHint}
                      />
                    )}
                  </div>
                  <div className="mt-6">
                    <h3 className="text-2xl font-bold font-headline text-foreground transition-colors duration-500 group-hover:text-white">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mt-1 transition-colors duration-500 group-hover:text-green-200">{member.role}</p>
                  </div>
                </div>

                <div className="p-6 bg-card/50 flex flex-col justify-center flex-grow transition-colors duration-500 group-hover:bg-white/10">
                  <p className="text-muted-foreground text-sm transition-colors duration-500 group-hover:text-gray-200">{member.bio}</p>
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
