'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Footer from '@/components/footer';
import DownloadSection, { DownloadItem } from '@/components/download-section';
import PageHeader from '@/components/page-header';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

export default function CompliancesClient() {
    const [items, setItems] = useState<DownloadItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompliances();
    }, []);

    const fetchCompliances = async () => {
        try {
            const { supabase } = await import('@/lib/supabase');
            const { data, error } = await supabase
                .from('compliances')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const mappedItems: DownloadItem[] = (data || []).map((item: any) => ({
                id: item.id,
                title: item.title,
                description: new Date(item.created_at).toLocaleDateString(), // Use date as description
                file_url: item.file_url,
                download_url: item.file_url,
                file_type: 'PDF', // Default to PDF as per requirement
            }));

            setItems(mappedItems);
        } catch (error) {
            console.error('Error fetching compliances:', error);
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
                        title="Compliances & Certificates"
                        description="Access and download important compliance documents and certificates."
                    />
                    <DownloadSection items={items} loading={loading} />
                </main>
                <Footer />
            </div>
        </div>
    );
}
