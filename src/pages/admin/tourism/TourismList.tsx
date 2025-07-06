import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Calendar,
} from "lucide-react";

// Mock data
const mockTourismData = [
  {
    id: "1",
    name: "Air Terjun Sarasah",
    category: "Alam",
    location: "Jorong Guguak Malalo",
    status: "active",
    visitors: 125,
    lastUpdate: "2024-01-15",
  },
  {
    id: "2",
    name: "Danau Singkarak",
    category: "Alam",
    location: "Danau Singkarak",
    status: "active",
    visitors: 89,
    lastUpdate: "2024-01-10",
  },
  {
    id: "3",
    name: "Rumah Gadang Tradisional",
    category: "Budaya",
    location: "Pusat Nagari",
    status: "inactive",
    visitors: 45,
    lastUpdate: "2024-01-05",
  },
];

const TourismList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTourism = mockTourismData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            Aktif
          </Badge>
        );
      case "inactive":
        return <Badge variant="secondary">Nonaktif</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus objek wisata "${name}"?`)) {
      toast({
        title: "Objek wisata dihapus",
        description: `${name} berhasil dihapus`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pariwisata</h1>
        <AdminBreadcrumbs items={[{ label: "Pariwisata" }]} className="mt-1" />
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-900">Objek Wisata</h3>
                <p className="text-sm text-green-700">
                  Kelola destinasi wisata
                </p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-blue-50 border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
          onClick={() => navigate("/admin/events")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">
                  Event & Festival
                </h3>
                <p className="text-sm text-blue-700">
                  Kelola acara dan festival
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Objek Wisata</CardTitle>
            <Button onClick={() => navigate("/admin/pariwisata/tambah")}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Objek Wisata
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari objek wisata..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
              </select>
            </div>
          </div>

          {/* Tourism Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Objek Wisata</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pengunjung</TableHead>
                <TableHead>Terakhir Diperbarui</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTourism.map((tourism) => (
                <TableRow key={tourism.id}>
                  <TableCell className="font-medium">{tourism.name}</TableCell>
                  <TableCell>{tourism.category}</TableCell>
                  <TableCell>{tourism.location}</TableCell>
                  <TableCell>{getStatusBadge(tourism.status)}</TableCell>
                  <TableCell>{tourism.visitors}</TableCell>
                  <TableCell>
                    {new Date(tourism.lastUpdate).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/admin/pariwisata/${tourism.id}`)
                          }
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/admin/pariwisata/${tourism.id}/edit`)
                          }
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(tourism.id, tourism.name)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredTourism.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada objek wisata yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TourismList;
