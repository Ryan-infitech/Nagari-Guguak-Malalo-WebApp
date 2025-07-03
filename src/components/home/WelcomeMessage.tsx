import React from "react";
import { Card } from "@/components/ui/card";

const WelcomeMessage = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#7ca186]/10 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="p-8 md:p-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Sambutan Wali Nagari
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#7ca186] to-blue-500 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Photo Section */}
              <div className="order-1 lg:order-1">
                <div className="relative">
                  <div className="w-full max-w-md mx-auto">
                    <img
                      src="/fotopakwali.png"
                      alt="Wali Nagari GuguakMalalo - Mulyadi"
                      className="w-full h-auto rounded-lg shadow-lg object-cover"
                    />
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#7ca186] to-blue-500 rounded-full opacity-20"></div>
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-[#7ca186] rounded-full opacity-20"></div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="order-2 lg:order-2 space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg md:text-xl italic text-gray-600">
                  "Assalamu'alaikum warahmatullahi wabarakatuh dan salam
                  sejahtera untuk kita semua"
                </p>

                <p className="text-base md:text-lg">
                  Dengan penuh rasa syukur kepada Allah SWT, kami
                  mempersembahkan portal digital Nagari GuguakMalalo yang telah
                  dirancang khusus untuk memberikan kemudahan dalam mengakses
                  berbagai layanan administrasi dan informasi nagari.
                </p>

                <p className="text-base md:text-lg">
                  Nagari GuguakMalalo dikenal dengan keindahan alamnya yang
                  menawan, mulai dari perbukitan hijau yang asri hingga danau
                  yang memukau. Melalui platform digital ini, kami berkomitmen
                  untuk tidak hanya memberikan layanan terbaik kepada
                  masyarakat, tetapi juga mempromosikan potensi pariwisata dan
                  ekonomi kreatif daerah kita.
                </p>

                <p className="text-base md:text-lg">
                  Mari bersama-sama membangun Nagari GuguakMalalo yang lebih
                  maju, sejahtera, dan berkelanjutan dengan memanfaatkan
                  teknologi digital untuk kemudahan hidup kita semua.
                </p>

                <div className="pt-6">
                  <div className="border-t-2 border-[#7ca186]/20 pt-6">
                    <p className="font-semibold text-lg text-gray-800">
                      Mulyadi
                    </p>
                    <p className="text-[#7ca186] font-medium">
                      Wali Nagari GuguakMalalo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WelcomeMessage;
