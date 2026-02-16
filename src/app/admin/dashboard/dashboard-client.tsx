'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
    LogOut,
    Menu,
    Search,
    ChevronDown,
    ShieldCheck,
    FileQuestion
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Import Custom Icons
import {
    DashboardIcon,
    UsersIcon,
    VerificationIcon,
    RegistrationIcon,
    VacancyIcon,
    DownloadsIcon,
    MessagesIcon,
    PermissionsIcon,
    ActivityLogIcon,
    BlogIcon,
    GalleryIcon
} from '@/components/admin-icons';

// Import all functional components
import DashboardOverview from '@/components/dashboard-overview';
import UserManagement from '@/components/user-management';
import VerificationManagement from '@/components/verification-management';
import RegistrationManagement from '@/components/registration-management';
import VacancyManagement from '@/components/vacancy-management';
import DownloadsManagement from '@/components/downloads-management';
import MessagesManagement from '@/components/messages-management';
import PermissionsManagement from '@/components/permissions-management';
import ActivityLog from '@/components/activity-log';
import BlogManagement from '@/components/blog-management';
import ServiceRequestsManagement from '@/components/service-requests-management';
import AboutGalleryManagement from '@/components/about-gallery-management';
import NotificationBell from '@/components/notification-bell';

type Tab = 'dashboard' | 'users' | 'verification' | 'registration' | 'vacancies' | 'downloads' | 'compliances' | 'messages' | 'permissions' | 'activity' | 'blog' | 'requests' | 'gallery';

export default function AdminDashboardClient() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { toast } = useToast();
    const logoImage = PlaceHolderImages.find((img) => img.id === 'logo');

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/admin/login');
            }
        };
        checkAuth();
    }, [router]);

    const searchParams = useSearchParams();
    const queryTab = searchParams.get('tab') as Tab;

    useEffect(() => {
        if (queryTab && navItems.some(item => item.id === queryTab)) {
            setActiveTab(queryTab);
        }
    }, [queryTab]);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
        { id: 'users', label: 'User Management', icon: UsersIcon },
        { id: 'verification', label: 'Member Verification', icon: VerificationIcon },
        { id: 'registration', label: 'Online Registration', icon: RegistrationIcon },
        { id: 'vacancies', label: 'Vacancy Management', icon: VacancyIcon },
        { id: 'downloads', label: 'Downloads Center', icon: DownloadsIcon },
        { id: 'compliances', label: 'Compliances', icon: ShieldCheck },
        { id: 'requests', label: 'Service Requests', icon: FileQuestion },
        { id: 'messages', label: 'Messages', icon: MessagesIcon },
        { id: 'permissions', label: 'Permissions', icon: PermissionsIcon },
        { id: 'activity', label: 'Activity Log', icon: ActivityLogIcon },
        { id: 'blog', label: 'Blog & News', icon: BlogIcon },
        { id: 'gallery', label: 'About Gallery', icon: GalleryIcon },
    ];

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            toast({
                title: "Logged Out",
                description: "You have been securely logged out.",
            });

            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
            toast({
                title: "Error",
                description: "Failed to log out properly.",
                variant: "destructive",
            });
            router.push('/admin/login'); // Force redirect anyway
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardOverview />;
            case 'users': return <UserManagement />;
            case 'verification': return <VerificationManagement />;
            case 'registration': return <RegistrationManagement />;
            case 'vacancies': return <VacancyManagement />;
            case 'downloads': return <DownloadsManagement category="DOWNLOAD" title="Downloads Center" />;
            case 'compliances': return <DownloadsManagement category="COMPLIANCE" title="Compliances & Certificates" />;
            case 'requests': return <ServiceRequestsManagement />;
            case 'messages': return <MessagesManagement />;
            case 'permissions': return <PermissionsManagement />;
            case 'activity': return <ActivityLog />;
            case 'blog': return <BlogManagement />;
            case 'gallery': return <AboutGalleryManagement />;
            default: return <DashboardOverview />;
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F7FE] font-sans flex text-gray-900">

            {/* DESKTOP SIDEBAR */}
            <aside className="hidden lg:flex flex-col w-[290px] bg-white border-r border-gray-100 h-screen sticky top-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="p-8 pb-4 flex items-center justify-center border-b border-gray-50/50">
                    {logoImage ? (
                        <Image
                            src={logoImage.imageUrl}
                            alt="BCCI Logo"
                            width={150}
                            height={50}
                            className="h-12 w-auto object-contain"
                            priority
                        />
                    ) : (
                        <h1 className="text-2xl font-bold text-emerald-900">BCCI Admin</h1>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as Tab)}
                                className={cn(
                                    "w-full flex items-center gap-4 px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200",
                                    isActive
                                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-400")} />
                                {item.label}
                            </button>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-gray-50">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 text-white mb-3 shadow-xl">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Admin Pro</p>
                                <p className="text-[10px] opacity-70">Authenticated</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

                {/* HEADER */}
                <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-20 px-4 lg:px-8 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetContent side="left" className="p-0 w-[280px]">
                                <div className="flex flex-col h-full bg-white">
                                    <div className="p-6 border-b border-gray-100">
                                        <div className="sr-only">
                                            <SheetTitle>Mobile Navigation Menu</SheetTitle>
                                            <SheetDescription>Access admin dashboard sections.</SheetDescription>
                                        </div>
                                        {logoImage && (
                                            <Image src={logoImage.imageUrl} alt="Logo" width={120} height={40} className="h-10 w-auto" />
                                        )}
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-4 space-y-1">
                                        {navItems.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    setActiveTab(item.id as Tab);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                                                    activeTab === item.id ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-50"
                                                )}
                                            >
                                                <item.icon className="h-5 w-5" />
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden text-gray-500">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                        </Sheet>

                        <div className="hidden lg:block">
                            <p className="text-sm text-gray-400">Pages / {navItems.find(n => n.id === activeTab)?.label}</p>
                            <h2 className="text-xl font-bold text-gray-900 mt-0.5">{navItems.find(n => n.id === activeTab)?.label}</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6 bg-white p-2 rounded-full shadow-sm border border-gray-100 lg:border-none lg:bg-transparent lg:shadow-none">
                        <div className="hidden lg:flex items-center bg-[#F4F7FE] rounded-full px-4 py-2.5 w-64">
                            <Search className="h-4 w-4 text-gray-400 mr-2" />
                            <input type="text" placeholder="Search..." className="bg-transparent border-none text-sm focus:outline-none w-full text-gray-700 placeholder-gray-400" />
                        </div>

                        <NotificationBell />

                        <div className="flex items-center gap-3 pl-2 lg:pl-0">
                            <Avatar className="h-9 w-9 lg:h-10 lg:w-10 border-2 border-white shadow-sm cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="bg-emerald-600 text-white">AD</AvatarFallback>
                            </Avatar>
                            <div className="hidden lg:block text-sm">
                                <p className="font-bold text-gray-900 leading-none">Admin User</p>
                                <p className="text-xs text-gray-400 mt-1">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* CONTENT SCROLLABLE AREA */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
                    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
                        {renderContent()}
                    </div>
                </main>

            </div>
        </div>
    );
}
