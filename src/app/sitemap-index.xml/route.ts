import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/lib/seo';

export async function GET(request: NextRequest) {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main sitemap for static pages -->
  <sitemap>
    <loc>${siteConfig.url}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  
  <!-- UMKM sitemap for dynamic UMKM pages -->
  <sitemap>
    <loc>${siteConfig.url}/sitemap-umkm.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  
  <!-- Tourism sitemap for dynamic tourism destination pages -->
  <sitemap>
    <loc>${siteConfig.url}/sitemap-pariwisata.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  
  <!-- Future sitemaps can be added here -->
  <!-- Example: Articles, Events -->
</sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=1800', // 1 hour cache
    },
  });
}
