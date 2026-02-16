'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, ShieldCheck, Lock, UserCog } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Permission = { id: number; name: string; module: string };
type Role = { id: number; name: string; description: string };
type RolePermission = { role_id: number; permission_id: number };

const DUMMY_ROLES: Role[] = [
  { id: 1, name: 'Super Admin', description: 'Full access to all system modules' },
  { id: 2, name: 'Content Moderator', description: 'Can manage news, downloads, and events' },
  { id: 3, name: 'Membership Clerk', description: 'Can process applications and view member data' },
  { id: 4, name: 'Viewer', description: 'Read-only access to basic records' },
];

const DUMMY_PERMISSIONS: Permission[] = [
  { id: 1, name: 'view_dashboard', module: 'Dashboard' },
  { id: 2, name: 'manage_users', module: 'Users' },
  { id: 3, name: 'verify_members', module: 'Verification' },
  { id: 4, name: 'manage_vacancies', module: 'Vacancies' },
  { id: 5, name: 'manage_downloads', module: 'Downloads' },
  { id: 6, name: 'manage_settings', module: 'Settings' },
];

// Initial mock mapping
const INITIAL_ROLE_PERMISSIONS: RolePermission[] = [
  // Admin has everything
  { role_id: 1, permission_id: 1 }, { role_id: 1, permission_id: 2 }, { role_id: 1, permission_id: 3 }, { role_id: 1, permission_id: 4 }, { role_id: 1, permission_id: 5 }, { role_id: 1, permission_id: 6 },
  // Moderator
  { role_id: 2, permission_id: 1 }, { role_id: 2, permission_id: 4 }, { role_id: 2, permission_id: 5 },
  // Clerk
  { role_id: 3, permission_id: 1 }, { role_id: 3, permission_id: 2 }, { role_id: 3, permission_id: 3 },
  // Viewer
  { role_id: 4, permission_id: 1 },
];

export default function PermissionsManagement() {
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>(DUMMY_ROLES);
  const [allPermissions, setAllPermissions] = useState<Permission[]>(DUMMY_PERMISSIONS);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>(INITIAL_ROLE_PERMISSIONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handlePermissionChange = (roleId: number, permissionId: number, checked: boolean | string) => {
    if (checked) {
      setRolePermissions([...rolePermissions, { role_id: roleId, permission_id: permissionId }]);
    } else {
      setRolePermissions(rolePermissions.filter(rp => !(rp.role_id === roleId && rp.permission_id === permissionId)));
    }
  };

  const handleSave = async (roleId: number) => {
    // Determine visuals based on role
    // In a real app this saves to DB
    setTimeout(() => {
      toast({ title: 'Permissions Updated', description: `Role configuration has been saved successfully.` });
    }, 500);
  };

  return (
    <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
      <CardHeader className="bg-transparent py-8 px-8 border-b border-gray-50/50">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Roles & Permissions</CardTitle>
            <CardDescription className="text-gray-400 font-medium mt-1">Configure access control for your team.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="rounded-[24px] border border-gray-100 overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="w-[200px] pl-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Role Name</TableHead>
                {allPermissions.map(p => (
                  <TableHead key={p.id} className="text-center py-4 text-xs font-bold uppercase tracking-wider text-gray-400 min-w-[100px]">
                    <div className="flex flex-col items-center gap-1">
                      {/* Icons based on permission name just for flare */}
                      {p.name.includes('verify') ? <Shield className="h-3 w-3 mb-1 op-50" /> : <Lock className="h-3 w-3 mb-1 op-50" />}
                      {p.module}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="pr-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id} className="border-b border-gray-50 hover:bg-emerald-50/30 transition-colors">
                  <TableCell className="pl-8 py-6 font-medium">
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-bold text-sm">{role.name}</span>
                      <span className="text-xs text-gray-400 font-normal mt-0.5">{role.description}</span>
                    </div>
                  </TableCell>
                  {allPermissions.map(p => {
                    const isChecked = rolePermissions.some(rp => rp.role_id === role.id && rp.permission_id === p.id);
                    const isAdmin = role.id === 1; // Super Admin is locked

                    return (
                      <TableCell key={p.id} className="text-center py-6">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={isChecked}
                            disabled={isAdmin}
                            onCheckedChange={(checked) => handlePermissionChange(role.id, p.id, checked)}
                            className={cn(
                              "h-5 w-5 rounded-md border-2 transition-all data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600",
                              isAdmin ? "opacity-50 cursor-not-allowed data-[state=checked]:bg-gray-400 data-[state=checked]:border-gray-400" : "border-gray-200"
                            )}
                          />
                        </div>
                      </TableCell>
                    )
                  })}
                  <TableCell className="text-right pr-8 py-6">
                    <Button
                      variant={role.id === 1 ? 'ghost' : 'outline'}
                      size="sm"
                      onClick={() => handleSave(role.id)}
                      disabled={role.id === 1 || loading}
                      className={cn("rounded-full px-4 border-gray-200", role.id !== 1 && "hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700")}
                    >
                      {role.id === 1 ? 'Locked' : 'Save Changes'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-emerald-700">
          <UserCog className="h-5 w-5 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold mb-1">Permission Tips</p>
            <p className="opacity-80">Granting <strong>manage_settings</strong> allows a user to modify global site configuration. Use with caution. Super Admin permissions are immutable for security reasons.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
