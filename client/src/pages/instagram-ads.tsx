import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import InquiryForm from '@/components/inquiry-form';
import { SiInstagram } from 'react-icons/si';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { useSEO } from '@/hooks/use-seo';

export default function InstagramAds() {
  useSEO({
    title: 'Instagram Ads Management - Visual Social Media Advertising Services',
    description: 'Professional Instagram advertising with stunning visual campaigns for 2B+ highly engaged users. Expert management of Stories, Reels, Shopping ads, and more. Drive engagement and sales.',
    ogTitle: 'Instagram Ads - Visual Stories That Sell',
    ogDescription: 'Create captivating visual campaigns on Instagram. Professional ad management for brands that thrive on visual appeal with proven engagement and ROI.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6" data-testid="platform-badge">
                <SiInstagram className="text-2xl mr-3" />
                <span className="font-semibold">Instagram Advertising</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
                Visual Stories That Sell
              </h1>
              
              <p className="text-lg sm:text-xl text-white/90 mb-8" data-testid="hero-description">
                Create stunning visual campaigns that captivate Instagram's highly engaged audience. Perfect for brands that thrive on visual appeal.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-users">
                  <Eye className="mr-2 h-5 w-5" />
                  2B+ Users
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-engagement">
                  <Heart className="mr-2 h-5 w-5" />
                  High Engagement
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-shopping">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shopping Features
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Instagram mobile interface showing sponsored stories and feed posts" 
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
            platform="instagram" 
            platformName="Instagram Ads"
          />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
