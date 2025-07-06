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
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import {
  ArrowLeft,
  Save,
  MapPin,
  Clock,
  Plus,
  X,
  Image,
  Calendar,
} from "lucide-react";

// Enhanced form schema validation with new fields
const formSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  description: z.string().min(50, "Deskripsi minimal 50 karakter"),
  location: z.string().min(5, "Lokasi minimal 5 karakter"),
  googleMapsUrl: z
    .string()
    .url("URL Google Maps tidak valid")
    .optional()
    .or(z.literal("")),
  category: z.string().min(1, "Kategori harus dipilih"),
  facilities: z.array(z.string()),
  openingHours: z.string().min(3, "Jam operasional harus diisi"),
  contactPhone: z.string().min(5, "Nomor telepon minimal 5 digit"),
  entranceFee: z.string(),
  status: z.enum(["active", "inactive"]),
  // New fields
  accessDifficulty: z.string().min(1, "Tingkat kesulitan akses harus dipilih"),
  transportationOptions: z.array(
    z.object({
      type: z.string(),
      description: z.string().optional(),
    })
  ),
  weather: z.object({
    temperature: z.string(),
    bestSeason: z.string(),
    humidity: z.string().optional(),
    current: z.string().optional(),
  }),
  visitationTips: z.array(z.string()).min(1, "Minimal satu tips kunjungan"),
  tourGuides: z.array(
    z.object({
      name: z.string(),
      phone: z.string(),
      expertise: z.string().optional(),
    })
  ),
  nearbyDestinations: z.array(
    z.object({
      name: z.string(),
      distance: z.string(),
      category: z.string().optional(),
    })
  ),
  nearbyHomestays: z.array(
    z.object({
      name: z.string(),
      distance: z.string(),
      price: z.string().optional(),
      capacity: z.string().optional(),
    })
  ),
  photoGallery: z.array(z.any()).optional(),
  bestVisitTime: z.string().optional(),
});

type TourismFormValues = z.infer<typeof formSchema>;

// Available categories and difficulty levels
const categories = [
  "Alam",
  "Budaya",
  "Sejarah",
  "Kuliner",
  "Kerajinan",
  "Agrowisata",
  "Religi",
  "Lainnya",
];

const accessDifficultyLevels = [
  { value: "easy", label: "Mudah - Dapat diakses semua orang" },
  { value: "medium", label: "Sedang - Memerlukan sedikit effort" },
  { value: "hard", label: "Sulit - Perlu pengalaman/peralatan khusus" },
  { value: "extreme", label: "Ekstrim - Hanya untuk yang berpengalaman" },
];

const facilityOptions = [
  { id: "parking", label: "Area Parkir" },
  { id: "toilet", label: "Toilet" },
  { id: "food", label: "Tempat Makan" },
  { id: "worship", label: "Tempat Ibadah" },
  { id: "souvenir", label: "Toko Oleh-oleh" },
  { id: "wifi", label: "WiFi" },
  { id: "playground", label: "Taman Bermain" },
  { id: "camping", label: "Area Camping" },
  { id: "shelter", label: "Shelter/Gazebo" },
  { id: "firstaid", label: "P3K/Medis" },
  { id: "guide", label: "Pemandu Wisata" },
  { id: "photography", label: "Spot Foto" },
];

// Mock tourism data for edit mode
const mockTourism = {
  id: "1",
  name: "Air Terjun Sarasah",
  description:
    "Air terjun yang terletak di kawasan hutan lindung dengan pemandangan alam yang masih asri. Tinggi air terjun mencapai 15 meter dengan kolam alami yang bisa digunakan untuk berenang.",
  location: "Jorong Guguak Malalo, 3 km dari pusat nagari",
  googleMapsUrl: "https://maps.google.com/?q=-0.5123,100.4567",
  category: "Alam",
  facilities: ["parking", "toilet", "food"],
  openingHours: "08:00 - 18:00 WIB (Setiap Hari)",
  contactPhone: "082345678901",
  entranceFee: "Rp15.000/orang",
  status: "active",
  // Extended mock data for new fields
  accessDifficulty: "medium",
  bestVisitTime: "Pagi hari (05.00-10.00) atau sore hari (15.00-18.00)",
  transportationOptions: [
    { type: "Kendaraan pribadi", description: "Parkir tersedia di lokasi" },
    { type: "Ojek", description: "Rp 25.000 dari pusat nagari" },
  ],
  weather: {
    temperature: "22-28°C",
    bestSeason: "Musim kemarau (April-September)",
    humidity: "70-90%",
    current: "Cerah berawan",
  },
  visitationTips: [
    "Bawalah perlengkapan berenang jika ingin menikmati kolam air terjun",
    "Gunakan alas kaki yang tidak licin",
    "Siapkan makanan dan minuman sendiri",
  ],
  tourGuides: [
    { name: "Pak Rahman", phone: "081234567890", expertise: "Flora & Fauna" },
    { name: "Bang Joni", phone: "085678901234", expertise: "Pendakian" },
  ],
  nearbyDestinations: [
    { name: "Danau Singkarak", distance: "3 km", category: "Danau" },
    { name: "Bukit Langkisau", distance: "5 km", category: "Perbukitan" },
  ],
  nearbyHomestays: [
    {
      name: "Penginapan Sarasah",
      distance: "500 m",
      price: "Rp200.000/malam",
      capacity: "2-4 orang",
    },
    {
      name: "Villa Guguak",
      distance: "1 km",
      price: "Rp350.000/malam",
      capacity: "4-6 orang",
    },
  ],
};

const TourismForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const isEditing = Boolean(id);

  // Initialize form with default values
  const form = useForm<TourismFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      googleMapsUrl: "",
      category: "",
      facilities: [],
      openingHours: "",
      contactPhone: "",
      entranceFee: "",
      status: "active",
      // New fields
      accessDifficulty: "",
      bestVisitTime: "",
      transportationOptions: [{ type: "", description: "" }],
      weather: {
        temperature: "",
        bestSeason: "",
        humidity: "",
        current: "",
      },
      visitationTips: [""],
      tourGuides: [{ name: "", phone: "", expertise: "" }],
      nearbyDestinations: [{ name: "", distance: "", category: "" }],
      nearbyHomestays: [{ name: "", distance: "", price: "", capacity: "" }],
      photoGallery: [],
    },
  });

  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch tourism by ID from API
      // For now, use mock data
      form.reset({
        name: mockTourism.name,
        description: mockTourism.description,
        location: mockTourism.location,
        googleMapsUrl: mockTourism.googleMapsUrl,
        category: mockTourism.category,
        facilities: mockTourism.facilities,
        openingHours: mockTourism.openingHours,
        contactPhone: mockTourism.contactPhone,
        entranceFee: mockTourism.entranceFee,
        status: mockTourism.status as "active" | "inactive",
        // New fields
        accessDifficulty: mockTourism.accessDifficulty,
        bestVisitTime: mockTourism.bestVisitTime,
        transportationOptions: mockTourism.transportationOptions,
        weather: mockTourism.weather,
        visitationTips: mockTourism.visitationTips,
        tourGuides: mockTourism.tourGuides,
        nearbyDestinations: mockTourism.nearbyDestinations,
        nearbyHomestays: mockTourism.nearbyHomestays,
        photoGallery: [],
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
      // Create empty object based on field type
      let newItem;
      if (fieldName === "transportationOptions") {
        newItem = { type: "", description: "" };
      } else if (fieldName === "tourGuides") {
        newItem = { name: "", phone: "", expertise: "" };
      } else if (fieldName === "nearbyDestinations") {
        newItem = { name: "", distance: "", category: "" };
      } else if (fieldName === "nearbyHomestays") {
        newItem = { name: "", distance: "", price: "", capacity: "" };
      } else if (fieldName === "visitationTips") {
        newItem = "";
      }
      form.setValue(fieldName, [...currentValues, newItem]);
    }

    if (action === "remove" && typeof index !== "undefined") {
      const newValues = [...currentValues];
      newValues.splice(index, 1);
      form.setValue(fieldName, newValues);
    }
  };

  // Handle photo gallery change with previews
  const handlePhotoGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    form.setValue("photoGallery", filesArray);
  };

  const onSubmit = async (data: TourismFormValues) => {
    setLoading(true);
    try {
      // Log the data for debugging
      console.log("Form data:", data);

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: isEditing
          ? "Objek Wisata diperbarui"
          : "Objek Wisata ditambahkan",
        description: isEditing
          ? "Perubahan berhasil disimpan"
          : "Objek wisata baru berhasil ditambahkan",
      });

      navigate("/admin/pariwisata");
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
          onClick={() => navigate("/admin/pariwisata")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Edit Objek Wisata" : "Tambah Objek Wisata"}
        </h1>
        <AdminBreadcrumbs
          items={[
            { label: "Pariwisata", href: "/admin/pariwisata" },
            { label: isEditing ? "Edit Objek Wisata" : "Tambah Objek Wisata" },
          ]}
          className="mt-1"
        />
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
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

        <Card className="bg-blue-50 border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
          <CardContent
            className="p-4"
            onClick={() => navigate("/admin/events")}
          >
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

      <div className="bg-white p-6 rounded-md shadow-sm border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Tabs for organizing the form */}
            <Tabs
              defaultValue="info"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="info">Informasi Dasar</TabsTrigger>
                <TabsTrigger value="access">Akses & Fasilitas</TabsTrigger>
                <TabsTrigger value="tips">Panduan Kunjungan</TabsTrigger>
                <TabsTrigger value="related">Terkait & Homestay</TabsTrigger>
                <TabsTrigger value="gallery">Galeri Foto</TabsTrigger>
              </TabsList>

              {/* Tab: Basic Information */}
              <TabsContent value="info" className="space-y-6 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Objek Wisata</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama objek wisata"
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
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="inactive">Nonaktif</SelectItem>
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
                          placeholder="Tulis deskripsi objek wisata di sini..."
                          className="min-h-[150px]"
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
                              placeholder="Masukkan alamat/lokasi"
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
                    name="googleMapsUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Google Maps</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://maps.google.com/?q=..."
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
                  name="entranceFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga Tiket Masuk</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Rp10.000/orang atau Gratis"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Tab: Access and Facilities */}
              <TabsContent value="access" className="space-y-6 pt-4">
                {/* Access Difficulty */}
                <FormField
                  control={form.control}
                  name="accessDifficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tingkat Kesulitan Akses</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tingkat kesulitan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {accessDifficultyLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Transportation Options */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base">
                      Opsi Transportasi
                    </FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleArrayField("transportationOptions", "add")
                      }
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah Opsi
                    </Button>
                  </div>

                  {form.watch("transportationOptions").map((_, index) => (
                    <Card key={index} className="bg-gray-50">
                      <CardContent className="pt-5">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium">
                            Opsi {index + 1}
                          </p>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleArrayField(
                                  "transportationOptions",
                                  "remove",
                                  index
                                )
                              }
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <FormField
                            control={form.control}
                            name={`transportationOptions.${index}.type`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Jenis Transportasi
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Contoh: Ojek, Bus, Mobil pribadi"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`transportationOptions.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Keterangan (opsional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Contoh: Biaya, rute, dll"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="openingHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jam Operasional</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="flex items-center bg-gray-100 px-3 rounded-l-md border border-r-0 border-input">
                              <Clock className="h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              className="rounded-l-none"
                              placeholder="Contoh: 08:00 - 17:00 WIB (Setiap Hari)"
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
                    name="bestVisitTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Waktu Terbaik Berkunjung</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Contoh: Pagi hari (05:00-10:00) atau sore hari"
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
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kontak / Telepon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nomor telepon pengelola"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="facilities"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Fasilitas</FormLabel>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {facilityOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="facilities"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              option.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Weather Information */}
                <div className="space-y-4">
                  <FormLabel className="text-base">Informasi Cuaca</FormLabel>
                  <Card className="bg-gray-50">
                    <CardContent className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="weather.temperature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Suhu</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Contoh: 22-28°C" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="weather.humidity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">
                              Kelembapan
                            </FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Contoh: 70-90%" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="weather.bestSeason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">
                              Musim Terbaik
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Contoh: Musim kemarau (April-September)"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="weather.current"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">
                              Cuaca Umum
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Contoh: Cerah berawan"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Tab: Tips and Tour Guides */}
              <TabsContent value="tips" className="space-y-6 pt-4">
                {/* Visitation Tips */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base">Tips Kunjungan</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleArrayField("visitationTips", "add")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah Tips
                    </Button>
                  </div>

                  {form.watch("visitationTips").map((_, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FormField
                        control={form.control}
                        name={`visitationTips.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Masukkan tips kunjungan"
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
                            handleArrayField("visitationTips", "remove", index)
                          }
                          className="mt-1"
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Tour Guides */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base">
                      Kontak Pemandu Wisata
                    </FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleArrayField("tourGuides", "add")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah Pemandu
                    </Button>
                  </div>

                  {form.watch("tourGuides").map((_, index) => (
                    <Card key={index} className="bg-gray-50">
                      <CardContent className="pt-5">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium">
                            Pemandu {index + 1}
                          </p>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleArrayField("tourGuides", "remove", index)
                              }
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <FormField
                            control={form.control}
                            name={`tourGuides.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Nama</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Nama pemandu"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`tourGuides.${index}.phone`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  No. Telepon
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Nomor telepon"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`tourGuides.${index}.expertise`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Keahlian (opsional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Contoh: Flora & Fauna, Pendakian"
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

              {/* Tab: Related Destinations and Homestays */}
              <TabsContent value="related" className="space-y-6 pt-4">
                {/* Nearby Destinations */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base">
                      Destinasi Wisata Terdekat
                    </FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleArrayField("nearbyDestinations", "add")
                      }
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah Destinasi
                    </Button>
                  </div>

                  {form.watch("nearbyDestinations").map((_, index) => (
                    <Card key={index} className="bg-gray-50">
                      <CardContent className="pt-5">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium">
                            Destinasi {index + 1}
                          </p>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleArrayField(
                                  "nearbyDestinations",
                                  "remove",
                                  index
                                )
                              }
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <FormField
                            control={form.control}
                            name={`nearbyDestinations.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Nama Destinasi
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Nama objek wisata"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`nearbyDestinations.${index}.distance`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Jarak</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Contoh: 3 km"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`nearbyDestinations.${index}.category`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Kategori (opsional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Contoh: Danau, Perbukitan"
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

                <Separator />

                {/* Nearby Homestays */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base">
                      Penginapan/Homestay Terdekat
                    </FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleArrayField("nearbyHomestays", "add")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah Penginapan
                    </Button>
                  </div>

                  {form.watch("nearbyHomestays").map((_, index) => (
                    <Card key={index} className="bg-gray-50">
                      <CardContent className="pt-5">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium">
                            Penginapan {index + 1}
                          </p>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleArrayField(
                                  "nearbyHomestays",
                                  "remove",
                                  index
                                )
                              }
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <FormField
                            control={form.control}
                            name={`nearbyHomestays.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Nama Penginapan
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Nama homestay/penginapan"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`nearbyHomestays.${index}.distance`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Jarak</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Contoh: 500 m"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          <FormField
                            control={form.control}
                            name={`nearbyHomestays.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Harga (opsional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Contoh: Rp200.000/malam"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`nearbyHomestays.${index}.capacity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Kapasitas (opsional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Contoh: 2-4 orang"
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

              {/* Tab: Photo Gallery */}
              <TabsContent value="gallery" className="space-y-6 pt-4">
                <FormField
                  control={form.control}
                  name="photoGallery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Galeri Foto</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoGalleryChange}
                            className="border-2 border-dashed p-8 text-center"
                          />
                          <FormDescription className="text-center">
                            Unggah foto-foto objek wisata. Format: JPG, PNG,
                            WEBP. Ukuran maksimal: 5MB per foto.
                          </FormDescription>
                        </div>
                      </FormControl>

                      {/* Image preview */}
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
                                        previewImages.filter(
                                          (_, i) => i !== idx
                                        )
                                      );
                                      const currentFiles =
                                        form.getValues("photoGallery");
                                      if (Array.isArray(currentFiles)) {
                                        const newFiles = [...currentFiles];
                                        newFiles.splice(idx, 1);
                                        form.setValue("photoGallery", newFiles);
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                  <div className="flex items-start gap-2">
                    <Image className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-800">
                        Tips mengunggah foto:
                      </h4>
                      <ul className="text-xs text-amber-700 list-disc pl-4 mt-1 space-y-1">
                        <li>
                          Gunakan foto berkualitas tinggi dengan pencahayaan
                          baik
                        </li>
                        <li>
                          Pastikan foto menampilkan keindahan dan keunikan objek
                          wisata
                        </li>
                        <li>Sertakan foto dari berbagai sudut pandang</li>
                        <li>Tambahkan foto fasilitas yang tersedia</li>
                        <li>Gunakan format landscape untuk hasil terbaik</li>
                      </ul>
                    </div>
                  </div>
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
                      "access",
                      "tips",
                      "related",
                      "gallery",
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
                      "access",
                      "tips",
                      "related",
                      "gallery",
                    ];
                    const currentIndex = tabOrder.indexOf(currentTab);
                    if (currentIndex < tabOrder.length - 1) {
                      setActiveTab(tabOrder[currentIndex + 1]);
                    }
                  }}
                  disabled={activeTab === "gallery"}
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

export default TourismForm;
