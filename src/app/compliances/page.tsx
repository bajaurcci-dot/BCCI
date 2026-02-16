import type { Metadata } from 'next';
import CompliancesClient from './compliances-client';

export const metadata: Metadata = {
  title: 'Compliances & Certificates | Bajaur Chamber of Commerce & Industry',
  description: 'View and download official compliance documents, certificates, and regulatory filings of the Bajaur Chamber of Commerce & Industry (BCCI).',
  alternates: {
    canonical: 'https://www.bajaurchamber.org.pk/compliances',
  },
};

export default function CompliancesPage() {
  return <CompliancesClient />;
}
