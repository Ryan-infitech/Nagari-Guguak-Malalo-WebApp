import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  Building,
  Heart,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";

// Custom scroll-to-top link component
const ScrollToTopLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={to} onClick={handleClick}>
      {children}
    </Link>
  );
};

const QuickServices = () => {
  const services = [
    {
      icon: FileText,
      title: "Layanan Kependudukan",
      description:
        "Pengajuan surat domisili, SKTM, surat kelahiran, dan berbagai dokumen kependudukan lainnya",
      color: "from-green-500 to-green-600",
      href: "/layanan/kependudukan",
      popular: true,
    },
    {
      icon: Building,
      title: "Layanan Pembangunan",
      description:
        "Bantuan pembangunan, laporan kerusakan infrastruktur, dan monitoring proyek nagari",
      color: "from-blue-500 to-blue-600",
      href: "/layanan/pembangunan",
    },
    {
      icon: Users,
      title: "Layanan Ekonomi",
      description:
        "Pendaftaran UMKM, izin usaha mikro, bantuan modal, dan pelatihan kewirausahaan",
      color: "from-purple-500 to-purple-600",
      href: "/layanan/ekonomi",
    },
    {
      icon: Heart,
      title: "Layanan Sosial",
      description:
        "Bantuan sosial, program pemberdayaan masyarakat, dan kegiatan gotong royong",
      color: "from-pink-500 to-pink-600",
      href: "/layanan/sosial",
    },
  ];

  const stats = [
    { number: "2,847", label: "Permohonan Selesai", icon: CheckCircle },
    { number: "24/7", label: "Layanan Online", icon: Clock },
    { number: "156", label: "UMKM Terdaftar", icon: Building },
    { number: "98%", label: "Kepuasan Warga", icon: Heart },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Layanan Digital Terpadu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Akses berbagai layanan administrasi nagari dengan mudah, cepat, dan
            transparan melalui platform digital kami yang tersedia 24/7
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-3">
                <stat.icon className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:scale-105 relative overflow-hidden flex flex-col h-full"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Populer
                </div>
              )}

              <div className="p-6 flex flex-col h-full">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                  {service.title}
                </h3>

                {/* Fixed height content area */}
                <div className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                  {service.description}
                </div>

                {/* Button consistently at bottom */}
                <div className="mt-auto">
                  <ScrollToTopLink to={service.href}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-300"
                    >
                      Akses Layanan
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </ScrollToTopLink>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <ScrollToTopLink to="/layanan">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Lihat Semua Layanan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </ScrollToTopLink>
        </div>
      </div>
    </section>
  );
};

export default QuickServices;
