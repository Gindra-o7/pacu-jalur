"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Route, Mountain } from "lucide-react";

type OverviewSectionProps = {
  title: string;
  description: string;
};

export default function OverviewSection({ title, description }: OverviewSectionProps) {
  const stats = [
    { icon: Route, label: "Dari Jalan Lintas", value: "3 km", color: "from-blue-500 to-cyan-500" },
    { icon: Navigation, label: "Dari Teluk Kuantan", value: "30 km", color: "from-cyan-500 to-teal-500" },
    { icon: Mountain, label: "Akses Jalan", value: "Aspal Permanen", color: "from-teal-500 to-green-500" },
  ];

  return (
    <section id="gambaran-umum" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-semibold font-body text-sm">Lokasi Strategis</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">{title}</h2>
          <div className="w-32 h-1 bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500 mx-auto mb-8 rounded-full"></div>
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
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-linear-to-b from-blue-500 to-teal-500 rounded-full"></div>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-body pl-6">{description}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-linear-to-br from-white to-gray-50 rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-linear-to-br ${stat.color} mb-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 font-heading">{stat.value}</p>
                    <p className="text-xs text-gray-600 font-body mt-1">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-linear-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading mb-1">Mudah Dijangkau</h3>
                    <p className="text-white/90 font-body">Akses jalan aspal permanen</p>
                  </div>
                </div>

                <div className="h-px bg-white/30"></div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-white/80 text-sm font-body mb-2">Jarak dari</p>
                    <p className="text-2xl font-bold text-white font-heading">3 km</p>
                    <p className="text-white/70 text-xs font-body mt-1">Jalan Lintas</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-white/80 text-sm font-body mb-2">Dari Kota</p>
                    <p className="text-2xl font-bold text-white font-heading">30 km</p>
                    <p className="text-white/70 text-xs font-body mt-1">Teluk Kuantan</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
