"use client";

import { motion } from "framer-motion";
import { MapPin, Waves } from "lucide-react";
import Image from "next/image";

type GalleryImage = {
  url: string;
  alt: string;
  title: string;
};

type OverviewSectionProps = {
  title: string;
  description: string;
  image?: GalleryImage;
};

export default function OverviewSection({ title, description, image }: OverviewSectionProps) {
  return (
    <section id="gambaran-tradisi" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
            <Waves className="w-5 h-5 text-orange-600" />
            <span className="text-orange-700 font-semibold font-body text-sm">Tradisi Adat</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">{title}</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-10 shadow-xl border border-orange-100">
              <div className="absolute top-0 left-0 w-24 h-24 bg-orange-200/30 rounded-full blur-2xl -top-12 -left-12"></div>
              <p className="text-lg text-gray-700 leading-relaxed font-body relative z-10">{description}</p>
            </div>
          </motion.div>

          {/* Right: Image and Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative rounded-2xl overflow-hidden shadow-xl border border-orange-100"
              >
                <div className="relative aspect-[4/3] bg-gray-200">
                  <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold font-heading mb-1">{image.title}</h3>
                    <p className="text-white/90 text-sm font-body">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 shadow-lg text-white">
                <div className="text-3xl font-bold mb-2 font-heading">100+</div>
                <div className="text-sm font-body opacity-90">Tahun Tradisi</div>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white">
                <div className="text-3xl font-bold mb-2 font-heading">2-3</div>
                <div className="text-sm font-body opacity-90">Perahu Gabungan</div>
              </div>
              <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-6 shadow-lg text-white col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5" />
                  <div className="text-lg font-semibold font-heading">Lubuk Jambi</div>
                </div>
                <div className="text-sm font-body opacity-90">Lokasi Festival</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

