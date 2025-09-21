'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Users, UserCheck, UserX, Clock, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { useToast } from '@/hooks/use-toast';
import { differenceInDays, parseISO } from 'date-fns';

type ExpiringUser = {
    id: string;
    full_name: string;
    membership_code: string | null;
    membership_expiry: string;
    cnic: string | null;
    ntn: string | null;
    address: string | null;
    business_name: string | null;
    mobile_number: string | null;
    membership_type: string | null;
};

type Stats = {
    total_members: number;
    active_members: number;
    pending_verifications: number;
    expired_members: number;
};

export default function DashboardOverview() {
  const { toast } = useToast();
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [expiringUsers, setExpiringUsers] = React.useState<ExpiringUser[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<ExpiringUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const statsPromise = supabase.rpc('get_dashboard_stats');
        const expiringUsersPromise = supabase.rpc('get_expiring_members');

        const [statsResult, expiringUsersResult] = await Promise.all([statsPromise, expiringUsersPromise]);

        if (statsResult.error) throw statsResult.error;
        if (expiringUsersResult.error) throw expiringUsersResult.error;

        if (statsResult.data && statsResult.data.length > 0) {
            setStats(statsResult.data[0]);
        }
        setExpiringUsers(expiringUsersResult.data || []);
        
      } catch (error: any) {
        toast({
          title: 'Error fetching dashboard data',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);
  
  const getDaysLeft = (expiryDate: string) => {
    return differenceInDays(parseISO(expiryDate), new Date());
  }

  if (loading) {
    return (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_members || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats?.active_members || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats?.pending_verifications || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Members</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats?.expired_members || 0}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4">
        <Dialog>
          <Card>
            <CardHeader>
              <CardTitle>Membership Expiring Soon</CardTitle>
              <CardDescription>A list of members whose membership is expiring in the next 30 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member Name</TableHead>
                      <TableHead>Membership Code</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Days Left</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expiringUsers.length > 0 ? expiringUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.full_name}</TableCell>
                        <TableCell>{user.membership_code || 'N/A'}</TableCell>
                        <TableCell>{new Date(user.membership_expiry).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{getDaysLeft(user.membership_expiry)} days</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                              View
                            </Button>
                          </DialogTrigger>
                        </TableCell>
                      </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center p-8">
                                No memberships are expiring in the next 30 days.
                            </TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {selectedUser && (
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Member Details</DialogTitle>
                <DialogDescription>
                  Full details for {selectedUser.full_name}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground col-span-1">Full Name</span>
                  <span className="col-span-3 font-semibold">{selectedUser.full_name}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">CNIC</span>
                  <span className="col-span-3 font-semibold">{selectedUser.cnic || 'N/A'}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">NTN</span>
                  <span className="col-span-3 font-semibold">{selectedUser.ntn || 'N/A'}</span>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">Address</span>
                  <span className="col-span-3 font-semibold">{selectedUser.address || 'N/A'}</span>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">Business Name</span>
                  <span className="col-span-3 font-semibold">{selectedUser.business_name || 'N/A'}</span>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">Mobile</span>
                  <span className="col-span-3 font-semibold">{selectedUser.mobile_number || 'N/A'}</span>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">Membership Code</span>
                  <span className="col-span-3 font-semibold">{selectedUser.membership_code || 'N/A'}</span>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">Membership Type</span>
                  <span className="col-span-3 font-semibold">{selectedUser.membership_type || 'N/A'}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">Expiry Date</span>
                  <span className="col-span-3 font-semibold">{new Date(selectedUser.membership_expiry).toLocaleDateString()}</span>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </>
  );
}
