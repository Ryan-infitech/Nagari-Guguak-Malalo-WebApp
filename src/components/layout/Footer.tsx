import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

// Custom scroll-to-top link component
const ScrollToTopLink = ({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logobaru.png"
                alt="Logo Nagari Guguak Malalo"
                className="w-12 h-12 object-contain bg-white rounded-full p-0.5"
              />
              <div>
                <h3 className="text-xl font-bold">Nagari Guguak Malalo</h3>
                <p className="text-sm text-green-200">Portal Digital Nagari</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Portal digital resmi Nagari Guguak Malalo yang menyediakan layanan
              administrasi online dan informasi terkini tentang potensi
              pariwisata serta ekonomi daerah.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-300">
              Navigasi Cepat
            </h4>
            <div className="space-y-2">
              <Link
                to="/profil"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Profil Nagari
              </Link>
              <Link
                to="/layanan"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Layanan Digital
              </Link>
              <Link
                to="/umkm"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                UMKM & Ekonomi
              </Link>
              <Link
                to="/pariwisata"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Pariwisata
              </Link>
              <Link
                to="/informasi"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Informasi Publik
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-300">
              Layanan Utama
            </h4>
            <div className="space-y-2">
              <Link
                to="/layanan/domisili"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Surat Domisili
              </Link>
              <Link
                to="/layanan/sktm"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                SKTM
              </Link>
              <Link
                to="/layanan/umkm"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Pendaftaran UMKM
              </Link>
              <Link
                to="/layanan/bantuan-sosial"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Bantuan Sosial
              </Link>
              <Link
                to="/portal-warga"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Portal Warga
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-300">
              Kontak Kami
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Kantor Wali Nagari Guguak Malalo</p>
                  <p>
                    Kecamatan Batipuh Selatan, Kabupaten Tanah Datar, Sumatera
                    Barat 27265
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-300" />
                <span className="text-sm text-gray-300">(0752) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-300" />
                <span className="text-sm text-gray-300">
                  info@gugukmalalo.id
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Nagari Guguak Malalo & KKN UNP GUGUAKMALALO 2025. Seluruh
              hak cipta dilindungi.
            </p>
            <div className="flex space-x-6 text-sm">
              <ScrollToTopLink
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Kebijakan Privasi
              </ScrollToTopLink>
              <ScrollToTopLink
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Syarat & Ketentuan
              </ScrollToTopLink>
              <ScrollToTopLink
                to="/sitemap"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Peta Situs
              </ScrollToTopLink>
              <ScrollToTopLink
                to="/team-developer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Team Developer
              </ScrollToTopLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
