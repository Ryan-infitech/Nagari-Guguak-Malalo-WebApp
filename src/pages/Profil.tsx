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
            Profil Nagari GuguakMalalo
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Mengenal lebih dekat sejarah, visi misi, dan potensi Nagari
            GuguakMalalo
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
              <div className="text-3xl font-bold text-gray-800">15,432</div>
              <div className="text-gray-600">Penduduk</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">87.5</div>
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
              <div className="text-3xl font-bold text-gray-800">3</div>
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
                  Nagari GuguakMalalo memiliki sejarah panjang yang berakar dari
                  tradisi Minangkabau kuno. Nama "GuguakMalalo" berasal dari
                  bahasa Minang yang bermakna "tempat berkumpul yang damai".
                </p>
                <p>
                  Nagari ini didirikan pada abad ke-16 oleh Datuk Malalo bersama
                  pengikutnya yang mencari tempat bermukim di kawasan perbukitan
                  yang subur dan kaya akan sumber air.
                </p>
                <p>
                  Sepanjang sejarahnya, GuguakMalalo telah menjadi pusat
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
                    Kecamatan Harau, Kabupaten Lima Puluh Kota, Sumatera Barat
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Batas Wilayah:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Utara: Nagari Harau</li>
                    <li>• Selatan: Nagari Taeh</li>
                    <li>• Barat: Nagari Sariak</li>
                    <li>• Timur: Nagari Bukik Batabuah</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Topografi:</h3>
                  <p>
                    Berbukit-bukit dengan ketinggian 450-850 mdpl, dilengkapi
                    beberapa danau alami
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
                    "Mewujudkan Nagari GuguakMalalo sebagai destinasi wisata
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
    </Layout>
  );
};

export default Profil;
