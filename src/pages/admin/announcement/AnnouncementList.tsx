import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Eye, BellRing } from "lucide-react";
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

// Example announcement data
export interface Announcement {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  expiryDate: string;
  status: "active" | "expired" | "draft";
  priority: "normal" | "high" | "urgent";
}

export const mockAnnouncementData: Announcement[] = [
  {
    id: "1",
    title: "Pengumuman Jadwal Vaksinasi COVID-19 Tahap 2",
    category: "Kesehatan",
    publishDate: "01/07/2024",
    expiryDate: "15/07/2024",
    status: "active",
    priority: "high",
  },
  {
    id: "2",
    title: "Penutupan Jalan Sementara untuk Perbaikan Jembatan",
    category: "Infrastruktur",
    publishDate: "28/06/2024",
    expiryDate: "10/08/2024",
    status: "active",
    priority: "normal",
  },
  {
    id: "3",
    title: "Jadwal Pemadaman Listrik Bergilir",
    category: "Layanan Publik",
    publishDate: "25/06/2024",
    expiryDate: "25/07/2024",
    status: "active",
    priority: "urgent",
  },
  {
    id: "4",
    title: "Pendaftaran Beasiswa Pendidikan Tahun 2024",
    category: "Pendidikan",
    publishDate: "20/06/2024",
    expiryDate: "20/07/2024",
    status: "active",
    priority: "high",
  },
  {
    id: "5",
    title: "Perubahan Jam Pelayanan Kantor Nagari",
    category: "Administrasi",
    publishDate: "15/05/2024",
    expiryDate: "15/06/2024",
    status: "expired",
    priority: "normal",
  },
];

const AdminAnnouncements = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(mockAnnouncementData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setAnnouncements(announcements.filter((item) => item.id !== deleteId));
      toast({
        title: "Pengumuman dihapus",
        description: "Pengumuman berhasil dihapus dari sistem",
      });
      setIsDeleteDialogOpen(false);
    }
  };

  // Define columns for the data table
  const columns: ColumnDef<Announcement>[] = [
    {
      accessorKey: "title",
      header: "Judul",
      cell: ({ row }) => (
        <div className="max-w-[400px]">
          <div className="font-medium truncate">{row.original.title}</div>
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
      accessorKey: "publishDate",
      header: "Tanggal Terbit",
    },
    {
      accessorKey: "expiryDate",
      header: "Tanggal Berakhir",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        let badgeClass = "";
        let statusLabel = "";

        switch (row.original.status) {
          case "active":
            badgeClass = "bg-green-100 text-green-800 hover:bg-green-100";
            statusLabel = "Aktif";
            break;
          case "expired":
            badgeClass = "bg-gray-100 text-gray-800 hover:bg-gray-100";
            statusLabel = "Kedaluwarsa";
            break;
          case "draft":
            badgeClass = "bg-amber-100 text-amber-800 hover:bg-amber-100";
            statusLabel = "Draft";
            break;
        }

        return <Badge className={badgeClass}>{statusLabel}</Badge>;
      },
    },
    {
      accessorKey: "priority",
      header: "Prioritas",
      cell: ({ row }) => {
        let badgeClass = "";
        let priorityLabel = "";

        switch (row.original.priority) {
          case "normal":
            badgeClass = "bg-blue-100 text-blue-800 hover:bg-blue-100";
            priorityLabel = "Normal";
            break;
          case "high":
            badgeClass = "bg-amber-100 text-amber-800 hover:bg-amber-100";
            priorityLabel = "Tinggi";
            break;
          case "urgent":
            badgeClass = "bg-red-100 text-red-800 hover:bg-red-100";
            priorityLabel = "Mendesak";
            break;
        }

        return <Badge className={badgeClass}>{priorityLabel}</Badge>;
      },
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
                navigate(`/informasi/pengumuman/${row.original.id}`)
              }
            >
              <Eye className="h-4 w-4 mr-2" />
              <span>Lihat</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/admin/pengumuman/edit/${row.original.id}`)
              }
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
          <h1 className="text-2xl font-bold tracking-tight">Pengumuman</h1>
          <AdminBreadcrumbs
            items={[{ label: "Pengumuman" }]}
            className="mt-1"
          />
        </div>
        <Button onClick={() => navigate("/admin/pengumuman/tambah")}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Pengumuman
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={announcements}
        searchPlaceholder="Cari pengumuman..."
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Pengumuman"
        description="Apakah Anda yakin ingin menghapus pengumuman ini? Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
};

export default AdminAnnouncements;
