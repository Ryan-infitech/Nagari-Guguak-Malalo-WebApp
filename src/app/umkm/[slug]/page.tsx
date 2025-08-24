'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Breadcrumb, generateUMKMBreadcrumb } from '@/components/ui/breadcrumb';
import { useToast } from '@/hooks/use-toast';
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  User,
  ShoppingBag,
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Facebook,
  Globe,
  ChevronRight,
  Award,
  Instagram,
  ExternalLink,
  Copy,
  Twitter,
} from 'lucide-react';
import { useUMKM, type UMKM as UMKMType } from '@/hooks/api/useUMKM';
import { useAuth } from '@/contexts/AuthContext';
import { UMKMService, type UMKMReview } from '@/api/services/umkm.service';
import { UMKMStructuredData } from '@/components/seo/UMKMStructuredData';
import { siteConfig } from '@/lib/seo';

// Dynamic import for Leaflet to avoid SSR issues
const LeafletMap = dynamic(
  () => import('@/components/ui/LeafletMapDynamic').then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-gray-50">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-sm text-gray-500">Memuat peta...</p>
        </div>
      </div>
    ),
  }
);

export interface MapPosition {
  lat: number;
  lng: number;
}

// Legacy interface - will be replaced with backend data structure
interface LegacyUMKM {
  id: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  alamat: string;
  jamOperasional: string;
  telepon: string;
  email: string;
  website: string;
  sosialMedia: {
    facebook?: string;
    instagram?: string;
  };
  pemilik: {
    nama: string;
    foto: string;
    cerita: string;
    pengalaman: string;
    pendidikan: string;
  };
  produk: {
    nama: string;
    deskripsi: string;
    harga: string;
    gambar: string;
    bestseller: boolean;
  }[];
  penghargaan: string[];
  rating: number;
  review: number;
  mainImage: string;
  galeri: string[];
  testimoni: {
    nama: string;
    pesan: string;
    rating: number;
    tanggal: string;
  }[];
  terkait: {
    id: string;
    nama: string;
    kategori: string;
    image: string;
  }[];
  lokasi: {
    lat: number;
    lng: number;
    mapEmbed: string;
  };
}

const UMKMDetail = () => {
  // Helper function to get avatar gradient
  const getAvatarGradient = (userName: string): string => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-yellow-500 to-orange-600',
      'from-purple-500 to-pink-600',
      'from-teal-500 to-green-600',
    ];

    // Create a simple hash from the username
    const hash = userName.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return gradients[Math.abs(hash) % gradients.length];
  };

  const params = useParams();
  const { toast } = useToast();
  const { getUMKM } = useUMKM();
  const { user, isAuthenticated } = useAuth();
  const umkmService = new UMKMService();

  // State management
  const [umkm, setUMKM] = useState<UMKMType | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<UMKMReview[]>([]);
  const [relatedUMKMs, setRelatedUMKMs] = useState<UMKMType[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Review form state
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Edit review state
  const [editingReview, setEditingReview] = useState<UMKMReview | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userReview, setUserReview] = useState<UMKMReview | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  // Debug effect to track state changes
  useEffect(() => {
    console.log('🔍 DEBUG: relatedUMKMs state changed:', relatedUMKMs);
    console.log('🔍 DEBUG: relatedUMKMs array length:', relatedUMKMs.length);
  }, [relatedUMKMs]);

  // Load UMKM data
  useEffect(() => {
    if (params?.slug) {
      loadUMKMData(params.slug as string);
    }
  }, [params?.slug]);

  // Reload reviews when user login state changes
  useEffect(() => {
    if (umkm?.id) {
      loadReviews(umkm.id);
    }
  }, [user?.id, umkm?.id]); // Re-run when user changes or UMKM changes

  // Update userReview when user or reviews change (fallback safety)
  useEffect(() => {
    if (user && reviews.length > 0) {
      const foundUserReview = reviews.find((review: UMKMReview) => review.userId === user.id);
      if (foundUserReview !== userReview) {
        setUserReview(foundUserReview || null);
      }
    }
  }, [user?.id, reviews]);

  const loadUMKMData = async (slug: string) => {
    try {
      setIsLoading(true);
      window.scrollTo(0, 0);

      // Load main UMKM data by slug instead of ID
      const umkmData = await umkmService.getUMKMBySlug(slug);
      setUMKM(umkmData);

      // Set main image
      const mainImg = getMainImage(umkmData);
      setActiveImage(mainImg);

      // Load products
      try {
        const productsData = await umkmService.getProducts(umkmData.id);
        setProducts(productsData.data || []);
      } catch (error) {
        console.warn('Failed to load products:', error);
        setProducts([]);
      }

      // Load related UMKMs (same category, latest first)
      try {
        console.log('🔍 DEBUG: Loading related UMKMs for category:', umkmData.categoryId);
        console.log('🔍 DEBUG: Current UMKM category object:', umkmData.category);
        console.log('🔍 DEBUG: Current UMKM ID:', umkmData.id);

        // Try different parameter approaches
        const relatedData = await umkmService.getPublishedUMKMs({
          category: umkmData.categoryId, // Use category parameter with categoryId value
          limit: 10,
          sortBy: 'createdAt',
          sortOrder: 'desc',
        });
        console.log('🔍 DEBUG: Related UMKMs raw data:', relatedData);
        console.log('🔍 DEBUG: Related UMKMs data array length:', relatedData.data?.length);

        // If that doesn't work, try without category filter first
        if (!relatedData.data || relatedData.data.length === 0) {
          console.log('🔍 DEBUG: No results with categoryId, trying without filter...');
          const allData = await umkmService.getPublishedUMKMs({
            limit: 10,
            sortBy: 'createdAt',
            sortOrder: 'desc',
          });
          console.log('🔍 DEBUG: All UMKMs data:', allData);
          console.log('🔍 DEBUG: All UMKMs data array length:', allData.data?.length);

          if (allData.data && allData.data.length > 0) {
            console.log('🔍 DEBUG: All UMKM IDs and categories:');
            allData.data.forEach((item, index) => {
              console.log(
                `  ${index + 1}. ID: ${item.id}, Category: ${item.categoryId}, Name: ${item.name}`
              );
            });

            // Manual filter by category
            console.log('🔍 DEBUG: Filtering by categoryId:', umkmData.categoryId);
            console.log('🔍 DEBUG: Excluding current UMKM ID:', umkmData.id);

            const manualFiltered = allData.data
              .filter((item) => {
                const categoryMatch = item.categoryId === umkmData.categoryId;
                const notCurrentUMKM = item.id !== umkmData.id;
                console.log(
                  `🔍 DEBUG: Item ${item.name}: categoryMatch=${categoryMatch}, notCurrentUMKM=${notCurrentUMKM}`
                );
                return categoryMatch && notCurrentUMKM;
              })
              .slice(0, 3);

            console.log('🔍 DEBUG: Manual filtered UMKMs count:', manualFiltered.length);
            console.log('🔍 DEBUG: Manual filtered UMKMs:', manualFiltered);
            setRelatedUMKMs(manualFiltered);
          } else {
            console.log('🔍 DEBUG: No UMKMs found in database at all');
            setRelatedUMKMs([]);
          }
        } else {
          // Filter out current UMKM and take only 3
          const filtered = relatedData.data
            .filter((item) => {
              const notCurrentUMKM = item.id !== umkmData.id;
              console.log(`🔍 DEBUG: Filtering ${item.name}: notCurrentUMKM=${notCurrentUMKM}`);
              return notCurrentUMKM;
            })
            .slice(0, 3);
          console.log('🔍 DEBUG: Direct filtered UMKMs count:', filtered.length);
          console.log('🔍 DEBUG: Direct filtered UMKMs:', filtered);
          setRelatedUMKMs(filtered);
        }
      } catch (error) {
        console.error('🔍 DEBUG: Failed to load related UMKMs:', error);
        setRelatedUMKMs([]);
      }

      // Load reviews - try API first, fallback to UMKM data
      try {
        await loadReviews(umkmData.id);
      } catch (error) {
        console.warn('Failed to load reviews from API, using UMKM data:', error);
        // Fallback to reviews from UMKM data if available
        if (umkmData.reviews) {
          // Map reviews to include umkmId
          const mappedReviews = umkmData.reviews.map((review: any) => ({
            ...review,
            umkmId: umkmData.id,
          }));
          setReviews(mappedReviews);
        } else {
          setReviews([]);
        }
      }

      // Record visit for analytics
      try {
        await umkmService.recordVisit(umkmData.id, 'web');
        console.log('✅ Visit recorded for UMKM:', umkmData.name);
      } catch (error) {
        console.warn('⚠️ Failed to record visit (non-critical):', error);
      }
    } catch (error: any) {
      console.error('Error loading UMKM data:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat data UMKM. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions
  const getMainImage = (umkmData: UMKMType): string => {
    let imageUrl = '';
    if (umkmData.mainImageUrl) imageUrl = umkmData.mainImageUrl;
    else if (umkmData.logoUrl) imageUrl = umkmData.logoUrl;
    else if (umkmData.images && umkmData.images.length > 0) imageUrl = umkmData.images[0];
    else imageUrl = '/images/lain/pondokkalwa.png'; // fallback

    // Convert relative URLs to absolute URLs for better social sharing
    if (imageUrl.startsWith('/')) {
      const baseUrl =
        typeof window !== 'undefined'
          ? window.location.origin
          : 'https://nagari-guguak-malalo.vercel.app';
      return `${baseUrl}${imageUrl}`;
    }
    return imageUrl;
  };

  // Calculate average rating from reviews
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  // Format rating to 1 decimal place
  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const getGalleryImages = (umkmData: UMKMType): string[] => {
    const images: string[] = [];
    if (umkmData.mainImageUrl) images.push(umkmData.mainImageUrl);
    if (umkmData.logoUrl && umkmData.logoUrl !== umkmData.mainImageUrl) {
      images.push(umkmData.logoUrl);
    }
    if (umkmData.images && umkmData.images.length > 0) {
      umkmData.images.forEach((img) => {
        if (!images.includes(img)) images.push(img);
      });
    }
    return images.length > 0 ? images : ['/images/lain/pondokkalwa.png'];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getSocialMediaLinks = (socialMedia: any) => {
    if (!socialMedia) return {};

    try {
      const parsed = typeof socialMedia === 'string' ? JSON.parse(socialMedia) : socialMedia;
      return parsed;
    } catch {
      return {};
    }
  };

  const getOperatingHours = (operatingHours: any): JSX.Element => {
    if (!operatingHours) {
      return (
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-500">Hubungi untuk info jam operasional</p>
        </div>
      );
    }

    try {
      const parsed =
        typeof operatingHours === 'string' ? JSON.parse(operatingHours) : operatingHours;

      // Format operating hours from database structure
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const dayNames = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

      const schedule = days
        .map((day, index) => {
          const hours = parsed[day];
          if (hours && hours.open && hours.close) {
            return {
              day: dayNames[index],
              time: `${hours.open} - ${hours.close}`,
            };
          }
          return null;
        })
        .filter((item): item is { day: string; time: string } => item !== null);

      if (schedule.length === 0) {
        return (
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-500">Hubungi untuk info jam operasional</p>
          </div>
        );
      }

      return (
        <div className="space-y-2">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
            >
              <span className="font-medium text-gray-700">{item.day}</span>
              <span className="text-gray-600">{item.time}</span>
            </div>
          ))}
        </div>
      );
    } catch {
      return (
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-500">Hubungi untuk info jam operasional</p>
        </div>
      );
    }
  };

  const getVerificationBadge = (umkmData: UMKMType) => {
    if (umkmData.verificationStatus === 'APPROVED') {
      return (
        <Badge className="border-green-200 bg-green-100 text-green-800">
          <Award className="mr-1 h-3 w-3" />
          Terverifikasi
        </Badge>
      );
    }
    return null;
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = umkm?.name || '';
    const description = umkm?.description
      ? umkm.description.substring(0, 100)
      : 'UMKM terbaik di Nagari Guguak Malalo';
    const rating = formatRating(umkm?.rating || 0);
    const location = umkm?.address || 'Nagari Guguak Malalo';

    switch (platform) {
      case 'whatsapp':
        const waText = `🏪 *${title}*\n\n📍 ${location}\n⭐ Rating: ${rating}\n\n${description}...\n\n👆 Lihat detail lengkap: ${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, '_blank');
        break;
      case 'facebook':
        // Facebook akan otomatis mengambil meta tags Open Graph untuk preview
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'twitter':
        const twitterText = `🏪 ${title} - UMKM Nagari Guguak Malalo\n⭐ ${rating} | 📍 ${location}`;
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(twitterText)}`,
          '_blank'
        );
        break;
      case 'copy':
        navigator.clipboard
          .writeText(url)
          .then(() => {
            toast({
              title: 'Link Disalin!',
              description: 'Link telah disalin ke clipboard',
              variant: 'default',
            });
          })
          .catch(() => {
            toast({
              title: 'Gagal menyalin',
              description: 'Silakan salin link secara manual',
              variant: 'destructive',
            });
          });
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: title,
            text: description,
            url: url,
          });
        }
    }
  };

  // Review functions
  const handleStarClick = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: 'Login Diperlukan',
        description: 'Silakan login terlebih dahulu untuk memberikan ulasan',
        variant: 'destructive',
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: 'Rating Diperlukan',
        description: 'Silakan berikan rating terlebih dahulu',
        variant: 'destructive',
      });
      return;
    }

    if (reviewText.trim().length < 10) {
      toast({
        title: 'Ulasan Terlalu Pendek',
        description: 'Ulasan minimal 10 karakter',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmittingReview(true);

      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login kembali.');
      }

      // Submit to API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/umkm/${umkm!.id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: rating,
          comment: reviewText.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit review');
      }

      const result = await response.json();

      // Reset form
      setRating(0);
      setReviewText('');

      // Reload reviews to show the new one and update userReview
      if (umkm?.id) {
        await loadReviews(umkm.id);
      }

      toast({
        title: 'Ulasan Berhasil Dikirim',
        description: 'Ulasan Anda berhasil ditambahkan!',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: 'Gagal Mengirim Ulasan',
        description: 'Terjadi kesalahan. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Handle edit review
  const handleEditReview = (review: UMKMReview) => {
    setEditingReview(review);
    setIsEditMode(true);
    setRating(review.rating);
    setReviewText(review.reviewText || '');
    // Scroll to form
    const formElement = document.getElementById('review-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle update review
  const handleUpdateReview = async () => {
    if (!editingReview || !user || !umkm) {
      toast({
        title: 'Error',
        description: 'Data tidak lengkap untuk mengupdate ulasan.',
        variant: 'destructive',
      });
      return;
    }

    if (!rating || !reviewText.trim()) {
      toast({
        title: 'Error',
        description: 'Rating dan ulasan wajib diisi.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmittingReview(true);

      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login kembali.');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/umkm/reviews/${editingReview.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: rating,
            comment: reviewText.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update review');
      }

      toast({
        title: 'Berhasil',
        description: 'Ulasan Anda berhasil diupdate!',
      });

      // Reset form and exit edit mode
      setRating(0);
      setReviewText('');
      setEditingReview(null);
      setIsEditMode(false);

      // Reload reviews
      await loadReviews(umkm.id);
    } catch (error: any) {
      console.error('Error updating review:', error);
      toast({
        title: 'Error',
        description: error.message || 'Gagal mengupdate ulasan. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Handle delete review - show confirmation dialog
  const handleDeleteReview = (reviewId: string) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Anda harus login untuk menghapus ulasan.',
        variant: 'destructive',
      });
      return;
    }

    setReviewToDelete(reviewId);
    setShowDeleteDialog(true);
  };

  // Confirm and execute delete review
  const confirmDeleteReview = async () => {
    if (!reviewToDelete) return;

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login kembali.');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/umkm/reviews/${reviewToDelete}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete review');
      }

      toast({
        title: 'Berhasil',
        description: 'Ulasan Anda berhasil dihapus!',
      });

      // Reset states
      setRating(0);
      setReviewText('');
      setUserReview(null);
      setIsEditMode(false);
      setEditingReview(null);

      // Reload reviews
      if (umkm) {
        await loadReviews(umkm.id);
      }
    } catch (error: any) {
      console.error('Error deleting review:', error);
      toast({
        title: 'Error',
        description: error.message || 'Gagal menghapus ulasan. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setShowDeleteDialog(false);
      setReviewToDelete(null);
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingReview(null);
    setIsEditMode(false);
    setRating(0);
    setReviewText('');
  };

  const loadReviews = async (umkmId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/umkm/${umkmId}/reviews`);
      if (response.ok) {
        const data = await response.json();
        let reviewsList = data.data?.data || data.data || [];

        // Sort reviews: user's own review first, then others by newest
        if (user) {
          reviewsList = reviewsList.sort((a: UMKMReview, b: UMKMReview) => {
            // User's own review comes first
            if (a.userId === user.id && b.userId !== user.id) return -1;
            if (b.userId === user.id && a.userId !== user.id) return 1;

            // Both are user's reviews or both are not - sort by newest first
            return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
          });
        }

        // Set reviews first
        setReviews(reviewsList);

        // Find and set user's review AFTER reviews are set
        const currentUserReview = user
          ? reviewsList.find((review: UMKMReview) => review.userId === user.id)
          : null;
        setUserReview(currentUserReview);
      } else {
        throw new Error('Failed to load reviews');
      }
    } catch (error) {
      console.warn('Failed to load reviews:', error);
      setReviews([]);
      setUserReview(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-96 w-full rounded-xl" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>

              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!umkm) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">UMKM Tidak Ditemukan</h2>
          <p className="mb-4 text-gray-600">UMKM yang Anda cari tidak tersedia.</p>
          <Link href="/umkm">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Daftar UMKM
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Enhanced SEO Meta Tags */}
      <Head>
        {/* Basic Meta Tags */}
        <title>
          {umkm.name} - UMKM {umkm.category?.name || 'Terbaik'} | {siteConfig.name}
        </title>
        <meta
          name="description"
          content={
            umkm.description
              ? `${umkm.description.substring(0, 150)}...`
              : `${umkm.name} - UMKM terpercaya di ${umkm.address}. Rating ${formatRating(calculateAverageRating())}/5 dari ${reviews.length} ulasan. Kategori: ${umkm.category?.name || 'UMKM'}`
          }
        />
        <meta
          name="keywords"
          content={`${umkm.name}, UMKM, ${umkm.category?.name || ''}, Nagari Guguak Malalo, Sumatera Barat, Tanah Datar, Batipuh Selatan, ${umkm.address}, usaha mikro, produk lokal, ekonomi kreatif`}
        />
        <meta name="author" content="Portal Nagari Guguak Malalo" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteConfig.url}/umkm/${umkm.slug}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta
          property="og:title"
          content={`${umkm.name} - UMKM ${umkm.category?.name || 'Terbaik'} | ${siteConfig.name}`}
        />
        <meta
          property="og:description"
          content={
            umkm.description ||
            `${umkm.name} - UMKM terpercaya di ${umkm.address}. Rating ${formatRating(calculateAverageRating())}/5 ⭐ dari ${reviews.length} ulasan`
          }
        />
        <meta property="og:image" content={getMainImage(umkm)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${umkm.name} - Foto UMKM`} />
        <meta property="og:url" content={`${siteConfig.url}/umkm/${umkm.slug}`} />
        <meta property="og:locale" content="id_ID" />

        {/* Business-specific Open Graph */}
        <meta property="business:contact_data:street_address" content={umkm.address} />
        <meta property="business:contact_data:locality" content="Nagari Guguak Malalo" />
        <meta property="business:contact_data:region" content="Sumatera Barat" />
        <meta property="business:contact_data:country_name" content="Indonesia" />
        {(umkm.contactPhone || umkm.phone) && (
          <meta
            property="business:contact_data:phone_number"
            content={umkm.contactPhone || umkm.phone}
          />
        )}
        {(umkm.contactEmail || umkm.email) && (
          <meta property="business:contact_data:email" content={umkm.contactEmail || umkm.email} />
        )}

        {/* Location data */}
        {umkm.latitude && (
          <meta property="place:location:latitude" content={umkm.latitude.toString()} />
        )}
        {umkm.longitude && (
          <meta property="place:location:longitude" content={umkm.longitude.toString()} />
        )}

        {/* Rating metadata */}
        <meta property="og:rating" content={formatRating(calculateAverageRating())} />
        <meta property="og:rating_scale" content="5" />
        <meta property="og:rating_count" content={reviews.length.toString()} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteConfig.links.twitter} />
        <meta name="twitter:creator" content={siteConfig.links.twitter} />
        <meta
          name="twitter:title"
          content={`${umkm.name} - UMKM ${umkm.category?.name || 'Terbaik'}`}
        />
        <meta
          name="twitter:description"
          content={
            umkm.description ||
            `${umkm.name} - UMKM terpercaya di Nagari Guguak Malalo. Rating ${formatRating(calculateAverageRating())}/5 ⭐`
          }
        />
        <meta name="twitter:image" content={getMainImage(umkm)} />
        <meta name="twitter:image:alt" content={`${umkm.name} - Foto UMKM`} />

        {/* Additional SEO Meta */}
        <meta name="geo.region" content="ID-SB" />
        <meta name="geo.placename" content="Nagari Guguak Malalo" />
        <meta
          name="geo.position"
          content={
            umkm.latitude && umkm.longitude ? `${umkm.latitude};${umkm.longitude}` : undefined
          }
        />
        <meta
          name="ICBM"
          content={
            umkm.latitude && umkm.longitude ? `${umkm.latitude}, ${umkm.longitude}` : undefined
          }
        />
      </Head>

      {/* Structured Data */}
      <UMKMStructuredData
        umkm={umkm}
        rating={calculateAverageRating()}
        reviewCount={reviews.length}
      />

      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] bg-cover bg-center pb-12 pt-32 md:min-h-[70vh] md:pb-20 md:pt-36"
        style={{ backgroundImage: `url(${activeImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="container relative mx-auto flex h-full flex-col justify-between px-4 py-8 md:py-12">
          {/* Breadcrumb */}
          <div className="mb-4">
            <Breadcrumb items={generateUMKMBreadcrumb(umkm)} className="text-white/80" />
          </div>

          {/* Top section with back button and badge */}
          <div className="mb-8 flex items-center gap-2 md:mb-12">
            <Link href="/umkm">
              <Button
                variant="outline"
                size="sm"
                className="border-white bg-black/30 text-white backdrop-blur-sm hover:bg-white hover:text-gray-800"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Kembali ke UMKM
              </Button>
            </Link>
            <Badge className="bg-white/80 text-gray-800 hover:bg-white">
              {umkm.category?.name || 'UMKM'}
            </Badge>
            {getVerificationBadge(umkm)}
          </div>

          {/* Bottom section with main content */}
          <div className="max-w-4xl">
            <h1 className="mb-4 text-3xl font-bold text-white md:mb-6 md:text-4xl lg:text-5xl">
              {umkm.name}
            </h1>
            <div className="flex flex-col space-y-2 text-white sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
              <div className="flex items-center">
                <Star className="mr-1 h-5 w-5 text-yellow-400" />
                <span className="font-bold">{formatRating(calculateAverageRating())}</span>
                <span className="ml-1 text-sm text-gray-300">({reviews.length} ulasan)</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-5 w-5 text-gray-300" />
                <span>{umkm.address || 'Guguak Malalo'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Tabs Navigation */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-8 grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="products">Produk</TabsTrigger>
                  <TabsTrigger value="gallery">Galeri</TabsTrigger>
                  <TabsTrigger value="reviews">Ulasan</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview">
                  <Card className="mb-8 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Store className="h-6 w-6 text-[#7ca186]" />
                        Tentang {umkm.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-6 leading-relaxed text-gray-700">
                        {umkm.description || 'Deskripsi belum tersedia.'}
                      </p>

                      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <MapPin className="mr-3 mt-0.5 h-5 w-5 text-gray-500" />
                            <div>
                              <h4 className="font-medium">Alamat</h4>
                              <p className="text-sm text-gray-600">
                                {umkm.address || 'Alamat belum tersedia'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Phone className="mr-3 mt-0.5 h-5 w-5 text-gray-500" />
                            <div>
                              <h4 className="font-medium">Telepon</h4>
                              <p className="text-sm text-gray-600">
                                {umkm.phone || 'Telepon belum tersedia'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Mail className="mr-3 mt-0.5 h-5 w-5 text-gray-500" />
                            <div>
                              <h4 className="font-medium">Email</h4>
                              <p className="text-sm text-gray-600">
                                {umkm.email || 'Email belum tersedia'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Globe className="mr-3 mt-0.5 h-5 w-5 text-gray-500" />
                            <div>
                              <h4 className="font-medium">Website</h4>
                              <p className="text-sm text-gray-600">
                                {umkm.website || 'Website belum tersedia'}
                              </p>
                            </div>
                          </div>

                          {getSocialMediaLinks(umkm.socialMedia).instagram && (
                            <div className="flex items-start">
                              <Instagram className="mr-3 mt-0.5 h-5 w-5 text-gray-500" />
                              <div>
                                <h4 className="font-medium">Instagram</h4>
                                <p className="text-sm text-gray-600">
                                  {getSocialMediaLinks(umkm.socialMedia).instagram}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Owner Information Card - Simplified */}
                      {umkm.ownerName && (
                        <div className="mt-8 rounded-lg bg-[#7ca186]/5 p-6">
                          <div className="mb-4 flex items-center gap-4">
                            {/* Avatar with proper image or initial */}
                            <div className="relative">
                              {umkm.logoUrl ? (
                                <Image
                                  src={umkm.logoUrl}
                                  alt={umkm.ownerName}
                                  className="h-16 w-16 rounded-full border-2 border-[#7ca186] object-cover"
                                  width={64}
                                  height={64}
                                />
                              ) : (
                                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#7ca186] bg-[#7ca186] text-xl font-bold text-white">
                                  {umkm.ownerName.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold">{umkm.ownerName}</h4>
                              <p className="text-sm text-gray-600">Pemilik UMKM</p>
                            </div>
                          </div>
                          {umkm.description && (
                            <p className="italic text-gray-700">&quot;{umkm.description}&quot;</p>
                          )}
                        </div>
                      )}

                      {/* Awards & Certifications Card */}
                      <div className="mt-8 rounded-lg bg-[#7ca186]/5 p-6">
                        <h3 className="mb-4 flex items-center text-lg font-bold">
                          <Award className="mr-2 h-5 w-5 text-yellow-500" />
                          Penghargaan & Sertifikasi
                        </h3>
                        <div className="space-y-3">
                          {/* Display awards from database */}
                          {umkm.awards ? (
                            (() => {
                              try {
                                let awardsToShow: string[] = [];

                                if (typeof umkm.awards === 'string') {
                                  try {
                                    const parsed = JSON.parse(umkm.awards);
                                    // Handle {list: [...]} format from backend
                                    if (parsed.list && Array.isArray(parsed.list)) {
                                      awardsToShow = parsed.list;
                                    } else if (Array.isArray(parsed)) {
                                      awardsToShow = parsed;
                                    } else {
                                      awardsToShow = [String(parsed)];
                                    }
                                  } catch {
                                    // If not JSON, treat as plain string
                                    awardsToShow = [umkm.awards];
                                  }
                                } else if (Array.isArray(umkm.awards)) {
                                  awardsToShow = umkm.awards;
                                } else if (
                                  umkm.awards &&
                                  typeof umkm.awards === 'object' &&
                                  'list' in umkm.awards &&
                                  Array.isArray((umkm.awards as any).list)
                                ) {
                                  awardsToShow = (umkm.awards as any).list;
                                }

                                if (awardsToShow.length > 0) {
                                  return (
                                    <div className="mb-4 flex flex-wrap gap-2">
                                      {awardsToShow.map((award: string, index: number) => (
                                        <Badge
                                          key={index}
                                          className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                        >
                                          🏆 {award}
                                        </Badge>
                                      ))}
                                    </div>
                                  );
                                }
                              } catch (error) {
                                console.warn('Error processing awards:', error);
                              }
                              return (
                                <div className="py-4 text-center">
                                  <Award className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                  <p className="text-sm text-gray-500">
                                    Belum ada penghargaan yang tercatat
                                  </p>
                                </div>
                              );
                            })()
                          ) : (
                            <div className="py-4 text-center">
                              <Award className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                              <p className="text-sm text-gray-500">
                                Belum ada penghargaan yang tercatat
                              </p>
                            </div>
                          )}

                          {/* Status information as separate section */}
                          <div className="mt-4 border-t border-gray-200 pt-3">
                            <h4 className="mb-2 text-sm font-medium text-gray-700">Status UMKM:</h4>
                            {umkm.verificationStatus === 'APPROVED' && (
                              <div className="mb-1 flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-sm text-gray-700">✅ Terverifikasi</span>
                              </div>
                            )}
                            <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                              <span className="text-sm text-gray-700">
                                📋 Terdaftar di Portal Resmi
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Map Location with Enhanced Leaflet Integration */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        Lokasi
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(umkm.locationLat && umkm.locationLng) || umkm.address ? (
                        <>
                          {/* Responsive Map Container */}
                          <div className="mb-4 w-full overflow-hidden rounded-lg">
                            <div className="aspect-[4/3] w-full md:aspect-[16/9] lg:aspect-[21/9]">
                              <LeafletMap
                                center={[
                                  umkm.locationLat || -0.9471, // Use locationLat from database
                                  umkm.locationLng || 100.4172, // Use locationLng from database
                                ]}
                                zoom={16}
                                selectedPosition={
                                  umkm.locationLat && umkm.locationLng
                                    ? {
                                        lat: umkm.locationLat,
                                        lng: umkm.locationLng,
                                        address: umkm.address || '',
                                      }
                                    : null
                                }
                                height="100%"
                                searchable={false}
                                className="h-full w-full rounded-lg"
                                defaultTileLayer="satellite"
                                showAttribution={false}
                              />
                            </div>
                          </div>

                          {/* Location Info - Responsive Layout */}
                          <div className="space-y-3">
                            {umkm.address && (
                              <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-500" />
                                <div className="min-w-0 flex-1">
                                  <h4 className="mb-1 text-sm font-medium">Alamat</h4>
                                  <p className="break-words text-sm text-gray-700">
                                    {umkm.address}
                                  </p>
                                </div>
                              </div>
                            )}

                            {umkm.locationLat && umkm.locationLng && (
                              <div className="rounded-lg bg-blue-50 p-3">
                                <div className="mb-1 flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                  <span className="text-sm font-medium text-blue-700">
                                    Koordinat GPS
                                  </span>
                                </div>
                                <p className="font-mono text-xs text-blue-600">
                                  {umkm.locationLat.toFixed(6)}, {umkm.locationLng.toFixed(6)}
                                </p>
                              </div>
                            )}

                            <Button
                              variant="outline"
                              className="w-full hover:border-blue-300 hover:bg-blue-50"
                              onClick={() => {
                                if (umkm.locationLat && umkm.locationLng) {
                                  window.open(
                                    `https://maps.google.com/?q=${umkm.locationLat},${umkm.locationLng}`,
                                    '_blank'
                                  );
                                } else if (umkm.address) {
                                  window.open(
                                    `https://maps.google.com/?q=${encodeURIComponent(umkm.address)}`,
                                    '_blank'
                                  );
                                }
                              }}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Buka di Google Maps
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="rounded-lg bg-gray-50 p-8 text-center">
                          <MapPin className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                          <p className="font-medium text-gray-500">Lokasi belum tersedia</p>
                          <p className="mt-1 text-sm text-gray-400">
                            Hubungi pemilik untuk informasi lokasi
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Products Tab */}
                <TabsContent value="products">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {products && products.length > 0 ? (
                      products.map((product, idx) => (
                        <Card
                          key={product.id || idx}
                          className="overflow-hidden transition-shadow hover:shadow-lg"
                        >
                          <div className="relative h-48">
                            <Image
                              src={product.imageUrl || '/images/lain/pondokkalwa.png'}
                              alt={product.name}
                              className="h-full w-full object-cover"
                              width={300}
                              height={200}
                            />
                            {product.featured && (
                              <Badge className="absolute right-2 top-2 bg-red-500 text-white">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                            <p className="font-bold text-[#7ca186]">
                              {product.price
                                ? `Rp ${product.price.toLocaleString('id-ID')}`
                                : 'Harga tidak tersedia'}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-4 text-sm text-gray-600">
                              {product.description || 'Deskripsi produk tidak tersedia'}
                            </p>
                            <Button className="w-full bg-[#7ca186] hover:bg-[#6a8b72]">
                              <ShoppingBag className="mr-2 h-4 w-4" />
                              Pesan Sekarang
                            </Button>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-2 py-8 text-center">
                        <p className="text-gray-500">Belum ada produk yang tersedia</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Gallery Tab */}
                <TabsContent value="gallery">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Award className="h-5 w-5 text-[#7ca186]" />
                        Galeri Foto
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <Image
                          src={activeImage}
                          alt="Main gallery"
                          className="h-80 w-full rounded-lg object-cover"
                          width={800}
                          height={400}
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {getGalleryImages(umkm).map((image, idx) => (
                          <Image
                            key={idx}
                            src={image}
                            alt={`Gallery image ${idx + 1}`}
                            width={200}
                            height={100}
                            className={`h-20 w-full cursor-pointer rounded-md object-cover transition-opacity hover:opacity-90 ${
                              activeImage === image ? 'border-2 border-[#7ca186]' : ''
                            }`}
                            onClick={() => setActiveImage(image)}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-0">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                        <CardTitle className="flex items-center gap-2 text-xl">
                          <MessageSquare className="h-5 w-5 text-[#7ca186]" />
                          Ulasan Pelanggan
                        </CardTitle>
                        <div className="flex items-center gap-1">
                          <div className="text-3xl font-bold">
                            {formatRating(calculateAverageRating())}
                          </div>
                          <div className="text-sm text-gray-500">
                            <div className="flex">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(calculateAverageRating() || 0)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                            </div>
                            <div>{reviews.length} ulasan</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Review Form for Authenticated Users - Only show if user hasn't reviewed or is editing */}
                      {user && (!userReview || isEditMode) ? (
                        <div
                          id="review-form"
                          className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {isEditMode ? 'Edit Ulasan Anda' : 'Berikan Ulasan Anda'}
                            </h3>
                            {isEditMode && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCancelEdit}
                                className="text-gray-600 hover:text-gray-800"
                              >
                                Batal
                              </Button>
                            )}
                          </div>
                          <div className="space-y-4">
                            {/* Rating Selection */}
                            <div>
                              <Label htmlFor="rating" className="mb-2 block text-sm font-medium">
                                Rating
                              </Label>
                              <div className="flex items-center gap-1">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <button
                                      key={i}
                                      type="button"
                                      onClick={() => setRating(i + 1)}
                                      className="transition-colors hover:scale-110"
                                    >
                                      <Star
                                        className={`h-8 w-8 ${
                                          i < rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300 hover:text-yellow-300'
                                        }`}
                                      />
                                    </button>
                                  ))}
                                <span className="ml-2 text-sm text-gray-600">
                                  {rating > 0 ? `${rating}/5` : 'Pilih rating'}
                                </span>
                              </div>
                            </div>

                            {/* Review Text */}
                            <div>
                              <Label
                                htmlFor="reviewText"
                                className="mb-2 block text-sm font-medium"
                              >
                                Ulasan
                              </Label>
                              <Textarea
                                id="reviewText"
                                placeholder="Tulis ulasan Anda tentang UMKM ini..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className="min-h-[100px] resize-none"
                              />
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end gap-3">
                              {editingReview && (
                                <Button
                                  onClick={handleCancelEdit}
                                  variant="outline"
                                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                  Batal
                                </Button>
                              )}
                              <Button
                                onClick={editingReview ? handleUpdateReview : handleSubmitReview}
                                disabled={!rating || !reviewText.trim() || isSubmittingReview}
                                className="bg-[#7ca186] hover:bg-[#6a8b72]"
                              >
                                {isSubmittingReview ? (
                                  <>
                                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                    {editingReview ? 'Memperbarui...' : 'Mengirim...'}
                                  </>
                                ) : (
                                  <>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    {editingReview ? 'Perbarui Ulasan' : 'Kirim Ulasan'}
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : !user ? (
                        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
                          <div className="flex items-center gap-3">
                            <User className="h-6 w-6 text-blue-600" />
                            <div>
                              <p className="font-medium text-blue-800">
                                Masuk untuk memberikan ulasan
                              </p>
                              <p className="text-sm text-blue-600">
                                Anda perlu masuk terlebih dahulu untuk dapat memberikan rating dan
                                ulasan
                              </p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => (window.location.href = '/auth/login')}
                            >
                              Masuk Sekarang
                            </Button>
                          </div>
                        </div>
                      ) : userReview && !isEditMode ? (
                        <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-6">
                          <div className="flex items-center gap-3">
                            <MessageSquare className="h-6 w-6 text-green-600" />
                            <div>
                              <p className="font-medium text-green-800">
                                Terima kasih atas ulasan Anda!
                              </p>
                              <p className="text-sm text-green-600">
                                Anda sudah memberikan ulasan untuk UMKM ini. Ulasan Anda dapat
                                dilihat di daftar ulasan di bawah.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {/* Reviews List */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Semua Ulasan ({reviews.length})
                        </h3>

                        {reviews && reviews.length > 0 ? (
                          reviews.map((review, idx) => (
                            <div
                              key={review.id || idx}
                              className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                            >
                              <div className="mb-3 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  {/* Avatar Section with proper implementation */}
                                  <div className="flex-shrink-0">
                                    {(() => {
                                      const userName =
                                        review.reviewerName || review.user?.name || 'Reviewer';
                                      const userInitial = userName[0]?.toUpperCase() || 'R';
                                      const gradientClass = getAvatarGradient(userName);

                                      // Check for avatar URL from different sources
                                      const avatarUrl = review.user?.avatarUrl || null;

                                      // Debug log to see what data we have
                                      if (process.env.NODE_ENV === 'development') {
                                        console.log('🔍 Avatar data for review:', {
                                          reviewId: review.id,
                                          userName,
                                          userInitial,
                                          user: review.user,
                                          avatarUrl,
                                          allPossibleSources: {
                                            'user.avatarUrl': review.user?.avatarUrl,
                                          },
                                        });
                                      }

                                      // If we have an avatar URL, try to display it with fallback
                                      if (avatarUrl) {
                                        return (
                                          <div className="relative h-12 w-12 flex-shrink-0">
                                            <div
                                              className={`absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br ${gradientClass} text-white shadow-lg ring-1 ring-gray-200`}
                                            >
                                              <span className="text-sm font-semibold">
                                                {userInitial}
                                              </span>
                                            </div>
                                            <Image
                                              src={avatarUrl}
                                              alt={`${userName} - Avatar`}
                                              width={48}
                                              height={48}
                                              className="absolute inset-0 z-10 h-12 w-12 rounded-full object-cover shadow-lg ring-1 ring-gray-200"
                                              onError={(e) => {
                                                console.log('❌ Avatar failed to load:', avatarUrl);
                                                // Hide the image on error, fallback will show
                                                e.currentTarget.style.display = 'none';
                                              }}
                                              onLoad={() => {
                                                console.log(
                                                  '✅ Avatar loaded successfully:',
                                                  avatarUrl
                                                );
                                              }}
                                            />
                                          </div>
                                        );
                                      }

                                      // Default fallback avatar with initial
                                      return (
                                        <div
                                          className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${gradientClass} text-white shadow-lg ring-1 ring-gray-200`}
                                        >
                                          <span className="text-sm font-semibold">
                                            {userInitial}
                                          </span>
                                        </div>
                                      );
                                    })()}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-gray-800">
                                        {review.reviewerName ||
                                          review.user?.name ||
                                          'Pengguna Anonim'}
                                      </span>
                                      {/* Show "Anda" indicator for user's own review */}
                                      {user && review.userId === user.id && (
                                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                          Anda
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {review.createdAt
                                        ? formatDate(review.createdAt)
                                        : 'Baru saja'}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <div className="flex items-center gap-2">
                                    <div className="mb-1 flex">
                                      {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`h-4 w-4 ${
                                              i < Math.floor(review.rating || 0)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                          />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">
                                      {review.rating}/5
                                    </span>
                                  </div>

                                  {/* Edit/Delete buttons for user's own review or admin/staff */}
                                  {user &&
                                    (review.userId === user.id ||
                                      ['ADMIN', 'SUPER_ADMIN', 'STAFF'].includes(user.role)) && (
                                      <div className="flex gap-1">
                                        {/* Only show edit button for own review */}
                                        {review.userId === user.id && (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEditReview(review)}
                                            className="h-8 px-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                          >
                                            <span className="text-xs">Edit</span>
                                          </Button>
                                        )}
                                        {/* Show delete button for own review or admin/staff */}
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleDeleteReview(review.id)}
                                          className="h-8 px-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                                        >
                                          <span className="text-xs">Hapus</span>
                                        </Button>
                                      </div>
                                    )}
                                </div>
                              </div>
                              <p className="leading-relaxed text-gray-700">
                                {review.reviewText || review.comment || review.content}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="py-12 text-center">
                            <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="text-lg font-medium text-gray-500">Belum ada ulasan</p>
                            <p className="text-sm text-gray-400">
                              Jadilah yang pertama memberikan ulasan untuk UMKM ini
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Load More Reviews Button */}
                      {reviews.length > 5 && (
                        <div className="mt-8 text-center">
                          <Button
                            variant="outline"
                            className="border-[#7ca186] text-[#7ca186] hover:bg-[#7ca186] hover:text-white"
                          >
                            Muat Ulasan Lainnya
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Social Actions - Share Buttons */}
              <div className="rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <Share2 className="text-brand-primary h-5 w-5" />
                      Bagikan UMKM Ini
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      Bantu promosikan UMKM lokal dengan membagikan ke teman dan keluarga. Link akan
                      menampilkan gambar dan info UMKM secara otomatis.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('whatsapp')}
                        className="border-green-300 text-green-600 hover:border-green-400 hover:bg-green-50"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('facebook')}
                        className="border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50"
                      >
                        <Facebook className="mr-2 h-4 w-4" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('twitter')}
                        className="border-sky-300 text-sky-600 hover:border-sky-400 hover:bg-sky-50"
                      >
                        <Twitter className="mr-2 h-4 w-4" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('copy')}
                        className="border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Salin Link
                      </Button>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button className="bg-brand-primary hover:bg-brand-primary-dark">
                      <Phone className="mr-2 h-4 w-4" />
                      Hubungi Pemilik
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Phone className="h-5 w-5 text-[#7ca186]" />
                    Kontak Langsung
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {umkm.phone && (
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-green-600" />
                          <span>{umkm.phone}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-600 hover:bg-green-50"
                          onClick={() => window.open(`tel:${umkm.phone}`)}
                        >
                          Telepon
                        </Button>
                      </div>
                    )}

                    {umkm.email && (
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-blue-600" />
                          <span>Email</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                          onClick={() => window.open(`mailto:${umkm.email}`)}
                        >
                          Email
                        </Button>
                      </div>
                    )}

                    {getSocialMediaLinks(umkm.socialMedia).whatsapp && (
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="h-5 w-5 text-orange-600" />
                          <span>WhatsApp</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-600 text-orange-600 hover:bg-orange-50"
                          onClick={() =>
                            window.open(
                              `https://wa.me/${getSocialMediaLinks(umkm.socialMedia).whatsapp}`
                            )
                          }
                        >
                          Chat
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <Button className="w-full bg-[#7ca186] hover:bg-[#6a8b72]">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Kunjungi Toko
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Operating Hours Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Clock className="h-5 w-5 text-[#7ca186]" />
                    Jam Operasional
                  </CardTitle>
                </CardHeader>
                <CardContent>{getOperatingHours(umkm.operatingHours)}</CardContent>
              </Card>

              {/* Related UMKM */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Store className="h-5 w-5 text-blue-600" />
                    UMKM Terkait
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(() => {
                      console.log('🔍 DEBUG: Rendering Related UMKMs section');
                      console.log('🔍 DEBUG: isLoading:', isLoading);
                      console.log('🔍 DEBUG: relatedUMKMs:', relatedUMKMs);
                      console.log('🔍 DEBUG: relatedUMKMs.length:', relatedUMKMs?.length);
                      return null;
                    })()}
                    {isLoading ? (
                      // Loading skeleton for related UMKMs
                      Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2">
                          <Skeleton className="h-16 w-16 rounded-lg" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="h-3 w-1/4" />
                          </div>
                        </div>
                      ))
                    ) : relatedUMKMs && relatedUMKMs.length > 0 ? (
                      relatedUMKMs.map((related, idx) => (
                        <Link
                          href={`/umkm/${related.slug}`}
                          key={related.id || idx}
                          className="block"
                        >
                          <div className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
                            <Image
                              src={
                                related.mainImageUrl ||
                                related.logoUrl ||
                                '/images/lain/pondokkalwa.png'
                              }
                              alt={related.name}
                              width={64}
                              height={64}
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium transition-colors group-hover:text-[#7ca186]">
                                {related.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {related.category?.name || 'UMKM'}
                              </p>
                              <div className="mt-1 flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-500">
                                  {formatRating(related.rating)}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-[#7ca186]" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="py-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Store className="h-8 w-8 text-gray-400" />
                          <p className="text-sm text-gray-500">Belum ada UMKM terkait</p>
                          <p className="text-xs text-gray-400">dalam kategori yang sama</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Location Map */}
              {umkm.latitude && umkm.longitude && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      Lokasi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${umkm.latitude},${umkm.longitude}`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Lokasi ${umkm.name}`}
                        className="rounded-lg"
                      ></iframe>
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          window.open(
                            `https://maps.google.com/?q=${umkm.latitude},${umkm.longitude}`
                          )
                        }
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Buka di Google Maps
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#7ca186] to-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Dukung UMKM Lokal Guguak Malalo</h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl">
            Setiap pembelian Anda membantu mengembangkan ekonomi lokal dan memajukan kesejahteraan
            masyarakat nagari
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/umkm">
              <Button
                size="lg"
                className="bg-white font-semibold text-[#7ca186] shadow-lg transition-all duration-200 hover:bg-gray-100 hover:text-[#6b8f73]"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Jelajahi UMKM Lainnya
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white bg-white/20 font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#7ca186]"
              onClick={() => {
                // You can replace this with actual marketplace URL
                window.open('https://marketplace.example.com', '_blank');
              }}
            >
              <Phone className="mr-2 h-5 w-5" />
              Kunjungi Marketplace
            </Button>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <MessageSquare className="h-5 w-5" />
              Hapus Ulasan
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Apakah Anda yakin ingin menghapus ulasan ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteDialog(false);
                setReviewToDelete(null);
              }}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Batal
            </Button>
            <Button
              onClick={confirmDeleteReview}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Hapus Ulasan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UMKMDetail;
