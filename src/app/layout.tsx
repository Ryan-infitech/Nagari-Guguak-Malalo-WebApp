import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { siteConfig } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/seo/structured-data';

import '@/app/globals.css';

// Add separate viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: '%s | Nagari Guguak Malalo',
    default: 'Nagari Guguak Malalo',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'Nagari Guguak Malalo' }],
  creator: 'Nagari Guguak Malalo',
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@guguakmalalo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': 300,
    },
  },
  // Enhanced metadata for AI crawlers
  other: {
    // AI accessibility indicators
    'ai-crawl-friendly': 'true',
    'content-language': 'id-ID',
    'geo.region': 'ID-SB',
    'geo.placename': 'Nagari Guguak Malalo',
    'geo.position': '-0.59915;100.4981',
    ICBM: '-0.59915, 100.4981',

    // Content classification for AI
    'content-type': 'government-portal',
    subject: 'Indonesian Local Government Digital Portal',
    classification: 'Government, Tourism, Business, Community',
    coverage: 'Nagari Guguak Malalo, Tanah Datar, West Sumatra, Indonesia',

    // AI crawler specific meta
    'chatgpt-crawl': 'allow',
    'claude-crawl': 'allow',
    'perplexity-crawl': 'allow',
    'bard-crawl': 'allow',

    // Accessibility
    accessibility: 'WCAG 2.1 AA compliant',
    'mobile-web-app-capable': 'yes',

    // API endpoint for AI
    'ai-data-endpoint': `${siteConfig.url}/api/ai-crawl`,
  },
  // Remove viewport from here
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="xf4_OhRXxouH3i86kdP-C0QAyJkdSGZBl2HQ09b8W5Y"
        />

        {/* AI Crawlers Discovery Links */}
        <link
          rel="alternate"
          type="application/json"
          href={`${siteConfig.url}/api/ai-crawl`}
          title="AI Crawl Data"
        />
        <link
          rel="alternate"
          type="application/json"
          href={`${siteConfig.url}/api/ai-crawl?section=tourism`}
          title="Tourism Data for AI"
        />
        <link
          rel="alternate"
          type="application/json"
          href={`${siteConfig.url}/api/ai-crawl?section=business`}
          title="Business Data for AI"
        />

        {/* Add preload for critical assets */}
        <link rel="preload" href="/gumalawhitebgg.png" as="image" type="image/png" />
        {/* Add preconnect for third-party resources if any */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Favicon links */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <LocalBusinessSchema />
        <Providers>
          <ScrollToTop />
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
