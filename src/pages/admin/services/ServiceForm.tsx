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
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Upload,
  FileCheck,
  AlertCircle,
  Image,
} from "lucide-react";
import { mockServicesData } from "./ServicesList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Form schema validation
const formSchema = z.object({
  name: z.string().min(5, "Nama layanan minimal 5 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  description: z.string().min(50, "Deskripsi minimal 50 karakter"),
  estimatedTime: z.string().min(1, "Estimasi waktu harus diisi"),
  status: z.enum(["available", "maintenance", "draft"]),
  requirements: z
    .array(z.string())
    .min(1, "Minimal satu persyaratan harus diisi"),
  procedure: z.array(z.string()).min(1, "Minimal satu prosedur harus diisi"),
  fee: z.string(),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z
    .string()
    .email("Format email tidak valid")
    .optional()
    .or(z.literal("")),
  showInPublic: z.boolean().default(true),
  iconType: z.string().default("document"),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .default([]),
  benefits: z.array(z.string()).default([]),
});

type ServiceFormValues = z.infer<typeof formSchema>;

// Available categories
const categories = [
  "Kependudukan",
  "Ekonomi",
  "Pembangunan",
  "Sosial",
  "Pendidikan",
  "Kesehatan",
  "Posbakum",
];

// Available icon types
const iconTypes = [
  { value: "document", label: "Dokumen" },
  { value: "identity", label: "Identitas" },
  { value: "business", label: "Bisnis/Usaha" },
  { value: "health", label: "Kesehatan" },
  { value: "education", label: "Pendidikan" },
  { value: "social", label: "Sosial" },
  { value: "infrastructure", label: "Infrastruktur" },
  { value: "legal", label: "Hukum" },
];

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(id);
  const [newRequirement, setNewRequirement] = useState("");
  const [newProcedureStep, setNewProcedureStep] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  // Initialize form with default values
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      estimatedTime: "",
      status: "draft",
      requirements: [],
      procedure: [],
      fee: "Gratis",
      contactPerson: "",
      contactPhone: "",
      contactEmail: "",
      showInPublic: true,
      iconType: "document",
      faqs: [],
      benefits: [],
    },
  });

  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch service by ID from API
      // For now, use mock data
      const serviceItem = mockServicesData.find((item) => item.id === id);
      if (serviceItem) {
        form.reset({
          name: serviceItem.name,
          category: serviceItem.category,
          description:
            "Deskripsi layanan ini akan ditampilkan kepada masyarakat. Berisi informasi tentang manfaat dan penggunaan layanan.",
          estimatedTime: serviceItem.estimatedTime,
          status: serviceItem.status,
          requirements: serviceItem.requirements,
          procedure: [
            "Mengisi formulir permohonan",
            "Melampirkan dokumen persyaratan",
            "Verifikasi data oleh petugas",
            "Penerbitan dokumen layanan",
          ],
          fee: "Gratis",
          contactPerson: "Edo Adiyat Putra",
          contactPhone: "0852-7116-4143",
          contactEmail: "layanan@gugukmalalo.id",
          showInPublic: true,
          iconType: "document",
          faqs: [
            {
              question: "Berapa lama proses pembuatan surat?",
              answer:
                "Proses pembuatan surat membutuhkan waktu sekitar 1-2 hari kerja sejak dokumen lengkap diterima.",
            },
            {
              question: "Apakah layanan ini dikenakan biaya?",
              answer:
                "Tidak, layanan ini disediakan secara gratis untuk warga Nagari Guguak Malalo.",
            },
          ],
          benefits: [
            "Proses cepat dan mudah",
            "Tanpa biaya administrasi",
            "Dapat digunakan untuk berbagai keperluan resmi",
          ],
        });
      }
    }
  }, [id, form, isEditing]);

  const onSubmit = async (data: ServiceFormValues) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted with data:", data);

      toast({
        title: isEditing ? "Layanan diperbarui" : "Layanan ditambahkan",
        description: isEditing
          ? "Perubahan berhasil disimpan"
          : "Layanan baru berhasil ditambahkan",
      });

      navigate("/admin/layanan");
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

  const addRequirement = () => {
    if (newRequirement.trim() !== "") {
      const currentRequirements = form.getValues("requirements");
      form.setValue("requirements", [...currentRequirements, newRequirement]);
      setNewRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    const currentRequirements = form.getValues("requirements");
    form.setValue(
      "requirements",
      currentRequirements.filter((_, i) => i !== index)
    );
  };

  const addProcedureStep = () => {
    if (newProcedureStep.trim() !== "") {
      const currentSteps = form.getValues("procedure");
      form.setValue("procedure", [...currentSteps, newProcedureStep]);
      setNewProcedureStep("");
    }
  };

  const removeProcedureStep = (index: number) => {
    const currentSteps = form.getValues("procedure");
    form.setValue(
      "procedure",
      currentSteps.filter((_, i) => i !== index)
    );
  };

  const addBenefit = () => {
    if (newBenefit.trim() !== "") {
      const currentBenefits = form.getValues("benefits");
      form.setValue("benefits", [...currentBenefits, newBenefit]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    const currentBenefits = form.getValues("benefits");
    form.setValue(
      "benefits",
      currentBenefits.filter((_, i) => i !== index)
    );
  };

  const addFaq = () => {
    if (newFaqQuestion.trim() !== "" && newFaqAnswer.trim() !== "") {
      const currentFaqs = form.getValues("faqs");
      form.setValue("faqs", [
        ...currentFaqs,
        { question: newFaqQuestion, answer: newFaqAnswer },
      ]);
      setNewFaqQuestion("");
      setNewFaqAnswer("");
    }
  };

  const removeFaq = (index: number) => {
    const currentFaqs = form.getValues("faqs");
    form.setValue(
      "faqs",
      currentFaqs.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          className="mb-2"
          onClick={() => navigate("/admin/layanan")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Edit Layanan" : "Tambah Layanan"}
        </h1>
        <AdminBreadcrumbs
          items={[
            { label: "Manajemen Layanan", href: "/admin/layanan" },
            { label: isEditing ? "Edit Layanan" : "Tambah Layanan" },
          ]}
          className="mt-1"
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Form */}
            <div className="flex-1 space-y-6">
              <Tabs
                defaultValue="basic"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="basic">Dasar</TabsTrigger>
                  <TabsTrigger value="details">Detail</TabsTrigger>
                  <TabsTrigger value="contact">Kontak</TabsTrigger>
                  <TabsTrigger value="additional">Tambahan</TabsTrigger>
                </TabsList>

                {/* Basic Information Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Informasi Dasar</CardTitle>
                      <CardDescription>
                        Informasi utama tentang layanan yang akan ditampilkan
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Layanan</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Masukkan nama layanan"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                          name="estimatedTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estimasi Waktu</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Contoh: 1-2 hari"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Format: 1-2 hari, 3 jam, dsb.
                              </FormDescription>
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
                                  <SelectItem value="available">
                                    Tersedia
                                  </SelectItem>
                                  <SelectItem value="maintenance">
                                    Maintenance
                                  </SelectItem>
                                  <SelectItem value="draft">Draft</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="iconType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jenis Ikon</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih jenis ikon" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {iconTypes.map((icon) => (
                                  <SelectItem
                                    key={icon.value}
                                    value={icon.value}
                                  >
                                    {icon.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Ikon yang akan mewakili layanan ini
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Biaya</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Masukkan biaya layanan atau 'Gratis'"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Masukkan "Gratis" jika layanan tidak memiliki
                              biaya
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deskripsi Layanan</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Deskripsi lengkap tentang layanan ini..."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Details Tab */}
                <TabsContent value="details" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Persyaratan</CardTitle>
                      <CardDescription>
                        Dokumen dan syarat yang harus dipenuhi untuk mengajukan
                        layanan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <FormField
                          control={form.control}
                          name="requirements"
                          render={({ field }) => (
                            <FormItem>
                              <div className="space-y-3">
                                {field.value.map((req, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 p-2 border rounded-md bg-gray-50"
                                  >
                                    <div className="flex-grow">{req}</div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeRequirement(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <div className="flex gap-2">
                                  <Input
                                    value={newRequirement}
                                    onChange={(e) =>
                                      setNewRequirement(e.target.value)
                                    }
                                    placeholder="Tambah persyaratan baru"
                                  />
                                  <Button
                                    type="button"
                                    onClick={addRequirement}
                                  >
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
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Prosedur/Alur Layanan
                      </CardTitle>
                      <CardDescription>
                        Langkah-langkah dalam pengajuan dan pemrosesan layanan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <FormField
                          control={form.control}
                          name="procedure"
                          render={({ field }) => (
                            <FormItem>
                              <div className="space-y-3">
                                {field.value.map((step, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 p-2 border rounded-md bg-gray-50"
                                  >
                                    <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                      {index + 1}
                                    </div>
                                    <div className="flex-grow">{step}</div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeProcedureStep(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <div className="flex gap-2">
                                  <Input
                                    value={newProcedureStep}
                                    onChange={(e) =>
                                      setNewProcedureStep(e.target.value)
                                    }
                                    placeholder="Tambah langkah prosedur baru"
                                  />
                                  <Button
                                    type="button"
                                    onClick={addProcedureStep}
                                  >
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
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Manfaat</CardTitle>
                      <CardDescription>
                        Manfaat yang akan diperoleh dari layanan ini
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <FormField
                          control={form.control}
                          name="benefits"
                          render={({ field }) => (
                            <FormItem>
                              <div className="space-y-3">
                                {field.value.map((benefit, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 p-2 border rounded-md bg-gray-50"
                                  >
                                    <div className="flex-grow">{benefit}</div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeBenefit(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <div className="flex gap-2">
                                  <Input
                                    value={newBenefit}
                                    onChange={(e) =>
                                      setNewBenefit(e.target.value)
                                    }
                                    placeholder="Tambah manfaat baru"
                                  />
                                  <Button type="button" onClick={addBenefit}>
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
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Contact Tab */}
                <TabsContent value="contact" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Informasi Kontak
                      </CardTitle>
                      <CardDescription>
                        Kontak yang dapat dihubungi untuk layanan ini
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Petugas</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nama petugas yang dapat dihubungi"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Petugas yang menangani layanan ini
                            </FormDescription>
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
                                placeholder="Contoh: 0812-3456-7890"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Nomor telepon yang dapat dihubungi
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Contoh: layanan@gugukmalalo.id"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Alamat email untuk korespondensi
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Additional Tab */}
                <TabsContent value="additional" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Pertanyaan yang Sering Diajukan (FAQ)
                      </CardTitle>
                      <CardDescription>
                        Daftar pertanyaan dan jawaban yang sering ditanyakan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <FormField
                          control={form.control}
                          name="faqs"
                          render={({ field }) => (
                            <FormItem>
                              <div className="space-y-4">
                                {field.value.map((faq, index) => (
                                  <div
                                    key={index}
                                    className="p-3 border rounded-md bg-gray-50"
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-medium">
                                        {faq.question}
                                      </h4>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFaq(index)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                      {faq.answer}
                                    </p>
                                  </div>
                                ))}

                                <div className="border rounded-md p-4 space-y-3">
                                  <Input
                                    value={newFaqQuestion}
                                    onChange={(e) =>
                                      setNewFaqQuestion(e.target.value)
                                    }
                                    placeholder="Pertanyaan"
                                    className="mb-2"
                                  />
                                  <Textarea
                                    value={newFaqAnswer}
                                    onChange={(e) =>
                                      setNewFaqAnswer(e.target.value)
                                    }
                                    placeholder="Jawaban"
                                    rows={3}
                                  />
                                  <Button
                                    type="button"
                                    onClick={addFaq}
                                    className="w-full"
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Tambah FAQ
                                  </Button>
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Dokumen Pendukung
                      </CardTitle>
                      <CardDescription>
                        Formulir dan dokumen terkait layanan ini
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed rounded-md p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600">
                            Unggah formulir dan dokumen pendukung
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Mendukung format PDF, DOCX, maksimal 5MB
                          </p>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="mt-4"
                          >
                            Pilih File
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border rounded-md bg-blue-50">
                            <div className="flex items-center">
                              <FileCheck className="h-5 w-5 text-blue-500 mr-2" />
                              <div>
                                <p className="font-medium text-sm">
                                  Formulir Permohonan.pdf
                                </p>
                                <p className="text-xs text-gray-500">245 KB</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Gambar Layanan</CardTitle>
                      <CardDescription>
                        Gambar yang akan ditampilkan pada halaman layanan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        <Image className="h-8 w-8 mx-auto text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Unggah gambar untuk layanan ini
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Format JPG, PNG, maksimal 2MB
                        </p>
                        <Button variant="secondary" size="sm" className="mt-4">
                          Pilih Gambar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Pengaturan Lainnya
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="showInPublic"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Tampilkan di Halaman Publik
                              </FormLabel>
                              <FormDescription>
                                Aktifkan untuk menampilkan layanan ini di
                                halaman publik
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Publikasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Status</h4>
                    <div className="flex items-center gap-2">
                      {form.watch("status") === "available" && (
                        <Badge className="bg-green-100 text-green-800">
                          Tersedia
                        </Badge>
                      )}
                      {form.watch("status") === "maintenance" && (
                        <Badge className="bg-amber-100 text-amber-800">
                          Maintenance
                        </Badge>
                      )}
                      {form.watch("status") === "draft" && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Draft
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Navigasi Cepat</h4>
                    <div className="space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => setActiveTab("basic")}
                      >
                        <span
                          className={
                            activeTab === "basic" ? "text-blue-600" : ""
                          }
                        >
                          Informasi Dasar
                        </span>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => setActiveTab("details")}
                      >
                        <span
                          className={
                            activeTab === "details" ? "text-blue-600" : ""
                          }
                        >
                          Persyaratan & Prosedur
                        </span>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => setActiveTab("contact")}
                      >
                        <span
                          className={
                            activeTab === "contact" ? "text-blue-600" : ""
                          }
                        >
                          Informasi Kontak
                        </span>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => setActiveTab("additional")}
                      >
                        <span
                          className={
                            activeTab === "additional" ? "text-blue-600" : ""
                          }
                        >
                          FAQ & Dokumen
                        </span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Tindakan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button type="submit" className="w-full" disabled={loading}>
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
                        Simpan Layanan
                      </span>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/admin/layanan")}
                  >
                    Batal
                  </Button>

                  {isEditing && (
                    <div className="pt-4 border-t">
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Hapus Layanan
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {form.formState.errors &&
                Object.keys(form.formState.errors).length > 0 && (
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-800">
                            Error pada formulir
                          </h4>
                          <ul className="list-disc list-inside text-sm text-red-600 mt-1 space-y-1">
                            {Object.entries(form.formState.errors).map(
                              ([key, error]) => (
                                <li key={key}>{error?.message?.toString()}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ServiceForm;
