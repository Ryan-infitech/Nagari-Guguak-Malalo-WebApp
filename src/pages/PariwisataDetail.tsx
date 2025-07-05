import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  Info,
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Phone,
  Star,
  Camera,
  Compass,
  Mountain,
  Waves,
  TreePine,
  Home,
  Users,
  Car,
  Coffee,
  Wifi,
  Wind,
  Sun,
  Cloud,
  Thermometer,
  Image,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
} from "lucide-react";

// Mock data for destination details
const destinationData = [
  {
    id: "1",
    name: "Danau Singkarak",
    category: "Danau",
    description:
      "Danau Singkarak adalah salah satu danau terbesar di Sumatera Barat, terletak di antara Kabupaten Tanah Datar dan Kabupaten Solok. Danau tektonik-vulkanik ini memiliki panorama alam yang memukau dengan latar belakang perbukitan hijau yang mengelilinginya. Sebagai salah satu danau terdalam di Indonesia, Danau Singkarak menawarkan pesona keindahan alam yang memikat para pengunjung.",
    longDescription: `<p>Danau Singkarak merupakan danau tektonik-vulkanik yang terbentuk dari aktivitas tektonik Sesar Sumatra. Dengan luas sekitar 107,8 km², danau ini menjadi danau terluas kedua di Pulau Sumatra setelah Danau Toba.</p>
    <p>Air danau yang tenang dengan warna biru kehijauan menawarkan panorama yang menakjubkan, terutama saat matahari terbit dan terbenam. Di sepanjang tepian danau terdapat beberapa spot sempurna untuk menikmati keindahan alam atau sekadar bersantai.</p>
    <p>Danau Singkarak juga menjadi rumah bagi spesies ikan endemik yang terkenal, yaitu ikan bilih (Mystacoleucus padangensis). Ikan kecil ini menjadi salah satu kuliner khas yang wajib dicoba saat berkunjung ke kawasan Danau Singkarak.</p>
    <p>Aktivitas yang dapat dilakukan di Danau Singkarak sangat beragam, mulai dari berenang, memancing, berperahu, hingga olahraga air seperti jet ski dan kayak. Bagi pecinta fotografi, danau ini menawarkan berbagai spot menarik untuk mengabadikan momen indah dengan latar belakang panorama alam yang memukau.</p>`,
    mainImage: "/danausingkarak.JPG",
    gallery: [
      "/images/gallery/singkarakdua.jpg",
      "/images/gallery/singkaraktiga.jpg",
      "/images/gallery/singkarakmatahari.jpg",
      "/images/gallery/singkarakperahu.jpg",
      "/images/gallery/singkarakpemandangan.jpg",
      "/images/gallery/singkarakair.jpg",
    ],
    activities: [
      "Berenang",
      "Memancing",
      "Berperahu",
      "Fotografi",
      "Camping",
      "Olahraga air",
    ],
    facilities: [
      "Area parkir",
      "Warung makan",
      "Tempat istirahat",
      "Toilet umum",
      "Sewa perahu",
      "Spot foto",
    ],
    location: {
      distance: "100 m dari pusat nagari",
      accessType: "Mudah diakses",
      address:
        "Nagari Guguak Malalo, Kecamatan Batipuh Selatan, Kabupaten Tanah Datar",
      transportOptions: [
        "Kendaraan pribadi",
        "Angkutan umum dari Batusangkar",
        "Ojek",
      ],
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.235778919711!2d100.49810!3d-0.59915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd54bd2f0efa2a3%3A0x100c5833d5fc0f0!2sKantor%20Walinagari%20Guguak%20Malalo%2C%20Batipuh%20Selatan%2C%20Tanah%20Datar%2C%20West%20Sumatra!5e0!3m2!1sen!2sid!4v1650000000000!5m2!1sen!2sid",
    },
    ticket: "Gratis",
    openHours: "24 jam",
    bestVisitTime: "Pagi (05:30-08:00) dan sore (16:00-18:30)",
    tips: [
      "Bawalah kamera untuk mengabadikan sunrise dan sunset",
      "Berkunjunglah pada hari kerja untuk menghindari keramaian",
      "Jangan lupa mencoba kuliner ikan bilih khas Singkarak",
      "Siapkan pakaian ganti jika berniat berenang",
    ],
    weather: {
      current: "Cerah",
      temperature: "24-30°C",
      humidity: "65-85%",
      bestSeason: "April-Juni & September-November",
    },
    rating: 4.8,
    reviews: [
      {
        name: "Ahmad Rizal",
        rating: 5,
        comment:
          "Pemandangan danau yang luar biasa indah, terutama saat matahari terbit. Air danau yang jernih dan sejuk sangat menyegarkan. Wajib dikunjungi!",
        date: "12 Januari 2024",
      },
      {
        name: "Siti Rahma",
        rating: 5,
        comment:
          "Saya sangat menikmati waktu bersama keluarga di sini. Spot yang bagus untuk foto-foto dan area yang bersih. Anak-anak sangat senang bermain di tepi danau.",
        date: "5 Januari 2024",
      },
      {
        name: "Budi Santoso",
        rating: 4,
        comment:
          "Tempat yang tenang dan damai. Pemandangannya indah, tapi akan lebih baik jika fasilitas toilet ditingkatkan. Overall sangat merekomendasikan!",
        date: "28 Desember 2023",
      },
    ],
    nearbyDestinations: [
      {
        id: "2",
        name: "Puncak Macau Duo",
        image: "/images/gallery/macauduo.png",
        distance: "4 km",
        category: "Perbukitan",
      },
      {
        id: "3",
        name: "Air Terjun Lubuak Tampuruang",
        image: "/images/gallery/airterjun.jpg",
        distance: "5.5 km",
        category: "Air Terjun",
      },
      {
        id: "4",
        name: "Hutan Pinus Aia Batumbuak",
        image: "/images/gallery/hutanpinus.jpg",
        distance: "3 km",
        category: "Hutan",
      },
    ],
  },
  {
    id: "2",
    name: "Puncak Macau Duo",
    category: "Perbukitan",
    description:
      "Puncak Macau Duo adalah destinasi wisata alam berupa perbukitan dengan ketinggian sekitar 1.200 mdpl yang menawarkan panorama 360 derajat Nagari Guguak Malalo dan Danau Singkarak. Tempat ini menjadi favorit para penggemar sunrise hunting dan hiking.",
    longDescription: `<p>Puncak Macau Duo terletak di kawasan perbukitan Nagari Guguak Malalo dengan ketinggian sekitar 1.200 meter di atas permukaan laut. Nama "Macau Duo" berasal dari bahasa Minangkabau yang bermakna "dua mata", karena dari puncak ini pengunjung dapat melihat pemandangan indah Danau Singkarak di satu sisi dan pemandangan lembah hijau di sisi lainnya.</p>
    <p>Perjalanan menuju puncak membutuhkan waktu sekitar 1-2 jam, melewati jalur pendakian yang dikelilingi hutan tropis yang sejuk dan asri. Sepanjang jalur pendakian, pengunjung akan disuguhi pemandangan alam yang menakjubkan dan udara pegunungan yang segar.</p>
    <p>Puncak Macau Duo sangat terkenal dengan pesona matahari terbitnya yang spektakuler. Banyak fotografer dan pecinta alam yang sengaja bermalam di puncak untuk menangkap momen sunrise yang memukau. Pada pagi hari yang cerah, pengunjung bisa melihat lautan awan (sea of clouds) yang menutupi lembah di bawah.</p>
    <p>Area puncak cukup luas dan memiliki beberapa spot camping yang ideal. Beberapa titik telah dilengkapi dengan gazebo sederhana untuk beristirahat sambil menikmati pemandangan. Namun, pengunjung diharapkan untuk selalu menjaga kebersihan dan tidak merusak lingkungan sekitar.</p>`,
    mainImage: "/images/gallery/macauduo.png",
    gallery: [
      "/images/gallery/macauduo1.jpg",
      "/images/gallery/macauduo2.jpg",
      "/images/gallery/macauduo3.jpg",
      "/images/gallery/macauduo4.jpg",
    ],
    activities: [
      "Hiking",
      "Camping",
      "Sunrise hunting",
      "Fotografi",
      "Bird watching",
    ],
    facilities: [
      "Jalur pendakian",
      "Area camping",
      "Gazebo istirahat",
      "Spot foto",
    ],
    location: {
      distance: "4 km dari pusat nagari",
      accessType: "Medan menengah (hiking)",
      address: "Jorong Baing, Nagari Guguak Malalo, Kecamatan Batipuh Selatan",
      transportOptions: ["Jalan kaki (hiking)", "Ojek khusus"],
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.235778919711!2d100.49810!3d-0.59915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd54bd2f0efa2a3%3A0x100c5833d5fc0f0!2sKantor%20Walinagari%20Guguak%20Malalo%2C%20Batipuh%20Selatan%2C%20Tanah%20Datar%2C%20West%20Sumatra!5e0!3m2!1sen!2sid!4v1650000000000!5m2!1sen!2sid",
    },
    ticket: "Rp 5.000/orang",
    openHours: "24 jam (disarankan hiking pagi atau siang)",
    bestVisitTime: "Mulai hiking pukul 03:00 untuk melihat sunrise",
    tips: [
      "Bawa perlengkapan camping yang memadai jika bermalam",
      "Persiapkan fisik yang baik untuk pendakian",
      "Bawalah air minum yang cukup",
      "Gunakan sepatu hiking yang nyaman",
      "Cek prakiraan cuaca sebelum mendaki",
    ],
    weather: {
      current: "Sejuk",
      temperature: "16-25°C",
      humidity: "70-90%",
      bestSeason: "Mei-September (musim kemarau)",
    },
    rating: 4.9,
    reviews: [
      {
        name: "Fadli Rahman",
        rating: 5,
        comment:
          "Sunrise di puncak ini luar biasa indah! Pendakiannya tidak terlalu sulit dan pemandangan 360 derajat dari atas benar-benar memukau.",
        date: "15 Januari 2024",
      },
      {
        name: "Anita Wijaya",
        rating: 5,
        comment:
          "Saya camping semalam di sini dan tidak menyesal sama sekali. Langit malam penuh bintang dan sunrise-nya spektakuler dengan lautan awan di bawah.",
        date: "2 Januari 2024",
      },
      {
        name: "Rudi Hartono",
        rating: 4,
        comment:
          "Trek pendakian cukup menantang tapi sangat worth it. Saran saya bawa jaket tebal karena malam hari sangat dingin di puncak.",
        date: "24 Desember 2023",
      },
    ],
    nearbyDestinations: [
      {
        id: "1",
        name: "Danau Singkarak",
        image: "/danausingkarak.JPG",
        distance: "4 km",
        category: "Danau",
      },
      {
        id: "3",
        name: "Air Terjun Lubuak Tampuruang",
        image: "/images/gallery/airterjun.jpg",
        distance: "7 km",
        category: "Air Terjun",
      },
      {
        id: "4",
        name: "Hutan Pinus Aia Batumbuak",
        image: "/images/gallery/hutanpinus.jpg",
        distance: "5 km",
        category: "Hutan",
      },
    ],
  },
];

const PariwisataDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [destination, setDestination] = useState<any>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Lightbox states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Add new state variables for social interactions
  const [likedImages, setLikedImages] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [lightboxActions, setLightboxActions] = useState({
    showActions: false,
  });

  useEffect(() => {
    // Check for tab query parameter
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");
    if (
      tabParam &&
      ["overview", "gallery", "facilities", "reviews"].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }

    // Scroll to top when component mounts or ID changes
    window.scrollTo(0, 0);
    setIsLoading(true);

    // Find the destination with matching ID
    const foundDestination = destinationData.find((item) => item.id === id);

    if (foundDestination) {
      setDestination(foundDestination);
      setActiveImage(foundDestination.mainImage);
    }

    setIsLoading(false);
  }, [id, location.search]);

  // Create an array of all images for the lightbox
  const allImages = destination
    ? [destination.mainImage, ...destination.gallery]
    : [];

  // Handle lightbox open
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when lightbox is open
  };

  // Handle lightbox close
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = ""; // Restore scrolling
  };

  // Navigate to next image
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  }, [allImages.length]);

  // Navigate to previous image
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  }, [allImages.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "Escape":
          closeLightbox();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, nextImage, prevImage]);

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

  // Toggle like for an image
  const toggleLike = (imageUrl: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedImages((prev) => ({
      ...prev,
      [imageUrl]: !prev[imageUrl],
    }));
  };

  // Share image function
  const shareImage = (
    imageUrl: string,
    title: string,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: `Lihat foto indah dari ${title}`,
          url: window.location.origin + imageUrl,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback - copy link to clipboard
      navigator.clipboard
        .writeText(window.location.origin + imageUrl)
        .then(() => alert("Link foto disalin ke clipboard!"))
        .catch((err) => console.error("Failed to copy: ", err));
    }
  };

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

  if (!destination) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Destinasi wisata tidak ditemukan
            </h1>
            <Link to="/pariwisata">
              <Button>Kembali ke Pariwisata</Button>
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
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${destination.mainImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Link to="/pariwisata">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white bg-black/30 backdrop-blur-sm hover:bg-white hover:text-gray-800"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Kembali ke Pariwisata
                </Button>
              </Link>
              <Badge className="bg-white/80 text-gray-800 hover:bg-white flex items-center gap-1">
                {getCategoryIcon(destination.category)}
                {destination.category}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              {destination.name}
            </h1>
            <div className="flex items-center text-white space-x-4 flex-wrap gap-y-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-bold">{destination.rating}</span>
                <span className="text-sm text-gray-300 ml-1">
                  ({destination.reviews.length} ulasan)
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1 text-gray-300" />
                <span>{destination.location.distance}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1 text-gray-300" />
                <span>{destination.openHours}</span>
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
              <Tabs
                defaultValue={activeTab}
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="gallery">Galeri</TabsTrigger>
                  <TabsTrigger value="facilities">Fasilitas</TabsTrigger>
                  <TabsTrigger value="reviews">Ulasan</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview">
                  <Card className="border-0 shadow-lg mb-8">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Info className="h-6 w-6 text-[#7ca186]" />
                        Tentang {destination.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="prose prose-lg max-w-none text-gray-700 mb-8"
                        dangerouslySetInnerHTML={{
                          __html: destination.longDescription,
                        }}
                      ></div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">Lokasi</h4>
                              <p className="text-sm text-gray-600">
                                {destination.location.address}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">Jam Operasional</h4>
                              <p className="text-sm text-gray-600">
                                {destination.openHours}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                <span className="font-medium">
                                  Waktu terbaik:
                                </span>{" "}
                                {destination.bestVisitTime}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">Tiket Masuk</h4>
                              <p className="text-sm text-green-600 font-medium">
                                {destination.ticket}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Compass className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">Akses</h4>
                              <p className="text-sm text-gray-600">
                                {destination.location.accessType}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Car className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">Transportasi</h4>
                              <ul className="text-sm text-gray-600 space-y-1 mt-1">
                                {destination.location.transportOptions.map(
                                  (option: string, idx: number) => (
                                    <li key={idx} className="flex items-center">
                                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 flex-shrink-0"></span>
                                      {option}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Cloud className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">Cuaca</h4>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 mt-1">
                                <div className="flex items-center">
                                  <Sun className="h-3 w-3 text-yellow-500 mr-1" />
                                  <span>{destination.weather.current}</span>
                                </div>
                                <div className="flex items-center">
                                  <Thermometer className="h-3 w-3 text-red-500 mr-1" />
                                  <span>{destination.weather.temperature}</span>
                                </div>
                                <div className="flex items-center">
                                  <Wind className="h-3 w-3 text-blue-500 mr-1" />
                                  <span>{destination.weather.humidity}</span>
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 text-green-500 mr-1" />
                                  <span>{destination.weather.bestSeason}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="mt-8 bg-[#7ca186]/5 p-6 rounded-lg">
                        <h3 className="font-bold text-lg mb-4 flex items-center">
                          <Info className="h-5 w-5 text-[#7ca186] mr-2" />
                          Tips Kunjungan
                        </h3>
                        <ul className="space-y-2">
                          {destination.tips.map((tip: string, idx: number) => (
                            <li
                              key={idx}
                              className="flex items-start text-gray-700"
                            >
                              <span className="flex-shrink-0 w-5 h-5 bg-[#7ca186] text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">
                                {idx + 1}
                              </span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Map Location */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        Lokasi {destination.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
                        <iframe
                          src={destination.location.mapEmbed}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Lokasi ${destination.name}`}
                          className="rounded-lg"
                        ></iframe>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Gallery Tab - Improved Layout */}
                <TabsContent value="gallery">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Image className="h-5 w-5 text-[#7ca186]" />
                        Galeri Foto {destination.name}
                      </CardTitle>
                      <p className="text-gray-600 text-sm">
                        Klik foto untuk melihat ukuran penuh. Tekan dua kali
                        untuk menyukai foto.
                      </p>
                    </CardHeader>
                    <CardContent>
                      {/* Masonry-style Gallery Layout */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-max">
                        {allImages.map((image: string, idx: number) => {
                          // Assign different sizes to create visual interest
                          const isLarge = idx === 0 || idx === 3;
                          const isWide = idx === 1;
                          const isTall = idx === 4;

                          return (
                            <div
                              key={idx}
                              className={`relative overflow-hidden rounded-lg cursor-pointer group
                                ${isLarge ? "col-span-2 row-span-2" : ""}
                                ${isWide ? "col-span-2" : ""}
                                ${isTall ? "row-span-2" : ""}
                              `}
                              onClick={() => openLightbox(idx)}
                            >
                              <img
                                src={image}
                                alt={`${destination.name} - Foto ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                style={{
                                  height: isLarge
                                    ? "300px"
                                    : isTall
                                    ? "300px"
                                    : "150px",
                                  objectFit: "cover",
                                }}
                              />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                                <div className="flex justify-end">
                                  <div
                                    className="bg-white rounded-full p-1.5 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={(e) => toggleLike(image, e)}
                                  >
                                    <ThumbsUp
                                      className={`h-4 w-4 ${
                                        likedImages[image]
                                          ? "text-red-500 fill-red-500"
                                          : "text-gray-700"
                                      }`}
                                    />
                                  </div>
                                </div>
                                <div className="text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded self-start">
                                  {idx + 1}/{allImages.length}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* View All Photos Button */}
                      <div className="mt-6 text-center">
                        <Button
                          onClick={() => openLightbox(0)}
                          className="bg-[#7ca186] hover:bg-[#6a8b72]"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Lihat Semua Foto
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Facilities Tab */}
                <TabsContent value="facilities">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Coffee className="h-5 w-5 text-[#7ca186]" />
                        Fasilitas & Aktivitas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="font-bold text-lg mb-4 flex items-center">
                            <Coffee className="h-5 w-5 text-[#7ca186] mr-2" />
                            Fasilitas
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {destination.facilities.map(
                              (facility: string, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                                >
                                  <span className="w-2 h-2 bg-[#7ca186] rounded-full mr-2"></span>
                                  <span className="text-sm">{facility}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg mb-4 flex items-center">
                            <Mountain className="h-5 w-5 text-blue-600 mr-2" />
                            Aktivitas
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {destination.activities.map(
                              (activity: string, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-center p-3 bg-blue-50 rounded-lg"
                                >
                                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                  <span className="text-sm">{activity}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      <Separator className="my-8" />

                      <div className="space-y-6">
                        <h3 className="font-bold text-lg flex items-center">
                          <Camera className="h-5 w-5 text-[#7ca186] mr-2" />
                          Spot Fotografi
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {destination.gallery
                            .slice(0, 3)
                            .map((img: string, idx: number) => (
                              <div
                                key={idx}
                                className="relative rounded-lg overflow-hidden group"
                              >
                                <img
                                  src={img}
                                  alt={`Spot foto ${idx + 1}`}
                                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <span className="text-white font-medium">
                                    Spot Foto {idx + 1}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
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
                          Ulasan Pengunjung
                        </CardTitle>
                        <div className="flex items-center gap-1">
                          <div className="text-3xl font-bold">
                            {destination.rating}
                          </div>
                          <div className="text-sm text-gray-500">
                            <div className="flex">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(destination.rating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                            </div>
                            <div>{destination.reviews.length} ulasan</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6 mt-4">
                        {destination.reviews.map((review: any, idx: number) => (
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
                                    {review.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {review.date}
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
                                        i < review.rating
                                          ? "text-yellow-400 fill-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 text-center">
                        <Button variant="outline">Lihat Semua Ulasan</Button>
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
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Foto
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Guide */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#7ca186]" />
                    Kontak Pemandu Wisata
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-green-600" />
                        <span>0812-3456-7890</span>
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
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Users className="h-5 w-5 mr-2" />
                      Pesan Pemandu Wisata
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Homestay Options */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Home className="h-5 w-5 text-[#7ca186]" />
                    Homestay Terdekat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Homestay Guguak Indah</h4>
                        <Badge variant="outline">600m</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        2 kamar tidur, kapasitas 4 orang
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm font-medium">4.7</span>
                          <span className="text-xs text-gray-500">(32)</span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                          Rp 250.000/malam
                        </span>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Villa Singkarak View</h4>
                        <Badge variant="outline">1.2km</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        3 kamar tidur, kapasitas 6 orang
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm font-medium">4.9</span>
                          <span className="text-xs text-gray-500">(45)</span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                          Rp 400.000/malam
                        </span>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Pondok Ekowisata</h4>
                        <Badge variant="outline">1.5km</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        1 kamar tidur, kapasitas 2 orang
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm font-medium">4.5</span>
                          <span className="text-xs text-gray-500">(19)</span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                          Rp 175.000/malam
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full mt-2 border-[#7ca186] text-[#7ca186]"
                    >
                      <Home className="h-4 w-4 mr-1" />
                      Lihat Semua Homestay
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Nearby Destinations */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Compass className="h-5 w-5 text-blue-600" />
                    Destinasi Wisata Terdekat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {destination.nearbyDestinations.map(
                      (related: any, idx: number) => (
                        <Link
                          to={`/pariwisata/${related.id}`}
                          key={idx}
                          className="block"
                        >
                          <div className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <img
                              src={related.image}
                              alt={related.name}
                              className="w-20 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium group-hover:text-[#7ca186] transition-colors">
                                {related.name}
                              </h4>
                              <div className="flex justify-between">
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                  <MapPin className="h-3 w-3 text-gray-500" />
                                  <span>{related.distance}</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {related.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    )}
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
            Jelajahi Keindahan Nagari Guguak Malalo
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Pesan paket wisata sekarang dan nikmati petualangan tak terlupakan
            di destinasi wisata alam terbaik Sumatera Barat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#7ca186] hover:bg-gray-100"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Pesan Paket Wisata
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white bg-white/15 backdrop-blur-sm hover:bg-white hover:text-[#7ca186]"
            >
              <Phone className="h-5 w-5 mr-2" />
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm z-10">
            {currentImageIndex + 1} / {allImages.length}
          </div>

          {/* Main image container */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="relative max-w-[90vw] max-h-[85vh]"
              onMouseEnter={() => setLightboxActions({ showActions: true })}
              onMouseLeave={() => setLightboxActions({ showActions: false })}
            >
              <img
                src={allImages[currentImageIndex]}
                alt={`Photo ${currentImageIndex + 1} of ${destination.name}`}
                className="max-w-full max-h-[85vh] object-contain"
              />

              {/* Floating action buttons */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex justify-between items-center transition-opacity duration-300 ${
                  lightboxActions.showActions ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex gap-3">
                  <button
                    onClick={(e) => toggleLike(allImages[currentImageIndex], e)}
                    className="bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white p-2 rounded-full transition-colors flex items-center gap-1"
                  >
                    <ThumbsUp
                      className={`h-5 w-5 ${
                        likedImages[allImages[currentImageIndex]]
                          ? "text-red-500 fill-red-500"
                          : "text-white"
                      }`}
                    />
                    <span className="text-sm">Suka</span>
                  </button>

                  <button
                    onClick={(e) =>
                      shareImage(
                        allImages[currentImageIndex],
                        destination.name,
                        e
                      )
                    }
                    className="bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white p-2 rounded-full transition-colors flex items-center gap-1"
                  >
                    <Share2 className="h-5 w-5" />
                    <span className="text-sm">Bagikan</span>
                  </button>
                </div>

                <a
                  href={allImages[currentImageIndex]}
                  download={`${destination.name}-photo-${
                    currentImageIndex + 1
                  }.jpg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#7ca186]/80 hover:bg-[#7ca186] text-white p-2 rounded-full transition-colors flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="h-5 w-5" />
                  <span className="text-sm">Download</span>
                </a>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnail navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-[80vw] py-2 px-4 bg-black/30 backdrop-blur-sm rounded-full">
            {allImages.map((image, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-12 w-16 flex-shrink-0 cursor-pointer transition-all duration-200 rounded-md overflow-hidden ${
                  currentImageIndex === idx
                    ? "border-2 border-white scale-110 shadow-glow"
                    : "border border-gray-600 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add custom style for glow effect on selected thumbnail */}
      <style jsx global>{`
        .shadow-glow {
          box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </Layout>
  );
};

export default PariwisataDetail;
