import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Users,
  Map,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, href, isActive, onClick }: NavItemProps) => {
  return (
    <Link to={href} onClick={onClick}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-green-100 text-green-900"
            : "text-gray-700 hover:bg-green-50 hover:text-green-900"
        )}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isLoading } = useAuth();

  // Check authentication
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading state if still checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-gray-200 animate-spin"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  // Navigation items
  const navItems = [
    {
      icon: <LayoutDashboard className="h-4 w-4" />,
      label: "Dashboard",
      href: "/admin",
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Berita & Pengumuman",
      href: "/admin/berita",
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Layanan Digital",
      href: "/admin/layanan",
    },
    {
      icon: <ClipboardList className="h-4 w-4" />,
      label: "Pengajuan Layanan",
      href: "/admin/pengajuan",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Pengguna",
      href: "/admin/pengguna",
    },
    {
      icon: <Map className="h-4 w-4" />,
      label: "Destinasi Wisata",
      href: "/admin/pariwisata",
    },
    {
      icon: <ShoppingBag className="h-4 w-4" />,
      label: "UMKM",
      href: "/admin/umkm",
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Pengaturan",
      href: "/admin/settings",
    },
  ];

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center border-b bg-white px-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <img src="/logobaru.png" alt="Logo" className="h-8" />
        <span className="ml-2 text-lg font-semibold">Admin Nagari</span>
      </div>

      {/* Sidebar backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <img src="/logobaru.png" alt="Logo" className="h-8" />
          <span className="text-lg font-semibold">Admin Nagari</span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={closeSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <NavItem
                key={i}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={
                  location.pathname === item.href ||
                  location.pathname.startsWith(`${item.href}/`)
                }
                onClick={closeSidebar}
              />
            ))}
          </nav>
        </div>

        <div className="border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2"
              >
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src="" alt={user?.name} />
                  <AvatarFallback className="bg-green-100 text-green-800">
                    {user?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {user?.name || "Admin"}
                </span>
                <ChevronDown className="ml-auto h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/admin/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="min-h-screen p-4 pt-20 lg:pt-6">
          <main className="container mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
