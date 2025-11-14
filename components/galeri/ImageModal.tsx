"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, Ship } from "lucide-react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Jalur = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
};

type Galeri = {
  id: string;
  image_url: string;
  judul: string | null;
  caption: string | null;
  jalur_id: string;
  jalur: Jalur;
};

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  image: Galeri | null;
  allImages: Galeri[];
  onNavigate: (image: Galeri) => void;
};

export default function ImageModal({ isOpen, onClose, image, allImages, onNavigate }: ImageModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !image) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        navigatePrev();
      } else if (e.key === "ArrowRight") {
        navigateNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, image, allImages]);

  const navigatePrev = () => {
    if (!image) return;
    const currentIndex = allImages.findIndex((img) => img.id === image.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
    onNavigate(allImages[prevIndex]);
  };

  const navigateNext = () => {
    if (!image) return;
    const currentIndex = allImages.findIndex((img) => img.id === image.id);
    const nextIndex = currentIndex < allImages.length - 1 ? currentIndex + 1 : 0;
    onNavigate(allImages[nextIndex]);
  };

  if (!isMounted || !image) return null;

  const currentIndex = allImages.findIndex((img) => img.id === image.id);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 bg-black/50 backdrop-blur-md rounded-xl p-4">
                <div className="flex-1 min-w-0 text-white">
                  {image.judul && <h2 className="text-xl md:text-2xl font-bold font-heading mb-1 truncate">{image.judul}</h2>}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Ship className="w-4 h-4 text-purple-400" />
                      <span className="font-body">{image.jalur?.nama}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      <span className="font-body">
                        {image.jalur?.desa}, {image.jalur?.kecamatan}
                      </span>
                    </div>
                  </div>
                </div>

                <button onClick={onClose} className="ml-4 p-2 text-white hover:bg-white/20 rounded-lg transition-colors shrink-0" aria-label="Close">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Image Container */}
              <div className="flex-1 relative flex items-center justify-center">
                {/* Previous Button */}
                {allImages.length > 1 && (
                  <button
                    onClick={navigatePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Image */}
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className="relative max-w-full max-h-full">
                    <Image
                      src={image.image_url}
                      alt={image.judul || "Galeri Pacu Jalur"}
                      width={1200}
                      height={800}
                      className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                    />
                  </div>
                </motion.div>

                {/* Next Button */}
                {allImages.length > 1 && (
                  <button
                    onClick={navigateNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Caption & Counter */}
              <div className="mt-4 bg-black/50 backdrop-blur-md rounded-xl p-4 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {image.caption && <p className="text-sm font-body leading-relaxed">{image.caption}</p>}
                  </div>
                  {allImages.length > 1 && (
                    <div className="text-sm font-semibold font-body shrink-0">
                      {currentIndex + 1} / {allImages.length}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

