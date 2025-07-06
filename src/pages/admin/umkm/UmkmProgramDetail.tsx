import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import {
  ArrowLeft,
  Calendar,
  Edit,
  Users,
  Building,
  Target,
  FileText,
  MapPin,
  Phone,
  Mail,
  Image as ImageIcon,
} from "lucide-react";

// Mock data for program details
const mockProgramDetail = {
  id: "1",
  name: "Program Pemberdayaan UMKM Digital",
  description:
    "Program pelatihan digitalisasi usaha mikro kecil menengah untuk meningkatkan daya saing produk lokal di era digital.",
  category: "Pelatihan Digital",
  status: "active",
  startDate: "2024-02-01",
  endDate: "2024-07-30",
  location: "Balai Nagari Guguak Malalo",
  organizer: "Dinas Koperasi dan UMKM",
  organizerContact: "0812-3456-7890",
  organizerEmail: "koperasi@malalo.desa.id",
  participants: 45,
  maxParticipants: 50,
  budget: "Rp 75.000.000",
  requirements: [
    "UMKM yang sudah terdaftar di Nagari",
    "Memiliki produk yang siap dipasarkan",
    "Bersedia mengikuti seluruh rangkaian program",
  ],
  benefits: [
    "Pelatihan pembuatan konten digital",
    "Workshop fotografi produk",
    "Pembuatan website/toko online gratis",
    "Pendampingan selama 6 bulan",
  ],
  schedule: [
    {
      date: "2024-02-01",
      activity: "Pembukaan dan Orientasi Program",
      time: "09:00 - 12:00",
    },
    {
      date: "2024-02-15",
      activity: "Workshop Fotografi Produk",
      time: "09:00 - 16:00",
    },
    {
      date: "2024-03-01",
      activity: "Pelatihan Pemasaran Digital",
      time: "09:00 - 16:00",
    },
    {
      date: "2024-03-15",
      activity: "Workshop Pembuatan Website",
      time: "09:00 - 16:00",
    },
  ],
  partners: [
    "Bank Nagari",
    "Universitas Andalas",
    "Kementerian Komunikasi dan Informatika",
  ],
  images: [
    "/mockimages/program1.jpg",
    "/mockimages/program2.jpg",
    "/mockimages/program3.jpg",
  ],
  testimonials: [
    {
      name: "Ibu Maryam",
      business: "Keripik Sanjai Maryam",
      testimony:
        "Setelah ikut program ini, penjualan keripik saya meningkat 70% berkat bisa jualan online.",
    },
    {
      name: "Pak Rahman",
      business: "Kerajinan Anyaman Bambu",
      testimony:
        "Program ini sangat membantu saya memahami cara memasarkan produk tradisional melalui internet.",
    },
  ],
  lastUpdated: "2024-01-15",
};

const UmkmProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [program, setProgram] = useState(mockProgramDetail);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch program data from API
    // For now, we'll simulate API call with timeout
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProgram(mockProgramDetail);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal memuat data program",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            Aktif
          </Badge>
        );
      case "completed":
        return <Badge variant="secondary">Selesai</Badge>;
      case "upcoming":
        return (
          <Badge variant="default" className="bg-blue-500">
            Akan Datang
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Dibatalkan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          className="mb-2"
          onClick={() => navigate("/admin/umkm/program")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {program.name}
            </h1>
            <AdminBreadcrumbs
              items={[
                { label: "UMKM", href: "/admin/umkm" },
                { label: "Program Pemberdayaan", href: "/admin/umkm/program" },
                { label: program.name },
              ]}
              className="mt-1"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/admin/umkm/program/edit/${id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Program
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detail Program Pemberdayaan</CardTitle>
              <CardDescription>
                Informasi lengkap tentang program pemberdayaan UMKM
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
                  <TabsTrigger value="schedule">Jadwal</TabsTrigger>
                  <TabsTrigger value="participants">Peserta</TabsTrigger>
                  <TabsTrigger value="gallery">Galeri</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Tentang Program
                    </h3>
                    <p className="text-gray-700">{program.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Kategori
                        </h4>
                        <p>{program.category}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Status
                        </h4>
                        <div>{getStatusBadge(program.status)}</div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Periode
                        </h4>
                        <p>
                          {new Date(program.startDate).toLocaleDateString(
                            "id-ID"
                          )}{" "}
                          -{" "}
                          {new Date(program.endDate).toLocaleDateString(
                            "id-ID"
                          )}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Lokasi
                        </h4>
                        <p>{program.location}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Penyelenggara
                        </h4>
                        <p>{program.organizer}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Kontak
                        </h4>
                        <p>{program.organizerContact}</p>
                        <p>{program.organizerEmail}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Peserta
                        </h4>
                        <p>
                          {program.participants} dari {program.maxParticipants}{" "}
                          peserta
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Anggaran
                        </h4>
                        <p>{program.budget}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-2">
                      Persyaratan Program
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {program.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-2">
                      Manfaat Program
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {program.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-2">Mitra Program</h3>
                    <div className="flex flex-wrap gap-2">
                      {program.partners.map((partner, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-blue-50"
                        >
                          {partner}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="schedule">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Jadwal Kegiatan</h3>
                    <div className="space-y-4">
                      {program.schedule.map((item, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-full">
                                  <Calendar className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium">{item.activity}</p>
                                  <p className="text-sm text-gray-500">
                                    {item.time}
                                  </p>
                                </div>
                              </div>
                              <Badge variant="outline" className="w-fit">
                                {new Date(item.date).toLocaleDateString(
                                  "id-ID"
                                )}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="participants">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Daftar Peserta</h3>
                      <p className="text-sm text-gray-500">
                        Total: {program.participants} peserta
                      </p>
                    </div>

                    {/* Normally would have a table with participants here */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-center">
                      <p className="text-yellow-800">
                        Daftar peserta tidak tersedia dalam tampilan pratinjau.
                      </p>
                    </div>

                    <div className="pt-6">
                      <h3 className="text-lg font-medium mb-4">
                        Testimoni Peserta
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {program.testimonials.map((testimonial, index) => (
                          <Card key={index} className="bg-gray-50">
                            <CardContent className="p-4">
                              <p className="italic text-gray-700">
                                "{testimonial.testimony}"
                              </p>
                              <div className="mt-4">
                                <p className="font-medium">
                                  {testimonial.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {testimonial.business}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gallery">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Galeri Program</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {program.images.length > 0 ? (
                        program.images.map((image, index) => (
                          <div
                            key={index}
                            className="aspect-square relative rounded-md overflow-hidden bg-gray-100"
                          >
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              <ImageIcon className="h-12 w-12" />
                            </div>
                            <img
                              src={image}
                              alt={`Foto ${index + 1}`}
                              className="absolute inset-0 w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback if image doesn't load
                                e.currentTarget.style.opacity = "0";
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full bg-gray-50 border rounded-md p-12 text-center">
                          <ImageIcon className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-500">
                            Belum ada foto untuk program ini
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan Program</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Periode</p>
                  <p className="text-sm text-gray-500">
                    {new Date(program.startDate).toLocaleDateString("id-ID")} -{" "}
                    {new Date(program.endDate).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Lokasi</p>
                  <p className="text-sm text-gray-500">{program.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Peserta</p>
                  <p className="text-sm text-gray-500">
                    {program.participants} dari {program.maxParticipants}{" "}
                    peserta
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Penyelenggara</p>
                  <p className="text-sm text-gray-500">{program.organizer}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Kontak</p>
                  <p className="text-sm text-gray-500">
                    {program.organizerContact}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-500">
                    {program.organizerEmail}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-gray-500 border-t pt-4">
              Terakhir diperbarui:{" "}
              {new Date(program.lastUpdated).toLocaleDateString("id-ID")}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Status</p>
                <div className="mt-1">{getStatusBadge(program.status)}</div>
              </div>

              <div>
                <p className="text-sm font-medium">Kategori</p>
                <p className="text-sm text-gray-700">{program.category}</p>
              </div>

              <div>
                <p className="text-sm font-medium">Anggaran</p>
                <p className="text-sm text-gray-700">{program.budget}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UmkmProgramDetail;
