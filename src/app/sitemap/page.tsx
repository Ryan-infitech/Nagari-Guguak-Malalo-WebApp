import Link from "next/link";
import {
  Home,
  Info,
  FileText,
  Map,
  ShoppingBag,
  Users,
  Mail,
  Shield,
  FileQuestion,
  User,
  Newspaper,
  Landmark,
  Clock,
  Building,
  PanelRight,
} from "lucide-react";

interface SitemapLinkProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description?: string;
}

const SitemapLink = ({ href, icon, title, description }: SitemapLinkProps) => {
  return (
    <Link
      href={href}
      className="flex items-start p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-[#7ca186] transition-all group"
    >
      <div className="bg-[#7ca186]/10 p-3 rounded-full mr-4 group-hover:bg-[#7ca186] group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-800 group-hover:text-[#7ca186]">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </Link>
  );
};

interface SitemapSectionProps {
  title: string;
  children: React.ReactNode;
}

const SitemapSection = ({ title, children }: SitemapSectionProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
};

export default function Sitemap() {
  return (
    <main>
      {/* Hero Section with added padding-top */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-600 to-[#7ca186] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Peta Situs</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Navigasi lengkap untuk semua halaman dan layanan Portal Digital
            Nagari Guguak Malalo
          </p>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-lg text-gray-600 mb-10">
              Gunakan peta situs ini untuk menemukan halaman atau layanan
              spesifik yang Anda cari di Portal Digital Nagari Guguak Malalo.
              Klik pada tautan untuk langsung mengakses halaman yang diinginkan.
            </p>

            {/* Main Pages Section */}
            <SitemapSection title="Halaman Utama">
              <SitemapLink
                href="/"
                icon={<Home size={20} />}
                title="Beranda"
                description="Halaman utama portal digital"
              />
              <SitemapLink
                href="/profil"
                icon={<Info size={20} />}
                title="Profil Nagari"
                description="Sejarah dan informasi umum tentang Nagari"
              />
              <SitemapLink
                href="/team-developer"
                icon={<Users size={20} />}
                title="Tim Pengembang"
                description="Profil tim yang mengembangkan portal"
              />
            </SitemapSection>

            {/* Services Section */}
            <SitemapSection title="Layanan Digital">
              <SitemapLink
                href="/layanan"
                icon={<FileText size={20} />}
                title="Semua Layanan"
                description="Daftar lengkap layanan administratif"
              />
              <SitemapLink
                href="/layanan/domisili"
                icon={<Building size={20} />}
                title="Surat Keterangan Domisili"
                description="Permohonan surat keterangan tempat tinggal"
              />
              <SitemapLink
                href="/layanan/sktm"
                icon={<FileText size={20} />}
                title="Surat Keterangan Tidak Mampu"
                description="Permohonan SKTM untuk berbagai keperluan"
              />
              <SitemapLink
                href="/layanan/umkm"
                icon={<ShoppingBag size={20} />}
                title="Pendaftaran UMKM"
                description="Registrasi usaha mikro, kecil dan menengah"
              />
              <SitemapLink
                href="/layanan/bantuan-sosial"
                icon={<Landmark size={20} />}
                title="Bantuan Sosial"
                description="Informasi dan pendaftaran bantuan sosial"
              />
              <SitemapLink
                href="/portal-warga"
                icon={<PanelRight size={20} />}
                title="Portal Warga"
                description="Akses layanan khusus untuk warga terdaftar"
              />
            </SitemapSection>

            {/* Tourism & Economy Section */}
            <SitemapSection title="Pariwisata & Ekonomi">
              <SitemapLink
                href="/pariwisata"
                icon={<Map size={20} />}
                title="Pariwisata"
                description="Destinasi wisata dan informasi pengunjung"
              />
              <SitemapLink
                href="/umkm"
                icon={<ShoppingBag size={20} />}
                title="UMKM & Ekonomi"
                description="Direktori usaha dan produk lokal"
              />
            </SitemapSection>

            {/* Information Section */}
            <SitemapSection title="Informasi & Berita">
              <SitemapLink
                href="/informasi"
                icon={<Newspaper size={20} />}
                title="Informasi Publik"
                description="Pengumuman resmi dan informasi penting"
              />
              <SitemapLink
                href="/berita"
                icon={<Clock size={20} />}
                title="Berita Terbaru"
                description="Berita dan kegiatan terkini di Nagari"
              />
            </SitemapSection>

            {/* Other Pages */}
            <SitemapSection title="Halaman Lainnya">
              <SitemapLink
                href="/kontak"
                icon={<Mail size={20} />}
                title="Kontak Kami"
                description="Informasi kontak dan formulir komunikasi"
              />
              <SitemapLink
                href="/faq"
                icon={<FileQuestion size={20} />}
                title="FAQ"
                description="Pertanyaan yang sering diajukan"
              />
              <SitemapLink
                href="/login"
                icon={<User size={20} />}
                title="Login"
                description="Akses ke akun pengguna terdaftar"
              />
              <SitemapLink
                href="/privacy"
                icon={<Shield size={20} />}
                title="Kebijakan Privasi"
                description="Informasi tentang penggunaan data pribadi"
              />
              <SitemapLink
                href="/terms"
                icon={<FileText size={20} />}
                title="Syarat & Ketentuan"
                description="Persyaratan penggunaan layanan"
              />
            </SitemapSection>
          </div>
        </div>
      </section>
    </main>
  );
}
