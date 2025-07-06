import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Users,
  Building,
  ArrowLeft,
  ChevronRight,
  Phone,
  Mail,
  Clock,
  BookOpen,
  FileCheck,
  Award,
  ExternalLink,
  CheckSquare,
} from "lucide-react";

// Mock data for program details
const mockProgramsData = [
  {
    id: "1",
    name: "Pelatihan Digital Marketing",
    description:
      "Program pelatihan digitalisasi usaha mikro kecil menengah untuk meningkatkan daya saing produk lokal di era digital.",
    category: "Pelatihan Digital",
    status: "Akan Datang",
    startDate: "2024-02-15",
    endDate: "2024-02-17",
    location: "Balai Nagari Guguak Malalo",
    organizer: "Dinas Koperasi dan UMKM",
    organizerContact: "0812-3456-7890",
    organizerEmail: "koperasi@malalo.desa.id",
    participants: "30 UMKM",
    maxParticipants: 50,
    remainingSlots: 20,
    registrationDeadline: "2024-02-10",
    requirements: [
      "UMKM yang sudah terdaftar di Nagari",
      "Memiliki produk yang siap dipasarkan",
      "Bersedia mengikuti seluruh rangkaian program",
    ],
    benefits: [
      "Pelatihan pembuatan konten digital",
      "Workshop fotografi produk",
      "Pembuatan akun bisnis di media sosial",
      "Pendampingan selama 3 bulan",
    ],
    schedule: [
      {
        date: "2024-02-15",
        time: "09:00 - 16:00",
        activity: "Hari 1: Dasar-dasar Digital Marketing",
      },
      {
        date: "2024-02-16",
        time: "09:00 - 16:00",
        activity: "Hari 2: Fotografi Produk & Konten Media Sosial",
      },
      {
        date: "2024-02-17",
        time: "09:00 - 16:00",
        activity: "Hari 3: Strategi Pemasaran Online & Praktek",
      },
    ],
    facilitators: [
      {
        name: "Budi Santoso",
        role: "Digital Marketing Specialist",
        company: "Tokopedia",
      },
      {
        name: "Siti Rahayu",
        role: "Content Creator",
        company: "Kreator Digital",
      },
    ],
    testimonials: [
      {
        name: "Ibu Aminah",
        business: "Keripik Balado Bu Aminah",
        text: "Setelah ikut pelatihan ini, penjualan online saya meningkat hingga 70%. Sangat bermanfaat!",
      },
      {
        name: "Pak Dodi",
        business: "Kerajinan Bambu Nagari",
        text: "Kini produk kerajinan saya bisa dijual ke luar daerah berkat pemasaran digital.",
      },
    ],
    images: [
      "/images/program/digital-marketing-1.jpg",
      "/images/program/digital-marketing-2.jpg",
    ],
    faqs: [
      {
        question: "Apakah ada biaya pendaftaran?",
        answer:
          "Tidak ada. Program ini gratis untuk UMKM yang terdaftar di Nagari Guguak Malalo.",
      },
      {
        question: "Apakah perlu membawa laptop?",
        answer: "Ya, peserta diharapkan membawa laptop untuk praktik langsung.",
      },
    ],
  },
  {
    id: "2",
    name: "Workshop Kemasan Produk",
    description:
      "Pelatihan untuk meningkatkan nilai jual produk UMKM melalui desain kemasan yang menarik dan berkualitas.",
    category: "Desain & Kemasan",
    status: "Pendaftaran",
    startDate: "2024-02-20",
    endDate: "2024-02-22",
    location: "Aula Kantor Wali Nagari",
    organizer: "Dinas Perindustrian",
    organizerContact: "0813-4567-8901",
    organizerEmail: "perindustrian@malalo.desa.id",
    participants: "25 UMKM",
    maxParticipants: 30,
    remainingSlots: 5,
    registrationDeadline: "2024-02-15",
    requirements: [
      "UMKM dengan produk makanan, minuman, atau kerajinan",
      "Sudah memiliki produk yang siap dipasarkan",
      "Membawa sampel kemasan produk saat ini",
    ],
    benefits: [
      "Pengetahuan tentang desain kemasan yang menarik",
      "Template desain kemasan siap pakai",
      "Informasi supplier kemasan berkualitas",
      "Konsultasi desain kemasan individual",
    ],
    schedule: [
      {
        date: "2024-02-20",
        time: "09:00 - 15:00",
        activity: "Hari 1: Prinsip Desain Kemasan & Branding",
      },
      {
        date: "2024-02-21",
        time: "09:00 - 15:00",
        activity: "Hari 2: Praktek Desain Kemasan",
      },
      {
        date: "2024-02-22",
        time: "09:00 - 12:00",
        activity: "Hari 3: Konsultasi Individual",
      },
    ],
    facilitators: [
      {
        name: "Ahmad Fauzi",
        role: "Desainer Kemasan",
        company: "Creative Packaging Indonesia",
      },
      {
        name: "Rina Wijaya",
        role: "Konsultan Branding",
        company: "Brand Consultant",
      },
    ],
    images: ["/images/program/kemasan-1.jpg", "/images/program/kemasan-2.jpg"],
    faqs: [
      {
        question: "Apakah ada bantuan pembiayaan untuk memproduksi kemasan?",
        answer:
          "Akan ada informasi tentang akses pembiayaan dan diskon dari supplier yang bekerja sama dengan program.",
      },
      {
        question: "Apakah perlu keahlian desain sebelumnya?",
        answer:
          "Tidak perlu. Program ini dirancang untuk pemula yang belum memiliki pengalaman desain.",
      },
    ],
  },
  {
    id: "3",
    name: "Bimbingan Teknis Keuangan",
    description:
      "Program pelatihan pengelolaan keuangan usaha mikro untuk meningkatkan kemampuan manajemen keuangan UMKM.",
    category: "Keuangan",
    status: "Perencanaan",
    startDate: "2024-02-25",
    endDate: "2024-02-27",
    location: "Gedung Serba Guna Nagari",
    organizer: "Bank Nagari",
    organizerContact: "0815-7890-1234",
    organizerEmail: "banknagari@malalo.desa.id",
    participants: "40 UMKM",
    maxParticipants: 50,
    remainingSlots: 10,
    registrationDeadline: "2024-02-20",
    requirements: [
      "Memiliki usaha yang sudah berjalan minimal 6 bulan",
      "Bersedia membawa catatan keuangan usaha (jika ada)",
      "Komitmen mengikuti seluruh rangkaian pelatihan",
    ],
    benefits: [
      "Pelatihan pembukuan sederhana",
      "Template pencatatan keuangan",
      "Strategi pengelolaan modal usaha",
      "Informasi akses permodalan",
    ],
    schedule: [
      {
        date: "2024-02-25",
        time: "09:00 - 15:00",
        activity: "Hari 1: Dasar Pembukuan & Pencatatan Keuangan",
      },
      {
        date: "2024-02-26",
        time: "09:00 - 15:00",
        activity: "Hari 2: Pengelolaan Modal & Arus Kas",
      },
      {
        date: "2024-02-27",
        time: "09:00 - 15:00",
        activity: "Hari 3: Strategi Pengembangan Usaha & Akses Permodalan",
      },
    ],
    facilitators: [
      {
        name: "Hendra Wijaya",
        role: "Manajer Kredit UMKM",
        company: "Bank Nagari",
      },
      {
        name: "Dewi Sartika",
        role: "Konsultan Keuangan UMKM",
        company: "LPEM UI",
      },
    ],
    images: [
      "/images/program/keuangan-1.jpg",
      "/images/program/keuangan-2.jpg",
    ],
    faqs: [
      {
        question: "Apakah ada persyaratan pendidikan minimal?",
        answer:
          "Tidak ada persyaratan pendidikan minimal, program ini terbuka untuk semua pelaku UMKM.",
      },
      {
        question: "Apakah peserta akan mendapatkan modal usaha?",
        answer:
          "Program ini fokus pada pelatihan. Namun, akan ada informasi tentang akses permodalan dan kesempatan pitching kepada investor.",
      },
    ],
  },
];

const UMKMProgramDetail = () => {
  const { id } = useParams();
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch from API
    // For now, simulate API call with mock data
    const fetchProgram = async () => {
      try {
        // Simulate API request
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Find the program with the matching ID
        const foundProgram = mockProgramsData.find((p) => p.id === id);
        if (foundProgram) {
          setProgram(foundProgram);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching program details:", error);
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  if (!program) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Program tidak ditemukan
          </h2>
          <p className="mt-2 text-gray-600">
            Program yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link to="/umkm">
            <Button className="mt-4">Kembali ke halaman UMKM</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link
              to="/umkm"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="text-sm">Kembali ke UMKM</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {program.name}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 border-blue-200"
                >
                  {program.category}
                </Badge>
                <Badge
                  variant={
                    program.status === "Pendaftaran" ? "default" : "outline"
                  }
                >
                  {program.status}
                </Badge>
              </div>
            </div>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Daftar Sekarang
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-blue-600" />
              <span>
                {new Date(program.startDate).toLocaleDateString("id-ID")} -{" "}
                {new Date(program.endDate).toLocaleDateString("id-ID")}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-blue-600" />
              <span>{program.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-blue-600" />
              <span>{program.participants}</span>
            </div>
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-1 text-blue-600" />
              <span>Oleh: {program.organizer}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
                <TabsTrigger value="schedule">Jadwal</TabsTrigger>
                <TabsTrigger value="facilitators">Fasilitator</TabsTrigger>
                <TabsTrigger value="testimonials">Testimoni</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Tentang Program</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-gray-700 leading-relaxed">
                      {program.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div>
                        <h3 className="font-medium text-lg mb-3 flex items-center">
                          <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                          Manfaat Program
                        </h3>
                        <ul className="space-y-2">
                          {program.benefits.map(
                            (benefit: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckSquare className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-lg mb-3 flex items-center">
                          <FileCheck className="h-5 w-5 mr-2 text-blue-600" />
                          Persyaratan
                        </h3>
                        <ul className="space-y-2">
                          {program.requirements.map(
                            (req: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <ChevronRight className="h-5 w-5 mr-2 text-blue-600 shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    {program.faqs && program.faqs.length > 0 && (
                      <div className="mt-8">
                        <h3 className="font-medium text-lg mb-3">FAQ</h3>
                        <div className="space-y-4">
                          {program.faqs.map((faq: any, idx: number) => (
                            <div key={idx} className="border-b pb-4">
                              <p className="font-medium text-gray-800">
                                {faq.question}
                              </p>
                              <p className="text-gray-600 mt-1">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {program.images &&
                    program.images.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="rounded-lg overflow-hidden h-64 bg-gray-100 relative"
                      >
                        <img
                          src={img}
                          alt={`${program.name} - foto ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://placehold.co/600x400?text=Program+Image";
                          }}
                        />
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Jadwal Program</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-4">
                      {program.schedule.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="border-l-4 border-blue-500 pl-4 py-2"
                        >
                          <div className="flex items-center text-blue-800 mb-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="font-medium">
                              {new Date(item.date).toLocaleDateString("id-ID")}
                            </span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{item.time}</span>
                          </div>
                          <p className="text-gray-800">{item.activity}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="facilitators">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Fasilitator & Pembicara
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {program.facilitators.map((person: any, idx: number) => (
                        <div key={idx} className="flex">
                          <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mr-4">
                            <span className="text-blue-800 font-bold text-xl">
                              {person.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">
                              {person.name}
                            </h3>
                            <p className="text-gray-600">{person.role}</p>
                            <p className="text-blue-600 text-sm">
                              {person.company}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Testimoni Peserta</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-6">
                      {program.testimonials ? (
                        program.testimonials.map(
                          (testimonial: any, idx: number) => (
                            <div
                              key={idx}
                              className="bg-gray-50 p-4 rounded-lg"
                            >
                              <p className="italic text-gray-700">
                                "{testimonial.text}"
                              </p>
                              <div className="mt-3">
                                <p className="font-medium">
                                  {testimonial.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {testimonial.business}
                                </p>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <p className="text-gray-600">
                          Belum ada testimoni untuk program ini.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div>
            <div className="space-y-6">
              <Card>
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-lg text-green-800">
                    Informasi Pendaftaran
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="border-b pb-3">
                    <p className="text-sm text-gray-500">Status Pendaftaran</p>
                    <p className="font-medium">{program.status}</p>
                  </div>

                  <div className="border-b pb-3">
                    <p className="text-sm text-gray-500">
                      Deadline Pendaftaran
                    </p>
                    <p className="font-medium">
                      {new Date(
                        program.registrationDeadline
                      ).toLocaleDateString("id-ID")}
                    </p>
                  </div>

                  <div className="border-b pb-3">
                    <p className="text-sm text-gray-500">Sisa Kuota</p>
                    <p className="font-medium">
                      {program.remainingSlots} dari {program.maxParticipants}{" "}
                      peserta
                    </p>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 mt-2">
                    Daftar Sekarang
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Kontak Penyelenggara
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Building className="h-5 w-5 mr-3 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{program.organizer}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p>{program.organizerContact}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p>{program.organizerEmail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                    <div className="flex items-start">
                      <Award className="h-5 w-5 mr-2 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-amber-800 text-sm">
                        Program ini diselenggarakan untuk mendukung pengembangan
                        UMKM Nagari Guguak Malalo.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UMKMProgramDetail;
