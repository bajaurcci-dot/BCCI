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
import { Loader2 } from 'lucide-react';

type Permission = { id: number; name: string };
type Role = { id: number; name: string; };
type RolePermission = { role_id: number; permission_id: number };

export default function PermissionsManagement() {
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>([]);
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setLoading(true);
    // Supabase logic removed
    setRoles([]);
    setAllPermissions([]);
    setRolePermissions([]);
    setLoading(false);
  }

  const handlePermissionChange = (roleId: number, permissionId: number, checked: boolean | string) => {
    if (checked) {
      setRolePermissions([...rolePermissions, { role_id: roleId, permission_id: permissionId }]);
    } else {
      setRolePermissions(rolePermissions.filter(rp => !(rp.role_id === roleId && rp.permission_id === permissionId)));
    }
  };

  const handleSave = async (roleId: number) => {
    setLoading(true);
    // Supabase logic removed
    toast({ title: 'Permissions Saved', description: `Permissions have been updated.` });
    setLoading(false);
  };

  if (loading && roles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Roles & Permissions</CardTitle>
          <CardDescription>Define roles and assign granular permissions for admin sub-accounts.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-16">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roles & Permissions</CardTitle>
        <CardDescription>Define roles and assign granular permissions for admin sub-accounts.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                {allPermissions.map(p => (
                    <TableHead key={p.id} className="capitalize text-center">
                        {p.name.replace(/_/g, ' ').replace(/:/g, ' - ')}
                    </TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.length > 0 ? roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium capitalize">{role.name}</TableCell>
                  {allPermissions.map(p => (
                    <TableCell key={p.id} className="text-center">
                      <Checkbox
                        checked={rolePermissions.some(rp => rp.role_id === role.id && rp.permission_id === p.id)}
                        disabled={role.name === 'admin' || loading}
                        onCheckedChange={(checked) => handlePermissionChange(role.id, p.id, checked)}
                      />
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleSave(role.id)} 
                        disabled={role.name === 'admin' || loading}
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin"/> : 'Save'}
                    </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={allPermissions.length + 2} className="h-24 text-center">
                    No roles or permissions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">* The 'admin' role has all permissions by default and cannot be changed.</p>
      </CardContent>
    </Card>
  );
}
