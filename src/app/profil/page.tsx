import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { MapPin, Users, Calendar, Award, Mountain, Droplets, GanttChart, Map } from 'lucide-react';
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'Profil Nagari',
  description:
    'Profil lengkap Nagari Guguak Malalo, Batipuh Selatan, Tanah Datar, Sumatera Barat. Mengenal sejarah, geografis, visi misi dan struktur pemerintahan nagari.',
  keywords: [
    'profil nagari',
    'guguak malalo',
    'batipuh selatan',
    'tanah datar',
    'sejarah nagari guguak malalo',
    'pemerintahan nagari',
    'struktur organisasi nagari',
  ],
  image: '/kantorwali.jpg',
});

interface StatsCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  bgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, value, label, bgColor }) => (
  <div className="text-center">
    <div
      className={`h-16 w-16 ${bgColor} mx-auto mb-4 flex items-center justify-center rounded-full`}
    >
      {icon}
    </div>
    <div className="text-3xl font-bold text-gray-800">{value}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const Profil: React.FC = () => {
  const statsData: StatsCardProps[] = [
    {
      icon: <Users className="h-8 w-8 text-white" />,
      value: '4256',
      label: 'Penduduk',
      bgColor: 'bg-gradient-to-r from-[#7ca186] to-blue-500',
    },
    {
      icon: <MapPin className="h-8 w-8 text-white" />,
      value: '52.38',
      label: 'km² Luas',
      bgColor: 'bg-gradient-to-r from-blue-500 to-green-500',
    },
    {
      icon: <Mountain className="h-8 w-8 text-white" />,
      value: '8',
      label: 'Objek Wisata',
      bgColor: 'bg-gradient-to-r from-green-500 to-blue-500',
    },
    {
      icon: <Droplets className="h-8 w-8 text-white" />,
      value: '1',
      label: 'Danau Besar',
      bgColor: 'bg-gradient-to-r from-blue-500 to-green-500',
    },
  ];

  const organizationData = {
    waliNagari: {
      name: 'MULYADI',
      title: 'WALI NAGARI',
      photo: '/fotopakwali.png',
    },
    sekretaris: {
      name: 'RIZAL AMBRI',
      title: 'SEKRETARIS NAGARI',
      photo: '/images/struktur/6.png',
    },
    kepalaUrusan: [
      {
        name: 'JUNAIDA.A',
        title: 'KEPALA SEKSI PEMERINTAHAN',
        photo: '/images/struktur/9.png',
      },
      {
        name: 'AJISMAN',
        title: 'KEPALA SEKSI KESEJAHTERAAN',
        photo: '/images/struktur/7.png',
      },
      {
        name: 'YULIA HELDA,S.Pd',
        title: 'KEPALA SEKSI PELAYANAN',
        photo: '/images/struktur/12.png',
      },
      {
        name: 'FIDRIANIS,S.Pd',
        title: 'KEPALA URUSAN TU DAN UMUM',
        photo: '/images/struktur/11.png',
      },
      {
        name: 'HADIYATI M.S.E',
        title: 'KEPALA URUSAN KEUANGAN',
        photo: '/images/struktur/3.png',
      },
      {
        name: 'M.IHSAN S.E',
        title: 'KEPALA URUSAN PERENCANAAN',
        photo: '/images/struktur/5.png',
      },
    ],
    staff: [
      {
        name: 'EDO ADIYAT PUTRA S.E',
        title: 'STAFF',
        photo: '/images/struktur/10.png',
      },
      {
        name: 'GUSRIZAL Amd',
        title: 'STAFF',
        photo: '/images/struktur/8.png',
      },
      {
        name: 'INDAH PERMATA SARI S.E',
        title: 'STAFF',
        photo: '/images/struktur/2.png',
      },
      {
        name: 'M.ARIF',
        title: 'STAFF',
        photo: '/images/struktur/4.png',
      },
    ],
    kepalaJorong: [
      {
        name: 'JONUS',
        title: 'KEPALA JORONG DUO KOTO',
        photo: '/images/struktur/1.png',
      },
      {
        name: 'YUNARMAN',
        title: 'KEPALA JORONG GUGUAK',
        photo: '/images/struktur/placeholder.svg',
      },
      {
        name: 'SYAFRUDIN',
        title: 'KEPALA JORONG BAING',
        photo: '/images/struktur/placeholder.svg',
      },
    ],
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative pt-32 md:pt-36 pb-20 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/kantorwali.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ca186]/80 to-blue-600/80"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Profil Nagari Guguak Malalo</h1>
          <p className="mx-auto max-w-2xl text-xl">
            Mengenal lebih dekat sejarah, visi misi, dan potensi Nagari Guguak Malalo
          </p>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {statsData.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Sejarah */}
            <Card className="border-0 p-8 shadow-xl">
              <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-800">
                <Calendar className="mr-3 h-6 w-6 text-[#7ca186]" />
                Sejarah Nagari
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Nagari Guguak Malalo memiliki sejarah panjang yang berakar dari tradisi
                  Minangkabau kuno. Nama &ldquo;Guguak Malalo&rdquo; berasal dari bahasa Minang yang
                  bermakna &ldquo;tempat berkumpul yang damai&rdquo;.
                </p>
                <p>
                  Nagari ini didirikan pada abad ke-16 oleh Datuk Malalo bersama pengikutnya yang
                  mencari tempat bermukim di kawasan perbukitan yang subur dan kaya akan sumber air.
                </p>
                <p>
                  Sepanjang sejarahnya, Guguak Malalo telah menjadi pusat perdagangan dan pertanian
                  di wilayah Kabupaten Lima Puluh Kota, dengan komoditas utama berupa padi, jagung,
                  dan hasil perkebunan.
                </p>
              </div>
            </Card>

            {/* Geografis */}
            <Card className="border-0 p-8 shadow-xl">
              <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-800">
                <MapPin className="mr-3 h-6 w-6 text-blue-600" />
                Geografis & Demografis
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="mb-2 font-semibold">Lokasi:</h3>
                  <p>Kecamatan Batipuh Selatan, Kabupaten Tanah Datar, Sumatera Barat</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Batas Wilayah:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Utara: Nagari Padang Laweh Malalo</li>
                    <li>• Selatan: Kabupaten Solok (Nagari Paninggahan)</li>
                    <li>• Barat: Kabupaten Padang Pariaman (Nagari Asam Pulau)</li>
                    <li>• Timur: Nagari lain dalam Kecamatan Batipuh Selatan</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Topografi:</h3>
                  <p>
                    Dataran tinggi dengan ketinggian 400-450 mdpl, terletak dekat dengan Danau
                    Singkarak
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Visi Misi */}
          <div className="mt-12">
            <Card className="border-0 p-8 shadow-xl">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-800">Visi & Misi Nagari</h2>
                <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[#7ca186] to-blue-500"></div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 flex items-center text-xl font-bold text-[#7ca186]">
                    <Award className="mr-2 h-5 w-5" />
                    Visi
                  </h3>
                  <p className="italic leading-relaxed text-gray-700">
                    &ldquo;Mewujudkan Nagari Guguak Malalo sebagai destinasi wisata berkelanjutan
                    yang berbasis masyarakat, dengan tata kelola pemerintahan yang modern,
                    transparans, dan responsif terhadap kebutuhan masyarakat.&rdquo;
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 flex items-center text-xl font-bold text-blue-600">
                    <Award className="mr-2 h-5 w-5" />
                    Misi
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Mengembangkan sektor pariwisata berbasis alam dan budaya</li>
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
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Peta Nagari Guguak Malalo</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Jelajahi lokasi dan batas wilayah Nagari Guguak Malalo di peta interaktif
            </p>
          </div>

          <Card className="overflow-hidden border-0 p-4 shadow-xl">
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
              />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-3">
              <div className="flex items-center justify-center rounded-lg bg-gray-50 p-3">
                <MapPin className="mr-2 h-4 w-4 text-[#7ca186]" />
                <span>Kantor Wali Nagari: Jl. Raya Guguak Malalo No. 12</span>
              </div>
              <div className="flex items-center justify-center rounded-lg bg-gray-50 p-3">
                <Map className="mr-2 h-4 w-4 text-blue-600" />
                <span>Luas Wilayah: 52.38 km²</span>
              </div>
              <div className="flex items-center justify-center rounded-lg bg-gray-50 p-3">
                <Users className="mr-2 h-4 w-4 text-green-600" />
                <span>3 Jorong (Dusun)</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Struktur Pemerintahan Nagari</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Struktur organisasi kantor Wali Nagari Guguak Malalo
            </p>
          </div>
          <Card className="border-0 p-4 shadow-xl md:p-8">
            <div className="org-chart relative">
              {/* Mobile Note */}
              <div className="mb-6 text-center text-sm text-gray-500 md:hidden">
                <p>Scroll ke kanan/kiri untuk melihat struktur lengkap</p>
              </div>

              <div className="overflow-x-auto pb-4">
                <div className="min-w-[1200px]">
                  {/* Top Level - Wali Nagari */}
                  <div className="mb-16 flex justify-center sm:mb-20">
                    <div className="relative">
                      <div className="w-56 rounded-lg bg-gradient-to-r from-[#7ca186] to-blue-600 p-4 text-center text-white shadow-lg sm:w-64">
                        <div className="flex flex-col items-center">
                          <div className="relative h-20 w-20 sm:h-24 sm:w-24">
                            <Image
                              src={organizationData.waliNagari.photo}
                              alt={`${organizationData.waliNagari.name} - ${organizationData.waliNagari.title}`}
                              fill
                              className="rounded-full border-4 border-white object-cover shadow-md"
                            />
                          </div>
                          <h3 className="mt-2 text-lg font-bold">
                            {organizationData.waliNagari.name}
                          </h3>
                          <p>{organizationData.waliNagari.title}</p>
                        </div>
                      </div>
                      {/* Vertical line below Wali */}
                      <div className="absolute left-1/2 top-full -ml-0.5 h-16 w-1 bg-gray-300"></div>
                    </div>
                  </div>

                  {/* Second Level - Sekretaris Nagari */}
                  <div className="mb-16 flex justify-center sm:mb-20">
                    <div className="relative">
                      <div className="w-48 rounded-lg bg-[#7ca186] p-3 text-center text-white shadow-md sm:w-56 sm:p-4">
                        <div className="flex flex-col items-center">
                          <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                            <Image
                              src={organizationData.sekretaris.photo}
                              alt={`${organizationData.sekretaris.name} - ${organizationData.sekretaris.title}`}
                              fill
                              className="rounded-full border-4 border-white object-cover shadow-md"
                            />
                          </div>
                          <h3 className="mt-2 text-sm font-bold sm:text-base">
                            {organizationData.sekretaris.name}
                          </h3>
                          <p className="text-xs sm:text-sm">{organizationData.sekretaris.title}</p>
                        </div>
                      </div>
                      {/* Vertical line down from Sekretaris */}
                      <div className="absolute left-1/2 top-full -ml-0.5 h-16 w-0.5 bg-gray-300"></div>
                    </div>
                  </div>

                  {/* Third Level - Kepala Urusan */}
                  <div className="relative mb-16 sm:mb-20">
                    {/* Horizontal line connecting all Kepala Urusan */}
                    <div className="absolute -top-16 left-1/2 h-0.5 w-[95%] -translate-x-1/2 transform bg-gray-300"></div>

                    {/* Vertical lines to each position */}
                    {organizationData.kepalaUrusan.map((_, index) => (
                      <div
                        key={index}
                        className={`absolute -top-16 h-5 w-0.5 bg-gray-300`}
                        style={{ left: `${6 + index * 17}%` }}
                      />
                    ))}

                    <div className="grid grid-cols-6 gap-2">
                      {organizationData.kepalaUrusan.map((staff, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="flex min-h-[120px] w-full flex-col justify-center rounded-lg bg-[#7ca186] p-2 text-center text-white shadow-md sm:p-3">
                            <div className="flex flex-col items-center">
                              <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                                <Image
                                  src={staff.photo}
                                  alt={`${staff.name} - ${staff.title}`}
                                  fill
                                  className="rounded-full border-2 border-white object-cover shadow-md"
                                />
                              </div>
                              <h3 className="mb-1 mt-1 text-[10px] font-bold sm:text-xs">
                                {staff.name}
                              </h3>
                              <p className="text-[8px] leading-tight sm:text-[10px]">
                                {staff.title}
                              </p>
                            </div>
                          </div>
                          {/* Vertical line down for first 4 positions */}
                          {index < 4 && <div className="h-8 w-0.5 bg-gray-300"></div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fourth Level - Staff */}
                  <div className="relative mb-16 sm:mb-20">
                    <div className="grid grid-cols-6 gap-2">
                      {organizationData.staff.map((staff, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="flex min-h-[100px] w-full flex-col justify-center rounded-lg border-2 border-gray-300 bg-gray-100 p-2 text-center shadow-sm sm:p-3">
                            <div className="flex flex-col items-center">
                              <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                                <Image
                                  src={staff.photo}
                                  alt={`${staff.name} - ${staff.title}`}
                                  fill
                                  className="rounded-full border-2 border-gray-400 object-cover shadow-md"
                                />
                              </div>
                              <h3 className="mb-1 mt-1 text-[10px] font-bold text-gray-700 sm:text-xs">
                                {staff.name}
                              </h3>
                              <p className="text-[8px] text-gray-600 sm:text-[10px]">
                                {staff.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* Empty slots for remaining columns */}
                      {Array.from({ length: 2 }).map((_, index) => (
                        <div key={`empty-${index}`} className="flex flex-col items-center">
                          {/* Empty slot */}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fifth Level - Kepala Jorong */}
                  <div className="relative mt-16 pt-8">
                    {/* Main vertical line from center up to connect with staff section */}
                    <div className="absolute -top-16 left-1/2 h-8 w-0.5 -translate-x-1/2 transform bg-gray-300"></div>

                    {/* Horizontal line connecting all Jorong */}
                    <div className="absolute -top-8 left-1/2 h-0.5 w-[60%] -translate-x-1/2 transform bg-gray-300"></div>

                    {/* Vertical lines to each Jorong */}
                    <div className="absolute -top-8 left-[25%] h-5 w-0.5 bg-gray-300"></div>
                    <div className="absolute -top-8 left-[50%] h-5 w-0.5 bg-gray-300"></div>
                    <div className="absolute -top-8 left-[75%] h-5 w-0.5 bg-gray-300"></div>

                    <h3 className="mb-6 text-center text-lg font-bold text-gray-700 sm:mb-8 sm:text-xl">
                      Kepala Jorong
                    </h3>

                    <div className="mx-auto grid max-w-4xl grid-cols-3 gap-8">
                      {organizationData.kepalaJorong.map((kepala, index) => (
                        <div
                          key={index}
                          className="rounded-lg border-2 border-green-300 bg-[#7ca186] p-3 shadow-sm sm:p-4"
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                              <Image
                                src={kepala.photo}
                                alt={`${kepala.name} - ${kepala.title}`}
                                fill
                                className="border-3 rounded-full border-green-400 object-cover shadow-md"
                              />
                            </div>
                            <div className="mt-3">
                              <p className="mb-1 text-sm font-bold text-white sm:text-base">
                                {kepala.name}
                              </p>
                              <p className="text-xs font-medium text-white sm:text-sm">
                                {kepala.title}
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
                <div className="inline-flex items-center text-xs text-gray-600 sm:text-sm">
                  <GanttChart className="mr-1 h-4 w-4 text-[#7ca186]" />
                  <span>Struktur Organisasi sesuai dengan data resmi Nagari Guguak Malalo</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Profil;
