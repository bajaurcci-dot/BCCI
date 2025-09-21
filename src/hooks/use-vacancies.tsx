'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { vacancies as initialVacancies } from '@/lib/vacancies';

export type Vacancy = {
  title: string;
  applicants: number;
  status: 'Open' | 'Closed';
};

interface VacanciesContextType {
  vacancies: Vacancy[];
  addVacancy: (vacancy: Omit<Vacancy, 'applicants'> & { applicants?: number }) => void;
  updateVacancy: (title: string, newVacancyData: Partial<Vacancy>) => void;
  deleteVacancy: (title: string) => void;
}

const VacanciesContext = createContext<VacanciesContextType | undefined>(undefined);

export const VacanciesProvider = ({ children }: { children: ReactNode }) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>(initialVacancies);

  const addVacancy = (vacancy: Omit<Vacancy, 'applicants'> & { applicants?: number }) => {
    const newVacancy = {
      ...vacancy,
      applicants: vacancy.applicants || 0,
    };
    setVacancies((prev) => [...prev, newVacancy]);
  };

  const updateVacancy = (title: string, newVacancyData: Partial<Vacancy>) => {
    setVacancies((prev) =>
      prev.map((v) => (v.title === title ? { ...v, ...newVacancyData } : v))
    );
  };

  const deleteVacancy = (title: string) => {
    setVacancies((prev) => prev.filter((v) => v.title !== title));
  };

  return (
    <VacanciesContext.Provider value={{ vacancies, addVacancy, updateVacancy, deleteVacancy }}>
      {children}
    </VacanciesContext.Provider>
  );
};

export const useVacancies = () => {
  const context = useContext(VacanciesContext);
  if (context === undefined) {
    throw new Error('useVacancies must be used within a VacanciesProvider');
  }
  return context;
};
