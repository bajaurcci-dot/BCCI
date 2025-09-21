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
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

const expiringUsers = [
  {
    name: 'Ahmed Khan',
    membershipId: 'COR-0123',
    expiryDate: '2024-08-15',
    daysLeft: 20,
    cnic: '12345-1234567-1',
    ntn: '1234567-8',
    address: '123, Main Street, City',
    businessName: 'Khan Trading Co.',
    mobileNumber: '+92 300 1234567',
    membershipType: 'Corporate',
  },
  {
    name: 'Fatima Ali',
    membershipId: 'ASC-0456',
    expiryDate: '2024-08-25',
    daysLeft: 30,
    cnic: '54321-7654321-2',
    ntn: '8765432-1',
    address: '456, Park Avenue, Town',
    businessName: 'Ali Enterprises',
    mobileNumber: '+92 311 9876543',
    membershipType: 'Associate',
  },
  {
    name: 'Zainab Corporation',
    membershipId: 'COR-0789',
    expiryDate: '2024-08-05',
    daysLeft: 10,
    cnic: 'N/A',
    ntn: '9876543-2',
    address: '789, Industrial Area, Metropolis',
    businessName: 'Zainab Corporation',
    mobileNumber: '+92 333 1122334',
    membershipType: 'Corporate',
  },
];

type User = (typeof expiringUsers)[0];

export default function DashboardOverview() {
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">1,100</div>
            <p className="text-xs text-muted-foreground">+180 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">32</div>
            <p className="text-xs text-muted-foreground">5 new requests today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Members</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">122</div>
            <p className="text-xs text-muted-foreground">Check renewal status</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4">
        <Dialog>
          <Card>
            <CardHeader>
              <CardTitle>Membership Expiring Next Month</CardTitle>
              <CardDescription>A list of members whose membership is expiring soon.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member Name</TableHead>
                      <TableHead>Membership ID</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Days Left</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expiringUsers.map((user) => (
                      <TableRow key={user.membershipId}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.membershipId}</TableCell>
                        <TableCell>{user.expiryDate}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{user.daysLeft} days</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                              View
                            </Button>
                          </DialogTrigger>
                        </TableCell>
                      </TableRow>
                    ))}
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
                  Full details for {selectedUser.name}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground col-span-1">Full Name</span>
                  <span className="col-span-3 font-semibold">{selectedUser.name}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">CNIC</span>
                  <span className="col-span-3 font-semibold">{selectedUser.cnic}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">NTN</span>
                  <span className="col-span-3 font-semibold">{selectedUser.ntn}</span>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">Address</span>
                  <span className="col-span-3 font-semibold">{selectedUser.address}</span>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">Business Name</span>
                  <span className="col-span-3 font-semibold">{selectedUser.businessName}</span>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">Mobile</span>
                  <span className="col-span-3 font-semibold">{selectedUser.mobileNumber}</span>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">Membership ID</span>
                  <span className="col-span-3 font-semibold">{selectedUser.membershipId}</span>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">Membership Type</span>
                  <span className="col-span-3 font-semibold">{selectedUser.membershipType}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right text-sm text-muted-foreground">Expiry Date</span>
                  <span className="col-span-3 font-semibold">{selectedUser.expiryDate}</span>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </>
  );
}
