"use client";

import { motion } from "framer-motion";
import { Sparkles, Droplets, Mountain, Trees, Waves } from "lucide-react";

type AttractionsSectionProps = {
  title: string;
  description: string;
};

const features = [
  { icon: Droplets, text: "Air Terjun Bertingkat Tujuh", color: "from-blue-500 to-cyan-500" },
  { icon: Waves, text: "Kolam Penampungan Alami", color: "from-cyan-500 to-teal-500" },
  { icon: Trees, text: "Suasana Hutan Lindung yang Sejuk", color: "from-teal-500 to-green-500" },
  { icon: Mountain, text: "Tingkat Ketinggian yang Berbeda", color: "from-green-500 to-emerald-500" },
];

export default function AttractionsSection({ title, description }: AttractionsSectionProps) {
  return (
    <section id="daya-tarik" className="py-24 bg-linear-to-b from-gray-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-cyan-600" />
            <span className="text-cyan-700 font-semibold font-body text-sm">Keunikan Destinasi</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">{title}</h2>
          <div className="w-32 h-1 bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Feature Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-linear-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm md:text-base font-semibold text-gray-800 font-body leading-tight">{feature.text}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: Featured Content Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100 overflow-hidden">
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-linear-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-lg">
                    <Droplets className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading">Asal Usul Nama</h3>
                    <div className="space-y-4">
                      <div className="bg-cyan-50 rounded-xl p-4 border-l-4 border-cyan-500">
                        <p className="font-semibold text-cyan-900 font-body mb-1">"Guruh"</p>
                        <p className="text-sm text-gray-700 font-body">Bunyi gemuruh air yang merdu</p>
                      </div>
                      <div className="bg-teal-50 rounded-xl p-4 border-l-4 border-teal-500">
                        <p className="font-semibold text-teal-900 font-body mb-1">"Gemurai"</p>
                        <p className="text-sm text-gray-700 font-body">Percikan air yang jatuh dari ketinggian</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                <p className="text-lg text-gray-700 leading-relaxed font-body">{description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
