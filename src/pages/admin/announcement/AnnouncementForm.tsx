import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import { ArrowLeft, Save, Calendar } from "lucide-react";
import { mockAnnouncementData } from "./AnnouncementList";

// Form schema validation
const formSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  content: z.string().min(20, "Konten minimal 20 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  publishDate: z.string().min(1, "Tanggal terbit harus diisi"),
  expiryDate: z.string().min(1, "Tanggal berakhir harus diisi"),
  priority: z.enum(["normal", "high", "urgent"]),
  status: z.enum(["active", "expired", "draft"]),
  attachments: z.array(z.any()).optional(),
  sendNotification: z.boolean().default(false),
});

type AnnouncementFormValues = z.infer<typeof formSchema>;

// Available categories
const categories = [
  "Kesehatan",
  "Infrastruktur",
  "Layanan Publik",
  "Pendidikan",
  "Administrasi",
  "Sosial",
  "Ekonomi",
  "Lainnya",
];

const AnnouncementForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(id);

  // Format today and a month from now as YYYY-MM-DD for date inputs
  const today = new Date().toISOString().split("T")[0];
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const nextMonthFormatted = nextMonth.toISOString().split("T")[0];

  // Initialize form with default values
  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      publishDate: today,
      expiryDate: nextMonthFormatted,
      priority: "normal",
      status: "draft",
      attachments: [],
      sendNotification: true,
    },
  });

  useEffect(() => {
    if (isEditing && id) {
      // In a real app, fetch announcement by ID from API
      // For now, use mock data
      const announcement = mockAnnouncementData.find((item) => item.id === id);

      if (announcement) {
        // Convert date format from DD/MM/YYYY to YYYY-MM-DD for form inputs
        const convertDate = (dateStr: string) => {
          const [day, month, year] = dateStr.split("/");
          return `${year}-${month}-${day}`;
        };

        form.reset({
          title: announcement.title,
          content:
            "Isi pengumuman akan ditampilkan di sini. Dalam implementasi sebenarnya, ini akan diambil dari database.",
          category: announcement.category,
          publishDate: convertDate(announcement.publishDate),
          expiryDate: convertDate(announcement.expiryDate),
          priority: announcement.priority,
          status: announcement.status,
          attachments: [],
          sendNotification: false,
        });
      }
    }
  }, [id, form, isEditing]);

  const onSubmit = async (data: AnnouncementFormValues) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Submitted data:", data);

      toast({
        title: isEditing ? "Pengumuman diperbarui" : "Pengumuman ditambahkan",
        description: isEditing
          ? "Perubahan berhasil disimpan"
          : "Pengumuman baru berhasil ditambahkan",
      });

      navigate("/admin/pengumuman");
    } catch (error) {
      toast({
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          className="mb-2"
          onClick={() => navigate("/admin/pengumuman")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Edit Pengumuman" : "Tambah Pengumuman"}
        </h1>
        <AdminBreadcrumbs
          items={[
            { label: "Pengumuman", href: "/admin/pengumuman" },
            { label: isEditing ? "Edit Pengumuman" : "Tambah Pengumuman" },
          ]}
          className="mt-1"
        />
      </div>

      <div className="bg-white p-6 rounded-md shadow-sm border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Pengumuman</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul pengumuman" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="expired">Kedaluwarsa</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="publishDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Terbit</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <div className="flex items-center bg-gray-100 px-3 rounded-l-md border border-r-0 border-input">
                          <Calendar className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input
                          type="date"
                          className="rounded-l-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Berakhir</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <div className="flex items-center bg-gray-100 px-3 rounded-l-md border border-r-0 border-input">
                          <Calendar className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input
                          type="date"
                          className="rounded-l-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioritas</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih prioritas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="urgent">Mendesak</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten Pengumuman</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tulis isi pengumuman di sini..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lampiran (Opsional)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                      onChange={(e) => {
                        field.onChange(
                          e.target.files ? Array.from(e.target.files) : []
                        );
                      }}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500 mt-1">
                    Format file yang didukung: PDF, DOC, DOCX, XLS, XLSX, JPG,
                    PNG. Ukuran maks: 5MB/file.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sendNotification"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Kirim Notifikasi</FormLabel>
                    <p className="text-sm text-gray-500">
                      Kirim notifikasi ke warga melalui website dan aplikasi
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="min-w-[150px]"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Menyimpan...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Simpan
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AnnouncementForm;
