import type { Metadata } from 'next';
import VacanciesClient from './vacancies-client';

export const metadata: Metadata = {
    title: 'Careers & Vacancies | Bajaur Chamber of Commerce & Industry',
    description: 'Explore career opportunities at the Bajaur Chamber of Commerce & Industry (BCCI). Join our team and help us drive economic growth and business development in Bajaur.',
    alternates: {
        canonical: 'https://www.bajaurchamber.org.pk/vacancies',
    },
};

export default function VacanciesPage() {
    return <VacanciesClient />;
}
