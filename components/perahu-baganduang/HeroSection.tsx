"use client";

import { motion } from "framer-motion";
import { Waves, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";

type HeroSectionProps = {
  title: string;
  location: string;
  backgroundImage?: string;
};

export default function HeroSection({ title, location, backgroundImage }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-32 md:pb-40 bg-gradient-to-br from-orange-600 via-red-500 to-orange-700 overflow-hidden min-h-[85vh] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <div className="absolute inset-0">
            <Image src={backgroundImage} alt={title} fill className="object-cover opacity-20" priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-orange-800/60 via-red-700/50 to-orange-900/40"></div>
          </div>
        )}
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-300/5 rounded-full blur-3xl"></div>
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full mb-8 border border-white/30 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="text-white font-semibold font-body text-sm md:text-base">Tradisi Budaya Kuantan Mudik</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-heading drop-shadow-2xl"
          >
            {title}
          </motion.h1>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-3 text-white/90 mb-8"
          >
            <MapPin className="w-5 h-5 md:w-6 md:h-6" />
            <p className="text-lg md:text-xl font-body">{location}</p>
          </motion.div>

          {/* Decorative Wave Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
            className="flex justify-center"
          >
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Waves className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

