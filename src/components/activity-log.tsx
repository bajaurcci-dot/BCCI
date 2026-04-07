'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Loader2, Search, History, User, Settings, FileText, Download, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

type Log = {
  id: number;
  created_at: string;
  action: string;
  category: 'User' | 'Content' | 'Security' | 'System';
  details: {
    user_email?: string;
    description?: string;
    ip_address?: string;
  };
};

const DUMMY_LOGS: Log[] = [
  { id: 1, created_at: '2026-01-25T01:14:00Z', action: 'User Login', category: 'Security', details: { user_email: 'info@bajaurchamber.org.pk', description: 'Successful login from new device', ip_address: '192.168.1.10' } },
  { id: 2, created_at: '2026-01-25T00:30:00Z', action: 'Member Approved', category: 'User', details: { user_email: 'info@bajaurchamber.org.pk', description: 'Approved membership for Bajaur Travels' } },
  { id: 3, created_at: '2026-01-24T18:45:00Z', action: 'Download Uploaded', category: 'Content', details: { user_email: 'info@bajaurchamber.org.pk', description: 'Uploaded new Export Guide 2026' } },
  { id: 4, created_at: '2026-01-24T15:20:00Z', action: 'Settings Changed', category: 'System', details: { user_email: 'info@bajaurchamber.org.pk', description: 'Updated global site notification banner' } },
  { id: 5, created_at: '2026-01-24T12:10:00Z', action: 'Failed Login Attempt', category: 'Security', details: { user_email: 'unknown', description: 'Multiple failed attempts prevented', ip_address: '10.0.0.55' } },
  { id: 6, created_at: '2026-01-23T09:00:00Z', action: 'Vacancy Posted', category: 'Content', details: { user_email: 'info@bajaurchamber.org.pk', description: 'Posted new job: Office Assistant' } },
  { id: 7, created_at: '2026-01-22T16:00:00Z', action: 'User Deleted', category: 'User', details: { user_email: 'info@bajaurchamber.org.pk', description: 'Removed inactive user ID #45' } },
];

export default function ActivityLog() {
  const { toast } = useToast();
  const [logs, setLogs] = useState<Log[]>(DUMMY_LOGS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);

  const filteredLogs = useMemo(() => {
    if (!searchTerm) return logs;
    return logs.filter(
      (log) =>
        (log.details?.user_email && log.details.user_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [logs, searchTerm]);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Security': return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case 'User': return <User className="h-4 w-4 text-emerald-500" />;
      case 'Content': return <FileText className="h-4 w-4 text-green-500" />;
      case 'System': return <Settings className="h-4 w-4 text-gray-500" />;
      default: return <History className="h-4 w-4 text-gray-400" />;
    }
  }

  return (
    <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
      <CardHeader className="bg-transparent py-8 px-8 border-b border-gray-50/50">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
            <History className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">System Activity Log</CardTitle>
            <p className="text-sm text-gray-400 mt-1">Audit trail of all actions performed within the dashboard.</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="flex gap-2">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs by email, action..."
                className="pl-12 rounded-full border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="rounded-[24px] border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="pl-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Action</TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">User</TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Details</TableHead>
                <TableHead className="pr-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center p-16">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-500" />
                  </TableCell>
                </TableRow>
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <TableRow key={log.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                    <TableCell className="pl-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0">
                          {getIcon(log.category)}
                        </div>
                        <span className="font-semibold text-gray-900">{log.action}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className="bg-gray-50 text-gray-600 font-mono text-xs border-gray-200">
                        {log.details?.user_email || 'System'}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 text-gray-600 text-sm">{log.details?.description}</TableCell>
                    <TableCell className="text-right pr-8 py-4 text-sm text-gray-500 font-medium">
                      {format(new Date(log.created_at), "MMM d, h:mm a")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center p-8 text-gray-500">
                    No matching logs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
