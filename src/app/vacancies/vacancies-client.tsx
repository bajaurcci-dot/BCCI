'use client';

import React, { useEffect, useState } from 'react';
import TopNavBar from '@/components/top-nav-bar';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock, ArrowRight, Building2, UploadCloud, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

type Vacancy = {
    id: any;
    title: string | null;
    department: string | null;
    location: string | null;
    type: string | null;
    status: string | null;
    description: string | null;
    posted_date: string | null;
    deadline?: string | null;
    applicants_count?: number | null;
};

export default function VacanciesClient() {
    const { toast } = useToast();
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Application Form State
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
    });
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    useEffect(() => {
        fetchVacancies();
    }, []);

    const fetchVacancies = async () => {
        try {
            const { supabase } = await import('@/lib/supabase');
            const { data, error } = await supabase
                .from('vacancies')
                .select('*')
                .or('status.eq.Open,status.eq.Active')
                .order('posted_date', { ascending: false });

            if (error) throw error;
            setVacancies((data as any[]) || []);
        } catch (error: any) {
            console.error('Error fetching jobs:', {
                message: error?.message || 'Unknown error',
                details: error?.details,
                hint: error?.hint,
                code: error?.code,
                error
            });
        } finally {
            setLoading(false);
        }
    };

    const handleApply = (vacancy: Vacancy) => {
        setSelectedVacancy(vacancy);
        setIsApplyOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleSubmitApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedVacancy || !resumeFile) {
            toast({ title: "Incomplete", description: "Please upload your resume.", variant: "destructive" });
            return;
        }
        setIsSubmitting(true);

        try {
            const { supabase } = await import('@/lib/supabase');

            // 1. Upload Resume
            const fileExt = resumeFile.name.split('.').pop();
            const fileName = `${selectedVacancy.id}/${Date.now()}.${fileExt}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(fileName, resumeFile);

            if (uploadError) throw uploadError;

            // 2. Get Public URL (optional, or just store path)
            const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(fileName);

            // 3. Insert Application Record
            const { error: dbError } = await supabase
                .from('job_applications')
                .insert({
                    vacancy_id: selectedVacancy.id,
                    full_name: formData.full_name,
                    email: formData.email,
                    phone: formData.phone,
                    resume_url: publicUrl
                } as any);

            if (dbError) throw dbError;

            toast({
                title: "Application Submitted!",
                description: "Good luck! We've received your application.",
            });
            setIsApplyOpen(false);
            setFormData({ full_name: '', email: '', phone: '' });
            setResumeFile(null);

        } catch (error: any) {
            console.error('Application error:', error);
            toast({
                title: "Error",
                description: error.message || "Failed to submit application.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <TopNavBar />

            {/* Hero Section */}
            <div className="bg-[#15803d] text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-6 drop-shadow-sm font-headline">
                        Join Our Team
                    </h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
                        Explore exciting career opportunities at the Bajaur Chamber of Commerce. We are looking for passionate individuals to help drive economic growth.
                    </p>
                </div>
            </div>

            <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 -mt-10">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                        </div>
                    ) : vacancies.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {vacancies.map((job) => (
                                <Card key={job.id} className="group hover:shadow-2xl transition-all duration-300 border-none shadow-md overflow-hidden rounded-2xl bg-white flex flex-col">
                                    <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-400"></div>
                                    <CardHeader className="pb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 rounded-full px-3 py-1 font-semibold">
                                                {job.type || 'Full-time'}
                                            </Badge>
                                            <div className="text-right">
                                                <span className="text-xs text-gray-400 font-medium block">
                                                    Posted {job.posted_date ? formatDistanceToNow(new Date(job.posted_date), { addSuffix: true }) : 'Recently'}
                                                </span>
                                                {job.deadline && (
                                                    <span className="text-xs font-bold text-red-500 block mt-1">
                                                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 min-h-[3.5rem] font-headline">
                                            {job.title}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1 text-sm font-medium text-gray-500">
                                            <Briefcase className="h-4 w-4 text-emerald-500" /> {job.department || 'General'}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6 flex-grow flex flex-col justify-end">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
                                            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gray-400" /> {job.location || 'Khar HQ'}</span>
                                            <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4 text-gray-400" /> On-site</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mt-auto">
                                            {/* VIEW DETAILS DIALOG */}
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" className="w-full rounded-xl border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300">
                                                        View Details
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto rounded-[32px] p-8">
                                                    <DialogHeader>
                                                        <Badge className="w-fit bg-emerald-100 text-emerald-800 hover:bg-emerald-200 mb-2">{job.type}</Badge>
                                                        <DialogTitle className="text-3xl font-bold font-headline">{job.title}</DialogTitle>
                                                        <DialogDescription className="text-lg text-gray-600 font-medium">
                                                            {job.department} • {job.location}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-6 py-6 text-gray-700 leading-relaxed">
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 mb-2">About the Role</h4>
                                                            <p>{job.description || "We are looking for a talented individual to join our team. If you are passionate and dedicated, we want to hear from you."}</p>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl">
                                                            <div>
                                                                <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Type</span>
                                                                <p className="font-semibold text-gray-900">{job.type}</p>
                                                            </div>
                                                            <div>
                                                                <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Location</span>
                                                                <p className="font-semibold text-gray-900">{job.location}</p>
                                                            </div>
                                                            <div>
                                                                <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Posted</span>
                                                                <p className="font-semibold text-gray-900">{job.posted_date ? new Date(job.posted_date).toLocaleDateString() : 'N/A'}</p>
                                                            </div>
                                                            <div>
                                                                <span className="text-sm text-gray-500 font-bold uppercase tracking-wider text-red-500">Deadline</span>
                                                                <p className="font-semibold text-red-600">
                                                                    {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Open'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end pt-4">
                                                            <Button onClick={() => handleApply(job)} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 shadow-lg shadow-emerald-200">
                                                                Apply for this Position
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <Button onClick={() => handleApply(job)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-100">
                                                Apply Now
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[32px] shadow-sm">
                            <Briefcase className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900">No Openings Currently</h3>
                            <p className="text-gray-500 mt-2">Please check back later for new opportunities.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* APPLY FORM DIALOG */}
            <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
                <DialogContent className="sm:max-w-[500px] rounded-[32px] p-8 border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">Apply for {selectedVacancy?.title}</DialogTitle>
                        <DialogDescription className="text-center">
                            Please fill out the form below and attach your CV.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitApplication} className="space-y-5 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="full_name" className="font-bold text-gray-700">Full Name</Label>
                            <Input
                                id="full_name"
                                placeholder="Enter your full name"
                                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-emerald-100 transition-all font-medium py-6"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-bold text-gray-700">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="info@bajaurchamber.org.pk"
                                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-emerald-100 transition-all font-medium py-6"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="font-bold text-gray-700">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="0300 1234567"
                                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-emerald-100 transition-all font-medium py-6"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="resume" className="font-bold text-gray-700">Upload CV / Resume (PDF)</Label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-3 text-gray-400" />
                                        <p className="text-sm text-gray-500"><span className="font-semibold">{resumeFile ? resumeFile.name : "Click to upload"}</span></p>
                                        <p className="text-xs text-gray-400 mt-1">PDF or DOCX (MAX. 5MB)</p>
                                    </div>
                                    <input id="resume" type="file" className="hidden" accept=".pdf,.docx,.doc" onChange={handleFileChange} required />
                                </label>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 shadow-lg shadow-emerald-100 mt-4"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : 'Submit Application'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="px-4">
                <Footer />
            </div>
        </div>
    );
}
