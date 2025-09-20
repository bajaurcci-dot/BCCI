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
        <div className="grid grid-cols-1 gap-12">
          {teamMembers.map((member) => {
            const memberImage = PlaceHolderImages.find((img) => img.id === member.id);
            return (
              <div
                key={member.id}
                className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-1/3 bg-primary/10 p-6 flex flex-col items-center justify-center text-center">
                  <div className="relative">
                    {memberImage && (
                      <div className="w-48 h-48 rounded-lg border-4 border-primary p-1">
                        <Image
                          src={memberImage.imageUrl}
                          alt={member.name}
                          width={192}
                          height={192}
                          className="w-full h-full object-cover rounded-md"
                          data-ai-hint={memberImage.imageHint}
                        />
                      </div>
                    )}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-700/90 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-semibold border-2 border-white/50">
                      {member.name}
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold font-headline text-primary">{member.role}</h3>
                    <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
                      <Twitter size={16} />
                      <span>{member.twitterHandle}</span>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3 p-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold font-headline text-primary">
                    {member.title} {member.name}
                  </h3>
                  <p className="mt-4 text-muted-foreground text-base">{member.bio}</p>
                  <div className="mt-6 flex flex-col gap-4">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold px-4 py-2 rounded-full self-start">
                      Bajaur Chamber
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Mail size={18} className="text-primary" />
                      <a href={`mailto:${member.email}`} className="hover:text-primary">
                        {member.email}
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
