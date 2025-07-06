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
import { useToast } from "@/components/ui/use-toast";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import { ArrowLeft, Save, Plus, X, MapPin } from "lucide-react";
import { mockUMKMData } from "./UmkmList";

// Form schema validation
const formSchema = z.object({
  name: z.string().min(3, "Nama UMKM minimal 3 karakter"),
  owner: z.string().min(3, "Nama pemilik minimal 3 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  description: z.string().min(20, "Deskripsi minimal 20 karakter"),
  address: z.string().min(5, "Alamat minimal 5 karakter"),
  location: z.string().min(1, "Lokasi jorong harus dipilih"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  status: z.enum(["verified", "pending", "rejected"]),
  products: z.array(z.string()).min(1, "Minimal satu produk harus diisi"),
  images: z.array(z.string()).optional(),
});

type UmkmFormValues = z.infer<typeof formSchema>;

// Available categories
const categories = [
  "Makanan",
  "Minuman",
  "Kerajinan",
  "Pertanian",
  "Peternakan",
  "Oleh-oleh",
  "Jasa",
  "Lainnya",
];

// Jorong locations
const locations = [
  "Jorong Guguak Malalo",
  "Jorong Malalo",
  "Jorong Guguak Sarai",
  "Jorong Baing",
];

const UmkmForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(id);
  const [newProduct, setNewProduct] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Initialize form with default values
  const form = useForm<UmkmFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      owner: "",
      category: "",
      description: "",
      address: "",
      location: "",
      phone: "",
      whatsapp: "",
      instagram: "",
      facebook: "",
      status: "pending",
      products: [],
      images: [],
    },
  });

  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch UMKM by ID from API
      // For now, use mock data
      const umkmData = mockUMKMData.find((item) => item.id === id);
      if (umkmData) {
        form.reset({
          name: umkmData.name,
          owner: umkmData.owner,
          category: umkmData.category,
          description:
            "Deskripsi UMKM ini akan ditampilkan kepada pengunjung website. Berisi informasi tentang UMKM dan produk yang ditawarkan.",
          address: "Jl. Raya Guguak Malalo No. 123",
          location: umkmData.location,
          phone: umkmData.phone,
          whatsapp: umkmData.phone,
          instagram: "",
          facebook: "",
          status: umkmData.status,
          products: umkmData.products,
          images: [],
        });
      }
    }
  }, [id, form, isEditing]);

  const onSubmit = async (data: UmkmFormValues) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: isEditing ? "UMKM diperbarui" : "UMKM ditambahkan",
        description: isEditing
          ? `Data ${data.name} berhasil diperbarui`
          : `${data.name} berhasil ditambahkan`,
      });

      navigate("/admin/umkm");
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

  const addProduct = () => {
    if (newProduct.trim() !== "") {
      const currentProducts = form.getValues("products");
      form.setValue("products", [...currentProducts, newProduct]);
      setNewProduct("");
    }
  };

  const removeProduct = (index: number) => {
    const currentProducts = form.getValues("products");
    form.setValue(
      "products",
      currentProducts.filter((_, i) => i !== index)
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...newFiles]);

      // Generate preview URLs
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          className="mb-2"
          onClick={() => navigate("/admin/umkm")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Edit UMKM" : "Tambah UMKM"}
        </h1>
        <AdminBreadcrumbs
          items={[
            { label: "UMKM", href: "/admin/umkm" },
            { label: isEditing ? "Edit UMKM" : "Tambah UMKM" },
          ]}
          className="mt-1"
        />
      </div>

      <div className="bg-white p-6 rounded-md shadow-sm border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Informasi Dasar</h3>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama UMKM</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama UMKM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Pemilik</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama pemilik" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi UMKM</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Deskripsi lengkap tentang UMKM ini..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border-t pt-6 space-y-6">
              <h3 className="text-lg font-medium">Lokasi & Kontak</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jorong</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jorong" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Alamat lengkap UMKM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: 082112345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor WhatsApp (Opsional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: 082112345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram (Opsional)</FormLabel>
                      <FormControl>
                        <Input placeholder="@namaumkm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook (Opsional)</FormLabel>
                      <FormControl>
                        <Input placeholder="facebook.com/namaumkm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-6">
              <h3 className="text-lg font-medium">Produk UMKM</h3>

              <FormField
                control={form.control}
                name="products"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daftar Produk</FormLabel>
                    <div className="space-y-3">
                      {field.value.map((product, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 border rounded-md bg-gray-50"
                        >
                          <div className="flex-grow">{product}</div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProduct(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          value={newProduct}
                          onChange={(e) => setNewProduct(e.target.value)}
                          placeholder="Tambah produk baru"
                        />
                        <Button type="button" onClick={addProduct}>
                          <Plus className="h-4 w-4 mr-2" />
                          Tambah
                        </Button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border-t pt-6 space-y-6">
              <h3 className="text-lg font-medium">Foto UMKM</h3>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload Foto
                </label>
                <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-md border-gray-300 mb-4">
                  <div className="text-center">
                    <div className="flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-gray-500 mb-1">
                        Klik untuk upload foto
                      </p>
                      <p className="text-xs text-gray-400">
                        (Format: JPG, PNG, maksimal 5MB)
                      </p>
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                      />
                    </div>
                  </div>
                </div>

                {previewImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {previewImages.map((preview, index) => (
                      <div
                        key={index}
                        className="relative rounded-md overflow-hidden h-32"
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="border-t pt-6 space-y-6">
                <h3 className="text-lg font-medium">Status Verifikasi</h3>

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
                          <SelectItem value="verified">
                            Terverifikasi
                          </SelectItem>
                          <SelectItem value="pending">Menunggu</SelectItem>
                          <SelectItem value="rejected">Ditolak</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Hanya UMKM dengan status terverifikasi yang akan
                        ditampilkan di website
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

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

export default UmkmForm;
