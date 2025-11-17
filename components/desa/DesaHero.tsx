"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, MapPin, Trophy } from "lucide-react";
import { getStorageImageUrl, BLUR_DATA_URL } from "@/utils/supabase/storage";

export default function DesaHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const destinationImages = [
    { src: getStorageImageUrl("public/pacu-jalur-1.webp"), title: "Festival Pacu Jalur", location: "Kuantan Singingi, Riau" },
    { src: getStorageImageUrl("public/pacu-jalur-2.png"), title: "Perahu Tradisional", location: "Teluk Kuantan, Riau" },
    { src: getStorageImageUrl("public/pacu-jalur-3.jpeg"), title: "Togak Luan", location: "Kuantan Singingi, Riau" },
    { src: getStorageImageUrl("public/pacu-jalur-4.jpeg"), title: "Budaya Melayu", location: "Riau, Indonesia" },
    { src: getStorageImageUrl("public/pacu-jalur-5.jpeg"), title: "Festival Air", location: "Kuantan Singingi, Riau" },
  ];

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % destinationImages.length);
    }, 5000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, destinationImages.length]);

  const nextImage = () => {
    setIsSwitching(true);
    setCurrentImageIndex((prev) => (prev + 1) % destinationImages.length);
    setTimeout(() => setIsSwitching(false), 300);
  };

  const prevImage = () => {
    setIsSwitching(true);
    setCurrentImageIndex((prev) => (prev - 1 + destinationImages.length) % destinationImages.length);
    setTimeout(() => setIsSwitching(false), 300);
  };

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden bg-gray-900">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {destinationImages.map((img, index) => (
          <div key={index} className="absolute inset-0">
            <Image
              src={img.src}
              alt={img.title}
              fill
              className={`object-cover transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
              style={{
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) scale(${index === currentImageIndex ? 1.05 : 1})`,
                filter: "contrast(1.05) saturate(1.15) brightness(0.85)",
              }}
              priority={index === 0}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        ))}
        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${isSwitching ? "opacity-80" : "opacity-0"}`}
          style={{
            background: "radial-gradient(1200px 600px at 50% 70%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.65) 100%)",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[60vh] md:min-h-[70vh] py-16">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold font-body text-sm">Desa</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-heading" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
              Jalur <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Desa</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-body mb-8" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}>
              Eksplorasi lengkap data desa yang berpartisipasi dalam festival Pacu Jalur. Lihat jalur, galeri foto, dan media sosial setiap desa.
            </p>

            {/* Image Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={prevImage} className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg" aria-label="Previous image">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Image Indicators */}
              <div className="flex items-center gap-2">
                {destinationImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsSwitching(true);
                      setCurrentImageIndex(index);
                      setTimeout(() => setIsSwitching(false), 300);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? "w-8 bg-white" : "bg-white/50 hover:bg-white/75"}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              <button onClick={nextImage} className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg" aria-label="Next image">
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Current Image Info */}
            <AnimatePresence mode="wait">
              <motion.div key={currentImageIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mt-6">
                <p className="text-sm text-white/80 font-body" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
                  {destinationImages[currentImageIndex].title} • {destinationImages[currentImageIndex].location}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
