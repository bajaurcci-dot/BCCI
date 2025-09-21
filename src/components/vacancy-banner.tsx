'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Megaphone, X } from 'lucide-react';
import { Button } from './ui/button';
import { useVacancies } from '@/hooks/use-vacancies';

export default function VacancyBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentVacancyIndex, setCurrentVacancyIndex] = useState(0);
  const { vacancies } = useVacancies();

  const openVacancies = vacancies.filter((v) => v.status === 'Open');

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('vacancyBannerDismissed') === 'true';
    if (openVacancies.length > 0 && !wasDismissed) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [openVacancies.length]);

  useEffect(() => {
    if (openVacancies.length > 1) {
      const interval = setInterval(() => {
        setCurrentVacancyIndex((prevIndex) => (prevIndex + 1) % openVacancies.length);
      }, 5000); // Cycle every 5 seconds
      return () => clearInterval(interval);
    }
  }, [openVacancies.length]);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem('vacancyBannerDismissed', 'true');
    } catch (error) {
      console.error("Could not save dismissal state to sessionStorage.", error);
    }
  };

  if (!isVisible || openVacancies.length === 0) {
    return null;
  }

  const currentVacancy = openVacancies[currentVacancyIndex];

  return (
    <div className="relative bg-gradient-to-r from-primary to-accent text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center p-2">
          <div className="flex items-center">
            <Megaphone className="h-5 w-5 mr-3 flex-shrink-0" />
            <p className="font-medium text-sm text-center">
              <span className="font-bold mr-2">We're hiring!</span>
              <span className="hidden sm:inline">Open position: </span>
              <span className="font-semibold">{currentVacancy.title}</span>
            </p>
          </div>
          <Button asChild variant="secondary" size="sm" className="ml-4 h-7 bg-primary-foreground text-primary hover:bg-primary-foreground/90 flex-shrink-0">
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
          <button
            type="button"
            className="ml-4 -mr-1 flex p-2 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2 flex-shrink-0"
            onClick={handleDismiss}
          >
            <span className="sr-only">Dismiss</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
