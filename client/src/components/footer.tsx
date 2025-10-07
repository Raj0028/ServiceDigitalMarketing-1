import { Link } from 'wouter';
import { SiLinkedin, SiInstagram, SiFacebook } from 'react-icons/si';
import logoPath from '@assets/SDM logo B - Copy_1759514538263.png';

const platformLinks = [
  { name: 'Facebook Ads', path: '/facebook-ads' },
  { name: 'Instagram Ads', path: '/instagram-ads' },
  { name: 'Google Ads', path: '/google-ads' },
  { name: 'LinkedIn Ads', path: '/linkedin-ads' },
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img src={logoPath} alt="SDM Logo" className="h-12 mb-4 filter brightness-0 invert" />
            <p className="text-white/70 text-sm">Expert paid advertising solutions for businesses worldwide since 2017.</p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Platforms</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {platformLinks.map((platform) => (
                <li key={platform.path}>
                  <Link 
                    href={platform.path} 
                    className="hover:text-white transition-colors"
                    data-testid={`footer-${platform.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {platform.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <button
                  onClick={() => {
                    window.location.href = '/#about';
                  }}
                  className="hover:text-white transition-colors"
                  data-testid="footer-about"
                >
                  About Us
                </button>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors" data-testid="footer-contact">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/servicedigitalmarketing/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                data-testid="footer-linkedin"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/servicedigitalmarketing_com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                data-testid="footer-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/servicedigitalmarketing.official" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                data-testid="footer-facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/70">
          <p>&copy; 2024 Service Digital Marketing. All rights reserved. | Founded in 2017</p>
        </div>
      </div>
    </footer>
  );
}
