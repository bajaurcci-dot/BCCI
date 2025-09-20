'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mail, Twitter } from 'lucide-react';

const teamMembers = [
  {
    id: 'team-member-1',
    name: 'Haji Lali Shah',
    title: 'Meet The Founder',
    role: 'Founder & Group Leader',
    bio: 'Founder and Group Leader of BCCI, drives economic growth and supports businesses in Bajaur District.',
    twitterHandle: '@HajiLaliShah',
    email: 'founder@bajaurchamber.org.pk',
  },
  {
    id: 'team-member-2',
    name: 'Khan Muhammad',
    title: 'Meet The President',
    role: 'President',
    bio: 'Leads the chamber with a focus on strategic partnerships and advocating for local business interests.',
    twitterHandle: '@KhanMuhammad',
    email: 'president@bajaurchamber.org.pk',
  },
  {
    id: 'team-member-3',
    name: 'Fatima Ahmed',
    title: 'Meet The Vice President',
    role: 'Vice President',
    bio: 'Supports the president and manages internal operations to ensure the chamber runs efficiently.',
    twitterHandle: '@FatimaAhmed',
    email: 'vp@bajaurchamber.org.pk',
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
                className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="bg-primary/10 p-6 flex flex-col items-center justify-center text-center">
                  <div className="relative">
                    {memberImage && (
                      <div className="w-32 h-32 rounded-full border-4 border-primary p-1">
                        <Image
                          src={memberImage.imageUrl}
                          alt={member.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover rounded-full"
                          data-ai-hint={memberImage.imageHint}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-bold font-headline text-primary">{member.name}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{member.role}</p>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-center flex-grow">
                  <p className="mt-2 text-muted-foreground text-sm text-center">{member.bio}</p>
                  <div className="mt-4 flex flex-col gap-3">
                     <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold px-3 py-1 rounded-full self-center text-xs">
                      Bajaur Chamber
                    </div>
                    <div className="flex items-center justify-center gap-3 text-muted-foreground">
                      <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                        <Mail size={18} />
                      </a>
                       <a href={`https://twitter.com/${member.twitterHandle}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        <Twitter size={18} />
                      </a>
                    </div>
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
