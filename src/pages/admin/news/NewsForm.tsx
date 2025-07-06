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
import { ArrowLeft, Save, Image, Link } from "lucide-react";
import { mockNewsData } from "./NewsList";

// Extended form schema with related articles and photo gallery
const formSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  content: z.string().min(50, "Konten minimal 50 karakter"),
  status: z.enum(["published", "draft"]),
  featuredImage: z.any().optional(),
  photoGallery: z.array(z.any()).optional(),
  relatedArticles: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  excerpt: z.string().optional(),
});

type NewsFormValues = z.infer<typeof formSchema>;

// Available categories
const categories = [
  "Event",
  "Sport",
  "Pembangunan",
  "Infrastruktur",
  "Sosial",
  "Pengumuman",
];

const NewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [availableArticles, setAvailableArticles] = useState<
    { id: string; title: string }[]
  >([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const isEditing = Boolean(id);

  // Initialize form with default values
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      status: "draft",
      featuredImage: undefined,
      photoGallery: [],
      relatedArticles: [],
      tags: [],
      excerpt: "",
    },
  });

  // Fetch available articles for the related articles dropdown
  useEffect(() => {
    // In a real app, fetch from API. For now, use mock data
    const articles = mockNewsData
      .filter((article) => article.id !== id) // Don't include current article
      .map((article) => ({
        id: article.id,
        title: article.title,
      }));

    setAvailableArticles(articles);
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch news by ID from API
      // For now, use mock data
      const newsItem = mockNewsData.find((item) => item.id === id);
      if (newsItem) {
        form.reset({
          title: newsItem.title,
          category: newsItem.category,
          content:
            "Contoh konten berita untuk berita ini. Di implementasi sebenarnya akan diambil dari API.",
          status: newsItem.status,
          featuredImage: undefined,
          photoGallery: [],
          relatedArticles: [], // Mock related articles would be populated here
          tags: ["berita", "nagari"], // Example tags
          excerpt: "Ringkasan singkat artikel ini...", // Example excerpt
        });
      }
    }
  }, [id, form, isEditing]);

  // Handle preview images for photo gallery
  const handlePhotoGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPreviews: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews.push(e.target.result as string);
          setPreviewImages([...previewImages, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Update form
    const filesArray = Array.from(files);
    form.setValue("photoGallery", filesArray);
  };

  const onSubmit = async (data: NewsFormValues) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Submitted data:", data);

      toast({
        title: isEditing ? "Berita diperbarui" : "Berita ditambahkan",
        description: isEditing
          ? "Perubahan berhasil disimpan"
          : "Berita baru berhasil ditambahkan",
      });

      navigate("/admin/berita");
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
          onClick={() => navigate("/admin/berita")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Edit Berita" : "Tambah Berita"}
        </h1>
        <AdminBreadcrumbs
          items={[
            { label: "Berita & Pengumuman", href: "/admin/berita" },
            { label: isEditing ? "Edit Berita" : "Tambah Berita" },
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
                  <FormLabel>Judul Berita</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul berita" {...field} />
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
                        <SelectItem value="published">Publikasikan</SelectItem>
                        <SelectItem value="draft">
                          Simpan sebagai draft
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
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ringkasan (Excerpt)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ringkasan singkat artikel (opsional)"
                      className="resize-none h-20"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500">
                    Ringkasan singkat yang akan ditampilkan di halaman daftar
                    berita
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featuredImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gambar Utama</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          field.onChange(e.target.files?.[0] || null);
                        }}
                      />
                      <Image className="h-4 w-4 text-gray-500" />
                    </div>
                  </FormControl>
                  <p className="text-xs text-gray-500">
                    Format: JPG, PNG. Ukuran maks: 2MB
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten Berita</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tulis konten berita di sini..."
                      className="min-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NEW: Photo Gallery Field */}
            <FormField
              control={form.control}
              name="photoGallery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Galeri Foto</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoGalleryChange}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500 mt-1">
                    Unggah beberapa foto untuk galeri. Format: JPG, PNG. Ukuran
                    maks: 2MB/foto.
                  </p>

                  {/* Preview of uploaded images */}
                  {previewImages.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Preview:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {previewImages.map((src, index) => (
                          <div
                            key={index}
                            className="relative rounded-md overflow-hidden h-24 bg-gray-100"
                          >
                            <img
                              src={src}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NEW: Related Articles Field */}
            <FormField
              control={form.control}
              name="relatedArticles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artikel Terkait</FormLabel>
                  <div className="space-y-4">
                    {availableArticles.map((article) => (
                      <FormItem
                        key={article.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(article.id)}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...(field.value || []), article.id]
                                : (field.value || []).filter(
                                    (id) => id !== article.id
                                  );
                              field.onChange(updatedValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {article.title}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Pilih artikel yang berkaitan dengan berita ini
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh: berita, nagari, event (pisahkan dengan koma)"
                      value={field.value?.join(", ") || ""}
                      onChange={(e) => {
                        const tags = e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter((tag) => tag !== "");
                        field.onChange(tags);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
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

export default NewsForm;
