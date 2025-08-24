import { NextRequest, NextResponse } from 'next/server';
import { UMKMService } from '@/api/services/umkm.service';
import { siteConfig } from '@/lib/seo';

export async function GET(request: NextRequest) {
  try {
    const umkmService = new UMKMService();

    // Get all published UMKMs
    const umkmsResponse = await umkmService.getPublishedUMKMs({
      limit: 1000, // Get all UMKMs
      sortBy: 'updatedAt',
      sortOrder: 'desc',
    });

    const umkms = umkmsResponse.data || [];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Main UMKM listing page -->
  <url>
    <loc>${siteConfig.url}/umkm</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  ${umkms
    .map((umkm) => {
      const imageUrl =
        umkm.mainImageUrl ||
        umkm.logoUrl ||
        (umkm.images && umkm.images.length > 0 ? umkm.images[0] : null);
      const lastMod = new Date(umkm.updatedAt || umkm.createdAt).toISOString();

      return `
  <!-- ${umkm.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')} -->
  <url>
    <loc>${siteConfig.url}/umkm/${umkm.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${
      imageUrl
        ? `
    <image:image>
      <image:loc>${imageUrl.startsWith('http') ? imageUrl : `${siteConfig.url}${imageUrl}`}</image:loc>
      <image:title>${umkm.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
      <image:caption>${(umkm.description || `${umkm.name} - UMKM di Nagari Guguak Malalo`).substring(0, 200).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:caption>
      <image:geo_location>Nagari Guguak Malalo, Sumatera Barat, Indonesia</image:geo_location>
    </image:image>`
        : ''
    }
  </url>`;
    })
    .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200', // 24 hours cache
      },
    });
  } catch (error) {
    console.error('Error generating UMKM sitemap:', error);

    // Return basic sitemap with just UMKM listing page if API fails
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.url}/umkm</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=1800', // 1 hour cache on error
      },
    });
  }
}
