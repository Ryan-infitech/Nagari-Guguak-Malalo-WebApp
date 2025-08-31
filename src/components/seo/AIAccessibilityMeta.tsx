import Head from 'next/head';
import { siteConfig } from '@/lib/seo';

interface AIAccessibilityMetaProps {
  title?: string;
  description?: string;
  keywords?: string[];
  contentType?: 'tourism' | 'business' | 'service' | 'information' | 'general';
  lastModified?: string;
}

export function AIAccessibilityMeta({
  title = siteConfig.name,
  description = siteConfig.description,
  keywords = [],
  contentType = 'general',
  lastModified,
}: AIAccessibilityMetaProps) {
  // Enhanced keywords for AI understanding
  const aiKeywords = [
    ...siteConfig.keywords,
    ...keywords,
    // AI-specific context keywords
    'indonesia government portal',
    'west sumatra tourism',
    'minangkabau culture',
    'local business directory',
    'community services',
    'digital village platform',
  ];

  // Structured content hints for AI
  const contentContext = {
    tourism: 'Tourism destinations, attractions, and travel information in Nagari Guguak Malalo',
    business: 'Local businesses, UMKM directory, and economic information',
    service: 'Government services, administrative procedures, and public information',
    information: 'News, announcements, and community information',
    general: 'General information about Nagari Guguak Malalo digital portal',
  };

  return (
    <Head>
      {/* AI Crawler Specific Meta Tags */}
      <meta name="robots" content="index, follow, max-snippet:300, max-image-preview:large" />
      <meta name="googlebot" content="index, follow, max-snippet:300, max-image-preview:large" />

      {/* Enhanced meta description for AI understanding */}
      <meta name="description" content={`${description} ${contentContext[contentType]}`} />

      {/* Keywords optimized for AI search */}
      <meta name="keywords" content={aiKeywords.join(', ')} />

      {/* Content classification for AI */}
      <meta name="content-type" content={contentType} />
      <meta name="content-language" content="id-ID" />
      <meta name="geo.region" content="ID-SB" />
      <meta name="geo.placename" content="Nagari Guguak Malalo" />
      <meta name="geo.position" content="-0.59915;100.4981" />
      <meta name="ICBM" content="-0.59915, 100.4981" />

      {/* Content freshness indicators */}
      {lastModified && <meta name="last-modified" content={lastModified} />}
      <meta name="revision-date" content={new Date().toISOString()} />

      {/* AI-friendly structured hints */}
      <meta name="subject" content="Indonesian Local Government Digital Portal" />
      <meta name="abstract" content={description} />
      <meta name="summary" content={description} />
      <meta name="classification" content="Government, Tourism, Business, Community" />
      <meta name="coverage" content="Nagari Guguak Malalo, Tanah Datar, West Sumatra, Indonesia" />

      {/* Accessibility for AI screen readers */}
      <meta name="accessibility" content="WCAG 2.1 AA compliant" />

      {/* Mobile and device compatibility */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      {/* Social media optimization for AI sharing */}
      <meta property="og:locale" content="id_ID" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="article:author" content="Pemerintah Nagari Guguak Malalo" />
      <meta property="article:publisher" content={siteConfig.url} />

      {/* Twitter Card for AI services */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@guguakmalalo" />

      {/* Schema.org hints for AI understanding */}
      <link rel="schema.dc" href="http://purl.org/dc/elements/1.1/" />
      <meta name="dc.title" content={title} />
      <meta name="dc.description" content={description} />
      <meta name="dc.subject" content={aiKeywords.slice(0, 10).join(', ')} />
      <meta name="dc.language" content="id" />
      <meta name="dc.coverage" content="Nagari Guguak Malalo" />
      <meta name="dc.publisher" content="Pemerintah Nagari Guguak Malalo" />
      <meta name="dc.rights" content="© 2025 Nagari Guguak Malalo" />

      {/* Canonical URL for AI deduplication */}
      <link
        rel="canonical"
        href={typeof window !== 'undefined' ? window.location.href : siteConfig.url}
      />

      {/* Alternate language hints (future expansion) */}
      <link rel="alternate" hrefLang="id" href={siteConfig.url} />
      <link rel="alternate" hrefLang="x-default" href={siteConfig.url} />
    </Head>
  );
}

// Specific implementations for different content types
export const TourismAIMeta = (props: Omit<AIAccessibilityMetaProps, 'contentType'>) => (
  <AIAccessibilityMeta {...props} contentType="tourism" />
);

export const BusinessAIMeta = (props: Omit<AIAccessibilityMetaProps, 'contentType'>) => (
  <AIAccessibilityMeta {...props} contentType="business" />
);

export const ServiceAIMeta = (props: Omit<AIAccessibilityMetaProps, 'contentType'>) => (
  <AIAccessibilityMeta {...props} contentType="service" />
);

export const InformationAIMeta = (props: Omit<AIAccessibilityMetaProps, 'contentType'>) => (
  <AIAccessibilityMeta {...props} contentType="information" />
);
