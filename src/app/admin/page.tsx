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
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="verification">Member Verification</TabsTrigger>
          <TabsTrigger value="registration">Online Registration</TabsTrigger>
          <TabsTrigger value="vacancies">Vacancy Management</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="verification">
          <VerificationManagement />
        </TabsContent>
        <TabsContent value="registration">
          <RegistrationManagement />
        </TabsContent>
        <TabsContent value="vacancies">
          <VacancyManagement />
        </TabsContent>
        <TabsContent value="permissions">
          <PermissionsManagement />
        </TabsContent>
        <TabsContent value="activity">
          <ActivityLog />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
