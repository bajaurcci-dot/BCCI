'use client';

import { useState, useEffect } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Search, MoreHorizontal, Megaphone, Trash2, Edit2, Briefcase, FileText, Phone, Mail, Calendar, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

type Vacancy = {
  id: string;
  title: string | null;
  department: string | null;
  location: string | null;
  type: string | null;
  status: string | null;
  applicants_count: number | null;
  posted_date: string | null;
  deadline: string | null;
  description: string | null;
  requirements: string | null;
};

type Applicant = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  resume_url: string | null;
  created_at: string | null;
};

export default function VacancyManagement() {
  const { toast } = useToast();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Applicants View State
  const [isApplicantsDialogOpen, setIsApplicantsDialogOpen] = useState(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    status: 'Active',
    description: '',
    requirements: '',
    deadline: ''
  });

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('vacancies')
        .select('*')
        .order('posted_date', { ascending: false });

      if (error) throw error;
      setVacancies(data || []);
    } catch (error: any) {
      console.error('Error fetching vacancies:', error);
      toast({ title: 'Error', description: 'Failed to load vacancies.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (vacancy?: Vacancy) => {
    if (vacancy) {
      setSelectedVacancy(vacancy);
      setFormData({
        title: vacancy.title,
        department: vacancy.department || '',
        location: vacancy.location || '',
        type: vacancy.type || 'Full-time',
        status: vacancy.status || 'Active',
        description: (vacancy as any).description || '',
        requirements: (vacancy as any).requirements || '',
        deadline: (vacancy as any).deadline ? new Date((vacancy as any).deadline).toISOString().split('T')[0] : ''
      });
    } else {
      setSelectedVacancy(null);
      setFormData({
        title: '',
        department: '',
        location: 'Khar HQ',
        type: 'Full-time',
        status: 'Active',
        description: '',
        requirements: '',
        deadline: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveVacancy = async () => {
    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');

      const payload = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        type: formData.type,
        status: formData.status,
        description: formData.description,
        requirements: formData.requirements,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null
      };

      let error;

      if (selectedVacancy) {
        // Update
        const { error: updateError } = await supabase
          .from('vacancies')
          .update(payload)
          .eq('id', selectedVacancy.id);
        error = updateError;
      } else {
        // Create
        const { error: insertError } = await supabase
          .from('vacancies')
          .insert([{ ...payload, applicants_count: 0, posted_date: new Date().toISOString() }]);
        error = insertError;
      }

      if (error) throw error;

      toast({ title: 'Success', description: `Vacancy ${selectedVacancy ? 'updated' : 'posted'} successfully.` });
      setIsDialogOpen(false);
      fetchVacancies();
    } catch (error: any) {
      console.error('Error saving vacancy:', error);
      toast({ title: 'Error', description: 'Failed to save vacancy.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplicants = async (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setIsApplicantsDialogOpen(true);
    setLoadingApplicants(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('vacancy_id', vacancy.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplicants(data || []);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      toast({ title: 'Error', description: 'Failed to load applicants.', variant: 'destructive' });
      setApplicants([]);
    } finally {
      setLoadingApplicants(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vacancy?')) return;
    try {
      const { supabase } = await import('@/lib/supabase');
      const { error } = await supabase.from('vacancies').delete().eq('id', id);
      if (error) throw error;

      setVacancies(vacancies.filter(v => v.id !== id));
      toast({ title: 'Vacancy Removed', description: 'Job post deleted successfully.' });
    } catch (error: any) {
      console.error('Error deleting vacancy:', error);
      toast({ title: 'Error', description: 'Failed to delete vacancy.', variant: 'destructive' });
    }
  };

  const filteredVacancies = vacancies.filter(v =>
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeVacancies = vacancies.filter(v => v.status === 'Active');

  return (
    <div className="space-y-6">
      {/* TICKER SECTION */}
      <div className="w-full bg-emerald-900 rounded-2xl p-3 flex items-center shadow-lg overflow-hidden relative">
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-800 rounded-lg absolute left-3 z-10 shadow-sm">
          <Megaphone className="h-4 w-4 text-yellow-400 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Latest Jobs</span>
        </div>
        <div className="flex-1 overflow-hidden ml-32">
          <div className="animate-ticker whitespace-nowrap inline-block text-white text-sm font-medium">
            {activeVacancies.length > 0 ? activeVacancies.map((v, i) => (
              <span key={v.id} className="mx-6 inline-flex items-center">
                • {v.title} ({v.department}) - Apply Now
              </span>
            )) : (
              <span className="mx-6">No active vacancies at the moment.</span>
            )}
          </div>
        </div>
        <style jsx>{`
                @keyframes ticker {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-ticker {
                    animation: ticker 20s linear infinite;
                }
                .animate-ticker:hover {
                    animation-play-state: paused;
                }
            `}</style>
      </div>

      <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
        <CardHeader className="bg-transparent py-8 px-8 border-b border-gray-50/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Vacancy Management</CardTitle>
              <CardDescription className="text-gray-400 font-medium mt-1">Recruiting & HR.</CardDescription>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200">
                  <Plus className="mr-2 h-4 w-4" /> Post New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-[24px] p-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{selectedVacancy ? 'Edit Vacancy' : 'Post New Vacancy'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-bold text-gray-500">Job Title</label>
                      <Input placeholder="e.g. Senior Accountant" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="rounded-xl" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-bold text-gray-500">Department</label>
                      <Input placeholder="e.g. Finance" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="rounded-xl" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-bold text-gray-500">Type</label>
                      <select
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      >
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-bold text-gray-500">Status</label>
                      <select
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option>Active</option>
                        <option>Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-bold text-gray-500">Location</label>
                      <Input placeholder="e.g. Khar HQ" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="rounded-xl" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-bold text-gray-500">Deadline</label>
                      <Input type="date" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} className="rounded-xl" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-gray-500">Description</label>
                    <textarea
                      className="flex min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Job roles and responsibilities..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-gray-500">Requirements</label>
                    <textarea
                      className="flex min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Key skills and qualifications..."
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    />
                  </div>

                </div>
                <DialogFooter className="mt-4">
                  <Button onClick={handleSaveVacancy} disabled={loading || !formData.title} className="rounded-full bg-emerald-600 hover:bg-emerald-700 w-full">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : (selectedVacancy ? 'Update Job' : 'Publish Job')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="mb-6 flex gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
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
                  <TableHead className="pl-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Job Title</TableHead>
                  <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Department</TableHead>
                  <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Applicants</TableHead>
                  <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Status</TableHead>
                  <TableHead className="pr-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVacancies.length > 0 ? (
                  filteredVacancies.map((vacancy) => (
                    <TableRow key={vacancy.id} className="border-b border-gray-50 hover:bg-emerald-50/30 transition-colors">
                      <TableCell className="pl-8 py-4 font-semibold text-gray-900">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <Briefcase className="h-4 w-4" />
                          </div>
                          <div>
                            <div>{vacancy.title}</div>
                            <div className="text-xs text-gray-400 font-medium mt-0.5">{vacancy.type} • {vacancy.location}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-gray-600">{vacancy.department}</TableCell>
                      <TableCell className="py-4">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                          {vacancy.applicants_count || 0} Candidates
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge className={vacancy.status === 'Active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-100'}>
                          {vacancy.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-900">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl border-gray-100 shadow-xl p-2">
                            <DropdownMenuItem className="rounded-lg cursor-pointer font-medium" onClick={() => handleViewApplicants(vacancy)}>
                              <Users className="mr-2 h-4 w-4 text-blue-500" /> View Applicants
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => handleOpenDialog(vacancy)}>
                              <Edit2 className="mr-2 h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50" onClick={() => handleDelete(vacancy.id)}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center p-8 text-gray-500">No vacancies found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>


      {/* APPLICANTS DIALOG */}
      <Dialog open={isApplicantsDialogOpen} onOpenChange={setIsApplicantsDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[85vh] overflow-y-auto rounded-[24px] p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-emerald-600" />
              Applicants for <span className="text-emerald-600 underline">{selectedVacancy?.title}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6">
            {loadingApplicants ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              </div>
            ) : applicants.length > 0 ? (
              <div className="rounded-2xl border border-gray-100 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow>
                      <TableHead className="font-bold text-gray-500">Candidate Name</TableHead>
                      <TableHead className="font-bold text-gray-500">Contact</TableHead>
                      <TableHead className="font-bold text-gray-500">Applied Date</TableHead>
                      <TableHead className="text-right font-bold text-gray-500">Resume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicants.map((applicant) => (
                      <TableRow key={applicant.id} className="hover:bg-emerald-50/30">
                        <TableCell className="font-semibold text-gray-900">
                          {applicant.full_name}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm text-gray-600">
                            <span className="flex items-center gap-2"><Mail className="h-3 w-3 text-gray-400" /> {applicant.email}</span>
                            <span className="flex items-center gap-2"><Phone className="h-3 w-3 text-gray-400" /> {applicant.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-500 text-sm">
                          <span className="flex items-center gap-2"><Calendar className="h-3 w-3 text-gray-400" /> {applicant.created_at ? new Date(applicant.created_at).toLocaleDateString() : 'N/A'}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          {applicant.resume_url ? (
                            <Button size="sm" variant="outline" className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-50" asChild>
                              <a href={applicant.resume_url} target="_blank" rel="noopener noreferrer">
                                <FileText className="h-4 w-4 mr-2" /> View Resume
                              </a>
                            </Button>
                          ) : (
                            <span className="text-xs text-gray-400 italic">No Resume</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900">No Applicants Yet</h3>
                <p className="text-gray-500">Candidates will appear here once they apply.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div >
  );
}
