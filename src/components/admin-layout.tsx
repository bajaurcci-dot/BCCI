'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  ShieldCheck,
  FileText,
  Briefcase,
  Settings,
  Activity,
  LogOut,
  Menu,
  LayoutDashboard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '#', icon: Users, label: 'User Management' },
  { href: '#', icon: ShieldCheck, label: 'Member Verification' },
  { href: '#', icon: FileText, label: 'Online Registration' },
  { href: '#', icon: Briefcase, label: 'Vacancy Management' },
  { href: '#', icon: Settings, label: 'Permissions' },
  { href: '#', icon: Activity, label: 'Activity Log' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const logoImage = PlaceHolderImages.find((img) => img.id === 'logo');
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        {logoImage && (
          <Link href="/">
            <Image
              src={logoImage.imageUrl}
              alt={logoImage.description}
              width={120}
              height={40}
            />
          </Link>
        )}
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                onClick={() => isSheetOpen && setIsSheetOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex">
      <aside className="hidden lg:block w-64 bg-card border-r border-border">
        <NavContent />
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-border lg:hidden">
           <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <NavContent />
            </SheetContent>
          </Sheet>
          {logoImage && (
            <Link href="/">
              <Image
                src={logoImage.imageUrl}
                alt={logoImage.description}
                width={120}
                height={40}
              />
            </Link>
          )}
           <div className="w-8"></div>
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
