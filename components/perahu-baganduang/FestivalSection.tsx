"use client";

import { motion } from "framer-motion";
import { Sparkles, Palette, Music, Users } from "lucide-react";
import Image from "next/image";

type GalleryImage = {
  url: string;
  alt: string;
  title: string;
};

type FestivalSectionProps = {
  title: string;
  description: string;
  image?: GalleryImage;
};

const festivalFeatures = [
  { icon: Palette, text: "Janur Kuning & Kain Panjang", color: "from-yellow-500 to-orange-500" },
  { icon: Sparkles, text: "Simbol Adat (Kerbau, Cangkul, dll)", color: "from-orange-500 to-red-500" },
  { icon: Music, text: "Lomba Hias & Musik", color: "from-red-500 to-pink-500" },
  { icon: Users, text: "Prosesi Adat Bujang Gadis", color: "from-pink-500 to-orange-600" },
];

export default function FestivalSection({ title, description, image }: FestivalSectionProps) {
  return (
    <section id="tradisi-festival" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <span className="text-orange-700 font-semibold font-body text-sm">Festival Budaya</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">{title}</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        {image && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12 max-w-4xl mx-auto"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-orange-100">
              <div className="relative aspect-[16/9] bg-gray-200">
                <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="100vw" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-white text-2xl md:text-3xl font-bold font-heading mb-2">{image.title}</h3>
                  <p className="text-white/90 text-base md:text-lg font-body">{image.alt}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left: Feature Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {festivalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm md:text-base font-semibold text-gray-800 font-body leading-tight">{feature.text}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-10 shadow-xl border border-orange-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <p className="text-lg text-gray-700 leading-relaxed font-body whitespace-pre-line">{description}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlight Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 rounded-3xl p-8 md:p-10 text-white shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-heading mb-1">Ribuan Penonton</h3>
              <p className="text-white/90 font-body">Warga & Wisatawan Lokal Maupun Luar Daerah</p>
            </div>
          </div>
          <p className="text-lg font-body text-white/95">Parade perahu baganduang biasanya diikuti oleh banyak kelompok kerja desa ("batobo")</p>
        </motion.div>
      </div>
    </section>
  );
}

