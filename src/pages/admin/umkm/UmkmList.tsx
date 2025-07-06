import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Eye, Book, Store } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

// Example UMKM data
interface UMKM {
  id: string;
  name: string;
  owner: string;
  category: string;
  location: string;
  status: "verified" | "pending" | "rejected";
  products: string[];
  phone: string;
}

export const mockUMKMData: UMKM[] = [
  {
    id: "1",
    name: "Warung Makan Bu Siti",
    owner: "Siti Rahayu",
    category: "Makanan",
    location: "Jorong Baing",
    status: "verified",
    products: ["Nasi Kapau", "Sate Padang", "Ayam Bakar"],
    phone: "082187654321",
  },
  {
    id: "2",
    name: "Kerajinan Songket Guguak",
    owner: "Hendra Wijaya",
    category: "Kerajinan",
    location: "Jorong Guguak Malalo",
    status: "verified",
    products: ["Songket", "Tenunan Tradisional", "Sulaman"],
    phone: "082156781234",
  },
  {
    id: "3",
    name: "Pangek Ikan Malalo",
    owner: "Dewi Sutisna",
    category: "Makanan",
    location: "Jorong Malalo",
    status: "verified",
    products: ["Ikan Bilih Goreng", "Pangek Ikan", "Palai Bada"],
    phone: "082187651234",
  },
  {
    id: "4",
    name: "Toko Oleh-Oleh Danau Singkarak",
    owner: "Ahmad Fauzi",
    category: "Oleh-oleh",
    location: "Jorong Guguak Sarai",
    status: "pending",
    products: ["Kerupuk Ikan Bilih", "Samba Lado", "Kopi Nagari"],
    phone: "082178561234",
  },
  {
    id: "5",
    name: "Panen Raya Farm",
    owner: "Agus Suryana",
    category: "Pertanian",
    location: "Jorong Guguak Malalo",
    status: "verified",
    products: ["Sayur Organik", "Buah Lokal", "Beras Merah"],
    phone: "082165784321",
  },
];

const AdminUMKM = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [umkms, setUmkms] = useState<UMKM[]>(mockUMKMData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      // In a real app, make API call to delete
      setUmkms(umkms.filter((item) => item.id !== deleteId));
      toast({
        title: "UMKM dihapus",
        description: "Data UMKM berhasil dihapus dari sistem",
      });
      setIsDeleteDialogOpen(false);
    }
  };

  // Define columns for the data table
  const columns: ColumnDef<UMKM>[] = [
    {
      accessorKey: "name",
      header: "Nama UMKM",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" alt={row.original.name} />
            <AvatarFallback className="bg-amber-100 text-amber-800">
              {row.original.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="max-w-[300px]">
            <div className="font-medium truncate">{row.original.name}</div>
            <div className="text-xs text-gray-500">
              Pemilik: {row.original.owner}
            </div>
          </div>
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
      accessorKey: "location",
      header: "Lokasi",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        let badgeClass = "";
        let statusText = "";

        switch (row.original.status) {
          case "verified":
            badgeClass = "bg-green-100 text-green-800 hover:bg-green-100";
            statusText = "Terverifikasi";
            break;
          case "pending":
            badgeClass = "bg-amber-100 text-amber-800 hover:bg-amber-100";
            statusText = "Menunggu";
            break;
          case "rejected":
            badgeClass = "bg-red-100 text-red-800 hover:bg-red-100";
            statusText = "Ditolak";
            break;
          default:
            badgeClass = "bg-gray-100";
            statusText = row.original.status;
        }

        return <Badge className={badgeClass}>{statusText}</Badge>;
      },
    },
    {
      accessorKey: "products",
      header: "Produk",
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">
          {row.original.products.slice(0, 2).join(", ")}
          {row.original.products.length > 2 && "..."}
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Kontak",
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
              onClick={() => navigate(`/umkm/${row.original.id}`)}
            >
              <Eye className="h-4 w-4 mr-2" />
              <span>Lihat</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/admin/umkm/edit/${row.original.id}`)}
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
          <h1 className="text-2xl font-bold tracking-tight">Manajemen UMKM</h1>
          <AdminBreadcrumbs items={[{ label: "UMKM" }]} className="mt-1" />
        </div>
        <Button onClick={() => navigate("/admin/umkm/tambah")}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah UMKM
        </Button>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-orange-50 border-orange-200">
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

        <Card
          className="bg-indigo-50 border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-colors"
          onClick={() => navigate("/admin/umkm/program")}
        >
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

      <DataTable
        columns={columns}
        data={umkms}
        searchPlaceholder="Cari UMKM..."
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus UMKM"
        description="Apakah Anda yakin ingin menghapus data UMKM ini? Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
};

export default AdminUMKM;
