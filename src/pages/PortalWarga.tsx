
import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  User, 
  FileText, 
  Bell, 
  MessageSquare, 
  Calendar, 
  Vote,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Heart,
  MapPin
} from 'lucide-react';

const PortalWarga = () => {
  // Mock data for demonstration
  const documentHistory = [
    {
      id: 1,
      type: "Surat Keterangan Domisili",
      date: "2024-01-15",
      status: "Selesai",
      statusColor: "bg-green-500"
    },
    {
      id: 2,
      type: "Surat Keterangan Usaha",
      date: "2024-01-10",
      status: "Diproses",
      statusColor: "bg-yellow-500"
    },
    {
      id: 3,
      type: "SKTM",
      date: "2024-01-05",
      status: "Menunggu",
      statusColor: "bg-blue-500"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Dokumen Surat Domisili Sudah Selesai",
      message: "Surat Keterangan Domisili Anda telah selesai diproses dan siap diambil.",
      time: "2 jam yang lalu",
      isRead: false
    },
    {
      id: 2,
      title: "Jadwal Gotong Royong",
      message: "Kegiatan gotong royong akan dilaksanakan hari Minggu, 21 Januari 2024.",
      time: "1 hari yang lalu",
      isRead: true
    },
    {
      id: 3,
      title: "Pengumuman Program Bantuan",
      message: "Pendaftaran program bantuan UMKM telah dibuka hingga 31 Januari 2024.",
      time: "3 hari yang lalu",
      isRead: true
    }
  ];

  const communityEvents = [
    {
      id: 1,
      title: "Gotong Royong Pembersihan Danau",
      date: "2024-01-21",
      time: "07:00 WIB",
      location: "Danau GuguakMalalo",
      participants: 45
    },
    {
      id: 2,
      title: "Pelatihan UMKM Digital Marketing",
      date: "2024-01-25",
      time: "09:00 WIB",
      location: "Balai Nagari",
      participants: 23
    },
    {
      id: 3,
      title: "Festival Kuliner Tradisional",
      date: "2024-02-01",
      time: "16:00 WIB",
      location: "Lapangan Nagari",
      participants: 78
    }
  ];

  const quickStats = [
    { label: "Dokumen Diproses", value: "12", icon: FileText, color: "text-blue-600" },
    { label: "Notifikasi Baru", value: "3", icon: Bell, color: "text-red-600" },
    { label: "Event Mendatang", value: "5", icon: Calendar, color: "text-green-600" },
    { label: "Forum Aktif", value: "8", icon: MessageSquare, color: "text-purple-600" }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Portal Warga GuguakMalalo</h1>
              <p className="text-lg opacity-90">Selamat datang di layanan digital nagari Anda</p>
            </div>
            <div className="hidden md:block">
              <User className="h-20 w-20 opacity-50" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="documents">Dokumen</TabsTrigger>
            <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
            <TabsTrigger value="community">Komunitas</TabsTrigger>
            <TabsTrigger value="voting">E-Voting</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Dokumen Terbaru
                  </CardTitle>
                  <CardDescription>Status pengajuan dokumen terbaru Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documentHistory.slice(0, 3).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{doc.type}</div>
                          <div className="text-sm text-gray-600">{doc.date}</div>
                        </div>
                        <Badge className={`${doc.statusColor} text-white`}>
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Lihat Semua Dokumen
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifikasi Terbaru
                  </CardTitle>
                  <CardDescription>Pemberitahuan dan pengumuman terbaru</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((notif) => (
                      <div key={notif.id} className={`p-3 rounded-lg ${notif.isRead ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
                        <div className="font-medium text-sm">{notif.title}</div>
                        <div className="text-xs text-gray-600 mt-1">{notif.time}</div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Lihat Semua Notifikasi
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Services */}
            <Card>
              <CardHeader>
                <CardTitle>Layanan Cepat</CardTitle>
                <CardDescription>Akses cepat ke layanan yang sering digunakan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">Surat Domisili</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="text-xs">SKTM</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-xs">Pengaduan</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs">Jadwal Layanan</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Dokumen</CardTitle>
                <CardDescription>Semua pengajuan dokumen dan statusnya</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documentHistory.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <div className="font-medium">{doc.type}</div>
                          <div className="text-sm text-gray-600">Diajukan: {doc.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`${doc.statusColor} text-white`}>
                          {doc.status}
                        </Badge>
                        <Button variant="outline" size="sm">Detail</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Semua Notifikasi</CardTitle>
                <CardDescription>Pemberitahuan dan pengumuman dari nagari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`p-4 rounded-lg border ${!notif.isRead ? 'bg-blue-50 border-blue-200' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{notif.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{notif.message}</div>
                          <div className="text-xs text-gray-500 mt-2">{notif.time}</div>
                        </div>
                        {!notif.isRead && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Community Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Kegiatan Komunitas
                  </CardTitle>
                  <CardDescription>Event dan kegiatan nagari mendatang</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {communityEvents.map((event) => (
                      <div key={event.id} className="p-4 border rounded-lg">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.date} - {event.time}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Users className="h-4 w-4" />
                            {event.participants} peserta
                          </div>
                        </div>
                        <Button size="sm" className="mt-3">
                          <Heart className="h-4 w-4 mr-1" />
                          Ikut Serta
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Forum Discussion */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Forum Diskusi
                  </CardTitle>
                  <CardDescription>Diskusi dan obrolan warga nagari</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium">Usulan Perbaikan Jalan Desa</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Diskusi tentang prioritas perbaikan infrastruktur jalan...
                      </div>
                      <div className="text-xs text-gray-500 mt-2">12 balasan • 2 jam lalu</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium">Program Kebersihan Danau</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Mari diskusikan program kebersihan danau bersama...
                      </div>
                      <div className="text-xs text-gray-500 mt-2">8 balasan • 5 jam lalu</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium">Festival Budaya Minang</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Persiapan acara festival budaya tahun ini...
                      </div>
                      <div className="text-xs text-gray-500 mt-2">15 balasan • 1 hari lalu</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Lihat Semua Diskusi
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* E-Voting Tab */}
          <TabsContent value="voting">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5" />
                  E-Voting Nagari
                </CardTitle>
                <CardDescription>Berpartisipasi dalam pengambilan keputusan nagari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Active Voting */}
                  <div className="p-6 border-2 border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Voting Aktif</span>
                    </div>
                    <div className="font-medium text-lg mb-2">
                      Prioritas Program Pembangunan 2024
                    </div>
                    <div className="text-gray-600 mb-4">
                      Pilih program pembangunan yang menjadi prioritas utama nagari tahun 2024
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Berakhir: 31 Januari 2024 • 156 suara
                      </div>
                      <Button>
                        <Vote className="h-4 w-4 mr-2" />
                        Vote Sekarang
                      </Button>
                    </div>
                  </div>

                  {/* Upcoming Voting */}
                  <div className="p-6 border rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Akan Datang</span>
                    </div>
                    <div className="font-medium text-lg mb-2">
                      Pemilihan Lokasi Festival Tahunan
                    </div>
                    <div className="text-gray-600 mb-4">
                      Tentukan lokasi terbaik untuk mengadakan festival tahunan nagari
                    </div>
                    <div className="text-sm text-gray-600">
                      Dimulai: 5 Februari 2024
                    </div>
                  </div>

                  {/* Past Voting */}
                  <div className="p-6 border bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-800">Selesai</span>
                    </div>
                    <div className="font-medium text-lg mb-2">
                      Penetapan Jadwal Gotong Royong
                    </div>
                    <div className="text-gray-600 mb-4">
                      Hasil: Setiap hari Minggu minggu ketiga • 203 suara
                    </div>
                    <Button variant="outline" size="sm">
                      Lihat Hasil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PortalWarga;
