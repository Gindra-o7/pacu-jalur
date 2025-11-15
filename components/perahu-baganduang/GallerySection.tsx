"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

type GalleryImage = {
  url: string;
  alt: string;
  title: string;
};

type GallerySectionProps = {
  title: string;
  description: string;
  images: GalleryImage[];
};

export default function GallerySection({ title, description, images }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage !== null) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <>
      <section id="galeri" className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
              <Camera className="w-5 h-5 text-orange-600" />
              <span className="text-orange-700 font-semibold font-body text-sm">Galeri Foto</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">{title}</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-body">{description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSelectedImage(index)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-gray-200">
                  <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold font-heading mb-1">{image.title}</h3>
                    <p className="text-white/90 text-sm font-body">{image.alt}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-5 h-5 text-orange-600" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-6xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
                  <Image
                    src={images[selectedImage].url}
                    alt={images[selectedImage].alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>
                <div className="mt-4 text-center text-white">
                  <h3 className="text-2xl font-bold font-heading mb-2">{images[selectedImage].title}</h3>
                  <p className="text-white/80 font-body">{images[selectedImage].alt}</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

