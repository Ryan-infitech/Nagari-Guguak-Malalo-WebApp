import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  User,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Facebook,
  Twitter,
  Bookmark,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";

// Mock data for demonstration
const newsArticles = [
  {
    id: "1",
    title: "Syiar Muharram: Semangat Kebersamaan Masyarakat Guguak Malalo Dalam Pawai Obor",
    content: `
      <p class="mb-4">GUGUAKMALALO - Suasana khidmat dan penuh kebersamaan terpancar dalam acara pawai obor dan tolak bala yang digelar oleh masyarakat Nagari Guguakmalalo. Kegiatan tradisional ini menjadi momen penting bagi warga dalam memohon perlindungan dan keselamatan bagi kampung halaman mereka.</p>
      
      <p class="mb-4">Acara yang berlangsung pada malam hari ini dihadiri oleh berbagai kalangan masyarakat, mulai dari tokoh adat, pemuka agama, hingga warga dari berbagai lapisan usia. Terlihat jelas antusiasme warga yang mengenakan pakaian tradisional khas Minangkabau, menciptakan atmosfer yang sarat akan nilai-nilai budaya lokal.</p>
      
      <p class="mb-4">"Dalam sambutannya, pimpinan acara menyampaikan pentingnya menjaga keharmonisan dan kerukunan antar warga. "Pawai obor ini bukan hanya sekadar tradisi, tetapi juga simbol persatuan kita dalam menghadapi berbagai tantangan," ujar beliau di hadapan ratusan warga yang hadir.</p>
      
      <p class="mb-4">Ritual tolak bala yang merupakan bagian integral dari tradisi Minangkabau ini dipercaya dapat menghindarkan nagari dari berbagai musibah dan malapetaka. Warga bergotong royong membawa obor sambil melantunkan doa-doa dan zikir sepanjang rute pawai yang telah ditentukan.</p>
      
      <p class="mb-4">Kegiatan ini juga menjadi ajang mempererat tali silaturahmi antar warga nagari. Anak-anak, remaja, dewasa, hingga para tetua berkumpul dalam satu barisan yang kompak, menunjukkan solidaritas dan rasa persaudaraan yang tinggi.</p>
      
      <p class="mb-4">Pawai obor dan tolak bala di Nagari Guguakmalalo ini diharapkan dapat terus dilestarikan sebagai warisan budaya yang berharga. Selain sebagai bentuk pelestarian tradisi, kegiatan ini juga menjadi sarana edukasi bagi generasi muda tentang pentingnya menjaga nilai-nilai luhur budaya Minangkabau.</p>
      
      <p class="mb-4">"Acara yang berlangsung dengan tertib dan lancar ini ditutup dengan doa bersama, memohon agar Nagari Guguakmalalo senantiasa dalam lindungan dan keberkahan Tuhan Yang Maha Esa.</p>
    `,
    excerpt:
      "Suasana khidmat dan penuh kebersamaan terpancar dalam acara pawai obor dan tolak bala yang digelar oleh masyarakat Nagari Guguakmalalo.",
    image: "/IMG_1097.JPG",
    galleryImages: ["/1.JPG", "/2.JPG", "/3.jpg"],
    date: "2 juli 2025",
    time: "20:30 WIB",
    author: "Admin Nagari",
    authorImage: "/tanahdatar.png",
    views: "1,245",
    likes: "78",
    comments: "12",
    category: "Event",
    tags: ["Festival", "Budaya", "Pariwisata", "UMKM"],
    featured: true,
  },
  {
    id: "2",
    title: "Wali Nagari Guguak Malalo Cup II Resmi Digelar di Lapangan Pelita Limo Luhak, Batipuh Selatan",
    content: `
      <p class="mb-4">BATIPUH SELATAN - Turnamen sepak bola bergengsi Wali Nagari Guguak Malalo Cup II resmi digelar pada Sabtu, 28 Juni 2025, bertempat di Lapangan Pelita Limo Luhak, Nagari Guguak Malalo, Kecamatan Batipuh Selatan, Kabupaten Tanah Datar. Kegiatan ini menjadi ajang silaturahmi dan unjuk kemampuan para tim sepak bola lokal sekaligus menjadi bagian dari rangkaian kegiatan olahraga dan kepemudaan Nagari Guguak Malalo.</p>

      <p class="mb-4">Kompetisi yang mempertemukan berbagai tim kuat dari Sumatera Barat ini terdiri atas dua jalur pertandingan utama, yaitu Guguak Malalo Cup II dan pertandingan antar tim dalam rangka Wali Nagari Cup. Kegiatan ini diinisiasi oleh pemerintah nagari bersama para pemuda, dan didukung penuh oleh masyarakat serta perangkat nagari setempat.</p>

      <p class="mb-4">Dalam Guguak Malalo Cup II, sejumlah tim dari berbagai daerah turut ambil bagian, di antaranya UD.AM FC dari Solok, PERSIKOTA FC dari Tanah Datar, TALUK FC dari Lintau, PERSIGURA FC dari Gunung Rajo, PSSP FC dari Paninjauan, PORSMA FC dari Sumani, BADARMAS A dari Malalo, dan PANDEKA FC dari Solok. Pertandingan penyisihan dimulai sejak tanggal 27 Juni hingga 8 Juli 2025, dengan laga-laga sengit yang akan menentukan siapa yang berhak melaju ke babak final.</p>

      <p class="mb-4">Sementara itu, dalam Wali Nagari Guguak Malalo Cup, turut bertanding tim-tim pilihan seperti TARANTANG FC dari Ladang Laweh, KEMER FC dari Tanah Datar, ROYAL FC dari Bukittinggi, EXCELLENT FC dari Tanah Datar, RINTIS FC dari Singgalang, GMR FC dari Tanah Datar, SANDI UTAMA dari Batipuh, dan BADARMAS B dari Malalo. Jalur ini juga menyajikan atmosfer kompetisi yang tinggi dan antusiasme penonton yang luar biasa.</p>

      <p class="mb-4">Turnamen ini tidak hanya menjadi panggung kompetisi olahraga, tetapi juga menjadi ruang kebersamaan dan hiburan bagi masyarakat, serta ajang untuk memperkuat rasa kebanggaan terhadap nagari. Kehadiran para suporter, pemuda, dan tokoh masyarakat membuat suasana semakin semarak. Melalui kegiatan ini, pemerintah nagari berharap dapat terus mendorong semangat sportivitas, kerja sama, dan kreativitas generasi muda.</p>

      <p class="mb-4">Wali Nagari Guguak Malalo bersama seluruh panitia berharap kegiatan ini dapat berjalan lancar, damai, dan memberikan dampak positif bagi seluruh peserta serta masyarakat luas. Babak final dijadwalkan berlangsung pada 20 Juli 2025, dan menjadi puncak dari seluruh rangkaian turnamen yang penuh semangat juang dan nilai kebersamaan.</p>
    `,
    excerpt:
      "Turnamen sepak bola bergengsi Wali Nagari Guguak Malalo Cup II resmi digelar pada Sabtu, 28 Juni 2025, bertempat di Lapangan Pelita Limo Luhak, Nagari Guguak Malalo, Kecamatan Batipuh Selatan, Kabupaten Tanah Datar.",
    image:
      "/walnagcup.png",
    date: "28 Juni 2025",
    author: "Tim Digital",
    authorImage: "/tanahdatar.png",
    views: "856",
    likes: "45",
    comments: "8",
    category: "Olahraga",
    tags: ["Digital", "Olahraga", "Sport"],
    featured: false,
  },
  {
    id: "3",
    title: "Pembangunan Jalan Guguak Sarai–Sikala Diresmikan Melalui Gotong Royong Warga di Jorong Baing, Guguak Malalo",
    excerpt:
      "Sabtu, 28 Juni 2025, menjadi hari bersejarah bagi masyarakat Jorong Baing, Nagari Guguak Malalo, Kecamatan Batipuh Selatan. Pembangunan jalan penghubung antara Guguak Sarai dan Sikala resmi dimulai melalui kegiatan gotong royong yang melibatkan partisipasi luas dari masyarakat, pemerintah nagari, serta mahasiswa Kuliah Kerja Nyata (KKN).",
    content: `
      <p class="mb-4">Proyek infrastruktur yang dibiayai melalui Dana Desa ini merupakan bagian dari komitmen Wali Nagari Guguak Malalo, Bapak Mulyadi, untuk meningkatkan aksesibilitas dan konektivitas antarwilayah di nagari. Jalan ini diharapkan mampu memperlancar aktivitas sosial dan ekonomi warga, khususnya dalam mendukung kegiatan pertanian dan mobilitas harian masyarakat Jorong Baing.</p>

      <p class="mb-4">Pengerjaan jalan dilaksanakan secara gotong royong yang dipimpin langsung oleh wali nagari bersama perangkat nagari, serta diikuti oleh puluhan warga dari berbagai latar belakang. Suasana penuh semangat dan kebersamaan begitu terasa sejak pagi hari. Warga membawa perlengkapan kerja secara swadaya, menunjukkan semangat kolektif dan kepedulian terhadap kemajuan nagari mereka.</p>

      <p class="mb-4">Kegiatan ini turut diperkuat oleh kehadiran mahasiswa KKN dari Universitas Negeri Padang (UNP) dan UIN Mahmud Yunus Batusangkar, yang ikut serta membantu proses pembangunan bersama masyarakat. Para mahasiswa ini tidak hanya terlibat secara fisik, namun juga menjadi bagian dari integrasi sosial dan edukasi pembangunan berbasis pemberdayaan.</p>

      <p class="mb-4">Dalam sambutannya, Bapak Mulyadi menyampaikan apresiasi dan rasa bangganya atas kekompakan masyarakat Jorong Baing. Ia menegaskan bahwa pembangunan jalan ini tidak sekadar proyek fisik, tetapi simbol dari tekad bersama untuk membangun nagari secara berkelanjutan dengan semangat gotong royong. “Ini adalah wujud nyata bagaimana dana desa dimanfaatkan untuk kepentingan bersama dan dijalankan dengan prinsip partisipatif,” ujarnya.</p>

      <p class="mb-4">Warga menyambut baik pembangunan ini, karena selama ini jalan tersebut merupakan jalur vital yang belum tertangani secara optimal. Dengan dibukanya akses jalan Guguak Sarai–Sikala, masyarakat berharap dapat lebih mudah dalam mengangkut hasil tani, menjangkau layanan pendidikan dan kesehatan, serta mempererat hubungan antarwilayah yang sebelumnya cukup terisolasi.</p>

      <p class="mb-4">Pembangunan jalan ini menjadi bukti nyata bahwa kolaborasi antara pemerintah, masyarakat, dan lembaga pendidikan dapat menghasilkan perubahan signifikan bagi kemajuan nagari. Harapannya, kegiatan serupa dapat terus berlanjut di sektor pembangunan lainnya sebagai bentuk perwujudan visi Guguak Malalo yang mandiri, produktif, dan berdaya saing tinggi.</p>
    `,
    image: "/pembangunanjalan.jpg",
    date: "28 Juni 2025",
    author: "Admin Nagari",
    authorImage: "/tanahdatar.png",
    views: "634",
    likes: "39",
    comments: "5",
    category: "Pembangunan",
    tags: ["Pembangunan", "Infrastruktur", "Gotong Royong"],
    featured: false,
  },
  {
    id: "4",
    title: "Anak KKN UNP bersama Pemuda Jorong Baing Melakukan Pemijahan Ikan Bilih untuk Menjaga Kelangsungan",
    excerpt:
      "Dalam rangka melestarikan dan mengatasi kelangkaan ikan bilih, kelompok KKN UNP bersama pemuda Jorong Baing melakukan kegiatan pemijahan ikan bilih secara berkelanjutan di perairan sekitar Guguak Malalo.",
    content: `
      <p class="mb-4">JORONG BAING - Pada Rabu, 2 Juli 2025, sekelompok mahasiswa Kuliah Kerja Nyata (KKN) dari Universitas Negeri Padang (UNP) bersama pemuda Jorong Baing, Nagari Guguak Malalo, Kecamatan Batipuh Selatan, mengadakan kegiatan pemijahan ikan bilih. Kegiatan ini bertujuan untuk melestarikan ikan endemik Danau Singkarak tersebut sekaligus mengatasi potensi kelangkaan yang mulai dirasakan masyarakat.</p>

      <p class="mb-4">Ikan bilih (Mystacoleucus padangensis) merupakan salah satu kekayaan hayati yang menjadi ciri khas dan sumber penghidupan sebagian masyarakat sekitar Danau Singkarak. Namun, dalam beberapa tahun terakhir, populasi ikan bilih mulai mengalami penurunan akibat penangkapan berlebihan dan degradasi habitat.</p>

      <p class="mb-4">Kegiatan pemijahan ini dilakukan secara manual dengan metode tradisional yang dibimbing oleh masyarakat yang telah berpengalaman dalam budidaya ikan bilih. Mahasiswa KKN UNP bersama pemuda setempat turut membersihkan kolam, menyiapkan media pemijahan, serta membantu proses pemijahan ikan bilih yang dilakukan secara alami.</p>

      <p class="mb-4">Inisiatif ini juga menjadi bagian dari edukasi lingkungan yang diusung oleh mahasiswa KKN, sekaligus membangun kesadaran kolektif masyarakat untuk menjaga keberlanjutan sumber daya alam lokal. Selain itu, kegiatan ini diharapkan mampu memberikan dampak ekonomi melalui peningkatan populasi ikan bilih yang dapat dimanfaatkan secara berkelanjutan oleh warga sekitar.</p>

      <p class="mb-4">Pemerintah nagari menyambut baik kegiatan ini dan berharap ke depan akan semakin banyak kolaborasi serupa yang mendorong pelestarian lingkungan dan pemberdayaan masyarakat lokal. Kegiatan pemijahan ikan bilih ini menjadi langkah awal untuk membangun kesadaran ekologis dan menjaga identitas lingkungan Nagari Guguak Malalo.</p>
    `,
    image:
      "/pemijahanikan.jpg",
    date: "2 Juli 2025",
    author: "Admin Nagari",
    authorImage: "/tanahdatar.png",
    views: "923",
    likes: "51",
    comments: "7",
    category: "Lingkungan",
    tags: ["Lingkungan", "Ikan Bilih", "Pelestarian"],
    featured: false,
  },
];

const BeritaDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  useEffect(() => {
    // Find the article with the matching id
    const foundArticle = newsArticles.find((item) => item.id === id);

    if (foundArticle) {
      setArticle(foundArticle);

      // Find related articles based on category or tags
      const related = newsArticles
        .filter(
          (item) =>
            item.id !== id &&
            (item.category === foundArticle.category ||
              item.tags.some((tag) => foundArticle.tags.includes(tag)))
        )
        .slice(0, 3);

      setRelatedArticles(related);
    }
  }, [id]);

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Artikel tidak ditemukan</h1>
            <Link to="/informasi">
              <Button>Kembali ke Informasi</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${article.image})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Link to="/informasi">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white bg-black/30 backdrop-blur-sm hover:bg-white hover:text-gray-800"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Kembali ke Informasi
                </Button>
              </Link>
              <Badge className="bg-white/80 text-gray-800 hover:bg-white">
                {article.category}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                {/* Article Meta */}
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={article.authorImage}
                          alt={article.author}
                        />
                        <AvatarFallback>
                          {article.author.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{article.author}</div>
                        <div className="text-sm text-gray-500">
                          {article.category}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{article.date}</span>
                      </div>
                      {article.time && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{article.time}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: article.content || article.excerpt,
                    }}
                  ></div>

                  {/* Image Gallery */}
                  {article.galleryImages &&
                    article.galleryImages.length > 0 && (
                      <div className="my-8">
                        <h3 className="font-bold text-lg mb-4">Galeri Foto</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {article.galleryImages.map(
                            (img: string, idx: number) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`Gallery image ${idx + 1}`}
                                className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                              />
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Tags */}
                  <div className="mt-8">
                    <div className="flex flex-wrap gap-2">
                      {article.tags &&
                        article.tags.map((tag: string, idx: number) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="cursor-pointer"
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Social Share and Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Suka ({article.likes})
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Komentar ({article.comments})
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Bagikan:</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                      >
                        <Facebook className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                      >
                        <Twitter className="h-4 w-4 text-blue-400" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Related Articles */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Artikel Terkait</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((item, idx) => (
                      <Link to={`/informasi/berita/${item.id}`} key={idx}>
                        <div className="flex space-x-4 group">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-24 h-16 object-cover rounded-md flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm group-hover:text-green-600 transition-colors line-clamp-2">
                              {item.title}
                            </h4>
                            <div className="flex items-center mt-1">
                              <Calendar className="h-3 w-3 text-gray-500" />
                              <span className="text-xs text-gray-500 ml-1">
                                {item.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Kategori</h3>
                  <div className="space-y-2">
                    <Link to="/informasi?kategori=Event">
                      <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-gray-700">Event</span>
                        <Badge variant="secondary">24</Badge>
                      </div>
                    </Link>
                    <Link to="/informasi?kategori=Ekonomi">
                      <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-gray-700">Ekonomi</span>
                        <Badge variant="secondary">18</Badge>
                      </div>
                    </Link>
                    <Link to="/informasi?kategori=Pertanian">
                      <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-gray-700">Pertanian</span>
                        <Badge variant="secondary">15</Badge>
                      </div>
                    </Link>
                    <Link to="/informasi?kategori=Infrastruktur">
                      <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-gray-700">Infrastruktur</span>
                        <Badge variant="secondary">12</Badge>
                      </div>
                    </Link>
                    <Link to="/informasi?kategori=Pendidikan">
                      <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-gray-700">Pendidikan</span>
                        <Badge variant="secondary">9</Badge>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Tag Populer</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      Pariwisata
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      UMKM
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      Budaya
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      Pembangunan
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      Festival
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      Digital
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      Pertanian
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      Bantuan
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">
              Dapatkan Informasi Terbaru
            </h2>
            <p className="text-gray-600 mb-6">
              Berlangganan newsletter kami untuk mendapatkan berita dan
              informasi terbaru dari Nagari GuguakMalalo
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Alamat email Anda"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Button className="bg-green-600 hover:bg-green-700">
                Berlangganan
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BeritaDetail;
