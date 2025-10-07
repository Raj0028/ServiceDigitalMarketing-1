import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import InquiryForm from '@/components/inquiry-form';
import { ServiceSchema } from '@/components/structured-data';
import { SiSnapchat } from 'react-icons/si';
import { Users, Camera, Zap } from 'lucide-react';
import { useSEO } from '@/hooks/use-seo';

export default function SnapchatAds() {
  useSEO({
    title: 'Snapchat Ads Management - AR & Youth-Focused Advertising',
    description: 'Professional Snapchat advertising with cutting-edge AR lenses for 750M+ young users. Immersive brand experiences, innovative ad formats, and expert campaign management.',
    ogTitle: 'Snapchat Ads - Immersive AR Experiences',
    ogDescription: 'Engage younger audiences with innovative AR lenses and creative ad formats. Professional Snapchat Ads management delivering immersive brand experiences.',
    canonical: 'https://servicedigitalmarketing.com/snapchat-ads',
    ogUrl: 'https://servicedigitalmarketing.com/snapchat-ads',
  });

  return (
    <div className="min-h-screen bg-background">
      <ServiceSchema 
        serviceName="Snapchat Ads Management" 
        description="Professional Snapchat advertising with cutting-edge AR lenses for 750M+ young users. Immersive brand experiences and innovative ad formats."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-gradient-to-br from-yellow-400 to-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6" data-testid="platform-badge">
                <SiSnapchat className="text-2xl mr-3" />
                <span className="font-semibold">Snapchat Advertising</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
                Immersive AR Experiences
              </h1>
              
              <p className="text-lg sm:text-xl text-white/90 mb-8" data-testid="hero-description">
                Engage younger audiences with cutting-edge AR lenses and creative ad formats. Snapchat delivers innovative brand experiences.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-users">
                  <Users className="mr-2 h-5 w-5" />
                  750M+ Users
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-ar">
                  <Camera className="mr-2 h-5 w-5" />
                  AR Lenses
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-audience">
                  <Zap className="mr-2 h-5 w-5" />
                  Young Audience
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Mobile phone showing augmented reality features and social media engagement" 
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
            platform="snapchat" 
            platformName="Snapchat Ads"
          />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
