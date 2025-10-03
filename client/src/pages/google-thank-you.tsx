import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Link } from 'wouter';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GoogleThankYou() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="min-h-screen flex items-center justify-center py-16 bg-gradient-to-br from-blue-500 to-green-500">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="success-checkmark w-24 h-24 mx-auto mb-8 bg-white rounded-full flex items-center justify-center" data-testid="success-checkmark">
            <CheckCircle className="text-4xl text-blue-600 w-12 h-12" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" data-testid="thank-you-title">Thank You!</h1>
          <p className="text-xl mb-4" data-testid="thank-you-subtitle">Your Google Ads inquiry has been received.</p>
          <p className="text-lg text-white/90 mb-8" data-testid="thank-you-description">
            Our Google Ads specialists will perform keyword research and create a search strategy within 24 hours.
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-8" data-testid="next-steps">
            <p className="font-semibold mb-2">What's Next?</p>
            <ul className="text-left space-y-2 text-white/90">
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Comprehensive keyword research
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Search and display campaign strategy
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Detailed ROI projection within 24 hours
              </li>
            </ul>
          </div>
          
          <Link href="/">
            <Button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all" data-testid="back-to-home">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
