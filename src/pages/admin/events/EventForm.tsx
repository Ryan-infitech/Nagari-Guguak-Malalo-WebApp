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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import {
  ArrowLeft,
  Save,
  Calendar,
  MapPin,
  Users,
  Image,
  X,
} from "lucide-react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(3, "Nama event minimal 3 karakter"),
  description: z.string().min(20, "Deskripsi minimal 20 karakter"),
  location: z.string().min(3, "Lokasi minimal 3 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]),
  date: z.string().min(1, "Tanggal mulai harus diisi"),
  endDate: z.string().min(1, "Tanggal selesai harus diisi"),
  maxParticipants: z.string().min(1, "Kapasitas maksimal harus diisi"),
  registrationFee: z.string().optional(),
  contactPerson: z.string().min(5, "Kontak person minimal 5 karakter"),
  contactPhone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  requirements: z.string().optional(),
  prizes: z.string().optional(),
  schedule: z.string().optional(),
  image: z.any().optional(),
});

type EventFormValues = z.infer<typeof formSchema>;

const categories = [
  "Budaya",
  "Olahraga",
  "Seni",
  "Ekonomi",
  "Pendidikan",
  "Lingkungan",
  "Teknologi",
  "Kesehatan",
  "Lainnya",
];

// Mock data for editing
const mockEvent = {
  id: "1",
  name: "Festival Danau Singkarak",
  description:
    "Festival budaya dengan pertunjukan tradisional dan kuliner khas yang menampilkan kekayaan budaya Minangkabau",
  location: "Danau Singkarak, Nagari Guguak Malalo",
  category: "Budaya",
  status: "upcoming",
  date: "2024-03-15",
  endDate: "2024-03-17",
  maxParticipants: "500",
  registrationFee: "Gratis",
  contactPerson: "Panitia Festival",
  contactPhone: "08123456789",
  requirements: "Membawa identitas diri",
  prizes: "Hadiah uang tunai dan piala",
  schedule:
    "09:00 - Pembukaan\n12:00 - Pertunjukan Tradisional\n15:00 - Kuliner Show\n18:00 - Penutupan",
};

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const isEditing = Boolean(id);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      category: "",
      status: "upcoming",
      date: "",
      endDate: "",
      maxParticipants: "",
      registrationFee: "",
      contactPerson: "",
      contactPhone: "",
      requirements: "",
      prizes: "",
      schedule: "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (isEditing) {
      // In real app, fetch event data from API
      form.reset({
        name: mockEvent.name,
        description: mockEvent.description,
        location: mockEvent.location,
        category: mockEvent.category,
        status: mockEvent.status as
          | "upcoming"
          | "ongoing"
          | "completed"
          | "cancelled",
        date: mockEvent.date,
        endDate: mockEvent.endDate,
        maxParticipants: mockEvent.maxParticipants,
        registrationFee: mockEvent.registrationFee,
        contactPerson: mockEvent.contactPerson,
        contactPhone: mockEvent.contactPhone,
        requirements: mockEvent.requirements,
        prizes: mockEvent.prizes,
        schedule: mockEvent.schedule,
      });
    }
  }, [id, form, isEditing]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  const onSubmit = async (data: EventFormValues) => {
    setLoading(true);
    try {
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: isEditing ? "Event diperbarui" : "Event ditambahkan",
        description: isEditing
          ? "Perubahan berhasil disimpan"
          : "Event baru berhasil ditambahkan",
      });

      navigate("/admin/events");
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
          onClick={() => navigate("/admin/events")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Edit Event" : "Tambah Event"}
        </h1>
        <AdminBreadcrumbs
          items={[
            { label: "Event & Festival", href: "/admin/events" },
            { label: isEditing ? "Edit Event" : "Tambah Event" },
          ]}
          className="mt-1"
        />
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-green-50 border-green-200 cursor-pointer hover:bg-green-100 transition-colors">
          <CardContent
            className="p-4"
            onClick={() => navigate("/admin/pariwisata")}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-900">Objek Wisata</h3>
                <p className="text-sm text-green-700">
                  Kelola destinasi wisata
                </p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">
                  Event & Festival
                </h3>
                <p className="text-sm text-blue-700">
                  Kelola acara dan festival
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Event</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Event</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan nama event" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              <SelectItem value="ongoing">
                                Berlangsung
                              </SelectItem>
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
                            placeholder="Tulis deskripsi event..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                              placeholder="Masukkan lokasi event"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="maxParticipants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kapasitas Maksimal</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Jumlah peserta maksimal"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="registrationFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biaya Pendaftaran</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Contoh: Gratis atau Rp50.000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kontak Person</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nama kontak person"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nomor Telepon</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nomor telepon kontak"
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
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Persyaratan (Opsional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Persyaratan untuk mengikuti event..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prizes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hadiah (Opsional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Deskripsi hadiah yang diberikan..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jadwal Acara (Opsional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jadwal detail acara..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Gunakan format: 09:00 - Pembukaan
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end pt-4">
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
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Foto Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border-2 border-dashed p-4 text-center"
                />
                {previewImage && (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={() => {
                        setPreviewImage("");
                        form.setValue("image", undefined);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <FormDescription>
                  Format: JPG, PNG, WEBP. Maksimal 5MB.
                </FormDescription>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips Membuat Event</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>• Gunakan nama event yang menarik dan mudah diingat</li>
                <li>• Berikan deskripsi yang jelas dan detail</li>
                <li>• Tentukan tanggal dan waktu yang tepat</li>
                <li>• Sediakan informasi kontak yang mudah dihubungi</li>
                <li>• Upload foto yang berkualitas baik</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
