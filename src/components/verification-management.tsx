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
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const verifications = [
  {
    name: 'Tech Innovators Inc.',
    ntn: '1122334-5',
    type: 'Corporate',
    date: '2023-10-26',
    status: 'Pending',
  },
  {
    name: 'Global Exports',
    ntn: '5566778-9',
    type: 'Associate',
    date: '2023-10-25',
    status: 'Approved',
  },
   {
    name: 'Creative Minds',
    ntn: '9988776-5',
    type: 'Corporate',
    date: '2023-10-24',
    status: 'Rejected',
  },
];

export default function VerificationManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Verification</CardTitle>
        <p className="text-sm text-muted-foreground">Approve or reject member verification requests.</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, NTN..." className="pl-10"/>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>NTN</TableHead>
                <TableHead>Membership Type</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {verifications.map((item) => (
                <TableRow key={item.ntn}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.ntn}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === 'Approved'
                          ? 'default'
                          : item.status === 'Pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="default" size="sm">Approve</Button>
                    <Button variant="destructive" size="sm">Reject</Button>
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
