import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import InquiryForm from '@/components/inquiry-form';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useSEO } from '@/hooks/use-seo';

export default function Contact() {
  useSEO({
    title: 'Contact Us - Get in Touch for Digital Marketing Services',
    description: 'Contact Service Digital Marketing for expert paid advertising services. Get in touch with our team for Facebook, Instagram, Google, and other platform advertising solutions.',
    ogTitle: 'Contact Us - Service Digital Marketing',
    ogDescription: 'Ready to grow your business with paid advertising? Contact our expert team today for a consultation.',
    canonical: 'https://servicedigitalmarketing.com/contact',
    ogUrl: 'https://servicedigitalmarketing.com/contact',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="contact-title">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto" data-testid="contact-description">
              Ready to take your advertising to the next level? Contact us today and let's discuss how we can help grow your business.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info & Form Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6" data-testid="contact-info-title">
                Contact Information
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're here to help you succeed. Reach out to us through any of the following channels, and our team will get back to you shortly.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start" data-testid="contact-email">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a href="mailto:team@servicedigitalmarketing.com" className="text-primary hover:underline">
                      team@servicedigitalmarketing.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start" data-testid="contact-phone">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-muted-foreground">Available on request</p>
                  </div>
                </div>
                
                <div className="flex items-start" data-testid="contact-location">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="text-muted-foreground">Serving clients globally</p>
                  </div>
                </div>
                
                <div className="flex items-start" data-testid="contact-hours">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-secondary rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Why Choose Us?</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    8+ years of digital advertising experience
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    $800M+ in ad spend managed
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    100% client satisfaction rate
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Global market expertise
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Inquiry Form */}
            <div>
              <InquiryForm 
                platform="contact" 
                platformName="Contact"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
