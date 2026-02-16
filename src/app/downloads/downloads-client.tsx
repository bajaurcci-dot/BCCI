'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Footer from '@/components/footer';
import DownloadSection, { DownloadItem } from '@/components/download-section';
import PageHeader from '@/components/page-header';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

export default function DownloadsClient() {
    const [downloads, setDownloads] = useState<DownloadItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDownloads();
    }, []);

    const fetchDownloads = async () => {
        try {
            const { supabase } = await import('@/lib/supabase');
            const { data, error } = await supabase
                .from('downloads')
                .select('*')
                .eq('is_published', true)
                .or('category.eq.DOWNLOAD,category.is.null') // Fetch DOWNLOAD or null category
                .order('updated_at', { ascending: false });

            if (error) throw error;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setDownloads((data as any[]) || []);
        } catch (error) {
            console.error('Error fetching downloads:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full min-h-screen bg-gray-50">
            <div className="relative z-10 flex flex-col min-h-screen">
                <TopNavBar />
                <main className="flex-grow">
                    <PageHeader
                        title="Downloads"
                        description="Access and download important documents, lists, and forms."
                    />
                    <DownloadSection items={downloads} loading={loading} />
                </main>
                <Footer />
            </div>
        </div>
    );
}
