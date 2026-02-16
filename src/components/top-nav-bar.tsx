'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Info, Briefcase, Award, FileCheck, Download, UserCog, Mail, Bell, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useVacancies } from '@/hooks/use-vacancies';

const menuItems = [
  { label: 'About', href: '/about', icon: Info },
  { label: 'Services', href: '/services', icon: Briefcase },
  {
    label: 'Membership',
    href: '/membership',
    icon: Award,
    children: [
      { label: 'Membership Fee', href: '/membership' },
      { label: 'Online Registration', href: '/membership/online-registration' },
      { label: 'Member Verification', href: '/membership/member-verification' },
    ]
  },
  { label: 'Compliances', href: '/compliances', icon: FileCheck },
  { label: 'Downloads', href: '/downloads', icon: Download },
  { label: 'Vacancies', href: '/vacancies', icon: UserCog },
  { label: 'Contact Us', href: '/contact', icon: Mail },
];

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { vacancies } = useVacancies();
  const logoImage = PlaceHolderImages.find(img => img.id === 'logo');
  const pathname = usePathname();

  const openVacancies = vacancies.filter((v) => v.status === 'Open');
  const openVacancyCount = openVacancies.length;

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
              <div key={index} className="grid grid-cols-[1fr_auto] items-center gap-4">
                <span className="font-medium">{vacancy.title}</span>
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
    <header className="w-full p-3 sm:p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-14 sm:h-16 items-center justify-between rounded-xl bg-card p-3 sm:p-4 px-4 sm:px-6 shadow-md border border-gray-100/50">
          <div className="flex items-center">
            {logoImage && (
              <Link href="/" className="transition-opacity hover:opacity-80">
                <Image
                  src={logoImage.imageUrl}
                  alt={logoImage.description}
                  width={120}
                  height={120}
                  priority
                  className="w-24 sm:w-32 md:w-36 h-auto"
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
                  variant="ghost"
                  className="relative overflow-hidden transition-all duration-300 hover:bg-gray-100 group"
                >
                  <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col bg-background text-foreground border-r-0 overflow-y-auto"
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
                          width={120}
                          height={120}
                          className="w-28 h-auto"
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
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {item.children ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-4 rounded-md p-3 text-lg font-medium text-muted-foreground">
                              <item.icon className="h-6 w-6" />
                              <span>{item.label}</span>
                            </div>
                            <div className="pl-12 grid gap-2 border-l-2 border-border ml-6">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className={`block text-base transition-colors py-2 pl-2 ${pathname === child.href ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className={`flex items-center gap-4 rounded-md p-3 text-lg font-medium transition-colors ${pathname === item.href && item.href !== '/'
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
                        )}
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

                  <Button asChild className="w-full relative overflow-hidden transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-lg group">
                    <Link href="/services">
                      Get Started
                      <span className="absolute inset-0 bg-white/20 transition-all duration-700 ease-in-out -translate-x-full group-hover:translate-x-0 group-hover:skew-x-[-15deg]"></span>
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
            {menuItems.map(item => {
              if (item.children) {
                const isActive = pathname.startsWith('/membership');
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className={`flex items-center gap-1 text-base font-medium transition-all duration-500 ease-in-out outline-none ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary/90'}`}>
                      {item.label} <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.label} asChild>
                          <Link href={child.href} className="cursor-pointer">
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-base font-medium transition-all duration-500 ease-in-out transform hover:scale-110 ${pathname === item.href && item.href !== '/'
                    ? 'text-primary scale-110'
                    : 'text-muted-foreground hover:text-primary/90'
                    }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-6 w-6" />
                  {openVacancyCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                      {openVacancyCount}
                    </span>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </PopoverTrigger>
              <VacancyPopoverContent />
            </Popover>
            <Button asChild className="w-full relative overflow-hidden transition-all duration-700 ease-in-out hover:scale-110 hover:shadow-lg group">
              <Link href="/services">
                Get Started
                <span className="absolute inset-0 bg-white/20 transition-all duration-700 ease-in-out -translate-x-full group-hover:translate-x-0 group-hover:skew-x-[-15deg]"></span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
