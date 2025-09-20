'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mail, Link as LinkIcon, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const teamMembers = [
  {
    id: 'team-member-1',
    name: 'Haji Lali Shah',
    handle: 'lalishah',
    title: 'Founder',
    role: 'Founder & Group Leader',
    bio: 'Founder and Group Leader of BCCI, drives economic growth and supports businesses in Bajaur District.',
    email: 'founder@bajaurchamber.org.pk',
    website: 'www.bajaurchamber.org.pk',
    location: 'Bajaur District KPK, Pakistan',
  },
  {
    id: 'team-member-2',
    name: 'Afzal Khan',
    handle: 'afzalkhan',
    title: 'President',
    role: 'President',
    bio: 'Afzal Khan, President of BCCI (2022/25), leads economic growth and business support in Bajaur District.',
    email: 'president@bajaurchamber.org.pk',
    website: 'www.bajaurchamber.org.pk',
    location: 'Bajaur District KPK, Pakistan',
  },
  {
    id: 'team-member-3',
    name: 'Fatima Ahmed',
    handle: 'fatimaahmed',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {teamMembers.map((member) => {
            const memberImage = PlaceHolderImages.find(img => img.id === member.id);
            return (
              <div
                key={member.id}
                className="bg-card rounded-2xl shadow-lg overflow-hidden w-full max-w-sm mx-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="relative">
                  <div className="h-28 bg-gray-800 rounded-t-2xl flex items-center justify-start p-4 pl-32">
                    <h3 className="text-white text-left font-bold text-lg">
                      Bajaur Chamber Of <br /> Commerce & Industry
                    </h3>
                  </div>
                  <div className="absolute top-16 left-6">
                    {memberImage && (
                      <div className="bg-gray-800 rounded-full p-2 border-4 border-card">
                        <Image
                          src={memberImage.imageUrl}
                          alt={memberImage.description}
                          width={80}
                          height={80}
                          className="rounded-full"
                          data-ai-hint={memberImage.imageHint}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-16 px-6 pb-6 text-center">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-foreground text-left">{member.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center">
                        @{member.handle}
                      </p>
                    </div>
                    <Badge variant="default">
                      {member.title}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm my-4 text-left">{member.bio}</p>

                  <div className="space-y-3 text-sm border-t border-border pt-4 text-left">
                    <a href={`mailto:${member.email}`} className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="mr-3 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="truncate">{member.email}</span>
                    </a>
                    <a href={`https://${member.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                      <LinkIcon className="mr-3 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="truncate">{member.website}</span>
                    </a>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="mr-3 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="truncate">{member.location}</span>
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
