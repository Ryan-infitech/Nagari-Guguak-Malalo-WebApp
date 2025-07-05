import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Camera,
  Calendar,
  Users,
  Mountain,
  Waves,
  TreePine,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

const Pariwisata = () => {
  const destinasiWisata = [
    {
      nama: "Danau Singkarak",
      kategori: "Danau",
      deskripsi:
        "Danau vulkanik yang memukau dengan pemandangan pegunungan di sekitarnya",
      aktivitas: ["Berenang", "Memancing", "Fotografi"],
      jarak: "100 m dari pusat nagari",
      tiket: "Gratis",
      image: "/danausingkarak.JPG",
      rating: 4.8,
    },
    {
      nama: "Puncak Macau Duo",
      kategori: "Perbukitan",
      deskripsi:
        "Titik tertinggi dengan panorama 360 derajat Nagari Guguak malalo",
      aktivitas: ["Hiking", "Sunrise hunting", "Camping"],
      jarak: "4 km dari pusat nagari",
      tiket: "Gratis",
      image: "/images/gallery/macauduo.png",
      rating: 4.9,
    },
  ];

  const paketWisata = [
    {
      nama: "Paket Wisata Alam 1 Hari",
      durasi: "1 Hari",
      harga: "Rp 150.000/orang",
      include: ["Transport", "Makan siang", "Guide", "Tiket masuk"],
      destinasi: 3,
    },
    {
      nama: "Paket Adventure 2 Hari",
      durasi: "2 Hari 1 Malam",
      harga: "Rp 350.000/orang",
      include: ["Transport", "Penginapan", "3x Makan", "Guide", "Peralatan"],
      destinasi: 5,
    },
    {
      nama: "Paket Family Trip 3 Hari",
      durasi: "3 Hari 2 Malam",
      harga: "Rp 500.000/orang",
      include: ["Transport", "Hotel", "All meals", "Guide", "Aktivitas"],
      destinasi: 7,
    },
  ];

  const eventWisata = [
    {
      nama: "Festival Danau Maninjau",
      tanggal: "15-17 Maret 2024",
      lokasi: "Danau Maninjau",
      deskripsi:
        "Festival budaya dengan pertunjukan tradisional dan kuliner khas",
    },
    {
      nama: "Guguak malalo Trail Run",
      tanggal: "22 April 2024",
      lokasi: "Bukit Panorama",
      deskripsi: "Lomba lari lintas alam dengan rute menantang di perbukitan",
    },
    {
      nama: "Photography Contest",
      tanggal: "10-12 Mei 2024",
      lokasi: "Seluruh Nagari",
      deskripsi: "Kontes fotografi alam dan budaya dengan hadiah menarik",
    },
  ];

  const getCategoryIcon = (kategori: string) => {
    switch (kategori) {
      case "Danau":
        return <Waves className="h-5 w-5" />;
      case "Perbukitan":
        return <Mountain className="h-5 w-5" />;
      case "Air Terjun":
        return <Waves className="h-5 w-5" />;
      case "Hutan":
        return <TreePine className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('/images/gallery/danaujihan.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ca186]/80 to-blue-600/80"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pariwisata Guguak malalo
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Jelajahi keindahan alam perbukitan dan danau yang menawan di Nagari
            Guguak malalo
          </p>
        </div>
      </section>

      {/* Destinasi Wisata */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Destinasi Wisata Unggulan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan pesona alam yang memukau dan nikmati ketenangan di
              destinasi wisata terbaik kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinasiWisata.map((destinasi, idx) => (
              <Card
                key={idx}
                className="overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className="h-64 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${destinasi.image})` }}
                >
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800 flex items-center gap-1">
                      {getCategoryIcon(destinasi.kategori)}
                      {destinasi.kategori}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-500 text-white">
                      ⭐ {destinasi.rating}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{destinasi.nama}</CardTitle>
                  <p className="text-gray-600">{destinasi.deskripsi}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {destinasi.jarak}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {destinasi.aktivitas.map((aktivitas, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {aktivitas}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-600">
                        {destinasi.tiket}
                      </span>
                      <div className="flex gap-2">
                        <Link to={`/pariwisata/${idx + 1}?tab=gallery`}>
                          <Button size="sm" variant="outline">
                            <Camera className="h-4 w-4 mr-1" />
                            Galeri
                          </Button>
                        </Link>
                        <Link to={`/pariwisata/${idx + 1}`}>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Detail
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Paket Wisata */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Paket Wisata
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilih paket wisata yang sesuai dengan kebutuhan dan budget Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paketWisata.map((paket, idx) => (
              <Card
                key={idx}
                className="border-2 hover:border-green-300 transition-colors"
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{paket.nama}</CardTitle>
                  <div className="text-2xl font-bold text-green-600">
                    {paket.harga}
                  </div>
                  <p className="text-gray-600">{paket.durasi}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Destinasi:</span>
                      <Badge>{paket.destinasi} lokasi</Badge>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Termasuk:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {paket.include.map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Pesan Sekarang
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event & Festival */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Event & Festival
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jangan lewatkan berbagai event menarik yang diselenggarakan di
              Nagari Guguak malalo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventWisata.map((event, idx) => (
              <Card key={idx} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg">{event.nama}</CardTitle>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.tanggal}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.lokasi}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    {event.deskripsi}
                  </p>
                  <Button variant="outline" className="w-full">
                    Info Lengkap
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
            Siap Menjelajahi Guguak malalo?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut dan pemesanan paket wisata
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#7ca186] hover:bg-gray-100 shadow-lg hover:shadow-xl border-2 border-white font-semibold"
            >
              <Home className="h-5 w-5 mr-2" />
              Booking Homestay
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-2 border-white bg-white/15 backdrop-blur-sm hover:bg-white hover:text-[#7ca186] shadow-lg hover:shadow-xl font-semibold"
            >
              <Users className="h-5 w-5 mr-2" />
              Hubungi Guide
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pariwisata;
