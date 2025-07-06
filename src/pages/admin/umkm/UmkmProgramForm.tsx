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
  FormDescription,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Calendar,
  MapPin,
  Users,
  Book,
  Store,
  Building,
} from "lucide-react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(3, "Nama program minimal 3 karakter"),
  description: z.string().min(20, "Deskripsi minimal 20 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  status: z.enum(["active", "upcoming", "completed", "cancelled"]),
  startDate: z.string().min(1, "Tanggal mulai harus diisi"),
  endDate: z.string().min(1, "Tanggal selesai harus diisi"),
  location: z.string().min(3, "Lokasi minimal 3 karakter"),
  organizer: z.string().min(3, "Penyelenggara minimal 3 karakter"),
  organizerContact: z
    .string()
    .min(5, "Kontak penyelenggara minimal 5 karakter"),
  organizerEmail: z.string().email("Format email tidak valid"),
  maxParticipants: z.string().min(1, "Kapasitas maksimal harus diisi"),
  budget: z.string().optional(),
  requirements: z.array(z.string()),
  benefits: z.array(z.string()),
  schedule: z.array(
    z.object({
      date: z.string(),
      activity: z.string(),
      time: z.string(),
    })
  ),
  partners: z.array(z.string()),
  images: z.array(z.any()).optional(),
});

type ProgramFormValues = z.infer<typeof formSchema>;

// Available categories
const categories = [
  "Pelatihan Digital",
  "Pemasaran",
  "Keuangan",
  "Produksi",
  "Desain & Kemasan",
  "Sertifikasi",
  "Ekspor",
  "Lainnya",
];

// Mock data for editing
const mockProgram = {
  id: "1",
  name: "Program Pemberdayaan UMKM Digital",
  description:
    "Program pelatihan digitalisasi usaha mikro kecil menengah untuk meningkatkan daya saing produk lokal di era digital.",
  category: "Pelatihan Digital",
  status: "active",
  startDate: "2024-02-01",
  endDate: "2024-07-30",
  location: "Balai Nagari Guguak Malalo",
  organizer: "Dinas Koperasi dan UMKM",
  organizerContact: "0812-3456-7890",
  organizerEmail: "koperasi@malalo.desa.id",
  maxParticipants: "50",
  budget: "Rp 75.000.000",
  requirements: [
    "UMKM yang sudah terdaftar di Nagari",
    "Memiliki produk yang siap dipasarkan",
    "Bersedia mengikuti seluruh rangkaian program",
  ],
  benefits: [
    "Pelatihan pembuatan konten digital",
    "Workshop fotografi produk",
    "Pembuatan website/toko online gratis",
    "Pendampingan selama 6 bulan",
  ],
  schedule: [
    {
      date: "2024-02-01",
      activity: "Pembukaan dan Orientasi Program",
      time: "09:00 - 12:00",
    },
    {
      date: "2024-02-15",
      activity: "Workshop Fotografi Produk",
      time: "09:00 - 16:00",
    },
  ],
  partners: [
    "Bank Nagari",
    "Universitas Andalas",
    "Kementerian Komunikasi dan Informatika",
  ],
};

const UmkmProgramForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const isEditing = Boolean(id);

  // Initialize form with default values
  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      status: "upcoming",
      startDate: "",
      endDate: "",
      location: "",
      organizer: "",
      organizerContact: "",
      organizerEmail: "",
      maxParticipants: "",
      budget: "",
      requirements: [""],
      benefits: [""],
      schedule: [
        {
          date: "",
          activity: "",
          time: "",
        },
      ],
      partners: [""],
      images: [],
    },
  });

  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch program by ID from API
      // For now, use mock data
      form.reset({
        name: mockProgram.name,
        description: mockProgram.description,
        category: mockProgram.category,
        status: mockProgram.status as
          | "active"
          | "upcoming"
          | "completed"
          | "cancelled",
        startDate: mockProgram.startDate,
        endDate: mockProgram.endDate,
        location: mockProgram.location,
        organizer: mockProgram.organizer,
        organizerContact: mockProgram.organizerContact,
        organizerEmail: mockProgram.organizerEmail,
        maxParticipants: mockProgram.maxParticipants,
        budget: mockProgram.budget,
        requirements: mockProgram.requirements,
        benefits: mockProgram.benefits,
        schedule: mockProgram.schedule,
        partners: mockProgram.partners,
        images: [],
      });
    }
  }, [id, form, isEditing]);

  // Handler for adding/removing array items
  const handleArrayField = (
    fieldName: any,
    action: "add" | "remove",
    index?: number
  ) => {
    const currentValues = form.getValues(fieldName);

    if (action === "add") {
      // Create empty item based on field type
      let newItem;
      if (
        fieldName === "requirements" ||
        fieldName === "benefits" ||
        fieldName === "partners"
      ) {
        newItem = "";
      } else if (fieldName === "schedule") {
        newItem = { date: "", activity: "", time: "" };
      }
      form.setValue(fieldName, [...currentValues, newItem]);
    }

    if (action === "remove" && typeof index !== "undefined") {
      const newValues = [...currentValues];
      newValues.splice(index, 1);
      form.setValue(fieldName, newValues);
    }
  };

  // Handle image change with previews
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPreviews: string[] = [];
    const filesArray = Array.from(files);

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews.push(e.target.result as string);
          setPreviewImages((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    form.setValue("images", filesArray);
  };

  const onSubmit = async (data: ProgramFormValues) => {
    setLoading(true);
    try {
      console.log("Form data:", data);

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: isEditing ? "Program diperbarui" : "Program ditambahkan",
        description: isEditing
          ? "Perubahan berhasil disimpan"
          : "Program baru berhasil ditambahkan",
      });

      navigate("/admin/umkm/program");
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
          onClick={() => navigate("/admin/umkm/program")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          {isEditing
            ? "Edit Program Pemberdayaan"
            : "Tambah Program Pemberdayaan"}
        </h1>
        <AdminBreadcrumbs
          items={[
            { label: "UMKM", href: "/admin/umkm" },
            { label: "Program Pemberdayaan", href: "/admin/umkm/program" },
            { label: isEditing ? "Edit Program" : "Tambah Program" },
          ]}
          className="mt-1"
        />
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card
          className="bg-orange-50 border-orange-200 cursor-pointer hover:bg-orange-100 transition-colors"
          onClick={() => navigate("/admin/umkm")}
        >
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

        <Card className="bg-indigo-50 border-indigo-200">
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

      <div className="bg-white p-6 rounded-md shadow-sm border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Tabs for organizing the form */}
            <Tabs
              defaultValue="info"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="info">Informasi Dasar</TabsTrigger>
                <TabsTrigger value="details">Detail Program</TabsTrigger>
                <TabsTrigger value="schedule">Jadwal</TabsTrigger>
                <TabsTrigger value="materials">Materi & Partner</TabsTrigger>
              </TabsList>

              {/* Tab: Basic Information */}
              <TabsContent value="info" className="space-y-6 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Program</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama program pemberdayaan"
                          {...field}
                        />
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
                            <SelectItem value="upcoming">
                              Akan Datang
                            </SelectItem>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="completed">Selesai</SelectItem>
                            <SelectItem value="cancelled">
                              Dibatalkan
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tulis deskripsi program pemberdayaan..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Mulai</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Selesai</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lokasi</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <div className="flex items-center bg-gray-100 px-3 rounded-l-md border border-r-0 border-input">
                            <MapPin className="h-4 w-4 text-gray-500" />
                          </div>
                          <Input
                            className="rounded-l-none"
                            placeholder="Masukkan lokasi penyelenggaraan"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Tab: Details */}
              <TabsContent value="details" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="organizer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Penyelenggara</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="flex items-center bg-gray-100 px-3 rounded-l-md border border-r-0 border-input">
                              <Building className="h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              className="rounded-l-none"
                              placeholder="Nama lembaga/instansi penyelenggara"
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
                    name="maxParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kapasitas Maksimal</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="flex items-center bg-gray-100 px-3 rounded-l-md border border-r-0 border-input">
                              <Users className="h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              className="rounded-l-none"
                              type="number"
                              placeholder="Jumlah peserta maksimal"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="organizerContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kontak Penyelenggara</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nomor telepon penyelenggara"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Penyelenggara</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email penyelenggara"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anggaran (Opsional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: Rp 50.000.000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Requirements */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base">
                      Persyaratan Peserta
                    </FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleArrayField("requirements", "add")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah Persyaratan
                    </Button>
                  </div>

                  {form.watch("requirements").map((_, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FormField
                        control={form.control}
                        name={`requirements.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Masukkan persyaratan"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleArrayField("requirements", "remove", index)
                          }
                          className="mt-1"
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base">Manfaat Program</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleArrayField("benefits", "add")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah Manfaat
                    </Button>
                  </div>

                  {form.watch("benefits").map((_, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FormField
                        control={form.control}
                        name={`benefits.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Masukkan manfaat program"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleArrayField("benefits", "remove", index)
                          }
                          className="mt-1"
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab: Schedule */}
              <TabsContent value="schedule" className="space-y-6 pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base">Jadwal Kegiatan</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleArrayField("schedule", "add")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah Jadwal
                    </Button>
                  </div>

                  {form.watch("schedule").map((_, index) => (
                    <Card key={index} className="bg-gray-50">
                      <CardContent className="pt-5">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium">
                            Kegiatan {index + 1}
                          </p>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleArrayField("schedule", "remove", index)
                              }
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <FormField
                            control={form.control}
                            name={`schedule.${index}.date`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Tanggal
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} type="date" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`schedule.${index}.activity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Nama Kegiatan
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Contoh: Workshop, Pelatihan, dll"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`schedule.${index}.time`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Waktu</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Contoh: 09:00 - 12:00"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Tab: Materials & Partners */}
              <TabsContent value="materials" className="space-y-6 pt-4">
                {/* Partners */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base">Mitra Program</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleArrayField("partners", "add")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah Mitra
                    </Button>
                  </div>

                  {form.watch("partners").map((_, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FormField
                        control={form.control}
                        name={`partners.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Nama instansi/lembaga mitra"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleArrayField("partners", "remove", index)
                          }
                          className="mt-1"
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Upload Images */}
                <div className="space-y-4">
                  <FormLabel className="text-base">
                    Dokumentasi/Materi Program
                  </FormLabel>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImagesChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <div className="p-4 rounded-full bg-indigo-50 mb-4">
                        <Plus className="h-6 w-6 text-indigo-600" />
                      </div>
                      <p className="text-sm font-medium mb-1">
                        Klik untuk unggah foto
                      </p>
                      <p className="text-xs text-gray-500">
                        Format: JPG, PNG. Ukuran maks: 5MB
                      </p>
                    </label>
                  </div>

                  {/* Image previews */}
                  {previewImages.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-2">
                        Preview Foto:
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {previewImages.map((src, idx) => (
                          <div
                            key={idx}
                            className="relative group aspect-square"
                          >
                            <img
                              src={src}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                type="button"
                                className="text-white hover:bg-white/20"
                                onClick={() => {
                                  setPreviewImages(
                                    previewImages.filter((_, i) => i !== idx)
                                  );
                                  const currentFiles = form.getValues("images");
                                  if (Array.isArray(currentFiles)) {
                                    const newFiles = [...currentFiles];
                                    newFiles.splice(idx, 1);
                                    form.setValue("images", newFiles);
                                  }
                                }}
                              >
                                <X className="h-5 w-5" />
                              </Button>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {idx + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Form actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const currentTab = activeTab;
                    const tabOrder = [
                      "info",
                      "details",
                      "schedule",
                      "materials",
                    ];
                    const currentIndex = tabOrder.indexOf(currentTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabOrder[currentIndex - 1]);
                    }
                  }}
                  disabled={activeTab === "info"}
                >
                  Sebelumnya
                </Button>

                <Button
                  type="button"
                  onClick={() => {
                    const currentTab = activeTab;
                    const tabOrder = [
                      "info",
                      "details",
                      "schedule",
                      "materials",
                    ];
                    const currentIndex = tabOrder.indexOf(currentTab);
                    if (currentIndex < tabOrder.length - 1) {
                      setActiveTab(tabOrder[currentIndex + 1]);
                    }
                  }}
                  disabled={activeTab === "materials"}
                  variant="outline"
                >
                  Selanjutnya
                </Button>
              </div>

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

export default UmkmProgramForm;
