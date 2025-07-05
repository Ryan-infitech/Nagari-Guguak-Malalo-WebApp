import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  Calendar,
  User,
  ShoppingBag,
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Facebook,
  Instagram,
  Globe,
  ChevronRight,
  Image,
  Award,
} from "lucide-react";

// Mock data for demonstration
const umkmData = [
  {
    id: "1",
    nama: "Pondok Kalwa",
    kategori: "Food & Beverage",
    deskripsi:
      "Pondok Kalwa adalah usaha kuliner yang menyajikan makanan dan minuman tradisional khas Sumatera Barat dengan sentuhan modern. Berdiri sejak 2018, Pondok Kalwa telah menjadi salah satu destinasi kuliner favorit di Nagari Guguak Malalo.",
    alamat: "Jl. Raya Guguak Malalo No. 45, Jorong Guguak",
    jamOperasional: "Setiap Hari, 08:00 - 21:00 WIB",
    telepon: "082386006457",
    email: "pondokkalwa@gmail.com",
    website: "www.pondokkalwa.com",
    sosialMedia: {
      facebook: "pondokkalwa",
      instagram: "@pondokkalwa",
    },
    pemilik: {
      nama: "Bapak Kalwa",
      foto: "/images/lain/ownerkalwa.jpg",
      cerita:
        "Berawal dari hobi memasak dan kecintaan terhadap kuliner tradisional, Bapak Kalwa mendirikan usaha ini dengan modal awal yang terbatas namun kaya akan kreativitas dan semangat. Dengan dukungan program UMKM dari pemerintah Nagari, usaha ini terus berkembang hingga kini.",
    },
    penghargaan: ["UMKM Terbaik 2022", "Kuliner Inovatif 2023"],
    rating: 4.8,
    review: 124,
    mainImage: "/images/lain/pondokkalwa.png",
    galeri: [
      "/images/lain/kalwa1.jpg",
      "/images/lain/kalwa2.jpg",
      "/images/lain/kalwa3.jpg",
      "/images/lain/kalwa4.jpg",
    ],
    produk: [
      {
        nama: "Nasi Kapau Komplit",
        deskripsi: "Nasi dengan berbagai lauk pauk khas Kapau",
        harga: "Rp 25.000",
        gambar: "/images/lain/kalwaproduk1.jpg",
        bestseller: true,
      },
      {
        nama: "Sate Padang",
        deskripsi: "Sate daging sapi dengan kuah kacang khas Padang",
        harga: "Rp 20.000",
        gambar: "/images/lain/kalwaproduk2.jpg",
        bestseller: false,
      },
      {
        nama: "Es Teh Talua",
        deskripsi: "Minuman tradisional dengan campuran kuning telur",
        harga: "Rp 8.000",
        gambar: "/images/lain/kalwaproduk3.jpg",
        bestseller: true,
      },
      {
        nama: "Ayam Pop",
        deskripsi: "Ayam yang direbus dengan bumbu khusus lalu digoreng",
        harga: "Rp 18.000",
        gambar: "/images/lain/kalwaproduk4.jpg",
        bestseller: false,
      },
    ],
    testimoni: [
      {
        nama: "Ahmad Fauzi",
        pesan:
          "Makanan sangat lezat dengan cita rasa yang autentik. Pelayanannya juga sangat ramah.",
        rating: 5,
        tanggal: "15 Januari 2024",
      },
      {
        nama: "Siti Rahma",
        pesan:
          "Tempatnya nyaman dan bersih. Menu yang disajikan beragam dan harganya sangat terjangkau.",
        rating: 4,
        tanggal: "10 Januari 2024",
      },
      {
        nama: "Budi Santoso",
        pesan:
          "Sate padangnya recommended banget! Bumbu kacangnya kental dan gurih.",
        rating: 5,
        tanggal: "2 Januari 2024",
      },
    ],
    terkait: [
      {
        id: "2",
        nama: "Batik Singkarak",
        kategori: "Kerajinan",
        image: "/images/lain/batik.jpg",
      },
      {
        id: "3",
        nama: "Keripik Sanjai",
        kategori: "Makanan Ringan",
        image: "/images/lain/keripik.jpg",
      },
      {
        id: "4",
        nama: "Tenun Guguak",
        kategori: "Tekstil",
        image: "/images/lain/tenun.jpg",
      },
    ],
    lokasi: {
      lat: -0.59915,
      lng: 100.4981,
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.235778919711!2d100.49810!3d-0.59915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd54bd2f0efa2a3%3A0x100c5833d5fc0f0!2sKantor%20Walinagari%20Guguak%20Malalo%2C%20Batipuh%20Selatan%2C%20Tanah%20Datar%2C%20West%20Sumatra!5e0!3m2!1sen!2sid!4v1650000000000!5m2!1sen!2sid",
    },
  },
];

const UMKMDetail = () => {
  const { id } = useParams();
  const [umkm, setUMKM] = useState<any>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    window.scrollTo(0, 0);

    // Find the UMKM with matching ID
    const foundUMKM = umkmData.find((item) => item.id === id);

    if (foundUMKM) {
      setUMKM(foundUMKM);
      setActiveImage(foundUMKM.mainImage);
    }

    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!umkm) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">UMKM tidak ditemukan</h1>
            <Link to="/umkm">
              <Button>Kembali ke Daftar UMKM</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${umkm.mainImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Link to="/umkm">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white bg-black/30 backdrop-blur-sm hover:bg-white hover:text-gray-800"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Kembali ke UMKM
                </Button>
              </Link>
              <Badge className="bg-white/80 text-gray-800 hover:bg-white">
                {umkm.kategori}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              {umkm.nama}
            </h1>
            <div className="flex items-center text-white space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-bold">{umkm.rating}</span>
                <span className="text-sm text-gray-300 ml-1">
                  ({umkm.review} ulasan)
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1 text-gray-300" />
                <span>Jorong Guguak, Guguak Malalo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tabs Navigation */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="products">Produk</TabsTrigger>
                  <TabsTrigger value="gallery">Galeri</TabsTrigger>
                  <TabsTrigger value="reviews">Ulasan</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview">
                  <Card className="border-0 shadow-lg mb-8">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Store className="h-6 w-6 text-[#7ca186]" />
                        Tentang {umkm.nama}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {umkm.deskripsi}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                              <h4 className="font-medium">Alamat</h4>
                              <p className="text-sm text-gray-600">
                                {umkm.alamat}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                              <h4 className="font-medium">Jam Operasional</h4>
                              <p className="text-sm text-gray-600">
                                {umkm.jamOperasional}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                              <h4 className="font-medium">Telepon</h4>
                              <p className="text-sm text-gray-600">
                                {umkm.telepon}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                              <h4 className="font-medium">Email</h4>
                              <p className="text-sm text-gray-600">
                                {umkm.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Globe className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                              <h4 className="font-medium">Website</h4>
                              <p className="text-sm text-gray-600">
                                {umkm.website}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Facebook className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                              <h4 className="font-medium">Social Media</h4>
                              <p className="text-sm text-gray-600">
                                FB: {umkm.sosialMedia.facebook} | IG:{" "}
                                {umkm.sosialMedia.instagram}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Owner's Story */}
                      <div className="bg-[#7ca186]/5 p-6 rounded-lg mt-8">
                        <div className="flex items-center gap-4 mb-4">
                          <img
                            src={umkm.pemilik.foto}
                            alt={umkm.pemilik.nama}
                            className="h-16 w-16 rounded-full object-cover border-2 border-[#7ca186]"
                          />
                          <div>
                            <h3 className="font-bold text-lg">
                              {umkm.pemilik.nama}
                            </h3>
                            <p className="text-sm text-gray-600">Pemilik</p>
                          </div>
                        </div>
                        <p className="italic text-gray-700">
                          "{umkm.pemilik.cerita}"
                        </p>
                      </div>

                      {/* Awards */}
                      <div className="mt-8">
                        <h3 className="font-bold text-lg mb-4 flex items-center">
                          <Award className="h-5 w-5 text-yellow-500 mr-2" />
                          Penghargaan
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {umkm.penghargaan.map((award, idx) => (
                            <Badge
                              key={idx}
                              className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            >
                              🏆 {award}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Map Location */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        Lokasi
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
                        <iframe
                          src={umkm.lokasi.mapEmbed}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Lokasi ${umkm.nama}`}
                          className="rounded-lg"
                        ></iframe>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Products Tab */}
                <TabsContent value="products">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {umkm.produk.map((produk, idx) => (
                      <Card
                        key={idx}
                        className="overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48">
                          <img
                            src={produk.gambar}
                            alt={produk.nama}
                            className="h-full w-full object-cover"
                          />
                          {produk.bestseller && (
                            <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                              Bestseller
                            </Badge>
                          )}
                        </div>
                        <CardHeader>
                          <CardTitle>{produk.nama}</CardTitle>
                          <p className="font-bold text-[#7ca186]">
                            {produk.harga}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm mb-4">
                            {produk.deskripsi}
                          </p>
                          <Button className="w-full bg-[#7ca186] hover:bg-[#6a8b72]">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Pesan Sekarang
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Gallery Tab */}
                <TabsContent value="gallery">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Image className="h-5 w-5 text-[#7ca186]" />
                        Galeri Foto
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <img
                          src={activeImage}
                          alt="Main gallery"
                          className="w-full h-80 object-cover rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {[umkm.mainImage, ...umkm.galeri].map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={`Gallery image ${idx + 1}`}
                            className={`h-20 w-full object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity ${
                              activeImage === image
                                ? "border-2 border-[#7ca186]"
                                : ""
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
                      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                        <CardTitle className="text-xl flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-[#7ca186]" />
                          Ulasan Pelanggan
                        </CardTitle>
                        <div className="flex items-center gap-1">
                          <div className="text-3xl font-bold">
                            {umkm.rating}
                          </div>
                          <div className="text-sm text-gray-500">
                            <div className="flex">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(umkm.rating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                            </div>
                            <div>{umkm.review} ulasan</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6 mt-4">
                        {umkm.testimoni.map((testi, idx) => (
                          <div
                            key={idx}
                            className="border-b pb-6 last:border-b-0 last:pb-0"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center">
                                  <User className="h-6 w-6 text-gray-500" />
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {testi.nama}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {testi.tanggal}
                                  </div>
                                </div>
                              </div>
                              <div className="flex">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < testi.rating
                                          ? "text-yellow-400 fill-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                              </div>
                            </div>
                            <p className="text-gray-700">{testi.pesan}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 text-center">
                        <Button variant="outline">
                          Lihat Semua Ulasan ({umkm.review})
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Social Actions */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Suka
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Bagikan
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-1" />
                    Simpan
                  </Button>
                </div>
                <div>
                  <Button className="bg-[#7ca186] hover:bg-[#6a8b72]">
                    <Phone className="h-4 w-4 mr-2" />
                    Hubungi Pemilik
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Phone className="h-5 w-5 text-[#7ca186]" />
                    Kontak Langsung
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-green-600" />
                        <span>{umkm.telepon}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-600 text-green-600 hover:bg-green-50"
                      >
                        Telepon
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <span>Email</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        Email
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-orange-600" />
                        <span>WhatsApp</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-orange-600 text-orange-600 hover:bg-orange-50"
                      >
                        Chat
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full bg-[#7ca186] hover:bg-[#6a8b72]">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Kunjungi Toko
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related UMKM */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Store className="h-5 w-5 text-blue-600" />
                    UMKM Terkait
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {umkm.terkait.map((related, idx) => (
                      <Link
                        to={`/umkm/${related.id}`}
                        key={idx}
                        className="block"
                      >
                        <div className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <img
                            src={related.image}
                            alt={related.nama}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium group-hover:text-[#7ca186] transition-colors">
                              {related.nama}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {related.kategori}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#7ca186] group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Jam Operasional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-dashed">
                      <span>Senin - Jumat</span>
                      <span className="font-medium">08:00 - 21:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dashed">
                      <span>Sabtu</span>
                      <span className="font-medium">09:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dashed">
                      <span>Minggu</span>
                      <span className="font-medium">10:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>Hari Libur</span>
                      <span className="font-medium text-green-600">Buka</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#7ca186] to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Dukung UMKM Lokal Guguak Malalo
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Setiap pembelian Anda membantu mengembangkan ekonomi lokal dan
            memajukan kesejahteraan masyarakat nagari
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#7ca186] hover:bg-gray-100"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Jelajahi UMKM Lainnya
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white bg-white/15 backdrop-blur-sm hover:bg-white hover:text-[#7ca186]"
            >
              <Phone className="h-5 w-5 mr-2" />
              Kunjungi Marketplace
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UMKMDetail;
