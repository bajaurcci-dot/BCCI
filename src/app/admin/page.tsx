'use client';

import AdminLayout from '@/components/admin-layout';
import UserManagement from '@/components/user-management';
import VerificationManagement from '@/components/verification-management';
import RegistrationManagement from '@/components/registration-management';
import VacancyManagement from '@/components/vacancy-management';
import PermissionsManagement from '@/components/permissions-management';
import ActivityLog from '@/components/activity-log';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        </div>
        <Tabs defaultValue="users" className="space-y-4">
          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>
          <TabsContent value="verification" className="space-y-4">
            <VerificationManagement />
          </TabsContent>
          <TabsContent value="registration" className="space-y-4">
            <RegistrationManagement />
          </TabsContent>
          <TabsContent value="vacancies" className="space-y-4">
            <VacancyManagement />
          </TabsContent>
          <TabsContent value="permissions" className="space-y-4">
            <PermissionsManagement />
          </TabsContent>
          <TabsContent value="activity" className="space-y-4">
            <ActivityLog />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
