import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  ArrowRight,
  Clock,
  Landmark,
  HelpCircle,
  FileCheck,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Phone,
  Download,
  ExternalLink,
  Send,
} from "lucide-react";

// Import necessary icons for different service types
import {
  Home,
  Briefcase,
  Baby,
  FileX2,
  ScrollText,
  UserCheck,
  Building2,
  Hammer,
  Users,
  Scale,
  Heart,
  BookOpen,
  HeartPulse,
  BarChart2,
  Building,
} from "lucide-react";

const LayananDetail = () => {
  const navigate = useNavigate();
  const { category, serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [themeColors, setThemeColors] = useState({
    gradientFrom: "from-emerald-50",
    gradientTo: "to-blue-50",
    buttonBg: "bg-emerald-600",
    buttonHover: "hover:bg-emerald-700",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-500",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    badgeBorder: "border-emerald-200",
    buttonOutlineBorder: "border-emerald-300",
    buttonOutlineText: "text-emerald-700",
    buttonOutlineHover: "hover:bg-emerald-50",
  });

  // Simulated data for all service categories
  const serviceData = {
    kependudukan: [
      {
        id: "domisili",
        nama: "Surat Keterangan Domisili",
        estimasi: "1-2 hari",
        status: "available",
        icon: <Home className="h-10 w-10 text-emerald-500" />,
        deskripsi:
          "Surat pengantar yang menyatakan tempat tinggal resmi penduduk untuk keperluan administrasi.",
        persyaratan: [
          "Fotokopi KTP",
          "Fotokopi Kartu Keluarga",
          "Surat Pengantar RT/RW",
        ],
        biaya: "Gratis",
        prosedur: [
          "Mengisi formulir permohonan di kantor nagari atau melalui website",
          "Melampirkan dokumen persyaratan",
          "Menunggu verifikasi data oleh petugas (1-2 hari)",
          "Pengambilan surat di kantor nagari atau cetak mandiri (e-document)",
        ],
        kontak: {
          petugas: "Edo Adiyat Putra",
          telepon: "0852-7116-4143",
          email: "layanan@gugukmalalo.id",
        },
        berkas: [
          { nama: "Formulir Permohonan", url: "/berkas/form-domisili.pdf" },
          { nama: "Contoh Surat Domisili", url: "/berkas/contoh-domisili.pdf" },
        ],
        faq: [
          {
            pertanyaan: "Berapa lama masa berlaku surat keterangan domisili?",
            jawaban:
              "Surat keterangan domisili umumnya berlaku selama 6 bulan sejak tanggal diterbitkan.",
          },
          {
            pertanyaan: "Apakah bisa diwakilkan oleh orang lain?",
            jawaban:
              "Bisa, dengan membawa surat kuasa dan fotokopi KTP pemberi kuasa dan penerima kuasa.",
          },
        ],
      },
      // Additional service data would go here
    ],
    ekonomi: [
      {
        id: "umkm",
        nama: "Pendaftaran UMKM",
        estimasi: "3-5 hari",
        status: "available",
        icon: <Briefcase className="h-10 w-10 text-blue-500" />,
        deskripsi:
          "Pendaftaran usaha mikro kecil menengah untuk masuk dalam database UMKM nagari.",
        persyaratan: ["Fotokopi KTP", "Foto usaha", "Deskripsi usaha"],
        biaya: "Gratis",
        prosedur: [
          "Mengisi formulir pendaftaran UMKM",
          "Melampirkan dokumen persyaratan",
          "Melakukan verifikasi lokasi usaha",
          "Mendapatkan Surat Keterangan UMKM dari nagari",
        ],
        kontak: {
          petugas: "Junaida.A",
          telepon: "0812-3456-7890",
          email: "umkm@gugukmalalo.id",
        },
        berkas: [
          { nama: "Formulir Pendaftaran UMKM", url: "/berkas/form-umkm.pdf" },
          { nama: "Panduan Pendaftaran", url: "/berkas/panduan-umkm.pdf" },
        ],
        faq: [
          {
            pertanyaan: "Apa manfaat mendaftar UMKM di nagari?",
            jawaban:
              "Mendapatkan akses ke program pemberdayaan, pelatihan, bantuan modal, dan pemasaran produk melalui platform digital nagari.",
          },
        ],
      },
    ],
    sosial: [
      {
        id: "bantuan-sosial",
        nama: "Pendaftaran Bantuan Sosial",
        estimasi: "7-10 hari",
        status: "available",
        icon: <Heart className="h-10 w-10 text-rose-500" />,
        deskripsi:
          "Pendaftaran untuk program bantuan sosial bagi warga yang membutuhkan.",
        persyaratan: ["Fotokopi KTP", "Fotokopi KK", "SKTM", "Foto rumah"],
        biaya: "Gratis",
        prosedur: [
          "Mengajukan permohonan bantuan sosial",
          "Melengkapi berkas persyaratan",
          "Verifikasi data dan survei lokasi",
          "Penetapan kelayakan penerima bantuan",
        ],
        kontak: {
          petugas: "Ajisman",
          telepon: "0813-4567-8901",
          email: "sosial@gugukmalalo.id",
        },
        berkas: [
          { nama: "Formulir Bantuan Sosial", url: "/berkas/form-bantuan.pdf" },
        ],
        faq: [
          {
            pertanyaan: "Kapan penyaluran bantuan sosial dilakukan?",
            jawaban:
              "Penyaluran bantuan sosial dilakukan sesuai jadwal program yang berjalan, biasanya setiap awal bulan.",
          },
        ],
      },
    ],
    // Additional categories would go here
  };

  // Service categories with consistent color tones
  const serviceCategories = [
    {
      id: "kependudukan",
      title: "Layanan Administrasi Digital",
      icon: <FileText className="h-16 w-16 text-emerald-500" />,
      description:
        "Berbagai layanan administrasi kependudukan untuk warga Nagari Guguak malalo",
      color: "from-emerald-50 to-emerald-100",
      iconColor: "text-emerald-500",
    },
    {
      id: "ekonomi",
      title: "Layanan Ekonomi",
      icon: <BarChart2 className="h-16 w-16 text-blue-500" />,
      description: "Dukungan untuk pengembangan usaha dan ekonomi masyarakat",
      color: "from-blue-50 to-blue-100",
      iconColor: "text-blue-500",
    },
    {
      id: "sosial",
      title: "Layanan Sosial",
      icon: <Heart className="h-16 w-16 text-rose-500" />,
      description: "Program bantuan dan pemberdayaan masyarakat",
      color: "from-rose-50 to-rose-100",
      iconColor: "text-rose-500",
    },
    {
      id: "pembangunan",
      title: "Layanan Pembangunan",
      icon: <Building className="h-16 w-16 text-amber-500" />,
      description: "Layanan terkait pembangunan dan infrastruktur nagari",
      color: "from-amber-50 to-amber-100",
      iconColor: "text-amber-500",
    },
    {
      id: "posbakum",
      title: "Layanan Bantuan Hukum",
      icon: <Scale className="h-16 w-16 text-purple-500" />,
      description: "Layanan bantuan hukum dan konsultasi legal",
      color: "from-purple-50 to-purple-100",
      iconColor: "text-purple-500",
    },
    {
      id: "pendidikan",
      title: "Layanan Pendidikan",
      icon: <BookOpen className="h-16 w-16 text-teal-500" />,
      description: "Informasi dan dukungan untuk pendidikan",
      color: "from-teal-50 to-teal-100",
      iconColor: "text-teal-500",
    },
    {
      id: "kesehatan",
      title: "Layanan Kesehatan",
      icon: <HeartPulse className="h-16 w-16 text-red-500" />,
      description: "Layanan terkait kesehatan masyarakat",
      color: "from-red-50 to-red-100",
      iconColor: "text-red-500",
    },
  ];

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    if (category && serviceId && serviceData[category]) {
      // Find the service by ID
      const foundService = serviceData[category].find(
        (s) => s.id === serviceId
      );

      // If not found by ID, try using the index (for older links)
      const serviceIndex = parseInt(serviceId) - 1;
      const serviceByIndex =
        !foundService && !isNaN(serviceIndex) && serviceIndex >= 0
          ? serviceData[category][serviceIndex]
          : null;

      if (foundService || serviceByIndex) {
        setService(foundService || serviceByIndex);

        // Find the category for styling
        const categoryConfig = serviceCategories.find(
          (cat) => cat.id === category
        );
        if (categoryConfig) {
          // Extract color values from the category's color and iconColor properties
          const baseColor = categoryConfig.iconColor.replace("text-", "");
          const bgGradientFrom = categoryConfig.color.split(" ")[0];
          const bgGradientTo = categoryConfig.color.split(" ")[1];

          setThemeColors({
            gradientFrom: bgGradientFrom,
            gradientTo: bgGradientTo,
            buttonBg: `bg-${baseColor}-600`,
            buttonHover: `hover:bg-${baseColor}-700`,
            iconColor: categoryConfig.iconColor,
            borderColor: `border-${baseColor}-500`,
            badgeBg: `bg-${baseColor}-100`,
            badgeText: `text-${baseColor}-800`,
            badgeBorder: `border-${baseColor}-200`,
            buttonOutlineBorder: `border-${baseColor}-300`,
            buttonOutlineText: `text-${baseColor}-700`,
            buttonOutlineHover: `hover:bg-${baseColor}-50`,
          });
        }
      }
    }

    setLoading(false);
  }, [category, serviceId]);

  const handleSubmitApplication = () => {
    // Add form submission logic here
    // For now, just show an alert
    alert(`Pengajuan untuk ${service?.nama || "layanan"} sedang diproses`);
    // navigate to form page or show modal
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat informasi layanan...</p>
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Layanan Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-6">
            Maaf, layanan yang Anda cari tidak tersedia.
          </p>
          <Link to={`/layanan/${category || ""}`}>
            <Button>Kembali to Daftar Layanan</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section - Improved for mobile */}
      <section
        className={`relative py-10 md:py-16 bg-gradient-to-r ${themeColors.gradientFrom} ${themeColors.gradientTo}`}
      >
        <div className="container mx-auto px-4">
          <Link
            to={`/layanan/${category}`}
            className="inline-flex items-center text-sm text-gray-600 hover:text-emerald-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Kembali ke daftar layanan</span>
            <span className="inline sm:hidden">Kembali</span>
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
            <div className="bg-white p-5 md:p-6 rounded-full shadow-lg mb-4 md:mb-0">
              {service.icon || (
                <FileText
                  className={`h-12 w-12 md:h-16 md:w-16 ${themeColors.iconColor}`}
                />
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-2">
                {service.nama}
              </h1>
              <p className="text-gray-700 max-w-3xl text-sm md:text-base">
                {service.deskripsi}
              </p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                <Badge
                  className={`${themeColors.badgeBg} ${themeColors.badgeText}`}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  Estimasi: {service.estimasi}
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  <Landmark className="h-3 w-3 mr-1" />
                  {service.biaya || "Gratis"}
                </Badge>
                {service.status === "available" ? (
                  <Badge className="bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Tersedia
                  </Badge>
                ) : (
                  <Badge className="bg-yellow-100 text-yellow-700">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Maintenance
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Application Button - More prominent on mobile */}
          <div className="mt-6 flex justify-center md:justify-end">
            <Button
              size="lg"
              onClick={handleSubmitApplication}
              className="bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white flex items-center gap-2 shadow-lg px-6 py-6 h-auto font-semibold transition-all duration-300"
            >
              <Send className="h-5 w-5" />
              <span className="font-medium">Ajukan Permohonan Sekarang</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content - Improved tabs for mobile */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Mobile-friendly tabs with scroll */}
          <div className="overflow-x-auto pb-2">
            <Tabs
              defaultValue="overview"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid min-w-[500px] md:min-w-0 w-full grid-cols-4 mb-8">
                <TabsTrigger value="overview" className="text-sm md:text-base">
                  <FileText className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Informasi Umum</span>
                  <span className="inline sm:hidden">Info</span>
                </TabsTrigger>
                <TabsTrigger value="process" className="text-sm md:text-base">
                  <CheckCircle2 className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Alur Proses</span>
                  <span className="inline sm:hidden">Proses</span>
                </TabsTrigger>
                <TabsTrigger
                  value="requirements"
                  className="text-sm md:text-base"
                >
                  <FileCheck className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Persyaratan</span>
                  <span className="inline sm:hidden">Syarat</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="text-sm md:text-base">
                  <HelpCircle className="h-4 w-4 mr-1 md:mr-2" />
                  <span>FAQ</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">
                          Tentang Layanan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="prose max-w-none">
                        <p>{service.deskripsi}</p>

                        <h3 className="text-lg font-semibold mt-6">
                          Manfaat Layanan
                        </h3>
                        <ul>
                          <li>
                            Memenuhi kebutuhan administrasi kependudukan secara
                            resmi
                          </li>
                          <li>Proses mudah dan cepat dengan sistem digital</li>
                          <li>
                            Biaya gratis untuk semua masyarakat Nagari Guguak
                            Malalo
                          </li>
                          <li>Bisa digunakan untuk berbagai keperluan resmi</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6">
                          Dasar Hukum
                        </h3>
                        <ul>
                          <li>
                            Peraturan Nagari No. 5 Tahun 2023 tentang Layanan
                            Administrasi Digital
                          </li>
                          <li>
                            Peraturan Bupati Tanah Datar No. 32 Tahun 2022
                          </li>
                          <li>
                            UU No. 23 Tahun 2006 tentang Administrasi
                            Kependudukan
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Enhanced CTA Button - More visible */}
                    <div className="sticky bottom-6 mt-6">
                      <Button
                        className="w-full bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white text-lg py-6 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300"
                        size="lg"
                      >
                        <Send className="h-5 w-5" />
                        Ajukan Permohonan Sekarang
                      </Button>
                    </div>
                  </div>

                  <div>
                    {/* Contact Information */}
                    <Card className="mb-6">
                      <CardHeader className="pb-2 md:pb-3">
                        <CardTitle className="text-base md:text-lg flex items-center gap-2">
                          <Phone
                            className={`h-4 w-4 md:h-5 md:w-5 ${themeColors.iconColor}`}
                          />
                          Informasi Kontak
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {service.kontak ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                Petugas:
                              </span>
                              <span className="font-medium text-sm md:text-base">
                                {service.kontak.petugas}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                Telepon:
                              </span>
                              <a
                                href={`tel:${service.kontak.telepon}`}
                                className="font-medium text-blue-600 hover:underline text-sm md:text-base"
                              >
                                {service.kontak.telepon}
                              </a>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                Email:
                              </span>
                              <a
                                href={`mailto:${service.kontak.email}`}
                                className="font-medium text-blue-600 hover:underline text-sm md:text-base"
                              >
                                {service.kontak.email}
                              </a>
                            </div>
                            <Button className="w-full mt-2" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Hubungi Petugas
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex flex-col">
                              <span className="font-medium text-sm md:text-base">
                                Kantor Wali Nagari
                              </span>
                              <span className="text-xs md:text-sm text-gray-500">
                                Senin-Jumat, 08:00-16:00
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                Telepon:
                              </span>
                              <a
                                href="tel:0752-123-4567"
                                className="font-medium text-blue-600 hover:underline text-sm md:text-base"
                              >
                                (0752) 123-4567
                              </a>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                Email:
                              </span>
                              <a
                                href="mailto:layanan@gugukmalalo.id"
                                className="font-medium text-blue-600 hover:underline text-sm md:text-base"
                              >
                                layanan@gugukmalalo.id
                              </a>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Document Downloads */}
                    {service.berkas && service.berkas.length > 0 && (
                      <Card className="border shadow">
                        <CardHeader className="pb-2 md:pb-3">
                          <CardTitle className="text-base md:text-lg flex items-center gap-2">
                            <Download
                              className={`h-4 w-4 md:h-5 md:w-5 ${themeColors.iconColor}`}
                            />
                            Dokumen & Formulir
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            {service.berkas.map((berkas, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                              >
                                <span className="text-sm md:text-base">
                                  {berkas.nama}
                                </span>
                                <Button size="sm" variant="ghost">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Process Tab - Improved for mobile */}
              <TabsContent value="process">
                <Card>
                  <CardHeader className="pb-2 md:pb-4">
                    <CardTitle className="text-lg md:text-xl">
                      Alur Proses Layanan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6 md:space-y-8">
                      {service.prosedur ? (
                        service.prosedur.map((step, idx) => (
                          <div key={idx} className="flex">
                            <div className="mr-3 md:mr-4 flex-shrink-0">
                              <div
                                className={`flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full ${themeColors.buttonBg} text-white font-bold text-sm md:text-base`}
                              >
                                {idx + 1}
                              </div>
                            </div>
                            <div>
                              <p className="mb-1 text-gray-700 text-sm md:text-base">
                                {step}
                              </p>
                              {idx < service.prosedur.length - 1 && (
                                <div className="mt-2 ml-3 md:ml-4 h-6 md:h-10 border-l-2 border-dashed border-gray-300"></div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="space-y-6 md:space-y-8">
                          {/* Default process steps */}
                          <div className="flex">
                            <div className="mr-3 md:mr-4 flex-shrink-0">
                              <div
                                className={`flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full ${themeColors.buttonBg} text-white font-bold text-sm md:text-base`}
                              >
                                1
                              </div>
                            </div>
                            <div>
                              <p className="mb-1 text-gray-700 text-sm md:text-base">
                                Mengisi formulir permohonan online atau di
                                kantor nagari
                              </p>
                              <div className="mt-2 ml-3 md:ml-4 h-6 md:h-10 border-l-2 border-dashed border-gray-300"></div>
                            </div>
                          </div>

                          {/* Continue with other default steps... */}
                          <div className="flex">
                            <div className="mr-3 md:mr-4 flex-shrink-0">
                              <div
                                className={`flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full ${themeColors.buttonBg} text-white font-bold text-sm md:text-base`}
                              >
                                2
                              </div>
                            </div>
                            <div>
                              <p className="mb-1 text-gray-700 text-sm md:text-base">
                                Melampirkan dokumen persyaratan yang dibutuhkan
                              </p>
                              <div className="mt-2 ml-3 md:ml-4 h-6 md:h-10 border-l-2 border-dashed border-gray-300"></div>
                            </div>
                          </div>

                          <div className="flex">
                            <div className="mr-3 md:mr-4 flex-shrink-0">
                              <div
                                className={`flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full ${themeColors.buttonBg} text-white font-bold text-sm md:text-base`}
                              >
                                3
                              </div>
                            </div>
                            <div>
                              <p className="mb-1 text-gray-700 text-sm md:text-base">
                                Verifikasi data oleh petugas
                              </p>
                              <div className="mt-2 ml-3 md:ml-4 h-6 md:h-10 border-l-2 border-dashed border-gray-300"></div>
                            </div>
                          </div>

                          <div className="flex">
                            <div className="mr-3 md:mr-4 flex-shrink-0">
                              <div
                                className={`flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full ${themeColors.buttonBg} text-white font-bold text-sm md:text-base`}
                              >
                                4
                              </div>
                            </div>
                            <div>
                              <p className="mb-1 text-gray-700 text-sm md:text-base">
                                Pengambilan dokumen atau download e-document
                                (sesuai estimasi waktu)
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Requirements Tab - Improved for mobile */}
              <TabsContent value="requirements">
                <Card>
                  <CardHeader className="pb-2 md:pb-4">
                    <CardTitle className="text-lg md:text-xl">
                      Persyaratan Dokumen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 md:space-y-4">
                      {service.persyaratan && service.persyaratan.length > 0 ? (
                        service.persyaratan.map((req, idx) => (
                          <div
                            key={idx}
                            className="flex items-start p-2 md:p-3 bg-gray-50 rounded-md"
                          >
                            <CheckCircle2
                              className={`h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 mt-0.5 ${themeColors.iconColor}`}
                            />
                            <div>
                              <p className="font-medium text-sm md:text-base">
                                {req}
                              </p>
                              {req.includes("KTP") && (
                                <p className="text-xs md:text-sm text-gray-600 mt-1">
                                  Pastikan KTP masih berlaku dan fotokopi jelas
                                  terbaca
                                </p>
                              )}
                              {req.includes("Kartu Keluarga") && (
                                <p className="text-xs md:text-sm text-gray-600 mt-1">
                                  Fotokopi KK terbaru dengan nama pemohon
                                  tercantum di dalamnya
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm md:text-base text-gray-600">
                          Tidak ada persyaratan khusus untuk layanan ini.
                        </p>
                      )}

                      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <div className="flex items-start">
                          <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-yellow-600 mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-yellow-800 text-sm md:text-base">
                              Catatan Penting
                            </h4>
                            <p className="text-xs md:text-sm text-yellow-700 mt-1">
                              Semua dokumen harus asli atau fotokopi yang jelas.
                              Untuk pengajuan online, dokumen harus discan
                              dengan jelas dalam format PDF atau JPG dengan
                              ukuran maksimal 2MB per file.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FAQ Tab - Improved for mobile */}
              <TabsContent value="faq">
                <Card>
                  <CardHeader className="pb-2 md:pb-4">
                    <CardTitle className="text-lg md:text-xl">
                      Pertanyaan yang Sering Diajukan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 md:space-y-6">
                      {service.faq && service.faq.length > 0 ? (
                        service.faq.map((item, idx) => (
                          <div
                            key={idx}
                            className="border-b border-gray-200 pb-4 md:pb-6 last:border-0"
                          >
                            <h3 className="font-medium text-gray-900 mb-2 flex items-start text-sm md:text-base">
                              <HelpCircle
                                className={`h-4 w-4 md:h-5 md:w-5 mr-2 ${themeColors.iconColor} flex-shrink-0 mt-0.5`}
                              />
                              <span>{item.pertanyaan}</span>
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600 ml-6 md:ml-7">
                              {item.jawaban}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="space-y-4 md:space-y-6">
                          {/* Default FAQs */}
                          <div className="border-b border-gray-200 pb-4 md:pb-6">
                            <h3 className="font-medium text-gray-900 mb-2 flex items-start text-sm md:text-base">
                              <HelpCircle
                                className={`h-4 w-4 md:h-5 md:w-5 mr-2 ${themeColors.iconColor} flex-shrink-0 mt-0.5`}
                              />
                              <span>
                                Berapa lama waktu pemrosesan layanan ini?
                              </span>
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600 ml-6 md:ml-7">
                              Estimasi waktu pemrosesan adalah{" "}
                              {service.estimasi}, tergantung pada kelengkapan
                              dokumen yang Anda berikan.
                            </p>
                          </div>

                          <div className="border-b border-gray-200 pb-4 md:pb-6">
                            <h3 className="font-medium text-gray-900 mb-2 flex items-start text-sm md:text-base">
                              <HelpCircle
                                className={`h-4 w-4 md:h-5 md:w-5 mr-2 ${themeColors.iconColor} flex-shrink-0 mt-0.5`}
                              />
                              <span>Apakah ada biaya untuk layanan ini?</span>
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600 ml-6 md:ml-7">
                              {service.biaya === "Gratis"
                                ? "Tidak, layanan ini disediakan secara gratis oleh Nagari Guguak Malalo."
                                : `Ya, biaya untuk layanan ini adalah ${service.biaya}.`}
                            </p>
                          </div>

                          <div className="border-b border-gray-200 pb-4 md:pb-6">
                            <h3 className="font-medium text-gray-900 mb-2 flex items-start text-sm md:text-base">
                              <HelpCircle
                                className={`h-4 w-4 md:h-5 md:w-5 mr-2 ${themeColors.iconColor} flex-shrink-0 mt-0.5`}
                              />
                              <span>
                                Bisakah saya mengajukan permohonan secara
                                online?
                              </span>
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600 ml-6 md:ml-7">
                              Ya, Anda dapat mengajukan permohonan secara online
                              melalui Portal Layanan Digital Nagari Guguak
                              Malalo.
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 md:pt-4 flex items-center justify-center">
                        <Button variant="outline" className="text-sm">
                          <MessageSquare className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          Ajukan Pertanyaan Lainnya
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Fixed Floating CTA Button for Mobile */}
      <div className="fixed bottom-6 left-0 right-0 px-4 md:hidden z-40">
        <Button
          className="w-full bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white text-lg py-6 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 font-semibold transition-all duration-300"
          size="lg"
        >
          <Send className="h-5 w-5" />
          Ajukan Sekarang
        </Button>
      </div>

      {/* Related Services Section */}
      <section
        className={`py-10 bg-gradient-to-br ${themeColors.gradientFrom} ${themeColors.gradientTo}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
            Layanan Terkait
          </h2>

          {/* Scrollable cards on mobile */}
          <div className="overflow-x-auto pb-4">
            <div className="flex md:grid md:grid-cols-3 gap-4 min-w-[600px] md:min-w-0">
              <Card className="bg-white/90 backdrop-blur-sm hover:shadow-md transition-shadow flex-1">
                <CardContent className="p-3 md:p-4 flex items-center gap-3 md:gap-4">
                  <div
                    className={`p-2 md:p-3 rounded-full ${themeColors.badgeBg}`}
                  >
                    <FileText
                      className={`h-5 w-5 md:h-6 md:w-6 ${themeColors.iconColor}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-1 text-sm md:text-base truncate">
                      Surat Keterangan Usaha
                    </h3>
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>1-2 hari</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm hover:shadow-md transition-shadow flex-1">
                <CardContent className="p-3 md:p-4 flex items-center gap-3 md:gap-4">
                  <div
                    className={`p-2 md:p-3 rounded-full ${themeColors.badgeBg}`}
                  >
                    <FileCheck
                      className={`h-5 w-5 md:h-6 md:w-6 ${themeColors.iconColor}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-1 text-sm md:text-base truncate">
                      Legalisir Dokumen
                    </h3>
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>1 hari</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm hover:shadow-md transition-shadow flex-1">
                <CardContent className="p-3 md:p-4 flex items-center gap-3 md:gap-4">
                  <div
                    className={`p-2 md:p-3 rounded-full ${themeColors.badgeBg}`}
                  >
                    <UserCheck
                      className={`h-5 w-5 md:h-6 md:w-6 ${themeColors.iconColor}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-1 text-sm md:text-base truncate">
                      Surat Pengantar KTP/KK
                    </h3>
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>1 hari</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-6 md:mt-8">
            <Link to={`/layanan/${category}`}>
              <Button
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-gray-200 text-sm md:text-base"
              >
                Lihat Semua Layanan
                <ExternalLink className="ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LayananDetail;
