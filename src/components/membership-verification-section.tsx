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
import { Phone, Mail, MapPin, Search, Loader2, User, Verified } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { format } from 'date-fns';

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

type Member = {
  id: string;
  full_name: string;
  ntn: string | null;
  membership_type: string | null;
  status: string | null;
  photo_url: string | null;
  membership_code: string | null;
  membership_expiry: string | null;
};

export default function MembershipVerificationSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [foundMember, setFoundMember] = useState<Member | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    setFoundMember(null);

    try {
      // Import Supabase client
      const { supabase } = await import('@/lib/supabase');

      // Search for member in Supabase
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('full_name', values.fullName)
        .eq('ntn', values.ntn)
        .eq('membership_type', values.membershipType)
        .eq('status', 'Active')
        .maybeSingle();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Database error occurred');
      }

      if (data) {
        // Member found!
        setFoundMember(data);
        setIsDialogOpen(true);
        toast({
          title: 'Member Verified!',
          description: `${data.full_name} is a verified BCCI member.`,
        });
      } else {
        // Member not found
        toast({
          title: 'Verification Failed',
          description: 'Member not found. Please check your details and try again.',
          variant: 'destructive',
        });
      }
    } catch (err: any) {
      console.error('Verification error:', err);
      toast({
        title: 'Error',
        description: err.message || 'An error occurred during verification.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="pb-20 md:pb-32 bg-gray-50 pt-10">
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
                            <SelectItem value="Foreign">Foreign</SelectItem>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {foundMember && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Verified className="h-6 w-6 text-green-500" />
                Membership Verified
              </DialogTitle>
              <DialogDescription>
                The membership for {foundMember.full_name} is active and valid.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center bg-muted/50 relative overflow-hidden">
                  {foundMember.photo_url ? (
                    <Image
                      src={foundMember.photo_url}
                      alt="Member photo"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{foundMember.full_name}</p>
                  <p className="text-sm text-muted-foreground">{foundMember.ntn}</p>
                </div>
              </div>
              <div className="text-sm space-y-2 rounded-md border p-4 bg-background">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Membership Code:</span>
                  <span className="font-medium">{foundMember.membership_code || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Membership Type:</span>
                  <span className="font-medium">{foundMember.membership_type || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="default" className="bg-green-500">{foundMember.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expiry Date:</span>
                  <span className="font-medium">
                    {foundMember.membership_expiry ? format(new Date(foundMember.membership_expiry), 'PPP') : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" className="w-full">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
