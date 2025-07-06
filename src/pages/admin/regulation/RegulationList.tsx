import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  FileText,
  Download,
} from "lucide-react";
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

// Example regulation data
export interface Regulation {
  id: string;
  title: string;
  number: string;
  category: string;
  publishDate: string;
  status: "published" | "draft" | "archived";
  type: "perda" | "perwako" | "sk" | "peraturan_nagari" | "other";
  documentUrl?: string;
  downloads: number;
}

export const mockRegulationData: Regulation[] = [
  {
    id: "1",
    title: "Peraturan Nagari tentang Pengelolaan Dana Desa Tahun 2024",
    number: "01/PN/2024",
    category: "Keuangan",
    publishDate: "15/01/2024",
    status: "published",
    type: "peraturan_nagari",
    documentUrl: "/docs/peraturan-01-2024.pdf",
    downloads: 45,
  },
  {
    id: "2",
    title: "Peraturan Nagari tentang Pengelolaan Sampah dan Lingkungan",
    number: "02/PN/2024",
    category: "Lingkungan",
    publishDate: "28/02/2024",
    status: "published",
    type: "peraturan_nagari",
    documentUrl: "/docs/peraturan-02-2024.pdf",
    downloads: 32,
  },
  {
    id: "3",
    title: "SK Wali Nagari tentang Pengangkatan Staf Administrasi",
    number: "05/SK-WN/2024",
    category: "Kepegawaian",
    publishDate: "10/03/2024",
    status: "published",
    type: "sk",
    documentUrl: "/docs/sk-05-2024.pdf",
    downloads: 18,
  },
  {
    id: "4",
    title: "Peraturan Nagari tentang Pembentukan BUMNag",
    number: "03/PN/2024",
    category: "Ekonomi",
    publishDate: "05/04/2024",
    status: "draft",
    type: "peraturan_nagari",
    documentUrl: "",
    downloads: 0,
  },
  {
    id: "5",
    title: "Peraturan Daerah tentang Perlindungan Kawasan Adat",
    number: "12/PERDA/2023",
    category: "Adat",
    publishDate: "22/11/2023",
    status: "archived",
    type: "perda",
    documentUrl: "/docs/perda-12-2023.pdf",
    downloads: 76,
  },
];

const RegulationTypeLabel = {
  perda: "Peraturan Daerah",
  perwako: "Peraturan Walikota",
  sk: "Surat Keputusan",
  peraturan_nagari: "Peraturan Nagari",
  other: "Lainnya",
};

const AdminRegulations = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [regulations, setRegulations] =
    useState<Regulation[]>(mockRegulationData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setRegulations(regulations.filter((item) => item.id !== deleteId));
      toast({
        title: "Peraturan dihapus",
        description: "Peraturan berhasil dihapus dari sistem",
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const handleDownload = (regulation: Regulation) => {
    if (!regulation.documentUrl) {
      toast({
        title: "Dokumen tidak tersedia",
        description: "Dokumen belum diunggah atau sedang diproses",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would trigger a download and possibly track download count
    window.open(regulation.documentUrl, "_blank");
    toast({
      title: "Mengunduh dokumen",
      description: "Dokumen sedang diunduh",
    });
  };

  // Define columns for the data table
  const columns: ColumnDef<Regulation>[] = [
    {
      accessorKey: "title",
      header: "Judul",
      cell: ({ row }) => (
        <div className="max-w-[400px]">
          <div className="font-medium truncate">{row.original.title}</div>
          <div className="text-xs text-gray-500">
            Nomor: {row.original.number}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Jenis",
      cell: ({ row }) => {
        const type = row.original.type as keyof typeof RegulationTypeLabel;
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-800 border-blue-200"
          >
            {RegulationTypeLabel[type]}
          </Badge>
        );
      },
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        let badgeClass = "";
        let statusLabel = "";

        switch (row.original.status) {
          case "published":
            badgeClass = "bg-green-100 text-green-800 hover:bg-green-100";
            statusLabel = "Dipublikasi";
            break;
          case "draft":
            badgeClass = "bg-amber-100 text-amber-800 hover:bg-amber-100";
            statusLabel = "Draft";
            break;
          case "archived":
            badgeClass = "bg-gray-100 text-gray-800 hover:bg-gray-100";
            statusLabel = "Diarsipkan";
            break;
        }

        return <Badge className={badgeClass}>{statusLabel}</Badge>;
      },
    },
    {
      accessorKey: "downloads",
      header: "Diunduh",
      cell: ({ row }) => (
        <div className="text-right">{row.original.downloads}x</div>
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
                navigate(`/informasi/peraturan/${row.original.id}`)
              }
            >
              <Eye className="h-4 w-4 mr-2" />
              <span>Lihat</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownload(row.original)}>
              <Download className="h-4 w-4 mr-2" />
              <span>Unduh</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/admin/peraturan/edit/${row.original.id}`)
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
          <h1 className="text-2xl font-bold tracking-tight">Peraturan</h1>
          <AdminBreadcrumbs items={[{ label: "Peraturan" }]} className="mt-1" />
        </div>
        <Button onClick={() => navigate("/admin/peraturan/tambah")}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Peraturan
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={regulations}
        searchPlaceholder="Cari peraturan..."
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Peraturan"
        description="Apakah Anda yakin ingin menghapus peraturan ini? Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
};

export default AdminRegulations;
