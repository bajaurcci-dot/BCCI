'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
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
  { href: 'permissions', icon: Settings, label: 'Permissions' },
  { href: 'activity', icon: Activity, label: 'Activity Log' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const logoImage = PlaceHolderImages.find((img) => img.id === 'logo');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin');
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Logout Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/admin');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const NavContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center border-b px-4 lg:px-6">
        {logoImage && (
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src={logoImage.imageUrl}
              alt={logoImage.description}
              width={120}
              height={30}
              className="h-6 w-auto"
            />
          </Link>
        )}
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={`/admin/dashboard?tab=${item.href}`}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary',
              activeTab === item.href && 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
            )}
            onClick={() => isSheetOpen && setIsSheetOpen(false)}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-card text-card-foreground lg:block">
        <NavContent />
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <NavContent />
            </SheetContent>
          </Sheet>
           <div className="w-full flex-1">
            {logoImage && (
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src={logoImage.imageUrl}
                  alt={logoImage.description}
                  width={120}
                  height={30}
                />
              </Link>
            )}
           </div>
           <div className="w-8"></div>
        </header>
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </div>
  );
}
