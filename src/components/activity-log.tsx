'use client';

import { useState, useMemo } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
  {
    admin: 'Editor User',
    action: 'Updated user role for jane.smith@example.com',
    timestamp: '2023-10-26 09:00 AM',
  },
];

export default function ActivityLog() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = useMemo(() => {
    if (!searchTerm) return logs;
    return logs.filter(
      (log) =>
        log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
         <p className="text-sm text-muted-foreground">Review all administrative actions taken in the dashboard.</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex gap-2">
              <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Filter logs by admin or action..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{log.admin}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="text-right">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
