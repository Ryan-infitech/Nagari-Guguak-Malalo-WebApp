import React from "react";
import Layout from "@/components/layout/Layout";
import {
  Shield,
  Lock,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-[#7ca186] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Komitmen kami untuk melindungi dan menghormati privasi data pengguna
            Nagari Guguak Malalo
          </p>
          <div className="flex justify-center mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 inline-flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              <span>Terakhir diperbarui: Juli 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <p className="lead text-gray-600">
              Selamat datang di Portal Digital Nagari Guguak Malalo. Kebijakan
              Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan,
              mengungkapkan, dan melindungi informasi pribadi Anda saat
              menggunakan layanan digital kami.
            </p>

            <div className="my-12 space-y-12">
              {/* Section 1: Information Collection */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-[#7ca186] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">
                    Informasi yang Kami Kumpulkan
                  </h2>
                </div>
                <p>
                  Kami dapat mengumpulkan informasi berikut dari pengguna Portal
                  Digital Nagari Guguak Malalo:
                </p>
                <ul className="space-y-2">
                  <li>
                    <strong>Informasi Identifikasi Pribadi:</strong> Nama,
                    alamat, nomor KTP, nomor telepon, alamat email, dan
                    informasi kontak lainnya.
                  </li>
                  <li>
                    <strong>Informasi Demografis:</strong> Tanggal lahir, jenis
                    kelamin, status perkawinan, pendidikan, dan pekerjaan.
                  </li>
                  <li>
                    <strong>Data Aktivitas:</strong> Informasi tentang bagaimana
                    Anda menggunakan platform kami, termasuk layanan yang
                    diakses, permintaan yang diajukan, dan interaksi dengan
                    fitur platform.
                  </li>
                  <li>
                    <strong>Informasi Perangkat:</strong> Jenis perangkat,
                    sistem operasi, pengidentifikasi perangkat unik, dan data
                    jaringan.
                  </li>
                </ul>
              </div>

              {/* Section 2: Information Usage */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-8 w-8 text-[#7ca186] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">
                    Penggunaan Informasi
                  </h2>
                </div>
                <p>Informasi yang kami kumpulkan digunakan untuk:</p>
                <ul className="space-y-2">
                  <li>
                    Memproses dan mengelola permintaan layanan administrasi
                    desa.
                  </li>
                  <li>
                    Memverifikasi identitas untuk tujuan keamanan dan pencegahan
                    penipuan.
                  </li>
                  <li>
                    Menyediakan informasi yang relevan tentang program dan
                    layanan Nagari.
                  </li>
                  <li>
                    Meningkatkan dan mengoptimalkan layanan digital yang kami
                    tawarkan.
                  </li>
                  <li>
                    Mengirimkan notifikasi penting terkait permintaan atau
                    perubahan pada layanan.
                  </li>
                  <li>
                    Analisis statistik untuk pengembangan kebijakan dan program
                    Nagari.
                  </li>
                </ul>
              </div>

              {/* Section 3: Information Sharing */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Lock className="h-8 w-8 text-[#7ca186] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">
                    Pembagian Informasi
                  </h2>
                </div>
                <p>
                  Kami menghormati privasi Anda dan hanya akan membagikan
                  informasi dalam situasi berikut:
                </p>
                <ul className="space-y-2">
                  <li>
                    <strong>Dengan Instansi Pemerintah:</strong> Ketika
                    diperlukan untuk memproses layanan administratif atau sesuai
                    dengan persyaratan hukum.
                  </li>
                  <li>
                    <strong>Penyedia Layanan Pihak Ketiga:</strong> Yang
                    membantu kami mengoperasikan platform dan tidak memiliki hak
                    independen untuk menggunakan informasi yang kami ungkapkan.
                  </li>
                  <li>
                    <strong>Kewajiban Hukum:</strong> Untuk mematuhi hukum,
                    peraturan, proses hukum, atau permintaan pemerintah yang
                    berlaku.
                  </li>
                </ul>
                <p className="mt-4 text-gray-700">
                  <strong>Penting:</strong> Kami tidak akan pernah menjual,
                  menyewakan, atau menukar informasi pribadi Anda dengan pihak
                  ketiga untuk tujuan pemasaran tanpa persetujuan eksplisit
                  Anda.
                </p>
              </div>

              {/* Section 4: Data Security */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-[#7ca186] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">
                    Keamanan Data
                  </h2>
                </div>
                <p>
                  Kami berkomitmen untuk melindungi informasi pribadi Anda dan
                  telah menerapkan langkah-langkah keamanan yang sesuai,
                  termasuk:
                </p>
                <ul className="space-y-2">
                  <li>
                    Enkripsi SSL untuk melindungi transmisi data sensitif.
                  </li>
                  <li>
                    Pembatasan akses ke informasi pribadi hanya untuk staf yang
                    berwenang.
                  </li>
                  <li>
                    Penyimpanan data yang aman dengan perlindungan fisik dan
                    digital.
                  </li>
                  <li>
                    Audit keamanan berkala untuk memastikan efektivitas sistem
                    perlindungan kami.
                  </li>
                </ul>
                <p className="mt-4 text-gray-700">
                  Meskipun kami berusaha untuk menggunakan cara yang dapat
                  diterima secara komersial untuk melindungi informasi pribadi
                  Anda, tidak ada metode transmisi melalui internet atau metode
                  penyimpanan elektronik yang 100% aman.
                </p>
              </div>

              {/* Section 5: User Rights */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-8 w-8 text-[#7ca186] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">
                    Hak Pengguna
                  </h2>
                </div>
                <p>Sebagai pengguna layanan kami, Anda memiliki hak untuk:</p>
                <ul className="space-y-2">
                  <li>
                    Mengakses dan menerima salinan informasi pribadi yang kami
                    miliki tentang Anda.
                  </li>
                  <li>
                    Meminta kami memperbaiki atau memperbarui informasi yang
                    tidak akurat atau tidak lengkap.
                  </li>
                  <li>
                    Meminta pembatasan penggunaan informasi pribadi Anda dalam
                    keadaan tertentu.
                  </li>
                  <li>
                    Menarik persetujuan yang telah Anda berikan untuk penggunaan
                    data Anda.
                  </li>
                  <li>
                    Mengajukan keluhan jika Anda merasa informasi Anda telah
                    digunakan dengan cara yang melanggar hak privasi Anda.
                  </li>
                </ul>
                <p className="mt-4">
                  Untuk menggunakan hak-hak ini, silakan hubungi kami melalui
                  informasi kontak yang disediakan di akhir kebijakan ini.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-[#7ca186] p-6 rounded-lg mt-10 mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Perubahan Kebijakan Privasi
              </h3>
              <p className="mb-0">
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke
                waktu. Perubahan akan segera berlaku setelah diposting di
                halaman ini dengan tanggal revisi yang diperbarui. Kami
                mendorong Anda untuk secara berkala meninjau Kebijakan Privasi
                ini untuk tetap mendapatkan informasi tentang bagaimana kami
                melindungi informasi Anda.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Hubungi Kami
            </h2>
            <p>
              Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan
              Privasi ini, silakan hubungi kami di:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-4">
              <p className="mb-1">
                <strong>Kantor Wali Nagari Guguak Malalo</strong>
              </p>
              <p className="mb-1">
                Kecamatan Batipuh Selatan, Kabupaten Tanah Datar
              </p>
              <p className="mb-1">Sumatera Barat 27265</p>
              <p className="mb-1">Email: privacy@gugukmalalo.id</p>
              <p className="mb-0">Telepon: (0752) 123-4567</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
