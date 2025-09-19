'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Atom } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

const menuItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'Contact', href: '#' },
];

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="container mx-auto max-w-5xl">
        <div className="flex h-20 items-center justify-between rounded-xl bg-card p-4 px-6 shadow-md">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Atom className="h-6 w-6" />
                    <span>React Bits</span>
                  </Link>
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

          {/* Desktop Menu Icon (as per image) */}
          <div className="hidden md:flex">
             <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
              </Button>
          </div>
          
          {/* Logo and Brand Name */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Atom className="h-6 w-6" />
              <span>React Bits</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links (hidden for now, can be added here) */}
          <nav className="hidden md:flex items-center gap-6">
            {/* 
              This is where you could put desktop menu items if they were not in a sidebar
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))} 
            */}
          </nav>

          {/* Get Started Button */}
          <div>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
