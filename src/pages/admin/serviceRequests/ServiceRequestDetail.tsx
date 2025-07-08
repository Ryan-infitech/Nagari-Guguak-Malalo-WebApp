import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Check,
  X,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  User,
  MessageSquare,
  Calendar,
  Phone,
  AlertTriangle,
  Mail,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Mock service request data (this would be replaced with an API call)
const fetchServiceRequest = async (id: string): Promise<any> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id,
    serviceId: "1",
    serviceName: "Surat Keterangan Domisili",
    userId: "U001",
    userName: "Ahmad Fauzi",
    nik: "1306142505850002",
    email: "ahmad.fauzi@example.com",
    contactPhone: "081234567890",
    address: "Jorong Guguak Malalo, Nagari Guguak Malalo",
    status: "processing",
    submissionDate: "2024-07-01 09:45",
    lastUpdated: "2024-07-02 14:30",
    priority: "normal",
    category: "Kependudukan",
    assignedTo: "Edo Adiyat Putra",
    notes: "Sedang dalam proses verifikasi data",
    description:
      "Pembuatan surat keterangan domisili untuk keperluan administrasi pekerjaan",
    attachments: [
      {
        id: "att1",
        name: "Fotokopi KTP.pdf",
        type: "application/pdf",
        size: "1.2 MB",
        uploadedAt: "2024-07-01 09:40",
      },
      {
        id: "att2",
        name: "Fotokopi Kartu Keluarga.pdf",
        type: "application/pdf",
        size: "2.3 MB",
        uploadedAt: "2024-07-01 09:42",
      },
      {
        id: "att3",
        name: "Surat Pengantar RT.jpg",
        type: "image/jpeg",
        size: "0.8 MB",
        uploadedAt: "2024-07-01 09:44",
      },
    ],
    timeline: [
      {
        id: "1",
        status: "submitted",
        date: "2024-07-01 09:45",
        description: "Pengajuan berhasil dibuat",
        user: "Ahmad Fauzi",
        notes: "",
      },
      {
        id: "2",
        status: "processing",
        date: "2024-07-02 14:30",
        description: "Pengajuan diproses",
        user: "Admin Nagari",
        notes: "Dokumen sedang diverifikasi",
      },
    ],
    comments: [
      {
        id: "1",
        user: "Admin Nagari",
        role: "admin",
        date: "2024-07-02 14:35",
        content:
          "Mohon tunggu, sedang dilakukan verifikasi data dengan Dukcapil",
      },
      {
        id: "2",
        user: "Ahmad Fauzi",
        role: "requester",
        date: "2024-07-02 15:10",
        content: "Baik pak, terima kasih informasinya",
      },
    ],
  };
};

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

const ServiceRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dialogs state
  const [approveDialogOpen, setApproveDialogOpen] = useState<boolean>(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState<boolean>(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState<boolean>(false);

  // Form state
  const [processingNote, setProcessingNote] = useState<string>("");
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [completionNote, setCompletionNote] = useState<string>("");
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    const getServiceRequest = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const data = await fetchServiceRequest(id);
        setRequest(data);
        setError(null);

        // Pre-fill the assignedTo field if present
        if (data.assignedTo) {
          setAssignedTo(data.assignedTo);
        }
      } catch (err) {
        setError("Gagal memuat data pengajuan layanan");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getServiceRequest();
  }, [id]);

  // Handle approve action
  const handleApprove = () => {
    if (!request) return;

    // In a real app, make API call
    const updatedRequest = {
      ...request,
      status: "processing",
      assignedTo: assignedTo || "Admin Nagari",
      lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " "),
      notes: processingNote || request.notes,
      timeline: [
        ...request.timeline,
        {
          id: (request.timeline.length + 1).toString(),
          status: "processing",
          date: new Date().toISOString().slice(0, 16).replace("T", " "),
          description: "Pengajuan diproses",
          user: "Admin Nagari",
          notes: processingNote || "",
        },
      ],
    };

    setRequest(updatedRequest);
    setApproveDialogOpen(false);
    setProcessingNote("");

    toast({
      title: "Permohonan disetujui",
      description: `Permohonan ${request.serviceName} dari ${request.userName} telah disetujui dan sedang diproses.`,
    });
  };

  // Handle reject action
  const handleReject = () => {
    if (!request) return;

    // In a real app, make API call
    const updatedRequest = {
      ...request,
      status: "rejected",
      lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " "),
      notes: rejectionReason,
      timeline: [
        ...request.timeline,
        {
          id: (request.timeline.length + 1).toString(),
          status: "rejected",
          date: new Date().toISOString().slice(0, 16).replace("T", " "),
          description: "Pengajuan ditolak",
          user: "Admin Nagari",
          notes: rejectionReason,
        },
      ],
    };

    setRequest(updatedRequest);
    setRejectDialogOpen(false);
    setRejectionReason("");

    toast({
      title: "Permohonan ditolak",
      description: `Permohonan ${request.serviceName} dari ${request.userName} telah ditolak.`,
    });
  };

  // Handle complete action
  const handleComplete = () => {
    if (!request) return;

    // In a real app, make API call
    const updatedRequest = {
      ...request,
      status: "completed",
      lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " "),
      notes: completionNote || request.notes,
      timeline: [
        ...request.timeline,
        {
          id: (request.timeline.length + 1).toString(),
          status: "completed",
          date: new Date().toISOString().slice(0, 16).replace("T", " "),
          description: "Pengajuan selesai",
          user: "Admin Nagari",
          notes: completionNote || "",
        },
      ],
    };

    setRequest(updatedRequest);
    setCompleteDialogOpen(false);
    setCompletionNote("");

    toast({
      title: "Permohonan selesai diproses",
      description: `Permohonan ${request.serviceName} dari ${request.userName} telah selesai diproses.`,
    });
  };

  // Handle adding comment
  const handleAddComment = () => {
    if (!request || !newComment.trim()) return;

    // In a real app, make API call
    const updatedRequest = {
      ...request,
      comments: [
        ...request.comments,
        {
          id: (request.comments.length + 1).toString(),
          user: "Admin Nagari",
          role: "admin",
          date: new Date().toISOString().slice(0, 16).replace("T", " "),
          content: newComment,
        },
      ],
    };

    setRequest(updatedRequest);
    setNewComment("");

    toast({
      title: "Komentar ditambahkan",
      description: "Komentar anda telah berhasil ditambahkan",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-gray-200 animate-spin"></div>
          <p className="mt-4 text-gray-600">Memuat data pengajuan...</p>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <h3 className="text-lg font-medium text-red-800">Terjadi kesalahan</h3>
        <p className="mt-2 text-red-700">
          {error || "Data pengajuan tidak ditemukan"}
        </p>
        <Button
          variant="outline"
          onClick={() => navigate("/admin/pengajuan")}
          className="mt-4"
        >
          Kembali ke Daftar Pengajuan
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Detail Pengajuan Layanan
          </h1>
          <AdminBreadcrumbs
            items={[
              { label: "Manajemen Pengajuan", href: "/admin/pengajuan" },
              { label: `Pengajuan #${request.id}` },
            ]}
            className="mt-1"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/pengajuan")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>

          {request.status === "pending" && (
            <>
              <Button
                onClick={() => setApproveDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Proses
              </Button>

              <Button
                variant="outline"
                onClick={() => setRejectDialogOpen(true)}
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
                Tolak
              </Button>
            </>
          )}

          {request.status === "processing" && (
            <Button
              onClick={() => setCompleteDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Selesaikan
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Request Information Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-center">
                <div>
                  <span>{request.serviceName}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    #{request.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(request.status)}
                  {getPriorityBadge(request.priority)}
                </div>
              </CardTitle>
              <CardDescription>
                <div className="text-gray-500">
                  Kategori: {request.category} • Diajukan:{" "}
                  {request.submissionDate}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">
                  Deskripsi Pengajuan
                </h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-md border">
                  {request.description}
                </p>
              </div>

              {request.notes && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Catatan</h3>
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-md">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <p className="text-amber-800">{request.notes}</p>
                    </div>
                  </div>
                </div>
              )}

              {request.assignedTo && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  <span>
                    Ditangani oleh:{" "}
                    <span className="font-medium text-gray-700">
                      {request.assignedTo}
                    </span>
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tabs: Documents, Timeline, Discussion */}
          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger
                value="documents"
                className="flex gap-2 items-center"
              >
                <FileText className="h-4 w-4" />
                <span>Dokumen</span>
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex gap-2 items-center">
                <Clock className="h-4 w-4" />
                <span>Timeline</span>
              </TabsTrigger>
              <TabsTrigger
                value="discussion"
                className="flex gap-2 items-center"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Diskusi</span>
              </TabsTrigger>
            </TabsList>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Dokumen Lampiran</CardTitle>
                  <CardDescription>
                    Dokumen yang dilampirkan oleh pemohon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {request.attachments.length > 0 ? (
                      request.attachments.map((attachment: any) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-3 border rounded-md"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{attachment.name}</p>
                              <p className="text-xs text-gray-500">
                                {attachment.size} • Diunggah{" "}
                                {attachment.uploadedAt}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Download className="h-4 w-4" />
                            <span>Unduh</span>
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                        <p>Tidak ada dokumen yang dilampirkan</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Riwayat Pengajuan</CardTitle>
                  <CardDescription>
                    Riwayat perubahan status pengajuan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {request.timeline.map((event: any, index: number) => (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              event.status === "submitted"
                                ? "bg-green-100"
                                : event.status === "processing"
                                ? "bg-blue-100"
                                : event.status === "completed"
                                ? "bg-green-100"
                                : event.status === "rejected"
                                ? "bg-red-100"
                                : "bg-gray-100"
                            }`}
                          >
                            {event.status === "submitted" && (
                              <FileText className="h-4 w-4 text-green-600" />
                            )}
                            {event.status === "processing" && (
                              <RefreshCw className="h-4 w-4 text-blue-600" />
                            )}
                            {event.status === "completed" && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                            {event.status === "rejected" && (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          {index < request.timeline.length - 1 && (
                            <div className="h-full w-0.5 bg-gray-200"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <p className="font-medium">{event.description}</p>
                          <p className="text-sm text-gray-500">{event.date}</p>
                          {event.notes && (
                            <p className="text-sm mt-1 bg-gray-50 p-2 rounded border">
                              {event.notes}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            oleh {event.user}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Discussion Tab */}
            <TabsContent value="discussion">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Diskusi</CardTitle>
                  <CardDescription>
                    Komunikasi antara pemohon dan admin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {request.comments.length > 0 ? (
                      request.comments.map((comment: any) => (
                        <div
                          key={comment.id}
                          className={`p-3 rounded-lg ${
                            comment.role === "admin"
                              ? "bg-blue-50 ml-8"
                              : "bg-gray-50 mr-8"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {comment.user}
                              </span>
                              <Badge
                                variant="outline"
                                className={
                                  comment.role === "admin"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100"
                                }
                              >
                                {comment.role === "admin" ? "Admin" : "Pemohon"}
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-500">
                              {comment.date}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                        <p>Belum ada diskusi</p>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Tambah Komentar</h3>
                    <Textarea
                      placeholder="Ketik balasan anda di sini..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                      >
                        Kirim Pesan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Requester Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Pemohon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-7 w-7 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium">{request.userName}</h3>
                  <p className="text-sm text-gray-500">NIK: {request.nik}</p>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm">{request.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Telepon</p>
                    <p className="text-sm">{request.contactPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Alamat</p>
                    <p className="text-sm">{request.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Layanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Jenis Layanan</p>
                  <p className="text-sm font-medium">{request.serviceName}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Tanggal Pengajuan</p>
                  <p className="text-sm">{request.submissionDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Terakhir Diperbarui</p>
                  <p className="text-sm">{request.lastUpdated}</p>
                </div>
              </div>
            </CardContent>
            {request.status === "processing" && (
              <CardFooter className="bg-gray-50 border-t p-4">
                <Button
                  onClick={() => setCompleteDialogOpen(true)}
                  className="w-full"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Selesaikan Pengajuan
                </Button>
              </CardFooter>
            )}
          </Card>

          {/* Action Buttons for Pending Requests */}
          {request.status === "pending" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tindakan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full"
                  onClick={() => setApproveDialogOpen(true)}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Proses Pengajuan
                </Button>

                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => setRejectDialogOpen(true)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Tolak Pengajuan
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Approve Request Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Proses Pengajuan</DialogTitle>
            <DialogDescription>
              Setujui dan proses pengajuan {request.serviceName} dari{" "}
              {request.userName}.
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

      {/* Reject Request Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tolak Pengajuan</DialogTitle>
            <DialogDescription>
              Tolak pengajuan {request.serviceName} dari {request.userName}.
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
                Berikan alasan yang jelas agar pemohon dapat memahami penolakan
                ini.
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

      {/* Complete Request Dialog */}
      <Dialog open={completeDialogOpen} onOpenChange={setCompleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selesaikan Pengajuan</DialogTitle>
            <DialogDescription>
              Tandai pengajuan {request.serviceName} dari {request.userName}{" "}
              sebagai selesai.
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
                Berikan informasi tambahan tentang penyelesaian layanan, seperti
                waktu dan tempat pengambilan dokumen.
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
    </div>
  );
};

export default ServiceRequestDetail;
