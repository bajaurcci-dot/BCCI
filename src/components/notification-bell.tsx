'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Bell,
    CheckCheck,
    Circle,
    Loader2,
    Calendar,
    FileQuestion
} from 'lucide-react';
import {
    RegistrationIcon,
    MessagesIcon
} from '@/components/admin-icons';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type NotificationType = 'registration' | 'message' | 'service' | 'expiry';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: string;
    reference_id: string | null;
    is_read: boolean;
    created_at: string;
}

const getIcon = (type: string) => {
    switch (type) {
        case 'registration': return <RegistrationIcon className="h-4 w-4" />;
        case 'message': return <MessagesIcon className="h-4 w-4" />;
        case 'service': return <FileQuestion className="h-4 w-4" />;
        case 'expiry': return <Calendar className="h-4 w-4 text-red-500" />;
        default: return <Bell className="h-4 w-4" />;
    }
};

const getRedirectUrl = (type: string, refId: string | null) => {
    switch (type) {
        case 'registration': return '/admin/dashboard?tab=verification';
        case 'message': return '/admin/dashboard?tab=messages';
        case 'service': return '/admin/dashboard?tab=requests';
        case 'expiry': return '/admin/dashboard?tab=users';
        default: return '/admin/dashboard';
    }
};

export default function NotificationBell() {
    const router = useRouter();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const fetchNotifications = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(20);

            if (error) throw error;
            const formattedData = (data || []).map(n => ({
                ...n,
                is_read: !!n.is_read,
                created_at: n.created_at || new Date().toISOString()
            }));
            setNotifications(formattedData);
            setUnreadCount(formattedData.filter(n => !n.is_read).length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();

        const channel = supabase
            .channel('notifications_realtime')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'notifications' },
                () => {
                    fetchNotifications();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchNotifications]);

    const markAsRead = async (id: string) => {
        try {
            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('id', id);

            if (error) throw error;
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
            if (unreadIds.length === 0) return;

            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .in('id', unreadIds);

            if (error) throw error;
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.is_read) {
            markAsRead(notification.id);
        }
        const url = getRedirectUrl(notification.type, notification.reference_id);
        router.push(url);
        setIsOpen(false);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-emerald-600 relative rounded-full">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 h-4 w-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold leading-none animate-in zoom-in p-1">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 md:w-[400px] p-0 rounded-[28px] border-none shadow-2xl overflow-hidden mr-4 mt-2" align="end">
                <div className="p-4 bg-white border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 px-2 flex items-center gap-2">
                        Notifications
                        {unreadCount > 0 && (
                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none font-bold">
                                {unreadCount} New
                            </Badge>
                        )}
                    </h3>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full px-3 h-8 font-semibold"
                        >
                            <CheckCheck className="h-3.5 w-3.5 mr-1" />
                            Mark all read
                        </Button>
                    )}
                </div>

                <div className="h-[450px] overflow-y-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-12 text-gray-400 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                            <p className="text-sm font-medium">Loading notifications...</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-gray-400 text-center gap-4">
                            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center">
                                <Bell className="h-8 w-8 opacity-20" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">No Notifications Yet</p>
                                <p className="text-xs text-gray-400 mt-1 max-w-[200px]">You'll see activity updates here when users register or send messages.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {notifications.map((n) => (
                                <div
                                    key={n.id}
                                    onClick={() => handleNotificationClick(n)}
                                    className={cn(
                                        "p-5 hover:bg-gray-50 transition-colors cursor-pointer group flex gap-4 relative",
                                        !n.is_read && "bg-emerald-50/20"
                                    )}
                                >
                                    {!n.is_read && (
                                        <div className="absolute left-1 top-1/2 -translate-y-1/2">
                                            <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500" />
                                        </div>
                                    )}
                                    <div className={cn(
                                        "flex-shrink-0 h-10 w-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm",
                                        n.is_read ? "bg-gray-100 text-gray-500" : "bg-emerald-100 text-emerald-600"
                                    )}>
                                        {getIcon(n.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={cn(
                                            "text-sm line-clamp-1",
                                            n.is_read ? "text-gray-600 font-medium" : "text-gray-900 font-bold"
                                        )}>
                                            {n.title}
                                        </p>
                                        <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">
                                            {n.message}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[10px] text-gray-400 font-medium">
                                                {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                                            </span>
                                            {!n.is_read && <Badge className="text-[8px] bg-emerald-100 text-emerald-700 border-none px-1.5 py-0 h-3.5 uppercase tracking-wide font-bold">New</Badge>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {notifications.length > 0 && (
                    <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                        <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-emerald-600 rounded-full w-full h-8 font-bold">
                            View All Activity
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
