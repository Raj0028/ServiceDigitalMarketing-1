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
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-transform lg:hidden z-50">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <img src={logoPath} alt="SDM Logo" className="h-10" />
              <button onClick={closeMobileMenu} className="text-foreground" data-testid="mobile-menu-close">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
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
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                data-testid="mobile-nav-about"
              >
                About Us
              </button>
              
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                data-testid="mobile-nav-contact"
              >
                Contact
              </Link>
              
              <div className="border-t border-border pt-4 mt-4">
                <p className="text-sm font-semibold text-muted-foreground mb-3">Advertising Platforms</p>
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <Link
                      key={platform.path}
                      href={platform.path}
                      onClick={closeMobileMenu}
                      className="flex items-center py-2 text-foreground hover:text-primary transition-colors"
                      data-testid={`mobile-nav-${platform.name.toLowerCase().replace(' ', '-')}`}
                    >
                      <Icon className={`mr-3 text-lg ${platform.color}`} />
                      {platform.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
