'use client';

import AdminLayout from '@/components/admin-layout';
import DashboardOverview from '@/components/dashboard-overview';
import UserManagement from '@/components/user-management';
import VerificationManagement from '@/components/verification-management';
import RegistrationManagement from '@/components/registration-management';
import VacancyManagement from '@/components/vacancy-management';
import PermissionsManagement from '@/components/permissions-management';
import ActivityLog from '@/components/activity-log';
import DownloadsManagement from '@/components/downloads-management';
import MessagesManagement from '@/components/messages-management';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'verification':
        return <VerificationManagement />;
      case 'registration':
        return <RegistrationManagement />;
      case 'vacancies':
        return <VacancyManagement />;
      case 'downloads':
        return <DownloadsManagement />;
      case 'messages':
        return <MessagesManagement />;
      case 'permissions':
        return <PermissionsManagement />;
      case 'activity':
        return <ActivityLog />;
      default:
        return <DashboardOverview />;
    }
  };

  return <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">{renderContent()}</div>;
}

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminDashboardContent />
      </Suspense>
    </AdminLayout>
  );
}
