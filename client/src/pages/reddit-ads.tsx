import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import InquiryForm from '@/components/inquiry-form';
import { ServiceSchema } from '@/components/structured-data';
import { SiReddit } from 'react-icons/si';
import { MessageCircle, Users, Megaphone } from 'lucide-react';
import { useSEO } from '@/hooks/use-seo';

export default function RedditAds() {
  useSEO({
    title: 'Reddit Ads Management - Community-Focused Advertising Services',
    description: 'Professional Reddit advertising for 430M+ users across 100K+ niche communities. Authentic engagement with passionate audiences. Expert campaign management for brands seeking genuine connections.',
    ogTitle: 'Reddit Ads - Engage Passionate Communities',
    ogDescription: 'Reach highly engaged niche communities on Reddit. Professional ad management for authentic connections with 430M+ active users across specialized subreddits.',
    canonical: 'https://servicedigitalmarketing.com/reddit-ads',
    ogUrl: 'https://servicedigitalmarketing.com/reddit-ads',
  });

  return (
    <div className="min-h-screen bg-background">
      <ServiceSchema 
        serviceName="Reddit Ads Management" 
        description="Professional Reddit advertising for 430M+ users across 100K+ niche communities. Authentic engagement with passionate audiences."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-gradient-to-br from-orange-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6" data-testid="platform-badge">
                <SiReddit className="text-2xl mr-3" />
                <span className="font-semibold">Reddit Advertising</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
                Engage Passionate Communities
              </h1>
              
              <p className="text-lg sm:text-xl text-white/90 mb-8" data-testid="hero-description">
                Reach highly engaged, niche communities on Reddit. Perfect for brands seeking authentic connections with their audience.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-users">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  430M+ Users
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-communities">
                  <Users className="mr-2 h-5 w-5" />
                  100K+ Communities
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center" data-testid="stat-engagement">
                  <Megaphone className="mr-2 h-5 w-5" />
                  Authentic Engagement
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1614028674490-d12fd4eaa168?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Reddit mobile app on smartphone showing community engagement and discussions" 
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
            platform="reddit" 
            platformName="Reddit Ads"
          />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
