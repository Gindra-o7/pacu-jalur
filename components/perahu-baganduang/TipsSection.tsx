"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Trash2, Camera, AlertCircle } from "lucide-react";

type TipsSectionProps = {
  title: string;
  items: string[];
};

const tipIcons = [Calendar, Clock, Trash2, Camera];
const tipColors = ["from-orange-500 to-red-500", "from-red-500 to-pink-500", "from-pink-500 to-orange-600", "from-orange-600 to-red-600"];

export default function TipsSection({ title, items }: TipsSectionProps) {
  return (
    <section id="tips" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <span className="text-orange-700 font-semibold font-body text-sm">Panduan Wisatawan</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">{title}</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item, index) => {
            const Icon = tipIcons[index] || AlertCircle;
            const colorClass = tipColors[index % tipColors.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
                className="group relative perspective-1000"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClass} rounded-t-2xl`}></div>

                  <div className="mb-4 relative z-10">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${colorClass} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-500 font-body">TIP #{index + 1}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed font-body flex-1 relative z-10">{item}</p>

                  <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>

                  <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${colorClass} opacity-5 rounded-full blur-xl group-hover:opacity-10 transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

            <div className="relative z-10 flex items-center gap-6">
              <div className="p-5 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold font-heading mb-2">Ingat!</h3>
                <p className="text-white/95 font-body leading-relaxed">Ikuti aturan kebersihan dan hormati adat setempat untuk pengalaman yang menyenangkan bagi semua.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

