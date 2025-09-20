'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Info } from 'lucide-react';
import { Briefcase } from 'lucide-react';
import { Award } from 'lucide-react';
import { FileCheck } from 'lucide-react';
import { Download } from 'lucide-react';
import { Image as ImageIcon } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const menuItems = [
  { label: 'About', href: '#', icon: Info },
  { label: 'Services', href: '#', icon: Briefcase },
  { label: 'Membership', href: '#', icon: Award },
  { label: 'Compliances', href: '#', icon: FileCheck },
  { label: 'Download', href: '#', icon: Download },
  { label: 'Gallery', href: '#', icon: ImageIcon },
  { label: 'Contact Us', href: '#', icon: Mail },
];

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoImage = PlaceHolderImages.find(img => img.id === 'logo');
  const [activeItem, setActiveItem] = useState('About');

  return (
    <header className="w-full">
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between rounded-xl bg-card p-4 px-6 shadow-md">
          <div className="flex items-center">
            {logoImage && (
              <Link href="#">
                <Image
                  src={logoImage.imageUrl}
                  alt={logoImage.description}
                  width={48}
                  height={48}
                  priority
                  data-ai-hint={logoImage.imageHint}
                  className="rounded-full"
                />
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  className="relative overflow-hidden bg-gradient-to-r from-green-400 to-green-600 text-white transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg group"
                >
                  <Menu className="h-8 w-8" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white border-r-0"
              >
                <SheetHeader className="border-b border-gray-700 pb-4">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <div className="flex justify-start">
                    {logoImage && (
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Image
                          src={logoImage.imageUrl}
                          alt={logoImage.description}
                          width={48}
                          height={48}
                          data-ai-hint={logoImage.imageHint}
                          className="rounded-full"
                        />
                      </Link>
                    )}
                  </div>
                </SheetHeader>
                <nav className="mt-8 flex-1">
                  <ul className="grid gap-2">
                    {menuItems.map((item, index) => (
                      <li
                        key={item.label}
                        className="transform transition-all duration-300 ease-in-out"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Link
                          href={item.href}
                          className={`flex items-center gap-4 rounded-md p-3 text-lg font-medium transition-colors ${
                            activeItem === item.label
                              ? 'bg-green-600/20 text-green-300'
                              : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                          }`}
                          onClick={() => {
                            setActiveItem(item.label);
                            setIsMenuOpen(false);
                          }}
                        >
                          <item.icon className="h-6 w-6" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-auto border-t border-gray-700 pt-4">
                  <Button className="w-full relative overflow-hidden bg-gradient-to-r from-green-400 to-green-600 text-white transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-lg group">
                    Get Started
                    <span className="absolute inset-0 bg-white/20 transition-all duration-700 ease-in-out -translate-x-full group-hover:translate-x-0 group-hover:skew-x-[-15deg]"></span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
            {menuItems.map(item => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveItem(item.label)}
                className={`text-base font-medium transition-all duration-500 ease-in-out transform hover:scale-110 ${
                  activeItem === item.label
                    ? 'text-green-600 scale-110'
                    : 'text-muted-foreground hover:text-green-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button className="relative overflow-hidden bg-gradient-to-r from-green-400 to-green-600 text-white transition-all duration-700 ease-in-out hover:scale-110 hover:shadow-lg group">
              Get Started
              <span className="absolute inset-0 bg-white/20 transition-all duration-700 ease-in-out -translate-x-full group-hover:translate-x-0 group-hover:skew-x-[-15deg]"></span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
