import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Store,
  Truck,
  Users,
  TrendingUp,
  MapPin,
  Phone,
  Star,
  ShoppingBag,
} from "lucide-react";

const UMKM = () => {
  const umkmFeatured = [
    {
      nama: "Pondok Kalwa",
      kategori: "F&B",
      lokasi: "Jorong Guguak",
      rating: 4.8,
      produk: "Makanan, Minuman",
      kontak: "082386006457",
      image: "images/lain/pondokkalwa.png",
    },
  ];

  const programPemberdayaan = [
    {
      judul: "Pelatihan Digital Marketing",
      tanggal: "15-17 Februari 2024",
      peserta: "30 UMKM",
      status: "Akan Datang",
    },
    {
      judul: "Workshop Kemasan Produk",
      tanggal: "20-22 Februari 2024",
      peserta: "25 UMKM",
      status: "Pendaftaran",
    },
    {
      judul: "Bimbingan Teknis Keuangan",
      tanggal: "25-27 Februari 2024",
      peserta: "40 UMKM",
      status: "Perencanaan",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://diskopukm.palembang.go.id/uploads/b_4_ab5d82a7dc.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ca186]/80 to-blue-600/80"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            UMKM & Ekonomi
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Memberdayakan usaha mikro kecil menengah untuk kemajuan ekonomi
            Nagari GuguakMalalo
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7ca186] to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">247</div>
              <div className="text-gray-600">UMKM Terdaftar</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">1,245</div>
              <div className="text-gray-600">Tenaga Kerja</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">15.2%</div>
              <div className="text-gray-600">Pertumbuhan</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">89</div>
              <div className="text-gray-600">Produk Ekspor</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured UMKM */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              UMKM Unggulan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Produk-produk terbaik dari UMKM Nagari GuguakMalalo yang telah
              dikenal luas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {umkmFeatured.map((umkm, idx) => (
              <Card
                key={idx}
                className="overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${umkm.image})` }}
                >
                  <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <Badge className="bg-white/90 text-gray-800">
                      {umkm.kategori}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{umkm.nama}</CardTitle>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {umkm.lokasi}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{umkm.rating}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{umkm.produk}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {umkm.kontak}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Kunjungi
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Detail
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Pemberdayaan */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Program Pemberdayaan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berbagai program pelatihan dan pembinaan untuk meningkatkan
              kapasitas UMKM
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programPemberdayaan.map((program, idx) => (
              <Card key={idx} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{program.judul}</CardTitle>
                    <Badge
                      variant={
                        program.status === "Akan Datang"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {program.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📅 {program.tanggal}</p>
                    <p>👥 {program.peserta}</p>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Daftar Sekarang
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#7ca186] to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ingin Mengembangkan Usaha Anda?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan program pemberdayaan UMKM Nagari GuguakMalalo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#7ca186] hover:bg-gray-100"
            >
              Daftar UMKM
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-[#7ca186]"
            >
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UMKM;
