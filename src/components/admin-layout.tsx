'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
  Loader2,
  FileDown,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { href: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: 'users', icon: Users, label: 'User Management' },
  { href: 'verification', icon: ShieldCheck, label: 'Member Verification' },
  { href: 'registration', icon: FileText, label: 'Online Registration' },
  { href: 'vacancies', icon: Briefcase, label: 'Vacancy Management' },
  { href: 'downloads', icon: FileDown, label: 'Downloads Management' },
  { href: 'messages', icon: Mail, label: 'Messages' },
  { href: 'permissions', icon: Settings, label: 'Permissions' },
  { href: 'activity', icon: Activity, label: 'Activity Log' },
  // { href: 'analytics', icon: LineChart, label: 'Analytics' }, // Example of future item
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const logoImage = PlaceHolderImages.find((img) => img.id === 'logo');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get('tab') || 'dashboard';

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Supabase auth check removed
    setLoading(false);
  }, [router]);

  const handleLogout = async () => {
    // Supabase logout removed
    toast({
      title: 'Exiting Admin',
      description: 'Redirecting to home page...',
    });
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const NavContent = () => (
    <div className="flex h-full flex-col px-4 py-6 bg-[#f3f6fd] lg:bg-transparent">
      <div className="flex items-center gap-3 px-4 mb-10">
        {logoImage && (
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logoImage.imageUrl}
              alt={logoImage.description}
              width={140}
              height={35}
              className="h-9 w-auto object-contain"
            />
          </Link>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.href;
            return (
              <Link
                key={item.label}
                href={`/admin/dashboard?tab=${item.href}`}
                className={cn(
                  'flex items-center gap-4 px-5 py-3.5 text-sm font-semibold transition-all duration-300 rounded-[30px]',
                  isActive
                    ? 'bg-white text-gray-900 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                )}
                onClick={() => isSheetOpen && setIsSheetOpen(false)}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto pt-8">
        <div className="rounded-[24px] bg-gradient-to-br from-gray-900 to-gray-800 p-5 text-white shadow-lg mx-2 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">Admin Pro</p>
              <p className="text-[10px] opacity-70">Premium Access</p>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-500 hover:text-gray-900 font-medium px-5"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[290px_1fr] bg-[#f3f6fd] font-sans">
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-50 w-[290px] border-r-0 bg-[#f3f6fd]">
        <NavContent />
      </aside>
      <div className="flex flex-col h-screen overflow-hidden lg:pl-[290px]">
        <header className="flex h-16 lg:h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-3 sm:py-4 shrink-0 bg-white shadow-sm lg:shadow-none lg:bg-transparent">
          <div className="flex items-center gap-3 sm:gap-4 lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2 shrink-0 text-gray-500">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 border-r-0 bg-[#f3f6fd] w-[280px]">
                <NavContent />
              </SheetContent>
            </Sheet>
            {logoImage && (
              <Image src={logoImage.imageUrl} alt="Logo" width={90} height={24} className="h-6 sm:h-7 w-auto" />
            )}
          </div>

          {/* Top Header Area - mimicking the 'Home / Search / Profile' from reference */}
          <div className="hidden lg:flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {navItems.find(i => i.href === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-400 text-sm font-medium mt-1">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-64 pl-10 pr-3 py-2.5 border-none rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm text-sm"
                />
              </div>
              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                <Button variant="ghost" size="icon" className="rounded-full bg-white text-gray-500 shadow-sm h-10 w-10 relative">
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </Button>
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                  {/* Placeholder Avatar */}
                  <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
