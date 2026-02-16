'use client';

import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { VacanciesProvider } from '@/hooks/use-vacancies';
import SmoothScroll from '@/components/smooth-scroll';
import '@/lib/poly-ssr';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <VacanciesProvider>
            <SmoothScroll>
                {children}
            </SmoothScroll>
            <Toaster />
        </VacanciesProvider>
    );
}
