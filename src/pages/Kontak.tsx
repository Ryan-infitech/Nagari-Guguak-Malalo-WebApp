
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, MessageSquare, AlertCircle, CheckCircle, Users } from 'lucide-react';

const Kontak = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    kategori: '',
    subjek: '',
    pesan: ''
  });

  const kontakInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Alamat Kantor",
      info: "Kantor Wali Nagari GuguakMalalo\nKecamatan Harau, Kabupaten Lima Puluh Kota\nSumatera Barat 26271",
      color: "text-green-600"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telepon",
      info: "(0752) 123-4567\n0812-3456-7890 (WhatsApp)",
      color: "text-blue-600"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      info: "info@gugukmalalo.id\nadmin@gugukmalalo.id",
      color: "text-purple-600"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Jam Pelayanan",
      info: "Senin - Jumat: 08:00 - 16:00 WIB\nSabtu: 08:00 - 12:00 WIB\nMinggu: Libur",
      color: "text-orange-600"
    }
  ];

  const petugasKontak = [
    {
      nama: "Drs. H. Ahmad Syafii, M.Si",
      jabatan: "Wali Nagari",
      telepon: "0812-1111-1111",
      email: "walinagari@gugukmalalo.id"
    },
    {
      nama: "Ir. Siti Maryam, S.Sos",
      jabatan: "Sekretaris Nagari", 
      telepon: "0812-2222-2222",
      email: "sekretaris@gugukmalalo.id"
    },
    {
      nama: "Budi Santoso, S.E",
      jabatan: "Kepala Urusan Keuangan",
      telepon: "0812-3333-3333", 
      email: "keuangan@gugukmalalo.id"
    },
    {
      nama: "Rina Sari, S.Kom",
      jabatan: "Admin IT & Website",
      telepon: "0812-4444-4444",
      email: "admin@gugukmalalo.id"
    }
  ];

  const faqData = [
    {
      pertanyaan: "Bagaimana cara mengurus surat keterangan domisili?",
      jawaban: "Anda dapat mengajukan surat keterangan domisili melalui layanan digital di website ini atau datang langsung ke kantor nagari dengan membawa KTP dan kartu keluarga."
    },
    {
      pertanyaan: "Berapa lama proses pengurusan dokumen?",
      jawaban: "Waktu proses bervariasi tergantung jenis dokumen. Umumnya 1-3 hari kerja untuk surat keterangan sederhana, dan 5-7 hari untuk dokumen yang memerlukan verifikasi lebih lanjut."
    },
    {
      pertanyaan: "Apakah ada biaya untuk layanan administrasi?",
      jawaban: "Sebagian besar layanan administrasi nagari tidak dikenakan biaya. Hanya ada biaya materai untuk dokumen tertentu sesuai ketentuan yang berlaku."
    },
    {
      pertanyaan: "Bagaimana cara melaporkan kerusakan infrastruktur?",
      jawaban: "Anda dapat melaporkan kerusakan infrastruktur melalui form pengaduan di website ini, WhatsApp resmi nagari, atau datang langsung ke kantor nagari."
    },
    {
      pertanyaan: "Kapan jadwal pelayanan masyarakat?",
      jawaban: "Pelayanan masyarakat buka Senin-Jumat 08:00-16:00 WIB dan Sabtu 08:00-12:00 WIB. Hari Minggu dan hari libur nasional tutup."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontak & Pengaduan</h1>
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
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${info.color}`}>
                    {info.icon}
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{info.info}</p>
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
                        onChange={(e) => handleChange('nama', e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="telepon">No. Telepon *</Label>
                      <Input
                        id="telepon"
                        value={formData.telepon}
                        onChange={(e) => handleChange('telepon', e.target.value)}
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
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="nama@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="kategori">Kategori Pengaduan *</Label>
                    <Select value={formData.kategori} onValueChange={(value) => handleChange('kategori', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="layanan">Layanan Administrasi</SelectItem>
                        <SelectItem value="infrastruktur">Infrastruktur</SelectItem>
                        <SelectItem value="lingkungan">Lingkungan</SelectItem>
                        <SelectItem value="sosial">Sosial & Kemasyarakatan</SelectItem>
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
                      onChange={(e) => handleChange('subjek', e.target.value)}
                      placeholder="Ringkasan singkat masalah"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="pesan">Pesan/Pengaduan *</Label>
                    <Textarea
                      id="pesan"
                      value={formData.pesan}
                      onChange={(e) => handleChange('pesan', e.target.value)}
                      placeholder="Jelaskan detail masalah atau pengaduan Anda..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Kirim Pengaduan
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map & Quick Contact */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Lokasi Kantor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-600">Peta Lokasi Kantor Nagari</p>
                      <p className="text-sm text-gray-500">Interactive map akan tersedia segera</p>
                    </div>
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
                      <div key={idx} className="border-l-4 border-l-blue-500 pl-4">
                        <h4 className="font-semibold">{petugas.nama}</h4>
                        <p className="text-sm text-gray-600">{petugas.jabatan}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <a href={`tel:${petugas.telepon}`} className="text-green-600 hover:underline">
                            📞 {petugas.telepon}
                          </a>
                          <a href={`mailto:${petugas.email}`} className="text-blue-600 hover:underline">
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Butuh Bantuan Langsung?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tim kami siap membantu Anda dengan pelayanan terbaik
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Phone className="h-5 w-5 mr-2" />
              Hubungi Sekarang
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
              <MessageSquare className="h-5 w-5 mr-2" />
              Chat WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontak;
