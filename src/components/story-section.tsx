'use client';

import { Badge } from './ui/badge';
import { Briefcase, Lightbulb, TrendingUp } from 'lucide-react';

const storyPoints = [
  {
    icon: Briefcase,
    title: 'The Humble Beginning',
    description:
      'Our journey started with a small team and a big vision. We faced numerous challenges, from limited resources to navigating a complex market, but our passion for supporting local businesses kept us going.',
  },
  {
    icon: Lightbulb,
    title: 'The Turning Point',
    description:
      'A key partnership marked a significant turning point for us. This collaboration not only provided us with the necessary resources but also validated our mission, inspiring us to expand our services and reach.',
  },
  {
    icon: TrendingUp,
    title: 'Growth and Inspiration',
    description:
      'Today, we are proud to be a cornerstone of the business community. Our growth is a testament to the resilience of our members and the unwavering support of our partners. We continue to draw inspiration from the success stories of the entrepreneurs we serve.',
  },
];

const StorySection = () => {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <Badge
            variant="outline"
            className="py-1 px-4 self-center border-primary/50 text-primary font-semibold mb-4"
          >
            Our Journey
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mt-4 mb-6">
            The Story of Our Struggles & Success
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            Every great journey has a story. Here is a glimpse into the key moments that have
            shaped us into the organization we are today.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border"
            aria-hidden="true"
          ></div>
          {storyPoints.map((point, index) => (
            <div
              key={point.title}
              className={`relative mb-12 flex items-center animate-slide-in-up ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 text-left' : 'md:pl-8 text-left'
                  }`}
              >
                <div
                  className={`bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:border-primary/50 hover:shadow-lg transition-all ${index % 2 === 0 ? 'md:text-left' : 'md:text-left'
                    }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <point.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-headline">{point.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 bg-background p-1 rounded-full border-2 border-primary">
                <div className="h-3 w-3 bg-primary rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
