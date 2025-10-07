import { Link } from 'wouter';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { SiFacebook, SiInstagram, SiReddit, SiYoutube, SiGoogle, SiLinkedin, SiTiktok, SiSnapchat } from 'react-icons/si';
import { Target, Globe, TrendingUp, ArrowRight, Users, BarChart3, CheckCircle } from 'lucide-react';
import { useSEO } from '@/hooks/use-seo';

const platforms = [
  {
    name: 'Facebook Ads',
    path: '/facebook-ads',
    icon: SiFacebook,
    color: 'hover:border-blue-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    description: 'Reach billions with precision targeting and diverse ad formats.'
  },
  {
    name: 'Instagram Ads',
    path: '/instagram-ads',
    icon: SiInstagram,
    color: 'hover:border-pink-500',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    description: 'Visual storytelling that captivates and converts audiences.'
  },
  {
    name: 'Reddit Ads',
    path: '/reddit-ads',
    icon: SiReddit,
    color: 'hover:border-orange-500',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    description: 'Engage passionate communities with authentic messaging.'
  },
  {
    name: 'YouTube Ads',
    path: '/youtube-ads',
    icon: SiYoutube,
    color: 'hover:border-red-500',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    description: 'Video advertising that captures attention and drives action.'
  },
  {
    name: 'Google Ads',
    path: '/google-ads',
    icon: SiGoogle,
    color: 'hover:border-blue-400',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    description: 'Dominate search results and display networks worldwide.'
  },
  {
    name: 'LinkedIn Ads',
    path: '/linkedin-ads',
    icon: SiLinkedin,
    color: 'hover:border-blue-700',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    description: 'B2B advertising that reaches decision-makers effectively.'
  },
  {
    name: 'TikTok Ads',
    path: '/tiktok-ads',
    icon: SiTiktok,
    color: 'hover:border-gray-800',
    iconBg: 'bg-gray-100',
    iconColor: 'text-black',
    description: 'Viral-worthy content that resonates with Gen Z and millennials.'
  },
  {
    name: 'Snapchat Ads',
    path: '/snapchat-ads',
    icon: SiSnapchat,
    color: 'hover:border-yellow-400',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-400',
    description: 'Immersive AR experiences and youth-focused campaigns.'
  },
];

export default function Home() {
  useSEO({
    title: 'Digital Marketing Services - Expert Social Media & Search Advertising',
    description: 'Professional digital marketing and advertising services across Facebook, Instagram, Reddit, YouTube, Google, LinkedIn, TikTok, and Snapchat. Get expert campaign management and ROI-driven results.',
    ogTitle: 'Expert Digital Marketing & Paid Advertising Services',
    ogDescription: 'Drive real results with professional paid advertising campaigns across all major platforms. Expert campaign management for lead generation and brand awareness.',
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient pt-24 sm:pt-32 pb-20 sm:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
                Amplify Your Brand with 
                <span className="block mt-2">Paid Advertising</span>
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-white/90 leading-relaxed" data-testid="hero-description">
                Expert paid advertising campaigns that drive real results. From lead generation to brand awareness, we've got you covered across all major platforms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('platforms')}
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-center hover:bg-opacity-90 transition-all transform hover:scale-105"
                  data-testid="hero-explore-platforms"
                >
                  Explore Platforms
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-center hover:bg-white/30 transition-all border border-white/30"
                  data-testid="hero-learn-more"
                >
                  Learn More
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div data-testid="stat-experience">
                  <div className="text-3xl sm:text-4xl font-bold mb-1">8+</div>
                  <div className="text-white/80 text-sm">Years Experience</div>
                </div>
                <div data-testid="stat-markets">
                  <div className="text-3xl sm:text-4xl font-bold mb-1">50+</div>
                  <div className="text-white/80 text-sm">Global Markets</div>
                </div>
                <div data-testid="stat-campaigns">
                  <div className="text-3xl sm:text-4xl font-bold mb-1">1000+</div>
                  <div className="text-white/80 text-sm">Campaigns</div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Digital marketing dashboard with analytics and advertising metrics" 
                className="rounded-2xl shadow-2xl animate-float"
                data-testid="hero-image"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Platforms Section */}
      <section id="platforms" className="py-16 sm:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text" data-testid="platforms-title">
              Advertise Where Your Audience Is
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="platforms-description">
              We specialize in creating high-performing paid advertising campaigns across all major platforms. Choose your platform and let's get started.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <Link
                  key={platform.path}
                  href={platform.path}
                  className={`platform-card bg-white rounded-2xl p-6 cursor-pointer border border-border ${platform.color} block text-center`}
                  data-testid={`platform-card-${platform.name.toLowerCase().replace(' ', '-')}`}
                >
                  <div className={`w-16 h-16 ${platform.iconBg} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className={`text-3xl ${platform.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{platform.name}</h3>
                  <p className="text-muted-foreground mb-4">{platform.description}</p>
                  <div className="flex items-center justify-center text-primary font-semibold">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section id="about" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional marketing team collaborating on advertising strategy" 
                className="rounded-2xl shadow-xl"
                data-testid="about-image"
              />
            </div>
            
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" data-testid="about-title">
                8+ Years of Paid Advertising Excellence
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="about-description">
                Since our founding in 2017, Service Digital Marketing has been at the forefront of paid advertising innovation. We've helped businesses across the globe achieve remarkable growth through strategic, data-driven campaigns.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start" data-testid="feature-global">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Globe className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Global Market Expertise</h3>
                    <p className="text-muted-foreground">Successfully managed campaigns across US, Australian, APAC, and EMEA markets with localized strategies.</p>
                  </div>
                </div>
                
                <div className="flex items-start" data-testid="feature-campaigns">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Target className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Full-Funnel Campaigns</h3>
                    <p className="text-muted-foreground">Expert in lead generation, sales conversion, brand awareness, app installs, and every campaign type in between.</p>
                  </div>
                </div>
                
                <div className="flex items-start" data-testid="feature-results">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <TrendingUp className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Data-Driven Results</h3>
                    <p className="text-muted-foreground">We optimize every campaign with advanced analytics and A/B testing to maximize your ROI.</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="stat-card p-6 rounded-xl" data-testid="stat-satisfaction">
                  <div className="text-4xl font-bold mb-2 gradient-text">100%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="stat-card p-6 rounded-xl overflow-visible" data-testid="stat-spend">
                  <div className="text-4xl font-bold mb-2 gradient-text py-1">$800M+</div>
                  <div className="text-sm text-muted-foreground">Ad Spend Managed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-24 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" data-testid="cta-title">
            Ready to Scale Your Business?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white/90" data-testid="cta-description">
            Let's create a paid advertising strategy that delivers real, measurable results for your business.
          </p>
          <button 
            onClick={() => scrollToSection('platforms')}
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
            data-testid="cta-get-started"
          >
            Get Started Today
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
