'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const logs = [
  {
    admin: 'Admin User',
    action: 'Approved verification for Tech Innovators Inc.',
    timestamp: '2023-10-26 10:00 AM',
  },
  {
    admin: 'Admin User',
    action: 'Added new vacancy: Project Manager',
    timestamp: '2023-10-26 09:30 AM',
  },
];

export default function ActivityLog() {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Activity Log</h2>
      <div className="flex items-center mb-4">
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Filter logs by admin or action..." className="pl-10"/>
        </div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Admin</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.admin}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
