'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mail, Link as LinkIcon, MapPin, AtSign } from 'lucide-react';

const teamMembers = [
  {
    id: 'team-member-1',
    name: 'Haji Lali Shah',
    handle: '@lalishah',
    title: 'Founder',
    role: 'Founder & Group Leader',
    bio: 'Founder and Group Leader of BCCI, drives economic growth and supports businesses in Bajaur District.',
    email: 'founder@bajaurchamber.org.pk',
    website: 'www.bajaurchamber.org.pk',
    location: 'Bajaur District KPK, Pakistan',
  },
  {
    id: 'team-member-2',
    name: 'Khan Muhammad',
    handle: '@khanmuhammad',
    title: 'President',
    role: 'President',
    bio: 'Leads the chamber with a focus on strategic partnerships and advocating for local business interests.',
    email: 'president@bajaurchamber.org.pk',
    website: 'www.bajaurchamber.org.pk',
    location: 'Bajaur District KPK, Pakistan',
  },
  {
    id: 'team-member-3',
    name: 'Fatima Ahmed',
    handle: '@fatimaahmed',
    title: 'Vice President',
    role: 'Vice President',
    bio: 'Supports the president and manages internal operations to ensure the chamber runs efficiently.',
    email: 'vp@bajaurchamber.org.pk',
    website: 'www.bajaurchamber.org.pk',
    location: 'Bajaur District KPK, Pakistan',
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
                className="bg-card rounded-2xl shadow-lg overflow-visible w-full max-w-sm mx-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative">
                  <div className="bg-gray-800 text-white text-center p-8 rounded-t-2xl h-36 flex items-center justify-center">
                    <h3 className="text-xl font-bold font-headline">Bajaur Chamber Of<br/>Commerce & Industry</h3>
                  </div>
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32">
                    {memberImage && (
                      <Image
                        src={memberImage.imageUrl}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-full border-4 border-card bg-card"
                        data-ai-hint={memberImage.imageHint}
                      />
                    )}
                  </div>
                </div>
                
                <div className="pt-20 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-2xl font-bold text-foreground">{member.name}</h4>
                      <p className="text-muted-foreground">{member.handle}</p>
                    </div>
                    <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">{member.title}</span>
                  </div>

                  <p className="text-muted-foreground text-sm my-4">{member.bio}</p>

                  <div className="space-y-3 text-sm">
                    <a href={`mailto:${member.email}`} className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="mr-3 h-4 w-4" />
                      <span>{member.email}</span>
                    </a>
                    <a href={`https://${member.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                      <LinkIcon className="mr-3 h-4 w-4" />
                      <span>{member.website}</span>
                    </a>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="mr-3 h-4 w-4" />
                      <span>{member.location}</span>
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
