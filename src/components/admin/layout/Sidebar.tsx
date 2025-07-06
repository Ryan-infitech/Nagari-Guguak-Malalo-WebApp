import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  FileText,
  Store,
  Map,
  Users,
  Settings,
  LogOut,
  Calendar,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const AdminSidebar = () => {
  const { logout } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>(["pariwisata"]);

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Newspaper, label: "Berita & Pengumuman", path: "/admin/berita" },
    { icon: FileText, label: "Layanan Digital", path: "/admin/layanan" },
    { icon: Store, label: "UMKM & Ekonomi", path: "/admin/umkm" },
    {
      icon: Map,
      label: "Pariwisata",
      key: "pariwisata",
      path: "/admin/pariwisata",
      submenu: [
        { icon: Map, label: "Objek Wisata", path: "/admin/pariwisata" },
        { icon: Calendar, label: "Event & Festival", path: "/admin/events" },
      ],
    },
    { icon: Users, label: "Pengguna", path: "/admin/pengguna" },
    { icon: Settings, label: "Pengaturan", path: "/admin/pengaturan" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md z-10 flex flex-col">
      {/* Logo */}
      <div className="flex items-center p-4 border-b">
        <img
          src="/logobaru.png"
          alt="Logo Nagari"
          className="h-9 w-auto mr-2"
        />
        <div>
          <h1 className="text-sm font-bold text-gray-800">Admin Portal</h1>
          <p className="text-xs text-[#7ca186]">Nagari Guguak Malalo</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item, index) => (
            <li key={index} className={item.submenu ? "mb-1" : ""}>
              {item.submenu ? (
                <div className="space-y-1">
                  <button
                    onClick={() => toggleExpand(item.key)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg",
                      "transition-colors duration-150 ease-in-out",
                      "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </div>
                    {expandedItems.includes(item.key) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>

                  {expandedItems.includes(item.key) && (
                    <ul className="pl-4 space-y-1 pt-1">
                      {item.submenu.map((subitem, subindex) => (
                        <li key={subindex}>
                          <NavLink
                            to={subitem.path}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center px-3 py-2 text-sm rounded-lg",
                                "transition-colors duration-150 ease-in-out",
                                isActive
                                  ? "bg-[#7ca186]/10 text-[#7ca186] font-medium"
                                  : "text-gray-700 hover:bg-gray-100"
                              )
                            }
                          >
                            <subitem.icon className="h-4 w-4 mr-3" />
                            {subitem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2 text-sm rounded-lg",
                      "transition-colors duration-150 ease-in-out",
                      isActive
                        ? "bg-[#7ca186]/10 text-[#7ca186] font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    )
                  }
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-150 ease-in-out"
        >
          <LogOut className="h-5 w-5 mr-3 text-red-500" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
