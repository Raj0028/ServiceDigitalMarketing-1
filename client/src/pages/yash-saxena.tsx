import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertInquirySchema } from '@shared/schema';
import { z } from 'zod';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Award, 
  Globe, 
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  Presentation
} from 'lucide-react';
import { SiFacebook, SiInstagram, SiReddit, SiTiktok, SiYoutube, SiGoogle, SiLinkedin, SiSnapchat, SiWhatsapp, SiGooglesheets } from 'react-icons/si';
import yashImage from '@assets/Yash Saxena Image_1759658947529.jpg';

const formSchema = insertInquirySchema.extend({
  platform: z.literal('yash-saxena'),
});

type FormData = z.infer<typeof formSchema>;

export default function YashSaxena() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      message: '',
      platform: 'yash-saxena',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest('POST', '/api/inquiries', data);
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      toast({
        title: 'Message Sent!',
        description: "Thank you for your inquiry. I'll get back to you soon.",
      });
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (error: any) => {
      const errorMessage = error.message || 'Failed to submit inquiry';
      toast({
        title: 'Submission Failed',
        description: errorMessage.includes('429') 
          ? 'You have reached the maximum number of submissions. Please try again later.' 
          : 'Please try again later.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const platforms = [
    { icon: SiFacebook, name: 'Facebook Ads', color: 'text-blue-600' },
    { icon: SiInstagram, name: 'Instagram Ads', color: 'text-pink-600' },
    { icon: SiReddit, name: 'Reddit Ads', color: 'text-orange-600' },
    { icon: SiTiktok, name: 'TikTok Ads', color: 'text-gray-900' },
    { icon: SiYoutube, name: 'YouTube Ads', color: 'text-red-600' },
    { icon: SiGoogle, name: 'Google Ads', color: 'text-blue-500' },
    { icon: SiLinkedin, name: 'LinkedIn Ads', color: 'text-blue-700' },
    { icon: SiSnapchat, name: 'Snapchat Ads', color: 'text-yellow-400' },
  ];

  const openWhatsApp = () => {
    window.open('https://wa.me/918791353466', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="flex-shrink-0">
              <img 
                src={yashImage} 
                alt="Yash Saxena" 
                className="w-64 h-64 rounded-full object-cover shadow-2xl border-4 border-white"
                data-testid="img-profile"
              />
            </div>
            <div className="flex-1 text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-3" data-testid="text-name">
                Yash Saxena
              </h1>
              <p className="text-2xl text-gray-700 mb-4 font-medium" data-testid="text-title">
                Digital Advertising Specialist
              </p>
              <p className="text-xl text-gray-600 mb-6">
                6.2+ Years of Experience | BTech + MBA
              </p>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="tel:+918791353466"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    data-testid="button-call"
                  >
                    <Phone className="h-5 w-5" />
                    +91 8791353466
                  </a>
                  <Button
                    onClick={openWhatsApp}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                    data-testid="button-whatsapp"
                  >
                    <SiWhatsapp className="h-5 w-5" />
                    WhatsApp
                  </Button>
                </div>
                <div className="flex items-center gap-2" data-testid="text-email">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span className="text-lg text-gray-700">yashsaxena.personal@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3" data-testid="text-about-heading">
              <Award className="h-8 w-8 text-blue-600" />
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Experience & Expertise
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Over <span className="font-bold text-blue-600">6.2+ years</span> of mastering the art and science of digital advertising across the world's most powerful platforms. I don't just run ads—I architect growth engines that turn clicks into customers and budgets into ROI.
                </p>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-pink-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <SiFacebook className="h-4 w-4 text-blue-600" />
                      <SiInstagram className="h-4 w-4 text-pink-600" />
                      <SiReddit className="h-4 w-4 text-orange-600" />
                      <span className="font-bold text-gray-900">Primary Expertise</span>
                    </div>
                    <p className="text-sm text-gray-700">Facebook, Instagram & Reddit Ads - where I spend most of my time scaling brands</p>
                  </div>
                  <div className="bg-gradient-to-r from-red-50 to-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <SiYoutube className="h-4 w-4 text-red-600" />
                      <SiGoogle className="h-4 w-4 text-blue-500" />
                      <SiLinkedin className="h-4 w-4 text-blue-700" />
                      <SiTiktok className="h-4 w-4 text-gray-900" />
                      <SiSnapchat className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold text-gray-900">Extended Arsenal</span>
                    </div>
                    <p className="text-sm text-gray-700">YouTube, Google, LinkedIn, TikTok & Snapchat Ads - full-funnel mastery</p>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-gray-900 block">Performance Obsessed</span>
                      <span className="text-sm text-gray-700">Data-driven strategies, A/B testing, and relentless optimization to maximize every dollar spent</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Global Experience
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  I've successfully managed campaigns for clients across diverse markets, bringing a global perspective to every project.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-semibold text-gray-900">India</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-semibold text-gray-900">Asia-Pacific</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-semibold text-gray-900">Middle East</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-semibold text-gray-900">United States</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-semibold text-gray-900">Canada</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-semibold text-gray-900">Europe</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  Education
                </h3>
                <div className="space-y-2 mb-6">
                  <p className="text-gray-700">• Bachelor of Technology / Engineering</p>
                  <p className="text-gray-700">• Master of Business Administration (MBA)</p>
                </div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Languages
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700">• English (Fluent)</p>
                  <p className="text-gray-700">• Hindi (Fluent)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platforms Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center" data-testid="text-platforms-heading">
              Advertising Platforms I Specialize In
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {platforms.map((platform, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  data-testid={`platform-${platform.name.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <platform.icon className={`h-12 w-12 ${platform.color}`} />
                  <p className="text-sm font-medium text-gray-700 text-center">{platform.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Campaign Manager Screenshot Deck & Google sheet
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Explore real campaign screenshots and performance data from my past projects
            </p>
            <div className="space-y-4">
              <a
                href="https://docs.google.com/presentation/d/1zqvyAQIz5sI1x5Ic_3CJzANhuuZ37eof/edit?usp=sharing&ouid=112685130110956760197&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all group"
                data-testid="link-facebook-instagram-google-deck"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Presentation className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold">
                      Facebook, Instagram & Google Ads Campaign Manager Screenshot Deck
                    </h3>
                  </div>
                </div>
                <div className="text-2xl group-hover:translate-x-1 transition-transform">→</div>
              </a>
              
              <a
                href="https://docs.google.com/presentation/d/15Y8fziafk6P7A2_OYN2SVLTWtvVedQdR/edit?usp=sharing&ouid=112685130110956760197&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all group"
                data-testid="link-reddit-deck"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Presentation className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold">
                      Reddit Ads Campaign Manager Screenshot Deck
                    </h3>
                  </div>
                </div>
                <div className="text-2xl group-hover:translate-x-1 transition-transform">→</div>
              </a>
              
              <a
                href="https://docs.google.com/spreadsheets/d/1fJ6CNZZ5FZeWywg6iWS7GFgpuGe7I8YpGob1UgfI9KM/edit?gid=1777441820#gid=1777441820"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all group"
                data-testid="link-analytics-report"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <SiGooglesheets className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold">
                      Campaign Performance Analytics Google Sheet
                    </h3>
                  </div>
                </div>
                <div className="text-2xl group-hover:translate-x-1 transition-transform">→</div>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center" data-testid="text-contact-heading">
              Let's Grow Your Business Together
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Fill out the form below and I'll get back to you within 24 hours
            </p>

            {submitted ? (
              <div className="text-center py-12 bg-green-50 rounded-lg" data-testid="success-message">
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-700">I've received your inquiry and will get back to you soon.</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="inquiry-form">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} data-testid="input-name" />
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
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-email-form" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 234 567 8900" {...field} data-testid="input-phone" />
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
                          <FormControl>
                            <Input placeholder="Your country" {...field} data-testid="input-country" />
                          </FormControl>
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
                        <FormLabel>Tell Me About Your Business & Goals *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please describe your business, target audience, advertising goals, and budget expectations..."
                            className="min-h-[150px]"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    disabled={mutation.isPending}
                    data-testid="button-submit-inquiry"
                  >
                    {mutation.isPending ? 'Sending...' : 'Send Inquiry'}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        {/* Footer Contact */}
        <div className="mt-12 text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Prefer to reach out directly?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918791353466" className="text-blue-600 hover:underline font-medium">
              +91 8791353466
            </a>
            <span className="text-gray-400">|</span>
            <a href="mailto:yashsaxena.personal@gmail.com" className="text-blue-600 hover:underline font-medium">
              yashsaxena.personal@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
