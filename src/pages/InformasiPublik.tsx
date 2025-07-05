import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Newspaper,
  FileText,
  AlertCircle,
  Download,
  Calendar,
  Search,
  Eye,
  TrendingUp,
} from "lucide-react";

const InformasiPublik = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const beritaTerbaru = [
    {
      id: "1",
      judul:
        "Syiar Muharram: Semangat Kebersamaan Masyarakat Guguak Malalo Dalam Pawai Obor",
      tanggal: "2 Juli 2025",
      kategori: "Event",
      ringkasan:
        "Suasana khidmat dan penuh kebersamaan terpancar dalam acara pawai obor dan tolak bala yang digelar oleh masyarakat Nagari Guguak malalo.",
      views: 1245,
      image: "/IMG_1097.JPG",
    },
    {
      id: "2",
      judul:
        "Wali Nagari Guguak Malalo Cup II Resmi Digelar di Lapangan Pelita Limo Luhak, Batipuh Selatan",
      tanggal: "28 Juni 2025",
      kategori: "Olahraga",
      ringkasan:
        "Turnamen sepak bola bergengsi Wali Nagari Guguak Malalo Cup II resmi digelar pada Sabtu, 28 Juni 2025, bertempat di Lapangan Pelita Limo Luhak, Nagari Guguak Malalo, Kecamatan Batipuh Selatan, Kabupaten Tanah Datar.",
      views: 856,
      image: "/walnagcup.png",
    },
    {
      id: "3",
      judul:
        "Pembangunan Jalan Guguak Sarai–Sikala Diresmikan Melalui Gotong Royong Warga di Jorong Baing, Guguak Malalo",
      tanggal: "28 Juni 2025",
      kategori: "Pembangunan",
      ringkasan:
        "Sabtu, 28 Juni 2025, menjadi hari bersejarah bagi masyarakat Jorong Baing, Nagari Guguak Malalo, Kecamatan Batipuh Selatan. Pembangunan jalan penghubung antara Guguak Sarai dan Sikala resmi dimulai melalui kegiatan gotong royong yang melibatkan partisipasi luas dari masyarakat, pemerintah nagari, serta mahasiswa Kuliah Kerja Nyata (KKN).",
      views: 634,
      image: "/pembangunanjalan.jpg",
    },
    {
      id: "4",
      judul:
        "Anak KKN UNP bersama Pemuda Jorong Baing Melakukan Pemijahan Ikan Bilih untuk Menjaga Kelangsungan",
      tanggal: "2 Juli 2025",
      kategori: "Lingkungan",
      ringkasan:
        "Dalam rangka melestarikan dan mengatasi kelangkaan ikan bilih, kelompok KKN UNP bersama pemuda Jorong Baing melakukan kegiatan pemijahan ikan bilih secara berkelanjutan di perairan sekitar Guguak Malalo.",
      views: 923,
      image: "/pemijahanikan.jpg",
    },
  ];

  const pengumuman = [
    {
      judul: "Pemeliharaan Sistem IT Nagari",
      tanggal: "28 Januari 2024",
      jenis: "Maintenance",
      isi: "Sistem IT Nagari akan menjalani pemeliharaan pada 30 Januari 2024 pukul 01:00-05:00 WIB",
    },
    {
      judul: "Pendaftaran Beasiswa Pendidikan",
      tanggal: "25 Januari 2024",
      jenis: "Pendidikan",
      isi: "Dibuka pendaftaran beasiswa pendidikan untuk siswa berprestasi dengan total 20 slot beasiswa",
    },
    {
      judul: "Rapat Koordinasi Kepala Jorong",
      tanggal: "22 Januari 2024",
      jenis: "Rapat",
      isi: "Rapat koordinasi bulanan kepala jorong akan dilaksanakan pada 2 Februari 2024 di Kantor Wali Nagari",
    },
  ];

  const peraturan = [
    {
      nomor: "Perda No. 01/2024",
      judul: "Peraturan Desa tentang Pengelolaan Dana Desa",
      tanggal: "15 Januari 2024",
      status: "Aktif",
      size: "2.3 MB",
    },
    {
      nomor: "Perda No. 02/2024",
      judul: "Peraturan tentang Pengelolaan Wisata Berkelanjutan",
      tanggal: "10 Januari 2024",
      status: "Aktif",
      size: "1.8 MB",
    },
    {
      nomor: "SK No. 05/2024",
      judul: "Surat Keputusan Pembentukan Tim Pengembangan UMKM",
      tanggal: "08 Januari 2024",
      status: "Aktif",
      size: "1.2 MB",
    },
  ];

  const laporanKinerja = [
    {
      periode: "2023",
      judul: "Laporan Tahunan Kinerja Nagari Guguak Malalo",
      kategori: "Laporan Tahunan",
      size: "5.2 MB",
      download: 143,
    },
    {
      periode: "Semester I 2023",
      judul: "Laporan Realisasi APBN Semester I",
      kategori: "Keuangan",
      size: "3.1 MB",
      download: 87,
    },
    {
      periode: "Q4 2023",
      judul: "Progress Pembangunan Infrastruktur",
      kategori: "Pembangunan",
      size: "4.8 MB",
      download: 92,
    },
  ];

  const getCategoryColor = (kategori: string) => {
    switch (kategori) {
      case "Pembangunan":
        return "bg-blue-100 text-blue-800";
      case "Budaya":
        return "bg-purple-100 text-purple-800";
      case "Ekonomi":
        return "bg-green-100 text-green-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "Pendidikan":
        return "bg-indigo-100 text-indigo-800";
      case "Rapat":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/gallery/rumahgadang.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ca186]/80 to-blue-600/80"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Informasi Publik
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Akses transparansi informasi dan berita terkini Nagari Guguak Malalo
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Cari berita, pengumuman, atau dokumen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="berita" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="berita" className="flex items-center gap-2">
                <Newspaper className="h-4 w-4" />
                Berita
              </TabsTrigger>
              <TabsTrigger
                value="pengumuman"
                className="flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4" />
                Pengumuman
              </TabsTrigger>
              <TabsTrigger
                value="peraturan"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Peraturan
              </TabsTrigger>
              <TabsTrigger value="laporan" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Laporan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="berita">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beritaTerbaru.map((berita, idx) => (
                  <Card
                    key={idx}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${berita.image})` }}
                    >
                      <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <Badge className={getCategoryColor(berita.kategori)}>
                          {berita.kategori}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <Link to={`/informasi/berita/${berita.id}`}>
                        <CardTitle className="text-lg line-clamp-2 hover:text-green-600 transition-colors">
                          {berita.judul}
                        </CardTitle>
                      </Link>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {berita.tanggal}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {berita.views}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {berita.ringkasan}
                      </p>
                      <Link to={`/informasi/berita/${berita.id}`}>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Baca Selengkapnya
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pengumuman">
              <div className="space-y-4">
                {pengumuman.map((item, idx) => (
                  <Card key={idx} className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{item.judul}</CardTitle>
                        <Badge className={getCategoryColor(item.jenis)}>
                          {item.jenis}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {item.tanggal}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{item.isi}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="peraturan">
              <div className="space-y-4">
                {peraturan.map((item, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {item.nomor}
                          </CardTitle>
                          <p className="text-gray-600 mt-1">{item.judul}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {item.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center mb-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            {item.tanggal}
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            {item.size}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="laporan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {laporanKinerja.map((laporan, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {laporan.judul}
                        </CardTitle>
                        <Badge variant="secondary">{laporan.periode}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Kategori:</span>
                          <Badge className={getCategoryColor(laporan.kategori)}>
                            {laporan.kategori}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Ukuran:</span>
                          <span>{laporan.size}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Download:</span>
                          <span>{laporan.download}x</span>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download Laporan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default InformasiPublik;
