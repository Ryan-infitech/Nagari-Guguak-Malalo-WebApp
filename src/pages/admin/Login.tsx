import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(email, password);
    if (success) {
      navigate("/admin");
    }
    setIsSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to bypass login
  const bypassLogin = async () => {
    setIsSubmitting(true);
    // Use admin credentials directly
    const success = await login("admin@nagari.id", "admin123");
    if (success) {
      navigate("/admin");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/logobaru.png" alt="Logo Nagari" className="h-16 mx-auto" />
          <h1 className="text-2xl font-bold mt-4 text-gray-800">
            Admin Portal Nagari Guguak Malalo
          </h1>
          <p className="text-gray-600 mt-1">
            Masuk untuk mengelola konten website nagari
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login Admin</CardTitle>
            <CardDescription>
              Masukkan kredensial untuk mengakses dashboard admin
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@nagari.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
            <CardFooter className="flex flex-col space-y-2">
              <Button
                type="submit"
                className="w-full bg-[#7ca186] hover:bg-[#6a8b72]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Memproses..." : "Login"}
              </Button>

              {/* Bypass login button for development */}
              <Button
                type="button"
                variant="outline"
                className="w-full border-dashed border-orange-300 text-orange-600 hover:bg-orange-50"
                onClick={bypassLogin}
                disabled={isSubmitting}
              >
                Bypass Login (Dev Mode)
              </Button>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center mt-6 text-sm text-gray-600">
          © 2024 Nagari Guguak Malalo. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
