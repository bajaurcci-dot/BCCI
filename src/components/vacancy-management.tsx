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
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Vacancy Management</CardTitle>
            <p className="text-sm text-muted-foreground">Manage job openings and applications.</p>
          </div>
          <Button>
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
                    <Badge variant={vacancy.status === 'Open' ? 'default' : 'secondary'}>
                      {vacancy.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">View Applicants</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
