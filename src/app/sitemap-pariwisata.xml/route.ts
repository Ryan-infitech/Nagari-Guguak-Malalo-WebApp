import { NextRequest, NextResponse } from 'next/server';
import { TourismService } from '@/api/services/tourism.service';
import { siteConfig } from '@/lib/seo';

export async function GET(request: NextRequest) {
  try {
    const tourismService = new TourismService();

    // Get all tourism destinations
    const destinationsResponse = await tourismService.getDestinations({
      page: 1,
      limit: 1000, // Get all destinations
      skip: 0,
      sortBy: 'updatedAt',
      sortOrder: 'desc',
    });

    const destinations = Array.isArray(destinationsResponse.data) ? destinationsResponse.data : [];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Main Tourism listing page -->
  <url>
    <loc>${siteConfig.url}/pariwisata</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  ${destinations
    .map((destination: any) => {
      // Get main image URL
      const getMainImageUrl = (dest: any): string => {
        if (dest.mainImageUrl) {
          return dest.mainImageUrl.startsWith('http')
            ? dest.mainImageUrl
            : `${siteConfig.url}${dest.mainImageUrl}`;
        }
        if (dest.galleryImages && dest.galleryImages.length > 0) {
          const firstImage = dest.galleryImages[0];
          return firstImage.startsWith('http') ? firstImage : `${siteConfig.url}${firstImage}`;
        }
        if (dest.featuredImage) {
          return dest.featuredImage.startsWith('http')
            ? dest.featuredImage
            : `${siteConfig.url}${dest.featuredImage}`;
        }
        return '';
      };

      const imageUrl = getMainImageUrl(destination);
      const lastMod = new Date(destination.updatedAt || destination.createdAt).toISOString();

      // Clean text for XML
      const cleanText = (text: string) =>
        text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');

      const destinationName = cleanText(destination.name || '');
      const destinationDescription = destination.description
        ? cleanText(destination.description.substring(0, 200))
        : `${destinationName} - Destinasi wisata di Nagari Guguak Malalo`;

      return `
  <!-- ${destinationName} -->
  <url>
    <loc>${siteConfig.url}/pariwisata/${destination.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${
      imageUrl
        ? `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${destinationName}</image:title>
      <image:caption>${destinationDescription}</image:caption>
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
    console.error('Error generating Tourism sitemap:', error);

    // Return basic sitemap with just tourism listing page if API fails
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.url}/pariwisata</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
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
