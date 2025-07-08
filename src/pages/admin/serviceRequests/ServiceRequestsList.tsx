import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import {
  Check,
  X,
  Eye,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  RefreshCw,
  Filter,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Types for service requests
interface ServiceRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  userId: string;
  userName: string;
  nik: string;
  status: "pending" | "processing" | "completed" | "rejected";
  submissionDate: string;
  lastUpdated: string;
  priority: "normal" | "high" | "urgent";
  category: string;
  attachments: number;
  assignedTo?: string;
  notes?: string;
  contactPhone: string;
}

// Mock data for service requests
const mockServiceRequests: ServiceRequest[] = [
  {
    id: "SR0123",
    serviceId: "1",
    serviceName: "Surat Keterangan Domisili",
    userId: "U001",
    userName: "Ahmad Fauzi",
    nik: "1306142505850002",
    status: "pending",
    submissionDate: "2024-07-01 09:45",
    lastUpdated: "2024-07-01 09:45",
    priority: "normal",
    category: "Kependudukan",
    attachments: 2,
    contactPhone: "081234567890",
  },
  {
    id: "SR0124",
    serviceId: "2",
    serviceName: "Surat Keterangan Tidak Mampu (SKTM)",
    userId: "U002",
    userName: "Sri Wahyuni",
    nik: "1306145609790003",
    status: "processing",
    submissionDate: "2024-06-30 14:20",
    lastUpdated: "2024-07-01 10:15",
    priority: "high",
    category: "Kependudukan",
    attachments: 3,
    assignedTo: "Edo Adiyat Putra",
    notes: "Menunggu verifikasi data dari RT setempat",
    contactPhone: "085678901234",
  },
  {
    id: "SR0125",
    serviceId: "3",
    serviceName: "Surat Keterangan Usaha",
    userId: "U003",
    userName: "Budi Santoso",
    nik: "1306142002870001",
    status: "completed",
    submissionDate: "2024-06-29 11:30",
    lastUpdated: "2024-06-30 15:45",
    priority: "normal",
    category: "Ekonomi",
    attachments: 4,
    assignedTo: "Junaida A",
    notes: "Dokumen sudah lengkap dan disetujui",
    contactPhone: "089012345678",
  },
  {
    id: "SR0126",
    serviceId: "4",
    serviceName: "Laporan Kerusakan Infrastruktur",
    userId: "U004",
    userName: "Rahman Hakim",
    nik: "1306141410820005",
    status: "rejected",
    submissionDate: "2024-06-28 08:15",
    lastUpdated: "2024-06-29 09:30",
    priority: "urgent",
    category: "Pembangunan",
    attachments: 5,
    assignedTo: "Admin Nagari",
    notes: "Lokasi tidak termasuk wilayah administrasi Nagari Guguak Malalo",
    contactPhone: "082345678901",
  },
  {
    id: "SR0127",
    serviceId: "5",
    serviceName: "Pendaftaran Bantuan Sosial",
    userId: "U005",
    userName: "Siti Aminah",
    nik: "1306144507900004",
    status: "pending",
    submissionDate: "2024-07-02 10:05",
    lastUpdated: "2024-07-02 10:05",
    priority: "high",
    category: "Sosial",
    attachments: 6,
    contactPhone: "087654321098",
  },
];

// Utility function to get badge class based on status
const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          Menunggu
        </Badge>
      );
    case "processing":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          Diproses
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          Selesai
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          Ditolak
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// Utility function to get priority badge
const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "urgent":
      return <Badge className="bg-red-100 text-red-800">Mendesak</Badge>;
    case "high":
      return <Badge className="bg-amber-100 text-amber-800">Tinggi</Badge>;
    case "normal":
      return <Badge className="bg-blue-100 text-blue-800">Normal</Badge>;
    default:
      return <Badge>{priority}</Badge>;
  }
};

const ServiceRequestsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [requests, setRequests] =
    useState<ServiceRequest[]>(mockServiceRequests);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(
    null
  );

  // Dialogs state
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);

  // Form state
  const [processingNote, setProcessingNote] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [completionNote, setCompletionNote] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Filter requests based on active tab and category filter
  const filteredRequests = requests.filter((request) => {
    // Filter by tab (status)
    if (activeTab !== "all" && request.status !== activeTab) return false;

    // Filter by category
    if (categoryFilter !== "all" && request.category !== categoryFilter)
      return false;

    return true;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(requests.map((req) => req.category)));

  // Handle approve action
  const handleApprove = () => {
    if (selectedRequest) {
      const updatedRequests = requests.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: "processing",
              lastUpdated: new Date()
                .toISOString()
                .slice(0, 16)
                .replace("T", " "),
              assignedTo: assignedTo || "Admin Nagari",
              notes: processingNote,
            }
          : req
      );
      setRequests(updatedRequests);
      setApproveDialogOpen(false);
      setProcessingNote("");
      setAssignedTo("");

      toast({
        title: "Permohonan disetujui",
        description: `Permohonan ${selectedRequest.serviceName} dari ${selectedRequest.userName} telah disetujui dan sedang diproses.`,
      });
    }
  };

  // Handle reject action
  const handleReject = () => {
    if (selectedRequest) {
      const updatedRequests = requests.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: "rejected",
              lastUpdated: new Date()
                .toISOString()
                .slice(0, 16)
                .replace("T", " "),
              notes: rejectionReason,
            }
          : req
      );
      setRequests(updatedRequests);
      setRejectDialogOpen(false);
      setRejectionReason("");

      toast({
        title: "Permohonan ditolak",
        description: `Permohonan ${selectedRequest.serviceName} dari ${selectedRequest.userName} telah ditolak.`,
      });
    }
  };

  // Handle complete action
  const handleComplete = () => {
    if (selectedRequest) {
      const updatedRequests = requests.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: "completed",
              lastUpdated: new Date()
                .toISOString()
                .slice(0, 16)
                .replace("T", " "),
              notes: completionNote,
            }
          : req
      );
      setRequests(updatedRequests);
      setCompleteDialogOpen(false);
      setCompletionNote("");

      toast({
        title: "Permohonan selesai diproses",
        description: `Permohonan ${selectedRequest.serviceName} dari ${selectedRequest.userName} telah selesai diproses.`,
      });
    }
  };

  // Define columns for the data table
  const columns: ColumnDef<ServiceRequest>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
    },
    {
      accessorKey: "serviceName",
      header: "Layanan",
      cell: ({ row }) => (
        <div className="max-w-[250px]">
          <div className="font-medium truncate">{row.original.serviceName}</div>
          <div className="text-xs text-gray-500">{row.original.category}</div>
        </div>
      ),
    },
    {
      accessorKey: "userName",
      header: "Pemohon",
      cell: ({ row }) => (
        <div>
          <div>{row.original.userName}</div>
          <div className="text-xs text-gray-500">NIK: {row.original.nik}</div>
        </div>
      ),
    },
    {
      accessorKey: "submissionDate",
      header: "Tanggal Pengajuan",
      cell: ({ row }) => <div>{row.original.submissionDate}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      accessorKey: "priority",
      header: "Prioritas",
      cell: ({ row }) => getPriorityBadge(row.original.priority),
    },
    {
      accessorKey: "assignedTo",
      header: "Ditangani Oleh",
      cell: ({ row }) => <div>{row.original.assignedTo || "-"}</div>,
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
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setSelectedRequest(row.original);
                setViewDialogOpen(true);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              Lihat Detail
            </DropdownMenuItem>

            {row.original.status === "pending" && (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedRequest(row.original);
                    setApproveDialogOpen(true);
                  }}
                >
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-green-600">Proses</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    setSelectedRequest(row.original);
                    setRejectDialogOpen(true);
                  }}
                >
                  <X className="h-4 w-4 mr-2 text-red-600" />
                  <span className="text-red-600">Tolak</span>
                </DropdownMenuItem>
              </>
            )}

            {row.original.status === "processing" && (
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRequest(row.original);
                  setCompleteDialogOpen(true);
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span className="text-green-600">Selesaikan</span>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() =>
                navigate(`/admin/pengajuan/${row.original.id}/history`)
              }
            >
              <Clock className="h-4 w-4 mr-2" />
              Riwayat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Get count by status for the dashboard cards
  const pendingCount = requests.filter(
    (req) => req.status === "pending"
  ).length;
  const processingCount = requests.filter(
    (req) => req.status === "processing"
  ).length;
  const completedCount = requests.filter(
    (req) => req.status === "completed"
  ).length;
  const rejectedCount = requests.filter(
    (req) => req.status === "rejected"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Manajemen Pengajuan Layanan
        </h1>
        <AdminBreadcrumbs
          items={[{ label: "Manajemen Pengajuan" }]}
          className="mt-1"
        />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Menunggu</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Diproses</p>
              <p className="text-2xl font-bold">{processingCount}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <RefreshCw className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Selesai</p>
              <p className="text-2xl font-bold">{completedCount}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Ditolak</p>
              <p className="text-2xl font-bold">{rejectedCount}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Daftar Pengajuan Layanan</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md overflow-hidden">
              <div className="flex items-center bg-gray-100 px-3 py-2">
                <Filter className="h-4 w-4 text-gray-500" />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="border-0 rounded-none min-w-[150px]">
                  <SelectValue placeholder="Filter Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRequests(mockServiceRequests)}
            >
              <RefreshCw className="h-3.5 w-3.5 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4 grid w-full grid-cols-5">
              <TabsTrigger value="all" className="flex gap-2">
                <FileText className="h-4 w-4" />
                <span>Semua</span>
                <Badge variant="secondary">{requests.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex gap-2">
                <Clock className="h-4 w-4" />
                <span>Menunggu</span>
                <Badge variant="secondary">{pendingCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="processing" className="flex gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Diproses</span>
                <Badge variant="secondary">{processingCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Selesai</span>
                <Badge variant="secondary">{completedCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex gap-2">
                <XCircle className="h-4 w-4" />
                <span>Ditolak</span>
                <Badge variant="secondary">{rejectedCount}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <DataTable
                columns={columns}
                data={filteredRequests}
                searchPlaceholder="Cari pengajuan..."
              />
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <DataTable
                columns={columns}
                data={filteredRequests}
                searchPlaceholder="Cari pengajuan menunggu..."
              />
            </TabsContent>

            <TabsContent value="processing" className="space-y-4">
              <DataTable
                columns={columns}
                data={filteredRequests}
                searchPlaceholder="Cari pengajuan diproses..."
              />
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <DataTable
                columns={columns}
                data={filteredRequests}
                searchPlaceholder="Cari pengajuan selesai..."
              />
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              <DataTable
                columns={columns}
                data={filteredRequests}
                searchPlaceholder="Cari pengajuan ditolak..."
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Request Dialog */}
      {selectedRequest && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Detail Pengajuan Layanan</DialogTitle>
              <DialogDescription>
                ID: {selectedRequest.id} • Diajukan pada:{" "}
                {selectedRequest.submissionDate}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-4">
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {selectedRequest.serviceName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedRequest.category}
                      </p>
                    </div>
                    {getStatusBadge(selectedRequest.status)}
                  </div>

                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Catatan:</h4>
                    <p className="text-sm border rounded-md p-3 bg-gray-50">
                      {selectedRequest.notes ||
                        "Tidak ada catatan untuk pengajuan ini."}
                    </p>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">
                      Dokumen Lampiran:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Array(selectedRequest.attachments)
                        .fill(null)
                        .map((_, i) => (
                          <div
                            key={i}
                            className="flex items-center border rounded-md px-3 py-1 text-sm bg-gray-50"
                          >
                            <FileText className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Dokumen {i + 1}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-semibold mb-2">Riwayat Pengajuan</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1 h-full w-px bg-gray-200 my-1"></div>
                      </div>
                      <div>
                        <p className="font-medium">Pengajuan dibuat</p>
                        <p className="text-sm text-gray-500">
                          {selectedRequest.submissionDate}
                        </p>
                        <p className="text-sm">
                          Pengajuan berhasil dibuat dan menunggu verifikasi
                          admin
                        </p>
                      </div>
                    </div>

                    {selectedRequest.status !== "pending" && (
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-blue-600" />
                          </div>
                          {selectedRequest.status !== "rejected" && (
                            <div className="flex-1 h-full w-px bg-gray-200 my-1"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">Pengajuan diproses</p>
                          <p className="text-sm text-gray-500">
                            {selectedRequest.lastUpdated}
                          </p>
                          <p className="text-sm">
                            {selectedRequest.assignedTo
                              ? `Ditangani oleh ${selectedRequest.assignedTo}`
                              : "Pengajuan sedang diproses oleh admin"}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedRequest.status === "completed" && (
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Pengajuan selesai</p>
                          <p className="text-sm text-gray-500">
                            {selectedRequest.lastUpdated}
                          </p>
                          <p className="text-sm">
                            Dokumen telah selesai dan siap diambil
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedRequest.status === "rejected" && (
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                            <XCircle className="h-4 w-4 text-red-600" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Pengajuan ditolak</p>
                          <p className="text-sm text-gray-500">
                            {selectedRequest.lastUpdated}
                          </p>
                          <p className="text-sm">
                            Alasan:{" "}
                            {selectedRequest.notes ||
                              "Tidak memenuhi persyaratan"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-semibold mb-3">Informasi Pemohon</h3>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Nama Lengkap</p>
                      <p className="font-medium">{selectedRequest.userName}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">NIK</p>
                      <p className="font-medium">{selectedRequest.nik}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Kontak</p>
                      <p className="font-medium">
                        {selectedRequest.contactPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedRequest.status === "pending" && (
                  <div className="border rounded-md p-4 space-y-3">
                    <h3 className="font-semibold">Tindakan</h3>

                    <Button
                      className="w-full"
                      onClick={() => {
                        setApproveDialogOpen(true);
                        setViewDialogOpen(false);
                      }}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Proses Pengajuan
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        setRejectDialogOpen(true);
                        setViewDialogOpen(false);
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Tolak Pengajuan
                    </Button>
                  </div>
                )}

                {selectedRequest.status === "processing" && (
                  <div className="border rounded-md p-4 space-y-3">
                    <h3 className="font-semibold">Tindakan</h3>

                    <Button
                      className="w-full"
                      onClick={() => {
                        setCompleteDialogOpen(true);
                        setViewDialogOpen(false);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Selesaikan Pengajuan
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setViewDialogOpen(false)}
              >
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Approve Request Dialog */}
      {selectedRequest && (
        <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Proses Pengajuan</DialogTitle>
              <DialogDescription>
                Setujui dan proses pengajuan {selectedRequest.serviceName} dari{" "}
                {selectedRequest.userName}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Petugas yang Menangani
                </label>
                <Input
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Nama petugas"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Catatan Proses (Opsional)
                </label>
                <Textarea
                  value={processingNote}
                  onChange={(e) => setProcessingNote(e.target.value)}
                  placeholder="Tambahkan catatan tentang pengajuan ini..."
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Catatan ini akan terlihat oleh pemohon di halaman status
                  pengajuan.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setApproveDialogOpen(false)}
              >
                Batal
              </Button>
              <Button onClick={handleApprove}>Proses Pengajuan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Request Dialog */}
      {selectedRequest && (
        <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tolak Pengajuan</DialogTitle>
              <DialogDescription>
                Tolak pengajuan {selectedRequest.serviceName} dari{" "}
                {selectedRequest.userName}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Alasan Penolakan <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Jelaskan alasan penolakan..."
                  className="mt-1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Berikan alasan yang jelas agar pemohon dapat memahami
                  penolakan ini.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setRejectDialogOpen(false)}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
              >
                Tolak Pengajuan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Complete Request Dialog */}
      {selectedRequest && (
        <Dialog open={completeDialogOpen} onOpenChange={setCompleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Selesaikan Pengajuan</DialogTitle>
              <DialogDescription>
                Tandai pengajuan {selectedRequest.serviceName} dari{" "}
                {selectedRequest.userName} sebagai selesai.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Catatan Penyelesaian (Opsional)
                </label>
                <Textarea
                  value={completionNote}
                  onChange={(e) => setCompletionNote(e.target.value)}
                  placeholder="Tambahkan informasi penyelesaian..."
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Berikan informasi tambahan tentang penyelesaian layanan,
                  seperti waktu dan tempat pengambilan dokumen.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCompleteDialogOpen(false)}
              >
                Batal
              </Button>
              <Button onClick={handleComplete}>Selesaikan Pengajuan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ServiceRequestsList;
