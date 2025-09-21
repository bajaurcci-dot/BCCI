'use client';
// This file acts as a simple in-memory "database" for vacancies.
// In a real application, you would replace this with a proper database and API.

export let vacancies = [
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
] as { title: string; applicants: number; status: 'Open' | 'Closed' }[];

export const applicantsList = {
  'Project Manager': [
    { name: 'Alice Johnson', email: 'alice@example.com' },
    { name: 'Bob Williams', email: 'bob@example.com' },
  ],
  'Marketing Specialist': [{ name: 'Charlie Brown', email: 'charlie@example.com' }],
};
