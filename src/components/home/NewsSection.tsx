import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Eye } from "lucide-react";

const NewsSection = () => {
  const news = [
    {
      id: "1",
      title: "Pawai obor dan tolak bala bersama warga nagari guguakmalalo",
      excerpt:
        "Suasana khidmat dan penuh kebersamaan terpancar dalam acara pawai obor dan tolak bala yang digelar oleh masyarakat Nagari Guguakmalalo.",
      image: "/IMG_1097.JPG",
      date: "15 Januari 2024",
      author: "Admin Nagari",
      views: "1,245",
      category: "Event",
      featured: true,
    },
    {
      id: "2",
      title: "Launching Platform E-Commerce UMKM GuguakMalalo",
      excerpt:
        "Platform digital baru untuk mempromosikan dan menjual produk-produk UMKM nagari ke pasar yang lebih luas",
      image:
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
      date: "12 Januari 2024",
      author: "Tim Digital",
      views: "856",
      category: "Ekonomi",
    },
    {
      id: "3",
      title: "Program Pemberdayaan Kelompok Tani Organik",
      excerpt:
        "Pelatihan dan bantuan untuk pengembangan pertanian organik berkelanjutan di kawasan perbukitan",
      image:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      date: "10 Januari 2024",
      author: "Dinas Pertanian",
      views: "634",
      category: "Pertanian",
    },
    {
      id: "4",
      title: "Infrastruktur Jalan Menuju Objek Wisata Diperbaiki",
      excerpt:
        "Perbaikan dan peningkatan akses jalan untuk mendukung pengembangan sektor pariwisata nagari",
      image:
        "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80",
      date: "8 Januari 2024",
      author: "Dinas PU",
      views: "923",
      category: "Infrastruktur",
    },
  ];

  const announcements = [
    {
      title: "Pendaftaran Bantuan Sosial Tahun 2024",
      date: "20 Januari 2024",
      type: "Pengumuman Penting",
    },
    {
      title: "Jadwal Pelayanan Administrasi Hari Libur",
      date: "18 Januari 2024",
      type: "Informasi Layanan",
    },
    {
      title: "Sosialisasi Program Desa Digital",
      date: "16 Januari 2024",
      type: "Kegiatan",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main News Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Berita & Informasi Terkini
              </h2>
              <Link to="/informasi">
                <Button variant="outline" className="hidden md:flex">
                  Lihat Semua
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Featured News */}
            {news.slice(0, 1).map((item) => (
              <Card
                key={item.id}
                className="mb-8 overflow-hidden shadow-xl border-0 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <Link to={`/informasi/berita/${item.id}`}>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 hover:text-green-600 transition-colors cursor-pointer">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{item.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.slice(1).map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden shadow-lg border-0 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <Link to={`/informasi/berita/${item.id}`}>
                      <h3 className="font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors cursor-pointer line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Announcements */}
            <Card className="p-6 shadow-lg border-0">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                Pengumuman Penting
              </h3>

              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-green-500 pl-4 py-2 hover:bg-green-50 transition-colors cursor-pointer"
                  >
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">
                      {announcement.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {announcement.date}
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {announcement.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/pengumuman">
                <Button variant="outline" className="w-full mt-4">
                  Lihat Semua Pengumuman
                </Button>
              </Link>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-green-500 to-blue-500 text-white">
              <h3 className="text-xl font-bold mb-4">Statistik Nagari</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Penduduk</span>
                  <span className="font-bold text-xl">4256</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Kepala Keluarga</span>
                  <span className="font-bold text-xl">1064</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>UMKM Aktif</span>
                  <span className="font-bold text-xl">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Objek Wisata</span>
                  <span className="font-bold text-xl">8</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
