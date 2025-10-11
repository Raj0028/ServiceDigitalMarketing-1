import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import InquiryForm from '@/components/inquiry-form';
import { ServiceSchema } from '@/components/structured-data';
import { SiGoogle } from 'react-icons/si';
import { Search, Target, Globe } from 'lucide-react';
import { useSEO } from '@/hooks/use-seo';

export default function GoogleAds() {
  useSEO({
    title: 'Google Ads Management - Search & Display Advertising Services',
    description: 'Professional Google Ads management with 5.6B daily searches. Intent-based targeting, global reach, expert PPC campaign optimization. Dominate search results and display networks.',
    ogTitle: 'Google Ads - Dominate Search Results',
    ogDescription: 'Reach customers at the exact moment they\'re searching for your products. Professional Google Ads management delivering intent-driven traffic and conversions.',
    canonical: 'https://servicedigitalmarketing.com/google-ads',
    ogUrl: 'https://servicedigitalmarketing.com/google-ads',
  });

  return (
    <div className="min-h-screen bg-background">
      <ServiceSchema 
        serviceName="Google Ads Management" 
        description="Professional Google Ads management with 5.6B daily searches. Intent-based targeting, global reach, expert PPC campaign optimization."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-gradient-to-br from-blue-500 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6" data-testid="platform-badge">
                <SiGoogle className="text-2xl mr-3" />
                <span className="font-semibold">Google Advertising</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
                Dominate Search Results
              </h1>
              
              <p className="text-lg sm:text-xl text-white/90 mb-8" data-testid="hero-description">
                Reach customers at the exact moment they're searching for your products or services. Google Ads delivers intent-driven traffic.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-searches">
                  <Search className="mr-2 h-5 w-5" />
                  5.6B Searches/Day
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-intent">
                  <Target className="mr-2 h-5 w-5" />
                  Intent-Based
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-reach">
                  <Globe className="mr-2 h-5 w-5" />
                  Global Reach
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Google Analytics dashboard displaying campaign performance metrics and data insights" 
                className="rounded-2xl shadow-2xl"
                data-testid="hero-image"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <InquiryForm 
            platform="google" 
            platformName="Google Ads"
          />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
