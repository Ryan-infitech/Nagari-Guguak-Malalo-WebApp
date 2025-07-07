import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Globe,
  Code,
  Users,
  Calendar,
  MapPin,
  BookOpen,
  Phone,
  Crown,
  Award,
  Shield,
} from "lucide-react";

interface TeamMemberDetailProps {
  name: string;
  role: string;
  photo: string;
  quote: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  website?: string;
  whatsapp?: string;
  isReversed?: boolean;
}

const TeamMemberDetail: React.FC<TeamMemberDetailProps> = ({
  name,
  role,
  photo,
  quote,
  instagram,
  linkedin,
  github,
  email,
  website,
  whatsapp,
  isReversed = false,
}) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 max-w-4xl mx-auto mb-16 ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="w-64 h-64 rounded-full overflow-hidden bg-gray-100 shadow-lg border-4 border-white flex-shrink-0">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              name
            )}&background=0D8ABC&color=fff&size=200`;
          }}
        />
      </div>

      <div
        className={`flex-1 text-center ${
          isReversed ? "lg:text-right" : "lg:text-left"
        }`}
      >
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-lg text-[#7ca186] mb-4">{role}</p>

        <blockquote
          className={`italic text-gray-600 text-lg border-[#7ca186] pl-4 my-6 ${
            isReversed ? "border-r-4 border-l-0 pr-4 pl-0" : "border-l-4"
          }`}
        >
          "{quote}"
        </blockquote>

        <div
          className={`flex space-x-4 mt-4 ${
            isReversed
              ? "justify-center lg:justify-end"
              : "justify-center lg:justify-start"
          }`}
        >
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-600 transition-colors"
            >
              <Instagram size={20} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Github size={20} />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <Mail size={20} />
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 transition-colors"
            >
              <Globe size={20} />
            </a>
          )}
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#7ca186] transition-colors"
            >
              <Phone size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

interface CoordinatorCardProps {
  name: string;
  role: string;
  photo: string;
  quote: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  website?: string;
  whatsapp?: string;
  icon: React.ReactNode;
}

const CoordinatorCard: React.FC<CoordinatorCardProps> = ({
  name,
  role,
  photo,
  quote,
  instagram,
  linkedin,
  github,
  email,
  website,
  whatsapp,
  icon,
}) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-[#7ca186]/10 border-2 border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-[#7ca186]/5"></div>

      {/* Role Icon */}
      <div className="absolute top-4 right-4 text-blue-600 bg-white/80 p-2 rounded-full shadow-lg">
        {icon}
      </div>

      <CardContent className="p-8 relative z-10">
        <div className="text-center mb-6">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 shadow-xl border-4 border-white ring-4 ring-blue-100">
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  name
                )}&background=0D8ABC&color=fff&size=200`;
              }}
            />
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-[#7ca186] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            <Award size={16} />
            {role}
          </div>
        </div>

        <blockquote className="italic text-gray-600 text-center border-l-4 border-blue-500 pl-4 mb-6 bg-white/50 p-4 rounded-r-lg">
          "{quote}"
        </blockquote>

        <div className="flex justify-center space-x-4">
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-600 transition-colors bg-white p-2 rounded-full shadow-md hover:shadow-lg"
            >
              <Instagram size={18} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors bg-white p-2 rounded-full shadow-md hover:shadow-lg"
            >
              <Linkedin size={18} />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors bg-white p-2 rounded-full shadow-md hover:shadow-lg"
            >
              <Github size={18} />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-gray-500 hover:text-red-500 transition-colors bg-white p-2 rounded-full shadow-md hover:shadow-lg"
            >
              <Mail size={18} />
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 transition-colors bg-white p-2 rounded-full shadow-md hover:shadow-lg"
            >
              <Globe size={18} />
            </a>
          )}
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#7ca186] transition-colors bg-white p-2 rounded-full shadow-md hover:shadow-lg"
            >
              <Phone size={18} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const TeamDeveloper = () => {
  const teamMembers = [
    {
      name: "Rian Septiawan",
      role: "Lead Developer",
      photo: "/images/team/RIANSEPTIAWAN.JPG",
      quote:
        "Bukan hanya membuat sebuah website, tetapi kami membangun sistem, walaupun belum sempurna, kami berharap projek ini dapat menjadi pondasi dari digitalisaasi Nagari Guguak Malalo.",
      instagram: "https://www.instagram.com/ryan.septiawan__/",
      linkedin: "https://www.linkedin.com/in/rian-septiawan/",
      github: "https://github.com/Ryan-infitech",
      email: "ryan.septiawan0115@gmail.com",
      whatsapp: "6285157517798",
      website: "https://rianseptiawan.engineer",
    },
    {
      name: "Jihan Zahrah Abrilia",
      role: "UI/UX Designer",
      photo: "/images/team/Jihanzahrahabrilia.jpg",
      quote:
        "Desain yang baik bukan hanya tentang keindahan, tetapi tentang bagaimana pengguna dapat dengan mudah mengakses informasi dan layanan yang mereka butuhkan.",
      instagram: "https://www.instagram.com/jizliaa/",
      linkedin: "https://www.linkedin.com/in/jihan-zahrah-abrilia-74145b284/",
    },
    {
      name: "Rhenata Mewa Pratiwi",
      role: "Asisten Design",
      photo: "/images/team/RhenataMewaPratiwi.png",
      quote:
        "Setiap baris kode yang saya tulis adalah jembatan yang menghubungkan teknologi dengan kebutuhan nyata masyarakat desa.",
      Instagram: "https://www.instagram.com/im.rhenata/",
    },
  ];

  // Data for coordinators and project leaders
  const coordinators = [
    {
      name: "Azhila Zakirah Candra",
      role: "Koordinator",
      photo: "/images/team/ASHILAHDZAKIRAHCANDRA.png",
      quote:
        "Memimpin dengan visi untuk menciptakan transformasi digital yang berkelanjutan bagi masyarakat Nagari Guguak Malalo.",
      instagram: "https://www.instagram.com/_fwasila/",
      linkedin:
        "https://www.linkedin.com/in/ashilah-dzakirah-candra-23b6a9286/",
      icon: <Crown size={20} />,
    },
    {
      name: "Rieflan Rukia Adzfan",
      role: "Penanggung Jawab Project",
      photo: "/images/team/RieflanRukiaAdzfan.png",
      quote:
        "Mengawasi setiap tahap pengembangan dengan komitmen tinggi untuk menghasilkan solusi terbaik bagi masyarakat.",
      email: "pj@example.com",
      linkedin: "https://www.linkedin.com/in/pj-project",
      icon: <Shield size={20} />,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('gumalaa.png')",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Team Developer
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Mahasiswa KKN UNP Guguak Malalo 2025 yang membangun platform digital
            untuk Nagari
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tim Pengembang
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bertemu dengan mahasiswa-mahasiswa berbakat yang berdedikasi
              membangun platform digital untuk Nagari Guguak Malalo
            </p>
          </div>

          {/* Render all team members with alternating layout */}
          <div className="space-y-0">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className={
                  idx < teamMembers.length - 1
                    ? "border-b border-gray-100 pb-16"
                    : ""
                }
              >
                <TeamMemberDetail {...member} isReversed={idx % 2 === 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coordinators Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-[#7ca186]/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-[#7ca186] text-white px-6 py-3 rounded-full mb-6">
              <Award size={24} />
              <h2 className="text-2xl font-bold">
                Koordinator & Penanggung Jawab
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Pemimpin dan pengawas yang mengarahkan visi dan misi pengembangan
              platform digital untuk Nagari Guguak Malalo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {coordinators.map((coordinator, idx) => (
              <CoordinatorCard key={idx} {...coordinator} />
            ))}
          </div>
        </div>
      </section>

      {/* Project Info Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-[#7ca186] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-white/20 p-6 mb-6">
              <Code className="h-16 w-16" />
            </div>

            <h2 className="text-3xl font-bold mb-6">
              Website Portal Nagari Guguak Malalo
            </h2>

            <p className="text-lg max-w-3xl mb-8">
              Portal digital pertama yang dikembangkan untuk melayani masyarakat
              Nagari Guguak Malalo. Dibangun dengan teknologi modern untuk
              memastikan pengalaman pengguna yang baik dan efisiensi layanan.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-bold text-xl mb-2">Teknologi</h3>
                <p className="text-white/80">
                  Next, Express, React, TypeScript, TailwindCSS
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-bold text-xl mb-2">Pengembangan</h3>
                <p className="text-white/80">July 2025</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-bold text-xl mb-2">Tim</h3>
                <p className="text-white/80">5 Mahasiswa KKN UNP</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Statistik Tim
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Beberapa statistik mengenai tim dan projek yang sedang kami
              kembangkan
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7ca186] mb-2">6</div>
              <div className="text-gray-600">Anggota Tim</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7ca186] mb-2">2</div>
              <div className="text-gray-600">Bulan Pengembangan</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7ca186] mb-2">15+</div>
              <div className="text-gray-600">Fitur Layanan</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7ca186] mb-2">1</div>
              <div className="text-gray-600">Platform Terintegrasi</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TeamDeveloper;
