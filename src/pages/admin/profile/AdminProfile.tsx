import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import { Save, Camera } from "lucide-react";

// Profile form schema
const profileFormSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().optional(),
  position: z.string().optional(),
});

// Password form schema
const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Masukkan password saat ini"),
    newPassword: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z
      .string()
      .min(6, "Konfirmasi password minimal 6 karakter"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password baru tidak cocok dengan konfirmasi password",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const AdminProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "Admin Nagari",
      email: user?.email || "admin@nagari-guguakmalalo.id",
      phone: "082112345678",
      position: "Administrator",
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = async (data: ProfileFormValues) => {
    setProfileLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Profil diperbarui",
        description: "Data profil Anda berhasil diperbarui",
      });
    } catch (error) {
      toast({
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setPasswordLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Password diperbarui",
        description: "Password Anda berhasil diperbarui",
      });

      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast({
        title: "Gagal menyimpan",
        description: "Password lama yang Anda masukkan salah",
        variant: "destructive",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profil Saya</h1>
        <AdminBreadcrumbs items={[{ label: "Profil" }]} className="mt-1" />
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage src={avatarPreview || ""} alt={user?.name} />
                <AvatarFallback className="text-3xl bg-green-100 text-green-800">
                  {user?.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute -right-2 -bottom-2 p-1.5 bg-white rounded-full border cursor-pointer shadow-sm hover:bg-gray-50"
              >
                <Camera className="h-4 w-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {user?.name || "Admin Nagari"}
              </h2>
              <p className="text-gray-600">
                {profileForm.getValues("position")}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {user?.email || "admin@nagari-guguakmalalo.id"}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="p-6">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Informasi Profil</TabsTrigger>
            <TabsTrigger value="password">Ubah Password</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Form {...profileForm}>
              <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={profileForm.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jabatan</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={profileLoading}>
                    {profileLoading ? (
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
                        Simpan Profil
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="password">
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Saat Ini</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Baru</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password Baru</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={passwordLoading}>
                    {passwordLoading ? (
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
                        Perbarui Password
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminProfile;
