'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase-client';
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
    const { data, error } = await supabase
      .from('vacancies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Could not fetch vacancies', description: error.message, variant: 'destructive'});
    } else {
      setVacancies(data || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchVacancies();

    const channel = supabase.channel('realtime-vacancies')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vacancies'}, (payload) => {
        // Just refetch all vacancies on any change
        fetchVacancies();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
