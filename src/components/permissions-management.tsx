'use client';

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

const roles = [
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
  }
];

const allPermissions = ['all', 'edit_content', 'manage_users', 'view_content', 'manage_settings'];

export default function PermissionsManagement() {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Roles & Permissions</h2>
      <p className="text-muted-foreground mb-6">Define roles and assign granular permissions for admin sub-accounts.</p>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              {allPermissions.map(p => <TableHead key={p} className="capitalize">{p.replace('_', ' ')}</TableHead>)}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.role}>
                <TableCell className="font-medium">{role.role}</TableCell>
                {allPermissions.map(p => (
                   <TableCell key={p}>
                     <Checkbox checked={role.permissions.includes('all') || role.permissions.includes(p)} />
                   </TableCell>
                ))}
                <TableCell>
                  <Button variant="outline" size="sm">Save</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
