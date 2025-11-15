"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, Users } from "lucide-react";
import Image from "next/image";

type GalleryImage = {
  url: string;
  alt: string;
  title: string;
};

type HistorySectionProps = {
  title: string;
  description: string;
  image?: GalleryImage;
};

export default function HistorySection({ title, description, image }: HistorySectionProps) {
  return (
    <section id="sejarah-filosofi" className="py-24 bg-gradient-to-b from-orange-50 via-red-50 to-orange-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200/30 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-200 rounded-full mb-6">
            <BookOpen className="w-5 h-5 text-orange-700" />
            <span className="text-orange-800 font-semibold font-body text-sm">Sejarah Budaya</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">{title}</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 font-heading">Sejak 1996</h3>
              <p className="text-sm text-gray-600 font-body">Festival Publik</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 font-heading">Gotong Royong</h3>
              <p className="text-sm text-gray-600 font-body">Muda-Mudi & Tua-Muda</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 font-heading">Transportasi</h3>
              <p className="text-sm text-gray-600 font-body">Raja & Masyarakat</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-l-4 border-orange-500"
            >
              <p className="text-lg text-gray-700 leading-relaxed font-body whitespace-pre-line">{description}</p>
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
      </div>
    </section>
  );
}

