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
        name: 'Service Digital Marketing',
        alternateName: 'SDM',
        url: 'https://servicedigitalmarketing.com',
        logo: 'https://servicedigitalmarketing.com/logo.png',
        description: 'Professional digital marketing and advertising services across major social media and search platforms serving clients in the United States, India, and globally',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Birhana Market',
          addressLocality: 'Kanpur',
          addressRegion: 'Uttar Pradesh',
          addressCountry: 'IN'
        },
        areaServed: [
          {
            '@type': 'Country',
            name: 'United States'
          },
          {
            '@type': 'Country',
            name: 'India'
          },
          {
            '@type': 'GeoCircle',
            name: 'Global'
          }
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Sales',
          email: 'team@servicedigitalmarketing.com',
          availableLanguage: ['en-US', 'en-IN', 'hi']
        },
        sameAs: [
          'https://www.linkedin.com/company/servicedigitalmarketing/',
          'https://www.instagram.com/servicedigitalmarketing_com/',
          'https://www.facebook.com/servicedigitalmarketing.official'
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
        name: 'Service Digital Marketing',
        alternateName: 'SDM',
        url: 'https://servicedigitalmarketing.com',
        description: 'Expert digital marketing services across Facebook, Instagram, Reddit, YouTube, Google, LinkedIn, TikTok, and Snapchat serving US and global markets',
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://servicedigitalmarketing.com/search?q={search_term_string}',
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
        url: 'https://servicedigitalmarketing.com/yash-saxena',
        jobTitle: 'Digital Marketing Expert & Founder',
        description: '6.2+ years of experience in digital advertising across global markets including United States, Canada, Europe, India, Asia-Pacific, and Middle East',
        knowsAbout: [
          'Digital Marketing',
          'Social Media Advertising',
          'Facebook Ads',
          'Instagram Ads',
          'Google Ads',
          'LinkedIn Ads',
          'TikTok Ads',
          'YouTube Ads',
          'Performance Marketing',
          'US Market Advertising'
        ],
        alumniOf: 'Marketing Professional',
        worksFor: {
          '@type': 'Organization',
          name: 'Service Digital Marketing',
          url: 'https://servicedigitalmarketing.com'
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
          name: 'Service Digital Marketing',
          url: 'https://servicedigitalmarketing.com'
        },
        areaServed: [
          {
            '@type': 'Country',
            name: 'United States'
          },
          {
            '@type': 'Country',
            name: 'India'
          },
          {
            '@type': 'GeoCircle',
            name: 'Global'
          }
        ],
        availableLanguage: 'en-US',
        serviceType: 'Digital Marketing'
      }}
    />
  );
}
