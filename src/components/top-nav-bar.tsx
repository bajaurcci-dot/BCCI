'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Atom } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const menuItems = [
    { label: 'About', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Membership', href: '#' },
    { label: 'Gallery', href: '#' },
    { label: 'Compliances', href: '#' },
    { label: 'Download', href: '#' },
    { label: 'Contact Us', href: '#' },
];

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoImage = PlaceHolderImages.find(img => img.id === 'logo');

  return (
    <header className="w-full">
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-20 items-center justify-between rounded-xl bg-card p-4 px-6 shadow-md">
          {/* Logo */}
          <div className="flex items-center">
             {logoImage && (
                <Link href="#">
                    <Image
                      src={logoImage.imageUrl}
                      alt={logoImage.description}
                      width={40}
                      height={40}
                      data-ai-hint={logoImage.imageHint}
                      className="rounded-full"
                    />
                </Link>
              )}
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-8 w-8" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                   {logoImage && (
                      <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                          <Image
                            src={logoImage.imageUrl}
                            alt={logoImage.description}
                            width={40}
                            height={40}
                            data-ai-hint={logoImage.imageHint}
                            className="rounded-full"
                          />
                      </Link>
                    )}
                </SheetHeader>
                <nav className="mt-8 grid gap-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Get Started Button */}
          <div>
            <Button className="bg-gradient-to-r from-green-400 to-green-600 text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
