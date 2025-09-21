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
import { Loader2, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { supabase } from '@/lib/supabase-client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type Log = {
  id: number;
  created_at: string;
  action: string;
  details: {
    user_email?: string;
    description?: string;
  };
};

export default function ActivityLog() {
  const { toast } = useToast();
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        toast({ title: 'Error fetching activity logs', description: error.message, variant: 'destructive'});
      } else {
        setLogs(data as Log[]);
      }
      setLoading(false);
    };
    fetchLogs();
  }, [toast]);

  const filteredLogs = useMemo(() => {
    if (!searchTerm) return logs;
    return logs.filter(
      (log) =>
        (log.details?.user_email && log.details.user_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [logs, searchTerm]);

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
                    placeholder="Filter logs by admin email or action..." 
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
              {loading ? (
                 <TableRow>
                    <TableCell colSpan={3} className="text-center p-16">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.details?.user_email || 'System'}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell className="text-right">{format(new Date(log.created_at), "PPP p")}</TableCell>
                  </TableRow>
                ))
              ) : (
                 <TableRow>
                    <TableCell colSpan={3} className="text-center p-8">
                      No activity logs found.
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
