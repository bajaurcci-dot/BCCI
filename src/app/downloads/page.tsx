import type { Metadata } from 'next';
import DownloadsClient from './downloads-client';

export const metadata: Metadata = {
    title: 'Downloads | Bajaur Chamber of Commerce & Industry',
    description: 'Download official forms, membership documents, trade regulations, and important Chamber announcements from the BCCI downloads portal.',
    alternates: {
        canonical: 'https://www.bajaurchamber.org.pk/downloads',
    },
};

export default function DownloadsPage() {
    return <DownloadsClient />;
}
