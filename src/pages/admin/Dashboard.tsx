import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Users,
  FileText,
  ShoppingBag,
  MapPin,
  Calendar,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const currentTime = new Date();
  const hours = currentTime.getHours();

  let greeting;
  if (hours < 12) greeting = "Selamat Pagi";
  else if (hours < 15) greeting = "Selamat Siang";
  else if (hours < 19) greeting = "Selamat Sore";
  else greeting = "Selamat Malam";

  // Mock statistics data
  const stats = [
    {
      title: "Total Pengunjung",
      value: "14,582",
      change: "+12%",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Layanan Diproses",
      value: "1,234",
      change: "+5%",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      title: "UMKM Terdaftar",
      value: "156",
      change: "+8%",
      icon: ShoppingBag,
      color: "bg-amber-500",
    },
    {
      title: "Objek Wisata",
      value: "8",
      change: "+1",
      icon: MapPin,
      color: "bg-purple-500",
    },
  ];

  // Mock recent activities
  const activities = [
    {
      action: "Layanan baru diajukan",
      user: "Ahmad Kurniawan",
      time: "5 menit yang lalu",
      type: "service",
    },
    {
      action: "Berita baru dipublikasikan",
      user: "Admin",
      time: "2 jam yang lalu",
      type: "news",
    },
    {
      action: "UMKM baru terdaftar",
      user: "Warung Bu Siti",
      time: "1 hari yang lalu",
      type: "umkm",
    },
    {
      action: "Pembaruan data wisata",
      user: "Admin",
      time: "2 hari yang lalu",
      type: "tourism",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {greeting}, {user?.name}
        </h1>
        <p className="text-gray-500">
          Berikut adalah ringkasan aktivitas dan statistik website Nagari Guguak
          Malalo
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} dari bulan lalu
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>
              Aktivitas yang terjadi dalam 7 hari terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4">
                    <div className="p-2 rounded-full bg-blue-100">
                      {activity.type === "service" && (
                        <FileText className="h-4 w-4 text-blue-600" />
                      )}
                      {activity.type === "news" && (
                        <Activity className="h-4 w-4 text-green-600" />
                      )}
                      {activity.type === "umkm" && (
                        <ShoppingBag className="h-4 w-4 text-amber-600" />
                      )}
                      {activity.type === "tourism" && (
                        <MapPin className="h-4 w-4 text-purple-600" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                    <p className="text-xs text-gray-400 flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Sistem</CardTitle>
            <CardDescription>Status dan pengumuman sistem</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg border border-green-100 flex items-start">
              <div className="p-1 rounded-full bg-green-100 mr-3">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">
                  Sistem berjalan normal
                </p>
                <p className="text-xs text-green-600">Semua layanan tersedia</p>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 flex items-start">
              <div className="p-1 rounded-full bg-amber-100 mr-3">
                <AlertCircle className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Pemeliharaan Terjadwal
                </p>
                <p className="text-xs text-amber-600">
                  10 Juli 2024, 01:00 - 03:00 WIB
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Versi Sistem</h4>
              <div className="text-xs text-gray-500 space-y-1">
                <p>Frontend: v1.2.0</p>
                <p>Backend API: v1.1.5</p>
                <p>Database: v1.0.3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="p-3 rounded-full bg-blue-100 mb-3">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Tambah Berita</p>
            </CardContent>
          </Card>

          <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="p-3 rounded-full bg-green-100 mb-3">
                <ShoppingBag className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm font-medium">Daftar UMKM</p>
            </CardContent>
          </Card>

          <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="p-3 rounded-full bg-purple-100 mb-3">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-sm font-medium">Kelola Wisata</p>
            </CardContent>
          </Card>

          <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="p-3 rounded-full bg-amber-100 mb-3">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
              <p className="text-sm font-medium">Pengaturan Akun</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Visitor Analytics */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Statistik Pengunjung Website</CardTitle>
            <CardDescription>Data kunjungan 30 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {/* Placeholder for chart - in real implementation, use a charting library */}
              <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-200">
                <div className="text-center p-4">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 font-medium">
                    Visualisasi data pengunjung akan ditampilkan di sini
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Gunakan library seperti Chart.js, Recharts, atau ApexCharts
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
