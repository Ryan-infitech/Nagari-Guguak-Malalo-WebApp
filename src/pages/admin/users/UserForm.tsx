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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import { ArrowLeft, Save } from "lucide-react";
import { mockUsersData } from "./UsersList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Form schema validation
const formSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  role: z.enum(["admin", "editor", "viewer"], {
    required_error: "Pilih peran pengguna",
  }),
  status: z.enum(["active", "inactive"]),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .optional()
    .or(z.literal("")),
  passwordConfirmation: z.string().optional().or(z.literal("")),
  sendInvitation: z.boolean().default(true),
});

type UserFormValues = z.infer<typeof formSchema>;

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(id);

  // Initialize form with default values
  const form = useForm<UserFormValues>({
    resolver: zodResolver(
      formSchema.refine(
        (data) => !data.password || data.password === data.passwordConfirmation,
        {
          message: "Password tidak cocok",
          path: ["passwordConfirmation"],
        }
      )
    ),
    defaultValues: {
      name: "",
      email: "",
      role: "viewer",
      status: "active",
      password: "",
      passwordConfirmation: "",
      sendInvitation: true,
    },
  });

  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch user by ID from API
      // For now, use mock data
      const userData = mockUsersData.find((user) => user.id === id);
      if (userData) {
        form.reset({
          name: userData.name,
          email: userData.email,
          role: userData.role,
          status: userData.status,
          password: "",
          passwordConfirmation: "",
          sendInvitation: false,
        });
      }
    }
  }, [id, form, isEditing]);

  const onSubmit = async (data: UserFormValues) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: isEditing ? "Pengguna diperbarui" : "Pengguna ditambahkan",
        description: isEditing
          ? `Data ${data.name} berhasil diperbarui`
          : `${data.name} berhasil ditambahkan sebagai ${
              data.role === "admin"
                ? "Administrator"
                : data.role === "editor"
                ? "Editor"
                : "Pembaca"
            }`,
      });

      navigate("/admin/users");
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
          onClick={() => navigate("/admin/users")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Edit Pengguna" : "Tambah Pengguna"}
        </h1>
        <AdminBreadcrumbs
          items={[
            { label: "Pengguna", href: "/admin/users" },
            { label: isEditing ? "Edit Pengguna" : "Tambah Pengguna" },
          ]}
          className="mt-1"
        />
      </div>

      <div className="bg-white p-6 rounded-md shadow-sm border">
        <div className="mb-6">
          {isEditing && (
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl bg-green-100 text-green-800">
                  {form.getValues("name").charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">
                  {form.getValues("name")}
                </h2>
                <p className="text-gray-500">{form.getValues("email")}</p>
              </div>
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="contoh@email.com"
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peran Pengguna</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih peran" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Pembaca</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Administrator memiliki akses penuh, Editor dapat mengelola
                      konten, Pembaca hanya dapat melihat.
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
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="inactive">Tidak Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Pengguna tidak aktif tidak dapat login ke sistem.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!isEditing && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder={
                              isEditing ? "••••••" : "Masukkan password"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passwordConfirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Konfirmasi password"
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
                  name="sendInvitation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Kirim Email Undangan
                        </FormLabel>
                        <FormDescription>
                          Kirim email ke pengguna baru dengan instruksi login
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
              </>
            )}

            {isEditing && (
              <div className="border-t pt-6 mt-6">
                <h3 className="text-sm font-medium mb-4">Reset Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Baru</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Kosongkan jika tidak ingin mengganti"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Kosongkan jika tidak ingin mengubah password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passwordConfirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password Baru</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Konfirmasi password baru"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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

export default UserForm;
