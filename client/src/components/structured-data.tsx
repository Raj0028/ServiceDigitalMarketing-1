interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Person' | 'Service' | 'WebPage';
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <StructuredData
      type="Organization"
      data={{
        name: 'Yash Saxena Digital Marketing',
        url: 'https://yashsaxena.replit.app',
        logo: 'https://yashsaxena.replit.app/logo.png',
        description: 'Professional digital marketing and advertising services across major social media and search platforms',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'Global'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Sales',
          email: 'contact@yashsaxena.com'
        },
        sameAs: [
          'https://www.linkedin.com/in/yashsaxena',
          'https://twitter.com/yashsaxena'
        ]
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: 'Yash Saxena Digital Marketing',
        url: 'https://yashsaxena.replit.app',
        description: 'Expert digital marketing services across Facebook, Instagram, Reddit, YouTube, Google, LinkedIn, TikTok, and Snapchat',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://yashsaxena.replit.app/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }}
    />
  );
}

export function PersonSchema() {
  return (
    <StructuredData
      type="Person"
      data={{
        name: 'Yash Saxena',
        url: 'https://yashsaxena.replit.app/yash-saxena',
        jobTitle: 'Digital Marketing Expert',
        description: '6.2+ years of experience in digital advertising across global markets including India, Asia-Pacific, Middle East, US, Canada, and Europe',
        knowsAbout: [
          'Digital Marketing',
          'Social Media Advertising',
          'Facebook Ads',
          'Instagram Ads',
          'Google Ads',
          'LinkedIn Ads',
          'TikTok Ads',
          'YouTube Ads',
          'Performance Marketing'
        ],
        alumniOf: 'Marketing Professional',
        worksFor: {
          '@type': 'Organization',
          name: 'Yash Saxena Digital Marketing'
        }
      }}
    />
  );
}

export function ServiceSchema({ serviceName, description }: { serviceName: string; description: string }) {
  return (
    <StructuredData
      type="Service"
      data={{
        name: serviceName,
        description: description,
        provider: {
          '@type': 'Organization',
          name: 'Yash Saxena Digital Marketing'
        },
        areaServed: 'Global',
        serviceType: 'Digital Marketing'
      }}
    />
  );
}
