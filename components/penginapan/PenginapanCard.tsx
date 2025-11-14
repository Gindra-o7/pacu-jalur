"use client";

import { useState } from "react";
import { MapPin, Star, Wifi, ChevronDown, ExternalLink, Hotel } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Fasilitas = {
  id: string;
  nama: string;
};

type Penginapan = {
  id: string;
  nama: string;
  tipe: string;
  harga: string | null;
  image_url: string | null;
  deskripsi: string | null;
  rating: string | null;
  maps_url: string | null;
  fasilitas: Fasilitas[];
};

type PenginapanCardProps = {
  penginapan: Penginapan;
  index: number;
};

export default function PenginapanCard({ penginapan, index }: PenginapanCardProps) {
  const [showAllFasilitas, setShowAllFasilitas] = useState(false);

  const getGoogleMapsUrl = (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  };

  const displayedFasilitas = showAllFasilitas ? penginapan.fasilitas : penginapan.fasilitas.slice(0, 4);
  const hasMoreFasilitas = penginapan.fasilitas.length > 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {penginapan.image_url ? (
          <Image src={penginapan.image_url} alt={penginapan.nama} fill className="object-cover transition-transform duration-500 hover:scale-110" />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-blue-200 via-purple-200 to-blue-300 flex items-center justify-center">
            <Hotel className="w-16 h-16 text-white/50" />
          </div>
        )}

        {/* Rating Badge */}
        {penginapan.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-bold text-gray-900 font-body">{penginapan.rating}</span>
          </div>
        )}

        {/* Tipe Badge */}
        <div className="absolute top-3 left-3">
          <div className="px-3 py-1 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-bold shadow-md font-body">{penginapan.tipe}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 font-heading mb-2 line-clamp-1">{penginapan.nama}</h3>

          {/* Harga */}
          {penginapan.harga && (
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-xl font-bold text-blue-600 font-heading">{penginapan.harga}</span>
              <span className="text-xs text-gray-500 font-body">/ malam</span>
            </div>
          )}

          {/* Deskripsi */}
          {penginapan.deskripsi && <p className="text-xs text-gray-600 line-clamp-2 mb-3 font-body leading-relaxed">{penginapan.deskripsi}</p>}
        </div>

        {/* Fasilitas */}
        {penginapan.fasilitas.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Wifi className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs font-semibold text-gray-900 font-body">Fasilitas:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <AnimatePresence mode="popLayout">
                {displayedFasilitas.map((fasilitas) => (
                  <motion.span
                    key={fasilitas.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-[10px] px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium font-body"
                  >
                    {fasilitas.nama}
                  </motion.span>
                ))}
              </AnimatePresence>
              {hasMoreFasilitas && (
                <button
                  onClick={() => setShowAllFasilitas(!showAllFasilitas)}
                  className="text-[10px] px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium font-body hover:bg-gray-200 transition-colors flex items-center gap-1"
                >
                  {showAllFasilitas ? (
                    <>
                      Lebih Sedikit
                      <ChevronDown className="w-3 h-3 rotate-180" />
                    </>
                  ) : (
                    <>
                      +{penginapan.fasilitas.length - 4} lagi
                      <ChevronDown className="w-3 h-3" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Maps Link */}
        {penginapan.maps_url ? (
          <a
            href={penginapan.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg font-body text-sm group"
          >
            <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Lihat di Maps
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <a
            href={getGoogleMapsUrl(penginapan.nama)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg font-body text-sm group"
          >
            <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Lihat di Maps
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

