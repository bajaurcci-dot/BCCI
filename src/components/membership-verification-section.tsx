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
import { Phone, Mail, MapPin, Search, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase-client';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  ntn: z.string().min(1, 'NTN is required.'),
  membershipType: z.string({ required_error: 'Please select a membership type.' }),
});

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    value: 'Khar, District Bajaur',
    href: 'https://maps.app.goo.gl/82hQdwoCeyAgj5iu5',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@bajaurcci.com.pk',
    href: 'mailto:contact@bajaurcci.com.pk',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+92 308 2275587',
    href: 'tel:+923082275587',
  },
];

export default function MembershipVerificationSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      ntn: '',
      membershipType: 'Corporate',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { data, error } = await supabase
      .from('members')
      .select('status')
      .eq('ntn', values.ntn)
      .eq('full_name', values.fullName)
      .single();

    if (error || !data) {
      toast({
        title: 'Verification Failed',
        description: 'Member not found. Please check your details and try again.',
        variant: 'destructive',
      });
    } else if (data.status === 'Active') {
      toast({
        title: 'Verification Successful!',
        description: 'Your membership is active and verified.',
      });
    } else {
       toast({
        title: 'Membership Inactive',
        description: `Your membership status is: ${data.status}. Please contact support.`,
        variant: 'destructive',
      });
    }
    setLoading(false);
  }

  return (
    <section className="pb-20 md:pb-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg animate-slide-in-left flex flex-col">
            <h3 className="text-2xl font-bold font-headline mb-2">Member Verification</h3>
            <p className="text-muted-foreground mb-6">
              Enter Full Name, NTN and Membership Type to verify.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-grow flex flex-col">
                <div className="flex-grow">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} disabled={loading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ntn"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>NTN *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter NTN" {...field} disabled={loading} />
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
                        <FormLabel>Membership Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a membership type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Corporate">Corporate</SelectItem>
                            <SelectItem value="Associate">Associate</SelectItem>
                            <SelectItem value="Foreign">Foreign Member Class</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full mt-auto" size="lg" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  {loading ? 'Verifying...' : 'Search Member'}
                </Button>
              </form>
            </Form>
          </div>

          <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg animate-slide-in-right">
            <h3 className="text-2xl font-bold font-headline mb-2">
              For More Informations <span className="text-primary">Contact Us Now</span>
            </h3>
            <p className="text-muted-foreground mb-8">
              If you need more information or have inquiries, please don't hesitate to contact us.
              We're here to assist you!
            </p>
            <div className="space-y-6">
              {contactInfo.map((contact) => (
                <a
                  key={contact.title}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="bg-primary/10 p-3 rounded-full mt-1 group-hover:bg-primary/20 transition-colors">
                    <contact.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{contact.title}</h4>
                    <p>{contact.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
