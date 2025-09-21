
'use client';

import { Download } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import { BorderBeam } from './ui/border-beam';

const downloadItems = [
  {
    title: 'Election Schedule 2024-26',
    description: 'With executive committee approval, the 2024-26 election schedule is issued per the trade organization act & rules, 2013.',
    href: '#',
  },
  {
    title: 'DGTO Rules 2013',
    description: '4(2)/2013-admn-iii.—under section 31 of the trade organizations act, 2013 (ii of 2013), the federal government.',
    href: '#',
  },
  {
    title: 'Trade Organizations Act',
    description: 'F. 22(121)/2021-legis.—the act of majlis-e-shoora (parliament) received presidential assent on november 1, 2022, and is published.',
    href: '#',
  },
  {
    title: 'Vote List 2024-2026',
    description: 'Approved by the executive committee, the 2024-26 election schedule is issued per the trade organization act & rules, 2013.',
    href: '#',
  },
  {
    title: 'DGTO Act 2013 Senate',
    description: 'F. 9(15)/2012-legis.—the act of majlis-e-shoora (parliament) received presidential assent on february 20, 2013.',
    href: '#',
  },
  {
    title: 'MOA & AOA BCCI',
    description: "Defines the chamber's role in supporting local commerce and industry, including objectives, powers, and management structure.",
    href: '#',
  },
];

const DownloadSection = () => {
  return (
    <section className="pb-20 md:pb-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {downloadItems.map((item, index) => (
            <div
              key={index}
              className="relative bg-card rounded-2xl shadow-lg overflow-hidden p-8 flex flex-col text-center items-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 animate-slide-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <BorderBeam colorFrom="#33d65b" colorTo="#1a9c3b" />
              <div className="flex-grow flex flex-col items-center">
                 <Image src="https://i.postimg.cc/1zctM22w/pdf.png" alt="PDF Icon" width={64} height={64} className="mb-4" />
                <h3 className="text-2xl font-bold font-headline mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-base mb-6 flex-grow">{item.description}</p>
              </div>
              <Button asChild className="mt-auto w-full group">
                <a href={item.href}>
                  <Download className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Download
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
