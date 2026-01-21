'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';

export type Vacancy = {
  id: number;
  title: string;
  status: 'Open' | 'Closed';
  created_at: string;
};

interface VacanciesContextType {
  vacancies: Vacancy[];
  loading: boolean;
}

const VacanciesContext = createContext<VacanciesContextType | undefined>(undefined);

export const VacanciesProvider = ({ children }: { children: ReactNode }) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchVacancies = useCallback(async () => {
    setLoading(true);
    // Supabase logic removed
    setVacancies([]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVacancies();
    // Supabase channel subscription removed
  }, [fetchVacancies]);

  return (
    <VacanciesContext.Provider value={{ vacancies, loading }}>
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
