"use client";

import { motion } from "framer-motion";
import { MapPin, Trophy, Award } from "lucide-react";
import Link from "next/link";

type Jalur = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi: string | null;
};

type DesaItem = {
  desa: string;
  kecamatan: string;
  jalur: Jalur[];
};

type DesaBerlombaContentProps = {
  desaList: DesaItem[];
  totalJalur: number;
};

export default function DesaBerlombaContent({ desaList, totalJalur }: DesaBerlombaContentProps) {
  return (
    <section id="desa-berlomba" className="py-20 bg-linear-to-br from-orange-50 via-white to-red-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100/30 rounded-full blur-3xl"></div>

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
            <Trophy className="w-5 h-5 text-orange-600" />
            <span className="text-orange-700 font-semibold font-body text-sm">Perhelatan Pacu Jalur</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Desa yang <span className="bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Berlomba</span>
          </h2>
          <div className="w-32 h-1 bg-linear-to-r from-orange-500 via-red-500 to-orange-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">
            Daftar desa yang berpartisipasi dalam perhelatan Pacu Jalur di Kabupaten Kuantan Singingi
          </p>
        </motion.div>

        {desaList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-lg">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 font-body">Belum ada data desa yang berpartisipasi.</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="inline-flex p-4 bg-linear-to-br from-orange-500 to-red-500 rounded-full mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 font-heading mb-2">{desaList.length}</p>
                <p className="text-gray-600 font-body">Desa Berpartisipasi</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="inline-flex p-4 bg-linear-to-br from-red-500 to-orange-500 rounded-full mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 font-heading mb-2">{totalJalur}</p>
                <p className="text-gray-600 font-body">Jalur Berlomba</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="inline-flex p-4 bg-linear-to-br from-orange-600 to-red-600 rounded-full mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 font-heading mb-2">{desaList.length}</p>
                <p className="text-gray-600 font-body">Kecamatan</p>
              </div>
            </motion.div>

            {/* Desa Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {desaList.map((desaItem, index) => (
                <motion.div
                  key={`${desaItem.desa}-${desaItem.kecamatan}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="group relative"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 via-red-500 to-orange-500"></div>

                    {/* Icon */}
                    <div className="relative z-10 mb-4">
                      <div className="inline-flex p-4 bg-linear-to-br from-orange-500 to-red-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">{desaItem.desa}</h3>
                      <p className="text-gray-600 font-body mb-4">Kec. {desaItem.kecamatan}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-body mb-4">
                        <Trophy className="w-4 h-4" />
                        <span>{desaItem.jalur.length} Jalur</span>
                      </div>

                      {/* Jalur List */}
                      <div className="space-y-2">
                        {desaItem.jalur.slice(0, 3).map((jalur) => (
                          <div key={jalur.id} className="flex items-center gap-2 text-sm bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            <span className="text-gray-700 font-body">{jalur.nama}</span>
                          </div>
                        ))}
                        {desaItem.jalur.length > 3 && (
                          <p className="text-xs text-gray-500 font-body text-center pt-2">
                            +{desaItem.jalur.length - 3} jalur lainnya
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-12"
            >
              <Link
                href="/jadwal"
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg font-body"
              >
                <Award className="w-5 h-5" />
                Lihat Jadwal Perlombaan
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

