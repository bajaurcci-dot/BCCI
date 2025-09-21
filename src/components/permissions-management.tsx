'use client';

import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from '@/hooks/use-toast';

const initialRoles = [
  {
    role: 'Admin',
    permissions: ['all'],
  },
  {
    role: 'Editor',
    permissions: ['edit_content', 'manage_users'],
  },
  {
    role: 'Viewer',
    permissions: ['view_content'],
  },
];

const allPermissions = ['all', 'edit_content', 'manage_users', 'view_content', 'manage_settings'];

export default function PermissionsManagement() {
  const { toast } = useToast();
  const [roles, setRoles] = useState(initialRoles);

  const handlePermissionChange = (roleName: string, permission: string, checked: boolean | string) => {
    setRoles(roles.map(r => {
      if (r.role === roleName) {
        let newPermissions = [...r.permissions];
        if (checked) {
          if (!newPermissions.includes(permission)) {
            newPermissions.push(permission);
          }
        } else {
          newPermissions = newPermissions.filter(p => p !== permission);
        }
        return { ...r, permissions: newPermissions };
      }
      return r;
    }));
  };

  const handleSave = (roleName: string) => {
    // Here you would typically send the updated role to your backend.
    console.log(`Saving permissions for ${roleName}:`, roles.find(r => r.role === roleName)?.permissions);
    toast({
      title: 'Permissions Saved',
      description: `Permissions for the ${roleName} role have been updated.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roles & Permissions</CardTitle>
        <p className="text-sm text-muted-foreground">Define roles and assign granular permissions for admin sub-accounts.</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                {allPermissions.map(p => <TableHead key={p} className="capitalize text-center">{p.replace('_', ' ')}</TableHead>)}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.role}>
                  <TableCell className="font-medium">{role.role}</TableCell>
                  {allPermissions.map(p => (
                    <TableCell key={p} className="text-center">
                      <Checkbox
                        checked={role.permissions.includes('all') || role.permissions.includes(p)}
                        disabled={role.permissions.includes('all') && p !== 'all'}
                        onCheckedChange={(checked) => handlePermissionChange(role.role, p, checked)}
                      />
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleSave(role.role)}>Save</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
