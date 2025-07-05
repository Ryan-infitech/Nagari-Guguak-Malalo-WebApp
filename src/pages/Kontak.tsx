import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Users,
} from "lucide-react";

const Kontak = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    kategori: "",
    subjek: "",
    pesan: "",
  });

  const kontakInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Alamat Kantor",
      info: "Kantor Wali Nagari Guguak Malalo\nKecamatan Batipuh Selatan, Kabupaten Tanah Datar\nSumatera Barat 27265",
      color: "text-green-600",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telepon",
      info: "(0752) 123-4567\n0812-3456-7890 (WhatsApp)",
      color: "text-blue-600",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      info: "info@gugukmalalo.id\nadmin@gugukmalalo.id",
      color: "text-purple-600",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Jam Pelayanan",
      info: "Senin - Jumat: 08:00 - 16:00 WIB\nSabtu: 08:00 - 12:00 WIB\nMinggu: Libur",
      color: "text-orange-600",
    },
  ];

  const petugasKontak = [
    {
      nama: "Edo Adiyat Putra S.E",
      jabatan: "Staff",
      telepon: "0852-7116-4143",
      email: "Edo.adiyat@gugukmalalo.id",
    },
  ];

  const faqData = [
    {
      pertanyaan: "Bagaimana cara mengurus surat keterangan domisili?",
      jawaban:
        "Anda dapat mengajukan surat keterangan domisili melalui layanan digital di website ini atau datang langsung ke kantor nagari dengan membawa KTP dan kartu keluarga.",
    },
    {
      pertanyaan: "Berapa lama proses pengurusan dokumen?",
      jawaban:
        "Waktu proses bervariasi tergantung jenis dokumen. Umumnya 1-3 hari kerja untuk surat keterangan sederhana, dan 5-7 hari untuk dokumen yang memerlukan verifikasi lebih lanjut.",
    },
    {
      pertanyaan: "Apakah ada biaya untuk layanan administrasi?",
      jawaban:
        "Sebagian besar layanan administrasi nagari tidak dikenakan biaya. Hanya ada biaya materai untuk dokumen tertentu sesuai ketentuan yang berlaku.",
    },
    {
      pertanyaan: "Bagaimana cara melaporkan kerusakan infrastruktur?",
      jawaban:
        "Anda dapat melaporkan kerusakan infrastruktur melalui form pengaduan di website ini, WhatsApp resmi nagari, atau datang langsung ke kantor nagari.",
    },
    {
      pertanyaan: "Kapan jadwal pelayanan masyarakat?",
      jawaban:
        "Pelayanan masyarakat buka Senin-Jumat 08:00-16:00 WIB dan Sabtu 08:00-12:00 WIB. Hari Minggu dan hari libur nasional tutup.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/gallery/posbankum.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ca186]/80 to-blue-600/80"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kontak & Pengaduan
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Hubungi kami untuk informasi, layanan, atau sampaikan pengaduan Anda
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {kontakInfo.map((info, idx) => (
              <Card
                key={idx}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${info.color}`}
                  >
                    {info.icon}
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm whitespace-pre-line">
                    {info.info}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                  Form Pengaduan & Kontak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nama">Nama Lengkap *</Label>
                      <Input
                        id="nama"
                        value={formData.nama}
                        onChange={(e) => handleChange("nama", e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="telepon">No. Telepon *</Label>
                      <Input
                        id="telepon"
                        value={formData.telepon}
                        onChange={(e) =>
                          handleChange("telepon", e.target.value)
                        }
                        placeholder="08xx-xxxx-xxxx"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="nama@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="kategori">Kategori Pengaduan *</Label>
                    <Select
                      value={formData.kategori}
                      onValueChange={(value) => handleChange("kategori", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="layanan">
                          Layanan Administrasi
                        </SelectItem>
                        <SelectItem value="infrastruktur">
                          Infrastruktur
                        </SelectItem>
                        <SelectItem value="lingkungan">Lingkungan</SelectItem>
                        <SelectItem value="sosial">
                          Sosial & Kemasyarakatan
                        </SelectItem>
                        <SelectItem value="ekonomi">Ekonomi & UMKM</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subjek">Subjek *</Label>
                    <Input
                      id="subjek"
                      value={formData.subjek}
                      onChange={(e) => handleChange("subjek", e.target.value)}
                      placeholder="Ringkasan singkat masalah"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="pesan">Pesan/Pengaduan *</Label>
                    <Textarea
                      id="pesan"
                      value={formData.pesan}
                      onChange={(e) => handleChange("pesan", e.target.value)}
                      placeholder="Jelaskan detail masalah atau pengaduan Anda..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Kirim Pengaduan
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map & Quick Contact */}
            <div className="space-y-6">
              {/* Map */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Lokasi Kantor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.235778919711!2d100.49810!3d-0.59915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd54bd2f0efa2a3%3A0x100c5833d5fc0f0!2sKantor%20Walinagari%20Guguak%20Malalo%2C%20Batipuh%20Selatan%2C%20Tanah%20Datar%2C%20West%20Sumatra!5e0!3m2!1sen!2sid!4v1650000000000!5m2!1sen!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Peta Kantor Wali Nagari Guguak Malalo"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Kontak Petugas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {petugasKontak.map((petugas, idx) => (
                      <div
                        key={idx}
                        className="border-l-4 border-l-blue-500 pl-4"
                      >
                        <h4 className="font-semibold">{petugas.nama}</h4>
                        <p className="text-sm text-gray-600">
                          {petugas.jabatan}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <a
                            href={`tel:${petugas.telepon}`}
                            className="text-green-600 hover:underline"
                          >
                            📞 {petugas.telepon}
                          </a>
                          <a
                            href={`mailto:${petugas.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            ✉️ Email
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pertanyaan yang sering diajukan oleh masyarakat
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, idx) => (
              <Card key={idx} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    {faq.pertanyaan}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{faq.jawaban}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontak;
