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
import { Search, Loader2, CheckCircle2, XCircle, Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type Verification = {
  id: string;
  application_id: string;
  company_name: string | null;
  full_name: string;
  ntn: string | null;
  phone: string | null;
  membership_type: string | null;
  photo_url: string | null;
  created_at: string | null;
  status: string | null;
};



export default function VerificationManagement() {
  const { toast } = useToast();
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [membershipCodeInput, setMembershipCodeInput] = useState('');

  const isValidCode = useMemo(() => {
    return /^[^\/]+\/[^\-]+\-\d{3}$/.test(membershipCodeInput);
  }, [membershipCodeInput]);

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');

      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setVerifications((data as Verification[]) || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast({
        title: 'Error',
        description: 'Failed to load verifications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredVerifications = useMemo(() => {
    if (!searchTerm) return verifications;
    return verifications.filter(
      (item) =>
        item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.company_name && item.company_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.application_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [verifications, searchTerm]);

  const handleDelete = async (id: string, displayName: string | null) => {
    if (!confirm(`Are you sure you want to delete the verification request for ${displayName || 'this applicant'}? This action cannot be undone.`)) {
      return;
    }

    try {
      const { supabase } = await import('@/lib/supabase');

      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // After delete, re-fetch from database to confirm removal
      await fetchVerifications();

      toast({
        title: 'Request Deleted',
        description: `Verification request for ${displayName} has been permanently deleted from the database.`,
      });
      if (selectedVerification?.id === id) {
        setSelectedVerification(null);
      }
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete request',
        variant: 'destructive',
      });
    }
  };

  const handleAction = async (id: string, displayName: string | null, newStatus: 'Approved' | 'Rejected', code?: string) => {
    try {
      const { supabase } = await import('@/lib/supabase');
      const verification = verifications.find(v => v.id === id);
      if (!verification) return;

      if (newStatus === 'Approved') {
        const membershipCode = code;
        if (!membershipCode) {
          toast({
            title: 'Error',
            description: 'Membership code is required for approval.',
            variant: 'destructive',
          });
          return;
        }

        // Calculate expiry (1 year from now)
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

        // Create member
        const { error: memberError } = await supabase
          .from('members')
          .insert({
            full_name: verification.full_name,
            ntn: verification.ntn,
            mobile_number: verification.phone,
            business_name: verification.company_name,
            membership_type: verification.membership_type,
            membership_code: membershipCode,
            membership_expiry: expiryDate.toISOString(),
            photo_url: verification.photo_url,
            status: 'Active',
          });

        if (memberError) throw memberError;
      }

      // Update registration status
      const { error } = await supabase
        .from('registrations')
        .update({
          status: newStatus,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      // Re-fetch from database to ensure UI is in sync
      await fetchVerifications();

      toast({
        title: newStatus === 'Approved' ? 'Member Approved!' : 'Application Rejected',
        description: `${displayName || 'Member'} has been ${newStatus.toLowerCase()}.`,
      });
      setSelectedVerification(null);
    } catch (error: any) {
      console.error('Action error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to process action',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
      <CardHeader className="bg-transparent py-8 px-8 border-b border-gray-50/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Member Verification</CardTitle>
            <CardDescription className="text-gray-400 font-medium mt-1">Review and approve new membership applications.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border-emerald-100">
              {verifications.filter(v => v.status === 'Pending').length} Pending
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by company or applicant name..."
              className="pl-12 rounded-full border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-[24px] border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="pl-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Company</TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Applicant</TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Submitted</TableHead>
                <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Status</TableHead>
                <TableHead className="pr-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-32">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-500" />
                  </TableCell>
                </TableRow>
              ) : filteredVerifications.length > 0 ? (
                filteredVerifications.map((item) => (
                  <TableRow key={item.id} className="border-b border-gray-50 hover:bg-emerald-50/30 transition-colors">
                    <TableCell className="pl-6 py-4 font-medium text-gray-900">{item.company_name || item.full_name}
                    </TableCell>
                    <TableCell className="py-4 text-gray-600">{item.full_name}</TableCell>
                    <TableCell className="py-4 text-sm text-gray-500">{item.created_at ? format(new Date(item.created_at), 'dd/MM/yyyy') : 'N/A'}</TableCell>
                    <TableCell className="py-4">
                      <Badge
                        variant="secondary"
                        className={cn("rounded-md font-medium",
                          item.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                            item.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                              'bg-amber-100 text-amber-700'
                        )}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6 py-4 space-x-2">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id, item.company_name || item.full_name)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full h-8 w-8"
                          title="Delete Request"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => {
                              setSelectedVerification(item);
                              setMembershipCodeInput('');
                            }} className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full px-4">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px] rounded-[32px] p-8 border-none shadow-2xl">
                            <DialogHeader>
                              <div className="flex items-center justify-between mb-2">
                                <DialogTitle className="text-2xl font-bold">Verification Request</DialogTitle>
                                <Badge variant="outline" className={cn("px-3 py-1 rounded-full",
                                  item.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                    item.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                      'bg-amber-50 text-amber-700 border-amber-200'
                                )}>
                                  {item.status}
                                </Badge>
                              </div>
                              <DialogDescription className="text-base">
                                Review details for <strong>{item.company_name || item.full_name}</strong>.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-6 py-4">
                              <div className="flex justify-center mb-4">
                                {item.photo_url ? (
                                  <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img src={item.photo_url} alt={item.full_name} className="h-full w-full object-cover" />
                                  </div>
                                ) : (
                                  <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-lg">
                                    <span className="text-gray-400 text-xs">No Photo</span>
                                  </div>
                                )}
                              </div>
                              <div className="p-4 bg-gray-50 rounded-2xl space-y-4">
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                  <span className="text-gray-500 font-medium">Applicant:</span>
                                  <span className="col-span-2 font-semibold text-gray-900">{item.full_name}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                  <span className="text-gray-500 font-medium">NTN:</span>
                                  <span className="col-span-2 text-gray-900">{item.ntn || 'N/A'}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                  <span className="text-gray-500 font-medium">Phone:</span>
                                  <span className="col-span-2 text-gray-900">{item.phone}</span>
                                </div>
                              </div>


                              <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-2 text-sm items-center border-b border-gray-100 pb-2">
                                  <span className="text-gray-500 font-medium">Application ID</span>
                                  <span className="col-span-2 font-mono text-gray-900">{item.application_id}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm items-center border-b border-gray-100 pb-2">
                                  <span className="text-gray-500 font-medium">Membership Type</span>
                                  <span className="col-span-2 text-gray-900">{item.membership_type || 'N/A'}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm items-start">
                                  <span className="text-gray-500 font-medium pt-1">Company</span>
                                  <span className="col-span-2 text-gray-900 leading-relaxed">{item.company_name || 'Not provided'}</span>
                                </div>
                              </div>

                              {item.status !== 'Approved' && (
                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-3">
                                  <h4 className="text-sm font-bold text-emerald-900">Assign Membership Code</h4>
                                  <p className="text-xs text-emerald-700">Enter a valid code (format: */-***) to approve this member.</p>
                                  <div className="space-y-1">
                                    <Input
                                      placeholder="e.g. 5/E-005"
                                      value={membershipCodeInput}
                                      onChange={(e) => setMembershipCodeInput(e.target.value)}
                                      className={cn(
                                        "bg-white border-emerald-200 focus:ring-emerald-500",
                                        membershipCodeInput && !isValidCode && "border-red-300 focus:ring-red-500"
                                      )}
                                    />
                                    {membershipCodeInput && !isValidCode && (
                                      <p className="text-[10px] text-red-500 font-medium">Invalid format. Must be like 5/E-005</p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                              <div className="flex-1 flex justify-start">
                                <Button
                                  variant="ghost"
                                  onClick={() => handleDelete(item.id, item.company_name || item.full_name)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </Button>
                              </div>
                              <div className="flex gap-2 justify-end flex-1">
                                {item.status === 'Pending' && (
                                  <>
                                    <Button
                                      variant="destructive"
                                      onClick={() => handleAction(item.id, item.company_name, 'Rejected')}
                                      className="rounded-full"
                                    >
                                      <XCircle className="w-4 h-4 mr-2" /> Reject
                                    </Button>
                                    <Button
                                      onClick={() => handleAction(item.id, item.company_name, 'Approved', membershipCodeInput)}
                                      disabled={!isValidCode}
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                                    </Button>
                                  </>
                                )}
                                {item.status === 'Approved' && (
                                  <div className="flex gap-2">
                                    <Button
                                      variant="destructive"
                                      onClick={() => handleAction(item.id, item.company_name, 'Rejected')}
                                      className="rounded-full"
                                    >
                                      <XCircle className="w-4 h-4 mr-2" /> Revoke Approval
                                    </Button>
                                    <DialogClose asChild>
                                      <Button type="button" variant="secondary" className="rounded-full">Close</Button>
                                    </DialogClose>
                                  </div>
                                )}
                                {item.status === 'Rejected' && (
                                  <div className="flex gap-2">
                                    <Button
                                      onClick={() => handleAction(item.id, item.company_name, 'Approved', membershipCodeInput)}
                                      disabled={!isValidCode}
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-2" /> Reconsider & Approve
                                    </Button>
                                    <DialogClose asChild>
                                      <Button type="button" variant="secondary" className="rounded-full">Close</Button>
                                    </DialogClose>
                                  </div>
                                )}
                              </div>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-32 text-gray-500">No verification requests found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
