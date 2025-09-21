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
import { CalendarIcon, UploadCloud, User, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Combobox } from './ui/combobox';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  cnic: z.string().min(1, 'CNIC is required.'),
  ntn: z.string().min(1, 'NTN is required.'),
  address: z.string().min(1, 'Address is required.'),
  businessName: z.string().min(1, 'Business name is required.'),
  mobileNumber: z.string().min(1, 'Mobile number is required.'),
  businessType: z.string({ required_error: 'Please select a business type.' }),
  membershipType: z.string({ required_error: 'Please select a membership type.' }),
  membershipCode: z.string().min(1, 'Membership code is required.'),
  membershipExpiry: z.date({ required_error: 'Expiry date is required.' }),
  photo: z.any().optional(),
});

const businessTypes = [
    { value: 'accounting', label: 'Accounting' },
    { value: 'advertising', label: 'Advertising' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'architecture', label: 'Architecture' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'baking', label: 'Baking' },
    { value: 'banking', label: 'Banking' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'chemicals', label: 'Chemicals' },
    { value: 'cleaning_services', label: 'Cleaning Services' },
    { value: 'construction', label: 'Construction' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'consumer_goods', label: 'Consumer Goods' },
    { value: 'cosmetics', label: 'Cosmetics' },
    { value: 'crafts', label: 'Crafts' },
    { value: 'design', label: 'Design' },
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'education', label: 'Education' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'energy', label: 'Energy' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'environmental_services', label: 'Environmental Services' },
    { value: 'event_planning', label: 'Event Planning' },
    { value: 'exporter', label: 'Exporter' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'finance', label: 'Finance' },
    { value: 'food_and_beverage', label: 'Food and Beverage' },
    { value: 'franchise', label: 'Franchise' },
    { value: 'freelancing', label: 'Freelancing' },
    { value: 'graphic_design', label: 'Graphic Design' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'human_resources', label: 'Human Resources' },
    { value: 'importer', label: 'Importer' },
    { value: 'information_technology', label: 'Information Technology' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'interior_design', label: 'Interior Design' },
    { value: 'internet_services', label: 'Internet Services' },
    { value: 'investment', label: 'Investment' },
    { value: 'it_services', label: 'IT Services' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'journalism', label: 'Journalism' },
    { value: 'landscaping', label: 'Landscaping' },
    { value: 'legal_services', label: 'Legal Services' },
    { value: 'logistics', label: 'Logistics' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'media', label: 'Media' },
    { value: 'medical_devices', label: 'Medical Devices' },
    { value: 'mining', label: 'Mining' },
    { value: 'music', label: 'Music' },
    { value: 'non-profit', label: 'Non-profit' },
    { value: 'online_retail', label: 'Online Retail' },
    { value: 'packaging', label: 'Packaging' },
    { value: 'painting', label: 'Painting' },
    { value: 'personal_training', label: 'Personal Training' },
    { value: 'photography', label: 'Photography' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'printing', label: 'Printing' },
    { value: 'private_equity', label: 'Private Equity' },
    { value: 'programming', label: 'Programming' },
    { value: 'public_relations', label: 'Public Relations' },
    { value: 'publishing', label: 'Publishing' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'recruitment', label: 'Recruitment' },
    { value: 'renewable_energy', label: 'Renewable Energy' },
    { value: 'research', label: 'Research' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'retail', label: 'Retail' },
    { value: 'security', label: 'Security' },
    { value: 'service_provider', label: 'Service Provider' },
    { value: 'social_media_management', label: 'Social Media Management' },
    { value: 'software_development', label: 'Software Development' },
    { value: 'sports', label: 'Sports' },
    { value: 'staffing', label: 'Staffing' },
    { value: 'telecommunications', label: 'Telecommunications' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'tourism', label: 'Tourism' },
    { value: 'trader', label: 'Trader' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'travel', label: 'Travel' },
    { value: 'tutoring', label: 'Tutoring' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'venture_capital', label: 'Venture Capital' },
    { value: 'video_production', label: 'Video Production' },
    { value: 'web_design', label: 'Web Design' },
    { value: 'web_development', label: 'Web Development' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'writing', label: 'Writing' },
    { value: 'other', label: 'Other' }
].sort((a, b) => {
    if (a.label === 'Other') return 1;
    if (b.label === 'Other') return -1;
    return a.label.localeCompare(b.label);
});

export default function RegistrationManagement() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      cnic: '',
      ntn: '',
      address: '',
      businessName: '',
      mobileNumber: '',
    },
  });

  const photoRef = form.register('photo');

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Member Data:', values);
    // You can add your toast notification here
    form.reset();
    setPhotoPreview(null);
    setFileName(null);
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('photo', file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setFileName(null);
    form.setValue('photo', null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Member Details</CardTitle>
        <CardDescription>
          Please fill in all required fields accurately. You can upload a member photo for easier
          identification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. John Doe" {...field} />
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
                        <FormLabel>CNIC</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 12345-1234567-1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <FormField
                    control={form.control}
                    name="ntn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NTN</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 1234567-8" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. +92 300 1234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 123, Main Street, City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Acme Corporation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Type of Business</FormLabel>
                        <Combobox
                          options={businessTypes}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select business type..."
                          searchPlaceholder="Search business type..."
                          notFoundText="No business type found."
                        />
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
                              <SelectValue placeholder="Select membership type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="associate">Associate</SelectItem>
                            <SelectItem value="foreign">Foreign</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="membershipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Membership Code</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. MEM-12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="membershipExpiry"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Membership Expiry</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
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
                              disabled={(date) =>
                                date < new Date() || date < new Date('1900-01-01')
                              }
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
              <div className="space-y-4 flex flex-col items-center">
                <FormLabel>Member Photo</FormLabel>
                <div className="w-48 h-48 rounded-full border-2 border-dashed flex items-center justify-center bg-muted/50 relative overflow-hidden">
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt="Member photo preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-16 w-16 text-muted-foreground" />
                  )}
                </div>
                 <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Button asChild variant="outline">
                            <label htmlFor="photo-upload" className="cursor-pointer">
                              <UploadCloud className="mr-2 h-4 w-4" />
                              Upload Photo
                              <Input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                {...photoRef}
                                onChange={handlePhotoChange}
                              />
                            </label>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {photoPreview && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{fileName}</span>
                    <Button variant="ghost" size="icon" onClick={removePhoto} className="h-6 w-6 ml-2">
                       <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg">Add Member</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

    