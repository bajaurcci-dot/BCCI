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
import { Download, PlusCircle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const registrations = [
  {
    name: 'Creative Solutions',
    email: 'contact@creativesolutions.com',
    type: 'Corporate',
    date: '2023-10-24',
  },
  {
    name: 'Local Artisans',
    email: 'support@localartisans.com',
    type: 'Associate',
    date: '2023-10-23',
  },
];

export default function RegistrationManagement() {
  return (
    <Card>
       <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Online Registrations</CardTitle>
            <p className="text-sm text-muted-foreground">Manage new member registrations.</p>
          </div>
          <div className="space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Registration
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search registrations..." className="pl-10"/>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Membership Type</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((item) => (
                <TableRow key={item.email}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
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
