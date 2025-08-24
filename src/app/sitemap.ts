import { siteConfig } from '@/lib/seo';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  // Define your main routes with proper SEO priorities
  const routes = [
    { route: '', priority: 1.0, changeFreq: 'daily' },
    { route: '/umkm', priority: 0.9, changeFreq: 'daily' },
    { route: '/pariwisata', priority: 0.8, changeFreq: 'weekly' },
    { route: '/layanan', priority: 0.8, changeFreq: 'monthly' },
    { route: '/informasi', priority: 0.7, changeFreq: 'weekly' },
    { route: '/profil', priority: 0.6, changeFreq: 'monthly' },
    { route: '/kontak', priority: 0.5, changeFreq: 'monthly' },
    { route: '/team-developer', priority: 0.4, changeFreq: 'monthly' },
    { route: '/sitemap', priority: 0.4, changeFreq: 'monthly' },

    // Service pages
    { route: '/layanan/domisili', priority: 0.7, changeFreq: 'monthly' },
    { route: '/layanan/sktm', priority: 0.7, changeFreq: 'monthly' },
    { route: '/layanan/umkm', priority: 0.7, changeFreq: 'monthly' },

    // Legal pages
    { route: '/privacy', priority: 0.3, changeFreq: 'yearly' },
    { route: '/terms', priority: 0.3, changeFreq: 'yearly' },
  ].map(({ route, priority, changeFreq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: changeFreq as any,
    priority: priority,
  }));

  // Note: UMKM detail pages are handled by sitemap-umkm.xml
  // This keeps the main sitemap focused on static/semi-static pages

  return [...routes];
}
