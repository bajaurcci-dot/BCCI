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
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase-client';
import { Loader2 } from 'lucide-react';

type Permission = { id: number; name: string };
type Role = { id: number; name: string; permissions: string[] };

export default function PermissionsManagement() {
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>([]);
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch all permissions
      const { data: permissionsData, error: permissionsError } = await supabase
        .from('permissions')
        .select('id, name');

      if (permissionsError) {
        toast({ title: 'Error fetching permissions', description: permissionsError.message, variant: 'destructive' });
        setLoading(false);
        return;
      }
      setAllPermissions(permissionsData || []);

      // Fetch all roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('roles')
        .select('id, name');
        
      if (rolesError) {
        toast({ title: 'Error fetching roles', description: rolesError.message, variant: 'destructive' });
        setLoading(false);
        return;
      }

      // Fetch role_permissions and map them
      const { data: rolePermissionsData, error: rolePermissionsError } = await supabase
        .from('role_permissions')
        .select('role_id, permission_id');

      if (rolePermissionsError) {
        toast({ title: 'Error fetching role permissions', description: rolePermissionsError.message, variant: 'destructive'});
        setLoading(false);
        return;
      }
      
      const mappedRoles = (rolesData || []).map(role => {
        const rolePermIds = (rolePermissionsData || [])
          .filter(rp => rp.role_id === role.id)
          .map(rp => rp.permission_id);
        
        const rolePermNames = (permissionsData || [])
          .filter(p => rolePermIds.includes(p.id))
          .map(p => p.name);

        return { ...role, permissions: rolePermNames };
      });
      
      setRoles(mappedRoles);
      setLoading(false);
    };

    fetchData();
  }, [toast]);

  const handlePermissionChange = (roleName: string, permission: string, checked: boolean | string) => {
    setRoles(roles.map(r => {
      if (r.name === roleName) {
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
    // This is a client-side placeholder. A real implementation would require a secure backend/RPC function.
    // For now, it just shows a success message.
    console.log(`Saving permissions for ${roleName}:`, roles.find(r => r.name === roleName)?.permissions);
    toast({
      title: 'Permissions Saved (Client-Side)',
      description: `Permissions for the ${roleName} role have been updated in the local state. A backend function is needed to persist this.`,
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Roles & Permissions</CardTitle>
          <p className="text-sm text-muted-foreground">Define roles and assign granular permissions for admin sub-accounts.</p>
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
        <p className="text-sm text-muted-foreground">Define roles and assign granular permissions for admin sub-accounts.</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                {allPermissions.map(p => <TableHead key={p.id} className="capitalize text-center">{p.name.replace(/_/g, ' ').replace(/:/g, ' - ')}</TableHead>)}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.name}>
                  <TableCell className="font-medium capitalize">{role.name}</TableCell>
                  {allPermissions.map(p => (
                    <TableCell key={p.id} className="text-center">
                      <Checkbox
                        checked={role.permissions.includes('all') || role.permissions.includes(p.name)}
                        disabled={(role.permissions.includes('all') && p.name !== 'all') || role.name === 'admin'}
                        onCheckedChange={(checked) => handlePermissionChange(role.name, p.name, checked)}
                      />
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleSave(role.name)} disabled={role.name === 'admin'}>Save</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">* The 'admin' role has all permissions by default and cannot be changed.</p>
      </CardContent>
    </Card>
  );
}
