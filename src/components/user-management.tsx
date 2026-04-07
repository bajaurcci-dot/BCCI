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
import { Search, Loader2, MoreHorizontal, Filter, Pencil, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

type Member = {
  id: string;
  full_name: string;
  cnic: string | null;
  ntn: string | null;
  address: string | null;
  business_name: string | null;
  mobile_number: string | null;
  business_type: string | null;
  membership_type: string | null;
  membership_code: string | null;
  membership_expiry: string | null;
  photo_url: string | null;
  status: string | null;
  created_at: string | null;
};

export default function UserManagement() {
  const { toast } = useToast();
  const [users, setUsers] = useState<Member[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Member | null>(null);

  // Form Fields
  const [formData, setFormData] = useState<Partial<Member>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');

      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUsers(data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast({
        title: 'Error',
        description: 'Failed to load members',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.ntn && user.ntn.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [users, searchTerm]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const toggleSelectUser = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, id]);
    } else {
      setSelectedUsers(prev => prev.filter(uid => uid !== id));
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedUsers.length} selected users? This action cannot be undone.`)) return;

    try {
      const { supabase } = await import('@/lib/supabase');
      const { error } = await supabase.from('members').delete().in('id', selectedUsers);

      if (error) throw error;

      toast({ title: 'Members Deleted', description: `${selectedUsers.length} members have been removed.`, variant: 'destructive' });
      setSelectedUsers([]);
      await fetchUsers();
    } catch (error: any) {
      console.error('Bulk delete error:', error);
      toast({ title: 'Error', description: 'Failed to delete users', variant: 'destructive' });
    }
  };

  const handleOpenEdit = (user: Member) => {
    setSelectedUser(user);
    setFormData({ ...user });
    setIsFormOpen(true);
  };

  const handleOpenView = (user: Member) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const handleOpenDelete = (user: Member) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) return;

    try {
      const { supabase } = await import('@/lib/supabase');

      const { error } = await supabase
        .from('members')
        .update({
          full_name: formData.full_name,
          mobile_number: formData.mobile_number,
          cnic: formData.cnic,
          ntn: formData.ntn,
          address: formData.address,
          business_name: formData.business_name,
          business_type: formData.business_type,
          status: formData.status,
          membership_type: formData.membership_type,
          membership_code: formData.membership_code,
          membership_expiry: formData.membership_expiry,
        })
        .eq('id', selectedUser.id);

      if (error) throw error;

      await fetchUsers();
      toast({ title: 'Member Updated', description: 'Member details have been saved.' });
      setIsFormOpen(false);
    } catch (error: any) {
      console.error('Update error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update member',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      const { supabase } = await import('@/lib/supabase');

      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', selectedUser.id);

      if (error) throw error;

      await fetchUsers();
      toast({ title: 'Member Deleted', description: 'Member has been removed.', variant: 'destructive' });
      setIsDeleteOpen(false);
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete member',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
        <CardHeader className="bg-transparent py-8 px-8 border-b border-gray-50/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Member Management</CardTitle>
              <CardDescription className="text-gray-400 font-medium mt-1">Manage all members in the system.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="mb-6 flex gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, NTN..."
                className="pl-12 rounded-full border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {selectedUsers.length > 0 && (
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                className="rounded-full animate-in fade-in slide-in-from-right-5"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected ({selectedUsers.length})
              </Button>
            )}
          </div>

          <div className="rounded-[24px] border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="border-b border-gray-100 hover:bg-transparent">
                  <TableHead className="w-[50px] pl-6 py-4">
                    <Checkbox
                      checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                      onCheckedChange={(checked) => toggleSelectAll(checked as boolean)}
                    />
                  </TableHead>
                  <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Member</TableHead>
                  <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">NTN</TableHead>
                  <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Membership</TableHead>
                  <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Status</TableHead>
                  <TableHead className="pr-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-500" />
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-b border-gray-50 hover:bg-emerald-50/30 transition-colors">
                      <TableCell className="pl-6 py-4">
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={(checked) => toggleSelectUser(user.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                            {user.full_name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{user.full_name}</div>
                            <div className="text-xs text-gray-400">NTN: {user.ntn || 'N/A'}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-sm font-mono text-gray-600">{user.ntn || 'N/A'}</TableCell>
                      <TableCell className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {user.membership_type || 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          variant="secondary"
                          className={cn("rounded-md font-medium",
                            user.status === 'Active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' :
                              user.status === 'Expired' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                                'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                          )}
                        >
                          {user.status || 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-900">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl border-gray-100 shadow-xl p-2 min-w-[150px]">
                            <DropdownMenuLabel className="text-xs text-gray-400 uppercase tracking-widest">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleOpenView(user)} className="rounded-lg cursor-pointer">
                              <Eye className="mr-2 h-3.5 w-3.5" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenEdit(user)} className="rounded-lg cursor-pointer">
                              <Pencil className="mr-2 h-3.5 w-3.5" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenDelete(user)} className="rounded-lg cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50">
                              <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                      No members found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* VIEW DIALOG */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="rounded-[32px] p-8 border-none shadow-2xl sm:max-w-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Member Details</DialogTitle>
            <DialogDescription>Complete profile information for the selected member.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex flex-col items-center p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-3xl font-bold mb-4 overflow-hidden border-4 border-white shadow-sm">
                    {selectedUser.photo_url ? (
                      <img src={selectedUser.photo_url} alt={selectedUser.full_name} className="h-full w-full object-cover" />
                    ) : (
                      selectedUser.full_name.charAt(0)
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedUser.full_name}</h3>
                  <p className="text-sm text-gray-500">{selectedUser.mobile_number}</p>
                  <Badge className="mt-3 bg-emerald-500 hover:bg-emerald-600 text-white border-none px-4 py-1 rounded-full">
                    {selectedUser.membership_code || 'No ID'}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Contact Details</h4>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3 shadow-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Mobile</span>
                      <span className="text-gray-900 font-medium">{selectedUser.mobile_number || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">CNIC</span>
                      <span className="text-gray-900 font-medium">{selectedUser.cnic || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Address</span>
                      <span className="text-gray-900 font-medium text-right max-w-[150px]">{selectedUser.address || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Business Information</h4>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3 shadow-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Company</span>
                      <span className="text-gray-900 font-medium">{selectedUser.business_name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">NTN</span>
                      <span className="text-gray-900 font-medium">{selectedUser.ntn || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Type</span>
                      <span className="text-gray-900 font-medium">{selectedUser.business_type || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Membership Status</h4>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3 shadow-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Level</span>
                      <span className="text-emerald-600 font-bold">{selectedUser.membership_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Status</span>
                      <Badge className={cn("rounded-md", selectedUser.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700')}>
                        {selectedUser.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Expires</span>
                      <span className="text-gray-900 font-medium">{selectedUser.membership_expiry || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="mt-8 border-t pt-6">
            <Button onClick={() => setIsViewOpen(false)} className="rounded-full bg-gray-900 hover:bg-black px-10">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="rounded-[32px] p-8 border-none shadow-2xl sm:max-w-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Edit Member</DialogTitle>
            <DialogDescription>Update the information for this member record.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Personal Info</h4>
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={formData.full_name || ''} onChange={e => setFormData({ ...formData, full_name: e.target.value })} className="rounded-xl border-gray-200" required />
                </div>
                <div className="space-y-3">
                  <Label>Mobile Number</Label>
                  <Input value={formData.mobile_number || ''} onChange={e => setFormData({ ...formData, mobile_number: e.target.value })} className="rounded-xl border-gray-200" type="tel" required />
                </div>
                <div className="space-y-2">
                  <Label>CNIC</Label>
                  <Input value={formData.cnic || ''} onChange={e => setFormData({ ...formData, cnic: e.target.value })} className="rounded-xl border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Mobile</Label>
                  <Input value={formData.mobile_number || ''} onChange={e => setFormData({ ...formData, mobile_number: e.target.value })} className="rounded-xl border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-xl border border-gray-200 bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={formData.address || ''}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Business & Membership</h4>
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input value={formData.business_name || ''} onChange={e => setFormData({ ...formData, business_name: e.target.value })} className="rounded-xl border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <Input value={formData.business_type || ''} onChange={e => setFormData({ ...formData, business_type: e.target.value })} className="rounded-xl border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>NTN</Label>
                  <Input value={formData.ntn || ''} onChange={e => setFormData({ ...formData, ntn: e.target.value })} className="rounded-xl border-gray-200" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <select
                      className="flex h-10 w-full rounded-xl border border-gray-200 bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={formData.status || 'Active'}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Expired</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Class</Label>
                    <select
                      className="flex h-10 w-full rounded-xl border border-gray-200 bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={formData.membership_type || 'Associate'}
                      onChange={e => setFormData({ ...formData, membership_type: e.target.value })}
                    >
                      <option>Corporate</option>
                      <option>Associate</option>
                      <option>Foreign</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input
                    type="date"
                    value={formData.membership_expiry || ''}
                    onChange={e => setFormData({ ...formData, membership_expiry: e.target.value })}
                    className="rounded-xl border-gray-200"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="pt-6 border-t">
              <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)} className="rounded-full">Cancel</Button>
              <Button type="submit" className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-8 transition-transform active:scale-95">Update Member</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Member?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{selectedUser?.full_name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="rounded-full bg-red-600 hover:bg-red-700">Delete Permanently</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
