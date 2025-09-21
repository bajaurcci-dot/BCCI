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
];

export const applicantsList = {
  'Project Manager': [
    { name: 'Alice Johnson', email: 'alice@example.com' },
    { name: 'Bob Williams', email: 'bob@example.com' },
  ],
  'Marketing Specialist': [{ name: 'Charlie Brown', email: 'charlie@example.com' }],
};

// Function to add a new vacancy
export const addVacancy = (vacancy: { title: string; status: string; applicants: number }) => {
  vacancies.push(vacancy);
};

// Function to update a vacancy
export const updateVacancy = (title: string, newVacancyData: { title: string; status: string }) => {
  const index = vacancies.findIndex(v => v.title === title);
  if (index !== -1) {
    vacancies[index] = { ...vacancies[index], ...newVacancyData };
  }
};

// Function to delete a vacancy
export const deleteVacancy = (title: string) => {
  vacancies = vacancies.filter(v => v.title !== title);
};
