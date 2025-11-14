"use client";

import { motion } from "framer-motion";
import { Car, Clock, Navigation, MapPin, Route } from "lucide-react";

type AccessSectionProps = {
  title: string;
  description: string;
};

const accessPoints = [
  {
    icon: Navigation,
    title: "Dari Pekanbaru",
    duration: "5 jam",
    distance: "~200 km",
    color: "from-orange-500 to-red-500",
    description: "Perjalanan melalui jalan provinsi yang nyaman",
  },
  {
    icon: MapPin,
    title: "Dari Teluk Kuantan",
    duration: "45 menit",
    distance: "~30 km",
    color: "from-blue-500 to-cyan-500",
    description: "Perjalanan terdekat dan tercepat",
  },
];

export default function AccessSection({ title, description }: AccessSectionProps) {
  return (
    <section id="akses" className="py-24 bg-linear-to-b from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>

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
            <Car className="w-5 h-5 text-orange-600" />
            <span className="text-orange-700 font-semibold font-body text-sm">Transportasi</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">{title}</h2>
          <div className="w-32 h-1 bg-linear-to-r from-orange-500 via-red-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">{description}</p>
        </motion.div>

        {/* Access Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {accessPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative group"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 overflow-hidden">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-linear-to-r ${point.color}`}></div>

                  {/* Icon and Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-2xl bg-linear-to-br ${point.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 font-heading">{point.title}</h3>
                      <p className="text-sm text-gray-600 font-body">{point.description}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600 font-body">Waktu Tempuh</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 font-heading">{point.duration}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Route className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600 font-body">Jarak</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 font-heading">{point.distance}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vehicle Types Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-linear-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-heading">Akses Kendaraan</h3>
              </div>
              <p className="text-lg md:text-xl text-white/95 font-body leading-relaxed">
                Destinasi ini bisa diakses dengan kendaraan roda dua atau empat. Jalan menuju lokasi sudah beraspal permanen, membuat perjalanan menjadi nyaman dan aman.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
