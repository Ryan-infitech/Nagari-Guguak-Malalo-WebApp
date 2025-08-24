import {
  FileText,
  Clock,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  User,
  Copyright,
} from "lucide-react";

export default function TermsConditions() {
  return (
    <main>
      {/* Hero Section with added padding-top */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-600 to-[#7ca186] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Syarat & Ketentuan
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Ketentuan penggunaan layanan Portal Digital Nagari Guguak Malalo
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
              Selamat datang di Portal Digital Nagari Guguak Malalo. Dengan
              mengakses atau menggunakan platform ini, Anda setuju untuk terikat
              oleh Syarat & Ketentuan berikut. Harap baca dengan seksama sebelum
              menggunakan layanan kami.
            </p>

            <div className="my-12 space-y-12">
              {/* Section 1: Introduction */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-[#7ca186] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">
                    Pendahuluan dan Penerimaan
                  </h2>
                </div>
                <p>
                  Portal Digital Nagari Guguak Malalo (&ldquo;Portal&rdquo;)
                  dioperasikan oleh Pemerintah Nagari Guguak Malalo. Dengan
                  mengakses atau menggunakan Portal ini, Anda menyetujui dan
                  menyepakati untuk terikat oleh syarat dan ketentuan yang
                  ditetapkan di sini.
                </p>
                <p className="mb-0">
                  Jika Anda tidak setuju dengan salah satu atau seluruh syarat
                  dan ketentuan ini, Anda diharapkan untuk tidak menggunakan
                  Portal ini. Penggunaan berkelanjutan dari Portal berarti Anda
                  menerima semua ketentuan yang berlaku.
                </p>
              </div>

              {/* Section 2: Use of Services */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-8 w-8 text-[#7ca186] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">
                    Penggunaan Layanan
                  </h2>
                </div>
                <p>
                  Portal Digital Nagari Guguak Malalo menyediakan berbagai
                  layanan administrasi dan informasi untuk warga Nagari Guguak
                  Malalo dan pengunjung. Dengan menggunakan layanan kami, Anda
                  menyetujui hal-hal berikut:
                </p>
                <ul className="space-y-2">
                  <li>
                    Menggunakan layanan sesuai dengan hukum dan regulasi yang
                    berlaku di Indonesia.
                  </li>
                  <li>
                    Memberikan informasi yang akurat dan lengkap saat
                    menggunakan layanan administratif.
                  </li>
                  <li>
                    Tidak menyalahgunakan layanan untuk tujuan yang melanggar
                    hukum atau merugikan pihak lain.
                  </li>
                  <li>
                    Mematuhi semua pedoman dan kebijakan tambahan yang
                    dikeluarkan oleh Pemerintah Nagari Guguak Malalo.
                  </li>
                </ul>
                <p className="mt-4 mb-0">
                  Kami berhak untuk membatasi atau menghentikan akses Anda ke
                  layanan jika terdapat pelanggaran terhadap ketentuan ini.
                </p>
              </div>

              {/* Section 3: User Accounts */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <User className="h-8 w-8 text-[#7ca186] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">
                    Akun Pengguna
                  </h2>
                </div>
                <p>
                  Beberapa layanan di Portal mungkin mengharuskan Anda untuk
                  membuat akun pengguna. Terkait dengan akun pengguna:
                </p>
                <ul className="space-y-2">
                  <li>
                    Anda bertanggung jawab untuk menjaga kerahasiaan kredensial
                    akun Anda.
                  </li>
                  <li>
                    Anda bertanggung jawab untuk semua aktivitas yang terjadi di
                    bawah akun Anda.
                  </li>
                  <li>
                    Anda setuju untuk segera memberi tahu kami tentang
                    penggunaan tidak sah akun Anda.
                  </li>
                  <li>
                    Anda harus minimal berusia 17 tahun atau di bawah pengawasan
                    orang dewasa untuk membuat akun.
                  </li>
                </ul>
                <p className="mt-4 mb-0">
                  Kami berhak untuk menangguhkan atau menghentikan akun Anda
                  jika ada aktivitas yang mencurigakan atau melanggar ketentuan
                  penggunaan.
                </p>
              </div>

              {/* Section 4: Intellectual Property */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Copyright className="h-8 w-8 text-[#7ca186] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">
                    Hak Kekayaan Intelektual
                  </h2>
                </div>
                <p>
                  Semua konten yang tersedia di Portal Digital Nagari Guguak
                  Malalo, termasuk tetapi tidak terbatas pada teks, grafik,
                  logo, ikon, gambar, klip audio, unduhan digital, dan kompilasi
                  data, adalah milik Pemerintah Nagari Guguak Malalo atau
                  pemberi lisensinya dan dilindungi oleh hukum kekayaan
                  intelektual Indonesia dan internasional.
                </p>
                <p>
                  Anda diizinkan untuk menggunakan konten Portal hanya untuk
                  tujuan pribadi dan non-komersial. Dilarang mereproduksi,
                  mendistribusikan, memodifikasi, atau menciptakan karya turunan
                  dari konten Portal tanpa izin tertulis dari Pemerintah Nagari
                  Guguak Malalo.
                </p>
              </div>

              {/* Section 5: Prohibited Activities */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-[#7ca186] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">
                    Aktivitas yang Dilarang
                  </h2>
                </div>
                <p>
                  Saat menggunakan Portal Digital Nagari Guguak Malalo, Anda
                  dilarang melakukan aktivitas berikut:
                </p>
                <ul className="space-y-2">
                  <li>
                    Menggunakan Portal untuk tujuan ilegal atau tidak sah.
                  </li>
                  <li>
                    Mengumpulkan data atau informasi pribadi pengguna lain tanpa
                    izin.
                  </li>
                  <li>
                    Mengunggah atau mendistribusikan malware, virus, atau kode
                    berbahaya lainnya.
                  </li>
                  <li>
                    Mencoba untuk mendapatkan akses tidak sah ke server atau
                    database Portal.
                  </li>
                  <li>
                    Melakukan tindakan yang dapat merusak, membebani, atau
                    mengganggu fungsi Portal.
                  </li>
                  <li>
                    Mengirimkan konten yang bersifat memfitnah, menyinggung,
                    atau melanggar hak orang lain.
                  </li>
                  <li>
                    Melakukan impersonasi terhadap pejabat pemerintah atau
                    individu lain.
                  </li>
                </ul>
              </div>

              {/* Section 6: Disclaimer & Limitations */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <ShieldCheck className="h-8 w-8 text-[#7ca186] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">
                    Penafian dan Batasan Tanggung Jawab
                  </h2>
                </div>
                <p>
                  Portal Digital Nagari Guguak Malalo disediakan
                  &ldquo;sebagaimana adanya&rdquo; dan &ldquo;sebagaimana
                  tersedia&rdquo; tanpa jaminan apapun, baik tersurat maupun
                  tersirat. Kami tidak menjamin bahwa:
                </p>
                <ul className="space-y-2">
                  <li>Portal akan selalu tersedia atau bebas dari gangguan.</li>
                  <li>
                    Informasi yang disediakan di Portal selalu akurat atau
                    lengkap.
                  </li>
                  <li>
                    Kesalahan dalam konten atau fungsi Portal akan diperbaiki.
                  </li>
                </ul>
                <p className="mt-4">
                  Sejauh yang diizinkan oleh hukum yang berlaku, Pemerintah
                  Nagari Guguak Malalo tidak bertanggung jawab atas kerugian
                  langsung, tidak langsung, insidental, konsekuensial, atau
                  khusus yang timbul dari penggunaan Portal atau ketidakmampuan
                  untuk menggunakan Portal.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-[#7ca186] p-6 rounded-lg mt-10 mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Perubahan Syarat & Ketentuan
              </h3>
              <p className="mb-0">
                Kami berhak untuk memodifikasi atau mengganti Syarat & Ketentuan
                ini kapan saja. Perubahan akan berlaku segera setelah diposting
                di Portal dengan tanggal &ldquo;Terakhir diperbarui&rdquo; yang
                direvisi. Anda bertanggung jawab untuk secara berkala meninjau
                Syarat & Ketentuan ini untuk mengetahui adanya perubahan.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Hukum yang Berlaku
            </h2>
            <p>
              Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan
              hukum Republik Indonesia. Setiap sengketa yang timbul dari atau
              terkait dengan Syarat & Ketentuan ini akan diselesaikan melalui
              forum yang kompeten di Indonesia.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">
              Hubungi Kami
            </h2>
            <p>
              Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini,
              silakan hubungi kami di:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-4">
              <p className="mb-1">
                <strong>Kantor Wali Nagari Guguak Malalo</strong>
              </p>
              <p className="mb-1">
                Kecamatan Batipuh Selatan, Kabupaten Tanah Datar
              </p>
              <p className="mb-1">Sumatera Barat 27265</p>
              <p className="mb-1">Email: admin@gugukmalalo.id</p>
              <p className="mb-0">Telepon: (0752) 123-4567</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
