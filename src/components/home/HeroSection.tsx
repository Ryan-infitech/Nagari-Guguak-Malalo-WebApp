import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, MapPin, Users, Calendar } from "lucide-react";

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

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        >
          <source src="/Gumala.mp4" type="video/mp4" />
          {/* Fallback image in case video fails to load */}
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
            alt="Pemandangan Guguak Malalo"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ca186]/30 to-blue-900/30"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-[#7ca186] rounded-full animate-bounce"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-white/20 rounded-full animate-bounce delay-700"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
          <span className="block">Selamat Datang di</span>
          <span className="block bg-gradient-to-r from-[#7ca186] via-blue-400 to-[#7ca186] bg-clip-text text-transparent px-2 py-2">
            Nagari Guguak Malalo
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          Portal digital terdepan untuk layanan administrasi online dan
          eksplorasi keindahan alam perbukitan serta danau yang memukau di
          jantung Sumatera Barat
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-10 animate-fade-in">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <Users className="h-5 w-5 text-[#7ca186]" />
            <span className="font-semibold">4256 Penduduk</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <MapPin className="h-5 w-5 text-blue-400" />
            <span className="font-semibold">52.38 km² Luas</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <Calendar className="h-5 w-5 text-[#7ca186]" />
            <span className="font-semibold">24/7 Layanan Online</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <ScrollToTopLink to="/layanan">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#7ca186] to-[#6a8b72] hover:from-[#6a8b72] hover:to-[#5a775f] text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Jelajahi Layanan Digital
            </Button>
          </ScrollToTopLink>
          <ScrollToTopLink to="/pariwisata">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/10 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Temukan Wisata Alam
            </Button>
          </ScrollToTopLink>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
