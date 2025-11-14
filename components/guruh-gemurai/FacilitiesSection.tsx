"use client";

import { motion } from "framer-motion";
import { ParkingCircle, Bath, Shirt, Building2, UtensilsCrossed, Route, CheckCircle2 } from "lucide-react";

type FacilitiesSectionProps = {
  title: string;
  items: string[];
};

const facilityIcons = [
  { icon: ParkingCircle, color: "from-blue-500 to-cyan-500", label: "Parkir" },
  { icon: Bath, color: "from-cyan-500 to-teal-500", label: "Toilet" },
  { icon: Shirt, color: "from-teal-500 to-green-500", label: "Ganti Baju" },
  { icon: Building2, color: "from-green-500 to-emerald-500", label: "Musala" },
  { icon: UtensilsCrossed, color: "from-emerald-500 to-blue-500", label: "Kios" },
  { icon: Route, color: "from-blue-500 to-cyan-500", label: "Akses" },
];

export default function FacilitiesSection({ title, items }: FacilitiesSectionProps) {
  return (
    <section id="fasilitas" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-semibold font-body text-sm">Fasilitas Lengkap</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">{title}</h2>
          <div className="w-32 h-1 bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">Fasilitas di kawasan ini cukup lengkap, di antaranya:</p>
        </motion.div>

        {/* Facilities Grid */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const facilityIcon = facilityIcons[index % facilityIcons.length];
            const Icon = facilityIcon.icon;
            const iconColors = facilityIcon.color;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${iconColors}`}></div>

                  {/* Icon */}
                  <div className="relative z-10 mb-4">
                    <div className={`inline-flex p-4 rounded-xl bg-linear-to-br ${iconColors} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Text */}
                  <p className="text-gray-800 font-medium leading-relaxed font-body relative z-10">{item}</p>

                  {/* Hover effect background */}
                  <div className={`absolute inset-0 bg-linear-to-br ${iconColors} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
