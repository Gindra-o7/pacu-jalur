"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Ticket, Sparkles } from "lucide-react";

type OperatingHoursSectionProps = {
  title: string;
  description: string;
};

export default function OperatingHoursSection({ title, description }: OperatingHoursSectionProps) {
  return (
    <section id="jam-operasional" className="py-24 bg-linear-to-br from-blue-600 via-cyan-500 to-teal-400 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold font-body text-sm">Informasi Kunjungan</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading drop-shadow-lg">{title}</h2>
          <div className="w-32 h-1 bg-white mx-auto mb-8 rounded-full"></div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Hours Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-5 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-heading mb-2">Buka Setiap Hari</h3>
                  <p className="text-white/90 font-body">Bisa dikunjungi kapan saja</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-5 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-heading mb-2">24 Jam</h3>
                  <p className="text-white/90 font-body">Akses fleksibel untuk pengunjung</p>
                </div>
              </div>
            </div>

            {/* Right: Ticket Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">Harga Tiket</h3>
              </div>
              <p className="text-lg text-white/95 leading-relaxed font-body">{description}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex flex-wrap gap-4 justify-center">
              {["Setiap Hari", "Akses Mudah", "Tiket Terjangkau", "Fasilitas Lengkap"].map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white font-medium text-sm font-body"
                >
                  {badge}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24 md:h-32">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
