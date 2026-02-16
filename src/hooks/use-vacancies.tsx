'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';

export type Vacancy = {
  id: string;
  title: string | null;
  status: string | null;
  posted_date: string | null;
  department?: string | null;
  location?: string | null;
  applicants_count?: number | null;
  description?: string | null;
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
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('vacancies')
        .select('*')
        .or('status.eq.Open,status.eq.Active');

      if (error) throw error;
      setVacancies(data || []);
    } catch (error: any) {
      console.error("Failed to fetch active vacancies", {
        message: error?.message || 'Unknown error',
        details: error?.details,
        hint: error?.hint,
        code: error?.code,
        error
      });
    } finally {
      setLoading(false);
    }
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
