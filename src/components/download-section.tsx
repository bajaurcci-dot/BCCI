'use client';

import { Download } from 'lucide-react';
import { Button } from './ui/button';

const downloadItems = [
  {
    title: 'Election Schedule 2024-26',
    description: 'With executive committee approval, the 2024-26 election schedule is issued per the trade organization act & rules, 2013.',
    href: '#',
    type: 'DOCX',
  },
  {
    title: 'DGTO Rules 2013',
    description: '4(2)/2013-admn-iii.—under section 31 of the trade organizations act, 2013 (ii of 2013), the federal government.',
    href: '#',
    type: 'PDF',
  },
  {
    title: 'Trade Organizations Act',
    description: 'F. 22(121)/2021-legis.—the act of majlis-e-shoora (parliament) received presidential assent on november 1, 2022, and is published.',
    href: '#',
    type: 'PDF',
  },
  {
    title: 'Vote List 2024-2026',
    description: 'Approved by the executive committee, the 2024-26 election schedule is issued per the trade organization act & rules, 2013.',
    href: '#',
    type: 'DOCX',
  },
  {
    title: 'DGTO Act 2013 Senate',
    description: 'F. 9(15)/2012-legis.—the act of majlis-e-shoora (parliament) received presidential assent on february 20, 2013.',
    href: '#',
    type: 'DOCX',
  },
  {
    title: 'MOA & AOA BCCI',
    description: "Defines the chamber's role in supporting local commerce and industry, including objectives, powers, and management structure.",
    href: '#',
    type: 'PDF',
  },
];

const FileTypeIcon = ({ type }: { type: string }) => {
  const isDocx = type === 'DOCX';
  const bgColor = isDocx ? 'bg-blue-500' : 'bg-red-500';
  const iconPath = isDocx
    ? "M4 0C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H20C22.2091 24 24 22.2091 24 20V4C24 1.79086 22.2091 0 20 0H4Z"
    : "M4 0C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H20C22.2091 24 24 22.2091 24 20V4C24 1.79086 22.2091 0 20 0H4Z";

  return (
    <div className="absolute -top-3 -left-3 transform">
      <div className={`relative w-14 h-14 ${bgColor} rounded-lg shadow-md flex items-center justify-center`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
          <path d={iconPath} fill="white" fillOpacity="0.1"/>
        </svg>
        <span className="text-white font-bold text-xs">{type}</span>
      </div>
    </div>
  );
};

const GradientButton = ({ href }: { href: string }) => (
    <Button asChild className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
      <a href={href}>
        <span className="absolute inset-0 bg-white/20 transition-all duration-700 ease-in-out -translate-x-full group-hover:translate-x-0 group-hover:skew-x-[-15deg]"></span>
        Download
        <Download className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );

const DownloadSection = () => {
  return (
    <section className="pt-8 pb-20 md:pb-32 bg-background">
      <div className="container mx-auto px-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {downloadItems.map((item, index) => (
              <div
                key={index}
                className="relative bg-card rounded-2xl shadow-lg p-6 pt-16 flex flex-col text-left items-start transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1"
              >
                <FileTypeIcon type={item.type} />
                <div className="flex-grow flex flex-col items-start w-full">
                  <h3 className="text-lg font-bold font-headline mb-3 text-foreground uppercase">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">{item.description}</p>
                </div>
                <GradientButton href={item.href} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;