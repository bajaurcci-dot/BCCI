'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mail, Link as LinkIcon, MapPin } from 'lucide-react';

const teamMembers = [
  {
    id: 'team-member-1',
    name: 'Haji Lali Shah',
    title: 'Founder & President',
    bio: 'Founder and current President of BCCI, driving economic growth and supporting businesses in Bajaur District.',
    email: 'info@bajaurchamber.org.pk',
    website: 'www.bajaurchamber.org.pk',
    location: 'Bajaur, PK',
  },
  {
    id: 'team-member-3',
    name: 'Abubakar Shah',
    title: 'Secretary General',
    bio: 'Secretary General of BCCI, managing operations and strategy to foster a thriving business environment.',
    email: 'info@bajaurchamber.org.pk',
    website: 'www.bajaurchamber.org.pk',
    location: 'Bajaur, PK',
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#f9fafb]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-foreground mb-4 tracking-tight">
            Executive Leadership
          </h2>
          <div className="h-0.5 w-16 bg-primary mx-auto mb-6" />
          <p className="max-w-xl mx-auto text-muted-foreground text-base sm:text-lg font-light tracking-wide">
            Visionaries driving the Bajaur Chamber of Commerce & Industry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {teamMembers.map((member) => {
            const memberImage = PlaceHolderImages.find((img) => img.id === member.id);
            return (
              <div
                key={member.id}
                className="group flex flex-col md:flex-row bg-white overflow-hidden shadow-none hover:shadow-2xl transition-all duration-500 rounded-lg border border-border"
              >
                {/* Image Panel - Left (Desktop) */}
                <div className="relative w-full md:w-5/12 h-64 sm:h-72 md:h-auto aspect-[4/3] md:aspect-auto overflow-hidden">
                  {memberImage ? (
                    <Image
                      src={memberImage.imageUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={memberImage.imageHint}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-slate-100 text-slate-400">
                      No Image
                    </div>
                  )}
                  {/* Overlay for depth */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Content Panel - Right (Desktop) */}
                <div className="flex flex-col justify-center p-8 md:p-10 w-full md:w-7/12 bg-slate-50 group-hover:bg-white transition-colors duration-300">
                  <div className="mb-4 sm:mb-6">
                    <p className="text-primary font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 sm:mb-3">
                      {member.title}
                    </p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-slate-900 leading-none">
                      {member.name}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 border-l-2 border-primary/20 pl-4">
                    {member.bio}
                  </p>

                  <div className="flex items-center gap-5 pt-2">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-slate-400 hover:text-primary transition-colors"
                      title="Email"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <div className="h-4 w-px bg-slate-300" />
                    <a
                      href={`https://${member.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-primary transition-colors"
                      title="Website"
                    >
                      <LinkIcon className="h-5 w-5" />
                    </a>
                    <div className="flex-grow" />
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {member.location}
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
