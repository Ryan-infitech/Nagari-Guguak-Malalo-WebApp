import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Eye, Download } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAnnouncementData } from "../announcement/AnnouncementList";
import { mockRegulationData } from "../regulation/RegulationList";

// Content type tab options
type ContentType = "news" | "announcements" | "regulations" | "reports";

// Example news data
interface News {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  status: "published" | "draft";
  author: string;
  views: number;
}

// Example reports data
interface Report {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  status: "published" | "draft" | "archived";
  fileType: string;
  fileSize: string;
  downloads: number;
}

// Mock reports data
const mockReportsData: Report[] = [
  {
    id: "1",
    title: "Laporan Keuangan Nagari Tahun 2023",
    category: "Keuangan",
    publishDate: "15/03/2024",
    status: "published",
    fileType: "PDF",
    fileSize: "2.4 MB",
    downloads: 67,
  },
  {
    id: "2",
    title: "Laporan Kegiatan Pembangunan Triwulan I 2024",
    category: "Pembangunan",
    publishDate: "10/04/2024",
    status: "published",
    fileType: "PDF",
    fileSize: "3.8 MB",
    downloads: 42,
  },
  {
    id: "3",
    title: "Laporan Realisasi APBDes 2023",
    category: "Keuangan",
    publishDate: "05/02/2024",
    status: "published",
    fileType: "PDF",
    fileSize: "1.7 MB",
    downloads: 89,
  },
  {
    id: "4",
    title: "Laporan Kependudukan Semester II 2023",
    category: "Kependudukan",
    publishDate: "20/01/2024",
    status: "published",
    fileType: "PDF",
    fileSize: "1.2 MB",
    downloads: 53,
  },
  {
    id: "5",
    title: "Laporan Kemajuan Program Strategis 2024",
    category: "Program",
    publishDate: "15/05/2024",
    status: "draft",
    fileType: "DOCX",
    fileSize: "1.5 MB",
    downloads: 0,
  },
];

export const mockNewsData: News[] = [
  {
    id: "1",
    title: "Pawai obor dan tolak bala bersama warga nagari Guguak malalo",
    category: "Event",
    publishDate: "01/07/2025",
    status: "published",
    author: "Admin Nagari",
    views: 1245,
  },
  {
    id: "2",
    title: "Wali Nagari Guguak Malalo Cup II Resmi Digelar",
    category: "Sport",
    publishDate: "28/06/2025",
    status: "published",
    author: "Tim Digital",
    views: 856,
  },
  {
    id: "3",
    title: "Pembangunan Jalan Guguak Sarai–Sikala Diresmikan",
    category: "Pembangunan",
    publishDate: "28/06/2025",
    status: "published",
    author: "Admin Nagari",
    views: 634,
  },
  {
    id: "4",
    title: "KKN UNP dan pemuda jorong baing melakukan pemijahan ikan bilih",
    category: "Infrastruktur",
    publishDate: "02/07/2025",
    status: "draft",
    author: "Admin nagari",
    views: 0,
  },
  {
    id: "5",
    title: "Program pemberdayaan masyarakat nagari Guguak Malalo",
    category: "Sosial",
    publishDate: "05/07/2025",
    status: "draft",
    author: "Admin nagari",
    views: 0,
  },
];

const AdminContentManager = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ContentType>("news");
  const [news, setNews] = useState<News[]>(mockNewsData);
  const [announcements, setAnnouncements] = useState(mockAnnouncementData);
  const [regulations, setRegulations] = useState(mockRegulationData);
  const [reports, setReports] = useState<Report[]>(mockReportsData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      // Handle delete based on active tab
      switch (activeTab) {
        case "news":
          setNews(news.filter((item) => item.id !== deleteId));
          toast({
            title: "Berita dihapus",
            description: "Berita berhasil dihapus dari sistem",
          });
          break;
        case "announcements":
          setAnnouncements(
            announcements.filter((item) => item.id !== deleteId)
          );
          toast({
            title: "Pengumuman dihapus",
            description: "Pengumuman berhasil dihapus dari sistem",
          });
          break;
        case "regulations":
          setRegulations(regulations.filter((item) => item.id !== deleteId));
          toast({
            title: "Peraturan dihapus",
            description: "Peraturan berhasil dihapus dari sistem",
          });
          break;
        case "reports":
          setReports(reports.filter((item) => item.id !== deleteId));
          toast({
            title: "Laporan dihapus",
            description: "Laporan berhasil dihapus dari sistem",
          });
          break;
      }
      setIsDeleteDialogOpen(false);
    }
  };

  // Get add button label based on active tab
  const getAddButtonLabel = () => {
    switch (activeTab) {
      case "news":
        return "Tambah Berita";
      case "announcements":
        return "Tambah Pengumuman";
      case "regulations":
        return "Tambah Peraturan";
      case "reports":
        return "Tambah Laporan";
      default:
        return "Tambah";
    }
  };

  // Handle navigation to add content form
  const handleAddContent = () => {
    switch (activeTab) {
      case "news":
        navigate("/admin/berita/tambah");
        break;
      case "announcements":
        navigate("/admin/pengumuman/tambah");
        break;
      case "regulations":
        navigate("/admin/peraturan/tambah");
        break;
      case "reports":
        navigate("/admin/laporan/tambah");
        break;
    }
  };

  // Define columns for news data table
  const newsColumns: ColumnDef<News>[] = [
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
      header: "Tanggal",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.status === "published"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
          }
        >
          {row.original.status === "published" ? "Dipublikasi" : "Draft"}
        </Badge>
      ),
    },
    {
      accessorKey: "author",
      header: "Penulis",
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
              onClick={() => navigate(`/informasi/berita/${row.original.id}`)}
            >
              <Eye className="h-4 w-4 mr-2" />
              <span>Lihat</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/admin/berita/edit/${row.original.id}`)}
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

  // Define columns for the announcements data table
  const announcementColumns: ColumnDef<(typeof mockAnnouncementData)[0]>[] = [
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

  // Define columns for the regulations data table
  const regulationColumns: ColumnDef<(typeof mockRegulationData)[0]>[] = [
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
        const typeLabels = {
          perda: "Peraturan Daerah",
          perwako: "Peraturan Walikota",
          sk: "Surat Keputusan",
          peraturan_nagari: "Peraturan Nagari",
          other: "Lainnya",
        };

        const type = row.original.type as keyof typeof typeLabels;
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-800 border-blue-200"
          >
            {typeLabels[type]}
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
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              <span>Unduh</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Define columns for the reports data table
  const reportColumns: ColumnDef<Report>[] = [
    {
      accessorKey: "title",
      header: "Judul Laporan",
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
      header: "Tanggal Publikasi",
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
      accessorKey: "fileType",
      header: "Format",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-800 border-blue-200"
        >
          {row.original.fileType}
        </Badge>
      ),
    },
    {
      accessorKey: "fileSize",
      header: "Ukuran",
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
              onClick={() => navigate(`/informasi/laporan/${row.original.id}`)}
            >
              <Eye className="h-4 w-4 mr-2" />
              <span>Lihat</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/admin/laporan/edit/${row.original.id}`)}
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
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              <span>Unduh</span>
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
            Manajemen Konten Informasi
          </h1>
          <AdminBreadcrumbs
            items={[{ label: "Informasi & Publikasi" }]}
            className="mt-1"
          />
        </div>
        <Button onClick={handleAddContent}>
          <PlusCircle className="h-4 w-4 mr-2" />
          {getAddButtonLabel()}
        </Button>
      </div>

      <Tabs
        defaultValue="news"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ContentType)}
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="news">Berita</TabsTrigger>
          <TabsTrigger value="announcements">Pengumuman</TabsTrigger>
          <TabsTrigger value="regulations">Peraturan</TabsTrigger>
          <TabsTrigger value="reports">Laporan</TabsTrigger>
        </TabsList>

        <TabsContent value="news">
          <DataTable
            columns={newsColumns}
            data={news}
            searchPlaceholder="Cari berita..."
          />
        </TabsContent>

        <TabsContent value="announcements">
          <DataTable
            columns={announcementColumns}
            data={announcements}
            searchPlaceholder="Cari pengumuman..."
          />
        </TabsContent>

        <TabsContent value="regulations">
          <DataTable
            columns={regulationColumns}
            data={regulations}
            searchPlaceholder="Cari peraturan..."
          />
        </TabsContent>

        <TabsContent value="reports">
          <DataTable
            columns={reportColumns}
            data={reports}
            searchPlaceholder="Cari laporan..."
          />
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title={`Hapus ${
          activeTab === "news"
            ? "Berita"
            : activeTab === "announcements"
            ? "Pengumuman"
            : activeTab === "regulations"
            ? "Peraturan"
            : "Laporan"
        }`}
        description={`Apakah Anda yakin ingin menghapus ${
          activeTab === "news"
            ? "berita"
            : activeTab === "announcements"
            ? "pengumuman"
            : activeTab === "regulations"
            ? "peraturan"
            : "laporan"
        } ini? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
};

export default AdminContentManager;
