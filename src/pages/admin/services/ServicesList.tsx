import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Example services data
interface Service {
  id: string;
  name: string;
  category: string;
  estimatedTime: string;
  status: "available" | "maintenance";
  requirements: string[];
  views: number;
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
  },
  {
    id: "5",
    name: "Pendaftaran Bantuan Sosial",
    category: "Sosial",
    estimatedTime: "7-10 hari",
    status: "maintenance",
    requirements: ["Fotokopi KTP", "Fotokopi KK", "SKTM", "Foto rumah"],
    views: 289,
  },
];

const AdminServices = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>(mockServicesData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
      cell: ({ row }) => (
        <Badge
          className={
            row.original.status === "available"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
          }
        >
          {row.original.status === "available" ? "Tersedia" : "Maintenance"}
        </Badge>
      ),
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
      cell: ({ row }) => (
        <div className="text-right">{row.original.views.toLocaleString()}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                navigate(
                  `/layanan/${row.original.category.toLowerCase()}/${
                    row.original.id
                  }/detail`
                )
              }
            >
              <Eye className="h-4 w-4 mr-2" />
              <span>Lihat</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/admin/layanan/edit/${row.original.id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => handleDelete(row.original.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <span>Hapus</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

      <DataTable
        columns={columns}
        data={services}
        searchPlaceholder="Cari layanan..."
      />

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
