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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarIcon, UploadCloud, User, X, Loader2, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Combobox } from './ui/combobox';
import { useSearchParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  id: z.string().optional(),
  full_name: z.string().min(1, 'Full name is required.'),
  cnic: z.string().optional(),
  ntn: z.string().optional(),
  address: z.string().optional(),
  business_name: z.string().optional(),
  mobile_number: z.string().optional(),
  business_type: z.string().optional(),
  membership_type: z.string().optional(),
  membership_code: z.string().min(1, 'Membership code is required.').regex(/^[^\/]+\/[^\-]+\-\d{3}$/, 'Format must be */-*** (e.g. 5/E-005)'),
  membership_expiry: z.date().optional(),
  photo: z.any().optional(),
  photo_url: z.string().optional(),
});

const businessTypes = [
  { value: 'accounting', label: 'Accounting' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'construction', label: 'Construction' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'education', label: 'Education' },
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'retail', label: 'Retail' },
  { value: 'technology', label: 'Technology' },
  { value: 'textiles', label: 'Textiles' },
  { value: 'other', label: 'Other' }
].sort((a, b) => a.label.localeCompare(b.label));

export default function RegistrationManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const memberId = searchParams.get('id');

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!memberId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      cnic: '',
      ntn: '',
      address: '',
      business_name: '',
      mobile_number: '',
      business_type: undefined,
      membership_type: undefined,
      membership_code: '',
      membership_expiry: undefined,
      photo: null,
      photo_url: undefined,
    },
  });

  const photoRef = form.register('photo');

  useEffect(() => {
    async function fetchMemberData() {
      if (!memberId) {
        setIsFetching(false);
        return;
      }

      try {
        const { supabase } = await import('@/lib/supabase');
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .eq('id', memberId)
          .single();

        if (error) throw error;

        if (data) {
          form.reset({
            id: data.id,
            full_name: data.full_name,
            cnic: data.cnic || '',
            ntn: data.ntn || '',
            address: data.address || '',
            business_name: data.business_name || '',
            mobile_number: data.mobile_number || '',
            business_type: data.business_type || undefined,
            membership_type: data.membership_type || undefined,
            membership_code: data.membership_code || '',
            membership_expiry: data.membership_expiry ? new Date(data.membership_expiry) : undefined,
            photo_url: data.photo_url || undefined,
          });

          if (data.photo_url) {
            setPhotoPreview(data.photo_url);
          }
        }
      } catch (error) {
        console.error('Error fetching member:', error);
        toast({
          title: 'Error',
          description: 'Failed to load member details.',
          variant: 'destructive',
        });
      } finally {
        setIsFetching(false);
      }
    }

    fetchMemberData();
  }, [memberId, form, toast]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitting form values:', values);
    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');

      // Upload photo if exists
      let photoUrl = values.photo_url;
      console.log('Checking photo upload...', values.photo);

      if (values.photo && values.photo.length > 0) {
        console.log('Photo found, starting upload...');
        const file = values.photo[0];
        console.log('File details:', file.name, file.size, file.type);

        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `members/${fileName}`;
        console.log('Target path:', filePath);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('member-photos')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload Error Details:', uploadError);
          throw uploadError;
        }
        console.log('Upload success:', uploadData);

        const { data: { publicUrl } } = supabase.storage
          .from('member-photos')
          .getPublicUrl(filePath);

        console.log('Generated Public URL:', publicUrl);
        photoUrl = publicUrl;
      } else {
        console.log('No photo to upload.');
      }
      const effectiveId = values.id || memberId;
      console.log('Submission ID Check:', { valuesId: values.id, paramId: memberId, effectiveId });

      if (effectiveId) {
        // UPDATE Existing Member
        console.log('Mode: UPDATE. updating member with ID:', effectiveId);
        const { error: updateError } = await supabase
          .from('members')
          .update({
            full_name: values.full_name,
            cnic: values.cnic,
            ntn: values.ntn,
            address: values.address,
            business_name: values.business_name,
            mobile_number: values.mobile_number,
            business_type: values.business_type,
            membership_type: values.membership_type,
            membership_code: values.membership_code,
            membership_expiry: values.membership_expiry?.toISOString(),
            photo_url: photoUrl
          })
          .eq('id', effectiveId);

        if (updateError) throw updateError;
        toast({ title: 'Member Updated', description: 'Member details have been successfully updated.' });
      } else {
        // CREATE New Member
        console.log('Mode: CREATE. creating new member');
        const { error: insertError } = await supabase
          .from('members')
          .insert({
            full_name: values.full_name,
            cnic: values.cnic,
            ntn: values.ntn,
            address: values.address,
            business_name: values.business_name,
            mobile_number: values.mobile_number,
            business_type: values.business_type,
            membership_type: values.membership_type,
            membership_expiry: values.membership_expiry?.toISOString(),
            membership_code: values.membership_code,
            photo_url: photoUrl,
            status: 'Active'
          });

        if (insertError) throw insertError;
        toast({ title: 'Member Added', description: 'New member has been successfully created.' });
      }
      router.push('/admin/dashboard?tab=users');
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save member details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log('Photo selected raw:', files);

    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Convert to array to serve as a stable value
      const fileArray = Array.from(files);
      console.log('Setting form value to:', fileArray);

      form.setValue('photo', fileArray, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setFileName(null);
    form.setValue('photo', null);
    form.setValue('photo_url', undefined);
  };

  if (isFetching) {
    return (
      <Card className="border-none shadow-sm bg-white rounded-[32px] p-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
      <CardHeader className="bg-transparent py-8 px-8 border-b border-gray-50/50">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <UserPlus className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">{memberId ? 'Edit Membership' : 'New Registration'}</CardTitle>
            <CardDescription className="text-gray-400 font-medium mt-1">
              {memberId ? 'Update details for existing member.' : 'Enroll a new business or individual.'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <input type="hidden" {...form.register("id")} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column: Form Fields */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 bg-gray-50/50 rounded-[24px] border border-gray-100 space-y-6">
                  <h3 className="font-bold text-gray-900">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-semibold">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} className="rounded-xl border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cnic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-semibold">CNIC</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} className="rounded-xl border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobile_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-semibold">Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. +92 300 1234567" {...field} className="rounded-xl border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-semibold">Address</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 123, Main Street, City" {...field} className="rounded-xl border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="p-6 bg-gray-50/50 rounded-[24px] border border-gray-100 space-y-6">
                  <h3 className="font-bold text-gray-900">Business Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="business_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-semibold">Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Acme Corporation" {...field} className="rounded-xl border-gray-200" />
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
                          <FormLabel className="text-gray-600 font-semibold">NTN</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 1234567-8" {...field} className="rounded-xl border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="business_type"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-gray-600 font-semibold">Industry / Sector</FormLabel>
                          <Combobox
                            options={businessTypes}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select sector..."
                            searchPlaceholder="Search..."
                            notFoundText="No type found."
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="p-6 bg-gray-50/50 rounded-[24px] border border-gray-100 space-y-6">
                  <h3 className="font-bold text-gray-900">Membership Config</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="membership_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-semibold">Membership Class</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-xl border-gray-200">
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Corporate">Corporate Class</SelectItem>
                              <SelectItem value="Associate">Associate Class</SelectItem>
                              <SelectItem value="Foreign">Foreign</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="membership_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-semibold">Membership Code</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 5/E-005" {...field} className="rounded-xl border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="membership_expiry"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-gray-600 font-semibold">Expiry Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-full pl-3 text-left font-normal rounded-xl border-gray-200',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Photo & Actions */}
              <div className="space-y-6">
                <div className="p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      {photoPreview ? (
                        <Image
                          src={photoPreview}
                          alt="Member photo"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User className="h-16 w-16 text-gray-300" />
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 p-2 bg-emerald-600 rounded-full text-white shadow-md cursor-pointer hover:bg-emerald-700 transition-colors">
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <UploadCloud className="h-5 w-5" />
                        <Input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          name={photoRef.name}
                          ref={photoRef.ref}
                          onBlur={photoRef.onBlur}
                          onChange={handlePhotoChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Profile Photo</h3>
                    <p className="text-xs text-gray-400 mt-1">Accepts JPG, PNG (Max 5MB)</p>
                  </div>
                  {photoPreview && (
                    <Button variant="ghost" size="sm" onClick={removePhoto} className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full">
                      Remove Photo
                    </Button>
                  )}
                </div>

                <div className="p-6 bg-gray-900 rounded-[32px] text-white space-y-4">
                  <h3 className="font-bold">Form Actions</h3>
                  <p className="text-sm text-gray-400">Review all details before saving. This action will add the member to the database.</p>

                  <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full bg-emerald-600 hover:bg-emerald-500 text-white border-none h-12">
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : memberId ? 'Save Changes' : 'Create Member'}
                  </Button>

                  <Button type="button" variant="outline" onClick={() => router.push('/admin/dashboard?tab=users')} className="w-full rounded-full border-gray-700 hover:bg-gray-800 text-white bg-transparent h-12">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
