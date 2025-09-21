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
    <div className="bg-card p-6 rounded-lg shadow-md mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Online Registrations</h2>
        <div className="space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Registration
          </Button>
        </div>
      </div>
      <div className="flex items-center mb-4">
         <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search registrations..." className="pl-10"/>
        </div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Membership Type</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.map((item) => (
              <TableRow key={item.email}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
