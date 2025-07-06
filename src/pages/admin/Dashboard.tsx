import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Users,
  FileText,
  Calendar,
  Map,
  MessageSquare,
  Bell,
  RefreshCw,
  Store,
  Activity,
  BarChart,
  PieChart,
  LineChart,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

// Dummy data for charts (would be replaced with actual chart components like recharts)
const chartData = {
  visitors: [120, 240, 180, 320, 260, 400, 350],
  services: [60, 85, 75, 92, 88, 95, 85],
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-[#7ca186] p-6 rounded-lg shadow-md text-white">
        <div>
          <h1 className="text-2xl font-bold">Selamat Datang, Admin!</h1>
          <p className="mt-1 opacity-90">{currentDate}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/admin/berita/tambah")}
          >
            Buat Pengumuman
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            size="sm"
          >
            Lihat Laporan
          </Button>
        </div>
      </div>

      {/* Key Statistics/Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Pengunjung Website
                </p>
                <h3 className="text-2xl font-bold mt-2">4,282</h3>
                <p className="text-sm font-medium mt-2 flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" /> 12.5{" "}
                  <span className="text-gray-400 ml-1">dari bulan lalu</span>
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Layanan Aktif
                </p>
                <h3 className="text-2xl font-bold mt-2">152</h3>
                <p className="text-sm font-medium mt-2 flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" /> 4.3{" "}
                  <span className="text-gray-400 ml-1">dari bulan lalu</span>
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total UMKM</p>
                <h3 className="text-2xl font-bold mt-2">24</h3>
                <p className="text-sm font-medium mt-2 flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" /> 8.1{" "}
                  <span className="text-gray-400 ml-1">dari bulan lalu</span>
                </p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Store className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Event Bulan Ini
                </p>
                <h3 className="text-2xl font-bold mt-2">7</h3>
                <p className="text-sm font-medium mt-2 flex items-center text-red-500">
                  <ArrowDown className="h-4 w-4 mr-1" /> 2.8{" "}
                  <span className="text-gray-400 ml-1">dari bulan lalu</span>
                </p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Statistik Pengunjung</CardTitle>
            <CardDescription>
              Jumlah pengunjung website dalam 7 hari terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              {/* This would be replaced with an actual chart component */}
              <div className="h-full w-full bg-gray-50 rounded-md flex items-center justify-center relative">
                <div className="absolute inset-0 p-4">
                  <div className="flex justify-between">
                    {chartData.months.map((month, index) => (
                      <div
                        key={index}
                        className="relative flex flex-col items-center w-full"
                      >
                        <div
                          className="bg-blue-500 rounded-t-sm w-6"
                          style={{
                            height: `${
                              (chartData.visitors[index] /
                                Math.max(...chartData.visitors)) *
                              200
                            }px`,
                            marginTop: `auto`,
                          }}
                        />
                        <span className="text-xs mt-1 text-gray-600">
                          {month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <BarChart className="h-20 w-20 text-gray-300" strokeWidth={1} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <p className="text-sm text-gray-500">
              Total 30 hari: 9,472 pengunjung
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/analytics")}
            >
              Lihat Lebih Detail <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Kinerja Layanan Digital</CardTitle>
            <CardDescription>
              Persentase penyelesaian layanan dalam 30 hari terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 mt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium">
                      Surat Keterangan Domisili
                    </span>
                  </div>
                  <span className="text-sm font-bold">96%</span>
                </div>
                <Progress value={96} className="h-2 bg-gray-100" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm font-medium">
                      Surat Pengantar KTP/KK
                    </span>
                  </div>
                  <span className="text-sm font-bold">89%</span>
                </div>
                <Progress value={89} className="h-2 bg-gray-100" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm font-medium">
                      Surat Keterangan Usaha
                    </span>
                  </div>
                  <span className="text-sm font-bold">78%</span>
                </div>
                <Progress value={78} className="h-2 bg-gray-100" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm font-medium">
                      Legalisir Dokumen
                    </span>
                  </div>
                  <span className="text-sm font-bold">94%</span>
                </div>
                <Progress value={94} className="h-2 bg-gray-100" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm font-medium">
                      Surat Keterangan Tidak Mampu
                    </span>
                  </div>
                  <span className="text-sm font-bold">85%</span>
                </div>
                <Progress value={85} className="h-2 bg-gray-100" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <p className="text-sm text-gray-500">
              Rata-rata: 88.4% tepat waktu
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/layanan")}
            >
              Kelola Layanan <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Activities and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="activities" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="activities">Aktivitas Terbaru</TabsTrigger>
                <TabsTrigger value="tasks">Tugas (5)</TabsTrigger>
                <TabsTrigger value="notifications">Notifikasi (3)</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" /> Refresh
              </Button>
            </div>

            <TabsContent value="activities">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex items-start gap-4 p-4">
                      <Avatar className="mt-1">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          Hasan mengajukan permohonan Surat Keterangan Usaha
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Menunggu verifikasi admin
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="font-normal">
                            Layanan Digital
                          </Badge>
                          <span className="text-xs text-gray-500">
                            10 menit yang lalu
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4">
                      <Avatar className="mt-1">
                        <AvatarFallback className="bg-green-100 text-green-600">
                          RF
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          Penyaluran Bantuan Modal UMKM telah selesai
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          12 UMKM telah menerima bantuan
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="font-normal">
                            UMKM
                          </Badge>
                          <span className="text-xs text-gray-500">
                            2 jam yang lalu
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4">
                      <Avatar className="mt-1">
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          SR
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          Rapat koordinasi Festival Danau Singkarak
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Notulen rapat telah diunggah
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="font-normal">
                            Event & Festival
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Kemarin, 14:30
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4">
                      <Avatar className="mt-1">
                        <AvatarFallback className="bg-amber-100 text-amber-600">
                          MA
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          Pembaruan data objek wisata Air Terjun Sarasah
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Menambahkan informasi akses dan fasilitas baru
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="font-normal">
                            Pariwisata
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Kemarin, 10:15
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4">
                      <Avatar className="mt-1">
                        <AvatarFallback className="bg-red-100 text-red-600">
                          AR
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          Pengumuman perbaikan infrastruktur jalan
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Telah dipublikasikan di website nagari
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="font-normal">
                            Pengumuman
                          </Badge>
                          <span className="text-xs text-gray-500">
                            2 hari yang lalu
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-center">
                  <Button variant="link">Lihat Semua Aktivitas</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Verifikasi permohonan layanan (3)
                          </h4>
                          <Badge variant="destructive">Urgent</Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          Deadline: Hari Ini, 17:00
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-amber-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Persiapan rapat koordinasi festival
                          </h4>
                          <Badge variant="outline">Besok</Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          Deadline: Besok, 09:00
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Finalisasi anggaran triwulan
                          </h4>
                          <Badge variant="outline">Minggu ini</Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          Deadline: Jumat, 20 Jul 2023
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <UserCheck className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Pembaruan data kependudukan
                          </h4>
                          <Badge variant="outline">Minggu ini</Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          Deadline: Sabtu, 21 Jul 2023
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-purple-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Tindak lanjut pengaduan warga
                          </h4>
                          <Badge variant="outline">Minggu depan</Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          Deadline: Senin, 23 Jul 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-center">
                  <Button variant="link">Kelola Semua Tugas</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex items-start gap-4 p-4 bg-blue-50">
                      <div className="flex-shrink-0 mt-1">
                        <Bell className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium">Pengajuan layanan baru</p>
                          <Badge variant="secondary" className="font-normal">
                            Baru
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          3 permintaan layanan membutuhkan persetujuan
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          5 menit yang lalu
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-blue-50">
                      <div className="flex-shrink-0 mt-1">
                        <Bell className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium">Laporan sistem baru</p>
                          <Badge variant="secondary" className="font-normal">
                            Baru
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Laporan aktivitas mingguan telah tersedia
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          1 jam yang lalu
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Pembaruan sistem berhasil</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Sistem telah diperbarui ke versi terbaru
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Kemarin, 18:35
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-center">
                  <Button variant="link">Lihat Semua Notifikasi</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Event Mendatang</CardTitle>
            <CardDescription>Jadwal 30 hari ke depan</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-shrink-0 bg-blue-100 text-blue-800 text-center py-1 px-3 rounded-md">
                    <p className="text-xs font-medium">JUL</p>
                    <p className="text-lg font-bold">15</p>
                  </div>
                  <div className="flex-1 ml-4">
                    <h4 className="font-medium">Festival Danau Singkarak</h4>
                    <p className="text-sm text-gray-500 mt-1">08:00 - 17:00</p>
                    <p className="text-sm text-gray-500">Danau Singkarak</p>
                  </div>
                  <Badge className="bg-blue-500 ml-2">Akan Datang</Badge>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-shrink-0 bg-blue-100 text-blue-800 text-center py-1 px-3 rounded-md">
                    <p className="text-xs font-medium">JUL</p>
                    <p className="text-lg font-bold">22</p>
                  </div>
                  <div className="flex-1 ml-4">
                    <h4 className="font-medium">
                      Pelatihan Digital Marketing UMKM
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">09:00 - 15:00</p>
                    <p className="text-sm text-gray-500">Balai Nagari</p>
                  </div>
                  <Badge className="bg-blue-500 ml-2">Akan Datang</Badge>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-shrink-0 bg-blue-100 text-blue-800 text-center py-1 px-3 rounded-md">
                    <p className="text-xs font-medium">JUL</p>
                    <p className="text-lg font-bold">29</p>
                  </div>
                  <div className="flex-1 ml-4">
                    <h4 className="font-medium">
                      Gotong Royong Pembersihan Sungai
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">07:00 - 11:00</p>
                    <p className="text-sm text-gray-500">
                      Sungai Batang Malalo
                    </p>
                  </div>
                  <Badge className="bg-blue-500 ml-2">Akan Datang</Badge>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-shrink-0 bg-amber-100 text-amber-800 text-center py-1 px-3 rounded-md">
                    <p className="text-xs font-medium">AGT</p>
                    <p className="text-lg font-bold">05</p>
                  </div>
                  <div className="flex-1 ml-4">
                    <h4 className="font-medium">
                      Workshop Kerajinan Tradisional
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">10:00 - 16:00</p>
                    <p className="text-sm text-gray-500">Gedung Serbaguna</p>
                  </div>
                  <Badge className="bg-blue-500 ml-2">Akan Datang</Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-4 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => navigate("/admin/events")}
            >
              Lihat Semua Event
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Button
          variant="outline"
          className="h-auto flex-col py-6 px-4 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
          onClick={() => navigate("/admin/berita")}
        >
          <FileText className="h-8 w-8 mb-2" />
          <span>Berita & Pengumuman</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto flex-col py-6 px-4 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
          onClick={() => navigate("/admin/layanan")}
        >
          <FileText className="h-8 w-8 mb-2" />
          <span>Layanan Digital</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto flex-col py-6 px-4 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200"
          onClick={() => navigate("/admin/umkm")}
        >
          <Store className="h-8 w-8 mb-2" />
          <span>UMKM & Ekonomi</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto flex-col py-6 px-4 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
          onClick={() => navigate("/admin/pariwisata")}
        >
          <Map className="h-8 w-8 mb-2" />
          <span>Pariwisata</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto flex-col py-6 px-4 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200"
          onClick={() => navigate("/admin/events")}
        >
          <Calendar className="h-8 w-8 mb-2" />
          <span>Event & Festival</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto flex-col py-6 px-4 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
          onClick={() => navigate("/admin/pengguna")}
        >
          <Users className="h-8 w-8 mb-2" />
          <span>Pengguna</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
