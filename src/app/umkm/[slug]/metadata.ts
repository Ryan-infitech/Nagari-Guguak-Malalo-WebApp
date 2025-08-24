import { Metadata } from 'next';
import { UMKMService } from '@/api/services/umkm.service';
import { siteConfig } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const umkmService = new UMKMService();
    const umkm = await umkmService.getUMKMBySlug(params.slug);

    if (!umkm) {
      return {
        title: `UMKM Tidak Ditemukan | ${siteConfig.name}`,
        description: siteConfig.description,
      };
    }

    // Helper function to get main image
    const getMainImage = (umkmData: any): string => {
      let imageUrl = '';
      if (umkmData.mainImageUrl) imageUrl = umkmData.mainImageUrl;
      else if (umkmData.logoUrl) imageUrl = umkmData.logoUrl;
      else if (umkmData.images && umkmData.images.length > 0) imageUrl = umkmData.images[0];
      else imageUrl = '/images/lain/pondokkalwa.png';

      // Convert to absolute URL
      if (imageUrl.startsWith('/')) {
        return `${siteConfig.url}${imageUrl}`;
      }
      return imageUrl;
    };

    // Calculate average rating
    const calculateAverageRating = () => {
      if (!umkm.reviews || umkm.reviews.length === 0) return 0;
      const total = umkm.reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
      return Math.round((total / umkm.reviews.length) * 10) / 10;
    };

    const rating = calculateAverageRating();
    const reviewCount = umkm._count?.reviews || umkm.reviews?.length || 0;
    const mainImage = getMainImage(umkm);

    // Create rich description
    const description = umkm.description
      ? `${umkm.description.substring(0, 150)}...`
      : `${umkm.name} - UMKM terpercaya di ${umkm.address}. Rating ${rating}/5 dari ${reviewCount} ulasan. Kategori: ${umkm.category?.name || 'UMKM'}`;

    // Generate keywords
    const keywords = [
      umkm.name,
      'UMKM',
      umkm.category?.name || '',
      'Nagari Guguak Malalo',
      'Sumatera Barat',
      'Tanah Datar',
      'Batipuh Selatan',
      umkm.address,
      'usaha mikro',
      'produk lokal',
      'ekonomi kreatif',
    ].filter(Boolean);

    const title = `${umkm.name} - UMKM ${umkm.category?.name || 'Terbaik'} | ${siteConfig.name}`;

    return {
      title,
      description,
      keywords: keywords.join(', '),

      // Open Graph
      openGraph: {
        title,
        description,
        type: 'website',
        url: `${siteConfig.url}/umkm/${umkm.slug}`,
        images: [
          {
            url: mainImage,
            width: 1200,
            height: 630,
            alt: `${umkm.name} - Foto UMKM`,
          },
        ],
        siteName: siteConfig.name,
        locale: 'id_ID',
      },

      // Twitter Card
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [mainImage],
        site: siteConfig.links.twitter,
      },

      // Additional meta
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },

      // Canonical URL
      alternates: {
        canonical: `${siteConfig.url}/umkm/${umkm.slug}`,
      },

      // Other meta
      other: {
        'business:contact_data:street_address': umkm.address,
        'business:contact_data:locality': 'Nagari Guguak Malalo',
        'business:contact_data:region': 'Sumatera Barat',
        'business:contact_data:country_name': 'Indonesia',
        ...(umkm.contactPhone || umkm.phone
          ? { 'business:contact_data:phone_number': umkm.contactPhone || umkm.phone }
          : {}),
        ...(umkm.contactEmail || umkm.email
          ? { 'business:contact_data:email': umkm.contactEmail || umkm.email }
          : {}),
        ...(umkm.latitude ? { 'place:location:latitude': umkm.latitude.toString() } : {}),
        ...(umkm.longitude ? { 'place:location:longitude': umkm.longitude.toString() } : {}),
        'og:rating': rating.toString(),
        'og:rating_scale': '5',
        'og:rating_count': reviewCount.toString(),
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `UMKM | ${siteConfig.name}`,
      description: siteConfig.description,
    };
  }
}
