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
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { mockServicesData } from "./ServicesList";

// Form schema validation
const formSchema = z.object({
  name: z.string().min(5, "Nama layanan minimal 5 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  description: z.string().min(50, "Deskripsi minimal 50 karakter"),
  estimatedTime: z.string().min(1, "Estimasi waktu harus diisi"),
  status: z.enum(["available", "maintenance"]),
  requirements: z
    .array(z.string())
    .min(1, "Minimal satu persyaratan harus diisi"),
  procedure: z.array(z.string()).min(1, "Minimal satu prosedur harus diisi"),
  fee: z.string(),
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

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(id);
  const [newRequirement, setNewRequirement] = useState("");
  const [newProcedureStep, setNewProcedureStep] = useState("");

  // Initialize form with default values
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      estimatedTime: "",
      status: "available",
      requirements: [],
      procedure: [],
      fee: "Gratis",
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
        });
      }
    }
  }, [id, form, isEditing]);

  const onSubmit = async (data: ServiceFormValues) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

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

      <div className="bg-white p-6 rounded-md shadow-sm border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Layanan</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama layanan" {...field} />
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
                      <Input placeholder="Contoh: 1-2 hari" {...field} />
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
                        <SelectItem value="available">Tersedia</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                    Masukkan "Gratis" jika layanan tidak memiliki biaya
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
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Persyaratan</FormLabel>
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
                          onChange={(e) => setNewRequirement(e.target.value)}
                          placeholder="Tambah persyaratan baru"
                        />
                        <Button type="button" onClick={addRequirement}>
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

            <div>
              <FormField
                control={form.control}
                name="procedure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prosedur/Alur Layanan</FormLabel>
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
                          onChange={(e) => setNewProcedureStep(e.target.value)}
                          placeholder="Tambah langkah prosedur baru"
                        />
                        <Button type="button" onClick={addProcedureStep}>
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

export default ServiceForm;
