"use client";

import { motion } from "framer-motion";
import { Star, Heart, Users2, Sparkles } from "lucide-react";
import Image from "next/image";

type GalleryImage = {
  url: string;
  alt: string;
  title: string;
};

type AttractionsSectionProps = {
  title: string;
  description: string;
  image?: GalleryImage;
};

const attractions = [
  {
    icon: Sparkles,
    title: "Keindahan Ornamen",
    description: "Parade perahu bergandeng yang penuh warna dan simbol lokal",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Heart,
    title: "Gotong Royong",
    description: "Membangkitkan semangat kerukunan warga",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Users2,
    title: "Pengalaman Budaya",
    description: "Kehangatan masyarakat dan tradisi yang masih lestari",
    color: "from-pink-500 to-orange-600",
  },
];

export default function AttractionsSection({ title, description, image }: AttractionsSectionProps) {
  return (
    <section id="daya-tarik" className="py-24 bg-gradient-to-b from-orange-50 via-red-50 to-orange-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-200 rounded-full mb-6">
            <Star className="w-5 h-5 text-orange-700" />
            <span className="text-orange-800 font-semibold font-body text-sm">Daya Tarik Wisata</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">{title}</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {attractions.map((attraction, index) => {
            const Icon = attraction.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${attraction.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">{attraction.title}</h3>
                <p className="text-gray-600 font-body leading-relaxed">{attraction.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-full"
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-l-4 border-orange-500">
              <p className="text-lg text-gray-700 leading-relaxed font-body whitespace-pre-line">{description}</p>
            </div>
          </motion.div>

          {image && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-xl border border-orange-100"
            >
              <div className="relative aspect-[4/3] bg-gray-200">
                <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold font-heading mb-1">{image.title}</h3>
                  <p className="text-white/90 text-sm font-body">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

