'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase-client';

type Verification = {
  id: number;
  company_name: string;
  ntn: string | null;
  created_at: string;
  status: string | null;
  details: {
    address: string;
    contact: string;
    phone: string;
    fullName: string;
    email: string;
    membershipType: string;
  } | null;
};

export default function VerificationManagement() {
  const { toast } = useToast();
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerifications = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('verification_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: 'Error fetching requests',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setVerifications(data);
      }
      setLoading(false);
    };

    fetchVerifications();
  }, [toast]);

  const filteredVerifications = useMemo(() => {
    if (!searchTerm) return verifications;
    return verifications.filter(
      (item) =>
        item.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.details?.fullName && item.details.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [verifications, searchTerm]);

  const handleAction = async (id: number, company_name: string | null, newStatus: 'Approved' | 'Rejected') => {
    const { error } = await supabase
      .from('verification_requests')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
       toast({
        title: 'Error updating status',
        description: error.message,
        variant: 'destructive',
      });
    } else {
       setVerifications(
        verifications.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
      toast({
        title: `Request ${newStatus}`,
        description: `The verification request for ${company_name} has been ${newStatus.toLowerCase()}.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Verification</CardTitle>
        <p className="text-sm text-muted-foreground">Approve or reject member verification requests.</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by company or applicant name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Dialog>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Loading requests...</TableCell>
                  </TableRow>
                ) : filteredVerifications.length > 0 ? (
                  filteredVerifications.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.company_name}</TableCell>
                    <TableCell>{item.details?.fullName || 'N/A'}</TableCell>
                    <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === 'Approved'
                            ? 'default'
                            : item.status === 'Pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className={item.status === 'Approved' ? 'bg-green-500' : ''}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedVerification(item)}>View</Button>
                      </DialogTrigger>
                      {item.status === 'Pending' && (
                        <>
                          <Button variant="default" size="sm" onClick={() => handleAction(item.id, item.company_name, 'Approved')} className="bg-green-600 hover:bg-green-700">Approve</Button>
                          <Button variant="destructive" size="sm" onClick={() => handleAction(item.id, item.company_name, 'Rejected')}>Reject</Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
                ) : (
                   <TableRow>
                    <TableCell colSpan={5} className="text-center">No verification requests found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {selectedVerification && (
             <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registration Details</DialogTitle>
                  <DialogDescription>
                    Review the details for {selectedVerification.company_name}.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 text-sm">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <span className="text-muted-foreground">Company Name</span>
                        <span className="col-span-2 font-medium">{selectedVerification.company_name}</span>
                    </div>
                     <div className="grid grid-cols-3 items-center gap-4">
                        <span className="text-muted-foreground">Applicant Name</span>
                        <span className="col-span-2 font-medium">{selectedVerification.details?.fullName}</span>
                    </div>
                     <div className="grid grid-cols-3 items-center gap-4">
                        <span className="text-muted-foreground">Email</span>
                        <span className="col-span-2 font-medium">{selectedVerification.details?.email}</span>
                    </div>
                     <div className="grid grid-cols-3 items-center gap-4">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="col-span-2 font-medium">{selectedVerification.details?.phone}</span>
                    </div>
                     <div className="grid grid-cols-3 items-center gap-4">
                        <span className="text-muted-foreground">Membership Type</span>
                        <span className="col-span-2 font-medium">{selectedVerification.details?.membershipType}</span>
                    </div>
                </div>
                <DialogFooter>
                 <DialogClose asChild>
                    <Button type="button" variant="secondary">Close</Button>
                 </DialogClose>
                </DialogFooter>
              </DialogContent>
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
}
