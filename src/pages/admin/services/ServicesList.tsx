import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Eye, FileText, Filter } from "lucide-react";
import { DataTable } from "@/components/admin/shared/DataTable";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import { useToast } from "@/components/ui/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Example services data
interface Service {
  id: string;
  name: string;
  category: string;
  estimatedTime: string;
  status: "available" | "maintenance" | "draft";
  requirements: string[];
  views: number;
  lastUpdated: string;
}

export const mockServicesData: Service[] = [
  {
    id: "1",
    name: "Surat Keterangan Domisili",
    category: "Kependudukan",
    estimatedTime: "1-2 hari",
    status: "available",
    requirements: [
      "Fotokopi KTP",
      "Fotokopi Kartu Keluarga",
      "Surat Pengantar RT/RW",
    ],
    views: 543,
    lastUpdated: "2024-06-15",
  },
  {
    id: "2",
    name: "Surat Keterangan Tidak Mampu (SKTM)",
    category: "Kependudukan",
    estimatedTime: "2-3 hari",
    status: "available",
    requirements: [
      "Fotokopi KTP",
      "Fotokopi Kartu Keluarga",
      "Surat Pengantar RT/RW",
      "Bukti pendukung",
    ],
    views: 412,
    lastUpdated: "2024-06-12",
  },
  {
    id: "3",
    name: "Surat Keterangan Usaha",
    category: "Ekonomi",
    estimatedTime: "1-2 hari",
    status: "available",
    requirements: [
      "Fotokopi KTP",
      "Foto Lokasi Usaha",
      "Surat Pernyataan Memiliki Usaha",
    ],
    views: 387,
    lastUpdated: "2024-06-10",
  },
  {
    id: "4",
    name: "Laporan Kerusakan Infrastruktur",
    category: "Pembangunan",
    estimatedTime: "1-3 hari",
    status: "available",
    requirements: [
      "Foto kerusakan",
      "Lokasi detail",
      "Informasi kontak pelapor",
    ],
    views: 231,
    lastUpdated: "2024-06-08",
  },
  {
    id: "5",
    name: "Pendaftaran Bantuan Sosial",
    category: "Sosial",
    estimatedTime: "7-10 hari",
    status: "maintenance",
    requirements: ["Fotokopi KTP", "Fotokopi KK", "SKTM", "Foto rumah"],
    views: 289,
    lastUpdated: "2024-06-05",
  },
  {
    id: "6",
    name: "Pendaftaran UMKM",
    category: "Ekonomi",
    estimatedTime: "3-5 hari",
    status: "draft",
    requirements: [
      "Fotokopi KTP",
      "Foto usaha",
      "Deskripsi usaha",
      "NPWP (jika ada)",
    ],
    views: 0,
    lastUpdated: "2024-06-18",
  },
  {
    id: "7",
    name: "Konsultasi Hukum",
    category: "Posbakum",
    estimatedTime: "1-2 hari",
    status: "available",
    requirements: ["Fotokopi KTP", "Dokumen pendukung (jika ada)"],
    views: 176,
    lastUpdated: "2024-06-07",
  },
];

const AdminServices = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>(mockServicesData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      // In a real app, make API call to delete
      setServices(services.filter((item) => item.id !== deleteId));
      toast({
        title: "Layanan dihapus",
        description: "Layanan berhasil dihapus dari sistem",
      });
      setIsDeleteDialogOpen(false);
    }
  };

  // Filter services based on selected filters
  const filteredServices = services.filter((service) => {
    // Filter by tab (status groups)
    if (activeTab !== "all") {
      if (activeTab === "available" && service.status !== "available")
        return false;
      if (activeTab === "maintenance" && service.status !== "maintenance")
        return false;
      if (activeTab === "draft" && service.status !== "draft") return false;
    }

    // Additional filters
    if (filterStatus !== "all" && service.status !== filterStatus) return false;
    if (filterCategory !== "all" && service.category !== filterCategory)
      return false;

    return true;
  });

  // Define columns for the data table
  const columns: ColumnDef<Service>[] = [
    {
      accessorKey: "name",
      header: "Nama Layanan",
      cell: ({ row }) => (
        <div className="max-w-[300px]">
          <div className="font-medium truncate">{row.original.name}</div>
          <div className="text-xs text-gray-500">ID: {row.original.id}</div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Kategori",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-gray-100">
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "estimatedTime",
      header: "Estimasi",
      cell: ({ row }) => <div>{row.original.estimatedTime}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        let statusClass = "";
        let statusText = "";

        switch (row.original.status) {
          case "available":
            statusClass = "bg-green-100 text-green-800 hover:bg-green-100";
            statusText = "Tersedia";
            break;
          case "maintenance":
            statusClass = "bg-amber-100 text-amber-800 hover:bg-amber-100";
            statusText = "Maintenance";
            break;
          case "draft":
            statusClass = "bg-blue-100 text-blue-800 hover:bg-blue-100";
            statusText = "Draft";
            break;
        }

        return <Badge className={statusClass}>{statusText}</Badge>;
      },
    },
    {
      accessorKey: "requirements",
      header: "Persyaratan",
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">
          {row.original.requirements.slice(0, 2).join(", ")}
          {row.original.requirements.length > 2 && "..."}
        </div>
      ),
    },
    {
      accessorKey: "views",
      header: "Dilihat",
      cell: ({ row }) => <div>{row.original.views}</div>,
    },
    {
      accessorKey: "lastUpdated",
      header: "Terakhir Diperbarui",
      cell: ({ row }) => <div>{row.original.lastUpdated}</div>,
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigate(`/admin/layanan/${row.original.id}`)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Lihat Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/admin/layanan/edit/${row.original.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDelete(row.original.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Manajemen Layanan
          </h1>
          <AdminBreadcrumbs
            items={[{ label: "Manajemen Layanan" }]}
            className="mt-1"
          />
        </div>
        <Button onClick={() => navigate("/admin/layanan/tambah")}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Layanan
        </Button>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="available">Tersedia</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="Kependudukan">Kependudukan</SelectItem>
                  <SelectItem value="Ekonomi">Ekonomi</SelectItem>
                  <SelectItem value="Pembangunan">Pembangunan</SelectItem>
                  <SelectItem value="Sosial">Sosial</SelectItem>
                  <SelectItem value="Posbakum">Posbakum</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="available">Tersedia</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredServices}
            searchPlaceholder="Cari layanan..."
          />
        </TabsContent>

        <TabsContent value="available" className="mt-0">
          <DataTable
            columns={columns}
            data={filteredServices}
            searchPlaceholder="Cari layanan tersedia..."
          />
        </TabsContent>

        <TabsContent value="maintenance" className="mt-0">
          <DataTable
            columns={columns}
            data={filteredServices}
            searchPlaceholder="Cari layanan maintenance..."
          />
        </TabsContent>

        <TabsContent value="draft" className="mt-0">
          <DataTable
            columns={columns}
            data={filteredServices}
            searchPlaceholder="Cari layanan draft..."
          />
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Layanan"
        description="Apakah Anda yakin ingin menghapus layanan ini? Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
};

export default AdminServices;
