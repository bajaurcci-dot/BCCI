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
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
                      <Checkbox checked={role.permissions.includes('all') || role.permissions.includes(p)} />
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Save</Button>
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
