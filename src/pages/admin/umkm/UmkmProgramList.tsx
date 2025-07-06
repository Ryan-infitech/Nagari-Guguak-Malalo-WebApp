import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import {
  Plus,
  Search,
  Calendar,
  Users,
  ArrowRight,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Book,
  Store,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for UMKM programs
const mockProgramsData = [
  {
    id: "1",
    name: "Program Pemberdayaan UMKM Digital",
    description:
      "Program pelatihan digitalisasi usaha mikro kecil menengah untuk meningkatkan daya saing produk lokal di era digital.",
    category: "Pelatihan Digital",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2024-07-30",
    participants: 45,
    maxParticipants: 50,
    image: "/mockimages/program1.jpg",
  },
  {
    id: "2",
    name: "Pelatihan Pengemasan Produk UMKM",
    description:
      "Pelatihan untuk meningkatkan nilai jual produk UMKM melalui desain kemasan yang menarik dan berkualitas.",
    category: "Desain & Kemasan",
    status: "upcoming",
    startDate: "2024-03-15",
    endDate: "2024-04-30",
    participants: 23,
    maxParticipants: 40,
    image: "/mockimages/program2.jpg",
  },
  {
    id: "3",
    name: "Pendampingan Sertifikasi Halal",
    description:
      "Program bantuan dan pendampingan untuk UMKM dalam mengurus sertifikasi halal untuk produk makanan dan minuman.",
    category: "Sertifikasi",
    status: "completed",
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    participants: 35,
    maxParticipants: 35,
    image: "/mockimages/program3.jpg",
  },
];

const UmkmProgramList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredPrograms = mockProgramsData.filter((item) => {
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
      case "upcoming":
        return (
          <Badge variant="default" className="bg-blue-500">
            Akan Datang
          </Badge>
        );
      case "completed":
        return <Badge variant="secondary">Selesai</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Dibatalkan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus program "${name}"?`)) {
      toast({
        title: "Program dihapus",
        description: `${name} berhasil dihapus`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Program Pemberdayaan UMKM
        </h1>
        <AdminBreadcrumbs
          items={[
            { label: "UMKM", href: "/admin/umkm" },
            { label: "Program Pemberdayaan" },
          ]}
          className="mt-1"
        />
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card
          className="bg-orange-50 border-orange-200 cursor-pointer hover:bg-orange-100 transition-colors"
          onClick={() => navigate("/admin/umkm")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-900">Daftar UMKM</h3>
                <p className="text-sm text-orange-700">
                  Kelola data UMKM dan produk
                </p>
              </div>
              <Store className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-indigo-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-indigo-900">
                  Program Pemberdayaan
                </h3>
                <p className="text-sm text-indigo-700">
                  Kelola program pelatihan dan pembinaan
                </p>
              </div>
              <Book className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle>Daftar Program Pemberdayaan</CardTitle>
            <Button onClick={() => navigate("/admin/umkm/program/tambah")}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Program
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
                  placeholder="Cari program pemberdayaan..."
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
                <option value="upcoming">Akan Datang</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
              <div className="flex border rounded-md overflow-hidden">
                <button
                  className={`px-3 py-2 ${
                    viewMode === "grid" ? "bg-gray-100" : "bg-white"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </button>
                <button
                  className={`px-3 py-2 ${
                    viewMode === "list" ? "bg-gray-100" : "bg-white"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Programs Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <Card
                  key={program.id}
                  className="overflow-hidden flex flex-col"
                >
                  <div
                    className="h-48 bg-gray-100 relative cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/umkm/program/${program.id}`)
                    }
                  >
                    {program.image && (
                      <img
                        src={program.image}
                        alt={program.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image doesn't load
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(program.status)}
                    </div>
                  </div>
                  <CardContent className="pt-4 flex-grow">
                    <h3
                      className="font-medium text-lg mb-2 hover:text-blue-600 cursor-pointer"
                      onClick={() =>
                        window.open(`/umkm/program/${program.id}`, "_blank")
                      }
                    >
                      {program.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                      {program.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(program.startDate).toLocaleDateString(
                            "id-ID"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>
                          {program.participants}/{program.maxParticipants}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <div className="border-t p-4 flex items-center justify-between">
                    <Badge variant="outline" className="font-normal">
                      {program.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 p-0"
                        onClick={() =>
                          window.open(`/umkm/program/${program.id}`, "_blank")
                        }
                      >
                        Detail
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(
                                `/umkm/program/${program.id}`,
                                "_blank"
                              )
                            }
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(`/admin/umkm/program/edit/${program.id}`)
                            }
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleDelete(program.id, program.name)
                            }
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrograms.map((program) => (
                <Card key={program.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div
                      className="h-36 md:w-64 bg-gray-100 relative cursor-pointer"
                      onClick={() =>
                        navigate(`/admin/umkm/program/${program.id}`)
                      }
                    >
                      {program.image && (
                        <img
                          src={program.image}
                          alt={program.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      <div className="absolute top-2 right-2">
                        {getStatusBadge(program.status)}
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3
                          className="font-medium text-lg hover:text-blue-600 cursor-pointer"
                          onClick={() =>
                            window.open(`/umkm/program/${program.id}`, "_blank")
                          }
                        >
                          {program.name}
                        </h3>
                        <Badge variant="outline" className="font-normal">
                          {program.category}
                        </Badge>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">
                        {program.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(program.startDate).toLocaleDateString(
                                "id-ID"
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {program.participants}/{program.maxParticipants}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              window.open(
                                `/umkm/program/${program.id}`,
                                "_blank"
                              )
                            }
                          >
                            Detail
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/umkm/program/edit/${program.id}`)
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                            onClick={() =>
                              handleDelete(program.id, program.name)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {filteredPrograms.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada program pemberdayaan yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UmkmProgramList;
