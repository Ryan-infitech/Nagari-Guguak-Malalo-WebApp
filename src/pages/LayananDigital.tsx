import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Users,
  Building,
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  BarChart2,
  HeartPulse,
  Scale,
  ArrowRight,
} from "lucide-react";

const LayananDigital = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [activeTab, setActiveTab] = useState("kependudukan");

  // Automatically set active tab based on URL parameter
  useEffect(() => {
    if (category && serviceCategories.find((cat) => cat.id === category)) {
      setActiveTab(category);
    }
  }, [category]);

  // Service categories with icons
  const serviceCategories = [
    {
      id: "kependudukan",
      title: "Layanan Administrasi Digital",
      icon: <FileText className="h-16 w-16 text-[#7ca186]" />,
      description:
        "Berbagai layanan administrasi kependudukan untuk warga Nagari GuguakMalalo",
      color: "from-[#7ca186]/20 to-[#7ca186]/40",
    },
    {
      id: "ekonomi",
      title: "Layanan Ekonomi",
      icon: <BarChart2 className="h-16 w-16 text-blue-600" />,
      description: "Dukungan untuk pengembangan usaha dan ekonomi masyarakat",
      color: "from-blue-100 to-blue-200",
    },
    {
      id: "sosial",
      title: "Layanan Sosial",
      icon: <Heart className="h-16 w-16 text-pink-600" />,
      description: "Program bantuan dan pemberdayaan masyarakat",
      color: "from-pink-100 to-pink-200",
    },
    {
      id: "pembangunan",
      title: "Layanan Pembangunan",
      icon: <Building className="h-16 w-16 text-amber-600" />,
      description: "Layanan terkait pembangunan dan infrastruktur nagari",
      color: "from-amber-100 to-amber-200",
    },
    {
      id: "posbakum",
      title: "Layanan Posbakum",
      icon: <Scale className="h-16 w-16 text-purple-600" />,
      description: "Layanan bantuan hukum dan konsultasi legal",
      color: "from-purple-100 to-purple-200",
    },
    {
      id: "pendidikan",
      title: "Layanan Pendidikan",
      icon: <BookOpen className="h-16 w-16 text-green-600" />,
      description: "Informasi dan dukungan untuk pendidikan",
      color: "from-green-100 to-green-200",
    },
    {
      id: "kesehatan",
      title: "Layanan Kesehatan",
      icon: <HeartPulse className="h-16 w-16 text-red-600" />,
      description: "Layanan terkait kesehatan masyarakat",
      color: "from-red-100 to-red-200",
    },
  ];

  const layananKependudukan = [
    {
      nama: "Surat Keterangan Domisili",
      estimasi: "1-2 hari",
      status: "available",
    },
    {
      nama: "Surat Keterangan Tidak Mampu (SKTM)",
      estimasi: "2-3 hari",
      status: "available",
    },
    {
      nama: "Surat Keterangan Usaha",
      estimasi: "1-2 hari",
      status: "available",
    },
    {
      nama: "Surat Keterangan Kelahiran",
      estimasi: "1 hari",
      status: "available",
    },
    {
      nama: "Surat Keterangan Kematian",
      estimasi: "1 hari",
      status: "available",
    },
    { nama: "Surat Pengantar KTP/KK", estimasi: "1 hari", status: "available" },
    { nama: "Legalisir Dokumen", estimasi: "1 hari", status: "available" },
  ];

  const layananPembangunan = [
    {
      nama: "Pengajuan Bantuan Pembangunan",
      estimasi: "7-14 hari",
      status: "available",
    },
    {
      nama: "Laporan Kerusakan Infrastruktur",
      estimasi: "1-3 hari",
      status: "available",
    },
    {
      nama: "Usulan Program Pembangunan",
      estimasi: "14 hari",
      status: "available",
    },
    {
      nama: "Monitoring Proyek Nagari",
      estimasi: "Real-time",
      status: "maintenance",
    },
  ];

  const layananEkonomi = [
    { nama: "Pendaftaran UMKM", estimasi: "3-5 hari", status: "available" },
    {
      nama: "Surat Izin Usaha Mikro",
      estimasi: "5-7 hari",
      status: "available",
    },
    {
      nama: "Bantuan Modal Usaha",
      estimasi: "14-21 hari",
      status: "available",
    },
    {
      nama: "Pendaftaran Pelatihan Kewirausahaan",
      estimasi: "1 hari",
      status: "available",
    },
  ];

  const layananSosial = [
    {
      nama: "Pendaftaran Bantuan Sosial",
      estimasi: "7-10 hari",
      status: "available",
    },
    {
      nama: "Verifikasi Data Penerima Bantuan",
      estimasi: "5-7 hari",
      status: "available",
    },
    {
      nama: "Pendaftaran Program Pemberdayaan",
      estimasi: "3-5 hari",
      status: "available",
    },
    {
      nama: "Koordinasi Gotong Royong",
      estimasi: "1-2 hari",
      status: "available",
    },
  ];

  // Placeholder data for other service categories
  const layananPosbakum = [
    { nama: "Konsultasi Hukum", estimasi: "1-2 hari", status: "available" },
    {
      nama: "Pendampingan Hukum",
      estimasi: "Sesuai jadwal",
      status: "available",
    },
    { nama: "Mediasi Sengketa", estimasi: "7-14 hari", status: "available" },
  ];

  const layananPendidikan = [
    {
      nama: "Beasiswa Pendidikan",
      estimasi: "14-30 hari",
      status: "available",
    },
    {
      nama: "Bantuan Seragam Sekolah",
      estimasi: "7-14 hari",
      status: "available",
    },
    {
      nama: "Program Bimbingan Belajar",
      estimasi: "Sesuai jadwal",
      status: "available",
    },
  ];

  const layananKesehatan = [
    { nama: "Surat Keterangan Sehat", estimasi: "1 hari", status: "available" },
    { nama: "Posyandu", estimasi: "Sesuai jadwal", status: "available" },
    { nama: "Vaksinasi", estimasi: "Sesuai jadwal", status: "available" },
  ];

  // Get services based on category ID
  const getServicesByCategory = (categoryId) => {
    switch (categoryId) {
      case "kependudukan":
        return layananKependudukan;
      case "pembangunan":
        return layananPembangunan;
      case "ekonomi":
        return layananEkonomi;
      case "sosial":
        return layananSosial;
      case "posbakum":
        return layananPosbakum;
      case "pendidikan":
        return layananPendidikan;
      case "kesehatan":
        return layananKesehatan;
      default:
        return [];
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-[#7ca186]/20 text-[#7ca186]">
            <CheckCircle className="h-3 w-3 mr-1" />
            Tersedia
          </Badge>
        );
      case "maintenance":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Maintenance
          </Badge>
        );
      default:
        return <Badge variant="secondary">Status</Badge>;
    }
  };

  const renderServiceCards = (services) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      {services.map((item, idx) => (
        <Card
          key={idx}
          className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500"
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base md:text-lg">
                {item.nama}
              </CardTitle>
              {getStatusBadge(item.status)}
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex items-center text-xs md:text-sm text-gray-600 mb-3">
              <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 flex-shrink-0" />
              Estimasi: {item.estimasi}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700 text-xs md:text-sm h-8 md:h-10"
              >
                Ajukan
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs md:text-sm h-8 md:h-10"
              >
                Info
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Render category page content
  const renderCategoryContent = (categoryId) => {
    const category = serviceCategories.find((cat) => cat.id === categoryId);
    if (!category) return null;

    return (
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Link
            to="/layanan"
            className="inline-flex items-center text-sm text-gray-600 hover:text-[#7ca186] mb-6"
          >
            <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
            Kembali ke semua layanan
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              {React.cloneElement(category.icon, {
                className: "h-8 w-8 text-[#7ca186]",
              })}
              {category.title}
            </h1>
            <p className="text-gray-600 max-w-3xl">{category.description}</p>
          </div>

          {renderServiceCards(getServicesByCategory(categoryId))}
        </div>
      </div>
    );
  };

  // If we're on a specific category page, render that content
  if (category) {
    return <Layout>{renderCategoryContent(category)}</Layout>;
  }

  // Otherwise render the main service categories grid
  return (
    <Layout>
      {/* Hero Section - More responsive */}
      <section
        className="relative py-12 md:py-20 bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('/layanan.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ca186]/80 to-blue-600/80"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
            Layanan Digital
          </h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto">
            Akses mudah dan cepat untuk semua layanan administrasi Nagari
            GuguakMalalo
          </p>
        </div>
      </section>

      {/* Service Categories Grid - Improved responsiveness */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4">
              Layanan Kami
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Pilih kategori layanan yang Anda butuhkan
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {serviceCategories.map((category) => (
              <Card
                key={category.id}
                className={`text-center hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br ${category.color} border-0`}
              >
                <CardContent className="p-3 md:p-6 flex flex-col items-center justify-center min-h-[160px] md:min-h-[200px]">
                  {/* Responsive icon size */}
                  <div className="mb-3 md:mb-4 transform scale-75 md:scale-100">
                    {React.cloneElement(category.icon, {
                      className: `h-12 w-12 md:h-16 md:w-16 ${category.icon.props.className
                        ?.split(" ")
                        .pop()}`,
                    })}
                  </div>
                  <h3 className="font-bold text-sm md:text-lg mb-2">
                    {category.title}
                  </h3>
                  <Link to={`/layanan/${category.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 md:mt-4 border-gray-300 hover:border-[#7ca186] hover:text-[#7ca186] text-xs md:text-sm"
                    >
                      <span>Lihat Layanan</span>
                      <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section - Improved mobile layout */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Card 1 */}
            <Card className="text-center p-4 md:p-6 border-0 shadow-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#7ca186]/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-[#7ca186]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">
                Pelayanan 24/7
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Ajukan permohonan kapan saja melalui sistem online
              </p>
            </Card>

            {/* Card 2 */}
            <Card className="text-center p-4 md:p-6 border-0 shadow-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">
                Tracking Real-time
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Pantau status permohonan Anda secara real-time
              </p>
            </Card>

            {/* Card 3 */}
            <Card className="text-center p-4 md:p-6 border-0 shadow-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <FileText className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">
                Dokumen Digital
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Unduh dokumen hasil layanan dalam format digital
              </p>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LayananDigital;
