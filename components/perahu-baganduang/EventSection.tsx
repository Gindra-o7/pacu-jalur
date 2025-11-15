"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";

type EventSectionProps = {
  title: string;
  description: string;
};

export default function EventSection({ title, description }: EventSectionProps) {
  return (
    <section id="waktu-tempat" className="py-24 bg-gradient-to-br from-orange-600 via-red-500 to-orange-700 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
            <Calendar className="w-5 h-5 text-white" />
            <span className="text-white font-semibold font-body text-sm">Informasi Event</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading drop-shadow-lg">{title}</h2>
          <div className="w-32 h-1 bg-white mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20"
        >
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-white/80 font-body mb-1">Waktu</div>
                <div className="text-lg font-bold text-white font-heading">Setahun Sekali</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-white/80 font-body mb-1">Hari Raya</div>
                <div className="text-lg font-bold text-white font-heading">Idul Fitri</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-white/80 font-body mb-1">Lokasi</div>
                <div className="text-lg font-bold text-white font-heading">Tepian Muko Lobuah</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg md:text-xl text-white leading-relaxed font-body">{description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

