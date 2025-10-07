import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import InquiryForm from '@/components/inquiry-form';
import { ServiceSchema } from '@/components/structured-data';
import { SiFacebook } from 'react-icons/si';
import { Users, Crosshair, BarChart3 } from 'lucide-react';
import { useSEO } from '@/hooks/use-seo';

export default function FacebookAds() {
  useSEO({
    title: 'Facebook Ads Management - Expert Social Media Advertising Services',
    description: 'Professional Facebook advertising services with precision targeting for 2.9B+ users. Expert campaign management, advanced analytics, and proven ROI. Get started with Facebook ads today.',
    ogTitle: 'Facebook Ads That Convert - Expert Campaign Management',
    ogDescription: 'Leverage Facebook\'s powerful targeting to reach your ideal customers. Professional ad management with proven results across 2.9 billion active users.',
    canonical: 'https://servicedigitalmarketing.com/facebook-ads',
    ogUrl: 'https://servicedigitalmarketing.com/facebook-ads',
  });

  return (
    <div className="min-h-screen bg-background">
      <ServiceSchema 
        serviceName="Facebook Ads Management" 
        description="Professional Facebook advertising services with precision targeting for 2.9B+ users. Expert campaign management, advanced analytics, and proven ROI."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6" data-testid="platform-badge">
                <SiFacebook className="text-2xl mr-3" />
                <span className="font-semibold">Facebook Advertising</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
                Facebook Ads That Convert
              </h1>
              
              <p className="text-lg sm:text-xl text-white/90 mb-8" data-testid="hero-description">
                Leverage Facebook's powerful targeting capabilities to reach your ideal customers. With 2.9 billion active users, your audience is here.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-users">
                  <Users className="mr-2 h-5 w-5" />
                  2.9B+ Users
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-targeting">
                  <Crosshair className="mr-2 h-5 w-5" />
                  Precision Targeting
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-analytics">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Advanced Analytics
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Facebook ads manager interface with campaign metrics and performance data" 
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
            platform="facebook" 
            platformName="Facebook Ads"
          />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
