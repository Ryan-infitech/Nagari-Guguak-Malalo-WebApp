import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Users,
  Building,
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  BarChart2,
  HeartPulse,
  Scale,
  ArrowRight,
  FileCheck,
  Home,
  Briefcase,
  School,
  Landmark,
  Baby,
  FileX2,
  ScrollText,
  UserCheck,
  Hammer,
  HelpCircle,
  GraduationCap,
  Stethoscope,
  FileArchive,
  Building2,
} from "lucide-react";

const LayananDigital = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [activeTab, setActiveTab] = useState("kependudukan");

  // Automatically set active tab based on URL parameter
  useEffect(() => {
    if (category && serviceCategories.find((cat) => cat.id === category)) {
      setActiveTab(category);
    }
  }, [category]);

  // Service categories with consistent color tones
  const serviceCategories = [
    {
      id: "kependudukan",
      title: "Layanan Administrasi Digital",
      icon: <FileText className="h-16 w-16 text-emerald-500" />,
      description:
        "Berbagai layanan administrasi kependudukan untuk warga Nagari Guguak malalo",
      color: "from-emerald-50 to-emerald-100",
      iconColor: "text-emerald-500",
    },
    {
      id: "pembangunan",
      title: "Layanan Pembangunan",
      icon: <Building className="h-16 w-16 text-amber-500" />,
      description: "Layanan terkait pembangunan dan infrastruktur nagari",
      color: "from-amber-50 to-amber-100",
      iconColor: "text-amber-500",
    },

    {
      id: "sosial",
      title: "Layanan Sosial",
      icon: <Heart className="h-16 w-16 text-rose-500" />,
      description: "Program bantuan dan pemberdayaan masyarakat",
      color: "from-rose-50 to-rose-100",
      iconColor: "text-rose-500",
    },
    {
      id: "ekonomi",
      title: "Layanan Ekonomi",
      icon: <BarChart2 className="h-16 w-16 text-blue-500" />,
      description: "Dukungan untuk pengembangan usaha dan ekonomi masyarakat",
      color: "from-blue-50 to-blue-100",
      iconColor: "text-blue-500",
    },
    {
      id: "pendidikan",
      title: "Layanan Pendidikan",
      icon: <BookOpen className="h-16 w-16 text-teal-500" />,
      description: "Informasi dan dukungan untuk pendidikan",
      color: "from-teal-50 to-teal-100",
      iconColor: "text-teal-500",
    },
    {
      id: "kesehatan",
      title: "Layanan Kesehatan",
      icon: <HeartPulse className="h-16 w-16 text-red-500" />,
      description: "Layanan terkait kesehatan masyarakat",
      color: "from-red-50 to-red-100",
      iconColor: "text-red-500",
    },
    {
      id: "posbakum",
      title: "Layanan Bantuan Hukum",
      icon: <Scale className="h-16 w-16 text-purple-500" />,
      description: "Layanan bantuan hukum dan konsultasi legal",
      color: "from-purple-50 to-purple-100",
      iconColor: "text-purple-500",
    },
  ];

  // Enhanced service data with icons and descriptions
  const layananKependudukan = [
    {
      id: "domisili",
      nama: "Surat Keterangan Domisili",
      estimasi: "1-2 hari",
      status: "available",
      icon: <Home className="h-10 w-10 text-emerald-500" />,
      deskripsi:
        "Surat pengantar yang menyatakan tempat tinggal resmi penduduk untuk keperluan administrasi.",
      persyaratan: [
        "Fotokopi KTP",
        "Fotokopi Kartu Keluarga",
        "Surat Pengantar RT/RW",
      ],
      biaya: "Gratis",
      prosedur: [
        "Mengisi formulir permohonan di kantor nagari atau melalui website",
        "Melampirkan dokumen persyaratan",
        "Menunggu verifikasi data oleh petugas (1-2 hari)",
        "Pengambilan surat di kantor nagari atau cetak mandiri (e-document)",
      ],
      kontak: {
        petugas: "Edo Adiyat Putra",
        telepon: "0852-7116-4143",
        email: "layanan@gugukmalalo.id",
      },
      berkas: [
        { nama: "Formulir Permohonan", url: "/berkas/form-domisili.pdf" },
        { nama: "Contoh Surat Domisili", url: "/berkas/contoh-domisili.pdf" },
      ],
      faq: [
        {
          pertanyaan: "Berapa lama masa berlaku surat keterangan domisili?",
          jawaban:
            "Surat keterangan domisili umumnya berlaku selama 6 bulan sejak tanggal diterbitkan.",
        },
        {
          pertanyaan: "Apakah bisa diwakilkan oleh orang lain?",
          jawaban:
            "Bisa, dengan membawa surat kuasa dan fotokopi KTP pemberi kuasa dan penerima kuasa.",
        },
      ],
    },
    {
      id: "sktm",
      nama: "Surat Keterangan Tidak Mampu (SKTM)",
      estimasi: "2-3 hari",
      status: "available",
      icon: <FileCheck className="h-10 w-10 text-emerald-500" />,
      deskripsi:
        "Surat yang menerangkan keadaan ekonomi warga untuk mendapatkan bantuan atau keringanan biaya.",
      persyaratan: [
        "Fotokopi KTP",
        "Fotokopi Kartu Keluarga",
        "Surat Pengantar RT/RW",
        "Bukti pendukung (jika ada)",
      ],
      biaya: "Gratis",
      prosedur: [
        "Mengajukan permohonan SKTM ke kantor nagari",
        "Melengkapi formulir dan dokumen persyaratan",
        "Verifikasi kondisi ekonomi oleh petugas",
        "Penerbitan SKTM oleh Wali Nagari",
      ],
      kontak: {
        petugas: "Junaida. A",
        telepon: "0852-3457-8901",
        email: "layanan@gugukmalalo.id",
      },
      berkas: [{ nama: "Formulir SKTM", url: "/berkas/form-sktm.pdf" }],
      faq: [
        {
          pertanyaan: "Untuk keperluan apa saja SKTM dapat digunakan?",
          jawaban:
            "SKTM dapat digunakan untuk keperluan pendidikan (beasiswa, keringanan biaya sekolah), kesehatan (keringanan biaya rumah sakit), dan keperluan administratif lainnya yang membutuhkan bukti ketidakmampuan ekonomi.",
        },
        {
          pertanyaan: "Berapa lama masa berlaku SKTM?",
          jawaban:
            "SKTM umumnya berlaku selama 3 bulan sejak tanggal penerbitan, tergantung keperluan penggunaan.",
        },
      ],
    },
    {
      nama: "Surat Keterangan Usaha",
      estimasi: "1-2 hari",
      status: "available",
      icon: <Briefcase className="h-10 w-10 text-emerald-500" />,
      deskripsi:
        "Surat untuk legalitas usaha mikro dan kecil yang berlokasi di wilayah nagari.",
      persyaratan: [
        "Fotokopi KTP",
        "Foto Lokasi Usaha",
        "Surat Pernyataan Memiliki Usaha",
      ],
      biaya: "Gratis",
    },
    {
      nama: "Surat Keterangan Kelahiran",
      estimasi: "1 hari",
      status: "available",
      icon: <Baby className="h-10 w-10 text-emerald-500" />,
      deskripsi:
        "Surat pengantar untuk pengurusan akta kelahiran atau pencatatan administrasi kelahiran.",
      persyaratan: [
        "Surat Keterangan Lahir dari Bidan/RS",
        "Fotokopi KTP Orang Tua",
        "Fotokopi Buku Nikah",
      ],
      biaya: "Gratis",
    },
    {
      nama: "Surat Keterangan Kematian",
      estimasi: "1 hari",
      status: "available",
      icon: <FileX2 className="h-10 w-10 text-emerald-500" />,
      deskripsi:
        "Surat pengantar untuk pengurusan akta kematian dan administrasi lain terkait kematian.",
      persyaratan: [
        "Surat Kematian dari RS/Puskesmas",
        "Fotokopi KTP Almarhum",
        "Fotokopi KK",
      ],
      biaya: "Gratis",
    },
    {
      nama: "Surat Pengantar KTP/KK",
      estimasi: "1 hari",
      status: "available",
      icon: <UserCheck className="h-10 w-10 text-emerald-500" />,
      deskripsi:
        "Surat pengantar untuk pembuatan atau perpanjangan KTP dan Kartu Keluarga.",
      persyaratan: [
        "Fotokopi KTP (untuk perpanjangan)",
        "Pas Foto 3x4",
        "Fotokopi KK",
      ],
      biaya: "Gratis",
    },
    {
      nama: "Legalisir Dokumen",
      estimasi: "1 hari",
      status: "available",
      icon: <ScrollText className="h-10 w-10 text-emerald-500" />,
      deskripsi:
        "Pengesahan dokumen untuk keperluan administrasi dan pengakuan keaslian dokumen.",
      persyaratan: ["Dokumen asli", "Fotokopi dokumen yang akan dilegalisir"],
      biaya: "Gratis",
    },
  ];

  const layananPembangunan = [
    {
      id: "bantuan-pembangunan",
      nama: "Pengajuan Bantuan Pembangunan",
      estimasi: "7-14 hari",
      status: "available",
      icon: <Building2 className="h-10 w-10 text-amber-500" />,
      deskripsi:
        "Pengajuan bantuan untuk proyek pembangunan infrastruktur di tingkat RT/RW atau lingkungan.",
      persyaratan: [
        "Proposal pengajuan",
        "RAB (Rencana Anggaran Biaya)",
        "Surat dukungan masyarakat",
        "Dokumentasi lokasi",
      ],
      biaya: "Gratis",
      prosedur: [
        "Penyusunan proposal dan RAB",
        "Pengajuan ke kantor nagari",
        "Evaluasi dan verifikasi",
        "Persetujuan dan pencairan dana",
      ],
      kontak: {
        petugas: "Ajisman",
        telepon: "0853-7645-8901",
        email: "pembangunan@gugukmalalo.id",
      },
      berkas: [
        { nama: "Template Proposal", url: "/berkas/template-proposal.doc" },
        { nama: "Format RAB", url: "/berkas/format-rab.xls" },
      ],
      faq: [
        {
          pertanyaan: "Berapa nilai maksimal bantuan yang bisa diajukan?",
          jawaban:
            "Nilai maksimal bantuan tergantung pada jenis proyek dan ketersediaan anggaran nagari. Untuk infrastruktur kecil biasanya maksimal Rp 25 juta.",
        },
      ],
    },
    {
      id: "laporan-kerusakan",
      nama: "Laporan Kerusakan Infrastruktur",
      estimasi: "1-3 hari",
      status: "available",
      icon: <Hammer className="h-10 w-10 text-amber-500" />,
      deskripsi:
        "Pelaporan kerusakan jalan, jembatan, saluran air, dan infrastruktur umum lainnya.",
      persyaratan: [
        "Foto kerusakan",
        "Lokasi detail",
        "Informasi kontak pelapor",
      ],
      biaya: "Gratis",
      prosedur: [
        "Mengisi formulir laporan",
        "Melampirkan foto dan keterangan",
        "Verifikasi lapangan oleh petugas",
        "Tindak lanjut perbaikan",
      ],
      kontak: {
        petugas: "Yunarman",
        telepon: "0852-7890-1234",
        email: "infrastruktur@gugukmalalo.id",
      },
      faq: [
        {
          pertanyaan: "Berapa lama infrastruktur akan diperbaiki?",
          jawaban:
            "Waktu perbaikan tergantung tingkat kerusakan dan prioritas. Kerusakan ringan biasanya 7-14 hari, kerusakan berat 1-3 bulan tergantung anggaran.",
        },
      ],
    },
  ];

  const layananEkonomi = [
    {
      id: "pendaftaran-umkm",
      nama: "Pendaftaran UMKM",
      estimasi: "3-5 hari",
      status: "available",
      icon: <Briefcase className="h-10 w-10 text-blue-500" />,
      deskripsi:
        "Pendaftaran usaha mikro kecil menengah untuk masuk dalam database UMKM nagari.",
      persyaratan: [
        "Fotokopi KTP",
        "Foto usaha",
        "Deskripsi usaha",
        "NPWP (jika ada)",
      ],
      biaya: "Gratis",
      prosedur: [
        "Mengisi formulir pendaftaran",
        "Melengkapi dokumen persyaratan",
        "Verifikasi usaha",
        "Penerbitan surat keterangan UMKM",
      ],
      kontak: {
        petugas: "Hadiyati M",
        telepon: "0853-4567-1234",
        email: "umkm@gugukmalalo.id",
      },
      berkas: [
        { nama: "Formulir Pendaftaran UMKM", url: "/berkas/form-umkm.pdf" },
      ],
      faq: [
        {
          pertanyaan: "Apa manfaat mendaftarkan UMKM di nagari?",
          jawaban:
            "Mendapatkan akses ke program bantuan modal, pelatihan, pemasaran produk, dan kemudahan akses permodalan dari lembaga keuangan.",
        },
      ],
    },
    {
      id: "surat-izin-usaha-mikro",
      nama: "Surat Izin Usaha Mikro",
      estimasi: "5-7 hari",
      status: "available",
      icon: <FileCheck className="h-10 w-10 text-blue-500" />,
      deskripsi:
        "Pengurusan surat izin untuk usaha mikro dan kecil di wilayah nagari.",
      persyaratan: [
        "Fotokopi KTP",
        "Fotokopi KK",
        "Formulir permohonan",
        "Foto lokasi usaha",
      ],
      biaya: "Gratis",
    },
    {
      id: "bantuan-modal-usaha",
      nama: "Bantuan Modal Usaha",
      estimasi: "14-21 hari",
      status: "available",
      icon: <Landmark className="h-10 w-10 text-blue-500" />,
      deskripsi:
        "Pengajuan bantuan modal untuk pengembangan usaha mikro dan kecil.",
      persyaratan: [
        "Proposal usaha",
        "Fotokopi KTP",
        "Surat keterangan usaha",
        "Rencana penggunaan dana",
      ],
      biaya: "Gratis",
    },
    {
      id: "pendaftaran-pelatihan-kewirausahaan",
      nama: "Pendaftaran Pelatihan Kewirausahaan",
      estimasi: "1 hari",
      status: "available",
      icon: <Users className="h-10 w-10 text-blue-500" />,
      deskripsi:
        "Pendaftaran program pelatihan keterampilan dan pengembangan usaha untuk masyarakat.",
      persyaratan: ["Fotokopi KTP", "Formulir pendaftaran"],
      biaya: "Gratis",
    },
  ];

  const layananSosial = [
    {
      id: "bantuan-sosial",
      nama: "Pendaftaran Bantuan Sosial",
      estimasi: "7-10 hari",
      status: "available",
      icon: <Heart className="h-10 w-10 text-rose-500" />,
      deskripsi:
        "Pendaftaran untuk program bantuan sosial bagi warga yang membutuhkan.",
      persyaratan: ["Fotokopi KTP", "Fotokopi KK", "SKTM", "Foto rumah"],
      biaya: "Gratis",
      prosedur: [
        "Mendaftarkan diri sebagai penerima bantuan",
        "Melengkapi dokumen persyaratan",
        "Verifikasi dan validasi data",
        "Penerimaan bantuan",
      ],
      kontak: {
        petugas: "Fidrianis",
        telepon: "0852-9876-5432",
        email: "sosial@gugukmalalo.id",
      },
      faq: [
        {
          pertanyaan: "Kapan bantuan sosial disalurkan?",
          jawaban:
            "Bantuan sosial disalurkan sesuai program yang berlaku, umumnya setiap awal bulan atau pada momentum tertentu seperti hari besar.",
        },
      ],
    },
    {
      id: "program-pemberdayaan",
      nama: "Pendaftaran Program Pemberdayaan",
      estimasi: "3-5 hari",
      status: "available",
      icon: <Users className="h-10 w-10 text-rose-500" />,
      deskripsi:
        "Pendaftaran untuk mengikuti program pemberdayaan ekonomi dan sosial masyarakat nagari.",
      persyaratan: [
        "Fotokopi KTP",
        "Surat keterangan domisili",
        "Formulir pendaftaran",
      ],
      biaya: "Gratis",
      prosedur: [
        "Mengisi formulir pendaftaran",
        "Verifikasi kelayakan",
        "Seleksi peserta",
        "Pengumuman hasil seleksi",
      ],
      kontak: {
        petugas: "M. Ihsan",
        telepon: "0853-2345-6789",
        email: "pemberdayaan@gugukmalalo.id",
      },
      faq: [
        {
          pertanyaan: "Apa saja program pemberdayaan yang tersedia?",
          jawaban:
            "Program pemberdayaan yang tersedia meliputi pelatihan keterampilan, kewirausahaan, pertanian modern, pengolahan hasil tani, dan kerajinan tangan.",
        },
      ],
    },
  ];

  // Placeholder data for other service categories with enhanced dummy data
  const layananPosbakum = [
    {
      id: "konsultasi-hukum",
      nama: "Konsultasi Hukum",
      estimasi: "1-2 hari",
      status: "available",
      icon: <Scale className="h-10 w-10 text-purple-500" />,
      deskripsi:
        "Layanan konsultasi hukum gratis untuk masyarakat nagari mengenai berbagai persoalan hukum.",
      persyaratan: ["Fotokopi KTP", "Dokumen pendukung (jika ada)"],
      biaya: "Gratis",
      prosedur: [
        "Mendaftar untuk konsultasi",
        "Jadwal pertemuan dengan konsultan hukum",
        "Sesi konsultasi",
        "Tindak lanjut jika diperlukan",
      ],
      kontak: {
        petugas: "Gusrizal",
        telepon: "0853-7890-1234",
        email: "hukum@gugukmalalo.id",
      },
      faq: [
        {
          pertanyaan: "Apakah konsultasi dijamin kerahasiaannya?",
          jawaban:
            "Ya, semua konsultasi bersifat rahasia dan dijamin kerahasiaannya oleh petugas hukum nagari.",
        },
      ],
    },
  ];

  const layananPendidikan = [
    {
      id: "beasiswa",
      nama: "Beasiswa Pendidikan",
      estimasi: "14-30 hari",
      status: "available",
      icon: <BookOpen className="h-10 w-10 text-teal-500" />,
      deskripsi:
        "Program beasiswa pendidikan untuk siswa dan mahasiswa berprestasi dari keluarga kurang mampu.",
      persyaratan: [
        "Fotokopi KTP/Kartu Pelajar",
        "Fotokopi KK",
        "Rapor/transkrip nilai",
        "Surat keterangan tidak mampu",
        "Surat keterangan aktif sekolah/kuliah",
      ],
      biaya: "Gratis",
      prosedur: [
        "Mengisi formulir pendaftaran",
        "Melengkapi dokumen persyaratan",
        "Seleksi administrasi dan akademik",
        "Pengumuman penerima beasiswa",
      ],
      kontak: {
        petugas: "Yulia Helda",
        telepon: "0852-3456-7890",
        email: "pendidikan@gugukmalalo.id",
      },
      faq: [
        {
          pertanyaan: "Berapa nilai beasiswa yang diberikan?",
          jawaban:
            "Nilai beasiswa bervariasi sesuai jenjang pendidikan: SD Rp 500.000/semester, SMP Rp 750.000/semester, SMA/SMK Rp 1.000.000/semester, dan Perguruan Tinggi Rp 1.500.000/semester.",
        },
      ],
    },
  ];

  const layananKesehatan = [
    {
      id: "surat-sehat",
      nama: "Surat Keterangan Sehat",
      estimasi: "1 hari",
      status: "available",
      icon: <HeartPulse className="h-10 w-10 text-red-500" />,
      deskripsi:
        "Penerbitan surat keterangan sehat untuk keperluan administrasi dan dokumen.",
      persyaratan: [
        "Fotokopi KTP",
        "Pas foto 4x6 (2 lembar)",
        "Pemeriksaan kesehatan di puskesmas",
      ],
      biaya: "Gratis",
      prosedur: [
        "Mendaftar di puskesmas/polindes",
        "Pemeriksaan kesehatan",
        "Penerbitan surat keterangan sehat",
      ],
      kontak: {
        petugas: "Indah Permata Sari",
        telepon: "0852-8765-4321",
        email: "kesehatan@gugukmalalo.id",
      },
      faq: [
        {
          pertanyaan: "Berapa lama surat keterangan sehat berlaku?",
          jawaban:
            "Surat keterangan sehat umumnya berlaku selama 3 bulan sejak tanggal penerbitan untuk keperluan umum.",
        },
      ],
    },
    {
      id: "posyandu",
      nama: "Posyandu",
      estimasi: "Sesuai jadwal",
      status: "available",
      icon: <Baby className="h-10 w-10 text-red-500" />,
      deskripsi:
        "Layanan pemeriksaan kesehatan rutin untuk balita, ibu hamil, dan lansia.",
      persyaratan: [
        "KMS (Kartu Menuju Sehat) untuk balita",
        "Buku KIA untuk ibu hamil",
        "KTP untuk lansia",
      ],
      biaya: "Gratis",
      prosedur: [
        "Mendaftar di lokasi posyandu",
        "Menunggu giliran pemeriksaan",
        "Pemeriksaan dan konsultasi",
        "Pemberian vitamin/suplemen jika diperlukan",
      ],
      kontak: {
        petugas: "Puskesmas Guguak Malalo",
        telepon: "0752-123456",
        email: "posyandu@gugukmalalo.id",
      },
      jadwal: "Setiap tanggal 10 dan 25 tiap bulan pukul 08.00-12.00",
      faq: [
        {
          pertanyaan: "Apa saja layanan yang tersedia di Posyandu?",
          jawaban:
            "Layanan di Posyandu meliputi penimbangan berat badan, pengukuran tinggi badan, pemeriksaan tumbuh kembang anak, imunisasi, pemberian vitamin A, konsultasi gizi, dan pemeriksaan kesehatan ibu hamil.",
        },
      ],
    },
  ];

  // Get services based on category ID
  const getServicesByCategory = (categoryId) => {
    switch (categoryId) {
      case "kependudukan":
        return layananKependudukan;
      case "pembangunan":
        return layananPembangunan;
      case "ekonomi":
        return layananEkonomi;
      case "sosial":
        return layananSosial;
      case "posbakum":
        return layananPosbakum;
      case "pendidikan":
        return layananPendidikan;
      case "kesehatan":
        return layananKesehatan;
      default:
        return [];
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Tersedia
          </Badge>
        );
      case "maintenance":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Maintenance
          </Badge>
        );
      default:
        return <Badge variant="secondary">Status</Badge>;
    }
  };

  // Get theme colors based on the category
  const getThemeColors = (categoryId) => {
    const category = serviceCategories.find((cat) => cat.id === categoryId);
    if (!category) {
      return {
        gradientFrom: "from-emerald-50",
        gradientTo: "to-blue-50",
        buttonBg: "bg-emerald-600",
        buttonHover: "hover:bg-emerald-700",
        iconColor: "text-emerald-500",
        borderColor: "border-emerald-500",
        badgeBg: "bg-emerald-100",
        badgeText: "text-emerald-800",
        badgeBorder: "border-emerald-200",
        buttonOutlineBorder: "border-emerald-300",
        buttonOutlineText: "text-emerald-700",
        buttonOutlineHover: "hover:bg-emerald-50",
      };
    }

    // Extract color values from the category's color and iconColor properties
    const baseColor = category.iconColor.replace("text-", "");
    const bgGradientFrom = category.color.split(" ")[0];
    const bgGradientTo = category.color.split(" ")[1];

    return {
      gradientFrom: bgGradientFrom,
      gradientTo: bgGradientTo,
      buttonBg: `bg-${baseColor}-600`,
      buttonHover: `hover:bg-${baseColor}-700`,
      iconColor: category.iconColor,
      borderColor: `border-${baseColor}-500`,
      badgeBg: `bg-${baseColor}-100`,
      badgeText: `text-${baseColor}-800`,
      badgeBorder: `border-${baseColor}-200`,
      buttonOutlineBorder: `border-${baseColor}-300`,
      buttonOutlineText: `text-${baseColor}-700`,
      buttonOutlineHover: `hover:bg-${baseColor}-50`,
    };
  };

  const getServiceIcon = (service) => {
    return service.icon || <FileText className="h-10 w-10 text-gray-400" />;
  };

  const renderServiceCards = (services, themeColors) => (
    <div className="grid grid-cols-1 gap-6">
      {services.map((item, idx) => (
        <Card
          key={idx}
          className={`overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 ${themeColors.borderColor} hover:translate-y-[-5px]`}
        >
          <div className="flex flex-col md:flex-row">
            {/* Service Icon Section */}
            <div
              className={`p-6 flex items-center justify-center bg-gradient-to-br ${themeColors.gradientFrom} ${themeColors.gradientTo} md:w-1/5`}
            >
              <div className="rounded-full p-4 bg-white shadow-md">
                {getServiceIcon(item)}
              </div>
            </div>

            {/* Service Content Section */}
            <div className="flex-1">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <CardTitle className="text-lg md:text-xl text-gray-800">
                      {item.nama}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{item.deskripsi}</p>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Estimated time */}
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock
                      className={`h-4 w-4 mr-2 ${themeColors.iconColor} flex-shrink-0`}
                    />
                    <span>
                      <strong>Estimasi waktu:</strong> {item.estimasi}
                    </span>
                  </div>

                  {/* Fee information */}
                  <div className="flex items-center text-sm text-gray-600">
                    <Landmark
                      className={`h-4 w-4 mr-2 ${themeColors.iconColor} flex-shrink-0`}
                    />
                    <span>
                      <strong>Biaya:</strong> {item.biaya || "Gratis"}
                    </span>
                  </div>
                </div>

                {/* Requirements section */}
                {item.persyaratan && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">
                      Persyaratan:
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                      {item.persyaratan.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <Button
                    className="w-full sm:flex-1 bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() =>
                      navigate(`/layanan/${activeTab}/${item.id || idx}`)
                    }
                  >
                    Ajukan Sekarang
                  </Button>
                  <Link
                    to={`/layanan/${activeTab}/${item.id || idx}/detail`}
                    className="w-full sm:flex-1"
                  >
                    <Button
                      variant="outline"
                      className={`w-full ${themeColors.buttonOutlineBorder} ${themeColors.buttonOutlineText} ${themeColors.buttonOutlineHover}`}
                    >
                      Info Detail
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  // Render category page content with enhanced UI and theme-specific colors
  const renderCategoryContent = (categoryId) => {
    const category = serviceCategories.find((cat) => cat.id === categoryId);
    if (!category) return null;

    const services = getServicesByCategory(categoryId);
    const themeColors = getThemeColors(categoryId);

    return (
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Link
            to="/layanan"
            className={`inline-flex items-center text-sm text-gray-600 hover:${themeColors.buttonOutlineText} mb-6`}
          >
            <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
            Kembali ke semua layanan
          </Link>

          {/* Enhanced category header with icon and description - themed */}
          <div
            className={`bg-gradient-to-r ${themeColors.gradientFrom} ${themeColors.gradientTo} p-6 rounded-xl mb-8 shadow-sm`}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white p-6 rounded-full shadow-md">
                {React.cloneElement(category.icon, {
                  className: `h-16 w-16 md:h-20 md:w-20 ${category.iconColor}`,
                })}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {category.title}
                </h1>
                <p className="text-gray-600 max-w-3xl">
                  {category.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge
                    className={`${themeColors.badgeBg} ${themeColors.badgeText} ${themeColors.badgeBorder}`}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Layanan Digital 24/7
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Tracking Status
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                    <HelpCircle className="h-3 w-3 mr-1" />
                    Bantuan Online
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 flex items-center">
              <FileText className={`h-5 w-5 mr-2 ${themeColors.iconColor}`} />
              Daftar Layanan {category.title}
            </h2>
            <p className="text-gray-600">
              Silahkan pilih layanan yang Anda butuhkan di bawah ini:
            </p>
          </div>

          {renderServiceCards(services, themeColors)}
        </div>
      </div>
    );
  };

  // If we're on a specific category page, render that content
  if (category) {
    return <Layout>{renderCategoryContent(category)}</Layout>;
  }

  // Otherwise render the main service categories grid
  return (
    <Layout>
      {/* Hero Section - More responsive */}
      <section
        className="relative py-12 md:py-20 bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('/layanan.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-blue-600/80"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
            Layanan Digital
          </h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto">
            Akses mudah dan cepat untuk semua layanan administrasi Nagari
            Guguak malalo
          </p>
        </div>
      </section>

      {/* Service Categories Grid - Improved responsiveness */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4">
              Layanan Kami
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Pilih kategori layanan yang Anda butuhkan
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {serviceCategories.map((category) => (
              <Card
                key={category.id}
                className={`text-center hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br ${category.color} border-0 hover:scale-105`}
              >
                <CardContent className="p-3 md:p-6 flex flex-col items-center justify-center min-h-[160px] md:min-h-[200px]">
                  {/* Responsive icon size */}
                  <div className="mb-3 md:mb-4 transform scale-75 md:scale-100">
                    {React.cloneElement(category.icon, {
                      className: `h-12 w-12 md:h-16 md:w-16 ${category.iconColor}`,
                    })}
                  </div>
                  <h3 className="font-bold text-sm md:text-lg mb-2 text-gray-800">
                    {category.title}
                  </h3>
                  <Link to={`/layanan/${category.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`mt-2 md:mt-4 border-2 ${category.iconColor.replace(
                        "text-",
                        "border-"
                      )} ${category.iconColor} hover:bg-white hover:${
                        category.iconColor
                      } text-xs md:text-sm transition-all duration-200`}
                    >
                      <span>Lihat Layanan</span>
                      <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section - Improved mobile layout with consistent colors */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Card 1 */}
            <Card className="text-center p-4 md:p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-gray-800">
                Pelayanan 24/7
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Ajukan permohonan kapan saja melalui sistem online
              </p>
            </Card>

            {/* Card 2 */}
            <Card className="text-center p-4 md:p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-gray-800">
                Tracking Real-time
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Pantau status permohonan Anda secara real-time
              </p>
            </Card>

            {/* Card 3 */}
            <Card className="text-center p-4 md:p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <FileText className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-gray-800">
                Dokumen Digital
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Unduh dokumen hasil layanan dalam format digital
              </p>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LayananDigital;
