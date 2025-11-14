"use client";

import { motion } from "framer-motion";
import { Edit, Trash2, Star, MapPin, Loader2, Wifi, Hotel } from "lucide-react";
import Image from "next/image";

type Penginapan = {
  id: string;
  nama: string;
  tipe: string;
  harga: string | null;
  image_url: string | null;
  deskripsi: string | null;
  rating: string | null;
  maps_url: string | null;
};

type Fasilitas = {
  id: string;
  nama: string;
  penginapan_id: string;
};

type PenginapanCardProps = {
  penginapan: Penginapan;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  fasilitasList: Fasilitas[];
};

export default function PenginapanCard({ penginapan, onEdit, onDelete, isDeleting, fasilitasList }: PenginapanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      {penginapan.image_url ? (
        <div className="relative h-36 w-full overflow-hidden bg-gray-100">
          <Image 
            src={penginapan.image_url} 
            alt={penginapan.nama} 
            fill 
            className="object-cover transition-transform duration-300 hover:scale-110" 
          />
          {penginapan.rating && (
            <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-white/95 backdrop-blur-sm rounded-full shadow-md">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs font-bold text-gray-900 font-body">{penginapan.rating}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="relative h-36 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-gray-400">
            <Hotel className="w-12 h-12 mx-auto mb-1" />
            <p className="text-xs font-body">No Image</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-base font-bold text-gray-900 font-heading mb-1 line-clamp-1">{penginapan.nama}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-md font-medium font-body">{penginapan.tipe}</span>
            {penginapan.harga && <span className="font-bold text-orange-600 font-body text-xs">{penginapan.harga}</span>}
          </div>
        </div>

        {penginapan.deskripsi && (
          <p className="text-xs text-gray-600 line-clamp-2 mb-2 font-body">{penginapan.deskripsi}</p>
        )}

        {/* Fasilitas */}
        {fasilitasList.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-1 mb-1.5">
              <Wifi className="w-3 h-3 text-gray-500" />
              <span className="text-[10px] font-semibold text-gray-700 font-body">Fasilitas:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {fasilitasList.slice(0, 3).map((fasilitas) => (
                <span key={fasilitas.id} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded font-body">
                  {fasilitas.nama}
                </span>
              ))}
              {fasilitasList.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded font-body">
                  +{fasilitasList.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Maps Link */}
        {penginapan.maps_url && (
          <a
            href={penginapan.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mb-3 font-body transition-colors duration-200"
          >
            <MapPin className="w-3 h-3" />
            Lihat di Maps
          </a>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <button
            onClick={onEdit}
            className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 text-sm font-medium font-body flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300 text-sm font-medium font-body disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-sm hover:shadow-md"
          >
            {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

