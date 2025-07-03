import React from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Users,
  Calendar,
  Award,
  Mountain,
  Droplets,
  GanttChart,
  Map,
} from "lucide-react";

const Profil = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/kantorwali.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ca186]/80 to-blue-600/80"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Profil Nagari Guguak Malalo
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Mengenal lebih dekat sejarah, visi misi, dan potensi Nagari Guguak
            Malalo
          </p>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7ca186] to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">4256</div>
              <div className="text-gray-600">Penduduk</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">52.38</div>
              <div className="text-gray-600">km² Luas</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mountain className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">8</div>
              <div className="text-gray-600">Objek Wisata</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">1</div>
              <div className="text-gray-600">Danau Besar</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Sejarah */}
            <Card className="p-8 shadow-xl border-0">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-[#7ca186] mr-3" />
                Sejarah Nagari
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Nagari Guguak Malalo memiliki sejarah panjang yang berakar
                  dari tradisi Minangkabau kuno. Nama "Guguak Malalo" berasal
                  dari bahasa Minang yang bermakna "tempat berkumpul yang
                  damai".
                </p>
                <p>
                  Nagari ini didirikan pada abad ke-16 oleh Datuk Malalo bersama
                  pengikutnya yang mencari tempat bermukim di kawasan perbukitan
                  yang subur dan kaya akan sumber air.
                </p>
                <p>
                  Sepanjang sejarahnya, Guguak Malalo telah menjadi pusat
                  perdagangan dan pertanian di wilayah Kabupaten Lima Puluh
                  Kota, dengan komoditas utama berupa padi, jagung, dan hasil
                  perkebunan.
                </p>
              </div>
            </Card>

            {/* Geografis */}
            <Card className="p-8 shadow-xl border-0">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                Geografis & Demografis
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">Lokasi:</h3>
                  <p>
                    Kecamatan Batipuh Selatan, Kabupaten Tanah Datar, Sumatera
                    Barat
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Batas Wilayah:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Utara: Nagari Padang Laweh Malalo</li>
                    <li>• Selatan: Kabupaten Solok (Nagari Paninggahan)</li>
                    <li>
                      • Barat: Kabupaten Padang Pariaman (Nagari Asam Pulau)
                    </li>
                    <li>
                      • Timur: Nagari lain dalam Kecamatan Batipuh Selatan
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Topografi:</h3>
                  <p>
                    Dataran tinggi dengan ketinggian 400-450 mdpl, terletak
                    dekat dengan Danau Singkarak
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Visi Misi */}
          <div className="mt-12">
            <Card className="p-8 shadow-xl border-0">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Visi & Misi Nagari
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#7ca186] to-blue-500 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[#7ca186] mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Visi
                  </h3>
                  <p className="text-gray-700 leading-relaxed italic">
                    "Mewujudkan Nagari Guguak Malalo sebagai destinasi wisata
                    berkelanjutan yang berbasis masyarakat, dengan tata kelola
                    pemerintahan yang modern, transparans, dan responsif
                    terhadap kebutuhan masyarakat."
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Misi
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • Mengembangkan sektor pariwisata berbasis alam dan budaya
                    </li>
                    <li>• Meningkatkan kualitas pelayanan publik</li>
                    <li>• Memberdayakan ekonomi masyarakat melalui UMKM</li>
                    <li>• Melestarikan lingkungan dan kearifan lokal</li>
                    <li>• Mengimplementasikan tata kelola digital</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Maps Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Peta Nagari Guguak Malalo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jelajahi lokasi dan batas wilayah Nagari Guguak Malalo di peta
              interaktif
            </p>
          </div>

          <Card className="p-4 shadow-xl border-0 overflow-hidden">
            <div className="aspect-[16/9] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.235778919711!2d100.49810!3d-0.59915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd54bd2f0efa2a3%3A0x100c5833d5fc0f0!2sKantor%20Walinagari%20Guguak%20Malalo%2C%20Batipuh%20Selatan%2C%20Tanah%20Datar%2C%20West%20Sumatra!5e0!3m2!1sen!2sid!4v1650000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Nagari Guguak Malalo"
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center justify-center bg-gray-50 p-3 rounded-lg">
                <MapPin className="h-4 w-4 text-[#7ca186] mr-2" />
                <span>Kantor Wali Nagari: Jl. Raya Guguak Malalo No. 12</span>
              </div>
              <div className="flex items-center justify-center bg-gray-50 p-3 rounded-lg">
                <Map className="h-4 w-4 text-blue-600 mr-2" />
                <span>Luas Wilayah: 52.38 km²</span>
              </div>
              <div className="flex items-center justify-center bg-gray-50 p-3 rounded-lg">
                <Users className="h-4 w-4 text-green-600 mr-2" />
                <span>3 Jorong (Dusun)</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

{/* Organization Structure */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Struktur Pemerintahan Nagari
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Struktur organisasi kantor Wali Nagari Guguak Malalo
            </p>
          </div>
          <Card className="p-4 md:p-8 shadow-xl border-0">
            <div className="org-chart relative">
              {/* Mobile Note */}
              <div className="md:hidden text-center text-sm text-gray-500 mb-6">
                <p>Scroll ke kanan/kiri</p>
              </div>

              <div className="overflow-x-auto pb-4">
                <div className="min-w-[1200px]">
                  {/* Top Level - Wali Nagari */}
                  <div className="flex justify-center mb-16 sm:mb-20">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-[#7ca186] to-blue-600 text-white p-4 rounded-lg shadow-lg text-center w-56 sm:w-64">
                        <div className="flex flex-col items-center">
                          <img
                            src="/fotopakwali.png"
                            alt="Mulyadi - Wali Nagari"
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md mb-2 object-cover"
                          />
                          <h3 className="font-bold text-lg">MULYADI</h3>
                          <p>WALI NAGARI</p>
                        </div>
                      </div>
                      {/* Vertical line below Wali */}
                      <div className="absolute w-1 h-16 bg-gray-300 left-1/2 -ml-0.5 top-full"></div>
                    </div>
                  </div>

                  {/* Second Level - Sekretaris Nagari */}
                  <div className="flex justify-center mb-16 sm:mb-20">
                    <div className="relative">
                      <div className="bg-blue-500 text-white p-3 sm:p-4 rounded-lg shadow-md text-center w-48 sm:w-56">
                        <div className="flex flex-col items-center">
                          <img
                            src="https://randomuser.me/api/portraits/men/42.jpg"
                            alt="Rizal Ambri - Sekretaris Nagari"
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-md mb-2 object-cover"
                          />
                          <h3 className="font-bold text-sm sm:text-base">
                            RIZAL AMBRI
                          </h3>
                          <p className="text-xs sm:text-sm">
                            SEKRETARIS NAGARI
                          </p>
                        </div>
                      </div>
                      {/* Vertical line down from Sekretaris */}
                      <div className="absolute w-0.5 h-16 bg-gray-300 left-1/2 -ml-0.5 top-full"></div>
                    </div>
                  </div>

                  {/* Third Level - Kepala Seksi */}
                  <div className="mb-16 sm:mb-20 relative">
                    {/* Horizontal line connecting all Kepala Seksi */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-[95%] h-0.5 bg-gray-300"></div>

                    {/* Vertical lines to each Kepala Seksi */}
                    <div className="absolute -top-16 left-[6%] w-0.5 h-5 bg-gray-300"></div>
                    <div className="absolute -top-16 left-[23%] w-0.5 h-5 bg-gray-300"></div>
                    <div className="absolute -top-16 left-[40%] w-0.5 h-5 bg-gray-300"></div>
                    <div className="absolute -top-16 left-[57%] w-0.5 h-5 bg-gray-300"></div>
                    <div className="absolute -top-16 left-[74%] w-0.5 h-5 bg-gray-300"></div>
                    <div className="absolute -top-16 left-[91%] w-0.5 h-5 bg-gray-300"></div>

                    <div className="grid grid-cols-6 gap-2">
                      {[
                        {
                          name: "JUMAIDA A",
                          title: "KEPALA SEKSI PEMERINTAHAN",
                          photo: "https://randomuser.me/api/portraits/women/22.jpg",
                        },
                        {
                          name: "ASISWAN",
                          title: "KEPALA SEKSI KESEJAHTERAAN",
                          photo: "https://randomuser.me/api/portraits/men/26.jpg",
                        },
                        {
                          name: "YULIA HELDA S.Pd",
                          title: "KEPALA SEKSI PELAYANAN",
                          photo: "https://randomuser.me/api/portraits/women/33.jpg",
                        },
                        {
                          name: "FIDRIANS S.Pd",
                          title: "KEPALA URUSAN TU DAN UMUM",
                          photo: "https://randomuser.me/api/portraits/men/65.jpg",
                        },
                        {
                          name: "HADIYATI M.S.E",
                          title: "KEPALA URUSAN KEUANGAN",
                          photo: "https://randomuser.me/api/portraits/women/78.jpg",
                        },
                        {
                          name: "M.IHSAN S.E",
                          title: "KEPALA URUSAN PERENCANAAN",
                          photo: "https://randomuser.me/api/portraits/men/45.jpg",
                        },
                      ].map((staff, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="bg-[#7ca186] text-white p-2 sm:p-3 rounded-lg shadow-md text-center w-full min-h-[120px] flex flex-col justify-center">
                            <div className="flex flex-col items-center">
                              <img
                                src={staff.photo}
                                alt={`${staff.name} - ${staff.title}`}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md mb-1 object-cover"
                              />
                              <h3 className="font-bold text-[10px] sm:text-xs mb-1">
                                {staff.name}
                              </h3>
                              <p className="text-[8px] sm:text-[10px] leading-tight">
                                {staff.title}
                              </p>
                            </div>
                          </div>
                          {/* Vertical line down for staff - only for first 4 positions */}
                          {index < 4 && (
                            <div className="w-0.5 h-8 bg-gray-300"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fourth Level - Staff */}
                  <div className="mb-16 sm:mb-20 relative">
                    <div className="grid grid-cols-6 gap-2">
                      {[
                        {
                          name: "EDO ADIYAT PUTRA S.E",
                          title: "STAFF",
                          photo: "https://randomuser.me/api/portraits/men/35.jpg",
                        },
                        {
                          name: "GUSRIZAL Amd",
                          title: "STAFF",
                          photo: "https://randomuser.me/api/portraits/men/48.jpg",
                        },
                        {
                          name: "INDAH PERMATA SARI S.E",
                          title: "STAFF",
                          photo: "https://randomuser.me/api/portraits/women/52.jpg",
                        },
                        {
                          name: "M.ARIF",
                          title: "STAFF",
                          photo: "https://randomuser.me/api/portraits/men/67.jpg",
                        },
                        {
                          name: "",
                          title: "",
                          photo: "",
                        },
                        {
                          name: "",
                          title: "",
                          photo: "",
                        },
                      ].map((staff, index) => (
                        <div key={index} className="flex flex-col items-center">
                          {staff.name && (
                            <div className="bg-gray-100 border-2 border-gray-300 p-2 sm:p-3 rounded-lg shadow-sm text-center w-full min-h-[100px] flex flex-col justify-center">
                              <div className="flex flex-col items-center">
                                <img
                                  src={staff.photo}
                                  alt={`${staff.name} - ${staff.title}`}
                                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-400 shadow-md mb-1 object-cover"
                                />
                                <h3 className="font-bold text-[10px] sm:text-xs text-gray-700 mb-1">
                                  {staff.name}
                                </h3>
                                <p className="text-[8px] sm:text-[10px] text-gray-600">
                                  {staff.title}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fifth Level - Kepala Jorong */}
                  <div className="mt-16 pt-8 relative">
                    {/* Main vertical line from center up to connect with staff section */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-300"></div>
                    
                    {/* Horizontal line connecting all Jorong */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-[60%] h-0.5 bg-gray-300"></div>

                    {/* Vertical lines to each Jorong */}
                    <div className="absolute -top-8 left-[25%] w-0.5 h-5 bg-gray-300"></div>
                    <div className="absolute -top-8 left-[50%] w-0.5 h-5 bg-gray-300"></div>
                    <div className="absolute -top-8 left-[75%] w-0.5 h-5 bg-gray-300"></div>

                    <h3 className="text-lg sm:text-xl font-bold text-center text-gray-700 mb-6 sm:mb-8">
                      Kepala Jorong
                    </h3>

                    <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                      {[
                        {
                          name: "JONUS",
                          jorong: "KEPALA JORONG DUO KOTO",
                          photo: "https://randomuser.me/api/portraits/men/55.jpg",
                        },
                        {
                          name: "YUNARMAN",
                          jorong: "KEPALA JORONG GUGUAK",
                          photo: "https://randomuser.me/api/portraits/men/62.jpg",
                        },
                        {
                          name: "SYAFRUDIN",
                          jorong: "KEPALA JORONG BALANG",
                          photo: "https://randomuser.me/api/portraits/men/45.jpg",
                        },
                      ].map((kepala, index) => (
                        <div
                          key={index}
                          className="bg-green-100 border-2 border-green-300 rounded-lg p-3 sm:p-4 shadow-sm"
                        >
                          <div className="flex flex-col items-center text-center">
                            <img
                              src={kepala.photo}
                              alt={`${kepala.name} - ${kepala.jorong}`}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-green-400 shadow-md mb-3 object-cover"
                            />
                            <div>
                              <p className="font-bold text-sm sm:text-base text-green-800 mb-1">
                                {kepala.name}
                              </p>
                              <p className="text-xs sm:text-sm text-green-600 font-medium">
                                {kepala.jorong}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center text-xs sm:text-sm text-gray-600">
                  <GanttChart className="h-4 w-4 text-[#7ca186] mr-1" />
                  <span>
                    Struktur Organisasi sesuai dengan data resmi Nagari Guguak Malalo
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Add custom utility classes for organizational chart */}
      <style jsx global>{`
        .org-chart {
          --card-width-mobile: 90px;
          --card-width-tablet: 140px;
        }

        @media (max-width: 640px) {
          .org-chart .grid-cols-5 {
            grid-template-columns: repeat(5, var(--card-width-mobile));
          }
          .org-chart .grid-cols-4 {
            grid-template-columns: repeat(4, var(--card-width-mobile));
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .org-chart .grid-cols-5 {
            grid-template-columns: repeat(5, var(--card-width-tablet));
          }
          .org-chart .grid-cols-4 {
            grid-template-columns: repeat(4, var(--card-width-tablet));
          }
        }
      `}</style>
    </Layout>
  );
};

export default Profil;
