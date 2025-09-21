'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase-client';

export type Vacancy = {
  id: number;
  title: string;
  status: 'Open' | 'Closed';
  created_at: string;
};

type Applicant = {
  id: number;
  name: string;
  email: string;
  vacancy_id: number;
};

type ApplicantCounts = {
  [key: number]: number;
};

export default function VacancyManagement() {
  const { toast } = useToast();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [applicantCounts, setApplicantCounts] = useState<ApplicantCounts>({});
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isApplicantsOpen, setIsApplicantsOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [currentApplicants, setCurrentApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const vacanciesPromise = supabase.from('vacancies').select('*').order('created_at', { ascending: false });
      const applicantsPromise = supabase.from('applicants').select('vacancy_id');

      const [vacanciesResult, applicantsResult] = await Promise.all([vacanciesPromise, applicantsPromise]);

      if (vacanciesResult.error) {
        toast({ title: 'Error fetching vacancies', description: vacanciesResult.error.message, variant: 'destructive' });
      } else {
        setVacancies(vacanciesResult.data as Vacancy[]);
      }
      
      if (applicantsResult.error) {
         toast({ title: 'Error fetching applicants', description: applicantsResult.error.message, variant: 'destructive' });
      } else {
        const counts: ApplicantCounts = {};
        for (const applicant of applicantsResult.data) {
          counts[applicant.vacancy_id] = (counts[applicant.vacancy_id] || 0) + 1;
        }
        setApplicantCounts(counts);
      }

      setLoading(false);
    };
    fetchData();
  }, [toast]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const status = formData.get('status') as 'Open' | 'Closed';

    if (selectedVacancy) {
      // Edit existing
      const { data, error } = await supabase.from('vacancies').update({ title, status }).eq('id', selectedVacancy.id).select().single();
      if (error) {
        toast({ title: 'Update Failed', description: error.message, variant: 'destructive' });
      } else {
        setVacancies(vacancies.map(v => v.id === selectedVacancy.id ? data as Vacancy : v));
        toast({ title: 'Vacancy Updated', description: `The vacancy "${title}" has been updated.` });
      }
    } else {
      // Add new
      const { data, error } = await supabase.from('vacancies').insert({ title, status }).select().single();
      if (error) {
        toast({ title: 'Creation Failed', description: error.message, variant: 'destructive' });
      } else if (data) {
        setVacancies([data as Vacancy, ...vacancies]);
        toast({ title: 'Vacancy Added', description: `The vacancy "${title}" has been created.` });
      }
    }

    setIsFormOpen(false);
    setSelectedVacancy(null);
  };

  const openForm = (vacancy: Vacancy | null) => {
    setSelectedVacancy(vacancy);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = async (vacancyId: number) => {
    const { error } = await supabase.from('vacancies').delete().eq('id', vacancyId);
    if (error) {
        toast({ title: 'Deletion Failed', description: error.message, variant: 'destructive' });
    } else {
        const deletedVacancy = vacancies.find(v => v.id === vacancyId);
        setVacancies(vacancies.filter(v => v.id !== vacancyId));
        toast({
          title: 'Vacancy Deleted',
          description: `The vacancy "${deletedVacancy?.title}" has been deleted.`,
          variant: 'destructive',
        });
    }
  };

  const viewApplicants = async (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setIsApplicantsOpen(true);
    setCurrentApplicants([]); // Clear previous applicants

    const { data, error } = await supabase.from('applicants').select('*').eq('vacancy_id', vacancy.id);
    if (error) {
       toast({ title: 'Error fetching applicants', description: error.message, variant: 'destructive' });
    } else {
      setCurrentApplicants(data as Applicant[]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Vacancy Management</CardTitle>
            <p className="text-sm text-muted-foreground">Manage job openings and applications.</p>
          </div>
          <Button onClick={() => openForm(null)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Vacancy
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : vacancies.map((vacancy) => (
                <TableRow key={vacancy.id}>
                  <TableCell className="font-medium">{vacancy.title}</TableCell>
                  <TableCell>{applicantCounts[vacancy.id] || 0}</TableCell>
                  <TableCell>
                    <Badge
                      variant={vacancy.status === 'Open' ? 'default' : 'secondary'}
                      className={vacancy.status === 'Open' ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                      {vacancy.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewApplicants(vacancy)}
                    >
                      View Applicants
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openForm(vacancy)}>
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the "{vacancy.title}" vacancy.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteConfirm(vacancy.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedVacancy ? 'Edit Vacancy' : 'Add New Vacancy'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Job Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={selectedVacancy?.title}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <select
                  id="status"
                  name="status"
                  defaultValue={selectedVacancy?.status || 'Open'}
                  className="col-span-3 border h-10 border-input rounded-md px-3 py-2 text-sm bg-transparent"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isApplicantsOpen} onOpenChange={setIsApplicantsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Applicants for {selectedVacancy?.title}</DialogTitle>
            <DialogDescription>
              There are {currentApplicants.length} applicants for this position.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="max-h-60 overflow-y-auto pr-4">
              {currentApplicants.length > 0 ? (
                <ul className="space-y-3">
                  {currentApplicants.map((applicant) => (
                    <li
                      key={applicant.email}
                      className="flex justify-between items-center p-2 rounded-md border"
                    >
                      <span className="font-medium">{applicant.name}</span>
                      <span className="text-sm text-muted-foreground">{applicant.email}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground text-center">No applicants yet.</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
