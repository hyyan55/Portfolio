import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  schema?: Record<string, any>;
}

export function usePageSeo({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  ogImage = 'https://hayyanmohamed.com/avatar.svg',
  schema
}: SeoProps) {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title.includes('Hayyan Mohamed') 
      ? title 
      : `${title} | Hayyan Mohamed (حيان محمد)`;
    document.title = fullTitle;

    // 2. Helper to set or create meta tag
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let elem = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!elem) {
        elem = document.createElement('meta');
        elem.setAttribute(attrName, attrVal);
        document.head.appendChild(elem);
      }
      elem.setAttribute('content', content);
    };

    // Description & OpenGraph
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // 3. Update Canonical link
    const baseUrl = 'https://hayyanmohamed.com';
    const canonicalUrl = `${baseUrl}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('name', 'twitter:url', canonicalUrl);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 4. Inject JSON-LD Structured Data
    const scriptId = 'page-json-ld-schema';
    let scriptElem = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (schema) {
      if (!scriptElem) {
        scriptElem = document.createElement('script');
        scriptElem.id = scriptId;
        scriptElem.type = 'application/ld+json';
        document.head.appendChild(scriptElem);
      }
      scriptElem.textContent = JSON.stringify(schema);
    } else if (scriptElem) {
      scriptElem.remove();
    }

    // Scroll to top on page navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      // Cleanup custom schema on unmount if needed
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [title, description, canonicalPath, ogType, ogImage, JSON.stringify(schema)]);
}
