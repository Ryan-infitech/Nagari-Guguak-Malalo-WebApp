import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Users,
  Building,
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const LayananDigital = () => {
  const [activeTab, setActiveTab] = useState("kependudukan");

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

  const renderLayananCards = (layanan: typeof layananKependudukan) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {layanan.map((item, idx) => (
        <Card
          key={idx}
          className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500"
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{item.nama}</CardTitle>
              {getStatusBadge(item.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Clock className="h-4 w-4 mr-2" />
              Estimasi: {item.estimasi}
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                Ajukan Sekarang
              </Button>
              <Button variant="outline" className="flex-1">
                Info Detail
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://lumbungdata.id/wp-content/uploads/2025/02/10-layanan-teknoogi-desa.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ca186]/80 to-blue-600/80"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Layanan Digital
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Akses mudah dan cepat untuk semua layanan administrasi Nagari
            GuguakMalalo
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger
                value="kependudukan"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Kependudukan
              </TabsTrigger>
              <TabsTrigger
                value="pembangunan"
                className="flex items-center gap-2"
              >
                <Building className="h-4 w-4" />
                Pembangunan
              </TabsTrigger>
              <TabsTrigger value="ekonomi" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Ekonomi
              </TabsTrigger>
              <TabsTrigger value="sosial" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Sosial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="kependudukan">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Layanan Kependudukan
                </h2>
                <p className="text-gray-600">
                  Berbagai layanan administrasi kependudukan untuk warga Nagari
                  GuguakMalalo
                </p>
              </div>
              {renderLayananCards(layananKependudukan)}
            </TabsContent>

            <TabsContent value="pembangunan">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Layanan Pembangunan
                </h2>
                <p className="text-gray-600">
                  Layanan terkait pembangunan dan infrastruktur nagari
                </p>
              </div>
              {renderLayananCards(layananPembangunan)}
            </TabsContent>

            <TabsContent value="ekonomi">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Layanan Ekonomi
                </h2>
                <p className="text-gray-600">
                  Dukungan untuk pengembangan usaha dan ekonomi masyarakat
                </p>
              </div>
              {renderLayananCards(layananEkonomi)}
            </TabsContent>

            <TabsContent value="sosial">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Layanan Sosial
                </h2>
                <p className="text-gray-600">
                  Program bantuan dan pemberdayaan masyarakat
                </p>
              </div>
              {renderLayananCards(layananSosial)}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-[#7ca186]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-[#7ca186]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pelayanan 24/7</h3>
              <p className="text-gray-600">
                Ajukan permohonan kapan saja melalui sistem online
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tracking Real-time</h3>
              <p className="text-gray-600">
                Pantau status permohonan Anda secara real-time
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dokumen Digital</h3>
              <p className="text-gray-600">
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
