'use client';

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
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

const expiringUsers = [
  {
    name: 'Ahmed Khan',
    membershipId: 'COR-0123',
    expiryDate: '2024-08-15',
    daysLeft: 20,
  },
  {
    name: 'Fatima Ali',
    membershipId: 'ASC-0456',
    expiryDate: '2024-08-25',
    daysLeft: 30,
  },
  {
    name: 'Zainab Corporation',
    membershipId: 'COR-0789',
    expiryDate: '2024-08-05',
    daysLeft: 10,
  },
];

export default function DashboardOverview() {
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
        <Card>
          <CardHeader>
            <CardTitle>Membership Expiring Next Month</CardTitle>
            <CardDescription>
              A list of members whose membership is expiring soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member Name</TableHead>
                    <TableHead>Membership ID</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead className="text-right">Days Left</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiringUsers.map((user) => (
                    <TableRow key={user.membershipId}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.membershipId}</TableCell>
                      <TableCell>{user.expiryDate}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="destructive">{user.daysLeft} days</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
