"use client";

import { motion } from "framer-motion";
import { MapPin, Ship } from "lucide-react";
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

type GaleriItemProps = {
  item: Galeri;
  index: number;
  onClick: () => void;
};

export default function GaleriItem({ item, index, onClick }: GaleriItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-purple-200">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image src={item.image_url} alt={item.judul || "Galeri Pacu Jalur"} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              {item.judul && <h3 className="font-bold text-sm mb-1 font-heading line-clamp-2">{item.judul}</h3>}
              {item.caption && <p className="text-xs opacity-90 font-body line-clamp-2">{item.caption}</p>}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          {/* Judul (always visible) */}
          {item.judul && (
            <h3 className="font-bold text-sm text-gray-900 mb-1 font-heading line-clamp-1" title={item.judul}>
              {item.judul}
            </h3>
          )}

          {/* Jalur Info */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
            <Ship className="w-3 h-3 text-purple-500 shrink-0" />
            <span className="font-body truncate font-medium">{item.jalur?.nama || "Unknown Jalur"}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin className="w-3 h-3 text-indigo-500 shrink-0" />
            <span className="font-body truncate">
              {item.jalur?.desa}, {item.jalur?.kecamatan}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

