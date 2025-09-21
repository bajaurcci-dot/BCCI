'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
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

const initialVacancies = [
  {
    title: 'Project Manager',
    applicants: 15,
    status: 'Open',
  },
  {
    title: 'Marketing Specialist',
    applicants: 32,
    status: 'Closed',
  },
];

const applicantsList = {
  'Project Manager': [
    { name: 'Alice Johnson', email: 'alice@example.com' },
    { name: 'Bob Williams', email: 'bob@example.com' },
  ],
  'Marketing Specialist': [{ name: 'Charlie Brown', email: 'charlie@example.com' }],
};

export default function VacancyManagement() {
  const { toast } = useToast();
  const [vacancies, setVacancies] = useState(initialVacancies);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isApplicantsOpen, setIsApplicantsOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<any>(null);
  const [currentApplicants, setCurrentApplicants] = useState<any[]>([]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const status = formData.get('status') as string;

    if (selectedVacancy) {
      // Edit existing
      setVacancies(vacancies.map(v => v.title === selectedVacancy.title ? {...v, title, status} : v));
      toast({ title: "Vacancy Updated", description: `The vacancy "${title}" has been updated.` });
    } else {
      // Add new
      setVacancies([...vacancies, { title, status, applicants: 0 }]);
      toast({ title: "Vacancy Added", description: `The vacancy "${title}" has been created.` });
    }
    
    setIsFormOpen(false);
    setSelectedVacancy(null);
  };

  const openForm = (vacancy: any | null) => {
    setSelectedVacancy(vacancy);
    setIsFormOpen(true);
  };

  const handleDelete = (title: string) => {
     setVacancies(vacancies.filter((v) => v.title !== title));
     toast({
      title: 'Vacancy Deleted',
      description: `The vacancy "${title}" has been deleted.`,
      variant: 'destructive',
    });
  }

  const viewApplicants = (title: string) => {
    setCurrentApplicants(applicantsList[title as keyof typeof applicantsList] || []);
    setSelectedVacancy(vacancies.find(v => v.title === title) || null);
    setIsApplicantsOpen(true);
  }

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
              {vacancies.map((vacancy) => (
                <TableRow key={vacancy.title}>
                  <TableCell className="font-medium">{vacancy.title}</TableCell>
                  <TableCell>{vacancy.applicants}</TableCell>
                  <TableCell>
                    <Badge variant={vacancy.status === 'Open' ? 'default' : 'secondary'} className={vacancy.status === 'Open' ? 'bg-green-500' : ''}>
                      {vacancy.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => viewApplicants(vacancy.title)}>View Applicants</Button>
                    <Button variant="outline" size="sm" onClick={() => openForm(vacancy)}>Edit</Button>
                    <AlertDialog>
                       <AlertDialogTrigger asChild>
                         <Button variant="destructive" size="sm">Delete</Button>
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
                           <AlertDialogAction onClick={() => handleDelete(vacancy.title)}>Delete</AlertDialogAction>
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
                <Label htmlFor="title" className="text-right">Job Title</Label>
                <Input id="title" name="title" defaultValue={selectedVacancy?.title} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <select id="status" name="status" defaultValue={selectedVacancy?.status} className="col-span-3 border border-input rounded-md px-3 py-2 text-sm">
                  <option>Open</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
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
                  {currentApplicants.map(applicant => (
                    <li key={applicant.email} className="flex justify-between items-center p-2 rounded-md border">
                      <span className="font-medium">{applicant.name}</span>
                      <span className="text-sm text-muted-foreground">{applicant.email}</span>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-muted-foreground text-center">No applicants yet.</p>}
            </div>
          </div>
          <DialogFooter>
             <DialogClose asChild><Button type="button" variant="secondary">Close</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </Card>
  );
}
