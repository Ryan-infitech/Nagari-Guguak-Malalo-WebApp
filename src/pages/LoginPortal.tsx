import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon, Users, Lock, UserCog } from "lucide-react";
import DefaultLayout from "@/layouts/DefaultLayout";

const LoginPortal = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("warga");

  // Mock login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      // Navigate based on active tab
      if (activeTab === "warga") {
        navigate("/portal-warga");
      } else {
        navigate("/admin");
      }
    }, 1000);
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          <div className="mb-6 text-center">
            <img
              src="/logobaru.png"
              alt="Logo Nagari"
              className="h-20 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800">
              Portal Login Nagari Guguak Malalo
            </h1>
            <p className="text-gray-600 mt-2">
              Masuk untuk mengakses layanan digital nagari
            </p>
          </div>

          <Tabs
            defaultValue="warga"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="warga" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Portal Warga</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" />
                <span>Portal Admin</span>
              </TabsTrigger>
            </TabsList>

            {/* Portal Warga Login */}
            <TabsContent value="warga">
              <Card>
                <CardHeader>
                  <CardTitle>Login Portal Warga</CardTitle>
                  <CardDescription>
                    Akses layanan dan informasi khusus untuk warga Nagari Guguak
                    Malalo
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">NIK/Nomor KTP</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <Users className="h-4 w-4" />
                        </div>
                        <Input
                          id="username"
                          placeholder="Masukkan NIK/Nomor KTP"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <Lock className="h-4 w-4" />
                        </div>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password"
                          className="pl-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <a href="#" className="text-green-600 hover:underline">
                          Lupa password?
                        </a>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button
                      className="w-full bg-[#7ca186]"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Memproses..." : "Login"}
                    </Button>

                    {/* Dev Mode Bypass */}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-dashed border-amber-300 text-amber-600 hover:bg-amber-50"
                      onClick={() => navigate("/portal-warga")}
                    >
                      Bypass Login Warga (Dev Mode)
                    </Button>

                    <div className="text-center text-sm text-gray-500 mt-4">
                      Belum memiliki akun?{" "}
                      <a href="#" className="text-green-600 hover:underline">
                        Daftar sekarang
                      </a>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Admin Login */}
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Login Admin</CardTitle>
                  <CardDescription>
                    Akses khusus untuk administrator dan pengelola website
                    Nagari
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <Users className="h-4 w-4" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@nagari.id"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <Lock className="h-4 w-4" />
                        </div>
                        <Input
                          id="admin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password"
                          className="pl-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button
                      className="w-full bg-blue-600"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Memproses..." : "Login Admin"}
                    </Button>

                    {/* Dev Mode Bypass */}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-dashed border-orange-300 text-orange-600 hover:bg-orange-50"
                      onClick={() => navigate("/admin")}
                    >
                      Bypass Login Admin (Dev Mode)
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="text-center mt-6 text-sm text-gray-500">
            © 2024 Nagari Guguak Malalo. All rights reserved.
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LoginPortal;
