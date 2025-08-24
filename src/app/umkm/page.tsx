'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Store,
  Truck,
  Users,
  TrendingUp,
  MapPin,
  Phone,
  Star,
  ShoppingBag,
  FileText,
  Calendar,
  Clock,
  Globe,
  Award,
  Share2,
  Heart,
  Search,
  Filter,
  ChevronDown,
  ExternalLink,
  UserCheck,
  DollarSign,
  Briefcase,
  BookOpen,
} from 'lucide-react';
import { useUMKM, type UMKM } from '@/hooks/api/useUMKM';
import { type UMKMProgram } from '@/api/types/umkm';
import umkmProgramService from '@/api/services/umkmProgram.service';
import { UMKMService } from '@/api/services/umkm.service';
import { useToast } from '@/hooks/use-toast';

const UMKM = () => {
  const { toast } = useToast();
  const { getPublishedUMKMs, loading, error } = useUMKM();
  const umkmService = new UMKMService();

  // State management
  const [umkmFeatured, setUmkmFeatured] = useState<UMKM[]>([]);
  const [programPemberdayaan, setProgramPemberdayaan] = useState<UMKMProgram[]>([]);
  const [displayedUmkms, setDisplayedUmkms] = useState<UMKM[]>([]);
  const [currentUmkmPage, setCurrentUmkmPage] = useState(1);
  const [hasMoreUmkms, setHasMoreUmkms] = useState(false);
  const [loadingMoreUmkms, setLoadingMoreUmkms] = useState(false);
  const [statistics, setStatistics] = useState({
    totalUMKMs: 0,
    activeUMKMs: 0,
    totalEmployees: 0,
    averageRating: 0,
    monthlyGrowth: 0,
  });
  const [loadingData, setLoadingData] = useState(true);

  const UMKMS_PER_PAGE = 9;
  const INITIAL_UMKMS_DISPLAY = 9;

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingData(true);

        // Load UMKMs with better pagination and sorting
        // First load more data to properly sort and display
        const umkmResponse = await getPublishedUMKMs({
          limit: 50, // Load more to ensure we get enough data
          sortBy: 'createdAt',
          sortOrder: 'desc',
        });

        // Ensure we have valid data array
        const umkmData = umkmResponse.data || [];

        // Sort UMKMs: featured first (by createdAt desc), then regular ones (by rating desc)
        const featuredUmkms = umkmData.filter((umkm) => umkm.featured);
        const regularUmkms = umkmData.filter((umkm) => !umkm.featured);

        // Sort featured by createdAt descending (newest first)
        featuredUmkms.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        // Sort regular UMKMs by rating descending
        regularUmkms.sort((a, b) => {
          const ratingA = a.averageRating ?? a.rating ?? 0;
          const ratingB = b.averageRating ?? b.rating ?? 0;
          return ratingB - ratingA;
        });

        // Combine: featured first, then regular ones
        const sortedUmkms = [...featuredUmkms, ...regularUmkms];

        // Set initial displayed UMKMs (first 9)
        setDisplayedUmkms(sortedUmkms.slice(0, INITIAL_UMKMS_DISPLAY));

        // Check if there are more UMKMs to load
        setHasMoreUmkms(sortedUmkms.length > INITIAL_UMKMS_DISPLAY);

        // Store all UMKMs for pagination - use a different state variable
        setUmkmFeatured(sortedUmkms); // This will hold all UMKMs for pagination

        // Load published programs (limit to 3 for display)
        const programsResponse = await umkmProgramService.getPublishedPrograms({
          sortBy: 'startDate',
          sortOrder: 'desc',
        });
        setProgramPemberdayaan(programsResponse.data.slice(0, 3)); // Limit to 3 for display

        // Load statistics
        const statsResponse = await umkmService.getStatistics();
        console.log('Stats response:', statsResponse); // Debug log
        setStatistics({
          totalUMKMs: statsResponse.totalUmkm || 0,
          activeUMKMs: statsResponse.activeUmkm || 0,
          totalEmployees: 1245, // Can be calculated from backend or kept static
          averageRating: 0, // Calculate from UMKMs if needed
          monthlyGrowth: 15.2, // This should come from analytics if available
        });
      } catch (error: any) {
        console.error('Error loading UMKM data:', error);
        toast({
          title: 'Error',
          description: 'Gagal memuat data UMKM. Silakan refresh halaman.',
          variant: 'destructive',
        });
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [getPublishedUMKMs, toast]);

  // Load more UMKMs function
  const loadMoreUmkms = async () => {
    if (loadingMoreUmkms || !hasMoreUmkms) return;

    try {
      setLoadingMoreUmkms(true);

      // Calculate how many more to show
      const currentDisplayed = displayedUmkms.length;
      const nextBatch = umkmFeatured.slice(currentDisplayed, currentDisplayed + UMKMS_PER_PAGE);

      // Add new UMKMs to displayed list
      const newDisplayedUmkms = [...displayedUmkms, ...nextBatch];
      setDisplayedUmkms(newDisplayedUmkms);

      // Check if there are more to load
      setHasMoreUmkms(newDisplayedUmkms.length < umkmFeatured.length);
      setCurrentUmkmPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error loading more UMKMs:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat UMKM tambahan',
        variant: 'destructive',
      });
    } finally {
      setLoadingMoreUmkms(false);
    }
  };

  // Helper functions
  const formatRating = (rating: number): string => {
    return rating ? rating.toFixed(1) : '0.0';
  };

  // Get rating from backend calculation or fallback to database rating
  const getDisplayRating = (umkm: UMKM) => {
    return umkm.averageRating ?? umkm.rating ?? 0;
  };

  // Get review count from backend _count or fallback to database reviewsCount
  const getReviewCount = (umkm: UMKM) => {
    return umkm._count?.reviews ?? umkm.reviewsCount ?? 0;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'UPCOMING':
        return { variant: 'default' as const, label: 'Akan Datang' };
      case 'ACTIVE':
        return { variant: 'default' as const, label: 'Sedang Berlangsung' };
      case 'COMPLETED':
        return { variant: 'secondary' as const, label: 'Selesai' };
      default:
        return { variant: 'secondary' as const, label: 'Pendaftaran' };
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getDefaultImage = (umkm: UMKM): string => {
    if (umkm.mainImageUrl) return umkm.mainImageUrl;
    if (umkm.logoUrl) return umkm.logoUrl;
    if (umkm.images && umkm.images.length > 0) return umkm.images[0];
    return '/images/lain/pondokkalwa.png'; // fallback image
  };

  // Get featured image or fallback
  const getProgramImage = (program: UMKMProgram): string => {
    if (program.featuredImage) return program.featuredImage;
    // Default images based on category
    const categoryImages: Record<string, string> = {
      'teknologi-digital': '/images/umkm/program/digital.jpg',
      'desain-branding': '/images/umkm/program/branding.jpg',
      'manajemen-keuangan': '/images/umkm/program/finance.jpg',
      pemasaran: '/images/umkm/program/marketing.jpg',
      produksi: '/images/umkm/program/production.jpg',
      'sertifikasi-legalitas': '/images/umkm/program/legal.jpg',
      networking: '/images/umkm/program/networking.jpg',
    };
    return categoryImages[program.category] || '/images/umkm/program/default.jpg';
  };

  return (
    <>
      {/* Hero Section - Perbaikan padding untuk menghindari navbar overlap */}
      <section
        className="relative bg-cover bg-center pb-20 pt-32 text-white md:pt-36"
        style={{
          backgroundImage: "url('https://diskopukm.palembang.go.id/uploads/b_4_ab5d82a7dc.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ca186]/80 to-blue-600/80"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-2 text-3xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
            UMKM & Ekonomi
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-xl">
            Memberdayakan usaha mikro kecil menengah untuk kemajuan ekonomi Nagari Guguak Malalo
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#7ca186] to-blue-500">
                <Store className="h-8 w-8 text-white" />
              </div>
              {loadingData ? (
                <Skeleton className="mx-auto mb-2 h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold text-gray-800">{statistics.totalUMKMs}</div>
              )}
              <div className="text-gray-600">UMKM Terdaftar</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-green-500">
                <Users className="h-8 w-8 text-white" />
              </div>
              {loadingData ? (
                <Skeleton className="mx-auto mb-2 h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold text-gray-800">{statistics.totalEmployees}</div>
              )}
              <div className="text-gray-600">Tenaga Kerja</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-500">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              {loadingData ? (
                <Skeleton className="mx-auto mb-2 h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold text-gray-800">{statistics.monthlyGrowth}%</div>
              )}
              <div className="text-gray-600">Pertumbuhan</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-green-500">
                <Truck className="h-8 w-8 text-white" />
              </div>
              {loadingData ? (
                <Skeleton className="mx-auto mb-2 h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold text-gray-800">{statistics.activeUMKMs}</div>
              )}
              <div className="text-gray-600">UMKM Aktif</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured UMKM */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">UMKM Unggulan</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Produk-produk terbaik dari UMKM Nagari Guguak Malalo yang telah dikenal luas
            </p>
          </div>

          {loadingData ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[...Array(9)].map((_, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="mt-4 flex gap-2">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 flex-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : displayedUmkms.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {displayedUmkms.map((umkm, idx) => (
                  <Card key={umkm.id} className="overflow-hidden transition-shadow hover:shadow-xl">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${getDefaultImage(umkm)})` }}
                    >
                      <div className="flex h-full items-end bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-white/90 text-gray-800">
                            {umkm.category?.name || 'Kategori'}
                          </Badge>
                          {umkm.featured && (
                            <Badge className="bg-yellow-500/90 text-white">
                              <Star className="mr-1 h-3 w-3" />
                              Unggulan
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{umkm.name}</CardTitle>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="mr-1 h-4 w-4" />
                        {umkm.address}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 text-yellow-500" />
                          <span className="font-medium">
                            {formatRating(getDisplayRating(umkm))}
                          </span>
                          <span className="ml-1 text-sm text-gray-500">
                            ({getReviewCount(umkm)} ulasan)
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {umkm.description
                            ? umkm.description.length > 60
                              ? `${umkm.description.substring(0, 60)}...`
                              : umkm.description
                            : 'Produk berkualitas'}
                        </p>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="mr-2 h-4 w-4" />
                          {umkm.contactPhone || umkm.phone || 'Kontak tersedia'}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button
                            className="bg-brand-primary hover:bg-brand-primary-dark flex-1"
                            onClick={() => {
                              const lat = umkm.latitude || umkm.locationLat;
                              const lng = umkm.longitude || umkm.locationLng;
                              if (lat && lng) {
                                window.open(
                                  `https://www.google.com/maps?q=${lat},${lng}`,
                                  '_blank'
                                );
                              } else {
                                // Fallback to address search if coordinates not available
                                const address = encodeURIComponent(umkm.address);
                                window.open(
                                  `https://www.google.com/maps/search/${address}`,
                                  '_blank'
                                );
                              }
                            }}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            Lihat Lokasi
                          </Button>
                          <Link href={`/umkm/${umkm.slug}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              Detail
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreUmkms && (
                <div className="mt-12 text-center">
                  <Button
                    onClick={loadMoreUmkms}
                    disabled={loadingMoreUmkms}
                    size="lg"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {loadingMoreUmkms ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Memuat...
                      </>
                    ) : (
                      <>
                        Lihat Lebih Banyak UMKM
                        <span className="ml-2 text-sm">
                          ({displayedUmkms.length} dari {umkmFeatured.length})
                        </span>
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center">
              <Store className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <p className="text-gray-500">Belum ada UMKM yang tersedia</p>
            </div>
          )}
        </div>
      </section>

      {/* Program Pemberdayaan */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Program Pemberdayaan</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Berbagai program pelatihan dan pembinaan untuk meningkatkan kapasitas UMKM
            </p>
          </div>

          {loadingData ? (
            <div className="grid grid-cols-1 gap-8">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-xl border bg-white shadow-md"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/3">
                      <Skeleton className="h-64 w-full lg:h-full" />
                    </div>
                    <div className="w-full p-6 lg:w-2/3">
                      <Skeleton className="mb-4 h-8 w-3/4" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                      <div className="mb-8 mt-6">
                        <Skeleton className="h-24 w-full rounded-md" />
                      </div>
                      <div className="flex justify-end gap-4">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : programPemberdayaan.length > 0 ? (
            <div className="space-y-8">
              {programPemberdayaan.map((program, idx) => {
                const statusBadge = getStatusBadge(program.status);

                // Helper function to get category icon
                const getCategoryIcon = (category: string) => {
                  switch (category?.toLowerCase()) {
                    case 'teknologi-digital':
                      return <TrendingUp className="h-5 w-5" />;
                    case 'desain-branding':
                      return <FileText className="h-5 w-5" />;
                    case 'manajemen-keuangan':
                      return <DollarSign className="h-5 w-5" />;
                    case 'pemasaran':
                      return <TrendingUp className="h-5 w-5" />;
                    case 'produksi':
                      return <Briefcase className="h-5 w-5" />;
                    case 'sertifikasi-legalitas':
                      return <Award className="h-5 w-5" />;
                    case 'networking':
                      return <Users className="h-5 w-5" />;
                    default:
                      return <BookOpen className="h-5 w-5" />;
                  }
                };

                // Get category label
                const getCategoryLabel = (category: string) => {
                  const categories: Record<string, string> = {
                    'teknologi-digital': 'Teknologi Digital',
                    'desain-branding': 'Desain & Branding',
                    'manajemen-keuangan': 'Manajemen Keuangan',
                    pemasaran: 'Pemasaran',
                    produksi: 'Produksi',
                    'sertifikasi-legalitas': 'Sertifikasi & Legalitas',
                    networking: 'Networking',
                  };
                  return categories[category] || 'Program UMKM';
                };

                // Calculate days remaining or days passed
                const getDaysInfo = (startDate: string, endDate: string, status: string) => {
                  const now = new Date();
                  const start = new Date(startDate);
                  const end = new Date(endDate);

                  if (status === 'UPCOMING') {
                    const daysToStart = Math.ceil(
                      (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
                    );
                    return { value: daysToStart, label: 'hari lagi', color: 'text-blue-600' };
                  } else if (status === 'ACTIVE') {
                    const daysToEnd = Math.ceil(
                      (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
                    );
                    return { value: daysToEnd, label: 'hari tersisa', color: 'text-green-600' };
                  } else if (status === 'COMPLETED') {
                    const daysSinceEnd = Math.ceil(
                      (now.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)
                    );
                    return { value: daysSinceEnd, label: 'hari yang lalu', color: 'text-gray-600' };
                  }
                  return { value: 0, label: '', color: 'text-gray-600' };
                };

                const daysInfo = getDaysInfo(program.startDate, program.endDate, program.status);

                return (
                  <Link
                    key={program.id}
                    href={`/umkm/program/${program.slug || program.id}`}
                    className="block"
                  >
                    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:border-[#7ca186]/30 hover:shadow-lg">
                      {/* Status indicator ribbon */}
                      <div
                        className={`absolute -right-12 top-6 z-10 w-40 rotate-45 py-1 text-center text-xs font-semibold uppercase tracking-wider text-white ${
                          program.status === 'ACTIVE'
                            ? 'bg-green-500'
                            : program.status === 'UPCOMING'
                              ? 'bg-blue-500'
                              : program.status === 'COMPLETED'
                                ? 'bg-gray-500'
                                : 'bg-yellow-500'
                        }`}
                      >
                        {statusBadge.label}
                      </div>

                      <div className="flex flex-col lg:flex-row">
                        {/* Left side - Image with overlay */}
                        <div className="relative w-full lg:w-1/3">
                          <div className="relative h-64 overflow-hidden lg:h-full">
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                              style={{ backgroundImage: `url(${getProgramImage(program)})` }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                            {/* Category icon on image */}
                            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg">
                                {getCategoryIcon(program.category)}
                              </div>
                              <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-gray-800">
                                {getCategoryLabel(program.category)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right side - Content */}
                        <div className="flex w-full flex-col justify-between p-6 lg:w-2/3 lg:p-8">
                          <div>
                            <h3 className="mb-3 text-xl font-bold text-gray-800 transition-colors group-hover:text-[#7ca186]">
                              {program.name}
                            </h3>

                            {/* Timeline display */}
                            <div className="mb-4 flex items-center">
                              <div className="mr-8 flex items-center">
                                <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                                <span className="text-sm text-gray-600">
                                  {formatDate(program.startDate)}
                                </span>
                              </div>

                              <div className="relative mx-1 h-0.5 flex-grow bg-gray-200">
                                <div
                                  className={`absolute left-0 top-0 h-full ${
                                    program.status === 'UPCOMING'
                                      ? 'w-0 bg-blue-500'
                                      : program.status === 'ACTIVE'
                                        ? 'bg-green-500'
                                        : 'w-full bg-gray-500'
                                  }`}
                                  style={{
                                    width:
                                      program.status === 'ACTIVE'
                                        ? `${Math.min(
                                            100,
                                            Math.max(
                                              0,
                                              ((new Date().getTime() -
                                                new Date(program.startDate).getTime()) /
                                                (new Date(program.endDate).getTime() -
                                                  new Date(program.startDate).getTime())) *
                                                100
                                            )
                                          )}%`
                                        : undefined,
                                  }}
                                ></div>
                              </div>

                              <div className="ml-8 flex items-center">
                                <div className="mr-2 h-3 w-3 rounded-full bg-gray-500"></div>
                                <span className="text-sm text-gray-600">
                                  {formatDate(program.endDate)}
                                </span>
                              </div>
                            </div>

                            {/* Days info */}
                            <div className="mb-5 flex items-center text-sm">
                              <Clock className="mr-1.5 h-4 w-4 text-gray-500" />
                              <span className={`font-bold ${daysInfo.color}`}>
                                {daysInfo.value} {daysInfo.label}
                              </span>
                            </div>

                            {/* Program info */}
                            <div className="mb-6">
                              <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                                <div className="flex items-center text-sm">
                                  <UserCheck className="mr-2 h-4 w-4 text-[#7ca186]" />
                                  <span className="text-gray-700">
                                    <strong>{program.currentParticipants}</strong> dari{' '}
                                    <strong>{program.maxParticipants || 'Unlimited'}</strong>{' '}
                                    peserta
                                  </span>
                                </div>
                                {program.location && (
                                  <div className="flex items-center text-sm">
                                    <MapPin className="mr-2 h-4 w-4 text-[#7ca186]" />
                                    <span className="truncate text-gray-700">
                                      {program.location}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {program.shortDescription && (
                                <p className="line-clamp-2 text-gray-600">
                                  {program.shortDescription}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Buttons */}
                          <div className="flex justify-end gap-3">
                            <Button
                              variant="outline"
                              className="border-[#7ca186] text-[#7ca186] hover:bg-[#7ca186]/10"
                            >
                              Detail Program
                            </Button>
                            <Button className="bg-[#7ca186] hover:bg-[#6a8b72]">
                              Daftar Sekarang
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <FileText className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <p className="text-gray-500">Belum ada program pemberdayaan yang tersedia</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#7ca186] to-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ingin Mengembangkan Usaha Anda?</h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl">
            Dapatkan dukungan penuh untuk mengembangkan usaha Anda melalui program UMKM Nagari
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="border-2 border-white bg-white font-semibold text-[#7ca186] shadow-lg hover:bg-gray-100 hover:shadow-xl"
            >
              <FileText className="mr-2 h-5 w-5" />
              Daftar UMKM
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white bg-white/15 font-semibold text-white shadow-lg backdrop-blur-sm hover:bg-white hover:text-[#7ca186] hover:shadow-xl"
            >
              <Users className="mr-2 h-5 w-5" />
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UMKM;
