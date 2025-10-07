import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export function useSEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonical,
  noindex = false,
  nofollow = false
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    const removeMetaTag = (name: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      const element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (element) {
        element.remove();
      }
    };

    const setCanonical = (url: string) => {
      let element = document.querySelector('link[rel="canonical"]');
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      
      element.setAttribute('href', url);
    };

    const removeCanonical = () => {
      const element = document.querySelector('link[rel="canonical"]');
      if (element) {
        element.remove();
      }
    };

    setMetaTag('description', description);
    setMetaTag('og:title', ogTitle || title, true);
    setMetaTag('og:description', ogDescription || description, true);
    
    if (ogImage) {
      setMetaTag('og:image', ogImage, true);
      setMetaTag('twitter:image', ogImage);
    } else {
      removeMetaTag('og:image', true);
      removeMetaTag('twitter:image');
    }
    
    if (ogUrl) {
      setMetaTag('og:url', ogUrl, true);
    } else {
      removeMetaTag('og:url', true);
    }
    
    setMetaTag('og:type', 'website', true);
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', ogTitle || title);
    setMetaTag('twitter:description', ogDescription || description);

    if (canonical) {
      setCanonical(canonical);
    } else {
      removeCanonical();
    }

    if (noindex || nofollow) {
      const robotsContent = [
        noindex ? 'noindex' : 'index',
        nofollow ? 'nofollow' : 'follow'
      ].join(', ');
      setMetaTag('robots', robotsContent);
    } else {
      removeMetaTag('robots');
    }
  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl, canonical, noindex, nofollow]);
}
