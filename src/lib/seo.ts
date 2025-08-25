export const siteConfig = {
  name: "Nagari Guguak Malalo",
  description:
    "Portal Digital Nagari Guguak Malalo, Batipuh Selatan, Tanah Datar, Sumatera Barat",
  url: "https://guguakmalalo.id",
  ogImage: "/image-og.png",
  links: {
    instagram: "https://www.instagram.com/pemerintahnagariguguakmalalo",
    twitter: "@guguakmalalo",
  },
  keywords: [
    "nagari guguak malalo",
    "guguak malalo",
    "desa digital",
    "sumatera barat",
    "tanah datar",
    "batipuh selatan",
    "wisata guguak malalo",
    "desa wisata",
    "portal desa",
    "layanan digital desa",
  ],
  address:
    "Nagari Guguak Malalo, Kec. Batipuh Selatan, Kab. Tanah Datar, Sumatera Barat",
};

export type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  noIndex?: boolean;
};

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  canonical,
  noIndex = false,
}: MetadataProps = {}) {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const metaUrl = canonical || siteConfig.url;
  const metaKeywords = [...siteConfig.keywords, ...keywords];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: "Nagari Guguak Malalo" }],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonical || undefined,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: siteConfig.links.twitter,
    },
  };
}

// Add a separate function for generating viewport
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
  };
}

// =============================================
// SOCIAL SHARING & ARTICLE SEO UTILITIES
// =============================================

export interface SEOData {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * Generate optimized title for sharing
 */
export const generateShareTitle = (title: string, metaTitle?: string): string => {
  return metaTitle || `${title} | ${siteConfig.name}`;
};

/**
 * Generate optimized description for sharing
 */
export const generateShareDescription = (
  description?: string,
  metaDescription?: string,
  content?: string
): string => {
  if (metaDescription) return metaDescription;
  if (description) return description;
  if (content) {
    // Remove HTML tags and get first 160 characters
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();
    return cleanContent.length > 160 
      ? cleanContent.substring(0, 160) + '...'
      : cleanContent;
  }
  return siteConfig.description;
};

/**
 * Ensure absolute URL for images
 */
export const getAbsoluteImageUrl = (imageUrl?: string): string => {
  if (!imageUrl) return getDefaultOGImage();
  
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : siteConfig.url;
    
  return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
};

/**
 * Get default Open Graph image
 */
export const getDefaultOGImage = (): string => {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : siteConfig.url;
    
  return `${baseUrl}${siteConfig.ogImage}`;
};

/**
 * Generate structured data for articles
 */
export const generateArticleStructuredData = (data: {
  headline: string;
  description: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": data.headline,
    "description": data.description,
    "image": [data.image],
    "author": {
      "@type": "Person",
      "name": data.author
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${typeof window !== 'undefined' ? window.location.origin : siteConfig.url}/logo.png`,
        "width": 200,
        "height": 60
      }
    },
    "datePublished": data.datePublished,
    "dateModified": data.dateModified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": siteConfig.name,
      "url": typeof window !== 'undefined' ? window.location.origin : siteConfig.url
    }
  };
};

/**
 * Social sharing functions with optimal meta data
 */
export const socialShare = {
  facebook: (url: string) => {
    // Facebook will automatically read Open Graph meta tags
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, 'facebook-share', 'width=600,height=400,scrollbars=yes,resizable=yes');
  },

  twitter: (url: string, title: string, description?: string) => {
    let tweetText = title.length > 240 ? title.substring(0, 240) + '...' : title;
    
    if (description && tweetText.length + description.length + 5 < 240) {
      tweetText += `\n\n${description.substring(0, 100)}${description.length > 100 ? '...' : ''}`;
    }
    
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(tweetText)}&hashtags=NagariGuguakMalalo,Berita`;
    window.open(twitterUrl, 'twitter-share', 'width=600,height=400,scrollbars=yes,resizable=yes');
  },

  whatsapp: (url: string, title: string, description?: string) => {
    let message = `*${title}*`;
    
    if (description) {
      message += `\n\n${description}`;
    }
    
    message += `\n\nBaca selengkapnya: ${url}\n\n_Dibagikan dari ${siteConfig.name}_`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  },

  copyToClipboard: async (url: string, title: string, description?: string) => {
    let textToCopy = title;
    
    if (description) {
      textToCopy += `\n\n${description}`;
    }
    
    textToCopy += `\n\nBaca selengkapnya: ${url}\n\nDibagikan dari ${siteConfig.name}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      return { success: true, message: 'Link artikel berhasil disalin ke clipboard!' };
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return { success: true, message: 'Link artikel berhasil disalin ke clipboard!' };
      } catch (copyErr) {
        document.body.removeChild(textArea);
        return { success: false, message: 'Gagal menyalin link. Silakan salin URL dari address bar.' };
      }
    }
  }
};
