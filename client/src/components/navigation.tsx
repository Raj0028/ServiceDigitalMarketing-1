import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SiFacebook, SiInstagram, SiReddit, SiYoutube, SiGoogle, SiLinkedin, SiTiktok, SiSnapchat } from 'react-icons/si';
import logoPath from '@assets/SDM logo B - Copy_1759514538263.png';

const platforms = [
  { name: 'Facebook Ads', path: '/facebook-ads', icon: SiFacebook, color: 'text-blue-600' },
  { name: 'Instagram Ads', path: '/instagram-ads', icon: SiInstagram, color: 'text-pink-600' },
  { name: 'Reddit Ads', path: '/reddit-ads', icon: SiReddit, color: 'text-orange-600' },
  { name: 'YouTube Ads', path: '/youtube-ads', icon: SiYoutube, color: 'text-red-600' },
  { name: 'Google Ads', path: '/google-ads', icon: SiGoogle, color: 'text-blue-500' },
  { name: 'LinkedIn Ads', path: '/linkedin-ads', icon: SiLinkedin, color: 'text-blue-700' },
  { name: 'TikTok Ads', path: '/tiktok-ads', icon: SiTiktok, color: 'text-black' },
  { name: 'Snapchat Ads', path: '/snapchat-ads', icon: SiSnapchat, color: 'text-yellow-400' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <Link href="/" onClick={closeMobileMenu}>
              <img 
                src={logoPath} 
                alt="Service Digital Marketing Logo" 
                className="h-10 sm:h-12 w-auto"
                data-testid="logo"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === '/' ? 'text-primary' : 'text-foreground'
              }`}
              data-testid="nav-home"
            >
              Home
            </Link>
            
            <button
              onClick={() => {
                if (location === '/') {
                  scrollToSection('about');
                } else {
                  window.location.href = '/#about';
                }
              }}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              data-testid="nav-about"
            >
              About Us
            </button>
            
            <div className="relative group">
              <button className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center" data-testid="nav-platforms">
                Platforms <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <Link
                      key={platform.path}
                      href={platform.path}
                      className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors"
                      data-testid={`nav-${platform.name.toLowerCase().replace(' ', '-')}`}
                    >
                      <Icon className={`mr-3 text-lg ${platform.color}`} />
                      {platform.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === '/contact' ? 'text-primary' : 'text-foreground'
              }`}
              data-testid="nav-contact"
            >
              Contact
            </Link>
            
            <button
              onClick={() => {
                if (location === '/') {
                  scrollToSection('platforms');
                } else {
                  window.location.href = '/#platforms';
                }
              }}
              className="btn-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold"
              data-testid="nav-get-started"
            >
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-foreground"
            data-testid="mobile-menu-button"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 lg:hidden z-50 animate-in fade-in duration-200"
            onClick={closeMobileMenu}
            data-testid="mobile-menu-backdrop"
          />
          
          {/* Menu Panel - Slides from Right */}
          <div 
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl lg:hidden z-50 overflow-y-auto animate-in slide-in-from-right duration-300"
            data-testid="mobile-menu-panel"
          >
            {/* Close Button */}
            <div className="flex justify-end p-4 border-b border-border">
              <button 
                onClick={closeMobileMenu} 
                className="text-foreground hover:text-primary transition-colors p-2" 
                data-testid="mobile-menu-close"
                aria-label="Close menu"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
            
            {/* Menu Content */}
            <div className="px-4 py-6">
              {/* Main Navigation */}
              <div className="space-y-1 mb-6">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="block text-xl font-semibold text-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-secondary"
                  data-testid="mobile-nav-home"
                >
                  Home
                </Link>
                
                <button
                  onClick={() => {
                    if (location === '/') {
                      scrollToSection('about');
                    } else {
                      window.location.href = '/#about';
                    }
                    closeMobileMenu();
                  }}
                  className="block w-full text-left text-xl font-semibold text-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-secondary"
                  data-testid="mobile-nav-about"
                >
                  About Us
                </button>
                
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="block text-xl font-semibold text-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-secondary"
                  data-testid="mobile-nav-contact"
                >
                  Contact
                </Link>
              </div>
              
              {/* Platforms Section */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                  Advertising Platforms
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <Link
                        key={platform.path}
                        href={platform.path}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-2 py-3 px-3 text-foreground hover:text-primary transition-colors rounded-lg border border-border hover:border-primary hover:bg-secondary"
                        data-testid={`mobile-nav-${platform.name.toLowerCase().replace(' ', '-')}`}
                      >
                        <Icon className={`text-xl ${platform.color}`} />
                        <span className="text-sm font-medium">{platform.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (location === '/') {
                      scrollToSection('platforms');
                    } else {
                      window.location.href = '/#platforms';
                    }
                    closeMobileMenu();
                  }}
                  className="w-full btn-primary text-white px-6 py-4 rounded-lg text-lg font-semibold"
                  data-testid="mobile-nav-get-started"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
