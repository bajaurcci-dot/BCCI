'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  companyName: z.string().min(2, {
    message: 'Company name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number.',
  }),
  membershipType: z.string({
    required_error: 'Please select a membership type.',
  }),
  photo: z
    .any()
    .refine((files) => files?.length == 1, 'Photo is required.')
});

const supportContacts = [
    {
        name: 'Phone',
        value: '+92 308 2275587',
        href: 'tel:+923082275587',
        icon: Phone,
    },
    {
        name: 'Whatsapp',
        value: '+92 308 2275587',
        href: 'http://wa.me/+923082275587',
        icon: () => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
            >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        ),
    },
    {
        name: 'Email',
        value: 'contact@bajaurcci.com.pk',
        href: 'mailto:contact@bajaurcci.com.pk',
        icon: Mail,
    },
];

export default function AdditionalServicesSection() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      photo: undefined,
    },
  });
  
  const photoRef = form.register("photo");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Registration Data:', values);
    toast({
      title: 'Registration Submitted!',
      description: 'Thank you for registering. We will be in touch shortly.',
    });
    form.reset();
  }

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-slide-in-left">
              <h3 className="text-2xl font-bold font-headline mb-6">Online Registration</h3>
              <p className="text-muted-foreground mb-6">Become a member today by filling out the form below. The process is quick, easy, and the first step towards unlocking a world of business opportunities.</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company's Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
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
                          <Input placeholder="Your Phone Number" {...field} />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a membership type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="associate">Associate</SelectItem>
                            <SelectItem value="foreign">Foreign Member Class</SelectItem>
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
                        <FormLabel>Your Photo</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" {...photoRef} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg">Register Now</Button>
                </form>
              </Form>
            </div>

            <div className="flex flex-col animate-slide-in-right">
              <h3 className="text-2xl font-bold font-headline mb-6">24/7 Support Services</h3>
              <p className="text-muted-foreground mb-8">We are here to help you around the clock. Whether you have a question, need assistance, or want to provide feedback, our team is always available. Reach out to us through any of the channels below.</p>
              <div className="space-y-6">
                {supportContacts.map((contact) => (
                    <a key={contact.name} href={contact.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 text-muted-foreground hover:text-primary transition-colors group">
                        <div className="bg-primary/10 p-3 rounded-full mt-1 group-hover:bg-primary/20 transition-colors">
                            <contact.icon />
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground">{contact.name}</h4>
                            <p>{contact.value}</p>
                        </div>
                    </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
