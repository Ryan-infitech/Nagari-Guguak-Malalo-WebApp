import { siteConfig } from '@/lib/seo';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for all crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/auth/',
          '/api/upload/',
          '/_next/',
          '/portal-warga/dashboard/',
          '/portal-warga/profile/',
        ],
      },

      // Specific rules for AI crawlers - ALLOW ACCESS for web search
      {
        userAgent: 'GPTBot', // OpenAI ChatGPT
        allow: [
          '/',
          '/pariwisata',
          '/pariwisata/*',
          '/umkm',
          '/umkm/*',
          '/layanan',
          '/layanan/*',
          '/informasi',
          '/informasi/*',
          '/profil',
          '/kontak',
          '/berita',
          '/berita/*',
        ],
        disallow: ['/admin/', '/portal-warga/', '/api/'],
      },

      {
        userAgent: 'ChatGPT-User', // ChatGPT browsing
        allow: [
          '/',
          '/pariwisata',
          '/pariwisata/*',
          '/umkm',
          '/umkm/*',
          '/layanan',
          '/informasi',
          '/profil',
          '/kontak',
        ],
        disallow: ['/admin/', '/portal-warga/', '/api/'],
      },

      {
        userAgent: 'Claude-Web', // Anthropic Claude
        allow: [
          '/',
          '/pariwisata',
          '/pariwisata/*',
          '/umkm',
          '/umkm/*',
          '/layanan',
          '/informasi',
          '/profil',
          '/kontak',
        ],
        disallow: ['/admin/', '/portal-warga/', '/api/'],
      },

      {
        userAgent: 'PerplexityBot', // Perplexity AI
        allow: [
          '/',
          '/pariwisata',
          '/pariwisata/*',
          '/umkm',
          '/umkm/*',
          '/layanan',
          '/informasi',
          '/profil',
        ],
      },

      {
        userAgent: 'Bard', // Google Bard
        allow: [
          '/',
          '/pariwisata',
          '/pariwisata/*',
          '/umkm',
          '/umkm/*',
          '/layanan',
          '/informasi',
          '/profil',
        ],
      },

      // Block training crawlers but allow search crawlers
      {
        userAgent: 'CCBot', // Common Crawl (for training)
        disallow: '/',
      },

      {
        userAgent: 'Google-Extended', // Google's training data crawler
        disallow: '/',
      },

      // Traditional search engines with crawl delay
      {
        userAgent: 'bingbot',
        allow: '/',
        crawlDelay: 1,
      },

      {
        userAgent: 'slurp', // Yahoo
        allow: '/',
        crawlDelay: 2,
      },
    ],

    sitemap: [
      `${siteConfig.url}/sitemap-index.xml`,
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/sitemap-umkm.xml`,
      `${siteConfig.url}/sitemap-pariwisata.xml`,
    ],

    host: siteConfig.url,
  };
}
