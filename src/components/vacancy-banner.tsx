'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Megaphone, X } from 'lucide-react';
import { vacancies } from '@/lib/vacancies';
import { Button } from './ui/button';

export default function VacancyBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [openVacancies, setOpenVacancies] = useState<string[]>([]);

  useEffect(() => {
    const checkVacancies = () => {
      const open = vacancies
        .filter((v) => v.status === 'Open')
        .map((v) => v.title);
      
      setOpenVacancies(open);

      const wasVisible = localStorage.getItem('vacancyBannerDismissed') !== 'true';
      if (open.length > 0 && wasVisible) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    checkVacancies();

    // Re-check when vacancies data might change. 
    // In a real app with dynamic data, you'd have a better mechanism for this.
    const interval = setInterval(checkVacancies, 5000); 

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Remember dismissal for the session
    try {
       localStorage.setItem('vacancyBannerDismissed', 'true');
    } catch (error) {
      console.error("Could not save dismissal state to localStorage.", error);
    }
  };

  if (!isVisible || openVacancies.length === 0) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-r from-primary to-accent text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center p-2">
          <div className="flex items-center">
            <Megaphone className="h-5 w-5 mr-3" />
            <p className="font-medium text-sm">
              <span className="font-bold mr-2">We're hiring!</span>
              <span>Open positions: {openVacancies.join(', ')}.</span>
            </p>
          </div>
          <Button asChild variant="secondary" size="sm" className="ml-4 h-7 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
          <button
            type="button"
            className="ml-4 -mr-1 flex p-2 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
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
