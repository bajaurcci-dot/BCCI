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
import { PlusCircle } from 'lucide-react';
import { Badge } from './ui/badge';

const vacancies = [
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

export default function VacancyManagement() {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Vacancies</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Vacancy
        </Button>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vacancies.map((vacancy) => (
              <TableRow key={vacancy.title}>
                <TableCell>{vacancy.title}</TableCell>
                <TableCell>{vacancy.applicants}</TableCell>
                <TableCell>
                  <Badge variant={vacancy.status === 'Open' ? 'default' : 'secondary'}>
                    {vacancy.status}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm">View Applicants</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
