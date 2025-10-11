import { useState } from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertInquirySchema, type InsertInquiry } from '@shared/schema';
import { ArrowRight, Loader2 } from 'lucide-react';

interface InquiryFormProps {
  platform: string;
  platformName: string;
  onSuccess?: () => void;
}

const countries = [
  { value: 'US', label: 'United States' },
  { value: 'AU', label: 'Australia' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'IN', label: 'India' },
  { value: 'SG', label: 'Singapore' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'other', label: 'Other' },
];

export default function InquiryForm({ platform, platformName, onSuccess }: InquiryFormProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      country: '',
      message: '',
      platform: platform as any,
    },
  });

  const submitInquiry = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const response = await apiRequest('POST', '/api/inquiries', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Inquiry Submitted!',
        description: `Your ${platformName} inquiry has been received. We'll get back to you within 24 hours.`,
      });
      
      // Redirect to thank you page
      setLocation(`/${platform}-thank-you`);
      
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: any) => {
      console.error('Form submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your inquiry. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    submitInquiry.mutate(data);
  };

  return (
    <div className="bg-secondary rounded-2xl p-8 sm:p-12">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center" data-testid="form-title">
        Kindly fill the enquiry form
      </h2>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="form-description">
        Fill out the form below and our {platformName} experts will get back to you within 24 hours with a customized strategy.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="inquiry-form">
          <div className="grid sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name" 
                      {...field} 
                      className="form-input"
                      data-testid="input-name"
                    />
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
                  <FormLabel>Contact Number *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your phone number" 
                      type="tel"
                      {...field} 
                      className="form-input"
                      data-testid="input-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your email address" 
                      type="email"
                      {...field} 
                      className="form-input"
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="form-input" data-testid="select-country">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem 
                          key={country.value} 
                          value={country.value}
                          data-testid={`country-${country.value}`}
                        >
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tell Us About Your Business & Advertising Goals *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={`Please describe your business, target audience, budget range, and what you're looking to achieve with ${platformName}...`}
                    rows={6}
                    className="form-input resize-none"
                    {...field}
                    data-testid="textarea-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="btn-primary w-full text-white px-8 py-4 rounded-lg font-semibold text-lg"
            disabled={submitInquiry.isPending}
            data-testid="submit-button"
          >
            {submitInquiry.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Inquiry <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
