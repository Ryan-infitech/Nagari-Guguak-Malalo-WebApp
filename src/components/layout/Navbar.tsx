import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const layananItems = [
    {
      title: "Layanan Kependudukan",
      items: [
        { name: "Surat Keterangan Domisili", href: "/layanan/domisili" },
        { name: "Surat Keterangan Tidak Mampu", href: "/layanan/sktm" },
        { name: "Surat Keterangan Usaha", href: "/layanan/usaha" },
        { name: "Surat Keterangan Kelahiran", href: "/layanan/kelahiran" },
        { name: "Legalisir Dokumen", href: "/layanan/legalisir" },
      ],
    },
    {
      title: "Layanan Pembangunan",
      items: [
        { name: "Bantuan Pembangunan", href: "/layanan/bantuan-pembangunan" },
        { name: "Laporan Kerusakan", href: "/layanan/laporan-kerusakan" },
        { name: "Monitoring Proyek", href: "/layanan/monitoring" },
      ],
    },
    {
      title: "Layanan Ekonomi & Sosial",
      items: [
        { name: "Pendaftaran UMKM", href: "/layanan/umkm" },
        { name: "Bantuan Sosial", href: "/layanan/bantuan-sosial" },
        { name: "Program Pemberdayaan", href: "/layanan/pemberdayaan" },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#7ca186]/10 shadow-sm">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#7ca186] to-blue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2 md:space-x-6">
              <div className="flex items-center space-x-1 md:space-x-2">
                <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">
                  <span className="hidden sm:inline">
                    Nagari GuguakMalalo,{" "}
                  </span>
                  <span>Kab. Tanah Datar</span>
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(0752) 123-4567</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <Mail className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">
                <span className="hidden sm:inline">info@</span>
                <span className="sm:hidden">@</span>
                gugukmalalo.id
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/tanahdatar.png"
              alt="Logo Tanah Datar"
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Nagari GuguakMalalo
              </h1>
              <p className="text-sm text-[#7ca186]">Portal Digital Nagari</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-[#7ca186] ${
                isActive("/") ? "text-[#7ca186]" : "text-gray-700"
              }`}
            >
              Beranda
            </Link>

            <Link
              to="/profil"
              className={`font-medium transition-colors hover:text-[#7ca186] ${
                isActive("/profil") ? "text-[#7ca186]" : "text-gray-700"
              }`}
            >
              Profil Nagari
            </Link>

            {/* Layanan Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("layanan")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 font-medium text-gray-700 hover:text-[#7ca186] transition-colors">
                <span>Layanan Digital</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeDropdown === "layanan" && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-4 z-50">
                  {layananItems.map((category, idx) => (
                    <div key={idx} className="px-4 py-2">
                      <h3 className="font-semibold text-[#7ca186] mb-2">
                        {category.title}
                      </h3>
                      {category.items.map((item, itemIdx) => (
                        <Link
                          key={itemIdx}
                          to={item.href}
                          className="block px-2 py-1 text-sm text-gray-600 hover:text-[#7ca186] hover:bg-[#7ca186]/5 rounded transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/umkm"
              className={`font-medium transition-colors hover:text-green-600 ${
                isActive("/umkm") ? "text-green-600" : "text-gray-700"
              }`}
            >
              UMKM & Ekonomi
            </Link>

            <Link
              to="/pariwisata"
              className={`font-medium transition-colors hover:text-green-600 ${
                isActive("/pariwisata") ? "text-green-600" : "text-gray-700"
              }`}
            >
              Pariwisata
            </Link>

            <Link
              to="/informasi"
              className={`font-medium transition-colors hover:text-green-600 ${
                isActive("/informasi") ? "text-green-600" : "text-gray-700"
              }`}
            >
              Informasi
            </Link>

            <Link
              to="/kontak"
              className={`font-medium transition-colors hover:text-green-600 ${
                isActive("/kontak") ? "text-green-600" : "text-gray-700"
              }`}
            >
              Kontak
            </Link>

            <Button className="bg-gradient-to-r from-[#7ca186] to-blue-600 hover:from-[#6a8b72] hover:to-blue-700 text-white">
              Portal Warga
            </Button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-[#7ca186] font-medium"
              >
                Beranda
              </Link>
              <Link
                to="/profil"
                className="text-gray-700 hover:text-[#7ca186] font-medium"
              >
                Profil Nagari
              </Link>
              <Link
                to="/layanan"
                className="text-gray-700 hover:text-[#7ca186] font-medium"
              >
                Layanan Digital
              </Link>
              <Link
                to="/umkm"
                className="text-gray-700 hover:text-[#7ca186] font-medium"
              >
                UMKM & Ekonomi
              </Link>
              <Link
                to="/pariwisata"
                className="text-gray-700 hover:text-[#7ca186] font-medium"
              >
                Pariwisata
              </Link>
              <Link
                to="/informasi"
                className="text-gray-700 hover:text-[#7ca186] font-medium"
              >
                Informasi
              </Link>
              <Link
                to="/kontak"
                className="text-gray-700 hover:text-[#7ca186] font-medium"
              >
                Kontak
              </Link>
              <Button className="bg-gradient-to-r from-[#7ca186] to-blue-600 w-fit">
                Portal Warga
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
