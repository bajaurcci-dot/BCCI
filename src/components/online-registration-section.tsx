'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ClipboardList, ArrowRight, X, UploadCloud, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const steps = [
    "Prepare your business documents (NTN, CNIC, etc.)",
    "Fill out the online application form below",
    "Pay the registration fee online or via bank challan",
    "Receive your membership certificate digitally"
];

const formSchema = z.object({
    fullName: z.string().min(1, { message: 'Full name is required.' }),
    companyName: z.string().min(1, { message: 'Company name is required.' }),
    ntn: z.string().min(1, { message: 'NTN is required.' }),
    phone: z.string().min(1, { message: 'Phone number is required.' }),
    membershipType: z.string({ required_error: 'Please select a membership type.' }),
    photo: z.any().optional(),
});

const OnlineRegistrationSection = () => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            companyName: '',
            ntn: '',
            phone: '',
            membershipType: undefined,
        },
    });

    const photoRef = form.register("photo");

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        try {
            // Import Supabase client
            const { supabase } = await import('@/lib/supabase');

            let photoUrl: string | null = null;

            // Upload photo if provided
            if (values.photo && values.photo[0]) {
                const photoFile = values.photo[0];
                const fileExt = photoFile.name.split('.').pop();
                const fileName = `${crypto.randomUUID()}.${fileExt}`;
                const filePath = `registrations/${fileName}`;

                console.log('--- SUPABASE UPLOAD DEBUG ---');
                console.log('Bucket: member-photos');
                console.log('Path:', filePath);
                console.log('File:', photoFile.name, photoFile.type, photoFile.size);

                const { error: uploadError, data } = await supabase.storage
                    .from('member-photos')
                    .upload(filePath, photoFile, {
                        cacheControl: '3600',
                        upsert: false,
                    });

                if (uploadError) {
                    console.error('Photo upload error:', uploadError);
                    throw new Error('Failed to upload photo');
                }

                // Get public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('member-photos')
                    .getPublicUrl(filePath);

                photoUrl = publicUrl;
            }

            // Generate unique application ID
            const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

            // Insert registration into registrations table
            const { error: insertError } = await supabase
                .from('registrations')
                .insert({
                    // @ts-ignore
                    application_id: applicationId,
                    full_name: values.fullName,
                    company_name: values.companyName,
                    ntn: values.ntn,
                    phone: values.phone,
                    membership_type: values.membershipType,
                    photo_url: photoUrl,
                    status: 'Pending',
                });

            if (insertError) {
                console.error('Registration insert error:', insertError);
                throw new Error('Failed to submit registration');
            }

            setIsSubmitted(true);
            toast({
                title: 'Application Submitted Successfully!',
                description: `Your application ID is ${applicationId}. We will review your details and contact you shortly.`,
            });

            form.reset({
                fullName: '',
                companyName: '',
                ntn: '',
                phone: '',
                membershipType: undefined,
                photo: undefined,
            });
            setFileName(null);
        } catch (error: any) {
            console.error('Registration error:', error);
            toast({
                title: 'Submission Failed',
                description: error.message || 'An error occurred. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setIsSubmitted(false);
            setTermsAccepted(false);
            form.reset();
            setFileName(null);
        }, 300);
    };

    return (
        <section className="py-16 md:py-24 bg-transparent">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header Section Moved Here */}
                <div className="text-center max-w-4xl mx-auto mb-16 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 text-foreground">
                        Online Registration
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Register your business with BCCI quickly and securely through our online portal.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch justify-center">

                    <div className="flex flex-col justify-between space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-border/50 h-full">
                        <div>
                            <h2 className="text-3xl font-bold font-headline text-foreground leading-tight mb-4">
                                Online Registration Process
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Register your business with the Bajaur Chamber of Commerce & Industry from the comfort of your office. Our digital portal makes becoming a member fast and easy.
                            </p>
                        </div>

                        <div className="grid gap-4 mt-auto">
                            {steps.map((step, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {i + 1}
                                    </div>
                                    <span className="font-medium text-foreground text-sm md:text-base">{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full flex flex-col h-full">
                        <Card className="shadow-2xl border-primary/20 bg-card relative overflow-hidden flex flex-col h-full justify-between transform transition-all hover:scale-[1.01] duration-300">
                            <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>

                            <div>
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <ClipboardList className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-2xl">Start Application</CardTitle>
                                    <CardDescription>
                                        New Membership Application Form for Current Year
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-100">
                                        <strong>Note:</strong> Please ensure you have a soft copy of your <strong>Passport Size Photo</strong> and <strong>Business Documents (CNIC/NTN)</strong> ready before proceeding.
                                    </div>

                                    <div className="flex items-start space-x-3 pt-2">
                                        <Checkbox
                                            id="terms"
                                            checked={termsAccepted}
                                            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Agree to Terms
                                            </label>
                                            <p className="text-sm text-muted-foreground">
                                                By clicking continue, you agree to the <a href="#" className="underline text-primary">terms and conditions</a> of BCCI membership.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>

                            <CardFooter className="mt-auto pt-6">
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            size="lg"
                                            className="w-full text-lg font-bold shadow-lg hover:shadow-xl transition-all h-14"
                                            disabled={!termsAccepted}
                                        >
                                            Continue to Registration Form <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                        {isSubmitted ? (
                                            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-2 animate-in zoom-in duration-300">
                                                    <Check className="h-10 w-10 text-green-600" />
                                                </div>
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl font-bold text-center">Application Received!</DialogTitle>
                                                    <DialogDescription className="text-center text-lg mt-2">
                                                        Thank you for registering. Your details have been submitted successfully. We will review your documents and contact you shortly.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Button onClick={handleClose} className="mt-6 w-full max-w-xs" size="lg">
                                                    Close
                                                </Button>
                                            </div>
                                        ) : (
                                            <>
                                                <DialogHeader>
                                                    <DialogTitle>Membership Application Form</DialogTitle>
                                                    <DialogDescription>
                                                        Please fill in the details below to complete your registration.
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <Form {...form}>
                                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="fullName"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Full Name</FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="John Doe" {...field} disabled={loading} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="phone"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Phone Number</FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="+92 300 1234567" {...field} disabled={loading} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>

                                                        <FormField
                                                            control={form.control}
                                                            name="companyName"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Company Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Your Company Name" {...field} disabled={loading} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="ntn"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>NTN</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="1234567-8" {...field} disabled={loading} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="membershipType"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Membership Type</FormLabel>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                                                                        <FormControl>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select type" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            <SelectItem value="Corporate">Corporate Class</SelectItem>
                                                                            <SelectItem value="Associate">Associate Class</SelectItem>
                                                                            <SelectItem value="Foreign">Foreign Class</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="photo"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Your Photo (Passport Size)</FormLabel>
                                                                    <FormControl>
                                                                        <div className="relative">
                                                                            <Input
                                                                                type="file"
                                                                                accept="image/*"
                                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                                                {...photoRef}
                                                                                onChange={(e) => {
                                                                                    field.onChange(e.target.files);
                                                                                    setFileName(e.target.files?.[0]?.name ?? null);
                                                                                }}
                                                                                disabled={loading}
                                                                            />
                                                                            <div className="flex items-center justify-between p-3 border border-input rounded-md bg-background hover:bg-accent transition-colors">
                                                                                <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                                                                                    {fileName || "Choose photo to upload..."}
                                                                                </span>
                                                                                <UploadCloud className="w-4 h-4 text-muted-foreground" />
                                                                            </div>
                                                                        </div>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                                                            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Submit Application'}
                                                        </Button>
                                                    </form>
                                                </Form>
                                            </>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            </div>
        </section >
    );
};

export default OnlineRegistrationSection;
