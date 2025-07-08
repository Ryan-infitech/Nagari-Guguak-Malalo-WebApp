import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Edit,
  Trash,
  Clock,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Mock service data - replace with actual API call
const fetchServiceDetail = async (id: string): Promise<any> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id,
    title: "Pembuatan KTP Elektronik",
    description:
      "Layanan pembuatan KTP elektronik bagi warga Nagari Guguak Malalo",
    requirements: [
      "Fotokopi Kartu Keluarga",
      "Surat Pengantar dari RT/RW",
      "Pas foto terbaru ukuran 3x4 (2 lembar)",
    ],
    procedure:
      "1. Mengajukan permohonan\n2. Melengkapi berkas persyaratan\n3. Verifikasi data\n4. Pengambilan foto dan sidik jari\n5. Pengambilan KTP",
    processingTime: "7 hari kerja",
    cost: "Gratis",
    contact: "0822-1234-5678",
    status: "active",
    createdAt: "2023-10-15T08:30:00Z",
    updatedAt: "2023-11-05T14:15:00Z",
    createdBy: "Admin Nagari",
  };
};

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getServiceDetail = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const data = await fetchServiceDetail(id);
        setService(data);
        setError(null);
      } catch (err) {
        setError("Gagal memuat data layanan");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getServiceDetail();
  }, [id]);

  const handleDelete = async () => {
    try {
      // Call delete API here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/admin/layanan");
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-green-500 border-gray-200 animate-spin"></div>
          <p className="mt-4 text-gray-600">Memuat data layanan...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <h3 className="text-lg font-medium text-red-800">Terjadi kesalahan</h3>
        <p className="mt-2 text-red-700">
          {error || "Data layanan tidak ditemukan"}
        </p>
        <Button
          variant="outline"
          onClick={() => navigate("/admin/layanan")}
          className="mt-4"
        >
          Kembali ke Daftar Layanan
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/layanan")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar Layanan
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/layanan/edit/${id}`)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash className="h-4 w-4" />
                Hapus
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin ingin menghapus layanan "{service.title}"?
                  Tindakan ini tidak dapat dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{service.title}</CardTitle>
              <CardDescription className="mt-2">
                <Badge
                  variant={
                    service.status === "active" ? "success" : "secondary"
                  }
                >
                  {service.status === "active" ? "Aktif" : "Nonaktif"}
                </Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">
              Deskripsi Layanan
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium text-gray-800 mb-2">Persyaratan</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {service.requirements.map((req: string, index: number) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium text-gray-800 mb-2">Prosedur</h3>
            <div className="text-gray-600 whitespace-pre-line">
              {service.procedure}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">
                Informasi Tambahan
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Waktu Pemrosesan
                    </p>
                    <p className="text-sm text-gray-600">
                      {service.processingTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Biaya</p>
                    <p className="text-sm text-gray-600">{service.cost}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Kontak</p>
                    <p className="text-sm text-gray-600">{service.contact}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-2">Metadata</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Dibuat pada
                    </p>
                    <p className="text-sm text-gray-600">
                      {format(
                        new Date(service.createdAt),
                        "dd MMMM yyyy, HH:mm",
                        { locale: id }
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Terakhir diperbarui
                    </p>
                    <p className="text-sm text-gray-600">
                      {format(
                        new Date(service.updatedAt),
                        "dd MMMM yyyy, HH:mm",
                        { locale: id }
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Dibuat oleh
                    </p>
                    <p className="text-sm text-gray-600">{service.createdBy}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 px-6 py-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/layanan")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ServiceDetail;
