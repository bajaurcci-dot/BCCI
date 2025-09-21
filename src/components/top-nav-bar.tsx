
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Info, Briefcase, Award, FileCheck, Download, UserCog, Mail, Bell } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { vacancies } from '@/lib/vacancies';

const menuItems = [
  { label: 'About', href: '/about', icon: Info },
  { label: 'Services', href: '/services', icon: Briefcase },
  { label: 'Membership', href: '/membership', icon: Award },
  { label: 'Compliances', href: '/compliances', icon: FileCheck },
  { label: 'Download', href: '#', icon: Download },
  { label: 'Admin', href: '/admin', icon: UserCog },
  { label: 'Contact Us', href: '/contact', icon: Mail },
];

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openVacancyCount, setOpenVacancyCount] = useState(0);
  const [openVacancies, setOpenVacancies] = useState<string[]>([]);
  const logoImage = PlaceHolderImages.find(img => img.id === 'logo');
  const pathname = usePathname();

  useEffect(() => {
    const open = vacancies.filter((v) => v.status === 'Open');
    setOpenVacancyCount(open.length);
    setOpenVacancies(open.map(v => v.title));
  }, []);

  const VacancyPopoverContent = () => (
    <PopoverContent className="w-80">
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Open Vacancies</h4>
          <p className="text-sm text-muted-foreground">
            The following positions are currently available.
          </p>
        </div>
        <div className="grid gap-2">
          {openVacancies.length > 0 ? (
            openVacancies.map((vacancy, index) => (
               <div key={index} className="grid grid-cols-3 items-center gap-4">
                <span className="col-span-2 font-medium">{vacancy}</span>
                 <Button asChild variant="secondary" size="sm" className="h-7 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No open vacancies at the moment.</p>
          )}
        </div>
      </div>
    </PopoverContent>
  );


  return (
    <header className="w-full p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between rounded-xl bg-card p-4 px-6 shadow-md">
          <div className="flex items-center">
            {logoImage && (
              <Link href="/">
                <Image
                  src={logoImage.imageUrl}
                  alt={logoImage.description}
                  width={144}
                  height={144}
                  priority
                  data-ai-hint={logoImage.imageHint}
                />
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  className="relative overflow-hidden transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg group"
                >
                  <Menu className="h-8 w-8" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col bg-background text-foreground border-r-0"
              >
                <SheetHeader className="border-b border-border pb-4">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <div className="flex justify-start">
                    {logoImage && (
                      <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Image
                          src={logoImage.imageUrl}
                          alt={logoImage.description}
                          width={144}
                          height={144}
                          data-ai-hint={logoImage.imageHint}
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
                        style={{ animationDelay: `${'index * 100'}ms` }}
                      >
                        <Link
                          href={item.href}
                          className={`flex items-center gap-4 rounded-md p-3 text-lg font-medium transition-colors ${
                            pathname === item.href && item.href !== '/'
                              ? 'bg-primary/10 text-primary'
                              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                          }`}
                          onClick={() => {
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
                <div className="mt-auto border-t border-border pt-4 space-y-2">
                   <Popover>
                    <PopoverTrigger asChild>
                       <Button variant="outline" className="w-full relative">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                         {openVacancyCount > 0 && (
                          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            {openVacancyCount}
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <VacancyPopoverContent />
                  </Popover>

                  <Button className="w-full relative overflow-hidden transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-lg group">
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
                className={`text-base font-medium transition-all duration-500 ease-in-out transform hover:scale-110 ${
                  pathname === item.href && item.href !== '/'
                    ? 'text-primary scale-110'
                    : 'text-muted-foreground hover:text-primary/90'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
             <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-6 w-6" />
                     {openVacancyCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                          {openVacancyCount}
                        </span>
                      )}
                    <span className="sr-only">Notifications</span>
                  </Button>
                </PopoverTrigger>
                <VacancyPopoverContent />
              </Popover>
            <Button className="relative overflow-hidden transition-all duration-700 ease-in-out hover:scale-110 hover:shadow-lg group">
              Get Started
              <span className="absolute inset-0 bg-white/20 transition-all duration-700 ease-in-out -translate-x-full group-hover:translate-x-0 group-hover:skew-x-[-15deg]"></span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
