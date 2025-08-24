'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CalendarDays,
  Users,
  MapPin,
  Clock,
  GraduationCap,
  FileText,
  Star,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  Target,
  Award,
  DollarSign,
  BookOpen,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Loader2,
} from 'lucide-react';
import { type UMKMProgram } from '@/api/types/umkm';
import umkmProgramService from '@/api/services/umkmProgram.service';
import { useToast } from '@/hooks/use-toast';
import ProgramRegistrationModal from '@/components/umkm/ProgramRegistrationModal';
import { checkProgramRegistrationStatus } from '@/utils/fingerprint';

const ProgramDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const slug = params?.slug as string;

  const [program, setProgram] = useState<UMKMProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add registration modal state
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  // Fetch program data when component mounts
  useEffect(() => {
    const fetchProgramData = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        const programData = await umkmProgramService.getProgramBySlug(slug);
        setProgram(programData);
      } catch (error) {
        console.error('Error fetching program data:', error);
        setError(error instanceof Error ? error.message : 'Program tidak dapat dimuat');
        toast({
          title: 'Error',
          description: 'Gagal memuat data program. Silakan coba lagi nanti.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProgramData();
    window.scrollTo(0, 0);
  }, [slug, toast]);

  // Check if user already registered for this program
  useEffect(() => {
    if (program) {
      const registered = checkProgramRegistrationStatus(program.id);
      setIsAlreadyRegistered(registered);
    }
  }, [program]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'UPCOMING':
        return (
          <Badge className="border-blue-200 bg-blue-100 text-blue-700">
            <Clock className="mr-1 h-3 w-3" />
            Akan Datang
          </Badge>
        );
      case 'ACTIVE':
        return (
          <Badge className="border-green-200 bg-green-100 text-green-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Sedang Berlangsung
          </Badge>
        );
      case 'COMPLETED':
        return (
          <Badge className="border-gray-200 bg-gray-100 text-gray-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Selesai
          </Badge>
        );
      case 'CANCELLED':
        return (
          <Badge className="border-red-200 bg-red-100 text-red-700">
            <AlertCircle className="mr-1 h-3 w-3" />
            Dibatalkan
          </Badge>
        );
      case 'INACTIVE':
        return (
          <Badge className="border-yellow-200 bg-yellow-100 text-yellow-700">
            <AlertCircle className="mr-1 h-3 w-3" />
            Tidak Aktif
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Format date from ISO to Indonesian format
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return 'Tanggal tidak tersedia';
    }
  };

  // Get category icon component
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
      lainnya: 'Lainnya',
    };
    return categories[category] || 'Program UMKM';
  };

  // Calculate days remaining or days passed
  const getDaysInfo = (startDate: string, endDate: string, status: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (status === 'UPCOMING') {
      const daysToStart = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return { value: daysToStart, label: 'hari lagi', color: 'text-blue-600' };
    } else if (status === 'ACTIVE') {
      const daysToEnd = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return { value: daysToEnd, label: 'hari tersisa', color: 'text-green-600' };
    } else if (status === 'COMPLETED') {
      const daysSinceEnd = Math.ceil((now.getTime() - end.getTime()) / (1000 * 60 * 60 * 24));
      return { value: daysSinceEnd, label: 'hari yang lalu', color: 'text-gray-600' };
    }
    return { value: 0, label: '', color: 'text-gray-600' };
  };

  // Get program image with fallback
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 pt-28">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="mr-2 h-10 w-10 animate-spin text-[#7ca186]" />
            <span className="text-lg text-gray-600">Memuat detail program...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 pt-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <AlertCircle className="mx-auto mb-4 h-16 w-16 text-yellow-500" />
            <h1 className="mb-4 text-2xl font-bold text-gray-800">Program Tidak Ditemukan</h1>
            <p className="mb-8 text-gray-600">
              {error || 'Maaf, program yang Anda cari tidak dapat ditemukan.'}
            </p>
            <Link href="/umkm">
              <Button className="bg-[#7ca186] hover:bg-[#6a8b72]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke UMKM
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate program details
  const daysInfo = getDaysInfo(program.startDate, program.endDate, program.status);
  const isFree = program.budget === 'Gratis' || program.budget === '0' || !program.budget;
  const currentParticipants = program.currentParticipants || 0;
  const maxParticipants = program.maxParticipants || 0;

  return (
    <>
      {/* Modern Hero Section with overlay gradient */}
      <section className="relative overflow-hidden bg-gray-900 pb-12 pt-28 md:pb-20">
        {/* Background image with modern overlay */}
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url('${getProgramImage(program)}')`,
            filter: 'blur(4px)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/90"></div>

        {/* Content container */}
        <div className="container relative mx-auto px-4">
          {/* Back button */}
          <div className="mb-8">
            <Link href="/umkm">
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-gray-800"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Kembali ke UMKM
              </Button>
            </Link>
          </div>

          {/* Program header */}
          <div className="mb-6 max-w-4xl">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                {getCategoryLabel(program.category)}
              </Badge>
              {getStatusBadge(program.status)}
              {isFree && (
                <Badge variant="outline" className="border-green-200 bg-green-500/80 text-white">
                  <DollarSign className="mr-1 h-3 w-3" />
                  Gratis
                </Badge>
              )}
            </div>

            <h1 className="mb-4 text-3xl font-bold text-white md:mb-6 md:text-4xl lg:text-5xl">
              {program.name}
            </h1>

            <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-white/90 md:items-center">
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-5 w-5" />
                <span>
                  {formatDate(program.startDate)} - {formatDate(program.endDate)}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{program.location || 'Lokasi belum ditentukan'}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                <span>
                  {currentParticipants}/{maxParticipants || 'Unlimited'} peserta
                </span>
              </div>
            </div>

            {/* Timeline indicator for desktop */}
            <div className="hidden w-full max-w-lg items-center md:flex">
              <div className="mr-4 flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-white/80">Mulai</span>
              </div>

              <div className="relative h-1.5 flex-grow rounded-full bg-white/20">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full ${
                    program.status === 'UPCOMING'
                      ? 'w-0 bg-blue-500'
                      : program.status === 'ACTIVE'
                        ? 'bg-green-500'
                        : 'w-full bg-gray-400'
                  }`}
                  style={{
                    width:
                      program.status === 'ACTIVE'
                        ? `${Math.min(
                            100,
                            Math.max(
                              0,
                              ((new Date().getTime() - new Date(program.startDate).getTime()) /
                                (new Date(program.endDate).getTime() -
                                  new Date(program.startDate).getTime())) *
                                100
                            )
                          )}%`
                        : undefined,
                  }}
                ></div>
              </div>

              <div className="ml-4 flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-gray-400"></div>
                <span className="text-xs text-white/80">Selesai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Tabs Navigation */}
              <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-0">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-5 rounded-none border-b bg-gray-50">
                      <TabsTrigger
                        value="overview"
                        className="rounded-none data-[state=active]:bg-white"
                      >
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="jadwal"
                        className="rounded-none data-[state=active]:bg-white"
                      >
                        Jadwal
                      </TabsTrigger>
                      <TabsTrigger
                        value="fasilitator"
                        className="rounded-none data-[state=active]:bg-white"
                      >
                        Trainer
                      </TabsTrigger>
                      <TabsTrigger
                        value="gallery"
                        className="rounded-none data-[state=active]:bg-white"
                      >
                        Galeri
                      </TabsTrigger>
                      <TabsTrigger
                        value="faq"
                        className="rounded-none data-[state=active]:bg-white"
                      >
                        FAQ
                      </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="p-6 pt-8">
                      {/* Program Budget - Moved from registration card */}
                      {program.budget && (
                        <div className="mb-6 inline-flex items-center rounded-lg bg-[#7ca186]/10 px-4 py-2">
                          <DollarSign className="mr-2 h-5 w-5 text-[#7ca186]" />
                          <div>
                            <div className="font-medium text-gray-700">Anggaran Program</div>
                            <div className="text-lg font-bold text-[#7ca186]">{program.budget}</div>
                          </div>
                        </div>
                      )}

                      <p className="mb-6 whitespace-pre-line leading-relaxed text-gray-700">
                        {program.description}
                      </p>

                      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Persyaratan */}
                        {program.requirements && program.requirements.length > 0 && (
                          <div className="rounded-lg bg-gray-50 p-5">
                            <h4 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                              Persyaratan Peserta
                            </h4>
                            <ul className="space-y-2">
                              {program.requirements.map((req: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <span className="text-xs font-bold">{index + 1}</span>
                                  </div>
                                  <span className="text-sm text-gray-600">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Manfaat */}
                        {program.benefits && program.benefits.length > 0 && (
                          <div className="rounded-lg bg-blue-50 p-5">
                            <h4 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                              <Target className="mr-2 h-5 w-5 text-blue-500" />
                              Manfaat Program
                            </h4>
                            <ul className="space-y-2">
                              {program.benefits.map((benefit: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <span className="text-xs font-bold">{index + 1}</span>
                                  </div>
                                  <span className="text-sm text-gray-600">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Additional information */}
                      {program.organizer && (
                        <div className="mb-6">
                          <h4 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                            <Briefcase className="mr-2 h-5 w-5 text-[#7ca186]" />
                            Penyelenggara
                          </h4>
                          <div className="flex items-center rounded-lg border border-[#7ca186]/20 bg-[#7ca186]/5 p-4">
                            <span className="text-gray-700">{program.organizer}</span>
                          </div>
                        </div>
                      )}

                      {/* Achievements */}
                      {program.achievements && program.achievements.length > 0 && (
                        <div>
                          <h4 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                            <Award className="mr-2 h-5 w-5 text-amber-500" />
                            Pencapaian Program
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {program.achievements.map((achievement: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center rounded-lg bg-amber-50 p-3"
                              >
                                <Award className="mr-2 h-4 w-4 text-amber-500" />
                                <span className="text-sm text-gray-700">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    {/* Jadwal Tab */}
                    <TabsContent value="jadwal" className="p-6">
                      <div className="mb-6 flex items-center">
                        <Calendar className="mr-2 h-6 w-6 text-blue-600" />
                        <h3 className="text-xl font-semibold">Jadwal Kegiatan</h3>
                      </div>

                      {program.schedule && program.schedule.length > 0 ? (
                        <div className="space-y-4">
                          {program.schedule.map((item: any, index: number) => (
                            <div
                              key={index}
                              className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                            >
                              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                  <h4 className="mb-1 font-semibold text-gray-800">
                                    {item.activity}
                                  </h4>
                                  <div className="mb-2 flex items-center gap-3 text-sm text-gray-600">
                                    <span className="inline-flex items-center">
                                      <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                                      {item.date}
                                    </span>
                                    <span className="inline-flex items-center">
                                      <Clock className="mr-1 h-4 w-4 text-gray-400" />
                                      {item.time}
                                    </span>
                                  </div>
                                  <p className="text-gray-700">{item.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg bg-gray-50 py-8 text-center">
                          <Calendar className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                          <p className="text-gray-500">Jadwal belum tersedia</p>
                        </div>
                      )}
                    </TabsContent>

                    {/* Fasilitator Tab */}
                    <TabsContent value="fasilitator" className="p-6">
                      <div className="mb-6 flex items-center">
                        <Users className="mr-2 h-6 w-6 text-purple-600" />
                        <h3 className="text-xl font-semibold">Fasilitator Program</h3>
                      </div>

                      {program.organizer ? (
                        <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6">
                          <div className="mb-4 flex items-start gap-4">
                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                              <Users className="h-8 w-8 text-blue-500" />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-gray-800">
                                {program.organizer}
                              </h4>
                              {program.organizerEmail && (
                                <p className="text-sm text-[#7ca186]">{program.organizerEmail}</p>
                              )}
                            </div>
                          </div>
                          {program.organizerContact && (
                            <div className="mt-4 flex items-center rounded-lg border border-gray-100 bg-white p-3">
                              <Phone className="mr-2 h-4 w-4 text-gray-500" />
                              <p className="text-sm text-gray-600">{program.organizerContact}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="rounded-lg bg-gray-50 py-8 text-center">
                          <Users className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                          <p className="text-gray-500">Informasi fasilitator belum tersedia</p>
                        </div>
                      )}
                    </TabsContent>

                    {/* Gallery Tab */}
                    <TabsContent value="gallery" className="p-6">
                      <div className="mb-6 flex items-center">
                        <FileText className="mr-2 h-6 w-6 text-green-600" />
                        <h3 className="text-xl font-semibold">Galeri Program</h3>
                      </div>

                      {program.gallery && program.gallery.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                          {program.gallery.map((image: string, index: number) => (
                            <div
                              key={index}
                              className="aspect-square overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                            >
                              <img
                                src={image}
                                alt={`Galeri ${index + 1}`}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg bg-gray-50 py-8 text-center">
                          <FileText className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                          <p className="text-gray-500">Galeri belum tersedia</p>
                        </div>
                      )}
                    </TabsContent>

                    {/* FAQ Tab - Currently not available in the API */}
                    <TabsContent value="faq" className="p-6">
                      <div className="mb-6 flex items-center">
                        <MessageSquare className="mr-2 h-6 w-6 text-orange-600" />
                        <h3 className="text-xl font-semibold">Pertanyaan yang Sering Diajukan</h3>
                      </div>

                      <div className="rounded-lg bg-gray-50 py-8 text-center">
                        <MessageSquare className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                        <p className="text-gray-500">FAQ belum tersedia</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Modern Registration Card */}
              <Card className="overflow-hidden border border-gray-100 shadow-sm">
                <div className="bg-gradient-to-r from-[#7ca186]/90 to-[#7ca186] p-6 text-white">
                  <h3 className="flex items-center text-xl font-bold">
                    <Users className="mr-2 h-5 w-5" />
                    Pendaftaran Program
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    {program.status === 'ACTIVE' || program.status === 'UPCOMING'
                      ? 'Daftar sekarang untuk mengikuti program ini'
                      : 'Pendaftaran telah ditutup'}
                  </p>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Kuota Tersedia:</span>
                        <span className="font-medium">
                          {maxParticipants
                            ? `${maxParticipants - currentParticipants} tempat`
                            : 'Tidak terbatas'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Status:</span>
                        <span className="font-medium">
                          {program.status === 'ACTIVE'
                            ? 'Sedang Berlangsung'
                            : program.status === 'UPCOMING'
                              ? 'Akan Datang'
                              : program.status === 'COMPLETED'
                                ? 'Selesai'
                                : program.status === 'CANCELLED'
                                  ? 'Dibatalkan'
                                  : program.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Durasi Program:</span>
                        <span className="font-medium">
                          {Math.ceil(
                            (new Date(program.endDate).getTime() -
                              new Date(program.startDate).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{' '}
                          hari
                        </span>
                      </div>
                    </div>

                    {maxParticipants > 0 && (
                      <>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div
                            className="h-2 rounded-full bg-[#7ca186]"
                            style={{
                              width: `${(currentParticipants / maxParticipants) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-center text-xs text-gray-600">
                          {currentParticipants} dari {maxParticipants} peserta
                        </div>
                      </>
                    )}

                    <Button
                      className="w-full bg-[#7ca186] text-white hover:bg-[#6a8b72]"
                      size="lg"
                      disabled={
                        program.status === 'COMPLETED' ||
                        program.status === 'CANCELLED' ||
                        isAlreadyRegistered
                      }
                      onClick={() => setShowRegistrationModal(true)}
                    >
                      {program.status === 'ACTIVE' || program.status === 'UPCOMING'
                        ? isAlreadyRegistered
                          ? 'Anda Sudah Terdaftar'
                          : 'Daftar Sekarang'
                        : 'Pendaftaran Ditutup'}
                    </Button>

                    {/* Time status indicator */}
                    {(program.status === 'ACTIVE' || program.status === 'UPCOMING') && (
                      <div
                        className={`flex items-center justify-center rounded-md p-2 ${
                          program.status === 'UPCOMING'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-green-50 text-green-600'
                        }`}
                      >
                        <Clock className="mr-1.5 h-4 w-4" />
                        <span className="text-sm font-medium">
                          {daysInfo.value} {daysInfo.label}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info Card */}
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Phone className="mr-2 h-5 w-5 text-blue-600" />
                    Informasi Kontak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {program.organizer && (
                      <div>
                        <div className="font-medium text-gray-800">Koordinator</div>
                        <div className="text-gray-600">{program.organizer}</div>
                      </div>
                    )}
                    {program.organizerContact && (
                      <div>
                        <div className="font-medium text-gray-800">Telepon</div>
                        <div className="text-gray-600">{program.organizerContact}</div>
                      </div>
                    )}
                    {program.organizerEmail && (
                      <div>
                        <div className="font-medium text-gray-800">Email</div>
                        <div className="text-gray-600">{program.organizerEmail}</div>
                      </div>
                    )}
                  </div>
                  {(program.organizerContact || program.organizerEmail) && (
                    <div className="mt-4 flex gap-2">
                      {program.organizerContact && (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="mr-2 h-4 w-4" />
                          Telepon
                        </Button>
                      )}
                      {program.organizerEmail && (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Program Stats Card */}
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                    Statistik Program
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <div className="text-sm text-gray-600">Views</div>
                      <div className="text-xl font-bold">{program.viewsCount || 0}</div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <div className="text-sm text-gray-600">Peserta</div>
                      <div className="text-xl font-bold">{currentParticipants}</div>
                    </div>
                    <div className="col-span-2 rounded-lg bg-gray-50 p-3">
                      <div className="text-sm text-gray-600">Kategori</div>
                      <div className="flex items-center font-medium">
                        {getCategoryIcon(program.category)}
                        <span className="ml-2">{getCategoryLabel(program.category)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="bg-gradient-to-br from-[#7ca186] to-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Bergabung dengan Program Pemberdayaan UMKM</h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-white/90">
            Tingkatkan kemampuan dan kembangkan usaha Anda bersama program pemberdayaan yang telah
            terbukti efektif
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/umkm">
              <Button size="lg" className="bg-white font-medium text-[#7ca186] hover:bg-gray-100">
                <BookOpen className="mr-2 h-5 w-5" />
                Lihat Program Lainnya
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-white/15 font-medium text-white backdrop-blur-sm hover:bg-white hover:text-[#7ca186]"
            >
              <Phone className="mr-2 h-5 w-5" />
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {program && (
        <ProgramRegistrationModal
          program={program}
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          onSuccess={() => setIsAlreadyRegistered(true)}
        />
      )}
    </>
  );
};

export default ProgramDetail;
