"use client";

import { motion } from "framer-motion";
import { Waves, MapPin, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";

type HeroSectionProps = {
  title: string;
  location: string;
  backgroundImage?: string;
};

export default function HeroSection({ title, location, backgroundImage }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-32 md:pb-40 bg-linear-to-br from-blue-600 via-cyan-500 to-teal-400 overflow-hidden min-h-[85vh] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <div className="absolute inset-0">
            <Image src={backgroundImage} alt={title} fill className="object-cover opacity-15" priority sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-b from-blue-700/40 via-cyan-600/30 to-teal-500/20"></div>
          </div>
        )}
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-300/5 rounded-full blur-3xl"></div>
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
            <span className="text-white font-semibold font-body text-sm md:text-base">Wisata Alam Unggulan Kuantan Singingi</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-heading leading-tight drop-shadow-2xl"
          >
            <span className="block mb-2">{title}</span>
            <span className="block text-4xl md:text-6xl lg:text-7xl bg-linear-to-r from-cyan-200 via-white to-teal-200 bg-clip-text text-transparent">
              Keindahan Air Terjun Bertingkat
            </span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-linear-to-r from-cyan-300 via-white to-teal-300 mx-auto mb-10 rounded-full"
          ></motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center justify-center gap-3 text-white/95 mb-12"
          >
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg md:text-2xl font-body font-medium">{location}</p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-white/80 animate-bounce" />
          </motion.div>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20 md:h-32">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
