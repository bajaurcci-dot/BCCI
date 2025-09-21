'use client';

import React, { useState, useMemo } from 'react';
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
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const initialVerifications = [
  {
    name: 'Tech Innovators Inc.',
    ntn: '1122334-5',
    type: 'Corporate',
    date: '2023-10-26',
    status: 'Pending',
    details: {
      address: '123 Tech Park, Silicon Valley',
      contact: 'John Doe',
      phone: '123-456-7890',
    },
  },
  {
    name: 'Global Exports',
    ntn: '5566778-9',
    type: 'Associate',
    date: '2023-10-25',
    status: 'Approved',
    details: {
      address: '456 Trade Tower, Metropolis',
      contact: 'Jane Smith',
      phone: '987-654-3210',
    },
  },
  {
    name: 'Creative Minds',
    ntn: '9988776-5',
    type: 'Corporate',
    date: '2023-10-24',
    status: 'Rejected',
    details: {
      address: '789 Art Plaza, Downtown',
      contact: 'Peter Jones',
      phone: '555-555-5555',
    },
  },
];

type Verification = (typeof initialVerifications)[0];

export default function VerificationManagement() {
  const { toast } = useToast();
  const [verifications, setVerifications] = useState(initialVerifications);
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVerifications = useMemo(() => {
    if (!searchTerm) return verifications;
    return verifications.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ntn.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [verifications, searchTerm]);

  const handleAction = (ntn: string, newStatus: 'Approved' | 'Rejected') => {
    setVerifications(
      verifications.map((item) =>
        item.ntn === ntn ? { ...item, status: newStatus } : item
      )
    );
    toast({
      title: `Request ${newStatus}`,
      description: `The verification request for NTN ${ntn} has been ${newStatus.toLowerCase()}.`,
    });
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
                placeholder="Search by name, NTN..."
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
                  <TableHead>NTN</TableHead>
                  <TableHead>Membership Type</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVerifications.map((item) => (
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
                          <Button variant="default" size="sm" onClick={() => handleAction(item.ntn, 'Approved')} className="bg-green-600 hover:bg-green-700">Approve</Button>
                          <Button variant="destructive" size="sm" onClick={() => handleAction(item.ntn, 'Rejected')}>Reject</Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {selectedVerification && (
             <DialogContent>
                <DialogHeader>
                  <DialogTitle>Verification Details</DialogTitle>
                  <DialogDescription>
                    Review the details for {selectedVerification.name}.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 text-sm">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <span className="text-muted-foreground">Company Name</span>
                        <span className="col-span-2 font-medium">{selectedVerification.name}</span>
                    </div>
                     <div className="grid grid-cols-3 items-center gap-4">
                        <span className="text-muted-foreground">NTN</span>
                        <span className="col-span-2 font-medium">{selectedVerification.ntn}</span>
                    </div>
                     <div className="grid grid-cols-3 items-center gap-4">
                        <span className="text-muted-foreground">Address</span>
                        <span className="col-span-2 font-medium">{selectedVerification.details.address}</span>
                    </div>
                     <div className="grid grid-cols-3 items-center gap-4">
                        <span className="text-muted-foreground">Contact Person</span>
                        <span className="col-span-2 font-medium">{selectedVerification.details.contact}</span>
                    </div>
                     <div className="grid grid-cols-3 items-center gap-4">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="col-span-2 font-medium">{selectedVerification.details.phone}</span>
                    </div>
                </div>
              </DialogContent>
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
}
